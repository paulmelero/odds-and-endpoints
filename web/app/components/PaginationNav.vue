<template>
  <nav
    v-if="prevLink || nextLink"
    class="flex items-center justify-between gap-4 py-8"
  >
    <NuxtLink
      v-if="prevLink"
      :to="prevLink"
      class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border border-ink-600/30 text-ink-300 hover:text-ink-100 hover:border-ink-500/50 bg-ink-800/40 transition-all"
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
          d="M15 19l-7-7 7-7"
        />
      </svg>
      {{ prevLabel || 'Previous' }}
    </NuxtLink>
    <span v-else />

    <NuxtLink
      v-if="nextLink"
      :to="nextLink"
      class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border border-ink-600/30 text-ink-300 hover:text-ink-100 hover:border-ink-500/50 bg-ink-800/40 transition-all"
    >
      {{ nextLabel || 'Next' }}
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
          d="M9 5l7 7-7 7"
        />
      </svg>
    </NuxtLink>
    <span v-else />
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  prevLink?: string;
  nextLink?: string;
  prevLabel?: string;
  nextLabel?: string;
}>();
</script>
