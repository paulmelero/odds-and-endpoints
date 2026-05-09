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
  }[] = [];

  for (const n in SOURCE) {
    const nKey = parseInt(n) as keyof typeof SOURCE;
    for (const m in SOURCE[nKey]) {
      const entry =
        SOURCE[nKey][m as unknown as keyof (typeof SOURCE)[typeof nKey]];
      const entries = Array.isArray(entry) ? entry : [entry];

      for (const item of entries) {
        list.push({
          indexNotation: item.indexNotation,
          exampleEvent: item.exampleEvent,
          fraction: item.fraction,
          category: item.category,
        });
      }
    }
  }

  return list;
});
