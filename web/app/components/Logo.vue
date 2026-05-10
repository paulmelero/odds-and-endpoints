<template>
  <div class="flex items-center gap-2.5">
    <div
      class="w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-sm"
      :class="
        dark
          ? 'bg-ink-700 text-ember-400 border border-ink-500/30'
          : 'bg-ember-500 text-ink-950'
      "
    >
      /
    </div>
    <span
      class="text-lg font-display font-semibold tracking-tight"
      :class="dark ? 'text-ink-300' : 'text-ink-100'"
    >
      Odds and <wbr />End—Point—s
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  dark?: boolean;
}>();
</script>
