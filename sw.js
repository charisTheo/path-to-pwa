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
/*                                    Stage 3 - Offline                                      */
/* ----------------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------- */
const OFFLINE_HTML = './offline/offline.html';
const PRECACHE = [
  { url: OFFLINE_HTML, revision: '70f044fda3e9647a98f084763ae2c32a' }
];

/**
 * Precache Manifest for resources available offline.
 * https://developers.google.com/web/tools/workbox/modules/workbox-precaching#explanation_of_the_precache_list
 */
workbox.precaching.precacheAndRoute(PRECACHE);

/*
 * Fallback to offline HTML page when a navigation request fails.
 */
const htmlHandler = new workbox.strategies.NetworkOnly();
// A NavigationRoute matches navigation requests in the browser, i.e. requests for HTML.
const navigationRoute = new workbox.routing.NavigationRoute(({ event }) => {
  const request = event.request;
  return htmlHandler.handle({ event, request }).catch(() => caches.match(OFFLINE_HTML, {
    ignoreSearch: true
  }));
});
workbox.routing.registerRoute(navigationRoute);


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
    cacheName: 'fonts',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        // cache for 1 year
        maxAgeSeconds: 60 * 60 * 24 * 365,
      })
    ]
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
