/* eslint-disable no-undef */

/* ----------------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------- */
/*                                    Stage 1 - Installable                                  */
/* ----------------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------- */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.0/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
}

self.addEventListener('install', (event) => {
  console.log('👷', 'install', event);
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('👷', 'activate', event);
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  console.log('👷', 'fetch', event);
  event.respondWith(fetch(event.request));
});
