// Choose a cache name
const cacheNameKey = "cache-v1";
// List the files to precache
const precacheResources = ["/index.html"];

// When the service worker is installing, open the cache and add the precache resources to it
self.addEventListener("install", (event) => {
  console.log("Service worker install event!");
  event.waitUntil(
    caches.open(cacheNameKey).then((cache) => cache.addAll(precacheResources))
  );
});

self.addEventListener("activate", (event) => {
  console.log("Service worker activate event!");
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function (cacheName) {
            return cacheName != cacheNameKey;
          })
          .map(function (cacheName) {
            return caches.delete(cacheName);
          })
      );
    })
  );
});

// When there's an incoming fetch request, try and respond with a precached resource, otherwise fall back to the network
self.addEventListener('fetch', (event) => {
  console.log('Fetch intercepted for:', event.request.url);
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      console.log(cachedResponse, event.request)
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    }),
  );
});

let util = {
  fetchPut: function (request, callback) {
    return fetch(request).then((response) => {
      // 跨域的资源直接return
      if (!response || response.status !== 200 || response.type !== "basic") {
        return response;
      }
      util.putCache(request, response.clone());
      typeof callback === "function" && callback();
      return response;
    });
  },
  putCache: function (request, resource) {
    // 后台不要缓存，preview链接也不要缓存
    if (
      request.method === "GET" &&
      request.url.indexOf("wp-admin") < 0 &&
      request.url.indexOf("preview_id") < 0
    ) {
      caches.open(cacheNameKey).then((cache) => {
        cache.put(request, resource);
      });
    }
  },
  updateHtmlPage: function (url, htmlRequest) {
    let pageName = util.getPageName(url);
    let jsonRequest = new Request(
      "/html/service-worker/cache-json/" + pageName + ".sw.json"
    );
    fetch(jsonRequest).then((response) => {
      response.json().then((content) => {
        if (pageUpdateTime[pageName] !== content.updateTime) {
          console.log("update page html");
          // 如果有更新则重新获取html
          util.fetchPut(htmlRequest);
          pageUpdateTime[pageName] = content.updateTime;
        }
      });
    });
  },
  delCache: function (url) {
    caches.open(CACHE_NAME).then((cache) => {
      console.log("delete cache " + url);
      cache.delete(url, { ignoreVary: true });
    });
  },
};

this.addEventListener("fetch", function (event) {
  console.log("Fetch intercepted for:", event.request.url);
  event.respondWith(
    caches.match(event.request).then((response) => {
      // cache hit
      if (response) {
        //如果取的是html，则看发个请求看html是否更新了
        // if (response.headers.get("Content-Type").indexOf("text/html") >= 0) {
        //   console.log("update html");
        //   let url = new URL(event.request.url);
        //   util.updateHtmlPage(url, event.request.clone(), event.clientId);
        // }
        return response;
      }
      return util.fetchPut(event.request.clone());
    })
  );
});
