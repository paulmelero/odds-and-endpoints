<template>
  <div class="w-full">
    <!-- Scale Header -->
    <div class="flex items-center justify-between mb-4 px-1">
      <div class="flex items-center gap-3 text-xs text-ink-200">
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
      <div class="flex items-center gap-2">
        <button
          class="w-7 h-7 rounded-md bg-ink-800 border border-ink-700/40 text-ink-200 hover:text-ink-200 hover:border-ink-500/50 transition-colors text-sm font-mono flex items-center justify-center"
          :disabled="!isZoomed"
          :class="{ 'opacity-30 cursor-not-allowed': !isZoomed }"
          @click="zoomOut"
        >
          -
        </button>
        <button
          v-if="isZoomed"
          class="h-7 px-2 rounded-md bg-ink-800 border border-ink-700/40 text-ink-200 hover:text-ink-200 hover:border-ink-500/50 transition-colors text-[10px] font-mono flex items-center justify-center"
          @click="resetZoom"
        >
          Reset
        </button>
        <button
          class="w-7 h-7 rounded-md bg-ink-800 border border-ink-700/40 text-ink-200 hover:text-ink-200 hover:border-ink-500/50 transition-colors text-sm font-mono flex items-center justify-center"
          @click="zoomIn"
        >
          +
        </button>
      </div>
    </div>

    <!-- SVG Container -->
    <div
      ref="containerRef"
      class="relative select-none"
      :class="isZoomed ? (isPanning ? 'cursor-grabbing' : 'cursor-grab') : ''"
      @mousedown="handleMouseDown"
      @touchstart.passive="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <svg
        :viewBox="`0 0 ${SVG_W} ${SVG_H}`"
        class="w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient
            id="curveGrad"
            gradientUnits="userSpaceOnUse"
            :x1="gradX1"
            y1="0"
            :x2="gradX2"
            y2="0"
          >
            <stop offset="0%" stop-color="#4ade80" />
            <stop offset="30%" stop-color="#f59e0b" />
            <stop offset="60%" stop-color="#a855f7" />
            <stop offset="100%" stop-color="#ec4899" />
          </linearGradient>
          <clipPath id="plotClip">
            <rect :x="PAD.l" :y="PAD.t" :width="PW" :height="PH" />
          </clipPath>
        </defs>

        <!-- Bars (infinitesimals) -->
        <g clip-path="url(#plotClip)" opacity="0.6">
          <rect
            v-for="(bar, i) in bars"
            :key="'b' + i"
            :x="bar.x"
            :y="bar.y"
            :width="bar.w"
            :height="bar.h"
            :fill="bar.color"
            rx="1"
          />
        </g>

        <!-- Area fill under curve -->
        <path
          :d="areaPath"
          fill="url(#curveGrad)"
          opacity="0.05"
          clip-path="url(#plotClip)"
        />

        <!-- Curve stroke -->
        <path
          :d="curvePath"
          fill="none"
          stroke="url(#curveGrad)"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          clip-path="url(#plotClip)"
        />

        <!-- X-axis line -->
        <line
          :x1="PAD.l"
          :y1="PAD.t + PH"
          :x2="PAD.l + PW"
          :y2="PAD.t + PH"
          stroke="#2a3048"
          stroke-width="1"
        />

        <!-- Ticks -->
        <g v-for="tick in axisTicks" :key="'t' + tick.exp">
          <line
            :x1="tick.x"
            :y1="PAD.t + PH"
            :x2="tick.x"
            :y2="PAD.t + PH + 6"
            stroke="#3d455e"
            stroke-width="1"
          />
          <text
            :x="tick.x"
            :y="PAD.t + PH + 20"
            text-anchor="middle"
            fill="#596180"
            font-size="10"
            font-family="DM Mono, monospace"
          >
            {{ tick.label }}
          </text>
        </g>

        <!-- Event dots -->
        <g
          v-for="dot in visibleDots"
          :key="dot.event.indexNotation + dot.event.exampleEvent"
          class="prob-dot"
          @mouseenter="hoveredIndex = dot.index"
          @mouseleave="hoveredIndex = null"
          @click.stop="handleDotClick(dot)"
        >
          <circle
            :cx="dot.cx"
            :cy="dot.cy"
            r="14"
            fill="transparent"
            class="cursor-pointer"
          />
          <circle
            v-if="selectedNotation === dot.event.indexNotation"
            :cx="dot.cx"
            :cy="dot.cy"
            r="10"
            fill="none"
            :stroke="dot.color"
            stroke-width="2"
            opacity="0.5"
          />
          <circle
            :cx="dot.cx"
            :cy="dot.cy"
            class="prob-dot-circle"
            :fill="dot.color"
            stroke="#0e1019"
            stroke-width="1.5"
          />
        </g>
      </svg>

      <!-- Tooltip (HTML overlay) -->
      <div
        v-if="hoveredDot"
        class="absolute pointer-events-none z-20"
        :style="tooltipStyle"
      >
        <div
          class="px-3 py-2 bg-ink-800 border border-ink-600/40 rounded-lg shadow-xl whitespace-nowrap text-left animate-fade-in"
        >
          <p class="text-xs font-semibold text-ink-100 mb-0.5">
            {{ hoveredDot.event.exampleEvent }}
          </p>
          <p class="text-[10px] font-mono text-ink-200">
            {{ hoveredDot.event.fraction }}
            <span class="ml-1.5 text-ink-500">{{
              hoveredDot.event.indexNotation
            }}</span>
          </p>
        </div>
      </div>

      <!-- Ctrl+Scroll hint overlay -->
      <Transition name="hint">
        <div
          v-if="showScrollHint"
          class="absolute inset-0 flex items-center justify-center bg-ink-950/60 backdrop-blur-sm rounded-lg pointer-events-none z-30"
        >
          <div
            class="px-5 py-3 rounded-xl bg-ink-800/90 border border-ink-600/30 shadow-lg"
          >
            <p class="text-sm text-ink-200 font-medium">
              Use
              <kbd
                class="px-1.5 py-0.5 mx-0.5 rounded bg-ink-700 text-ink-300 text-xs font-mono border border-ink-600/40"
                >Ctrl</kbd
              >
              + Scroll to zoom
            </p>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { EventSummary } from '@odds-and-endpoints/types';
import { CATEGORY_HEX_COLORS } from '../utils/categoryColors';

const props = defineProps<{
  events: EventSummary[];
  selectedNotation?: string;
}>();

const emit = defineEmits<{
  (e: 'select', event: EventSummary): void;
}>();

const SVG_W = 1000;
const SVG_H = 400;
const PAD = { t: 30, r: 20, b: 50, l: 20 };
const PW = SVG_W - PAD.l - PAD.r;
const PH = SVG_H - PAD.t - PAD.b;
const MAX_EXP = 70;
const CURVE_K = 2.5;
const BAR_COUNT = 65;
const MIN_RANGE = 2;

const containerRef = ref<HTMLElement | null>(null);
const viewMin = ref(0);
const viewMax = ref(MAX_EXP);
const hoveredIndex = ref<number | null>(null);
const isPanning = ref(false);
const panMoved = ref(false);
const panStartX = ref(0);
const panStartViewMin = ref(0);
const panStartViewMax = ref(0);
const showScrollHint = ref(false);
let hintTimer: ReturnType<typeof setTimeout> | null = null;

const isZoomed = computed(
  () => viewMin.value > 0.1 || viewMax.value < MAX_EXP - 0.1,
);

const gradX1 = computed(() => expToX(0));
const gradX2 = computed(() => expToX(MAX_EXP));

function expToX(exp: number): number {
  return PAD.l + ((exp - viewMin.value) / (viewMax.value - viewMin.value)) * PW;
}

function xToExp(x: number): number {
  return viewMin.value + ((x - PAD.l) / PW) * (viewMax.value - viewMin.value);
}

function curveValue(exp: number): number {
  return Math.pow(1 - Math.min(exp / MAX_EXP, 1), CURVE_K);
}

function expToY(exp: number): number {
  return PAD.t + (1 - curveValue(exp)) * PH;
}

// Curve paths
const curvePath = computed(() => {
  const steps = 200;
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const exp = viewMin.value + (i / steps) * (viewMax.value - viewMin.value);
    const x = PAD.l + (i / steps) * PW;
    pts.push(`${x},${expToY(exp)}`);
  }
  return `M${pts.join(' L')}`;
});

const areaPath = computed(() => {
  const bottom = PAD.t + PH;
  return `${curvePath.value} L${PAD.l + PW},${bottom} L${PAD.l},${bottom} Z`;
});

// Bars
function barColor(exp: number): string {
  const t = exp / MAX_EXP;
  let r: number, g: number, b: number;
  if (t < 0.14) {
    const s = t / 0.14;
    r = 74 + (245 - 74) * s;
    g = 222 + (158 - 222) * s;
    b = 128 + (11 - 128) * s;
  } else if (t < 0.43) {
    const s = (t - 0.14) / 0.29;
    r = 245 + (168 - 245) * s;
    g = 158 + (85 - 158) * s;
    b = 11 + (247 - 11) * s;
  } else {
    const s = (t - 0.43) / 0.57;
    r = 168 + (236 - 168) * s;
    g = 85 + (72 - 85) * s;
    b = 247 + (153 - 247) * s;
  }
  return `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},0.18)`;
}

const bars = computed(() => {
  const range = viewMax.value - viewMin.value;
  const step = range / BAR_COUNT;
  const barW = (PW / BAR_COUNT) * 0.82;
  const bottom = PAD.t + PH;
  const result: {
    x: number;
    y: number;
    w: number;
    h: number;
    color: string;
  }[] = [];

  for (let i = 0; i < BAR_COUNT; i++) {
    const exp = viewMin.value + (i + 0.5) * step;
    const cx = PAD.l + ((i + 0.5) / BAR_COUNT) * PW;
    const yTop = expToY(exp);
    const h = bottom - yTop;
    if (h < 0.5) continue;
    result.push({
      x: cx - barW / 2,
      y: yTop,
      w: barW,
      h,
      color: barColor(exp),
    });
  }
  return result;
});

// Axis ticks
const SUPERSCRIPTS = ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹'];
function toSuperscript(n: number): string {
  return String(Math.abs(Math.round(n)))
    .split('')
    .map((d) => SUPERSCRIPTS[parseInt(d)])
    .join('');
}

const axisTicks = computed(() => {
  const range = viewMax.value - viewMin.value;
  let interval: number;
  if (range > 50) interval = 10;
  else if (range > 20) interval = 5;
  else if (range > 10) interval = 2;
  else if (range > 5) interval = 1;
  else interval = 0.5;

  const ticks: { exp: number; x: number; label: string }[] = [];
  const first = Math.ceil(viewMin.value / interval) * interval;

  for (let exp = first; exp <= viewMax.value; exp += interval) {
    const x = expToX(exp);
    if (x < PAD.l - 5 || x > PAD.l + PW + 5) continue;
    const label = exp === 0 ? '10⁰' : `10⁻${toSuperscript(exp)}`;
    ticks.push({ exp, x, label });
  }
  return ticks;
});

// Event dots
const categoryColorMap = CATEGORY_HEX_COLORS;

function rarityColor(exp: number): string {
  if (exp <= 2) return '#4ade80';
  if (exp <= 5) return '#f59e0b';
  if (exp <= 9) return '#a855f7';
  return '#ec4899';
}

const allDots = computed(() => {
  return props.events.map((event, index) => {
    const match = event.indexNotation.match(/\/(\d+)\/(\d+)/);
    const exp = match ? parseInt(match[1]) : 1;
    const mantissa = match ? parseInt(match[2]) : 1;
    const fineExp = exp + (mantissa - 1) * 0.08;

    return {
      event,
      index,
      exp: fineExp,
      cx: expToX(fineExp),
      cy: expToY(fineExp),
      color: categoryColorMap[event.category || ''] || rarityColor(exp),
    };
  });
});

const visibleDots = computed(() => {
  return allDots.value.filter(
    (d) => d.cx >= PAD.l - 10 && d.cx <= PAD.l + PW + 10,
  );
});

const hoveredDot = computed(() => {
  if (hoveredIndex.value === null) return null;
  return allDots.value.find((d) => d.index === hoveredIndex.value) || null;
});

const tooltipStyle = computed(() => {
  if (!hoveredDot.value) return { display: 'none' };
  const xPct = (hoveredDot.value.cx / SVG_W) * 100;
  const yPct = (hoveredDot.value.cy / SVG_H) * 100;
  return {
    left: `${xPct}%`,
    top: `${yPct}%`,
    transform: 'translate(-50%, -110%)',
  };
});

// --- Interactions ---

// Ctrl+Scroll zoom
function handleWheel(e: WheelEvent) {
  if (!e.ctrlKey && !e.metaKey) {
    showScrollHint.value = true;
    if (hintTimer) clearTimeout(hintTimer);
    hintTimer = setTimeout(() => {
      showScrollHint.value = false;
    }, 1500);
    return;
  }

  e.preventDefault();
  const container = containerRef.value;
  if (!container) return;

  const rect = container.getBoundingClientRect();
  const ratio = (e.clientX - rect.left) / rect.width;
  const cursorExp = viewMin.value + ratio * (viewMax.value - viewMin.value);

  const factor = Math.exp(-e.deltaY * 0.003);
  let newMin = cursorExp - (cursorExp - viewMin.value) * factor;
  let newMax = cursorExp + (viewMax.value - cursorExp) * factor;

  const range = newMax - newMin;
  if (range < MIN_RANGE || range > MAX_EXP) return;

  if (newMin < 0) {
    newMax -= newMin;
    newMin = 0;
  }
  if (newMax > MAX_EXP) {
    newMin -= newMax - MAX_EXP;
    newMax = MAX_EXP;
  }
  viewMin.value = Math.max(0, newMin);
  viewMax.value = Math.min(MAX_EXP, newMax);
}

// Pan (mouse)
function handleMouseDown(e: MouseEvent) {
  if (e.button !== 0 || !isZoomed.value) return;
  isPanning.value = true;
  panMoved.value = false;
  panStartX.value = e.clientX;
  panStartViewMin.value = viewMin.value;
  panStartViewMax.value = viewMax.value;
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
}

function handleMouseMove(e: MouseEvent) {
  if (!isPanning.value || !containerRef.value) return;
  const dx = e.clientX - panStartX.value;
  if (Math.abs(dx) > 5) panMoved.value = true;

  const rect = containerRef.value.getBoundingClientRect();
  const range = panStartViewMax.value - panStartViewMin.value;
  const dExp = -(dx / rect.width) * range;

  let newMin = panStartViewMin.value + dExp;
  let newMax = panStartViewMax.value + dExp;
  if (newMin < 0) {
    newMax -= newMin;
    newMin = 0;
  }
  if (newMax > MAX_EXP) {
    newMin -= newMax - MAX_EXP;
    newMax = MAX_EXP;
  }
  viewMin.value = Math.max(0, newMin);
  viewMax.value = Math.min(MAX_EXP, newMax);
}

function handleMouseUp() {
  isPanning.value = false;
  document.removeEventListener('mousemove', handleMouseMove);
  document.removeEventListener('mouseup', handleMouseUp);
}

// Touch
let lastPinchDist = 0;

function handleTouchStart(e: TouchEvent) {
  if (e.touches.length === 2) {
    lastPinchDist = Math.hypot(
      e.touches[1].clientX - e.touches[0].clientX,
      e.touches[1].clientY - e.touches[0].clientY,
    );
  } else if (e.touches.length === 1 && isZoomed.value) {
    isPanning.value = true;
    panMoved.value = false;
    panStartX.value = e.touches[0].clientX;
    panStartViewMin.value = viewMin.value;
    panStartViewMax.value = viewMax.value;
  }
}

function handleTouchMove(e: TouchEvent) {
  if (e.touches.length === 2) {
    e.preventDefault();
    const dist = Math.hypot(
      e.touches[1].clientX - e.touches[0].clientX,
      e.touches[1].clientY - e.touches[0].clientY,
    );
    if (lastPinchDist > 0 && containerRef.value) {
      const factor = lastPinchDist / dist;
      const rect = containerRef.value.getBoundingClientRect();
      const centerX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const ratio = (centerX - rect.left) / rect.width;
      const centerExp = viewMin.value + ratio * (viewMax.value - viewMin.value);

      let newMin = centerExp - (centerExp - viewMin.value) * factor;
      let newMax = centerExp + (viewMax.value - centerExp) * factor;
      const range = newMax - newMin;
      if (range >= MIN_RANGE && range <= MAX_EXP) {
        if (newMin < 0) {
          newMax -= newMin;
          newMin = 0;
        }
        if (newMax > MAX_EXP) {
          newMin -= newMax - MAX_EXP;
          newMax = MAX_EXP;
        }
        viewMin.value = Math.max(0, newMin);
        viewMax.value = Math.min(MAX_EXP, newMax);
      }
    }
    lastPinchDist = dist;
  } else if (e.touches.length === 1 && isPanning.value && containerRef.value) {
    const dx = e.touches[0].clientX - panStartX.value;
    if (Math.abs(dx) > 5) panMoved.value = true;
    const rect = containerRef.value.getBoundingClientRect();
    const range = panStartViewMax.value - panStartViewMin.value;
    const dExp = -(dx / rect.width) * range;
    let newMin = panStartViewMin.value + dExp;
    let newMax = panStartViewMax.value + dExp;
    if (newMin < 0) {
      newMax -= newMin;
      newMin = 0;
    }
    if (newMax > MAX_EXP) {
      newMin -= newMax - MAX_EXP;
      newMax = MAX_EXP;
    }
    viewMin.value = Math.max(0, newMin);
    viewMax.value = Math.min(MAX_EXP, newMax);
  }
}

function handleTouchEnd() {
  isPanning.value = false;
  lastPinchDist = 0;
}

// Dot click
function handleDotClick(dot: (typeof allDots.value)[number]) {
  if (panMoved.value) return;
  emit('select', dot.event);
}

// Zoom buttons with animation
function animateViewport(targetMin: number, targetMax: number) {
  const startMin = viewMin.value;
  const startMax = viewMax.value;
  const start = performance.now();
  const duration = 200;

  function tick(now: number) {
    const t = Math.min((now - start) / duration, 1);
    const ease = t * (2 - t);
    viewMin.value = startMin + (targetMin - startMin) * ease;
    viewMax.value = startMax + (targetMax - startMax) * ease;
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function zoomIn() {
  const center = (viewMin.value + viewMax.value) / 2;
  const half = (viewMax.value - viewMin.value) / 2;
  const newHalf = half * 0.6;
  if (newHalf * 2 < MIN_RANGE) return;
  animateViewport(
    Math.max(0, center - newHalf),
    Math.min(MAX_EXP, center + newHalf),
  );
}

function zoomOut() {
  const center = (viewMin.value + viewMax.value) / 2;
  const half = (viewMax.value - viewMin.value) / 2;
  const newHalf = Math.min(MAX_EXP / 2, half * 1.6);
  let newMin = center - newHalf;
  let newMax = center + newHalf;
  if (newMin < 0) {
    newMax -= newMin;
    newMin = 0;
  }
  if (newMax > MAX_EXP) {
    newMin -= newMax - MAX_EXP;
    newMax = MAX_EXP;
  }
  animateViewport(Math.max(0, newMin), Math.min(MAX_EXP, newMax));
}

function resetZoom() {
  animateViewport(0, MAX_EXP);
}

// Lifecycle: attach non-passive wheel listener
onMounted(() => {
  containerRef.value?.addEventListener('wheel', handleWheel, {
    passive: false,
  });
});

onUnmounted(() => {
  containerRef.value?.removeEventListener('wheel', handleWheel);
  if (hintTimer) clearTimeout(hintTimer);
});
</script>

<style scoped>
.prob-dot-circle {
  r: 5;
  transition: r 0.15s ease-out;
}
.prob-dot:hover .prob-dot-circle {
  r: 7;
}
.prob-dot {
  cursor: pointer;
}

.hint-enter-active,
.hint-leave-active {
  transition: opacity 0.25s ease;
}
.hint-enter-from,
.hint-leave-to {
  opacity: 0;
}
</style>
