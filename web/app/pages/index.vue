<template>
  <div class="min-h-screen bg-ink-950 text-ink-100">
    <AppHeader />

    <!-- Hero Section -->
    <main class="relative z-[1] isolate pt-20">
      <section class="relative container mx-auto px-4 pb-16 overflow-hidden">
        <!-- Background Grid + Glow -->
        <div class="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
        <div
          class="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-ember-500/5 rounded-full blur-[128px] pointer-events-none"
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
              class="text-4xl md:text-6xl font-display font-bold text-ink-50 mb-6"
            >
              Odds and End<span class="text-ember-400">&mdash;</span>Point<span
                class="text-ember-400"
                >&mdash;</span
              >s
            </h1>
            <p
              class="text-lg md:text-xl text-ink-400 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Scientific notation made REST. Get a random fact from the API
              &mdash; Search, explore, and learn the odds of extraordinary
              events.
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
              <p class="text-ink-400 text-sm max-w-lg mx-auto">
                From coin flips to cosmic coincidences &mdash; every event
                mapped on a logarithmic scale.
              </p>
            </div>

            <LazyShowProbabilityScale
              v-if="fullList && fullList.length > 0"
              hydrate-on-interaction="scroll"
              :events="fullList"
              :selected-notation="currentEvent?.indexNotation"
              @select="handleScaleSelect"
            />

            <div v-else class="h-40 rounded-xl bg-ink-800/30 animate-pulse" />
          </div>
        </div>
      </section>

      <!-- How It Works Section -->
      <section class="py-16 border-t border-ink-800/50">
        <div class="container mx-auto px-4">
          <div class="max-w-4xl mx-auto">
            <div class="text-center mb-10">
              <h2
                id="about"
                class="text-2xl md:text-3xl font-display font-bold text-ink-50 mb-3 scroll-mt-32"
              >
                How the API Works
              </h2>
              <p class="text-ink-400 text-sm max-w-lg mx-auto">
                A REST-friendly notation system for indexing real-world
                probabilities.
              </p>
            </div>

            <div class="card p-6 sm:p-8 mb-10">
              <div
                class="text-xl sm:text-2xl font-mono text-ink-200 mb-4 text-center"
              >
                0.0000653 = 6.53 &times; 10&#x207B;&#x2075; =
                <span class="text-ember-400 font-bold">/5/6</span>
              </div>
              <p
                class="text-ink-400 text-sm text-center max-w-xl mx-auto leading-relaxed"
              >
                We encode each probability as
                <code
                  class="text-ember-400 bg-ink-800 px-1.5 py-0.5 rounded text-xs"
                  >/n/m</code
                >
                where <strong class="text-ink-200">n</strong> is the negative
                exponent and <strong class="text-ink-200">m</strong> is the
                leading digit of the mantissa.
              </p>
            </div>

            <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div
                v-for="feature in features"
                :key="feature.title"
                class="card p-5"
              >
                <div
                  class="w-8 h-8 rounded-lg bg-ember-500/10 border border-ember-500/20 flex items-center justify-center mb-3"
                >
                  <span class="text-ember-400 text-sm">{{ feature.icon }}</span>
                </div>
                <h3 class="text-sm font-semibold text-ink-100 mb-1">
                  {{ feature.title }}
                </h3>
                <p class="text-xs text-ink-500 leading-relaxed">
                  {{ feature.desc }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Browse Events Section -->
      <section class="py-16 border-t border-ink-800/50">
        <div class="container mx-auto px-4">
          <div class="max-w-5xl mx-auto">
            <div class="text-center mb-10">
              <h2
                class="text-2xl md:text-3xl font-display font-bold text-ink-50 mb-3"
              >
                Browse All Events
              </h2>
              <p class="text-ink-400 text-sm">
                {{ fullList?.length || 0 }} probability entries across
                {{ categoryCount }} categories.
              </p>
            </div>

            <div
              v-if="fullList && fullList.length > 0"
              class="grid sm:grid-cols-2 md:grid-cols-3 gap-4"
            >
              <button
                v-for="item in displayedEvents"
                :key="item.indexNotation + item.exampleEvent"
                class="card p-5 text-left hover:border-ink-500/50 transition-all duration-200 cursor-pointer group"
                @click="selectEvent(item)"
              >
                <div class="flex items-center justify-between mb-3">
                  <span
                    class="text-[10px] font-semibold px-2 py-0.5 rounded-md uppercase tracking-wider"
                    :class="categoryClass(item.category)"
                  >
                    {{ item.category || 'general' }}
                  </span>
                  <span
                    class="text-xs font-mono text-ember-400 font-semibold group-hover:text-ember-300 transition-colors"
                  >
                    {{ item.indexNotation }}
                  </span>
                </div>
                <h3
                  class="text-sm font-semibold text-ink-100 mb-1 group-hover:text-ink-50 transition-colors"
                >
                  {{ item.exampleEvent }}
                </h3>
                <p class="text-xs text-ink-500">
                  {{ item.fraction }}
                </p>
              </button>
            </div>

            <div v-else class="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div
                v-for="i in 9"
                :key="i"
                class="h-28 rounded-xl bg-ink-800/30 animate-pulse"
              />
            </div>

            <div
              v-if="fullList && fullList.length > 9"
              class="text-center mt-8"
            >
              <button
                class="px-6 py-2.5 rounded-xl text-sm font-medium border border-ink-600/30 text-ink-300 hover:text-ink-100 hover:border-ink-500/50 bg-ink-800/40 transition-all"
                @click="showAllEvents = !showAllEvents"
              >
                {{
                  showAllEvents
                    ? 'Show Less'
                    : `Show All ${fullList.length} Events`
                }}
              </button>
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
              <p class="text-sm text-ink-400 mb-6 leading-relaxed">
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
              <p class="text-sm text-ink-400 mb-6 leading-relaxed">
                Know a quirky probability? Submit your odd fact and help build
                the world's most comprehensive database of rare events.
              </p>
              <a
                href="https://github.com/nicored/odds-and-endpoints/issues/new?title=New+Odd+Fact&body=Event+name:%0AProbability:%0ASource+URL:%0ADescription:"
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
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { defineLazyHydrationComponent } from '#imports';
import type { OddsInfo } from '@odds-and-endpoints/types';

const LazyShowProbabilityScale = defineLazyHydrationComponent(
  'interaction',
  () => import('../components/ProbabilityScale.vue'),
);

type EventSummary = {
  indexNotation: string;
  exampleEvent: string;
  fraction: string;
  category?: string;
};

useSeoMeta({
  title: 'Odds and End—Point—s',
  ogTitle: 'Odds and End—Point—s',
  description: 'Scientific notation made REST. Get a random fact from the API',
  ogDescription:
    'Scientific notation made REST. Get a random fact from the API',
  twitterCard: 'summary_large_image',
});

const isRolling = ref(false);
const rollError = ref<string | null>(null);
const showAllEvents = ref(false);

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

const categoryCount = computed(() => {
  if (!fullList.value) return 0;
  const cats = new Set(fullList.value.map((e) => e.category).filter(Boolean));
  return cats.size;
});

const displayedEvents = computed(() => {
  if (!fullList.value) return [];
  if (showAllEvents.value) return fullList.value;
  return fullList.value.slice(0, 9);
});

const features = [
  {
    icon: 'Σ',
    title: 'Real Sources',
    desc: 'Every probability backed by peer-reviewed papers, government data, or trusted institutions.',
  },
  {
    icon: 'λ',
    title: 'REST Notation',
    desc: 'Clean /n/m paths that encode scientific notation for easy exploration and API access.',
  },
  {
    icon: '∞',
    title: 'Wide Spectrum',
    desc: 'From coin flips (10⁻¹) to cosmic coincidences (10⁻⁶⁸) — the full range of rarity.',
  },
  {
    icon: '∑',
    title: 'Open & Free',
    desc: 'Community-powered database. Suggest new entries, build on the API, or fork the project.',
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

  const randomItem = list[Math.floor(Math.random() * list.length)];
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

const handleSearchSelect = (item: EventSummary) => {
  selectEvent(item);
};

const handleScaleSelect = (item: EventSummary) => {
  selectEvent(item);
};

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

const categoryColors: Record<string, string> = {
  'human-biology': 'bg-rose-500/15 text-rose-400 border border-rose-500/20',
  genetics: 'bg-violet-500/15 text-violet-400 border border-violet-500/20',
  games: 'bg-amber-500/15 text-amber-400 border border-amber-500/20',
  nature: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20',
  weather: 'bg-sky-500/15 text-sky-400 border border-sky-500/20',
  space: 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/20',
  sports: 'bg-orange-500/15 text-orange-400 border border-orange-500/20',
  'daily-life': 'bg-teal-500/15 text-teal-400 border border-teal-500/20',
};

const categoryClass = (category?: string) => {
  return (
    categoryColors[category || ''] ||
    'bg-ink-600/30 text-ink-300 border border-ink-500/20'
  );
};
</script>
