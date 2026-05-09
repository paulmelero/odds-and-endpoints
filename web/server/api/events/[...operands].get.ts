export default defineEventHandler(async (event) => {
  const { operands } = getRouterParams(event);
  return fetchFromApi(event, `/${operands}`);
});
