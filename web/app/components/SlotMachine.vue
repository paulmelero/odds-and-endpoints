<template>
  <div class="flex flex-col items-center gap-6">
    <!-- Slot Machine Display -->
    <div
      class="relative p-1 rounded-2xl conic-border"
      :class="isRolling ? 'animate-glow-pulse conic-border--fast' : ''"
      :style="{ '--rarity-color': rarityColor }"
    >
      <div
        class="flex items-center gap-2 sm:gap-3 px-6 sm:px-10 py-6 sm:py-8 bg-ink-900 rounded-xl border border-ink-600/30"
      >
        <ClientOnly>
          <NumberFlowGroup>
            <div class="flex items-center gap-1 sm:gap-2">
              <span
                class="text-4xl sm:text-6xl font-mono font-bold text-ink-500"
                >/</span
              >

              <div
                class="w-14 sm:w-20 h-16 sm:h-24 rounded-lg flex items-center justify-center border border-ink-600/40 bg-ink-800/80"
              >
                <NumberFlow
                  :value="firstDigit"
                  :duration="800"
                  :delay="0"
                  class="text-4xl sm:text-6xl font-mono font-bold"
                  :style="{ color: rarityColor }"
                />
              </div>

              <span
                class="text-4xl sm:text-6xl font-mono font-bold text-ink-500"
                >/</span
              >

              <div
                class="w-14 sm:w-20 h-16 sm:h-24 rounded-lg flex items-center justify-center border border-ink-600/40 bg-ink-800/80"
              >
                <NumberFlow
                  :value="secondDigit"
                  :duration="800"
                  :delay="200"
                  class="text-4xl sm:text-6xl font-mono font-bold"
                  :style="{ color: rarityColor }"
                />
              </div>
            </div>
          </NumberFlowGroup>
          <template #fallback>
            <div class="flex items-center gap-1 sm:gap-2">
              <span
                class="text-4xl sm:text-6xl font-mono font-bold text-ink-500"
                >/</span
              >
              <div
                class="w-14 sm:w-20 h-16 sm:h-24 rounded-lg flex items-center justify-center border border-ink-600/40 bg-ink-800/80"
              >
                <span
                  class="text-4xl sm:text-6xl font-mono font-bold"
                  :style="{ color: rarityColor }"
                  >{{ firstDigit }}</span
                >
              </div>
              <span
                class="text-4xl sm:text-6xl font-mono font-bold text-ink-500"
                >/</span
              >
              <div
                class="w-14 sm:w-20 h-16 sm:h-24 rounded-lg flex items-center justify-center border border-ink-600/40 bg-ink-800/80"
              >
                <span
                  class="text-4xl sm:text-6xl font-mono font-bold"
                  :style="{ color: rarityColor }"
                  >{{ secondDigit }}</span
                >
              </div>
            </div>
          </template>
        </ClientOnly>
      </div>
    </div>

    <!-- Rarity Indicator -->
    <div class="flex items-center gap-3 text-sm" aria-live="polite">
      <div class="flex items-center gap-2">
        <div
          class="w-2 h-2 rounded-full"
          :style="{ backgroundColor: rarityColor }"
        />
        <span class="text-ink-400 font-mono text-xs tracking-wide uppercase">
          {{ rarityLabel }}
        </span>
      </div>
      <span class="text-ink-600 text-xs">|</span>
      <span class="font-mono text-ink-300 text-xs">{{ currentOdds }}</span>
    </div>

    <!-- Roll Button -->
    <button
      @click="handleRoll"
      :disabled="isRolling"
      class="group relative px-8 py-3.5 rounded-xl font-semibold text-base transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
      :class="
        isRolling
          ? 'bg-ink-700 text-ink-400'
          : 'bg-ember-500 hover:bg-ember-400 text-ink-950 hover:shadow-lg hover:shadow-ember-500/20'
      "
    >
      <span class="flex items-center gap-2">
        <svg
          v-if="!isRolling"
          class="w-4 h-4 transition-transform group-hover:rotate-180 duration-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        <svg
          v-else
          class="w-4 h-4 animate-spin"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
        {{ isRolling ? 'Rolling...' : 'Roll the Odds' }}
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import NumberFlow, { NumberFlowGroup } from '@number-flow/vue';

interface Props {
  isRolling: boolean;
  currentOdds: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{ (event: 'roll'): void }>();

const animatedFirstDigit = ref(5);
const animatedSecondDigit = ref(6);

const firstDigit = computed(() => {
  if (props.isRolling) return Math.floor(Math.random() * 10);
  const match = props.currentOdds.match(/\/(\d+)\//);
  const target = match ? parseInt(match[1]) : 5;
  if (animatedFirstDigit.value !== target) animatedFirstDigit.value = target;
  return animatedFirstDigit.value;
});

const secondDigit = computed(() => {
  if (props.isRolling) return Math.floor(Math.random() * 10);
  const match = props.currentOdds.match(/\/\d+\/(\d+)/);
  const target = match ? parseInt(match[1]) : 6;
  if (animatedSecondDigit.value !== target) animatedSecondDigit.value = target;
  return animatedSecondDigit.value;
});

const exponent = computed(() => {
  const match = props.currentOdds.match(/\/(\d+)\//);
  return match ? parseInt(match[1]) : 1;
});

const rarityColor = computed(() => {
  const n = exponent.value;
  if (n <= 2) return '#4ade80';
  if (n <= 5) return '#f59e0b';
  if (n <= 9) return '#a855f7';
  return '#ec4899';
});

const rarityLabel = computed(() => {
  const n = exponent.value;
  if (n <= 2) return 'Common';
  if (n <= 5) return 'Unlikely';
  if (n <= 9) return 'Extremely Rare';
  return 'Near Impossible';
});

const handleRoll = () => {
  if (!props.isRolling) emit('roll');
};
</script>

<style scoped>
@property --conic-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

.conic-border {
  background: conic-gradient(
    from var(--conic-angle),
    transparent 0%,
    color-mix(in srgb, var(--rarity-color) 50%, transparent) 10%,
    transparent 20%,
    transparent 50%,
    color-mix(in srgb, var(--rarity-color) 50%, transparent) 60%,
    transparent 70%
  );
  animation: conic-spin 15s linear infinite;
}

.conic-border--fast {
  animation-duration: 1.5s;
}

@keyframes conic-spin {
  to {
    --conic-angle: 360deg;
  }
}
</style>
