/**
 * RPM Québec — Service Worker
 * Stratégie : "app shell" précaché à l'installation, cache-first pour les
 * ressources statiques (CSS/JS/icônes), et network-first avec repli sur le
 * cache (puis sur offline.html) pour les pages HTML, afin que le site reste
 * pleinement utilisable hors-ligne.
 */
const CACHE_NAME = "rpm-quebec-v1";
const OFFLINE_URL = "offline.html";

const PRECACHE_URLS = [
  "index.html",
  "routes.html",
  "tutoriels.html",
  "permis.html",
  "contact.html",
  "offline.html",
  "css/styles.css",
  "js/main.js",
  "js/validation.js",
  "manifest.json",
  "icons/icon-192.png",
  "icons/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  /* Navigation (chargement de page HTML) : réseau d'abord, puis cache, puis page hors-ligne */
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match(OFFLINE_URL)))
    );
    return;
  }

  /* Ressources statiques : cache d'abord, puis réseau (et mise en cache) */
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request)
        .then((response) => {
          if (response && response.status === 200 && response.type === "basic") {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached);
    })
  );
});
