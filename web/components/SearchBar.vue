<template>
  <div class="max-w-2xl mx-auto">
    <div class="relative">
      <label for="search" class="sr-only">Search by Event or Odds</label>
      <div class="relative">
        <div
          class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
        >
          <svg
            class="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          id="search"
          v-model="searchQuery"
          type="text"
          class="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
          placeholder="Search by Event or Odds"
          @input="handleSearch"
        />
      </div>
    </div>

    <div class="mt-4 text-center">
      <p class="text-sm text-gray-500">
        Try searching for "lightning", "meteor", or "left-handed"
      </p>
    </div>

    <!-- Search Results Placeholder -->
    <div
      v-if="searchQuery && searchResults.length > 0"
      class="mt-6 bg-white rounded-xl shadow-lg border border-gray-200"
    >
      <div class="p-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Search Results</h3>
      </div>
      <div class="max-h-64 overflow-y-auto">
        <div
          v-for="result in searchResults"
          :key="result.id"
          class="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
          @click="selectResult(result)"
        >
          <h4 class="font-semibold text-gray-900">{{ result.name }}</h4>
          <p class="text-sm text-gray-600 mt-1">{{ result.probability }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const searchQuery = ref('');

// Mock search results - in real app, this would come from an API
const mockEvents = [
  {
    id: 1,
    name: 'Lightning Strike in a lifetime',
    probability: '1 in 15,300',
    description:
      'The odds of being struck by lightning in your lifetime are about 1 in 15,300.',
  },
  {
    id: 2,
    name: 'Meteor Impact',
    probability: '1 in 700,000',
    description:
      'The probability of a significant meteor impact affecting Earth during your lifetime.',
  },
  {
    id: 3,
    name: 'Being Born Left-Handed',
    probability: '1 in 10',
    description: 'Approximately 10% of the population is left-handed.',
  },
];

const searchResults = computed(() => {
  if (!searchQuery.value) return [];

  return mockEvents.filter(
    (event) =>
      event.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      event.probability.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const handleSearch = () => {
  // In a real app, this would trigger an API call
  console.log('Searching for:', searchQuery.value);
};

const selectResult = (result: any) => {
  console.log('Selected:', result);
  // In a real app, this would navigate to the event page or update the display
  searchQuery.value = result.name;
};
</script>
