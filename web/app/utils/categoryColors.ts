export const CATEGORY_BADGE_CLASSES: Record<string, string> = {
  'human-biology': 'bg-rose-500/15 text-rose-400 border border-rose-500/20',
  genetics: 'bg-violet-500/15 text-violet-400 border border-violet-500/20',
  games: 'bg-amber-500/15 text-amber-400 border border-amber-500/20',
  nature: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20',
  weather: 'bg-sky-500/15 text-sky-400 border border-sky-500/20',
  space: 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/20',
  sports: 'bg-orange-500/15 text-orange-400 border border-orange-500/20',
  'daily-life': 'bg-teal-500/15 text-teal-400 border border-teal-500/20',
};

const DEFAULT_BADGE_CLASS = 'bg-ink-600/30 text-ink-300 border border-ink-500/20';

export function getCategoryBadgeClass(category?: string): string {
  return CATEGORY_BADGE_CLASSES[category || ''] || DEFAULT_BADGE_CLASS;
}

export const CATEGORY_HEX_COLORS: Record<string, string> = {
  'human-biology': '#fb7185',
  genetics: '#a78bfa',
  games: '#fbbf24',
  nature: '#34d399',
  weather: '#38bdf8',
  space: '#818cf8',
  sports: '#fb923c',
  'daily-life': '#2dd4bf',
};
