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
  head () {
    if (!this.$nuxtI18nHead) {
      return {
        htmlAttrs: {
          myAttribute: 'My Value',
        },
        meta: [
          { charset: 'utf-8' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          { hid: 'description', name: 'description', content: '' },
          { name: 'format-detection', content: 'telephone=no' },
          {
            hid: 'description',
            name: 'description',
            content: 'My Custom Description'
          },
        ],
        link: [
          { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
          {
            hid: 'apple-touch-icon',
            rel: 'apple-touch-icon',
            sizes: '180x180',
            href: '/apple-touch-icon.png'
          },
        ],
        title: 'nuxt-i18n-test',
      }
    }

    // TODO: canonical not correct

    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true })
    return {
      htmlAttrs: {
        myAttribute: 'My Value',
      ...i18nHead.htmlAttrs
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' },
        {
          hid: 'description',
          name: 'description',
          content: 'My Custom Description'
        },
        ...i18nHead.meta
      ],
        link: [
          { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          hid: 'apple-touch-icon',
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png'
        },
        ...i18nHead.link
      ],
    title: 'nuxt-i18n-test',
    }
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
    strategy: 'prefix_and_default',
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
    // generation problem: https://github.com/nuxt-community/sitemap-module/issues/91
    // canonical link problem: https://i18n.nuxtjs.org/seo#feature-details
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
    nojekyll: false,
    // Important for static hosting with i18n to produce
    // en.html files etc. so there is no trailing slash
    // when provided via simple services like apache
    subFolders: false,
    // TODO: maybe we need some routes here like in https://github.com/miteyema/nuxt-i18n-demo/blob/prod/nuxt.config.js#L132
    //  to overcome relative API calls
  }
}
