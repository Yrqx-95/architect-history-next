# Engineering Audit

Date: 2026-06-08

## Scope

This audit focused on engineering foundations only. No feature was added intentionally, and the homepage UI structure/classes were kept stable while copy and data preparation were separated from rendering.

## Severe Issues Found

1. `README.md` still contained the default create-next-app text, so project setup, data scripts, and migration state were not documented.
2. `package.json` was missing a dedicated `typecheck` script, making TypeScript verification less explicit in routine checks.
3. `src/lib/types.ts` mixed schema types with runtime display, locale, and taxonomy helper logic, making shared contracts harder to maintain safely.
4. `src/app/[lang]/page.tsx` mixed three-language homepage copy, data selection, and JSX rendering in one large module.
5. `db/migrations` contains v4 and v5 files, but no local `v6*` migration file or reliable Supabase migration-history evidence was found in the repository.
6. `npm run data:audit` still reports data-layer errors, all currently concentrated in `style_slugs`.

## Fixed In This Pass

1. Replaced `README.md` with project-specific setup, scripts, data governance notes, and migration status.
2. Added `npm run typecheck` as `tsc --noEmit`.
3. Confirmed these npm scripts are present:
   - `test`
   - `data:audit`
   - `data:normalize-types`
   - `data:normalize-styles`
4. Confirmed these data governance scripts exist and are connected:
   - `scripts/audit-data.ts`
   - `scripts/normalize-type-slugs.ts`
   - `scripts/normalize-style-slugs.ts`
5. Split `src/lib/types.ts` into:
   - `src/lib/types.ts`: types only
   - `src/lib/display.ts`: display helpers
   - `src/lib/locale.ts`: locale/text-safety helpers
   - `src/lib/taxonomy-display.ts`: taxonomy display map and display helper
6. Split homepage responsibilities into:
   - `src/app/[lang]/home-copy.ts`: multilingual homepage copy
   - `src/app/[lang]/home-data.ts`: homepage data preparation
   - `src/app/[lang]/page.tsx`: component rendering
7. Rechecked environment usage for unsafe `process.env.X!` patterns in `src` and `scripts`; no unchecked non-null env assertions were found.
8. Confirmed migration files present:
   - `db/migrations/v4-building-type-taxonomy-additions.sql`
   - `db/migrations/v5-normalize-style-slugs.sql`

## Verification

Passed:

```bash
npm run lint
npm run typecheck
npm run build
npm test
```

`npm run data:audit` ran and generated:

- `reports/data-audit.json`
- `reports/data-audit.md`

It exits non-zero because data audit errors remain:

```text
total issues: 4975
error: 22
warning: 2463
info: 2490
```

Current error field:

```text
style_slugs: 22
```

## Remaining Risks

1. `v6` migration is not present locally. I did not fabricate a migration file without evidence of its executed database contents. Next step should be to inspect Supabase migration history from an admin channel or recover the exact SQL from deployment records before adding `v6`.
2. `data:audit` still fails by design because 22 `style_slugs` errors remain. These should be handled through the planned B/C style taxonomy review, not automatic similarity writes.
3. The audit also reports many warning/info items for missing or weak data fields. They are not blocking errors, but they still affect content quality and should be prioritized after error count reaches zero.
4. Playwright passed, but the test web server logged `Internal: NoFallbackError` during 404 route checks. It did not fail tests, but should be monitored if 404 behavior changes.
5. The worktree contains many pre-existing modified/untracked files unrelated to this pass. They were not reverted.

## Recommended Next Step

Resolve the remaining 22 `style_slugs` errors through explicit style taxonomy decisions, then rerun:

```bash
npm run data:audit
npm run lint
npm run typecheck
npm run build
npm test
```
