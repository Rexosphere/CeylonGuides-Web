// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: { enabled: true },

  modules: [
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss'
  ],

  runtimeConfig: {
    public: {
      // Auto-overridden by NUXT_PUBLIC_API_BASE env var
      apiBase: 'http://localhost:8787'
    }
  },

  app: {
    head: {
      title: 'CeylonWiki - Your Trusted Virtual Tour Guide for Sri Lanka',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { name: 'description', content: 'Your trusted virtual tour guide for exploring the beautiful island of Sri Lanka' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:wght@200..800&display=swap'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap'
        }
      ],
      htmlAttrs: {
        class: 'light',
        lang: 'en'
      }
    }
  },

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    }
  ],

  css: ['~/assets/css/main.css'],

  typescript: {
    strict: true,
    typeCheck: true
  }
})
