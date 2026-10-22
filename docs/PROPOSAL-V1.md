# AI 免費活動提案入口 V1 — 2026-10-22

依據：[Slack 企劃 V1](https://tianyen.slack.com/docs/TUS21AT4L/F0CAZP6PNUB)。

## 本次上線內容

- 保留現有虹彩 AI、鮮豔高對比視覺、數位空投、票券導流與試玩。
- 主標「讓每一場活動，都有人想參與。」；免費提案主 CTA、立即試玩次 CTA。
- 試玩後提案入口；合作夥伴與主辦方共用網站，以身分欄位分流。
- 三步表單：身分 → 活動需求 → 聯絡資料；中英文共用穩定欄位代碼。
- 預算 TWD 意向非報價，電話選填，提案用途同意與行銷選擇分離。
- 完整提案不在網站預覽；由 Email 提供，預計 2–3 頁 PDF。

## 目前實際運作

`proposal-config.js` 的 endpoint 為空。表單只在頁面記憶體整理資料，由使用者開啟郵件、確認並寄出至 `tianyen.inc@gmail.com`。複製／下載為郵件程式不可用時的備援。沒有自動寄信、AI 生成 PDF、CRM 建單、業務通知或成本估算服務；也不宣稱需求已收件。離開或切換語言會清除未寄出的表單，無瀏覽器個資持久儲存。

`proposal.js` 內含繁中／英文 UI；`index.html` 和 `app.js` 仍由 `scripts/build_english.py` 與 TSV 生成英文對應檔。更新文案時請同時更新翻譯。

## 啟用後端的契約（待工程師部署）

1. HTTPS POST endpoint，僅接受正式網站 Origin，回應正確 CORS（允許 Content-Type、Idempotency-Key）；頁面不放金鑰。
2. JSON 包含 identity/event/date/venue/people/goal/modules/budget/note/company/name/email/phone/consent/marketing/locale/currency/source/consentVersion。選項 enum 以 `proposal.js` 為準。日期／場地可填待確認；人數為整數字串。currency 固定 TWD，英文不做匯率轉換。
3. 伺服器重驗格式、長度、enum、同意；限制流量及重複 Email，驗證來源並配置防機器人。前端蜜罐僅輔助，不能替代伺服器驗證。
4. 以 Idempotency-Key 原子去重，相同內容重試回同一 requestId。前端逾時 20 秒，未知結果保留資料及相同 key；不得因重試重寄提案。跨頁重送須後端另做去重。
5. **只有資料已持久保存並建立可靠後續處理任務後**才回 2xx JSON `{"accepted":true,"requestId":"..."}`。此時顯示「已收到活動需求」；不代表郵件已送達。非 2xx、缺欄位、斷線均顯示未確認，可重試。
6. 背景任務用既有模組與核准成本規則產出 2–3 頁 PDF；未核准或缺成本轉人工，不讓模型虛構單價。區分系統、內容、設備、現場服務與稅／交通等假設。
7. Email 品牌寄件驗證、提案附件、專人預約連結、退信與重試監控、業務通知、名單狀態、權限與保留政策都須完成後才切換 endpoint。更新 FAQ 中目前採郵件申請的說明。
8. 前端成功只是收件；後端追蹤 proposal_sent、sales_contacted、qualified、quoted、won/lost。不得因行銷未同意而拒絕提案。

待提供：收件 API、正式寄信服務及寄件網域、核准價格／成本表、PDF 模板確認、預約連結、負責人與資料保留期限。沒有這些設定時保持郵件申請模式。

## 驗證

啟動根目錄 `python3 -m http.server 8766 --bind 127.0.0.1`。
安裝 Playwright 於獨立開發環境後執行 `NODE_PATH=/path/to/node_modules node scripts/test-proposal.cjs`。

已驗證：中英文三步流程、必填與無效 Email、上一步保留、郵件內容、320/390/768/1440px 無橫向溢出、票券試玩轉提案、API 模擬錯誤／錯誤格式／重試相同 idempotency key／確認收件、無 JS 例外。API 測試為攔截模擬，非實際服務整合測試。以瀏覽器截圖檢視桌面首頁／表單與英文手機首頁。
