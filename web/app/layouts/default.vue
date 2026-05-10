<template>
  <div class="min-h-screen bg-ink-950 text-ink-100">
    <AppHeader />
    <main class="relative z-[1] isolate pt-20">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
