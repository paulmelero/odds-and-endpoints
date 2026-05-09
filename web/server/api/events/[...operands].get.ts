export default defineEventHandler(async (event) => {
  const { operands } = getRouterParams(event);

  const response = await event.context.cloudflare.env.API.fetch(
    `https://api/${operands}`,
  );

  return response.json();
});
