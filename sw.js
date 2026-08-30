const CACHE_NAME = 'hk-bus-express-v1';

// 靜態資源預載快取清單
const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './favicon.ico',
  './favicon-16x16.png',
  './favicon-32x32.png',
  './icon-180.png',
  './icon-192.png',
  './icon-512.png',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
];

// Service Worker 安裝事件：預快取基本靜態資源
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Pre-caching offline assets');
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('[Service Worker] Pre-cache partial failure:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Service Worker 啓動事件：清理舊版本快取
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 網絡請求攔截與快取策略 (網絡優先，離線時使用快取)
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // 對於政府開放數據 API 採用網絡優先策略 (Network-First)
  if (
    url.hostname.includes('data.etabus.gov.hk') ||
    url.hostname.includes('rt.data.gov.hk') ||
    url.hostname.includes('basemaps.cartocdn.com')
  ) {
    event.respondWith(
      fetch(req)
        .then((networkResponse) => {
          // 若 API 請求成功，可可選擇性將其寫入動態快取
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(req, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // 網絡中斷時試圖回傳離線快取
          return caches.match(req);
        })
    );
    return;
  }

  // 對於 HTML / JS / CSS / 圖標等靜態檔案，採用快取優先 (Stale-While-Revalidate)
  event.respondWith(
    caches.match(req).then((cachedResponse) => {
      const fetchPromise = fetch(req).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, responseClone));
        }
        return networkResponse;
      }).catch(() => {/* 網絡失敗時忽略，直接使用快取 */});

      return cachedResponse || fetchPromise;
    })
  );
});