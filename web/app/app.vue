<template>
  <div class="min-h-screen">
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
useHead({
  link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
});

useSeoMeta({
  title: 'Odds and End—Point—s',
  ogTitle: 'Odds and End—Point—s',
  description: 'Scientific notation made REST. Get a random fact from the API',
  ogDescription:
    'Scientific notation made REST. Get a random fact from the API',
  ogImage: '/cover.png',
  ogImageWidth: 944,
  ogImageHeight: 464,
  ogImageAlt: 'Odds and End—Point—s — Scientific notation made REST',
  ogType: 'website',
  ogSiteName: 'Odds and End—Point—s',
  ogLocale: 'en_US',
  twitterCard: 'summary_large_image',
  twitterImage: '/cover.png',
  twitterTitle: 'Odds and End—Point—s',
  twitterDescription:
    'Scientific notation made REST. Get a random fact from the API',
  twitterImageAlt: 'Odds and End—Point—s — Scientific notation made REST',
});
</script>
