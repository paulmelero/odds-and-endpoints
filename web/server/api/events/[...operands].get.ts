export default defineEventHandler(async (event) => {
  const { operands } = getRouterParams(event); // e.g. 5/6

  // ToDo fetch from other Cloudflare worker

  return /* Fake event source */ {
    value: 0.1,
    fraction: '1/10',
    indexNotation: '/1/1',
    source: 'https://pubmed.ncbi.nlm.nih.gov/PMC8898159/',
    exampleEvent: 'Being Born Left-Handed',
    exampleDescription: 'Approximately 10% of the population is left-handed.',
  };
});
