# TWROZ Trading Post API Documentation

這是 TWROZ Trading Post 的 Next.js API Routes 文檔，部署在 Cloudflare Pages 上。

## 📋 概述

這個 API 集成到 Next.js 的 App Router 中，利用 Cloudflare D1 數據庫，讓你可以在同一個項目中運行前端和後端。

## 🗂️ API 結構

```
src/app/api/
├── hello/
│   └── route.ts          # GET /api/hello - Hello World + DB 測試
├── users/
│   └── route.ts          # GET/POST /api/users - 用戶管理
└── trades/
    └── route.ts          # GET/POST /api/trades - 交易管理
```

## 🚀 快速開始

### 1. 設定數據庫

創建 D1 數據庫並獲取 database_id：

```bash
pnpm db:create
```

### 2. 更新配置

將獲得的 database_id 更新到 `wrangler.jsonc` 中：

```json
{
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "twroz-trading-post-db",
      "database_id": "your-database-id-here"
    }
  ]
}
```

### 3. 執行數據庫遷移

```bash
# 遠端數據庫
pnpm db:migrate

# 本地數據庫（用於開發）
pnpm db:migrate:local
```

### 4. 開發與部署

```bash
# 本地開發
pnpm dev

# 測試 API
pnpm test:api

# 部署到 Cloudflare Pages
pnpm deploy
```

# 創建數據庫

wrangler d1 create twroz-trading-post-db

# 初始化 Schema

wrangler d1 execute twroz-trading-post-db --file=./workers/schema.sql

# 本地開發時初始化本地數據庫

wrangler d1 execute twroz-trading-post-db --local --file=./workers/schema.sql

````

### 3. 部署
```bash
# 構建和部署
pnpm build
pnpm deploy
````

## 📡 API 端點使用

### Hello World

```javascript
// GET /api/hello
const response = await fetch('/api/hello');
const data = await response.json();

// 返回例子：
{
  "message": "Hello World from Next.js API Routes on Cloudflare!",
  "timestamp": "2025-07-24T07:00:00.000Z",
  "database_time": "2025-07-24 07:00:00",
  "project": "TWROZ Trading Post API",
  "version": "1.0.0",
  "runtime": "Next.js App Router",
  "platform": "Cloudflare Pages"
}
```

### 用戶管理

```javascript
// GET /api/users - 獲取用戶列表
const users = await fetch("/api/users");
const userData = await users.json();

// POST /api/users - 創建用戶
const newUser = await fetch("/api/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "新玩家",
    email: "player@example.com",
  }),
});
```

### 交易管理

```javascript
// GET /api/trades - 獲取交易列表
const trades = await fetch("/api/trades?server=A&limit=20&offset=0");
const tradeData = await trades.json();

// GET /api/trades - 搜索交易
const searchTrades = await fetch("/api/trades?item_name=神器劍&server=A");

// POST /api/trades - 創建交易
const newTrade = await fetch("/api/trades", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    item_id: "1201",
    item_name: "神器劍 [4]",
    refine_level: 10,
    enchantments: "力量+3, 敏捷+2",
    card_slots: 4,
    price: 1500000,
    currency: "zeny",
    seller_id: "user_001",
    seller_name: "玩家A",
    server: "A",
  }),
});
```

## 🔧 在前端中使用

### 使用 React Query

```typescript
// src/hooks/useApi.ts
import { useQuery, useMutation } from "@tanstack/react-query";

export const useHello = () => {
  return useQuery({
    queryKey: ["hello"],
    queryFn: async () => {
      const response = await fetch("/api/hello");
      if (!response.ok) throw new Error("Failed to fetch");
      return response.json();
    },
  });
};

export const useTrades = (
  filters: { server?: string; itemName?: string } = {}
) => {
  return useQuery({
    queryKey: ["trades", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters.server) params.append("server", filters.server);
      if (filters.itemName) params.append("item_name", filters.itemName);

      const response = await fetch(`/api/trades?${params}`);
      if (!response.ok) throw new Error("Failed to fetch trades");
      return response.json();
    },
  });
};

export const useCreateTrade = () => {
  return useMutation({
    mutationFn: async (tradeData: CreateTradeRequest) => {
      const response = await fetch("/api/trades", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tradeData),
      });
      if (!response.ok) throw new Error("Failed to create trade");
      return response.json();
    },
  });
};
```

### 在元件中使用

```typescript
// 在 TradeListTable 中
import { useTrades } from "@/hooks/useApi";

export default function TradeListTable() {
  const {
    data: tradesResponse,
    isLoading,
    error,
  } = useTrades({
    server: "A",
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const trades = tradesResponse?.data || [];

  return (
    <div>
      {trades.map((trade) => (
        <div key={trade.id}>{trade.item_name}</div>
      ))}
    </div>
  );
}
```

## 🔍 本地開發

```bash
# 啟動本地開發（使用本地 D1）
pnpm dev

# API 將在以下端點可用：
# http://localhost:3000/api/hello
# http://localhost:3000/api/users
# http://localhost:3000/api/trades
```

## ✨ 優勢

1. **統一部署**：前端和 API 在同一個 Cloudflare Pages 項目中
2. **類型安全**：共享 TypeScript 類型定義
3. **簡化開發**：無需設置額外的 API 服務
4. **自動擴容**：Cloudflare Pages 自動處理擴容
5. **成本效益**：免費額度通常足夠小型項目

## 🚨 注意事項

1. **運行時限制**：Cloudflare Workers 有 CPU 時間限制
2. **數據庫連接**：D1 在 request 級別建立連接
3. **錯誤處理**：確保所有 API 都有適當的錯誤處理
4. **CORS**：已配置允許跨域請求
