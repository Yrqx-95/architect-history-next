# Architect History Next

Archistory is a multilingual architecture archive built with Next.js and Supabase. It presents buildings, architects, styles, eras, search, image attribution, and learning entry points in Chinese, English, and Japanese.

## Operating Protocol

Before making non-trivial changes, read:

1. `STATUS.md`
2. `DOCUMENT_INDEX.md`
3. `docs/PROJECT_OPERATING_SYSTEM.md`
4. `docs/WORKLOG.md`

The operating protocol defines source-of-truth rules, validation levels, logging, rollback scope, and AI/human maintenance behavior.

## Stack

- Next.js App Router
- React
- TypeScript
- Supabase
- Vitest
- Playwright

## Local Setup

Create `.env.local` with the required Supabase values:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Install and run:

```bash
npm install
npm run dev
```

The development server defaults to `http://localhost:3000`.

## Scripts

Common checks:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

Common governance scripts:

```bash
npm run data:audit
npm run data:normalize-types
npm run data:normalize-styles
npm run graduation:audit
```

See `SCRIPT_REGISTRY.md` for the full script list, ownership, and lifecycle.

## Data Governance

The project keeps the current recoverable database baseline and reviewed data migrations in `db/migrations/`.

Run `npm run data:audit` after core data changes. Run `npm run graduation:audit` after graduation content or image-manifest changes. Generated reports belong in `reports/`.

## Engineering Notes

- Do not use unchecked `process.env.X!`; centralize environment validation before creating clients.
- Keep `src/lib/types.ts` type-only. Display, locale, and taxonomy helpers live in dedicated modules.
- Treat image source, license, and attribution fields as part of content quality, not optional decoration.
- Avoid large UI rewrites while data audit errors remain.
