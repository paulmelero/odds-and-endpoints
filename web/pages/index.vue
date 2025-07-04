<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <AppHeader />

    <!-- Hero Section -->
    <main class="relative z-[1] isolate pt-20">
      <section class="container mx-auto px-4 pb-16 overflow-hidden">
        <div
          class="after:absolute after:inset-0 after:bg-[url('~/assets/img/Gaussian_distribution.svg')] after:bg-cover after:bg-no-repeat after:bg-center after:opacity-5 after:grayscale after:z-[-1]"
        />
        <div class="max-w-4xl mx-auto">
          <div class="text-center">
            <div class="my-5 md:my-10">
              <span
                class="text-sm inline-block text-gray-500 px-4 py-2 rounded-3xl border border-gray-400"
              >
                Applied Recreational Maths
              </span>
            </div>
            <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Odds and End—Point—s
            </h1>
            <p
              class="text-lg md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto"
            >
              Discover life's rare chances — Search, explore, and learn the odds
              of extraordinary events.
            </p>
          </div>

          <div class="text-center">
            <!-- Slot Machine Section -->
            <div class="mb-16">
              <SlotMachine
                :is-rolling="isRolling"
                :current-odds="currentIndexNotation"
                @roll="handleRoll"
              />

              <EventDisplay
                v-if="currentEvent"
                :event="currentEvent"
                class="mt-8"
              />
            </div>
          </div>
        </div>
        <!-- <div class="max-w-4xl mx-auto"> -->
        <!-- Search Bar -->

        <!-- <SearchBar /> -->
        <!-- </div> -->
      </section>

      <!-- What This Is Section -->
      <section class="bg-white py-16">
        <div class="container mx-auto px-4">
          <div class="max-w-4xl mx-auto text-center">
            <h2
              id="about"
              class="text-3xl md:text-4xl font-bold text-gray-900 mb-8 scroll-mt-32"
            >
              What This Is
            </h2>
            <p class="text-xl text-gray-600 mb-12">
              Odds and End—Point—s blends applied math with curiosity. Discover
              the probability of life's unlikely moments, backed by real
              sources.
            </p>

            <div class="grid md:grid-cols-2 gap-8 text-left">
              <div class="space-y-6">
                <div class="flex items-start space-x-3">
                  <div
                    class="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1"
                  >
                    <svg
                      class="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900">
                      Real-world probabilities, indexed scientifically
                    </h3>
                    <p class="text-gray-600">
                      Accurate data from reliable sources, organized for easy
                      exploration
                    </p>
                  </div>
                </div>

                <div class="flex items-start space-x-3">
                  <div
                    class="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1"
                  >
                    <svg
                      class="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900">
                      Fun, interactive tools to explore rare events
                    </h3>
                    <p class="text-gray-600">
                      Engaging interfaces that make probability accessible and
                      entertaining
                    </p>
                  </div>
                </div>
              </div>

              <div class="space-y-6">
                <div class="flex items-start space-x-3">
                  <div
                    class="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1"
                  >
                    <svg
                      class="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900">
                      Open API for students, developers, and educators
                    </h3>
                    <p class="text-gray-600">
                      Programmatic access to probability data for research and
                      education
                    </p>
                  </div>
                </div>

                <div class="flex items-start space-x-3">
                  <div
                    class="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1"
                  >
                    <svg
                      class="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900">
                      Community-powered: Suggest your own odds
                    </h3>
                    <p class="text-gray-600">
                      Help build the database with your own probability
                      discoveries
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Educational Section -->
      <section class="bg-gray-50 py-16">
        <div class="container mx-auto px-4">
          <div class="max-w-4xl mx-auto text-center">
            <h2
              id="notation"
              class="text-3xl md:text-4xl font-bold text-gray-900 mb-8 scroll-mt-32"
            >
              Scientific Notation, Simplified
            </h2>

            <div class="card p-8 mb-8">
              <div class="text-2xl md:text-3xl font-mono text-gray-700 mb-4">
                0.0000653 = 6.53 × 10⁻⁵ =
                <span class="text-blue-600 font-bold">/5/6</span> in our index
              </div>
              <p class="text-gray-600 text-lg">
                We use a simplified notation system to make rare event
                probabilities easy to understand and compare. This helps you
                grasp just how unlikely (or likely) extraordinary events really
                are.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Explore Events Section -->
      <section class="bg-white py-16">
        <div class="container mx-auto px-4">
          <div class="max-w-4xl mx-auto">
            <h2
              id="explore"
              class="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12 scroll-mt-24"
            >
              Explore Events
            </h2>

            <div class="grid md:grid-cols-3 gap-8">
              <div
                class="card p-6 text-center hover:scale-105 transition-transform duration-200"
              >
                <div
                  class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <svg
                    class="w-8 h-8 text-yellow-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M6 2l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2h2zM4 6v8h12V6H4z"
                    />
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">
                  Lightning Strike
                </h3>
                <p class="text-gray-600">
                  Discover the odds of being struck by lightning in your
                  lifetime
                </p>
              </div>

              <div
                class="card p-6 text-center hover:scale-105 transition-transform duration-200"
              >
                <div
                  class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <svg
                    class="w-8 h-8 text-purple-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 2L3 7v11h4v-6h6v6h4V7l-7-5z" />
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">
                  Meteor Impact
                </h3>
                <p class="text-gray-600">
                  Learn about the probability of meteor impacts on Earth
                </p>
              </div>

              <div
                class="card p-6 text-center hover:scale-105 transition-transform duration-200"
              >
                <div
                  class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <svg
                    class="w-8 h-8 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path
                      fill-rule="evenodd"
                      d="M4 5a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 1h6v4H7V6z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">
                  Being Born Left-Handed
                </h3>
                <p class="text-gray-600">
                  Explore the genetics and statistics of handedness
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- For Developers Section -->
      <section class="bg-blue-900 text-white py-16">
        <div class="container mx-auto px-4 text-center">
          <div class="max-w-4xl mx-auto">
            <h2
              id="api"
              class="text-3xl md:text-4xl font-bold mb-8 scroll-mt-32"
            >
              For Developers
            </h2>
            <p class="text-xl mb-8 text-blue-100">
              Our open API lets you explore rare event probabilities
              programmatically — perfect for students, educators, or playful
              projects.
            </p>
            <button
              class="btn-primary bg-white text-blue-900 hover:bg-gray-100"
            >
              View API Docs
            </button>
          </div>
        </div>
      </section>

      <!-- Contribution Section -->
      <section class="bg-gray-50 py-16">
        <div class="container mx-auto px-4 text-center">
          <div class="max-w-4xl mx-auto">
            <h2
              id="contribute"
              class="text-3xl md:text-4xl font-bold text-gray-900 mb-8 scroll-mt-32"
            >
              Contribute Your Knowledge
            </h2>
            <p class="text-xl text-gray-600 mb-8">
              Know a quirky probability? Submit your odd fact and help build the
              world's most comprehensive database of rare events!
            </p>
            <button class="btn-secondary">Submit an Odd Fact (soon)</button>
          </div>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import type { OddsInfo } from '@odds-and-endpoints/types';
import { ref, onMounted } from 'vue';

// SEO Meta
useSeoMeta({
  title: "Odds and End—Point—s - Discover Life's Rare Chances",
  ogTitle: "Odds and End—Point—s - Discover Life's Rare Chances",
  description:
    "Discover life's rare chances — Search, explore, and learn the odds of extraordinary events.",
  ogDescription:
    "Discover life's rare chances — Search, explore, and learn the odds of extraordinary events.",
  ogImage: '/og-image.jpg',
  twitterCard: 'summary_large_image',
});

// Reactive state
const isRolling = ref(false);

const handleRoll = () => {
  isRolling.value = true;

  const randomIndex = Math.floor(Math.random() * (fullList.value?.length || 0));
  $fetch<OddsInfo>(
    '/api/events/' +
      (fullList.value?.[randomIndex]?.indexNotation.replace(/^\//, '') || '5/6')
  )
    .then((event) => {
      currentEvent.value = event;
    })
    .finally(() => {
      isRolling.value = false;
    });
};

const { data: fullList } = await useAsyncData<{ indexNotation: string }[]>(
  'fullList',
  () => {
    return $fetch('/api/events');
  },
  {
    transform: (data) => {
      return Object.entries(data).map(([_, value]) => {
        return {
          indexNotation: Object.keys(value)[0],
        };
      });
    },
  }
);

const { data: currentEvent } = await useAsyncData<OddsInfo>(
  'currentEvent',
  () => {
    return $fetch('/api/events/5/6');
  }
);

const currentIndexNotation = computed(() => {
  return currentEvent.value?.indexNotation || '...';
});
</script>
