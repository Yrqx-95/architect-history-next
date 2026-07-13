# Duplicate Primary Image Audit — 2026-07-13

Status: read-only review required

Production writes: none

Safe auto-apply candidates: **0**

## Result

- 1433 rows currently have `is_primary=true` across 942 buildings.
- 487 buildings have more than one primary row; 4 have three.
- 487 are Commons vs Unsplash conflicts.
- 0 are Commons vs Commons conflicts.
- 0 candidate rows are missing photographer, license or source URL.
- 215 unshielded buildings currently resolve to Unsplash while a Commons candidate also exists.
- 130 unshielded buildings already resolve to Commons but still violate the one-primary invariant.
- 142 buildings are currently shielded by a runtime cover override.

## Decision

No row is approved for automatic demotion. Different URLs are different editorial candidates, not mechanical duplicates. Every building requires visual identity and composition review before a guarded write batch can be prepared.

Priority order:

1. **P0** — visible Unsplash with a complete Commons candidate: review the user-visible choice first.
2. **P1** — unshielded invariant conflict: keep current display stable while deciding the canonical primary.
3. **P2** — runtime override shields the conflict: lower immediate product risk, but database cleanup is still required.

## First 25 P0 Review Items

| Building | Primary rows | Current DB choice | Conflict | Review status |
|---|---:|---|---|---|
| `club-house-du-golf-de-beauvallon` | 2 | unsplash | commons-vs-unsplash | needs-visual-identity-review |
| `evry-cathedral` | 2 | unsplash | commons-vs-unsplash | needs-visual-identity-review |
| `fontana-di-piazzale-della-pace-parma` | 2 | unsplash | commons-vs-unsplash | needs-visual-identity-review |
| `gaumont-grand-ecran-italie` | 2 | unsplash | commons-vs-unsplash | needs-visual-identity-review |
| `helsinki-university-of-technology-main` | 2 | unsplash | commons-vs-unsplash | needs-visual-identity-review |
| `hirosaki-city-hall` | 2 | unsplash | commons-vs-unsplash | needs-visual-identity-review |
| `hirosaki-city-museum` | 2 | unsplash | commons-vs-unsplash | needs-visual-identity-review |
| `hiroshima-national-peace-memorial-hall` | 2 | unsplash | commons-vs-unsplash | needs-visual-identity-review |
| `hiroshima-peace-memorial-museum` | 2 | unsplash | commons-vs-unsplash | needs-visual-identity-review |
| `hirshhorn-museum-and-sculpture-garden` | 2 | unsplash | commons-vs-unsplash | needs-visual-identity-review |
| `hiss-residence` | 2 | unsplash | commons-vs-unsplash | needs-visual-identity-review |
| `hochhaus-neue-donau` | 2 | unsplash | commons-vs-unsplash | needs-visual-identity-review |
| `horizon-apartments` | 2 | unsplash | commons-vs-unsplash | needs-visual-identity-review |
| `hotel-marcel` | 2 | unsplash | commons-vs-unsplash | needs-visual-identity-review |
| `hyogo-prefectural-museum-of-history` | 2 | unsplash | commons-vs-unsplash | needs-visual-identity-review |
| `ibm-studios` | 2 | unsplash | commons-vs-unsplash | needs-visual-identity-review |
| `ichimura-memorial-gymnasium` | 2 | unsplash | commons-vs-unsplash | needs-visual-identity-review |
| `inadomi-house` | 2 | unsplash | commons-vs-unsplash | needs-visual-identity-review |
| `interbau` | 2 | unsplash | commons-vs-unsplash | needs-visual-identity-review |
| `international-conference-center-hiroshima` | 2 | unsplash | commons-vs-unsplash | needs-visual-identity-review |
| `international-house-of-japan` | 2 | unsplash | commons-vs-unsplash | needs-visual-identity-review |
| `italie-deux` | 2 | unsplash | commons-vs-unsplash | needs-visual-identity-review |
| `jewett-arts-center` | 2 | unsplash | commons-vs-unsplash | needs-visual-identity-review |
| `john-and-alice-fullam-house` | 2 | unsplash | commons-vs-unsplash | needs-visual-identity-review |
| `kagawa-prefectural-government-office` | 2 | unsplash | commons-vs-unsplash | needs-visual-identity-review |

## Commons vs Commons



## Required Write Gate

Read-only inspection → formal keep/demote decision → source and license recheck → isolated PostgreSQL dry-run → conflict precheck → guarded production migration → write verification → PR → reviewed production release → live verification.

Machine-readable evidence:

- `reports/duplicate-primary-image-audit.json`
- `db/review-queues/duplicate-primary-image-review-001.json`
