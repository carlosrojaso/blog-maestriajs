---
layout: null
---
var urlsToCache = [
  '/',
  '/css/main.css'
];
{% for file in site.static_files %}
    {% if file.path contains '/js' or file.path contains '/images' %}
    urlsToCache.push("{{ file.path }}");
    {% endif %}
{% endfor %}

// Cache posts
{% for post in site.posts limit:5 %}
   urlsToCache.push("{{ post.url }}");
{% endfor %}

// Cache pages
{% for page in site.html_pages %}
   urlsToCache.push("{{ page.url }}");
{% endfor %}

var CACHE_NAME = 'ion-book-cache-v2';

self.addEventListener('install', function(event) {
  self.skipWaiting();
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  )
});

self.addEventListener('activate', event => {
  // delete any caches that aren't in expectedCaches
  // which will get rid of static-v1

  var expectedCaches = []; // white-list

  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (!expectedCaches.includes(key)) {
          return caches.delete(key);
        }
      })
    )).then(() => {
      console.log('V2 now ready to handle fetches!');
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.match(event.request).then(function(response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    }).catch(function() {
      console.log('Error un request.');
    })
  );
});

