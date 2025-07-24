import { NextRequest, NextResponse } from "next/server";

interface CloudflareEnv {
  DB?: D1Database;
}

interface CreateTradeRequest {
  item_id: string;
  item_name: string;
  refine_level?: number;
  enchantments?: string;
  card_slots?: number;
  price: number;
  currency?: string;
  seller_id: string;
  seller_name: string;
  server: string;
}

// GET /api/trades - 獲取交易列表
export async function GET(request: NextRequest) {
  try {
    const env = (request as unknown as { env: CloudflareEnv }).env;
    const { searchParams } = new URL(request.url);

    if (!env?.DB) {
      return NextResponse.json(
        {
          error: "Database Not Available",
          message: "D1 database binding not found",
        },
        { status: 503 }
      );
    }

    // 解析查詢參數
    const server = searchParams.get("server");
    const status = searchParams.get("status") || "active";
    const itemName = searchParams.get("item_name");
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    // 構建查詢
    let query = "SELECT * FROM trades WHERE status = ?";
    const params: string[] = [status];

    if (server) {
      query += " AND server = ?";
      params.push(server);
    }

    if (itemName) {
      query += " AND item_name LIKE ?";
      params.push(`%${itemName}%`);
    }

    query += " ORDER BY created_at DESC LIMIT ? OFFSET ?";
    params.push(limit.toString(), offset.toString());

    const { results } = await env.DB.prepare(query)
      .bind(...params)
      .all();

    // 獲取總數
    let countQuery = "SELECT COUNT(*) as total FROM trades WHERE status = ?";
    const countParams: string[] = [status];

    if (server) {
      countQuery += " AND server = ?";
      countParams.push(server);
    }

    if (itemName) {
      countQuery += " AND item_name LIKE ?";
      countParams.push(`%${itemName}%`);
    }

    const { results: countResults } = await env.DB.prepare(countQuery)
      .bind(...countParams)
      .all();
    const total = (countResults[0] as { total: number })?.total || 0;

    return NextResponse.json({
      success: true,
      data: results,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    });
  } catch (error) {
    console.error("GET /api/trades error:", error);

    return NextResponse.json(
      {
        error: "Database Error",
        message:
          error instanceof Error ? error.message : "Failed to fetch trades",
      },
      { status: 500 }
    );
  }
}

// POST /api/trades - 創建新交易
export async function POST(request: NextRequest) {
  try {
    const env = (request as unknown as { env: CloudflareEnv }).env;

    if (!env?.DB) {
      return NextResponse.json(
        {
          error: "Database Not Available",
          message: "D1 database binding not found",
        },
        { status: 503 }
      );
    }

    const body = (await request.json()) as CreateTradeRequest;

    // 驗證必填欄位
    if (
      !body.item_id ||
      !body.item_name ||
      !body.price ||
      !body.seller_id ||
      !body.seller_name ||
      !body.server
    ) {
      return NextResponse.json(
        {
          error: "Validation Error",
          message:
            "Missing required fields: item_id, item_name, price, seller_id, seller_name, server",
        },
        { status: 400 }
      );
    }

    // 生成交易 ID
    const tradeId = `trade_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    // 插入新交易
    const { success } = await env.DB.prepare(
      `
      INSERT INTO trades (
        id, item_id, item_name, refine_level, enchantments, card_slots,
        price, currency, seller_id, seller_name, server, status, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active', datetime("now"))
    `
    )
      .bind(
        tradeId,
        body.item_id,
        body.item_name,
        body.refine_level || 0,
        body.enchantments || null,
        body.card_slots || 0,
        body.price,
        body.currency || "zeny",
        body.seller_id,
        body.seller_name,
        body.server
      )
      .run();

    if (success) {
      // 獲取創建的交易詳情
      const { results } = await env.DB.prepare(
        "SELECT * FROM trades WHERE id = ?"
      )
        .bind(tradeId)
        .all();

      return NextResponse.json(
        {
          success: true,
          message: "Trade created successfully",
          data: results[0],
        },
        { status: 201 }
      );
    } else {
      throw new Error("Failed to create trade");
    }
  } catch (error) {
    console.error("POST /api/trades error:", error);

    return NextResponse.json(
      {
        error: "Database Error",
        message:
          error instanceof Error ? error.message : "Failed to create trade",
      },
      { status: 500 }
    );
  }
}

// OPTIONS - CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
