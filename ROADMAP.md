# Archistory Roadmap

Last updated: 2026-07-13

Goal: make the project converge into a stable product repository.

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
