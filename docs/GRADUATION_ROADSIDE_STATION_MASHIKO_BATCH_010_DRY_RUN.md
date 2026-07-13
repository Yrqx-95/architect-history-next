# Graduation Roadside Station Mashiko Batch 010 Dry Run

Date: 2026-07-13

## Pack

- 1 new architect: `mount-fuji-architects-studio`
- 1 canonical building: `roadside-station-mashiko`
- 1 primary image
- 1 published CASE-043 profile
- 2 assignments: `transport-hub` primary and `retail` secondary

## Verification

- Full-history isolated PostgreSQL 18.3 forward passed.
- Injected external curated-image relation correctly blocked rollback.
- Exact rollback, replay and second rollback passed.
- Production read-only baseline: 80 profiles / 934 buildings / 7283 images / 138 assignments.
- Expected post-write totals: 81 / 935 / 7284 / 140.

## Gate

- Production has not been written.
- Before production apply, repeat architect/building/image/profile/assignment conflict checks and confirm both functions and the transportation type remain active.
