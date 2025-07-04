//https://nitro.unjs.io/config

export default defineNitroConfig({
  srcDir: 'server',
  compatibilityDate: '2025-04-24',
  preset: 'cloudflare_module',
  cloudflare: {
    deployConfig: true,
    nodeCompat: true,
  },
});
