// external imports
import { parse } from 'cookie'
import acceptLanguageParser from 'accept-language-parser'
import { getAssetFromKV } from '@cloudflare/kv-asset-handler'

// internal imports
import config from './config'

const supportedLocalesMatcherString = $`^\/(${config.supportedLanguages.concat(config.staticFolders ?? []).join('|')})(\/.*)?$`
const supportedLocalesMatcher = new RegExp(supportedLocalesMatcherString)

// root entrypoint of worker
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event))
})

async function handleRequest(event) {
  try {
    return await getAssetFromKV(event)
  } catch (e) {
    let pathname = new URL(event.request.url).pathname
    return new Response(`"${pathname}" not found`, {
      status: 404,
      statusText: "not found",
    })
  }

  /*
  // request url that should be forwarded
  const url = new URL(request.url)

  if (url.pathname && url.pathname.match(supportedLocalesMatcher)) {
    return await fetch(request)
  }

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
  const lang = acceptLanguageParser.pick(
    config.supportedLanguages,
    request.headers.get('Accept-Language') || '',
    { loose: true }
    ) || config.defaultLanguage

  // respond with the accept-language value
  return Response.redirect(url + '/' + lang, 302)
  */
}


