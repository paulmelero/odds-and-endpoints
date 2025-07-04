//https://nitro.unjs.io/config
import nitroCloudflareBindings from 'nitro-cloudflare-dev';

export default defineNitroConfig({
  srcDir: 'server',
  compatibilityDate: '2025-04-24',
  modules: [nitroCloudflareBindings],
  preset: 'cloudflare_module',
  cloudflare: {
    deployConfig: true,
    nodeCompat: true,
  },
});
