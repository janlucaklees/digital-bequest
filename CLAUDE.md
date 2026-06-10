# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn start          # dev server (Vite HMR)
yarn build          # production build → ./docs (served via GitHub Pages)
yarn preview        # preview production build locally
yarn test           # run Jest in watch mode
yarn test --watchAll=false  # run Jest once (CI-style)
yarn check          # svelte-check TypeScript diagnostics
```

To run a single test file: `yarn test src/lib/message-functions.test.ts`

## Architecture

**Digital Bequest** is a fully client-side Svelte + Vite SPA that helps users encrypt personal credentials into a QR code printed on a PDF, to be left for loved ones after death.

**Routing** — There is no router. `App.svelte` checks `?c=` in the URL query string at load time: if present, it renders the `Decode` view; otherwise it renders the `Encode` view.

**Encode flow** (`Encode.svelte`): user fills in a plain-text message, credentials to encrypt, and a password → `encodeMessage()` (AES via crypto-js) runs reactively → the result is embedded as `?c=<cipher>` in a URL → a `Page.svelte` preview renders an A4-layout page with the message and a QR code pointing to that URL → `html2pdf.js` exports it to PDF.

**Decode flow** (`Decode.svelte`): receives the `cipher` prop from `App.svelte` → user enters password → `decodeMessage()` decrypts reactively and displays the credentials.

**`src/lib/message-functions.ts`** — the only pure-logic module; the only file covered by unit tests. Backward-compatibility of the cipher format is enforced by a hardcoded golden-value test.

**i18n** (`src/i18n.ts`) — i18next with `HttpBackend` (loads from `/digital-bequest/lang/{{lng}}.json`) and `LanguageDetector` (querystring `locale` → localStorage → navigator). Translation files live in `public/lang/`. The base path `/digital-bequest/` is baked into both Vite config and the i18n backend path.

**Styling** — Milligram CSS as a base, SCSS for custom styles (`src/main.scss`, `src/scss/`). Print layout is handled by `src/scss/print.scss` and the `.hide-on-print` / `.dont-interfere-on-print` utility classes.

**Build output** — Vite builds to `./docs/` so the repo can be served directly as a GitHub Pages site from the `master` branch `/docs` folder.

**Tests** — Jest + ts-jest, no Svelte component tests. Only `src/lib/message-functions.test.ts` exists. The test suite must stay backward-compatible with existing cipher values (see the golden-value test).
