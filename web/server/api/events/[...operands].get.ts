export default defineEventHandler(async (event) => {
  const { operands } = getRouterParams(event); // e.g. 5/6

  console.log({ env: event.context.cloudflare.env });

  const oddsApi = event.context.cloudflare.env.API;

  const odds = await (await oddsApi(`/${operands}`)).json();

  return odds;
});
