<template>
  <header
    class="fixed w-full top-0 z-50 bg-ink-950/80 backdrop-blur-xl border-b border-ink-700/30"
  >
    <nav class="container mx-auto px-4 py-3.5">
      <div class="flex items-center justify-between">
        <Logo />

        <div class="hidden md:flex items-center gap-1">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            class="btn-ghost text-sm"
          >
            {{ link.label }}
          </a>
        </div>

        <button
          class="md:hidden p-2 rounded-lg text-ink-400 hover:text-ink-100 hover:bg-ink-800 transition-colors"
          aria-label="Toggle navigation menu"
          :aria-expanded="mobileMenuOpen"
          @click="toggleMobileMenu"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              v-if="!mobileMenuOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div v-if="mobileMenuOpen" class="md:hidden mt-3 pt-3 border-t border-ink-700/30">
        <div class="flex flex-col gap-1">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            class="btn-ghost text-sm text-left"
            @click="mobileMenuOpen = false"
          >
            {{ link.label }}
          </a>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const mobileMenuOpen = ref(false);

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#explore', label: 'Explore' },
  { href: '#api', label: 'API' },
  { href: '#contribute', label: 'Contribute' },
];

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};
</script>
