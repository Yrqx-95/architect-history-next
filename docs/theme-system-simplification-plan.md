# Theme System Simplification Plan

Goal: plan a later migration to system-theme-only dark mode. This document does not implement changes.

## Current files to analyze later

- `src/app/[lang]/layout.tsx`: inline theme initialization and `SystemThemeSync` usage.
- `src/app/globals.css`: color tokens, dark selectors, color-scheme behavior, homepage sections.
- `src/components/MobileNav.tsx`: settings area and language/script controls.
- `src/components/ThemeToggle.tsx`: currently deleted in the worktree, but confirm no remaining imports before cleanup.
- `src/components/SystemThemeSync.tsx`: system preference sync behavior.

## Target behavior

- Remove manual theme selector.
- Remove localStorage theme state.
- Follow `prefers-color-scheme` only.
- Homepage fully follows dark mode; no light-only island.
- Add global `color-scheme: light dark` where appropriate.
- Avoid hydration mismatch by setting the initial class before React hydration.

## Files to modify later

- `src/app/[lang]/layout.tsx`
- `src/app/globals.css`
- `src/components/SystemThemeSync.tsx`
- Any stale imports of `ThemeToggle`
- Any component with hardcoded light backgrounds

## Exact risks

- Hydration mismatch if the server and client disagree on `.dark`.
- Flash of wrong theme before inline script runs.
- Components with hardcoded colors may become low contrast.
- Chinese script settings should not be conflated with theme settings.
- Cached pages may show stale class behavior during deployment.

## Safe migration order

1. Audit all theme-related imports and localStorage keys.
2. Confirm `ThemeToggle` is fully unused.
3. Make `SystemThemeSync` the only client-side theme listener.
4. Add/verify global `color-scheme`.
5. Remove any manual theme UI from settings areas.
6. Test homepage, glossary, code topics, building pages, and mobile nav in both system modes.

## Rollback plan

- Keep the previous theme toggle component recoverable in git history.
- Revert only theme-specific files if contrast or hydration issues appear.
- Keep the inline pre-hydration script until system-only behavior is verified.

## Validation checklist

- No `localStorage.theme` reads/writes remain.
- No `ThemeToggle` imports remain.
- Browser system light/dark switch updates the site without reload.
- Homepage, mobile nav, glossary, and code diagrams remain legible.
- `npm run lint` passes.
- `npm run build` passes.
