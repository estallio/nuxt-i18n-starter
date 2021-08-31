# Nuxt decision repository

This project contains PoC implementations, snippets and decision documentations to build a modern, performant and cheap Jamstack website utilizing following tools and services:

:white_check_mark: Nuxt.js\
:white_check_mark: Sanity Backend\
:white_check_mark: Cloudflare Pages
:white_check_mark: Cloudflare Workers\
:white_check_mark: Github\
:white_check_mark: Plausible Analytics\
:white_check_mark: Formspark\
:white_check_mark: Uptime Robot

The list above enables following features:

### Static hosting
Nuxt provides some stunning features and tops this all with static generation and especially simple content previews like documented in [this strapi tutorial](https://strapi.io/blog/implementing-previews-with-nuxt-applications-using-a-strapi-backend) and [this sanity tutorial](https://dev.to/mornir/how-to-handle-content-previews-from-sanity-in-nuxt-3127). Additionally, Nuxt comes with a big community and helpful plugins for `i18n`, `sitemap generation`, `sanity integration` and `SEO`. 

### Redirection of Google bot and others
In case a bot accesses the website without a `accept-language` header, like the Google bot does e.g., a redirection to the fallback language should be triggered. This case also requires possible redirection without JS on the client side.

Example:
`https://www.example.com` :arrow_right: `https://www.example.com/en`

### Redirection of Users
In case a user accesses the website, the preferred browser language should be evaluated and the user should be redirected to the correct content. Once a language is served or the user changes the language, a cookie should save the default language for future accesses.

Even Netlify already provides a language redirection, it is only possible to redirect on Cookie presence and not on Cookie absence. Additionally, the language redirection seems to have some bugs or doesn't implement the full accept-language features (link to Netlify forum[https://answers.netlify.com/t/do-language-based-redirects-take-into-account-browsers-language/2577/33]). The first try with Netlify can be seen [here](https://github.com/estallio/netlify-functions-test/tree/netlify-test). The solution was to redirect the root domain to a lambda function and parse the Cookie there before the redirect happens.

### CDN rewrites
In planning: should be possible using Cloudflare workers.

### Cloudflare Sanity integration
In planning: Should be possible using the Netlify Sanity plugin and change the endpoints to Cloudflare to let the users rebuild the website if content was changed.


Old readme:
## Build Setup

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
