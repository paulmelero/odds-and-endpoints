export default defineEventHandler(async (event) => {
  // ToDo fetch from other Cloudflare worker

  return [
    {
      '/1/1': 2,
    },
    {
      '/1/5': 2,
    },
    {
      '/4/1': 1,
    },
    {
      '/5/6': 1,
    },
    {
      '/6/1': 2,
    },
    {
      '/6/2': 2,
    },
    {
      '/7/8': 1,
    },
    {
      '/9/1': 2,
    },
    {
      '/9/3': 2,
    },
  ];
});
