import { parse } from 'cookie'
import resolveAcceptLanguage from 'resolve-accept-language';

// The name of the cookie
const COOKIE_NAME = "i18n_redirected"

function handleRequest(request) {
  const url = new URL(request.url)

  // case 1: cookie is set
  const cookie = parse(request.headers.get("Cookie") || "")
  if (cookie[COOKIE_NAME] != null) {
    // Respond with the cookie value
    return Response.redirect(url + '/' + cookie[COOKIE_NAME], 302)
  }

  // case 2: accept-language is set or case 3: fallback lang (last property in the function call) is returned
  const lang = resolveAcceptLanguage(request.headers['accept-language'] || '', ['es', 'en', 'fr'], 'en')

  return Response.redirect(url + '/' + lang, 302)
}

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})
