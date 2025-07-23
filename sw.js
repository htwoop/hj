const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
    '.index.html',
    '.editor1.html',
    '.editor2.html',
    '.contact.html',
    '.style.css',
    '.paint_image.jpg',
    '.paint_image2.jpg',
    '.paint_image3.jpg'];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) =>
            cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(fromCache(event.request));
    event.waitUntil(update(event.request));
});

function fromCache(request) {
    return caches.open(CACHE_NAME).then((cache) =>
        cache.match(request).then((matching) =>
            matching || Promise.reject('no-match')
        ));
}

function update(request) {
    return caches.open(CACHE_NAME).then((cache) =>
        fetch(request).then((response) =>
            cache.put(request, response)
        )
    );
}
