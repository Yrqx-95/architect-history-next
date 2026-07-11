# Image Fill Batch 003 and Stale Image Cleanup Log

- Project: `architect-history`
- Supabase project ID: `usuqjsjluietcnudxwvz`
- Applied at: 2026-07-11 (Asia/Tokyo)

## Reviewed batch

- Queue candidates reviewed: 8 safe-auto candidates plus 6 Commons-search candidates.
- Approved and inserted: 7.
- Held: `kinokuniya-hall` because required creator attribution is missing.
- The 6 Commons-search candidates remained held because exact building identity was not proven.

## Inserted primary images

- `ohara-house`
- `palazzo-brusarosco`
- `niagara-falls-public-library`
- `le-rocher-de-palmer`
- `nuestra-senora-del-libano-montevideo`
- `nara-kintetsu-building`
- `loisium-wine-spa-resort-langenlois`

All seven insertions passed building identity, visual suitability, creator, open-license, source-link, duplicate, and exactly-one-current-primary preconditions.

## Deleted stale images

- Deleted rows: 117.
- Scope: non-primary Unsplash rows attached to the 39 buildings corrected in batches 002 and 003.
- Evidence: every deleted URL was reused across multiple unrelated buildings; minimum reuse was 9 buildings and maximum reuse was 152 buildings.
- Safety precondition: all 39 affected buildings had exactly one Wikimedia Commons primary image before deletion.
- Primary images deleted: 0.

## Verification

- Affected buildings with exactly one primary: 39/39.
- Affected buildings with a Commons primary: 39/39.
- Unsplash rows remaining on the affected buildings: 0.
- Total image rows after insert and cleanup: 7,211.
- Wikimedia Commons rows: 4,910.
- Unsplash rows: 2,301.
- Missing license: 0.
- Missing source URL: 0.
- Invalid image URL: 0.

## Remaining risk

- The remaining Unsplash rows outside this verified 39-building scope are still low-confidence and must not be bulk-deleted until each affected building has a trusted replacement.
- Safe-auto candidates not visually verified because of rate limiting remain held.
