<template>
  <Teleport to="body">
    <dialog
      ref="dialogRef"
      class="fixed inset-0 z-50 bg-transparent p-4 m-0 w-full h-full max-w-full max-h-full grid place-items-center overflow-y-auto"
      :open="!hydrated || undefined"
      @close="handleClose"
      @click.self="handleClose"
    >
      <div
        v-if="event"
        class="card max-w-2xl w-full relative dialog-content pt-10"
      >
        <!-- Close button -->
        <button
          class="absolute top-4 right-4 z-10 w-8 h-8 rounded-lg bg-ink-800 border border-ink-700/30 flex items-center justify-center text-ink-400 hover:text-ink-100 hover:border-ink-500/50 transition-all"
          aria-label="Close"
          @click="handleClose"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <!-- Category badge + Notation -->
        <div
          class="flex items-center justify-between p-6 pb-0 sm:p-8 sm:pb-0 pr-14"
        >
          <span
            class="text-xs font-semibold px-2.5 py-1 rounded-md uppercase tracking-wider"
            :class="getCategoryBadgeClass(event.category)"
          >
            {{ event.category || 'general' }}
          </span>
          <span class="font-mono text-sm text-ink-200">
            {{ event.indexNotation }}
          </span>
        </div>

        <!-- Main content -->
        <div class="p-6 sm:p-8 pt-4 sm:pt-4">
          <h2
            class="text-2xl sm:text-3xl font-display font-bold text-ink-50 mb-5"
          >
            {{ event.exampleEvent }}
          </h2>

          <!-- Probability formats -->
          <div class="flex flex-wrap gap-2 mb-6">
            <span
              class="inline-flex items-center gap-1.5 text-sm font-mono px-3 py-2 rounded-lg bg-ink-700/60 text-ink-200 border border-ink-600/30"
            >
              <svg
                class="w-3.5 h-3.5 text-ink-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                />
              </svg>
              {{ event.fraction }}
            </span>
            <span
              class="inline-flex items-center gap-1.5 text-sm font-mono px-3 py-2 rounded-lg bg-ink-700/60 text-ink-200 border border-ink-600/30"
            >
              <svg
                class="w-3.5 h-3.5 text-ink-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              {{ scientificNotation }}
            </span>
            <span
              class="inline-flex items-center gap-1.5 text-sm font-mono px-3 py-2 rounded-lg bg-ink-700/60 text-ink-200 border border-ink-600/30"
            >
              <svg
                class="w-3.5 h-3.5 text-ink-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              {{ event.value.toExponential(4) }}
            </span>
          </div>

          <!-- Description -->
          <p class="text-base sm:text-lg text-ink-100 leading-relaxed mb-6">
            {{ event.exampleDescription }}
          </p>
        </div>

        <div
          class="flex justify-between items-center border-t border-ink-600/20"
        >
          <!-- Source -->
          <div class="flex flex-wrap items-center gap-3 pt-2 pb-6 px-6 sm:px-8">
            <a
              :href="event.source"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 text-sm text-ember-400 hover:text-ember-300 transition-colors font-medium"
            >
              <svg
                class="w-4 h-4"
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
              View Source
            </a>

            <template v-if="event.related && event.related.length > 0">
              <span class="text-ink-600 text-xs">|</span>
              <span class="text-xs text-ink-500">Related:</span>
              <NuxtLink
                v-for="rel in event.related"
                :key="rel"
                :to="`/e${rel}`"
                class="text-xs font-mono text-ink-300 hover:text-ember-400 px-2 py-0.5 rounded bg-ink-700/40 border border-ink-600/20 hover:border-ember-500/30 transition-all no-underline"
                @click="dialogRef?.close()"
              >
                {{ rel }}
              </NuxtLink>
            </template>
          </div>

          <!-- Prev/Next within this odds bucket -->
          <nav
            v-if="events && events.length > 1"
            class="flex items-center justify-between gap-4 px-6 sm:px-8 pb-6 sm:pb-8 pt-4"
          >
            <NuxtLink
              v-if="prevEvent"
              :to="`/e/${n}/${m}/${prevEvent.slug}`"
              class="inline-flex items-center gap-1.5 text-xs text-ink-300 hover:text-ember-400 transition-colors font-medium no-underline"
            >
              <svg
                class="w-3 h-3 shrink-0"
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
              {{ prevEvent.exampleEvent }}
            </NuxtLink>
            <span v-else />

            <NuxtLink
              v-if="nextEvent"
              :to="`/e/${n}/${m}/${nextEvent.slug}`"
              class="inline-flex items-center gap-1.5 text-xs text-ink-300 hover:text-ember-400 transition-colors font-medium text-right no-underline"
            >
              {{ nextEvent.exampleEvent }}
              <svg
                class="w-3 h-3 shrink-0"
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
        </div>
      </div>

      <div v-else class="card p-8 max-w-md w-full text-center">
        <p class="text-ink-300">Event not found.</p>
        <NuxtLink
          :to="`/e/${n}/${m}`"
          class="inline-block mt-4 text-sm text-ember-400 hover:text-ember-300 transition-colors"
        >
          Back to event list
        </NuxtLink>
      </div>
    </dialog>
  </Teleport>
</template>

<script setup lang="ts">
import type { OddsInfo } from '@odds-and-endpoints/types';
import { getCategoryBadgeClass } from '../../../../utils/categoryColors';
import { toSup } from '../../../../utils/toSup';

const route = useRoute();
const router = useRouter();

const n = computed(() => route.params.n as string);
const m = computed(() => route.params.m as string);
const slug = computed(() => route.params.slug as string);

const events = inject<Ref<OddsInfo[] | null>>('oddsEvents');

const event = computed(
  () => events?.value?.find((e) => e.slug === slug.value) ?? null,
);

const scientificNotation = computed(() => {
  if (!event.value) return '';
  return toSup(event.value.value, event.value.mantissaRest);
});

const currentIndex = computed(() => {
  if (!events?.value || !event.value) return -1;
  return events.value.findIndex((e) => e.slug === slug.value);
});

const prevEvent = computed(() => {
  if (!events?.value || currentIndex.value <= 0) return null;
  return events.value[currentIndex.value - 1];
});

const nextEvent = computed(() => {
  if (!events?.value || currentIndex.value < 0) return null;
  if (currentIndex.value >= events.value.length - 1) return null;
  return events.value[currentIndex.value + 1];
});

const dialogRef = ref<HTMLDialogElement | null>(null);
const hydrated = ref(false);

function handleClose() {
  const el = dialogRef.value;
  const close = () => {
    el?.close();
    router.push(`/e/${n.value}/${m.value}`);
  };
  if (document.startViewTransition) {
    document.startViewTransition(close);
  } else {
    close();
  }
}

onMounted(() => {
  const el = dialogRef.value;
  if (!el) return;
  el.removeAttribute('open');
  if (document.startViewTransition) {
    document.startViewTransition(() => el.showModal());
  } else {
    el.showModal();
  }
  hydrated.value = true;
});

useSeoMeta({
  title: () => {
    if (!event.value) return `/${n.value}/${m.value} — woddsup`;
    return `${event.value.exampleEvent} — woddsup`;
  },
  description: () => event.value?.exampleDescription || '',
});
</script>

<style scoped>
dialog[open]:not(:modal) {
  background: rgb(8 10 16 / 0.8);
  backdrop-filter: blur(4px);
}

dialog::backdrop {
  background: rgb(8 10 16 / 0.8);
  backdrop-filter: blur(4px);
  animation: fade-in 0.2s ease-out;
}

dialog:modal .dialog-content {
  animation: scale-in 0.25s ease-out;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(8px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>
