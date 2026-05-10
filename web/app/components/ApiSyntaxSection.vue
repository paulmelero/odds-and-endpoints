<template>
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
          <p class="text-ink-200 text-sm max-w-lg mx-auto">
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
            class="text-ink-200 text-sm text-center max-w-xl mx-auto leading-relaxed"
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
            <p class="text-xs text-ink-200 leading-relaxed">
              {{ feature.desc }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
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
</script>
