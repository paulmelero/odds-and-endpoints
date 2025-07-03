// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css', '~/assets/css/main.css'],

  experimental: {
    inlineRouteRules: true,
    granularCachedData: true,
  },

  nitro: {
    prerender: {
      autoSubfolderIndex: false,
    },
    preset: 'cloudflare_module',
    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
    },
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/test-utils',
    '@nuxtjs/tailwindcss',
  ],
});
