# 90-Day Roadmap

Generated: 2026-06-10

Goal: make Archistory converge. This roadmap intentionally limits scope to P0/P1/P2 and no more than 15 total tasks.

## P0

1. **Repository Cleanup Without Deleting Product Code**
   - Move root-level reports into `docs/archive/`.
   - Remove or ignore `.DS_Store`, temp output, test output, and misplaced `.vercel` metadata after confirmation.
   - Keep a clear root directory for production work.

2. **Content Trust Baseline**
   - Continue reducing audit warnings for descriptions, significance, Japanese names, `era_slug`, `type_slug`, and `country_code`.
   - Work only in high-confidence batches with reports and rollbackable migrations.

3. **Image Authority Decision**
   - Document the current image resolution order.
   - Decide whether `curated_images`, local registry, or object storage becomes the authority.
   - Do not migrate storage until this decision is written.

4. **Search Reliability Baseline**
   - Keep current search working.
   - Add targeted tests for search result shape and language fallback.
   - Plan database index migration but do not start until data warnings are lower.

5. **Release Hygiene**
   - Group dirty changes into clear commits.
   - Maintain migration execution status.
   - Keep `npm run data:audit`, `npm run typecheck`, `npm run build`, and tests as release gates.

## P1

1. **V1 Learning Page Consolidation**
   - Choose one learning direction for V1: likely "Why Study This" plus curated concept paths.
   - Archive the rest as validated concepts.

2. **Building Detail Page Learning Slot**
   - Add one small static learning slot only for a few canonical examples after V1 content baseline is stable.
   - Do not create a new database schema yet.

3. **Relation Query Pushdown**
   - Continue optimizing high-traffic relation queries.
   - Prioritize architect detail and browse pages before long-tail pages.

4. **Script Lifecycle Documentation**
   - Label scripts as permanent, sprint-specific, or archive-ready.
   - Reduce fear around data governance scripts.

5. **Documentation Index**
   - Add a docs index that says which documents are current, archived, or superseded.

## P2

1. **Search Index Migration**
   - Add Postgres search indexes and keep JS ranking as fallback during rollout.

2. **Object Storage Migration**
   - Move curated images out of git after image authority is settled.

3. **CMS/Admin Planning**
   - Design minimal admin review flow only after data governance stabilizes.

4. **Component Directory Reorganization**
   - Reorganize components by domain after V1 scope is frozen.

5. **Interactive Learning V2**
   - Revisit Active Learning, Learning Graph, Exam Bridge, and Design Decision layers after V1 proves daily learning value.

## What Not To Do In The Next 90 Days

- Do not add new learning experiments.
- Do not add new taxonomy unless required by audit.
- Do not start a full redesign.
- Do not start CMS before data cleanup.
- Do not migrate all images before image authority is decided.
- Do not reorganize components while production behavior is still moving.
