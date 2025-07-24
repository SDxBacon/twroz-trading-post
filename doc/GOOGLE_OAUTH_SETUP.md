# Google OAuth 設置指南

## 1. 在 Google Cloud Console 設置

1. 前往 [Google Cloud Console](https://console.cloud.google.com/)
2. 創建新專案或選擇現有專案
3. 啟用 Google+ API
4. 前往「憑證」頁面
5. 點擊「建立憑證」→「OAuth 2.0 用戶端 ID」
6. 選擇「網路應用程式」
7. 設定重新導向 URI：
   - 開發環境：`http://localhost:3000/api/auth/callback/google`
   - 生產環境：`https://yourdomain.com/api/auth/callback/google`

## 2. 更新環境變數

在 `.env.local` 檔案中更新以下變數：

```env
# NextAuth.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-here

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here
```

## 3. 生成 NEXTAUTH_SECRET

在終端機執行：

```bash
openssl rand -base64 32
```

## 4. 測試功能

1. 啟動開發服務器：`pnpm dev`
2. 訪問 `http://localhost:3000`
3. 點擊導航欄中的「Google 登入」按鈕
4. 完成 Google OAuth 流程

## 5. 已實現的功能

- ✅ Google OAuth 登入
- ✅ 用戶狀態顯示在導航欄
- ✅ 首頁歡迎訊息
- ✅ 登出功能
- ✅ SessionProvider 整合

## 6. 注意事項

- 確保 `.env.local` 不被提交到版本控制
- 在生產環境中使用 HTTPS
- 定期更新 OAuth 憑證
