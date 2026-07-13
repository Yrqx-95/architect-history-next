# Duplicate Primary Image Review 005

Status: reviewed, applied and write-verified

Reviewed: 2026-07-14

## Decision

Five P0 conflicts were reviewed. Two buildings are approved and three remain unchanged.

| Building | Decision | Reason |
|---|---|---|
| `centro-commerciale-le-torri` | Keep Commons; demote Unsplash | The named site fountain belongs to the documented Florence complex; the Unsplash facade is unrelated. |
| `former-tokyo-metropolitan-government-building` | Keep Commons; demote Unsplash | Exact former Marunouchi government building replaces a Hawaiian temple. |
| `club-house-du-golf-de-beauvallon` | Defer | Public evidence does not close the underlying French architectural-rights chain. |
| `evry-cathedral` | Defer | The photographer permission is visible, but public evidence does not show that Mario Botta's stated image rights are covered. |
| `fontana-di-piazzale-della-pace-parma` | Defer | The image primarily depicts Palazzo della Pilotta, not the target fountain. |

Machine-readable decision: `db/review-decisions/duplicate-primary-image-review-005.json`

## Execution

The migration passed isolated PostgreSQL 18.3 dry-run, replay refusal, extra-primary guard, two forward/rollback cycles and exact four-row rollback. The fresh production precheck matched all four reviewed rows, both building identities, four prior primary flags and zero unexpected primary rows.

Production migration `20260713150845 duplicate_primary_image_review_005` applied successfully. Write verification found exactly one reviewed Commons primary for each approved building and normalized both retained thumbnails. The post-write duplicate-primary audit reports 487 buildings, down from 489, with all 942 buildings still retaining a primary image. Supabase advisors remain at 13 security and 26 performance notices.
