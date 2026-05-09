export default defineEventHandler(async (event) => {
  return fetchFromApi(event, '/');
});
