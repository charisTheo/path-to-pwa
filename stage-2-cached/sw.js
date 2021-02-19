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

/* ----------------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------- */
/*                                    Stage 2 - Cached                                       */
/* ----------------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------- */
/**
 * Basic caching for CSS and JS.
 */
workbox.routing.registerRoute(
  /\.(?:js|css)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'css_js'
  })
);

/**
 * Basic caching for fonts.
 */
workbox.routing.registerRoute(
  /\.(?:woff|woff2|ttf|otf|eot)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'fonts'
  })
);

/**
 * Basic caching for images.
 */
workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg|webp)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        // Only cache 60 images.
        maxEntries: 60,
        purgeOnQuotaError: true
      })
    ]
  })
);
