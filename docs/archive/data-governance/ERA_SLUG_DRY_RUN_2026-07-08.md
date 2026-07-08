# Era Slug Dry-Run Summary

Generated: 2026-07-08

## Purpose

Create a repeatable read-only plan for the remaining `buildings.era_slug` gap after the high-confidence baseline write.

This is intentionally not a production write batch. The goal is to separate safe next candidates from records that need real review.

## Script

- `npm run data:plan-eras`
- Source file: `scripts/plan-era-slugs.ts`
- Generated local outputs:
  - `reports/era-slug-dry-run.md`
  - `reports/era-slug-dry-run.json`

## Current Result

| Bucket | Count |
|---|---:|
| already assigned | 32 |
| missing era_slug | 843 |
| year-unique candidates | 399 |
| year-overlap candidates | 101 |
| missing-year candidates | 343 |

## Year-Unique Distribution

| era_slug | Count |
|---|---:|
| contemporary | 127 |
| post-war | 104 |
| postmodern | 99 |
| modern | 38 |
| early-modern | 21 |
| industrial-revolution | 5 |
| neoclassical | 3 |
| renaissance | 2 |

## Overlap Distribution

| Candidate eras | Count |
|---|---:|
| modern + post-war | 83 |
| postmodern + contemporary | 8 |
| early-modern + modern | 3 |
| post-war + postmodern | 3 |
| industrial-revolution + art-nouveau | 2 |
| art-nouveau + early-modern | 1 |
| industrial-revolution + art-nouveau + early-modern | 1 |

## Recommendation

- Next write batch should start from `year-unique` only.
- Do not write `year-overlap`, `missing-year`, or `outside-taxonomy` automatically.
- Before writing the 399 `year-unique` records, add a small exclusion list for historically ambiguous works and boundary-year cases.
