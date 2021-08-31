# Nuxt decision repository

This project contains PoC implementations, snippets and decision documentations to build a modern, performant and cheap Jamstack website utilizing following tools and services:

:white_check_mark:  Nuxt.js\
:white_check_mark:  Sanity Backend\
:white_check_mark:  Cloudflare Pages\
:white_check_mark:  Cloudflare Workers\
:white_check_mark:  Github\
:white_check_mark:  Plausible Analytics\
:white_check_mark:  Formspark\
:white_check_mark:  Uptime Robot

The list above enables following features:

### Static hosting
Nuxt provides some stunning features and tops this all with static generation and especially simple content previews like documented in [this strapi tutorial](https://strapi.io/blog/implementing-previews-with-nuxt-applications-using-a-strapi-backend) and [this sanity tutorial](https://dev.to/mornir/how-to-handle-content-previews-from-sanity-in-nuxt-3127). Additionally, Nuxt comes with a big community and helpful plugins for `i18n`, `sitemap generation`, `sanity integration` and `SEO`. 

### Redirection of Google bot and others
In case a bot accesses the website without a `accept-language` header, like the Google bot does, a redirection to the fallback language should be triggered. This case also requires possible redirections without JS on the client side.

Example:
`https://www.example.com`  :arrow_right:  `https://www.example.com/en`

### Redirection of Users
In case a user accesses the website, the preferred browser language should be evaluated and the user should be redirected to the correct content. Once a language is served or the user changes the language, a cookie should save the default language for future accesses.

Even Netlify already provides a language redirection feature ([Netlify documentation](https://docs.netlify.com/routing/redirects/redirect-options/#redirect-by-country-or-language)), for the second case it is only possible to redirect on Cookie presence and not on Cookie absence. Additionally, the language redirection seems to have some bugs or doesn't implement the full `accept-language` RFC features ([link to Netlify forum](https://answers.netlify.com/t/do-language-based-redirects-take-into-account-browsers-language/2577/33]). A workaround with Netlify can be seen [here](https://github.com/estallio/netlify-functions-test/tree/netlify-test). The solution was to redirect the root domain to a lambda function if the Cookie was present and parse the Cookie there before the redirect happens. Because of the buggy language redirect of Netlify, a conditional header redirection for `Cookie` or `Accept-Language` in the header would be the choice.

A little bit more hard is the redirection to a subfolder when no language is specified. This could be done with Cloudflare Workers doing all the redirections there. A caveat is the exclusion of media-sources or other things that don't require a language subfolder.

Cloudflare doesn't support language redirection to date [docs](https://developers.cloudflare.com/pages/platform/redirects) (accessed 31.08.2021).

For Cookie parsing and language detection [resolve-accept-language](https://www.npmjs.com/package/resolve-accept-language) and [cookie](https://www.npmjs.com/package/cookie) are used.

### Translation
API connection is missing yet and only static translation is present like [here](https://github.com/paulgv/nuxt-i18n-example/blob/master/config/index.js) or [here](https://github.com/miteyema/nuxt-i18n-demo/blob/prod/nuxt.config.js).

### CDN rewrites
In planning: should be possible using Cloudflare workers similar to [this cloudflare proxy](https://github.com/wesbos/cloudflare-cloudinary-proxy/blob/master/index.js) for Cloudinary CDN. This can also smaller the CDN quotas.

### Cloudflare Sanity integration
In planning: Should be possible using existing Sanity plugins and change the endpoints to Cloudflare to let the users rebuild the website if content was changed. Examples are [Netlify Deploy](https://www.sanity.io/plugins/sanity-plugin-dashboard-widget-netlify), [sanity-plugin-netlify-deploy-status-badge](https://www.sanity.io/plugins/netlify-deploy-status-badge), [Vercel Dashboard Widget (for Sanity)](https://www.sanity.io/plugins/vercel-dashboard-widget) and [Vercel Deploy](https://www.sanity.io/plugins/vercel-deploy).

### Bugs
- [ ] Sanity backend is not translated: [issue](https://github.com/sanity-io/sanity/issues/1603)
- [ ] Sanity is beeing blocked by Safari ([issue](https://github.com/sanity-io/sanity/issues/1231)) and Brave([issue](https://github.com/sanity-io/sanity/issues/1768)).

### Deployment
Important steps to mention here:
- Nuxt suggests [these things](https://nuxtjs.org/docs/2.x/deployment/deployment-cloudflare) when deployed with Cloudflare ([here](https://nuxtjs.org/docs/2.x/deployment/netlify-deployment) are the Netlify deployment instructions)

### Analytics
There are several free and paid services like fathom analytics or Cloudflare analytics. Plausible analytics looked best and compared to other services, it's cheap or has some other advantages like described [here](https://plausible.io/vs-cloudflare-web-analytics).

For hosting, Plausible analytics also provides a guide for using Cloudflare workers and the caching API [here](https://plausible.io/docs/proxy/guides/cloudflare).
 
### Pricing
#### Netlify:
- 100GB bandwidth
- 125.000 functions
- 300m build
- unlimited scripts/domain

#### Cloudflare:
- unlimited bandwidth for Cloudflare Pages
- 500m build minutes for Cloudflare Pages
- 100.000 bounded functions a day for Cloudflare Workers
- 5GB for unbounded functions (CPU time >10ms)
- 30 scripts/domain

### Redirection
Cloudflare has 2 options for redirecting and enforcing HTTPS everywhere und SSL/TLS and EDGE certificates like [here](https://blog.cloudflare.com/how-to-make-your-site-https-only/) and at the bottom is a option for rewriting images etc. also.

To redirect non-www to www 1 of 3 free page rules can be used like [here](https://community.cloudflare.com/t/redirect-example-com-to-www-example-com/78348). On Netlify, these rules are easy to specify and free to use, but on the other side, the behaviour can easily be mimicked by Cloudflare Workers.

### SSR
Cloudflare workers have strong time constrains so if SSR is required, the unbounded functions could help out. Same as using Netlify, the NodeJS API is not available natively and a workaround like [here](https://www.netlify.com/blog/2018/09/13/how-to-run-express.js-apps-with-netlify-functions/) is necessary.

### Miscellaneous
After testing this out, it is necessary to cleanup Github, Netlify, Cloudlfare und adjust allowed 


### Tests
The Nuxt app from this repo was deployed on Cloudflare and Netlify and the measurements were taken manually using the Chrome network tab and approximated using 3-4 page refreshes.

- Netlify functions redirect from root domain cold (after 10min): 630ms 
- Netlify functions redirect from root domain hot: 150ms
- Netlify static cold (after 10min): 350ms
- Netlify static hot: 50ms

- Cloudflare workers redirect from root domain cold (after 10min): 70ms
- Cloudflare workers redirect from root domain hot: 70ms
- Cloudflare pages cold (after 10min): 70ms
- Cloudlare pages hot: 70ms


## Build Setup from original Nuxt i18n demo template

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).


### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).
