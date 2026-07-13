# Duplicate Primary Image Review 004

Status: reviewed, applied and write-verified

Reviewed: 2026-07-13

## Decision

Five P0 conflicts were reviewed. Four buildings are approved. Gaumont Grand Écran Italie remains unchanged because the photograph license does not establish reusable rights for the protected modern French architecture and interior.

| Building | Decision | Reason |
|---|---|---|
| `foundation-e-g-buhrle-collection` | Promote existing Commons row; demote both current primaries | Exact Zollikerstrasse museum villa replaces a collection painting and unrelated modern building. |
| `gipsoteca-canoviana` | Promote existing Commons row; demote both current primaries | Exact Carlo Scarpa extension with direct photographer attribution replaces an unidentifiable interior and assumed-author file. |
| `government-service-center` | Keep Commons; demote Unsplash | Exact Paul Rudolph Boston complex replaces an unrelated white curved building. |
| `hagi-uragami-museum` | Keep Commons; demote Unsplash | Exact signed museum facade replaces a Hawaiian temple. |
| `gaumont-grand-ecran-italie` | Defer | Underlying French architectural and interior rights are not publicly established. |

Machine-readable decision: `db/review-decisions/duplicate-primary-image-review-004.json`

## Execution

The migration passed isolated PostgreSQL 18.3 dry-run, replay refusal, extra-primary guard, two forward/rollback cycles and exact ten-row rollback. The fresh production precheck matched all ten reviewed rows, all four building identities, eight prior primary flags and zero unexpected primary rows.

Production migration `20260713143832 duplicate_primary_image_review_004` applied successfully. Write verification found exactly one reviewed Commons primary for each approved building and normalized all four retained thumbnails. The post-write duplicate-primary audit reports 489 buildings, down from 493, with all 942 buildings still retaining a primary image. Supabase advisors remain at 13 security and 26 performance notices.
