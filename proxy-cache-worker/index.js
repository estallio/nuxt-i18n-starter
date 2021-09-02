addEventListener('fetch', event => {
  event.passThroughOnException();
  event.respondWith(handleRequest(event));
})

async function handleRequest(event) {
  const target = new URL(event.request.url)
  const destination = await PROXY_CACHE_MAP.get(target.toString())

  if (destination === null) {
    return new Response(`No destination for ${target} specified`, { status: 404 })
  }

  // only GET requests should be cached
  if (event.request.method === 'GET') {
    let response = await caches.default.match(event.request);
    if (!response) {
      response = await fetch(destination);
      event.waitUntil(caches.default.put(event.request, response.clone()));
    }
    return response;
  }

  // else proxy the request
  const request = new Request(event.request);
  return await fetch(destination, request);
}
