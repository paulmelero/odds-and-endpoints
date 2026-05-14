// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-05-09',
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css', '~/assets/css/main.css'],

  experimental: {
    viewTransition: true,
  },

  nitro: {
    prerender: {
      autoSubfolderIndex: false,
      routes: ['/'],
      crawlLinks: true,
    },
    preset: 'cloudflare_module',
    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
    },
    alias: {
      'better-sqlite3': 'unenv/mock/empty',
    },
  },

  vite: {
    optimizeDeps: {
      include: ['@number-flow/vue'],
    },
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/test-utils',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/seo',
    'nuxt-ai-ready',
  ],

  site: {
    url: 'https://woddsup.com',
    name: 'woddsup',
  },

  ogImage: {
    defaults: {
      renderer: 'takumi',
    },
    zeroRuntime: true,
  },

  sitemap: {
    zeroRuntime: true,
  },
});
