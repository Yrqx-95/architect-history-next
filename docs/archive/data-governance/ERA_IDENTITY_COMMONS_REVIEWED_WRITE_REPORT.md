# Era Identity Commons Reviewed Write Report

Generated: 2026-07-09

## Scope

- Applied three reviewed Commons-backed identity and era cleanup records.
- Supabase migration: `normalize_commons_identity_era_slugs`.
- Local migration file: `db/migrations/v20-normalize-commons-identity-era-slugs.sql`.
- Excluded `Q136394553` / `Fontana di Piazzale della Pace (Parma)` because Wikidata classifies it as a reflecting pool, so it needs archive-scope review before any era assignment.

## Decisions

| Wikidata | Previous slug | New slug | New name | Type | City | Country | Era |
|---|---|---|---|---|---|---|---|
| Q125679342 | q125679342 | kantoorgebouw-het-oosten | Kantoorgebouw Het Oosten | office | Amsterdam | Netherlands / NL | postmodern |
| Q134893563 | q134893563 | terracos-de-braganca | Terraços de Bragança | residential | Lisbon | Portugal / PT | contemporary |
| Q118539028 | q118539028 | capela-do-monte | Capela do Monte | religious | Bensafrim e Barão de São João | Portugal / PT | contemporary |

## Why These Were Safe

- Each record had a stable Wikidata ID, Commons category name, building-like Wikidata instance type, architect, country, and year.
- Target slugs had no collisions before write.
- `Kantoorgebouw Het Oosten` is an office building by Steven Holl, year_start 1998, matching `postmodern`.
- `Terraços de Bragança` is a housing estate by Álvaro Siza, year_start 2004, matching `contemporary`.
- `Capela do Monte` is a chapel by Álvaro Siza, year_start 2018, matching `contemporary`.

## Supabase Verification

- Written records:
  - `kantoorgebouw-het-oosten`: `office`, `postmodern`, matching `building_eras` row present.
  - `terracos-de-braganca`: `residential`, `contemporary`, matching `building_eras` row present.
  - `capela-do-monte`: `religious`, `contemporary`, matching `building_eras` row present.
- `buildings.era_slug`: 412 filled, 463 missing, 875 total.
- `building_eras`: 412 rows.

## Queue Impact

- `data:review-era-identity`: 10 candidates remain.
- `data:review-era-year-unique`: 19 candidates remain.
- `data:plan-eras`: 343 `missing-year`, 101 `year-overlap`, 19 `year-unique`.
- `data:audit`: 0 errors, 882 warnings, 2490 info, 3372 total.

## Remaining Risk

- The remaining 8 manual-name records need real naming work, not era batching.
- The 2 archive-scope records should not receive era metadata until deciding whether they belong in `buildings`.
