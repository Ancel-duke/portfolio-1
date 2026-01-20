// Service Worker for Portfolio Caching
const CACHE_NAME = 'ancel-portfolio-v1';
const RUNTIME_CACHE = 'ancel-portfolio-runtime-v1';

// Assets to cache immediately
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/assets/profile-photo.jpg',
  '/assets/projects/LedgerX.jpg',
  '/assets/projects/EduChain.jpg',
  '/assets/projects/taskforge.jpg',
  '/manifest.json'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE;
          })
          .map((cacheName) => caches.delete(cacheName))
      );
    })
    .then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Return cached version if available
        if (cachedResponse) {
          return cachedResponse;
        }

        // Otherwise fetch from network
        return fetch(event.request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response for caching
            const responseToCache = response.clone();

            // Cache images and static assets
            if (event.request.destination === 'image' || 
                event.request.url.includes('/assets/') ||
                event.request.url.includes('/static/')) {
              caches.open(RUNTIME_CACHE)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });
            }

            return response;
          })
          .catch(() => {
            // Return offline fallback if available
            if (event.request.destination === 'image') {
              return new Response(
                '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="#ccc"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#999">Image</text></svg>',
                { headers: { 'Content-Type': 'image/svg+xml' } }
              );
            }
          });
      })
  );
});
