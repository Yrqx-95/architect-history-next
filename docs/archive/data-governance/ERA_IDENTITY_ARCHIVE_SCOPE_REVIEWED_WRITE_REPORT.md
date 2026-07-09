# Era Identity Archive Scope Reviewed Write Report

Generated: 2026-07-09

## Scope

- Applied two reviewed archive-scope identity and era cleanup records.
- Supabase migration: `normalize_archive_scope_identity_era_slugs`.
- Local migration file: `db/migrations/v22-normalize-archive-scope-identity-era-slugs.sql`.
- These records were not conventional buildings, but the current `building_types` taxonomy already supports `transportation` and `public-space`, so they can remain as boundary built-environment records rather than malformed Q-id records.

## Decisions

| Wikidata | Previous slug | New slug | New name | Type | City | Country | Era |
|---|---|---|---|---|---|---|---|
| Q127587635 | untitled | jc-decaux-bus-shelter-aachen | JC Decaux Bus Shelter, Aachen | transportation | Aachen | Germany / DE | postmodern |
| Q136394553 | q136394553 | fontana-di-piazzale-della-pace-parma | Fontana di Piazzale della Pace (Parma) | public-space | Parma | Italy / IT | contemporary |

## Why These Were Kept

- `JC Decaux Bus Shelter, Aachen` is documented by Eisenman Architects as a 1996 bus shelter / street-furniture project in Aachen. It is not a conventional building, but it fits the existing `transportation` type better than deletion.
- `Fontana di Piazzale della Pace (Parma)` is a reflecting-pool / fountain record tied to Mario Botta's public-space redesign of Piazzale della Pace. It is not a building, but it fits the existing `public-space` type.
- Both records had existing image rows, so deleting them would discard media and break visible archive material.
- Target slugs had no collisions before write.

## Supabase Verification

- Supabase v22 migration applied: `normalize_archive_scope_identity_era_slugs`.
- Written records:
  - `jc-decaux-bus-shelter-aachen`: `transportation`, `postmodern`, matching `building_eras` row present.
  - `fontana-di-piazzale-della-pace-parma`: `public-space`, `contemporary`, matching `building_eras` row present.
- `buildings.era_slug`: 422 filled, 453 missing, 875 total.
- `building_eras`: 422 rows.

## Queue Impact

- `data:review-era-identity`: 0 candidates remain.
- `data:review-era-year-unique`: 9 candidates remain.
- `data:plan-eras`: 343 `missing-year`, 101 `year-overlap`, 9 `year-unique`.
- `data:audit`: 0 errors, 860 warnings, 2490 info, 3350 total.
- Fixed the identity review script so an empty candidate set exits cleanly instead of calling Wikidata with no IDs.

## Remaining Risk

- These two records are intentionally retained as boundary built-environment works, not reclassified as ordinary architecture.
- `postmodern` for the Eisenman bus shelter is a chronological era assignment; the work may be better described stylistically through deconstructivist / public-art language if the style taxonomy is expanded later.
- The remaining `postmodern-style-holdout` records still need vocabulary review before any automatic era assignment.

## Source Links

- https://eisenmanarchitects.com/JC-Decaux-Bus-Shelter-1996
- https://nrw-skulptur.net/en/skulptur/ohne-titel-17/
- https://commons.wikimedia.org/wiki/Category:Frittezang
- https://commons.wikimedia.org/wiki/Category:Fontana_di_Piazzale_della_Pace_(Parma)
- https://it.wikipedia.org/wiki/Piazzale_della_Pace
- https://it.wikipedia.org/wiki/Chiesa_di_San_Pietro_Martire_(Parma)
