<template>
  <div class="max-w-xl mx-auto relative">
    <div class="relative">
      <label for="search" class="sr-only">Search by Event or Odds</label>
      <div class="relative">
        <div
          class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
        >
          <svg
            class="h-4 w-4 text-ink-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          id="search"
          v-model="searchQuery"
          type="text"
          class="block w-full pl-11 pr-4 py-3 bg-ink-800/60 border border-ink-600/30 rounded-xl text-ink-100 placeholder-ink-300 focus:outline-none focus:border-ember-500/50 focus:ring-1 focus:ring-ember-500/30 text-sm transition-colors"
          placeholder="Search events, odds, categories..."
        />
      </div>
    </div>

    <div class="mt-2.5 text-center">
      <p class="text-xs text-ink-300">
        Try "lightning", "poker", "blood type", or "1/10"
      </p>
    </div>

    <!-- Results Dropdown -->
    <div
      v-if="searchQuery && searchQuery.length >= 2"
      class="absolute top-full left-0 right-0 mt-2 bg-ink-800 border border-ink-600/30 rounded-xl shadow-2xl overflow-hidden z-40"
    >
      <div v-if="searchResults.length > 0" class="max-h-64 overflow-y-auto">
        <button
          v-for="result in searchResults"
          :key="result.indexNotation + result.exampleEvent"
          class="w-full px-4 py-3 hover:bg-ink-700/60 text-left transition-colors border-b border-ink-700/30 last:border-b-0 flex items-center justify-between gap-3"
          @click="selectResult(result)"
        >
          <div class="min-w-0">
            <p class="text-sm font-medium text-ink-100 truncate">
              {{ result.exampleEvent }}
            </p>
            <p class="text-xs text-ink-400 mt-0.5">{{ result.fraction }}</p>
          </div>
          <span class="text-xs font-mono text-ember-400 shrink-0">{{
            result.indexNotation
          }}</span>
        </button>
      </div>
      <div v-else class="px-4 py-6 text-center text-sm text-ink-300">
        No events found for "{{ searchQuery }}"
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { EventSummary } from '@odds-and-endpoints/types';

const props = defineProps<{
  events: EventSummary[];
}>();

const emit = defineEmits<{
  (e: 'select', item: EventSummary): void;
}>();

const searchQuery = ref('');

const searchResults = computed(() => {
  if (!searchQuery.value || searchQuery.value.length < 2) return [];
  const q = searchQuery.value.toLowerCase();

  return props.events.filter(
    (event) =>
      event.exampleEvent.toLowerCase().includes(q) ||
      event.fraction.toLowerCase().includes(q) ||
      event.indexNotation.includes(q) ||
      (event.category && event.category.toLowerCase().includes(q)),
  );
});

const selectResult = (result: EventSummary) => {
  emit('select', result);
  searchQuery.value = '';
};
</script>
