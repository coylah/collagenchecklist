
# The Collagen Checklist™ — Build Plan

A mobile-first daily habit tracker. No backend, no login, no AI — Local Storage only. Saved to home screen and opened daily.

## Design system

- **Palette**: ~80% white, 15% bold rose pink (accent only — buttons, progress bar, ticks, small highlights), 5% soft baby pink (subtle cards/dividers only). All typography black. No large coloured blocks.
- **Type**: distinctive editorial pairing — display serif (e.g. *Fraunces* or *Cormorant Garamond*) for headlines, refined sans (e.g. *Inter Tight* or *DM Sans*) for body. Loaded via `<link>` in `__root.tsx`. Generous tracking on display.
- **Feel**: luxury beauty editorial — rounded cards, soft shadows, lots of white space, restrained motion. Not clinical, not wellness-cliché.
- Tokens defined in `src/styles.css` (`@theme`) as oklch: `--color-rose`, `--color-baby-pink`, plus shadcn tokens. Existing components restyled via tokens — no hardcoded colours.

## Routing (TanStack Start, mobile-first)

Three screens, file-based routes under `src/routes/`:

- `src/routes/__root.tsx` — head metadata, PWA manifest link, fonts, theme-color, apple-touch-icon, bottom nav rendered for non-welcome routes.
- `src/routes/index.tsx` — gate: on mount, read `cc:welcomed` from Local Storage. If false → render Welcome (Screen 1). If true → `<Navigate to="/today" />`.
- `src/routes/today.tsx` — Screen 2 (checklist).
- `src/routes/wins.tsx` — Screen 3 (Glow Wins).
- `src/routes/save.tsx` — Save to Phone instructions (reuses Screen 1's install block).

Bottom nav (3 tabs): Today · Glow Wins · Save to Phone. Hidden on the welcome screen.

## Screen 1 — Welcome (first visit only)

- Exact copy from spec (headline, subheading, body, install instructions for iPhone + Android, "Don't panic" note).
- Primary button **"I've saved it. Start today's checklist."** → sets `cc:welcomed = true`, navigates to `/today`.
- Text link **"Skip for now"** → same effect.

## Screen 2 — Today's Checklist

- Headline + one daily supportive message chosen deterministically from the 10 supplied lines using day-of-year index (so it's stable for the whole day, fresh tomorrow).
- Live counter `X of 20 completed today` + horizontal progress bar (rose pink fill, smooth width transition).
- 5 sections, 20 habits total, exactly as specified (Hydration 3, Collagen Food Day 5, Skincare 5, Movement & Mind 4, Soul 3). Each section has its intro and per-item helper/example text rendered in a collapsible "examples" affordance where examples exist.
- Row interaction: tap toggles tick. On tick — animated check (scale + ease), row fades to ~55% opacity, label strike-through, progress bar updates instantly.
- **Bottom buttons**:
  - Primary: **Show Today's Glow Wins** → `/wins`.
  - Secondary: **Start New Day** → confirm dialog ("Ready for a fresh day? This clears today's checklist.") → clears today's state.
- Daily auto-reset: on mount, compare stored `cc:date` (local YYYY-MM-DD) with today; if different, clear ticks and update date.

## Screen 3 — Glow Wins

- "You completed X of 20 habits today."
- Score band (0–5, 6–10, 11–15, 16–20) → headline + Coylah note from spec.
- Section breakdown list (Hydration X/3 etc.).
- **What you nailed today** — highest scoring section, short personalised line per section.
- **Tomorrow's easiest win** — lowest scoring section using the tie-break order (Hydration → Collagen Food Day → Skincare → Movement & Mind → Soul), using the exact response copy from spec.
- Zero-section special prefix: if the lowest section scored 0, prepend the acknowledgement line (e.g. "Hydration looked like it got away from you today…").
- 20/20 celebration card (exact copy) replaces the standard wins layout when score = 20.
- Buttons: **Back to Checklist**, **Start New Day** (same confirm flow).

## Data model (Local Storage)

Single key `cc:state` (JSON):

```ts
{
  welcomed: boolean,
  date: "YYYY-MM-DD",          // local date of current checklist
  ticks: Record<habitId, boolean>
}
```

- `habitId` is a stable slug per habit, grouped by section in a `HABITS` constant (single source of truth for IDs, labels, helpers, examples, section).
- A tiny `useChecklist()` hook wraps read/write, daily-rollover check, derived counts (total, perSection, highest, lowest with tie-break), and exposes `toggle(id)`, `resetToday()`, `markWelcomed()`.

## PWA / Save to Home Screen

- `public/manifest.webmanifest` with name "The Collagen Checklist", short_name "Collagen", `display: standalone`, theme/background white, rose-pink accent, icons (192, 512, maskable, apple-touch).
- `__root.tsx` head: manifest link, theme-color, apple-mobile-web-app-capable, apple-touch-icon, viewport.
- **Manifest-only** (no service worker — spec doesn't require offline). Per PWA skill, do not introduce vite-plugin-pwa for home-screen-only support.
- App icon generated as a premium mark (small wordmark / monogram on white with rose accent).

## Tone & copy

All copy lifted verbatim from the spec (British English, Coylah voice). No additional marketing, no upsells, no analytics, no email capture.

## Technical details

- Stack as-is: TanStack Start + React 19 + Tailwind v4 + shadcn. No new deps required beyond what's installed.
- Mobile-first layout: max-width container (~`max-w-md`) centred, comfortable padding, sticky bottom nav.
- Animation via small CSS transitions (no framer-motion needed for this scope; can add if a richer tick animation is wanted).
- Accessibility: each habit row is a `<button>` with `aria-pressed`, visible focus ring in rose, semantic headings per section.
- Set preview viewport to mobile during build for accurate review.

## File list

- `src/styles.css` — add rose + baby-pink tokens, font families.
- `src/routes/__root.tsx` — fonts, manifest, theme-color, bottom nav frame.
- `src/routes/index.tsx` — welcome gate + Screen 1 content.
- `src/routes/today.tsx` — Screen 2.
- `src/routes/wins.tsx` — Screen 3.
- `src/routes/save.tsx` — install instructions.
- `src/lib/habits.ts` — HABITS constant, daily messages, score-band copy, tomorrow-win copy.
- `src/lib/useChecklist.ts` — Local Storage hook + derived state.
- `src/components/BottomNav.tsx`, `HabitRow.tsx`, `ProgressBar.tsx`, `ResetDialog.tsx`.
- `public/manifest.webmanifest` + generated icon(s) in `src/assets/` (referenced from `public/`).

Ready to build on approval.
