import { parse } from "cookie"

// The name of the cookie
const COOKIE_NAME = "i18n_redirected"

function handleRequest(request) {
  const cookie = parse(request.headers.get("Cookie") || "")
  const url = new URL(request.url)

  if (cookie[COOKIE_NAME] != null) {
    // Respond with the cookie value
    return Response.redirect(url + '/' + cookie[COOKIE_NAME], 302)
  }

  return Response.redirect(url + '/en', 302)
}

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})
