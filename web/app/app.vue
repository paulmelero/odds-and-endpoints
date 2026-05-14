<template>
  <NuxtLayout>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
});

useSeoMeta({
  title: 'woddsup - Look up the odds of extraordinary events',
  ogTitle: 'woddsup.com',
  description:
    'Scientific notation made REST. Get a random fact from the API. How likely is it to happen? Search, explore, and learn the odds of common or extraordinary events',
  ogDescription:
    'Scientific notation made REST. Get a random fact from the API',
  ogImage: '/cover.png',
  ogImageWidth: 944,
  ogImageHeight: 464,
  ogImageAlt: 'woddsup — Scientific notation made REST',
  ogType: 'website',
  ogSiteName: 'woddsup',
  ogLocale: 'en_US',
  twitterCard: 'summary_large_image',
  twitterImage: '/cover.png',
  twitterTitle: 'woddsup',
  twitterDescription:
    'Scientific notation made REST. Get a random fact from the API',
  twitterImageAlt: 'woddsup — Scientific notation made REST',
});

defineOrganization({
  name: 'woddsup',
  logo: '/favicon.svg',
});
</script>
