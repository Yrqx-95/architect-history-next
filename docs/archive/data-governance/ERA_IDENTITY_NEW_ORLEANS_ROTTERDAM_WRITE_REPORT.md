# Era Identity New Orleans Rotterdam Write Report

Generated: 2026-07-09

## Scope

- Applied one high-confidence identity and era cleanup record from `ERA_IDENTITY_CLEANUP_REVIEW.md`.
- Supabase migration: `normalize_new_orleans_rotterdam_identity_era`.
- Local migration file: `db/migrations/v19-normalize-new-orleans-rotterdam-identity-era.sql`.

## Decision

| Wikidata | Previous slug | New slug | New name | City | Country | Era |
|---|---|---|---|---|---|---|
| Q2522995 | new-orleans | new-orleans-rotterdam | New Orleans (Rotterdam) | Rotterdam | Netherlands / NL | contemporary |

## Why This Was Safe

- Wikidata identifies Q2522995 as a residential skyscraper in Rotterdam, Netherlands.
- The previous record used `New Orleans` with `country_code = BE`, which made it read like a place/name error.
- `new-orleans-rotterdam` had no slug collision before write.
- The 2007 `year_start` fits exactly one current era range: `contemporary`.

## Supabase Verification

- Record after write:
  - `slug`: `new-orleans-rotterdam`
  - `name_en`: `New Orleans (Rotterdam)`
  - `city`: `Rotterdam`
  - `country`: `Netherlands`
  - `country_code`: `NL`
  - `era_slug`: `contemporary`
  - matching `building_eras` row: present
- `buildings.era_slug`: 409 filled, 466 missing, 875 total.
- `building_eras`: 409 rows.

## Queue Impact

- `data:review-era-identity`: 13 candidates remain.
- `data:review-era-year-unique`: 22 candidates remain.
- `data:plan-eras`: 343 `missing-year`, 101 `year-overlap`, 22 `year-unique`.

## Remaining Risk

- This write does not solve the other weak identity records.
- Commons-name candidates still need human display-name review before any migration.
- The `untitled` record should go through archive-scope review before assigning era metadata.
