# Archistory Roadmap

Last updated: 2026-07-15

Goal: make the project converge into a stable product repository.

## Current Execution Order

1. **Repository status synchronization** — the production baseline after PR #165 is now recorded in the current status documents.
2. **Read-only worktree governance** — inspect ownership and branch state before opening another writer lane; do not append work to the merged PR #165 branch.
3. **Top 50 small batch** — the queue already contains 25 `trust-repair` and 25 `product-core` records. Execute a reviewed batch of 5–10; do not rebuild the queue.
4. **One learning path** — choose and productize one V1 learning path only after the first three steps remain stable.

Completed checkpoint: PR #165 is merged and released on Cloudflare. Its homepage semantic order is Hero → entry → featured → stats → architects at every breakpoint, with one statistics DOM block. Graduation G6–G10 are complete and should not be reopened without new evidence.

## P0

1. **Repository cleanup**
   - Keep product docs at root.
   - Keep historical reports under `docs/archive/`.
   - Remove or ignore generated/local artifacts only after confirmation.

2. **Content trust baseline**
   - The unified P0 baseline and 25/25 Top 50 queue are recorded in `docs/CONTENT_TRUST_NEXT_PHASE_P0.md`.
   - Start with the eight-record read-only candidate batch; do not write content until identity, source, current image, photographer, and license are reviewed.
   - Keep source metadata, source text, display fallback, and translation gaps as separate metrics.

3. **Image authority decision**
   - Document current image source priority.
   - Decide the long-term authority before storage migration.

4. **Search reliability**
   - Keep current search stable.
   - Add targeted tests before moving search ranking into database indexes.

5. **Release hygiene**
   - Keep `data:audit`, `typecheck`, `build`, and tests as release gates.
   - Group future commits by production code, data governance, docs, and generated artifacts.
   - PR #165 is complete: merge commit `fb9a6f17fe7fbc904ee122b0d8db9fff08290381`; Reviewed production release `29349915435` passed.

## P1

1. Productize only one V1 learning layer.
2. Add a small building-page learning slot after V1 content is stable.
3. Continue relation query pushdown on high-traffic pages.
4. Document script lifecycles and ownership.
5. Keep docs indexed and archived.

## P2

1. Database-backed search indexes.
2. Object storage migration for curated images.
3. Minimal CMS/admin planning.
4. Component directory reorganization.
5. Interactive learning V2.

## Not In Scope Now

- New learning experiments
- New taxonomy
- Full redesign
- CMS implementation
- Bulk image migration
- Broad refactor
- Reopening Graduation G6–G10 without new evidence
