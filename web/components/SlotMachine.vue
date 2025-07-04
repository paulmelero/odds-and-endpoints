<template>
  <div class="flex flex-col items-center space-y-8">
    <!-- Slot Machine Display -->
    <div
      class="flex items-center space-x-4 p-8 bg-white rounded-2xl shadow-2xl border-4 border-blue-200"
    >
      <ClientOnly>
        <NumberFlowGroup>
          <div class="flex items-center">
            <!-- Forward slash -->
            <div
              class="bg-white rounded-lg w-20 h-24 flex items-center justify-center"
            >
              <span class="text-6xl font-mono font-bold text-blue-600">/</span>
            </div>

            <!-- First digit with NumberFlow animation -->
            <div
              class="bg-white rounded-lg shadow-md w-20 h-24 flex items-center justify-center border-2 border-blue-200"
            >
              <NumberFlow
                :value="firstDigit"
                :duration="800"
                :delay="0"
                class="text-6xl font-mono font-bold text-blue-600"
              />
            </div>

            <!-- Forward slash -->
            <div
              class="bg-white rounded-lg w-20 h-24 flex items-center justify-center"
            >
              <span class="text-6xl font-mono font-bold text-blue-600">/</span>
            </div>

            <!-- Second digit with NumberFlow animation -->
            <div
              class="bg-white rounded-lg shadow-md w-20 h-24 flex items-center justify-center border-2 border-blue-200"
            >
              <NumberFlow
                :value="secondDigit"
                :duration="800"
                :delay="200"
                class="text-6xl font-mono font-bold text-blue-600"
              />
            </div>
          </div>
        </NumberFlowGroup>
        <template #fallback>
          {{ currentOdds }}
        </template>
      </ClientOnly>
    </div>

    <!-- Roll Button -->
    <button
      @click="handleRoll"
      :disabled="isRolling"
      class="btn-primary text-xl px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
      :class="{ 'animate-pulse': isRolling }"
    >
      {{ isRolling ? 'Rolling...' : 'Roll the Odds!' }}
    </button>

    <!-- Current Odds Display -->
    <div class="text-center">
      <p class="text-gray-600 text-lg mb-2">Current Odds Index:</p>
      <div
        class="text-4xl font-mono font-bold text-blue-600 bg-blue-50 px-6 py-3 rounded-lg"
      >
        {{ currentOdds }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
// Needs to be wrapped in a ClientOnly!!
import NumberFlow, { NumberFlowGroup } from '@number-flow/vue';

interface Props {
  isRolling: boolean;
  currentOdds: string;
}

interface Emits {
  (event: 'roll'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// Internal state for the animated digits
const animatedFirstDigit = ref(5);
const animatedSecondDigit = ref(6);

// Extract digits from the current odds string and animate them
const firstDigit = computed(() => {
  if (props.isRolling) {
    // During rolling, show random numbers for animation effect
    return Math.floor(Math.random() * 10);
  }

  const match = props.currentOdds.match(/\/(\d+)\//);
  const targetDigit = match ? parseInt(match[1]) : 5;

  // Update the animated value when not rolling
  if (animatedFirstDigit.value !== targetDigit) {
    animatedFirstDigit.value = targetDigit;
  }

  return animatedFirstDigit.value;
});

const secondDigit = computed(() => {
  if (props.isRolling) {
    // During rolling, show random numbers for animation effect
    return Math.floor(Math.random() * 10);
  }

  const match = props.currentOdds.match(/\/\d+\/(\d+)/);
  const targetDigit = match ? parseInt(match[1]) : 6;

  // Update the animated value when not rolling
  if (animatedSecondDigit.value !== targetDigit) {
    animatedSecondDigit.value = targetDigit;
  }

  return animatedSecondDigit.value;
});

const handleRoll = () => {
  if (!props.isRolling) {
    emit('roll');
  }
};
</script>
