# miceAI PLAY｜活動互動遊戲平台

面向品牌、企業、展覽及商場活動的 B2B 產品介紹網站，以 **互動遊戲、數位空投、票券導流** 串起參與、獎勵與下一步行動。

**繁體中文：** https://tianyen.github.io/miceai-play/

**English:** https://tianyen.github.io/miceai-play/en.html

## 網站內容

- 品牌首屏與虹彩 AI 字標。
- 加入互動 → 完成挑戰 → 領取獎勵 → 到店、購票或預約的完整示例。
- 六種玩法提案與分類篩選。
- 數位空投產品圖、發放情境與領取流程。
- 票券導流產品圖與到店／購票／預約頁籤。
- 品牌問答、模擬投票、創意留言三種可操作示範。
- 活動情境、合作流程、FAQ 與需求摘要表單。

## 本機預覽

無需安裝套件，可直接開啟 `index.html`。建議使用本機伺服器：

```sh
python3 -m http.server 4190 --bind 127.0.0.1
```

瀏覽 http://127.0.0.1:4190/ 。

## 檔案結構

```text
index.html        網站內容與區段
styles.css        版面、虹彩字標與響應式樣式
app.js            互動、示範與表單
assets/           網頁使用的 WebP 圖片
design-source/    三張產品圖 PNG 原稿與生成提示
docs/             內容規劃、維護部署及驗收說明
.nojekyll         停用 Jekyll 處理，直接發布靜態檔案
```

## 維護文件

- [內容與產品規劃](docs/CONTENT-PLAN.md)
- [部署與維護](docs/DEPLOYMENT.md)
- [驗收與功能界線](docs/QA.md)
- [素材說明](design-source/README.md)

## 功能界線

目前為靜態行銷網站。遊戲、投票、留言、空投及領券均在瀏覽器本機示範；不建立真實預約、不發行或核銷正式票券、不處理付款。表單只生成可複製／下載的需求摘要與郵件草稿，使用者須自行寄出，不會自動上傳資料。

玩法屬創意方案；正式客製、票務串接、活動規模及現場支援依合作規格確認。產品與活動圖片為 AI 生成概念示意，不代表真實客戶案例。

© 2026 天衍互動股份有限公司。公開存放不等於授予品牌、圖片或程式碼再利用授權；本儲存庫目前未指定開源授權。

## 中英文版本

右上角「繁中／EN」切換語言，保留目前區段。中文入口 `index.html`，英文入口 `en.html`；兩版包含完整文案、圖片說明、遊戲、票券示範與需求摘要。切換會載入另一語言頁面，當次表單與試玩狀態不跨頁保存。

維護中文 `index.html`／`app.js` 與 `scripts/en-translations.tsv`，再執行：

```sh
python3 scripts/build_english.py
node --check app.js
node --check en-app.js
```

`en.html` 與 `en-app.js` 為產生檔，請一併提交至 main。共用 `styles.css`，英文專用排版以 `html[lang=en]` 套用。GitHub Pages 不執行這個產生程式，仍直接發布提交的靜態檔案。
