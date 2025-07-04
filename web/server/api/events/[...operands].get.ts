export default defineEventHandler(async (event) => {
  const { operands } = getRouterParams(event); // e.g. 5/6

  // call API binding
  const odds = await event.context.cloudflare.env.API(operands);
  return odds;
});
