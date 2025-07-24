# Discord OAuth 設定指南

## 步驟 1: 創建 Discord 應用程式

1. 前往 [Discord Developer Portal](https://discord.com/developers/applications)
2. 點擊 "New Application"
3. 輸入應用程式名稱（例如 "Trading Post"）
4. 點擊 "Create"

## 步驟 2: 設定 OAuth2

1. 在左側選單中點擊 "OAuth2"
2. 在 "Redirects" 區段，點擊 "Add Redirect"
3. 輸入以下 URL：
   ```
   https://twroz-trading-post.z141134553.workers.dev/api/auth/callback/discord
   ```
4. 點擊 "Save Changes"

## 步驟 3: 獲取 Client ID 和 Client Secret

1. 在 "OAuth2" > "General" 頁面中：
   - **Client ID**: 複製這個值，稍後需要設定為 `DISCORD_CLIENT_ID`
   - **Client Secret**: 點擊 "Reset Secret"，然後複製新的 secret，設定為 `DISCORD_CLIENT_SECRET`

## 步驟 4: 設定 GitHub Secrets

前往你的 GitHub 倉庫：

1. 點擊 "Settings" 標籤
2. 在左側選單中點擊 "Secrets and variables" > "Actions"
3. 點擊 "New repository secret" 並添加以下 secrets：

- **Name**: `DISCORD_CLIENT_ID`
  **Value**: [從 Discord Developer Portal 複製的 Client ID]

- **Name**: `DISCORD_CLIENT_SECRET`
  **Value**: [從 Discord Developer Portal 複製的 Client Secret]

## 步驟 5: 本地開發環境設定

創建或更新 `.env.local` 檔案：

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
DISCORD_CLIENT_ID=your-discord-client-id
DISCORD_CLIENT_SECRET=your-discord-client-secret
```

## 重要注意事項：

1. **Redirect URI 必須完全匹配**：

   - 生產環境: `https://twroz-trading-post.z141134553.workers.dev/api/auth/callback/discord`
   - 本地開發: `http://localhost:3000/api/auth/callback/discord`

2. **Client Secret 安全性**：

   - 永遠不要在程式碼中硬編碼 Client Secret
   - 只通過環境變數或 GitHub Secrets 傳遞

3. **Discord OAuth Scopes**：
   - NextAuth.js 的 Discord Provider 預設會要求 `identify` 和 `email` 權限
   - 這足以獲取使用者的基本資訊進行驗證
