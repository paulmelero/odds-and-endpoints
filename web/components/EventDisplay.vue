<template>
  <div class="card p-8 max-w-2xl mx-auto text-center">
    <div class="mb-6">
      <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
        {{ props.event.exampleEvent }}
      </h3>
      <div class="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
        <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
          {{ props.event.fraction }}
        </span>
        <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full">
          {{ scientificNotation }}
        </span>
        <span class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
          <!-- indexNotation is not part of OddsInfo, so omit or replace as needed -->
        </span>
      </div>
    </div>

    <p class="text-lg text-gray-700 leading-relaxed">
      {{ props.event.exampleDescription }}
    </p>

    <div class="mt-6 pt-6 border-t border-gray-200">
      <button class="btn-secondary">Learn More</button>
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

const scientificNotation = computed(() =>
  toSup(props.event.value, props.event.mantissaRest)
);
</script>
