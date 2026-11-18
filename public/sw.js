// AdioSugar Service Worker - Basic offline caching
const CACHE_NAME = 'adiosugar-v1'
const STATIC_CACHE = 'adiosugar-static-v1'

// Assets to cache immediately on install
const STATIC_ASSETS = [
  '/',
  '/app',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/favicon.ico'
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...')
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Caching static assets')
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => self.skipWaiting())
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...')
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME && name !== STATIC_CACHE)
            .map((name) => caches.delete(name))
        )
      })
      .then(() => self.clients.claim())
  )
})

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event

  // Skip non-GET requests
  if (request.method !== 'GET') return

  // Skip Supabase API calls and external resources
  if (
    request.url.includes('supabase.co') ||
    request.url.includes('openai.com') ||
    request.url.includes('google') ||
    request.url.startsWith('chrome-extension://')
  ) {
    return
  }

  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          console.log('[SW] Serving from cache:', request.url)
          return cachedResponse
        }

        // Not in cache - fetch from network and cache it
        return fetch(request)
          .then((response) => {
            // Only cache successful responses
            if (!response || response.status !== 200 || response.type === 'error') {
              return response
            }

            // Clone the response before caching
            const responseToCache = response.clone()

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(request, responseToCache)
              })

            return response
          })
          .catch((error) => {
            console.log('[SW] Fetch failed:', error)
            // Return offline fallback if available
            return caches.match('/offline.html')
              .then((fallback) => fallback || new Response('Offline'))
          })
      })
  )
})

// Background sync for offline data
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event.tag)
  if (event.tag === 'sync-quiz-data') {
    event.waitUntil(syncQuizData())
  }
})

async function syncQuizData() {
  console.log('[SW] Syncing quiz data...')
  // Placeholder for future background sync logic
  return Promise.resolve()
}

// Push notifications (future feature)
self.addEventListener('push', (event) => {
  console.log('[SW] Push notification received')
  const options = {
    body: event.data ? event.data.text() : 'Stay strong! 💪',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [200, 100, 200]
  }

  event.waitUntil(
    self.registration.showNotification('AdioSugar', options)
  )
})