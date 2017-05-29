---
layout: null
---
var urlsToCache = [];

{% for file in site.static_files %}
    {% if file.path contains '/js' or file.path contains '/css' or file.path contains '/images' %}
    urlsToCache.push("{{ file.path }}")
    {% endif %}
{% endfor %}
// Cache assets
// Removed assets/posts because I only want assets from the most recent posts getting cached
/*
{% for file in site.static_files %}
    {% if file.extname == '.js' or file.extname == '.css' or file.path contains '/images' %}
    urlsToCache.push("{{ file.path }}")
    {% endif %}
{% endfor %}
*/

// Cache posts
/*{% for post in site.posts %}
  urlsToCache.push("{{ post.url }}")
{% endfor %}*/

// Cache pages
/*{% for page in site.html_pages %}
  urlsToCache.push("{{ page.url }}")
{% endfor %}*/

var CACHE_NAME = 'ion-book-cache-v1';

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
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
      // Fallback to the offline page if not available in the cache.
      return caches.match('/404.html');
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(CACHE_NAME).then(function(cache) {
      return fetch(event.request).then(function(response) {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch(function() {
      // Fallback to the offline page if not available in the cache.
      return caches.match('/offline.html');
    })
  );
});