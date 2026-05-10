<template>
  <div class="card p-6 sm:p-8 max-w-2xl mx-auto animate-scale-in">
    <!-- Category + Notation header -->
    <div class="flex items-center justify-between mb-4">
      <span
        class="text-xs font-semibold px-2.5 py-1 rounded-md uppercase tracking-wider"
        :class="categoryClass"
      >
        {{ props.event.category || 'general' }}
      </span>
      <span class="font-mono text-sm text-ink-200">
        {{ props.event.indexNotation }}
      </span>
    </div>

    <!-- Event Title -->
    <h3 class="text-xl sm:text-2xl font-display font-bold text-ink-50 mb-4">
      {{ props.event.exampleEvent }}
    </h3>

    <!-- Probability Formats -->
    <div class="flex flex-wrap gap-2 mb-5">
      <span
        class="inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1.5 rounded-md bg-ink-700/60 text-ink-200 border border-ink-600/30"
      >
        <svg
          class="w-3 h-3 text-ink-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
          />
        </svg>
        {{ props.event.fraction }}
      </span>
      <span
        class="inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1.5 rounded-md bg-ink-700/60 text-ink-200 border border-ink-600/30"
      >
        <svg
          class="w-3 h-3 text-ink-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
        {{ scientificNotation }}
      </span>
    </div>

    <!-- Description -->
    <p class="text-sm sm:text-base text-ink-100 leading-relaxed mb-5">
      {{ props.event.exampleDescription }}
    </p>

    <!-- Footer: Source + Related -->
    <div
      class="flex flex-wrap items-center gap-3 pt-4 border-t border-ink-600/20"
    >
      <a
        :href="props.event.source"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-1.5 text-xs text-ember-400 hover:text-ember-300 transition-colors font-medium"
      >
        <svg
          class="w-3.5 h-3.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
        View Source
      </a>

      <template v-if="props.event.related && props.event.related.length > 0">
        <span class="text-ink-600 text-xs">|</span>
        <span class="text-xs text-ink-500">Related:</span>
        <button
          v-for="rel in props.event.related"
          :key="rel"
          class="text-xs font-mono text-ink-300 hover:text-ember-400 px-2 py-0.5 rounded bg-ink-700/40 border border-ink-600/20 hover:border-ember-500/30 transition-all cursor-pointer"
          @click="$emit('selectRelated', rel)"
        >
          {{ rel }}
        </button>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { OddsInfo } from '@odds-and-endpoints/types';
import { toSup } from '../utils/toSup';

interface Props {
  event: OddsInfo;
}

const props = defineProps<Props>();

defineEmits<{
  (e: 'selectRelated', notation: string): void;
}>();

const scientificNotation = computed(() =>
  toSup(props.event.value, props.event.mantissaRest),
);

const categoryStyles: Record<string, string> = {
  'human-biology': 'bg-rose-500/15 text-rose-400 border border-rose-500/20',
  genetics: 'bg-violet-500/15 text-violet-400 border border-violet-500/20',
  games: 'bg-amber-500/15 text-amber-400 border border-amber-500/20',
  nature: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20',
  weather: 'bg-sky-500/15 text-sky-400 border border-sky-500/20',
  space: 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/20',
  sports: 'bg-orange-500/15 text-orange-400 border border-orange-500/20',
  'daily-life': 'bg-teal-500/15 text-teal-400 border border-teal-500/20',
};

const categoryClass = computed(() => {
  return (
    categoryStyles[props.event.category || ''] ||
    'bg-ink-600/30 text-ink-300 border border-ink-500/20'
  );
});
</script>
