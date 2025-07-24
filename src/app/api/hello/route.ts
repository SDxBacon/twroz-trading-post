import { NextRequest, NextResponse } from "next/server";

// 定義 Cloudflare 環境類型
interface CloudflareEnv {
  DB?: D1Database;
}

export async function GET(request: NextRequest) {
  try {
    // 在 Cloudflare Pages 環境中，可以通過 request.env 或 process.env 訪問綁定的資源
    const env = (request as unknown as { env: CloudflareEnv }).env;

    let database_time = null;

    // 如果有 D1 數據庫綁定，測試連接
    if (env?.DB) {
      try {
        const { results } = await env.DB.prepare(
          'SELECT datetime("now") as current_time'
        ).all();
        database_time = results[0]?.current_time || null;
      } catch (dbError) {
        console.warn("Database connection failed:", dbError);
      }
    }

    const response = {
      message: "Hello World from Next.js API Routes on Cloudflare!",
      timestamp: new Date().toISOString(),
      database_time,
      project: "TWROZ Trading Post API",
      version: "1.0.0",
      runtime: "Next.js App Router",
      platform: process.env.CF_PAGES ? "Cloudflare Pages" : "Development",
    };

    return NextResponse.json(response, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    console.error("API Error:", error);

    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}

// 處理 CORS preflight 請求
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
