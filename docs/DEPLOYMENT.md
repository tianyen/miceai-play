# 部署與維護

## GitHub Pages

本專案不需編譯，將 `main` 分支根目錄直接作為網站來源。

1. Repository → Settings → Pages。
2. Source 選擇 **Deploy from a branch**。
3. Branch 選擇 **main**，Folder 選擇 **/(root)**，按 Save。
4. 等待 Pages build and deployment 完成。
5. 開啟 https://tianyen.github.io/miceai-play/ 。

網站資源使用相對路徑，適用 `/miceai-play/` 專案子路徑。`.nojekyll` 用於直接發布靜態檔案。

## 日常修改

- 文案、表單欄位：修改 `index.html`。
- 顏色、字標、桌面與手機排版：修改 `styles.css`。
- 題目、情境、模擬票數及流程：修改 `app.js`。
- 圖片：置於 `assets/`，更新 HTML／JavaScript 對應路徑；保留合理壓縮與 alt 說明。
- 修改 CSS 或 JS 後，更新 HTML 中對應檔案的 `?v=` 版本值避免舊快取。
- 將變更提交至 `main`，GitHub Pages 會重新發布。

## 更新前檢查

```sh
node --check app.js
python3 -m http.server 4190 --bind 127.0.0.1
```

確認手機版沒有水平捲軸，問答／空投／領券／洽詢流程可走完，圖片可載入。不要提交 `.env`、憑證、私人客戶資料或本機暫存。

## 聯絡表單

聯絡信箱在 `index.html` 與 `app.js`。目前不連接伺服器，提交只整理摘要；寄信仍由使用者自行完成。若要正式收件、核銷或預約，需另行建置服務與資料處理流程。

## 雙語更新

繁中為 `index.html`／`app.js`，英文為 `en.html`／`en-app.js`。更新中文文案後，同步修改 `scripts/en-translations.tsv`，執行 `python3 scripts/build_english.py`。產生程式會檢查英文產生檔是否仍有未翻譯中文字（語言切換的「繁中」除外）。請提交原始檔、翻譯表及產生檔。語言切換保留 URL 區段，不保存表單及試玩狀態。
