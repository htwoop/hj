const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = ['/',
    '/index.html',
    '/editor1.html',
    '/editor2.html',
    '/contact.html',
    '/style.css',
    '/paint_image.jpg',
    '/paint_image2.jpg',
    '/paint_image3.jpg'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});