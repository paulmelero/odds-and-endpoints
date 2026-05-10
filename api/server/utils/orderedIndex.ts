import { SOURCE } from '~/constants/source';

type OddsKey = { n: number; m: number; path: string };

const orderedKeys: OddsKey[] = [];

const sortedN = Object.keys(SOURCE)
  .map(Number)
  .sort((a, b) => a - b);

for (const n of sortedN) {
  const bucket = SOURCE[n as keyof typeof SOURCE];
  const sortedM = Object.keys(bucket)
    .map(Number)
    .sort((a, b) => a - b);
  for (const m of sortedM) {
    orderedKeys.push({ n, m, path: `/${n}/${m}` });
  }
}

export function getNavigation(n: number, m: number) {
  const idx = orderedKeys.findIndex((k) => k.n === n && k.m === m);
  if (idx === -1) return null;
  return {
    current: orderedKeys[idx],
    prev: idx > 0 ? orderedKeys[idx - 1] : null,
    next: idx < orderedKeys.length - 1 ? orderedKeys[idx + 1] : null,
    first: orderedKeys[0],
    last: orderedKeys[orderedKeys.length - 1],
  };
}
