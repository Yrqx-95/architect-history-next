# Duplicate Primary Image Review 003

Status: reviewed, applied and write-verified

Reviewed: 2026-07-13

## Decision

Five P0 Commons-vs-Unsplash conflicts were reviewed. Emerson Middle School and Esbjerg Performing Arts Centre are approved. Évry Cathedral, Fontana di Piazzale della Pace and the Former Tokyo Metropolitan Government Building remain unchanged because their publicly verifiable rights or composition evidence is insufficient.

| Building | Decision | Reason |
|---|---|---|
| `emerson-middle-school` | Keep Commons; demote Unsplash | Signed school facade versus unrelated concrete interior. |
| `esbjerg-performing-arts-centre` | Keep Commons; demote Unsplash | Exact Musikhuset panorama versus unrelated aerial roof. |
| `evry-cathedral` | Defer | VRT confirms a license, but its public scope does not establish the architectural rights. |
| `fontana-di-piazzale-della-pace-parma` | Defer | The image depicts Palazzo della Pilotta; the fountain is not legible. |
| `former-tokyo-metropolitan-government-building` | Defer | The foreground sculpture's globally reusable rights were not separately established. |

Machine-readable decision: `db/review-decisions/duplicate-primary-image-review-003.json`

## Execution

The migration passed an isolated PostgreSQL 18.3 dry-run with replay refusal and two forward/rollback cycles. The fresh production precheck matched all four reviewed rows, both building identities and all four prior primary flags.

Production migration `20260713134754 duplicate_primary_image_review_003` applied successfully. Write verification found exactly one Commons primary for each approved building and normalized both retained thumbnails. Supabase advisors report 13 security and 26 performance notices, with no new notice introduced.
