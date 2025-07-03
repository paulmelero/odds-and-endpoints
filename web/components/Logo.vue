<template>
  <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
    <span class="text-white font-bold text-sm">O</span>
  </div>
  <span
    class="text-xl font-bold"
    :class="{
      'text-gray-900': !dark,
      'text-white': dark,
    }"
    >Odds and End—Point—s</span
  >
</template>

<script setup lang="ts">
const props = defineProps<{
  dark?: boolean;
}>();
</script>
