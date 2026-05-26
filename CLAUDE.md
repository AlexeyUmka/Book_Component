# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start Vite dev server (HMR on localhost:5173)
npm run build     # production build → dist/
npm run preview   # preview the production build locally
npm run lint      # ESLint (flat config, eslint.config.js)
```

No test runner is configured.

## Architecture

React 19 + Vite 8 SPA for **K2 Gameworks LLC**. The app has two screens toggled by `showBook` state in `App.jsx`: a landing screen and a full-screen interactive book.

**Component tree:**
```
App
├── LanguageSwitcher   — EN/UA flag toggle (top-right, fixed), persists to localStorage
├── Particles          — animated background (30 seeded pseudo-random particles, blue & yellow)
├── [landing screen]   — visible when showBook=false
│   ├── .mainContent   — h1 + translated tagline + "Learn about the game" button
│   └── Footer         — contacts, YouTube link, copyright
└── Book (key=language) — visible when showBook=true, full-screen overlay (position:fixed)
    └── bookmarks sidebar + HTMLFlipBook (react-pageflip) with 30 content pages
```

**i18n:** `react-i18next` with two locales in `src/locales/` (`en.json`, `ua.json`). Initialized in `src/i18n.js` (imported by `main.jsx`). Active language is stored in `localStorage`. Switching language re-mounts `Book` via `key={i18n.language}` to reset page state. The `lang-en` / `lang-ua` class on `<body>` drives font switching inside the book's CSS Modules.

**Styling approach:** mixed — `App.css` and `index.css` are global; `Book` and `Footer` use CSS Modules. New components should prefer CSS Modules.

**Fonts:** custom display fonts declared in `src/index.css` via `@font-face`, loaded from `public/assets/fonts/`. FontAwesome brand icons are loaded from a CDN `<link>` in `index.html`. `Monomakh_Unicode` and `MONOMAKH_UA` are aliases for the same font file and must both remain defined — the book CSS uses `Monomakh_Unicode` for bookmark labels and `MONOMAKH_UA` for Ukrainian body text.

**`Landing.jsx`** exists in `src/components/landing/` but is **not currently rendered**.

**Particle seeding:** `Particles.jsx` uses a deterministic `pseudoRandom(seed)` function so particle positions are stable across re-renders. Adding new particles requires extending the seed offset series to avoid collisions.

**Book open sequence:** clicking the cover triggers `runOpenSequence`, which uses three sequential `setTimeout` calls to animate belts fading, the book shifting right (`preOpenShift`), then calling `pageFlip.flipNext()`. The `hasAutoOpenedRef` guard ensures auto-open (via `shouldOpen` prop) only fires once per mount.
