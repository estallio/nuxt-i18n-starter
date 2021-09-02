import { parse } from 'cookie'
import acceptLanguageParser from 'accept-language-parser'

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event))
})

async function handleRequest(event) {
  const target = new URL(event.request.url)
  const redirect = await REDIRECTS.get(target.toString())

  ***REMOVED***/ -> hit
  ***REMOVED***/about -> hit

  cookieName: 'i18n_redirected'
  supportedLanguages: ['de', 'en']
  defaultLanguage: 'de'

  ////////
  // case 1: cookie is set
  ////////

  // extract cookies of cookie http header
  const cookies = parse(request.headers.get('Cookie') || '')

  // check if cookie (key in the cookies object) exists
  if (cookies[cookieName] !== null) {
    // check if language is supported
    if(supportedLanguages.includes(cookies[cookieName])) {
      // respond with the cookie value
      return Response.redirect(url + '/' + cookies[cookieName], 302)
    }
  }

  ////////
  // case 2: accept-language is set or case 3: fallback lang (last property in the function call) is returned
  ////////

  // get the favorite supported language from header - could return null
  const lang = acceptLanguageParser.pick(
    supportedLanguages,
    event.request.headers.get('Accept-Language') || '',
    { loose: true }
    ) || defaultLanguage

  // respond with the accept-language value
  return Response.redirect(target + '/' + lang, 302)

  // TODO: regular fetch
}


