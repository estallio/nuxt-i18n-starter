// external imports
import { parse } from 'cookie'
import acceptLanguageParser from 'accept-language-parser'

// internal imports
import config from './config'

// root entrypoint of worker
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

function handleRequest(request) {
  // request url that should be forwarded
  const url = new URL(request.url)

  ////////
  // case 1: cookie is set
  ////////

  // extract cookies of cookie http header
  const cookies = parse(request.headers.get('Cookie') || '')

  // check if cookie (key in the cookies object) exists
  if (cookies[config.cookieName] !== null) {
    // check if language is supported
    if(config.supportedLanguages.includes(cookies[config.cookieName])) {
      // respond with the cookie value
      return Response.redirect(url + '/' + cookies[config.cookieName], 302)
    }
  }

  ////////
  // case 2: accept-language is set or case 3: fallback lang (last property in the function call) is returned
  ////////

  // get the favorite supported language from header - could return null
  const lang = acceptLanguageParser.pick(config.supportedLanguages, request.headers.get('Accept-Language') || '') || config.defaultLanguage

  // respond with the accept-language value
  return Response.redirect(url + '/' + lang, 302)
}


