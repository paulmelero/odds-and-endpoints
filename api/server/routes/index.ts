import { SOURCE } from '~/constants/source';

export default defineEventHandler((event) => {
  setHeaders(event, {
    'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400',
    'CDN-Cache-Control': 'public, max-age=604800',
  });
  const list: {
    indexNotation: string;
    exampleEvent: string;
    fraction: string;
    category?: string;
    slug: string;
  }[] = [];

  const sortedN = Object.keys(SOURCE)
    .map(Number)
    .sort((a, b) => a - b);

  for (const n of sortedN) {
    const nKey = n as keyof typeof SOURCE;
    const sortedM = Object.keys(SOURCE[nKey])
      .map(Number)
      .sort((a, b) => a - b);

    for (const m of sortedM) {
      const entry =
        SOURCE[nKey][m as unknown as keyof (typeof SOURCE)[typeof nKey]];
      const entries = Array.isArray(entry) ? entry : [entry];

      for (const item of entries) {
        list.push({
          indexNotation: item.indexNotation,
          exampleEvent: item.exampleEvent,
          fraction: item.fraction,
          category: item.category,
          slug: item.slug,
        });
      }
    }
  }

  return list;
});
