importScripts('serviceworker-cache-polyfill.js');
var CACHE_NAME = 'app-cache';
var urlsToCache = [
    'index.html',
    './scripts/main.js',
    './styles/main.css'
];

self.addEventListener('install', function(event) {
  // 新しいSWの登録中に呼ばれる
  // リソースをキャッシュしたりする
  console.log('install:', event);
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', function(event) {
  // SWがアクティブになる直前に呼ばれる
  // 古いリソースを消したりする
  console.log('activate:', event);
});

self.addEventListener('fetch', function(event) {
  
  console.log('fetch:', event);

  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          console.log("[return cache] ", (response.url).split("/").pop());
          return response;
        }
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest)
          .then(function(response) {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                  cache.put(event.request, responseToCache);
              });
            
            return response;
          });
      })
  );
});