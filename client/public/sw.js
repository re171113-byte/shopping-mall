const CACHE_NAME = 'stylish-v1'
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
]

// 설치 이벤트
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  )
  self.skipWaiting()
})

// 활성화 이벤트
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  self.clients.claim()
})

// 페치 이벤트 (네트워크 우선, 캐시 폴백)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // 응답 복제하여 캐시에 저장
        if (response.status === 200) {
          const responseClone = response.clone()
          caches.open(CACHE_NAME)
            .then((cache) => cache.put(event.request, responseClone))
        }
        return response
      })
      .catch(() => caches.match(event.request))
  )
})
