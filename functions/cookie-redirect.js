exports.handler = async function(event, context) {
  const cookies = parseCookies(event)
  const lang = cookies['i18n_redirected']

  return {
    statusCode: 302,
    headers: {
      Location: '/' + lang
    }
  }
}

function parseCookies (request) {
  const list = {},
    rc = request.headers.cookie

  rc && rc.split(';').forEach(function(cookie) {
    const parts = cookie.split('=')
    list[parts.shift().trim()] = decodeURI(parts.join('='))
  })

  return list
}
