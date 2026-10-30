/* Offline support. Code and pages: network first, so a new deploy shows up right away; cached copy when offline.
   Images and Hebrew audio rarely change: cache first. */
const CACHE = 'lev-v1';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  const store = res => { if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); } return res; };
  if (/\/(img|audio)\//.test(url.pathname)) {
    e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request).then(store)));
  } else {
    e.respondWith(fetch(e.request).then(store).catch(() => caches.match(e.request, { ignoreSearch: true }).then(hit => hit || caches.match('./'))));
  }
});
