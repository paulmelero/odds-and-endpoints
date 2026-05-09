<template>
  <footer class="bg-ink-950 border-t border-ink-700/20 pt-12 pb-8">
    <div class="container mx-auto px-4">
      <div class="grid md:grid-cols-4 gap-8 mb-10">
        <div class="md:col-span-2">
          <Logo dark />
          <p class="text-ink-500 mt-4 mb-6 max-w-sm text-sm leading-relaxed">
            Exploring life's improbabilities through the lens of mathematics.
            Every entry backed by real sources.
          </p>
          <div class="flex gap-3">
            <a
              href="#"
              class="w-9 h-9 rounded-lg bg-ink-800 border border-ink-700/30 flex items-center justify-center text-ink-400 hover:text-ember-400 hover:border-ember-500/30 transition-all"
              aria-label="Twitter"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="#"
              class="w-9 h-9 rounded-lg bg-ink-800 border border-ink-700/30 flex items-center justify-center text-ink-400 hover:text-ember-400 hover:border-ember-500/30 transition-all"
              aria-label="GitHub"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h3 class="text-sm font-semibold text-ink-200 mb-3 uppercase tracking-wider">Explore</h3>
          <ul class="space-y-2">
            <li><a href="#explore" class="text-sm text-ink-500 hover:text-ember-400 transition-colors">Browse Events</a></li>
            <li><a href="#explore" class="text-sm text-ink-500 hover:text-ember-400 transition-colors">Search Odds</a></li>
            <li><a href="#about" class="text-sm text-ink-500 hover:text-ember-400 transition-colors">How It Works</a></li>
          </ul>
        </div>

        <div>
          <h3 class="text-sm font-semibold text-ink-200 mb-3 uppercase tracking-wider">Resources</h3>
          <ul class="space-y-2">
            <li><a href="#api" class="text-sm text-ink-500 hover:text-ember-400 transition-colors">API Documentation</a></li>
            <li><a href="#contribute" class="text-sm text-ink-500 hover:text-ember-400 transition-colors">Contribute</a></li>
            <li><a href="#about" class="text-sm text-ink-500 hover:text-ember-400 transition-colors">About</a></li>
          </ul>
        </div>
      </div>

      <div class="border-t border-ink-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ink-600">
        <p>&copy; {{ new Date().getFullYear() }} Odds and End—Point—s</p>
        <p>Built with curiosity and scientific rigor.</p>
      </div>
    </div>
  </footer>
</template>
