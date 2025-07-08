const CACHE_NAME = 'dewangga-chat-v1';
const urlsToCache = [
    '/',
    'index.html',
    'image/dewangga.png',
    'image/icon-192.png',
    'image/icon-512.png',
    'audio/dewanggacall.mp3',
    'audio/calling.mp3'
];

// Event saat Service Worker di-install
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Event saat ada request dari halaman web
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Jika request ada di cache, kembalikan dari cache
                if (response) {
                    return response;
                }
                // Jika tidak, fetch dari network
                return fetch(event.request);
            })
    );
});