<template>
  <div class="w-full">
    <!-- Scale Header -->
    <div class="flex items-center justify-between mb-4 px-1">
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-3 text-xs text-ink-400">
          <span class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-rare-common" /> Common
          </span>
          <span class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-rare-medium" /> Unlikely
          </span>
          <span class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-rare-extreme" /> Rare
          </span>
          <span class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-rare-impossible" /> Impossible
          </span>
        </div>
      </div>
      <span class="text-xs text-ink-500 hidden sm:block"
        >Scroll to explore the full range</span
      >
    </div>

    <!-- Scrollable Scale -->
    <div ref="scaleContainer" class="scale-track overflow-x-auto pb-4">
      <div
        class="relative h-32 sm:h-40"
        :style="{ minWidth: `${scaleWidth}px` }"
      >
        <!-- Background Grid Lines -->
        <div class="absolute inset-0">
          <div
            v-for="tick in majorTicks"
            :key="tick.exponent"
            class="absolute top-0 bottom-0 flex flex-col items-center"
            :style="{ left: `${tick.position}%` }"
          >
            <div
              class="w-px h-full"
              :class="tick.exponent === 0 ? 'bg-ink-500/40' : 'bg-ink-700/40'"
            />
            <span
              class="absolute bottom-0 text-[10px] font-mono whitespace-nowrap -translate-x-1/2"
              :class="tick.exponent === 0 ? 'text-ink-300' : 'text-ink-500'"
            >
              10<sup>{{ tick.exponent === 0 ? '0' : `-${tick.exponent}` }}</sup>
            </span>
          </div>
        </div>

        <!-- Track Line -->
        <div
          class="absolute left-0 right-0 h-px top-1/2 -translate-y-1/2"
          style="
            background: linear-gradient(
              to right,
              #4ade80,
              #f59e0b 30%,
              #a855f7 60%,
              #ec4899 85%
            );
          "
        />

        <!-- Event Dots -->
        <button
          v-for="(dot, i) in eventDots"
          :key="dot.event.indexNotation + dot.event.exampleEvent"
          class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 group cursor-pointer transition-all duration-200"
          :style="{
            left: `${dot.position}%`,
            zIndex: hoveredIndex === i ? 30 : 10,
          }"
          @mouseenter="hoveredIndex = i"
          @mouseleave="hoveredIndex = null"
          @click="$emit('select', dot.event)"
        >
          <!-- Dot -->
          <div
            class="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border-2 transition-all duration-200"
            :class="[
              hoveredIndex === i
                ? 'scale-150 border-white'
                : 'border-ink-900 group-hover:scale-125',
              selectedNotation === dot.event.indexNotation
                ? 'ring-2 ring-offset-1 ring-offset-ink-900'
                : '',
            ]"
            :style="{
              backgroundColor: dot.color,
              ringColor: dot.color,
            }"
          />

          <!-- Tooltip -->
          <div
            v-show="hoveredIndex === i"
            class="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-2 bg-ink-800 border border-ink-600/40 rounded-lg shadow-xl whitespace-nowrap text-left animate-fade-in pointer-events-none"
            style="min-width: 180px"
          >
            <p class="text-xs font-semibold text-ink-100 mb-0.5">
              {{ dot.event.exampleEvent }}
            </p>
            <p class="text-[10px] font-mono text-ink-400">
              {{ dot.event.fraction }}
              <span class="ml-1.5 text-ink-500">{{
                dot.event.indexNotation
              }}</span>
            </p>
            <div
              class="absolute top-full left-1/2 -translate-x-1/2 -mt-px w-2 h-2 rotate-45 bg-ink-800 border-r border-b border-ink-600/40"
            />
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type EventSummary = {
  indexNotation: string;
  exampleEvent: string;
  fraction: string;
  category?: string;
};

const props = defineProps<{
  events: EventSummary[];
  selectedNotation?: string;
}>();

defineEmits<{
  (e: 'select', event: EventSummary): void;
}>();

const hoveredIndex = ref<number | null>(null);

const maxExponent = 70;
const scaleWidth = computed(() => Math.max(800, props.events.length * 30));

const majorTicks = computed(() => {
  const ticks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 19, 24, 35, 50, 68];
  return ticks.map((exp) => ({
    exponent: exp,
    position: (exp / maxExponent) * 100,
  }));
});

const categoryColorMap: Record<string, string> = {
  'human-biology': '#fb7185',
  genetics: '#a78bfa',
  games: '#fbbf24',
  nature: '#34d399',
  weather: '#38bdf8',
  space: '#818cf8',
  sports: '#fb923c',
  'daily-life': '#2dd4bf',
};

const rarityColor = (exponent: number): string => {
  if (exponent <= 2) return '#4ade80';
  if (exponent <= 5) return '#f59e0b';
  if (exponent <= 9) return '#a855f7';
  return '#ec4899';
};

const eventDots = computed(() => {
  return props.events.map((event) => {
    const match = event.indexNotation.match(/\/(\d+)\//);
    const exp = match ? parseInt(match[1]) : 1;

    return {
      event,
      position: (exp / maxExponent) * 100,
      color: categoryColorMap[event.category || ''] || rarityColor(exp),
    };
  });
});
</script>
