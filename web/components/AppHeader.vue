<template>
  <header
    class="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm"
  >
    <nav class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <Logo />
        </div>

        <div class="hidden md:flex items-center space-x-8">
          <a
            href="#about"
            class="text-gray-600 hover:text-blue-600 transition-colors"
          >
            About
          </a>
          <a
            href="#explore"
            class="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Explore
          </a>
          <a
            href="#api"
            class="text-gray-600 hover:text-blue-600 transition-colors"
          >
            API
          </a>
          <a
            href="#contribute"
            class="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Contribute
          </a>
        </div>

        <!-- Mobile menu button -->
        <button
          class="md:hidden p-2 rounded-lg hover:bg-gray-100"
          @click="toggleMobileMenu"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>

      <!-- Mobile menu -->
      <div v-if="mobileMenuOpen" class="md:hidden mt-4 py-4 border-t">
        <div class="flex flex-col space-y-4">
          <a
            href="#"
            class="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Explore
          </a>
          <a
            href="#"
            class="text-gray-600 hover:text-blue-600 transition-colors"
          >
            API
          </a>
          <a
            href="#"
            class="text-gray-600 hover:text-blue-600 transition-colors"
          >
            About
          </a>
          <a
            href="#"
            class="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Contribute
          </a>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const mobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};
</script>
