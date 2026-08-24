🚌 香港即時巴士路線指南 HK Bus Express (PWA)

HK Bus Express 是一個輕量、快速且響應式的香港即時巴士路線指南 Progressive Web App (PWA)。直接透過香港政府「資料一線通」開放 API 連線取得九龍巴士 (KMB) 及城巴 (Citybus) 的即時到站時間 (ETA) 與路線資訊，並提供互動地圖和 GPS 定位功能。

✨ 主要功能 (Features)

⚡ 即時到站時間 (Live ETA)：即時獲取九巴與城巴的最新班次預計到站時間，支援自動每 5 分鐘刷新。

🗺️ 互動路線地圖 (Interactive Map)：整合 Leaflet 地圖，清楚標示全線巴士站點位置、序號及路線圖軌跡。

📍 GPS 定位與距離計算：自動測量您當前位置與鄰近巴士站點的距離（以米/公里顯示）。

📱 PWA 手機 Native 體驗：

支援 Android / iOS「新增至主螢幕 / 安裝 App」獨立視窗運行。

專為手機設計的底部導覽列 (Bottom Navigation Bar) 與 SafeArea 適配。

Service Worker 快取，加速靜態資源載入。

🌐 雙語介面 (Bilingual)：一鍵切換繁體中文及英文介面。

🌙 深色模式 (Dark Mode)：支援日夜間模式切換與系統主題自動配合。

💳 完整車費資訊：提供成人全程、小童半價及 $2 長者優惠，並支援站點分段收費估算。

⭐️ 路線收藏 (Favorites)：快速將常用路線加入收藏，便於日後快速查閱。

📁 專案檔案結構 (Project Structure)

.
├── index.html       # 主應用程式 (HTML5 / Tailwind CSS / Leaflet JS / App 邏輯)
├── manifest.json    # PWA 清單設定檔 (App 名稱、圖示與顯示模式設定)
├── sw.js            # Service Worker (離線靜態資源快取與 PWA 服務)
└── README.md        # 專案說明文件


開始使用

等待 1~2 分鐘，GitHub 會生成您的網站網址（格式如：https://<YOUR-USERNAME>.github.io/<REPO-NAME>/）。

在手機瀏覽器（iOS Safari / Android Chrome）開啟該網址，點擊「安裝 App」或「新增至主畫面」即可享用如原生 App 般的巴士指南！

🌐 API 資料來源 (Data Sources)

本應用程式之巴士數據均透過公開 API 即時獲取，感謝以下提供者：

DATA.GOV.HK 香港政府資料一線通

九龍巴士 (KMB) Open API

城巴 (Citybus) Open API

📄 聲明與授權 (Disclaimer & License)

本專案採用 MIT License 授權。

本應用程式僅供交通數據參考，所有到站時間數據以巴士公司實時公佈為準。