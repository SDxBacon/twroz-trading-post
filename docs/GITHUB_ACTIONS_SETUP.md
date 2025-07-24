# GitHub Actions CI/CD 設置指南

## 1. 獲取 Cloudflare 憑證

### Cloudflare API Token

1. 登入 [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens)
2. 點擊「Create Token」
3. 選擇「Custom token」
4. 設置權限：
   - **Account** - `Cloudflare Pages:Edit`
   - **Zone** - `Zone:Read`（如果有自訂域名）
5. 複製生成的 Token

### Cloudflare Account ID

1. 在 Cloudflare Dashboard 右側找到 Account ID
2. 複製 Account ID

## 2. 在 GitHub Repository 設置 Secrets

前往您的 GitHub Repository：`Settings` → `Secrets and variables` → `Actions`

### 必要的 Secrets：

```
CLOUDFLARE_API_TOKEN=your-cloudflare-api-token
CLOUDFLARE_ACCOUNT_ID=your-cloudflare-account-id
NEXTAUTH_URL=https://your-domain.pages.dev
NEXTAUTH_SECRET=your-nextauth-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 如何添加 Secrets：

1. 點擊「New repository secret」
2. 輸入 Secret 名稱（如 `CLOUDFLARE_API_TOKEN`）
3. 輸入對應的值
4. 點擊「Add secret」

## 3. 準備部署配置

### 更新 `wrangler.jsonc`

確保您的 `wrangler.jsonc` 包含正確的 Pages 配置：

```jsonc
{
  "name": "twroz-trading-post",
  "compatibility_date": "2025-03-01",
  "pages_build_output_dir": ".open-next/assets"
}
```

**注意**：Pages 專案配置不能包含 Worker 相關的欄位（如 `main`、`assets`、`compatibility_flags`）。

## 4. GitHub Actions Workflow 功能

### 觸發條件：

- ✅ Push 到 `main` 分支
- ✅ Pull Request 到 `main` 分支

### 構建流程：

1. **Checkout 代碼**
2. **設置 Node.js 20**
3. **安裝 pnpm**
4. **安裝依賴** (`pnpm install`)
5. **構建應用** (`pnpm build`)
6. **OpenNext 構建** (`npx opennextjs-cloudflare build`)
7. **使用 Wrangler 部署到 Cloudflare Pages**

### 環境變數：

- 自動從 GitHub Secrets 注入
- 構建時可用的所有必要憑證

## 5. 首次部署步驟

### 5.1 設置 Cloudflare Pages Project

```bash
# 本地先手動部署一次建立專案
pnpm deploy
```

### 5.2 推送代碼觸發 CI/CD

```bash
git add .
git commit -m "feat: add GitHub Actions CI/CD"
git push origin main
```

## 6. 監控部署

### GitHub Actions

1. 前往 Repository → `Actions` 頁面
2. 查看工作流程執行狀態
3. 點擊具體的工作流程查看詳細日誌

### Cloudflare Pages

1. 前往 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 選擇 `Workers & Pages`
3. 查看 `twroz-trading-post` 專案的部署狀態

## 7. 常見問題排查

### pnpm deploy 錯誤

如果遇到 "A deploy is only possible from inside a workspace" 錯誤：

- 使用 `pnpm build` 和 `npx opennextjs-cloudflare build` 分離構建步驟
- 避免在 CI/CD 中使用 `pnpm deploy`，改用 Cloudflare Pages action 部署

### pnpm 版本衝突

如果遇到 "Multiple versions of pnpm specified" 錯誤：

- 移除 GitHub Actions 中的 `version: latest`
- 讓 pnpm action 使用 package.json 中的 `packageManager` 版本

### 構建失敗

**Wrangler 配置錯誤**：
如果遇到 "Configuration file cannot contain both 'main' and 'pages_build_output_dir'" 錯誤：

- Pages 專案不能同時包含 Worker 配置（`main`, `assets`）和 Pages 配置
- 移除 `main`、`assets`、`compatibility_flags` 等 Worker 相關配置
- 只保留 Pages 專案必需的配置項

如果遇到 "The name 'ASSETS' is reserved in Pages projects" 錯誤：

- 將 wrangler.jsonc 中的 assets binding 名稱改為 `STATIC_ASSETS`
- `ASSETS` 是 Pages 專案中的保留名稱

- 檢查所有 Secrets 是否正確設置
- 確認 `package.json` 中的構建腳本
- 查看 Actions 日誌中的錯誤訊息

### 部署失敗

**使用 Wrangler Action 的優勢**：

- 更直接的 Cloudflare Pages 部署方式
- 更好的錯誤處理和日誌輸出
- 與 OpenNext 更好的兼容性
- 支援 GitHub Deployments 整合
- 自動處理生產和預覽部署（基於分支）

**GitHub Actions 權限**：
- `contents: read` - 讀取代碼內容
- `deployments: write` - 建立 GitHub Deployments

**GitHub Deployments 整合**：
- 自動在 GitHub 介面顯示部署狀態
- 提供部署歷史記錄
- 支援預覽部署（非主分支）

**Wrangler 配置要求**：

- 必須在 `wrangler.jsonc` 中添加 `pages_build_output_dir` 字段
- 指向正確的構建輸出目錄 `.open-next/assets`

**常見問題**：

- 驗證 Cloudflare API Token 權限
- 確認 Account ID 正確
- 檢查專案名稱是否匹配

### 環境變數問題

- 確保所有必要的 Secrets 都已添加
- 檢查 Secret 名稱是否與 workflow 中的一致

## 8. 安全考量

- ✅ 所有敏感資訊都存儲在 GitHub Secrets 中
- ✅ Secrets 不會在日誌中顯示
- ✅ 僅授權的協作者可以訪問 Secrets
- ✅ API Token 具有最小必要權限

## 9. 進階配置

### 多環境部署

可以為不同分支設置不同的環境：

- `main` → 生產環境
- `develop` → 測試環境

### 自動化測試

在部署前添加測試步驟：

```yaml
- name: Run tests
  run: pnpm test
```

### 通知機制

可以添加 Discord/Slack 通知：

```yaml
- name: Notify deployment
  if: success()
  # 添加通知邏輯
```
