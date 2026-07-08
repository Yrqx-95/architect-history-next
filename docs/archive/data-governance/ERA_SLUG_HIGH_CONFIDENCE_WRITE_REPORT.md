# Era Slug High-Confidence Write Report

Generated: 2026-07-08

## Purpose

Close the safest part of the `buildings.era_slug` gap without pretending the full era taxonomy is solved.

The production database had 875 buildings and all 875 were missing `era_slug`. This pass writes only the reviewed high-confidence baseline:

- 29 buildings inferred from unambiguous style tags.
- 3 buildings carried forward as explicit manual-review exceptions from `ERA_ASSIGNMENT_STRATEGY.md`.
- 843 buildings intentionally left for later year-range and manual review work.

## Migration

- `db/migrations/v15-normalize-high-confidence-era-slugs.sql`

The migration is idempotent:

- It updates `public.buildings.era_slug` only when the field is still `NULL`.
- It inserts matching `public.building_eras` rows with `ON CONFLICT DO NOTHING`.
- It does not create new eras.

## Target Distribution

| era_slug | Count |
|---|---:|
| renaissance | 13 |
| baroque | 7 |
| art-nouveau | 6 |
| classical-era | 5 |
| postmodern | 1 |

## Manual Exceptions

| Building | Decision | Reason |
|---|---|---|
| `hampton-court` | `classical-era` | Reviewed strategy decision despite both `english-baroque` and `classical` style tags. |
| `st-pauls-cathedral` | `classical-era` | Reviewed strategy decision despite both `english-baroque` and `classical` style tags. |
| `st-peters-dome` | `renaissance` | Reviewed strategy decision despite both `renaissance` and `baroque` style tags. |

## Verification

- Applied to production Supabase project `usuqjsjluietcnudxwvz` as migration `20260708151701 normalize_high_confidence_era_slugs`.
- Verified `buildings.era_slug`: 32 populated, 843 still missing, 875 total buildings.
- Verified `building_eras`: 32 rows.
- Verified distribution: `renaissance` 13, `baroque` 7, `art-nouveau` 6, `classical-era` 5, `postmodern` 1.
- Ran `npm run data:audit`: 0 errors, 1265 warnings, 2490 info, 3755 total issues.

## Remaining Work

- Medium-confidence year-range assignment should be handled in a separate batch.
- Manual or historically ambiguous works should stay out of automatic writes until reviewed.
- `building_eras` is now suitable as a relation table baseline, but the app currently reads `buildings.era_slug` first.
