# Duplicate Primary Image Review 002

Status: reviewed, applied and write-verified

Reviewed: 2026-07-13

## Scope and decision

The first five remaining P0 Commons-vs-Unsplash conflicts were visually and legally reviewed. Three are approved for guarded migration; two remain unchanged.

| Building | Decision | Reason |
|---|---|---|
| `centro-commerciale-le-torri` | Defer | The file identifies Mario Botta's Florence shopping center, but the modern work is in Italy and the photographic license does not resolve the freedom-of-panorama risk. |
| `club-house-du-golf-de-beauvallon` | Defer | The historical photo identifies the clubhouse, but its anonymous French public-domain claim lacks a clear United States basis. |
| `cohen-house` | Keep Commons; demote Unsplash | The Commons facade matches Historic England's 64 Old Church Street description; the Unsplash image is an unrelated building. |
| `corona-avenue-school` | Keep Commons; demote Unsplash | The 1941 federal guide page labels and shows Neutra's experimental school; the Unsplash image is an unrelated concrete interior. |
| `dymaxion-house` | Keep Commons; demote Unsplash | The FSA/LOC photograph is the Dymaxion House interior; the Unsplash image is an unrelated room. Correct the retained row from `exterior` to `interior`. |

## Evidence

Identity was checked against Historic England's statutory listing for 64 Old Church Street, the Getty's Corona Avenue School history, and the Library of Congress FSA record for the Dymaxion House. Commons file identity, photographer, license and current asset URLs were rechecked through `imageinfo` and `extmetadata` on 2026-07-13.

The two deferrals are deliberate. They must not be reopened without stronger license evidence; visual identity alone is insufficient.

Machine-readable decision: `db/review-decisions/duplicate-primary-image-review-002.json`

## Execution

The migration passed an isolated PostgreSQL 18.3 dry-run with replay refusal and two complete forward/rollback cycles. A fresh production precheck then matched all six reviewed rows, all three building identities and all six prior primary flags.

Production migration `20260713132011 duplicate_primary_image_review_002` applied successfully. Write verification found exactly one Commons primary for each approved building, normalized all three retained thumbnails, and corrected the Dymaxion photograph to `interior`. The Supabase advisor baseline remains 13 security and 27 performance notices.
