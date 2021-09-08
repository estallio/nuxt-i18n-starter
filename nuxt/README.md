# Nuxt decision repository

This project contains PoC implementations, snippets and decision documentations to build a modern, performant and cheap Jamstack website utilizing the following tools and services:

:white_check_mark:  NuxtJS\
:white_check_mark:  Sanity.io\
:white_check_mark:  Cloudflare Pages\
:white_check_mark:  Cloudflare Workers\
:white_check_mark:  Github\
:white_check_mark:  Plausible Analytics\
:white_check_mark:  Formspark

### Static hosting
Nuxt provides some stunning features and tops this all with static generation and especially simple content previews like documented in [this strapi tutorial](https://strapi.io/blog/implementing-previews-with-nuxt-applications-using-a-strapi-backend) and [this sanity tutorial](https://dev.to/mornir/how-to-handle-content-previews-from-sanity-in-nuxt-3127). A combining tutorial from Cloudflare on how to use Sanity and Nuxt to host static websites on Cloudflare pages can be viewed [here](https://developers.cloudflare.com/pages/tutorials/build-a-blog-using-nuxt-and-sanity). The center of this approach is a static prerendered website that is able to load content from a CMS dynamically. The advantage is to deliver fast and static websites that are also compatible to search engines that don't execute JS. The Vue Framework makes it possible to replace static functionality and replace it by SPA (single page app) behaviour. New or changed content can be previewed in this mode and new pages can be accessed utilizing the client side Vue router. We assume that the focus lies on the regular user and the impression a user gets from the website. The content editor on the other side is expected to own a regular to modern device that is able to render SPAs. This way, a regular website user and a content moderator get the best experience on both sides. Additionally, Nuxt comes with a big developer community and helpful plugins for [`i18n`](https://i18n.nuxtjs.org/), [`sitemap generation`](https://sitemap.nuxtjs.org/), `robots generation`, `sanity integration` and `SEO`.

To know how Cloudflare pages handles 404, SPAs or redirects request etc. look at the [Cloudflare docs](https://developers.cloudflare.com/pages/platform/serving-pages). An alternative to Cloudflare pages are Cloudflare Worker Sites [here](https://developers.cloudflare.com/workers/platform/sites/configuration). This is most likely the same technique like it is used in Cloudflare pages, but it is directly integrated in Workers KV store.

### Redirection of Google bot and others
When using multilingual websites, the main domain often redirects `https://example.com` to the subpaths like `https://example.com/en`. The Nuxt i18n plugin takes care of this when the app is used in serverless mode or as SPA. A search engine is not redirected and additional server logic is necessary for this behaviour. In case a bot accesses the website without a `accept-language` header, like the Google bot does, a redirection to the fallback language should be triggered. This case also requires possible redirections without JS on the client side. To come around this issue, the Cloudflare worker in the `language-redirector` folder takes care of this redirect. More can be read in the README [here](/language-redirector/README.md). If one is fine with paying 20€/month, Vercel looks good for the job, even if one should take care of possible cold starts of the redirection functions. This means the static content on Vercel is cached on the edge, but the redirection functionality is outsourced to a lambda function on e.g. AWS that could take up to 2s to get into the hot status if not called regularily.

#### Related:
- In [this comment](https://github.com/nuxt-community/i18n-module/issues/761#issuecomment-645357443) of the issue 761 of the next-community i18n module is explained how pages should be generated and the sitemap entry or head parts should use the `x-default` property. Additionally, the problem with the generation startegy `prefix_and_default` is taken into account here as the root direction works only with SSR Nuxt or in the browser client via Vue router and not while using SSG for Bots.
- If Nuxt build stategy is `prefiy_and_default`, one version should marked as canonical like stated in the Google docs [here](https://developers.google.com/search/docs/advanced/crawling/managing-multi-regional-sites?hl=de#dup-content)
- Nuxt i18n does prefer the unprefixed version of the website when strategy `prefix_and_default` is beeing used. This is stated in the feature list at the bottom [here](https://github.com/nuxt-community/i18n-module/issues/761#issuecomment-645357443), statically in the code [here](https://github.com/nuxt-community/i18n-module/blob/4d77019f786086b9e496661f8c8d55893556e31d/src/templates/plugin.main.js#L179), statically when generating the canonical tags in the head of the page [here](https://github.com/nuxt-community/i18n-module/blob/0241217298482a7702a4518f42ef9acd803d6970/src/templates/head-meta.js#L50) and in the issue [here](https://github.com/nuxt-community/i18n-module/issues/721). The `prefix` startegy should do the job here.
- Multilingual sitemaps should be generated like [this](https://developers.google.com/search/docs/advanced/crawling/localized-versions?hl=de#sitemap) with alternate tags and `x-default` entries. Sitemaps can also be split up into multiple sitemaps. Comapnies like OMV or Apple have a sitemap-hierarchy and a robots file for each website.
- Generating multilingual sitemaps does not work as expected when using stategy `prefix`. The first issue [here](https://github.com/nuxt-community/sitemap-module/issues/91#issue-536500201) described what shoudl be generated, but [this](https://github.com/nuxt-community/sitemap-module/issues/91#issuecomment-613719069) comment in the same issue push through. The wanted behaviour can be found in code [here](https://github.com/nuxt-community/sitemap-module/blob/c3acdbddc01e0ff115eb3d6ef7ae33673b32323c/lib/builder.js#L59) where all unlocalized paths are returned and not taken into account by the `x-default` property. The problem is, that the URLs are included in the sitemap file in either way and logically, each URL should have some meta-properties or none. To overcome this, the sitemap generation was overwritten in the Nuxt config file of this project.
- To not generate unprefixed routes, simply skip the `defaultLocale` property, but be aware that this property is also used at other places and maybe some things won't work. The desired behaviour is to let the default route generate it's file and redirect them with the redirect-language worker in this repo ([Github issue](https://github.com/nuxt-community/i18n-module/issues/1158)).
- Live Preview simply calls the nuxtServerInit, asyncData and fetch on the client side again ([link](https://nuxtjs.org/docs/2.x/features/live-preview)).
- [`extendRoutes`](https://nuxtjs.org/docs/2.x/features/file-system-routing#extendroutes) can be used to integrate routes that are not resolved by the file/folder startegy.
- [`subFolders`](https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-generate#subfolders) is useful to get URLs in Cloudflare Pages that don't have an extra `/` at the end without an additional proxy etc.
- Nuxt provides some [build hooks](https://nuxtjs.org/docs/2.x/internals-glossary/internals-builder) or generator hooks to inject something in the build process
- [`nuxtServerInit`](https://nuxtjs.org/docs/2.x/directory-structure/store#the-nuxtserverinit-action) is for prefilling the store when the app is generated
- All the routes can be specified with the [`routes`](https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-generate#speeding-up-dynamic-route-generation-with-payload) property.
- Nuxt has some cool data fetching startegies built in like [this](https://nuxtjs.org/docs/2.x/features/data-fetching#async-data)
- Nuxt PWA generation is not supported for multilingual websites like state [here](https://github.com/nuxt-community/pwa-module/issues/312)
- If the locales are completely different sites, one should think about if splitting the pages into different generated websites is the better choice
- The dynamic routes generation features of the i18n module works like this: somewhere in the file or config or on a page there is a link to a dynamic page. Assume we specified the routes without the languages in the routes property in the config file. Then, when a defaultLocale route is generated, all the translated slugs have to be set via the technique specified [here](https://i18n.nuxtjs.org/lang-switcher#dynamic-route-parameters). On every page that has a translated version, all translated versions have to be specified with this technique. Assume a translated page is rendered this way, then this page must generate it's content only with the translated slug name it was called. There the page have to also call the other translated slugs with the technique from before. Nuxt won't genreate these localized slugs as they are already present in the cache but every localized site needs all the other localized slugs in their asyncData method. Associated with this feature are the dynamic lang generation in the code [here](https://github.com/njam/nuxt-i18n-module/blob/5e3b6ffad886b44a0546b46febd2803377bba147/src/index.js#L51). Another [Github issue](https://github.com/nuxt-community/i18n-module/issues/1127) specifies again how the dynamic route generation works. In the code [this](https://github.com/nuxt-community/i18n-module/blob/67c84078f2e7c1d3f502140645f88fc652912227/src/templates/plugin.utils.js#L162) line shows where the action is triggered at the store.
- Sitemap generation does not work with dynamic localized slugs, as a workaround, one can specify the routes themselves like [here](https://github.com/nuxt-community/sitemap-module/issues/122#issuecomment-659377003)
- The slug of static generated files form the file system can not be translated dynamically with `nuxtI18n` [here](https://github.com/nuxt-community/i18n-module/issues/1275). Maybe this works with specifying the component/template in the routes property of the Nuxt config and fetch the localized slugs there.

### Redirection of Users
In case a user accesses the website, the preferred browser language should be evaluated and the user should be redirected to the correct content. Once a language is served or the user changes the language, a cookie should save the default language for future accesses.

Even Netlify already provides a language redirection feature ([Netlify documentation](https://docs.netlify.com/routing/redirects/redirect-options/#redirect-by-country-or-language)). For the second case Netlify only give the possibility to redirect on Cookie presence and not on Cookie absence or Cookie value. Additionally, the language redirection seems to have some bugs or doesn't implement the full `accept-language` RFC features ([link to Netlify forum](https://answers.netlify.com/t/do-language-based-redirects-take-into-account-browsers-language/2577/33]). A workaround with Netlify can be seen [here](https://github.com/estallio/netlify-functions-test/tree/netlify-test). The solution was to redirect the root domain to a lambda function if the Cookie was present and parse the Cookie there before the redirect happens. Because of the buggy language redirect of Netlify, a conditional header redirection for `Cookie` or `Accept-Language` in the header would be the choice to go.

A little bit more hard is the redirection to a subfolder when no language is specified. This could be done with Cloudflare Workers doing all the redirections there. A caveat is the exclusion of media-sources or other things that don't require a language subfolder like excluded in the language-redirector in [this repo](/language-redirector/README.md).

Cloudflare doesn't support language redirection to date [docs](https://developers.cloudflare.com/pages/platform/redirects) (accessed 31.08.2021), but according to their table, it seems like features are rolled out continuously.

For Cookie parsing and language detection [resolve-accept-language](https://www.npmjs.com/package/resolve-accept-language) and [cookie](https://www.npmjs.com/package/cookie) are used.

### Translation
API connection is missing yet and only static translation is present like [here](https://github.com/paulgv/nuxt-i18n-example/blob/master/config/index.js) or [here](https://github.com/miteyema/nuxt-i18n-demo/blob/prod/nuxt.config.js).

### CDN rewrites
In planning: should be possible using Cloudflare workers similar to [this cloudflare proxy](https://github.com/wesbos/cloudflare-cloudinary-proxy/blob/master/index.js) for Cloudinary CDN. This can also smaller the CDN quotas. The `plausible-proxy` folder in this repo already contains a caching algorithm for the plausible files. This can simply be used to cache and redirect files from e.g. the Sanity CDN. A test showed that the Cloudflare cache as middleware takes up to twice as long as Sanity's CDN does (100ms on cache hit instead of 50ms, 250ms on cache miss). So go with Sanity if possible and only migrate to Cloudflare if you don't want to pay the peanuts additional Sanity quotas costs.

### Cloudflare Pages Sanity Studio integration
In planning: This should be possible using existing Sanity plugins and change the endpoints to Cloudflare to let the users rebuild the website if content was changed. Examples are [Netlify Deploy](https://www.sanity.io/plugins/sanity-plugin-dashboard-widget-netlify), [sanity-plugin-netlify-deploy-status-badge](https://www.sanity.io/plugins/netlify-deploy-status-badge), [Vercel Dashboard Widget (for Sanity)](https://www.sanity.io/plugins/vercel-dashboard-widget) and [Vercel Deploy](https://www.sanity.io/plugins/vercel-deploy). This was already done in the `cloudflare-pages-sanity-plugin` in this repo. Maybe a few bugs are still present but in sum, all the functionalities of `Vercel Deploy` have been reconstructed in this module. Tutorials for generating own plugins can be found [here](https://www.sanity.io/docs/plugin-custom-logo) and [here](https://www.dorelljames.com/blog/creating-my-first-sanity-io-plugin/). The Cloudflare API was a little harder to implement because their API endpoint can only handle access with email and api-key, not via an access token. This is only possible for things like publish worker scripts or manage domains, not for managing Cloudflare Pages at the moment ([Cloudflare Pages API docs](https://developers.cloudflare.com/pages/platform/api)). Another problem is, that the Cloudflare API does not specify CORS in their header. A community forum entry simply states something like "you should implement the API in programs, not in the browser etc...". A solution is to proxy requests to Cloudflare via workers like [here](https://developers.cloudflare.com/workers/examples/cors-header-proxy). This worker is also contained in this project [here](/cloudflare-api-proxy/README.md). 

### Sanity bugs
- [ ] Sanity backend is not translated: [issue](https://github.com/sanity-io/sanity/issues/1603)
- [ ] Sanity is beeing blocked by Safari ([issue](https://github.com/sanity-io/sanity/issues/1231)) and Brave([issue](https://github.com/sanity-io/sanity/issues/1768)).

### Deployment
Important steps to mention here:
- Nuxt suggests [these things](https://nuxtjs.org/docs/2.x/deployment/deployment-cloudflare) when deployed with Cloudflare ([here](https://nuxtjs.org/docs/2.x/deployment/netlify-deployment) are the Netlify deployment instructions). On Vecel, the app can be deployed rather as SSR or SSG page.

### Analytics
There are several free and paid services like fathom analytics or Cloudflare analytics. Plausible analytics looked best and compared to other services, it's cheap or has some other advantages like described [here](https://plausible.io/vs-cloudflare-web-analytics).

For hosting, Plausible analytics also provides a guide for using Cloudflare workers and the caching API [here](https://plausible.io/docs/proxy/guides/cloudflare) - the worker script is included in this repo.
 
### Pricing
#### Netlify:
- 100GB bandwidth
- 125.000 functions
- 300m build
- unlimited scripts/domain
- static files/storage max. 100GB

#### Cloudflare:
- unlimited bandwidth for Cloudflare Pages
- 500m build minutes for Cloudflare Pages
- 100.000 bounded functions a day for Cloudflare Workers
- 5GB for unbounded functions (CPU time >10ms)
- 30 scripts/domain
- static files/storage of max. 20.000 files and max. 25MB/file

#### Vercel:
- cool features
- nice development tools and services
- 20€/month give a freelancer much build minutes and GBs
- features like analytics (performance, not visitors) or password protected sites are premium features and costs extra (much)  

[Here](https://brianli.com/migrating-from-netlify-to-cloudflare-workers-sites-for-2x-performance/) and [here](https://zhauniarovich.com/post/2021/2021-07-comparing-netlify-and-cloudflare-pages/) and some fancy idea to implement Cloudflare's KV storage is documented [here](https://brianli.com/how-to-bulk-redirect-urls-with-cloudflare-workers-and-workers-kv/).

### Redirection
Cloudflare has 2 options for redirecting and enforcing HTTPS everywhere und SSL/TLS and EDGE certificates like [here](https://blog.cloudflare.com/how-to-make-your-site-https-only/) and at the bottom is a option for rewriting images etc. also.

To redirect non-www to www 1 of 3 free page rules can be used like [here](https://community.cloudflare.com/t/redirect-example-com-to-www-example-com/78348). On Netlify, these rules are easy to specify and free to use, but on the other side, the behaviour can easily be mimicked by Cloudflare Workers.

### SSR
Cloudflare workers have strong time constrains so if SSR is required, the unbounded functions could help out. Same as using Netlify, the NodeJS API is not available natively and a workaround like [here](https://www.netlify.com/blog/2018/09/13/how-to-run-express.js-apps-with-netlify-functions/) is necessary.

As the Cloudflare Workers are limited in CPU, script size and RAM, it is not possible to run a bundeled Nuxt server there. This is also communicated in the Cloudflare forums [here](https://community.cloudflare.com/t/vue-js-ssr-cloudflare-workers/218563/14). But there is light and the founder of Nuxt postet a [demo to nitro](https://github.com/nuxt/nitro-demo) which is a framework that bundels Nuxt apps for the edge, but this is not ready yet and not published, even if there are already nitro part in the current Nuxt deployments. Another promising framework is [Vitedge](https://github.com/frandiox/vitedge), that can be run on Cloudflare workers and and provides SSR features of Nuxt (tested: despite language-redirections). The ideal case would be to rethink `stale-while-revalidate` and give it some parameters like the timing. Then when a website is accessed first, the website is cached until the cache is revalidated. A cache revalidation could happen when content changes in the CMS. This way, SSR could be as performant like static with no additional workarounds. Vercel already provides features similar to this but generated the page on every access and at most every 1 sec etc. This is nearly the desired behaviour expect that a 10h or 100h could neither be implemented because not supported by the system, nor disrupted with a manual refresh when content changes before the end of the 100h are reached.

### Miscellaneous
After testing this out, it is necessary to cleanup Github, Netlify, Cloudlfare und adjust allowed URLs, domains and services.


### Tests
The Nuxt app from this repo was deployed on Cloudflare and Netlify and the measurements were taken manually using the Chrome network tab and approximated using 3-4 page refreshes.

- Netlify functions redirect from root domain cold (after 10min): 600ms 
- Netlify functions redirect from root domain hot: 150ms
- Netlify static cold (after 10min): 400ms
- Netlify static hot: 50ms

- Cloudflare workers redirect from root domain cold (after 10min): 150ms
- Cloudflare workers redirect from root domain hot: 70ms
- Cloudflare pages cold (after 10min): 90ms
- Cloudlare pages hot: 70ms

- Vercel had cold boot times of up to 2s, page generation is most likely cached and can be accessed in 200-600ms which is still slower than the other provider

Another test came to the result that both providers have approximately the same response times so it looks like the only difference is the free limits.




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
