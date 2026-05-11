<template>
  <div>
    <!-- Hero Section -->
    <section class="relative container mx-auto px-4 pb-24">
      <!-- Background Grid + Glow -->
      <div class="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      <div
        class="absolute top-0 left-1/2 -translate-x-1/2 w-full md:w-[600px] h-full md:h-[600px] bg-ember-500/5 rounded-full blur-[128px] pointer-events-none"
      />

      <div class="relative max-w-4xl mx-auto">
        <div class="text-center">
          <div class="my-5 md:my-10">
            <span
              class="text-xs inline-block text-ink-400 px-4 py-2 rounded-full border border-ink-700/50 font-mono tracking-wider uppercase"
            >
              Applied (Recreational) Maths
            </span>
          </div>
          <h1
            class="text-xl sm:text-4xl md:text-6xl font-display font-bold text-ink-50 mb-6"
          >
            woddsup
          </h1>
          <p
            class="text-lg md:text-xl text-ink-200 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Scientific notation made REST. Get a random fact from the API
            &mdash; Search, explore, and learn the odds of extraordinary events.
          </p>
        </div>

        <div class="text-center">
          <!-- Slot Machine Section -->
          <div class="mb-12">
            <SlotMachine
              :is-rolling="isRolling"
              :current-odds="currentIndexNotation"
              @roll="handleRoll"
            />

            <div
              v-if="rollError || listError || eventError"
              class="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm"
              role="alert"
            >
              {{
                rollError || 'Could not load events. Please try again later.'
              }}
            </div>

            <EventDisplay
              v-if="currentEvent"
              :event="currentEvent"
              :detail-link="
                currentEvent ? '/e' + currentEvent.indexNotation : undefined
              "
              class="mt-8"
              @select-related="handleRelatedSelect"
            />
          </div>
        </div>
      </div>
      <div class="relative max-w-4xl mx-auto">
        <SearchBar :events="fullList || []" @select="handleSearchSelect" />
      </div>
    </section>

    <!-- Probability Scale Section -->
    <section class="py-16 border-t border-ink-800/50">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-10">
            <h2
              id="explore"
              class="text-2xl md:text-3xl font-display font-bold text-ink-50 mb-3 scroll-mt-24"
            >
              The Probability Spectrum
            </h2>
            <p class="text-ink-200 text-sm max-w-lg mx-auto">
              From coin flips to cosmic coincidences &mdash; every event mapped
              on a logarithmic scale.
            </p>
          </div>

          <ProbabilityScale
            v-if="fullList && fullList.length > 0"
            :events="fullList"
            :selected-notation="currentEvent?.indexNotation"
            @select="handleScaleSelect"
          />

          <div v-else class="h-40 rounded-xl bg-ink-800/30 animate-pulse" />
        </div>
      </div>
    </section>

    <ApiSyntaxSection />

    <!-- Featured Events Section -->
    <section class="py-16 border-t border-ink-800/50">
      <div class="container mx-auto px-4">
        <div class="max-w-5xl mx-auto">
          <div class="text-center mb-10">
            <h2
              class="text-2xl md:text-3xl font-display font-bold text-ink-50 mb-3"
            >
              Featured Odds
            </h2>
            <p class="text-ink-200 text-sm">
              Explore the full spectrum of probability.
            </p>
          </div>

          <div class="grid sm:grid-cols-3 gap-4">
            <NuxtLink
              v-for="item in featuredEvents"
              :key="item.path"
              :to="item.path"
              class="card p-5 text-left hover:border-ink-500/50 transition-all duration-200 group no-underline"
            >
              <div class="flex items-center justify-between mb-3">
                <span
                  class="text-[10px] font-semibold px-2 py-0.5 rounded-md uppercase tracking-wider"
                  :class="getCategoryBadgeClass(item.category)"
                >
                  {{ item.category }}
                </span>
                <span
                  class="text-xs font-mono text-ember-400 font-semibold group-hover:text-ember-300 transition-colors"
                >
                  {{ item.notation }}
                </span>
              </div>
              <h3
                class="text-sm font-semibold text-ink-100 mb-1 group-hover:text-ink-50 transition-colors"
              >
                {{ item.title }}
              </h3>
              <p class="text-xs text-ink-500">
                {{ item.fraction }}
              </p>
            </NuxtLink>
          </div>

          <div class="text-center mt-8">
            <NuxtLink
              to="/e/1/1"
              class="px-6 py-2.5 rounded-xl text-sm font-medium border border-ink-600/30 text-ink-300 hover:text-ink-100 hover:border-ink-500/50 bg-ink-800/40 transition-all inline-flex items-center gap-2 no-underline"
            >
              Browse All Events
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
          </div>
        </div>
      </div>
    </section>

    <!-- API + Contribute Section (Side by Side) -->
    <section class="py-16 border-t border-ink-800/50">
      <div class="container mx-auto px-4">
        <div class="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          <!-- For Developers -->
          <div
            id="api"
            class="card p-8 scroll-mt-32 flex flex-col justify-between"
          >
            <div
              class="w-10 h-10 rounded-xl bg-ember-500/10 border border-ember-500/20 flex items-center justify-center mb-5"
            >
              <svg
                class="w-5 h-5 text-ember-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            </div>
            <h3 class="text-xl font-display font-bold text-ink-50 mb-3">
              For Developers
            </h3>
            <p class="text-sm text-ink-200 mb-6 leading-relaxed">
              Our open API lets you explore rare event probabilities
              programmatically &mdash; perfect for students, educators, or
              playful projects.
            </p>
            <a
              href="#about"
              class="inline-flex items-center gap-2 text-sm font-medium text-ember-400 hover:text-ember-300 transition-colors"
            >
              How does it work?
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
            </a>
          </div>

          <!-- Contribute -->
          <div
            id="contribute"
            class="card p-8 scroll-mt-32 flex flex-col justify-between"
          >
            <div
              class="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5"
            >
              <svg
                class="w-5 h-5 text-emerald-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <h3 class="text-xl font-display font-bold text-ink-50 mb-3">
              Contribute
            </h3>
            <p class="text-sm text-ink-200 mb-6 leading-relaxed">
              Know a quirky probability? Submit your odd fact and help build the
              world's most comprehensive database of rare events.
            </p>
            <a
              href="https://github.com/paulmelero/odds-and-endpoints/issues/new?title=New+Odd+Fact&body=Event+name:%0AProbability:%0ASource+URL:%0ADescription:"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              Submit an Odd Fact
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
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { OddsInfo, EventSummary } from '@odds-and-endpoints/types';
import { getCategoryBadgeClass } from '../utils/categoryColors';

const isRolling = ref(false);
const rollError = ref<string | null>(null);

const { data: fullList, error: listError } = await useAsyncData<EventSummary[]>(
  'fullList',
  () => $fetch<EventSummary[]>('/api/events'),
);

const { data: currentEvent, error: eventError } = await useAsyncData<OddsInfo>(
  'currentEvent',
  () => $fetch('/api/events/5/6'),
);

const currentIndexNotation = computed(() => {
  return currentEvent.value?.indexNotation || '...';
});

const featuredEvents = [
  {
    path: '/e/1/5',
    notation: '/1/5',
    title: 'Fair Coin Toss',
    fraction: '1/2',
    category: 'games',
  },
  {
    path: '/e/5/6',
    notation: '/5/6',
    title: 'Lightning Strike in a Lifetime',
    fraction: '1/15300',
    category: 'weather',
  },
  {
    path: '/e/9/3',
    notation: '/9/3',
    title: 'Winning the Powerball Jackpot',
    fraction: '1/300000000',
    category: 'games',
  },
];

const fetchEvent = (path: string): Promise<OddsInfo | OddsInfo[]> => {
  return $fetch<OddsInfo | OddsInfo[]>('/api/events/' + path);
};

const handleRoll = () => {
  isRolling.value = true;
  rollError.value = null;

  const list = fullList.value;
  if (!list || list.length === 0) {
    isRolling.value = false;
    rollError.value = 'No events available.';
    return;
  }

  const randomItem = list[Math.floor(Math.random() * list.length)]!;
  const path = randomItem.indexNotation.replace(/^\//, '');

  fetchEvent(path)
    .then((result) => {
      if (Array.isArray(result)) {
        currentEvent.value = result[Math.floor(Math.random() * result.length)];
      } else {
        currentEvent.value = result;
      }
    })
    .catch(() => {
      rollError.value = 'Could not load event. Please try again.';
    })
    .finally(() => {
      isRolling.value = false;
    });
};

const selectEvent = (item: EventSummary) => {
  const path = item.indexNotation.replace(/^\//, '');
  fetchEvent(path)
    .then((result) => {
      if (Array.isArray(result)) {
        const match = result.find((r) => r.exampleEvent === item.exampleEvent);
        currentEvent.value = match || result[0];
      } else {
        currentEvent.value = result;
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    })
    .catch(() => {
      rollError.value = 'Could not load event. Please try again.';
    });
};

const handleSearchSelect = (item: EventSummary) => selectEvent(item);
const handleScaleSelect = (item: EventSummary) => selectEvent(item);

const handleRelatedSelect = (notation: string) => {
  const path = notation.replace(/^\//, '');
  fetchEvent(path)
    .then((result) => {
      currentEvent.value = Array.isArray(result) ? result[0] : result;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    })
    .catch(() => {
      rollError.value = 'Could not load event. Please try again.';
    });
};
</script>
