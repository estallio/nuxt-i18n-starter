import { parse as cookieParser } from 'cookie'
import acceptLanguageParser from 'accept-language-parser'

const langCookieName = 'i18n_redirected'

const supportedLanguages = [
  'de',
  'en'
]

const defaultLanguage = 'de'

const staticPaths = [
  'sw.js',
  'sitemap.xml',
  'robots.txt',
  'icon.png',
  'favicon.ico',
  '_nuxt\\/.*',
  'static\\/.*',
  'de(\\/.*)?',
  'en(\\/.*)?'
]

const staticPathsRegex = new RegExp(`^/(${staticPaths.join('|')})$`, 'i')

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)

  if (url.pathname.match(staticPathsRegex)) {
    return fetch(request)
  }

  ////////
  // case 1: cookie is set
  ////////

  // extract cookies of cookie http header
  const cookies = cookieParser(request.headers.get('Cookie') || '')

  // check if cookie (key in the cookies object) exists
  if (cookies[langCookieName] !== null) {
    // check if language is supported
    if(supportedLanguages.includes(cookies[langCookieName])) {
      // respond with the cookie value
      return Response.redirect((url.origin + '/' + cookies[langCookieName] + url.pathname).replace(/\/+$/, ''), 302)
    }
  }

  ////////
  // case 2: accept-language is set or case 3: fallback lang (last property in the function call) is returned
  ////////

  // get the favorite supported language from header - could return null
  const lang = acceptLanguageParser.pick(
    supportedLanguages,
    request.headers.get('Accept-Language') || '',
    { loose: true }
    ) || defaultLanguage

  // respond with the accept-language value
  return Response.redirect((url.origin + '/' + lang + url.pathname).replace(/\/+$/, ''), 302)
}


