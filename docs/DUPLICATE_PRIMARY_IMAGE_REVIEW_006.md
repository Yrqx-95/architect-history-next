# Duplicate Primary Image Review 006

Status: reviewed, applied and verified in production

Reviewed: 2026-07-14

## Decision

Five previously unreviewed conflicts were inspected visually and checked against authoritative identity and copyright sources. All five Commons rows are approved; all five Unsplash rows are unrelated to the target architecture.

| Building | Decision |
|---|---|
| `helsinki-university-of-technology-main` | Keep exact Aalto University Commons view; demote generic brick texture. |
| `hirosaki-city-hall` | Keep illuminated city hall courtyard; demote Hawaiian temple. |
| `hirosaki-city-museum` | Keep signed museum facade; demote unrelated concrete stair. |
| `hiroshima-national-peace-memorial-hall` | Keep exact memorial entrance; demote Hawaiian temple. |
| `hiroshima-peace-memorial-museum` | Keep exact museum facade; demote unrelated interior. |

Machine-readable decision: `db/review-decisions/duplicate-primary-image-review-006.json`

## Execution

- The migration and guarded rollback passed two complete forward/rollback cycles in isolated PostgreSQL 18.3. Replay refusal, unexpected-primary refusal and exact ten-row rollback were also verified.
- The fresh production conflict precheck matched all five building identities, all ten reviewed image rows and exactly ten current primary rows; no unexpected primary row existed.
- Supabase applied production migration `20260713153349_duplicate_primary_image_review_006`.
- Write verification matched all ten post-write states: five reviewed Commons images are primary with 500 px thumbnails, and five unrelated Unsplash images are non-primary.
- The immediate production audit reports 1,428 primary rows, 482 duplicate-primary buildings, 968 rows within those conflicts, 942 buildings with a primary image and zero buildings without one.
- Supabase advisor baseline remains 13 security notices and 26 performance notices; this data-only migration introduced no new advisor item.
