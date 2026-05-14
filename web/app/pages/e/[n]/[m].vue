<template>
  <div>
    <!-- Hero: SlotMachine display -->
    <section class="relative container mx-auto px-4 pt-8 pb-12">
      <div class="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      <div
        class="absolute top-0 left-1/2 -translate-x-1/2 w-full md:w-[600px] h-full md:h-[600px] bg-ember-500/5 rounded-full blur-[128px] pointer-events-none"
      />

      <div class="relative max-w-4xl mx-auto text-center">
        <SlotMachine
          :is-rolling="false"
          :current-odds="`/${n}/${m}`"
          hide-roll-button
        />
      </div>
    </section>

    <!-- Event list -->
    <section class="container mx-auto px-4 pb-12">
      <div class="max-w-3xl mx-auto">
        <div class="text-center mb-8">
          <h1
            class="text-xl sm:text-2xl font-display font-bold text-ink-50 mb-2"
          >
            {{
              events && events.length === 1
                ? '1 Event'
                : `${events?.length || 0} Events`
            }}
            at <span class="font-mono text-ember-400">/{{ n }}/{{ m }}</span>
          </h1>
          <p v-if="firstEvent" class="text-ink-200 text-sm">
            Probability: {{ firstEvent.fraction }}
          </p>
        </div>

        <div class="space-y-6">
          <NuxtLink
            v-for="evt in events"
            :key="evt.slug"
            :to="`/e/${n}/${m}/${evt.slug}`"
            class="block no-underline"
          >
            <div
              class="card p-6 sm:p-8 hover:border-ink-500/50 transition-all duration-200 cursor-pointer group"
            >
              <div class="flex items-center justify-between mb-4">
                <span
                  class="text-xs font-semibold px-2.5 py-1 rounded-md uppercase tracking-wider"
                  :class="getCategoryBadgeClass(evt.category)"
                >
                  {{ evt.category || 'general' }}
                </span>
                <span class="font-mono text-sm text-ink-200">
                  {{ evt.indexNotation }}
                </span>
              </div>

              <h2
                class="text-xl sm:text-2xl font-display font-bold text-ink-50 mb-4 group-hover:text-ember-300 transition-colors"
              >
                {{ evt.exampleEvent }}
              </h2>

              <div class="flex flex-wrap gap-2 mb-5">
                <span
                  class="inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1.5 rounded-md bg-ink-700/60 text-ink-200 border border-ink-600/30"
                >
                  {{ evt.fraction }}
                </span>
                <span
                  class="inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1.5 rounded-md bg-ink-700/60 text-ink-200 border border-ink-600/30"
                >
                  {{ toSup(evt.value, evt.mantissaRest) }}
                </span>
              </div>

              <p class="text-sm sm:text-base text-ink-100 leading-relaxed">
                {{ evt.exampleDescription }}
              </p>
            </div>
          </NuxtLink>
        </div>

        <PaginationNav
          :prev-link="parsedLinks.prev"
          :next-link="parsedLinks.next"
          :prev-label="parsedLinks.prev ? 'Previous odds' : undefined"
          :next-label="parsedLinks.next ? 'Next odds' : undefined"
        />
      </div>
    </section>

    <ApiSyntaxSection />

    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import type { OddsInfo } from '@odds-and-endpoints/types';
import { getCategoryBadgeClass } from '../../../utils/categoryColors';
import { toSup } from '../../../utils/toSup';

const route = useRoute();

const n = computed(() => route.params.n as string);
const m = computed(() => route.params.m as string);

const linkHeader = ref<string | null>(null);

const { data: events } = await useFetch(
  () => `/api/events/${n.value}/${m.value}`,
  {
    transform: (data: OddsInfo | OddsInfo[]): OddsInfo[] =>
      Array.isArray(data) ? data : [data],
    onResponse({ response }) {
      linkHeader.value = response.headers.get('Link');
    },
  },
);

provide('oddsEvents', events);

const parsedLinks = computed(() => {
  if (!linkHeader.value) return {} as Record<string, string>;
  const result: Record<string, string> = {};
  for (const part of linkHeader.value.split(',')) {
    const match = part.match(/<([^>]+)>;\s*rel="([^"]+)"/);
    if (match?.[1] && match[2]) result[match[2]] = `/e${match[1]}`;
  }
  return result;
});

const firstEvent = computed(() => events.value?.[0]);

useSeoMeta({
  title: () => {
    const evt = firstEvent.value;
    if (!evt) return `/${n.value}/${m.value} — woddsup`;
    return `${evt.fraction} — ${evt.exampleEvent} — woddsup`;
  },
  description: () => firstEvent.value?.exampleDescription || '',
});

defineOgImage('Custom', {
  title: `Events at odds /${n.value}/${m.value}`,
  description: ``,
});
</script>
