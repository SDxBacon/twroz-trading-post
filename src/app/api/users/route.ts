import { NextRequest, NextResponse } from "next/server";

interface CloudflareEnv {
  DB?: D1Database;
}

interface CreateUserRequest {
  name: string;
  email: string;
}

// GET /api/users - 獲取所有用戶
export async function GET(request: NextRequest) {
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

    const { results } = await env.DB.prepare(
      "SELECT * FROM users ORDER BY created_at DESC"
    ).all();

    return NextResponse.json({
      success: true,
      data: results,
      count: results.length,
    });
  } catch (error) {
    console.error("GET /api/users error:", error);

    return NextResponse.json(
      {
        error: "Database Error",
        message:
          error instanceof Error ? error.message : "Failed to fetch users",
      },
      { status: 500 }
    );
  }
}

// POST /api/users - 創建新用戶
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

    const body = (await request.json()) as CreateUserRequest;

    // 驗證輸入
    if (!body.name || !body.email) {
      return NextResponse.json(
        {
          error: "Validation Error",
          message: "Name and email are required",
        },
        { status: 400 }
      );
    }

    // 檢查 email 是否已存在
    const existingUser = await env.DB.prepare(
      "SELECT id FROM users WHERE email = ?"
    )
      .bind(body.email)
      .first();

    if (existingUser) {
      return NextResponse.json(
        {
          error: "Validation Error",
          message: "Email already exists",
        },
        { status: 409 }
      );
    }

    // 創建新用戶
    const { success, meta } = await env.DB.prepare(
      'INSERT INTO users (name, email, created_at) VALUES (?, ?, datetime("now"))'
    )
      .bind(body.name, body.email)
      .run();

    if (success) {
      return NextResponse.json(
        {
          success: true,
          message: "User created successfully",
          data: {
            userId: meta.last_row_id,
            name: body.name,
            email: body.email,
          },
        },
        { status: 201 }
      );
    } else {
      throw new Error("Failed to create user");
    }
  } catch (error) {
    console.error("POST /api/users error:", error);

    return NextResponse.json(
      {
        error: "Database Error",
        message:
          error instanceof Error ? error.message : "Failed to create user",
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
