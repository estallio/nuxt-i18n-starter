import config from './config'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // Needed for previewing changed content
    '~/plugins/preview.client.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://sanity.nuxtjs.org
    '@nuxtjs/sanity/module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/pwa',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
  ],

  // https://github.com/nuxt-community/robots-module
  robots: {
    UserAgent: '*',
    Disallow: '/',
    Sitemap: config.hostname + '/sitemap.xml',
  },









  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-i18n-test',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  i18n: {
    locales: [
      {
        code: 'de',
        name: 'Deutsch'
      },
      {
        code: 'en',
        name: 'English'
      }
    ],
    // redirection is not working when started with yarn start
    // actually, this should be 'prefix' only, but the community decided against this behaviour: https://github.com/nuxt-community/sitemap-module/issues/91#issuecomment-613719069
    strategy: 'prefix_and_default',
    defaultLocaleRouteNameSuffix: 'de',
    defaultLocale: 'de',
    vueI18n: {
      fallbackLocale: 'de',
      messages: {
        de: {
          welcome: 'Willkommen'
        },
        en: {
          welcome: 'Welcome'
        }
      }
    },
    seo: true,
    baseUrl: config.hostname
    // also custom links are possible
  },

  sitemap: {
    hostname: config.hostname,
    i18n: true
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    // TODO: lang manifest different languages?
  },

  sanity: {
    // TODO: configure here or external like https://sanity.nuxtjs.org/getting-started/configuration
    projectId: 'myProject'
  },

  router: {
    trailingSlash: false
  },

  generate: {
    // Important for static hosting with i18n to produce
    // en.html files etc. so there is no trailing slash
    // when provided via simple services like apache
    subFolders: false,
    // TODO: maybe we need some routes here like in https://github.com/miteyema/nuxt-i18n-demo/blob/prod/nuxt.config.js#L132
    //  to overcome relative API calls
  }
}
