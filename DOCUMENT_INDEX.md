# Document Index

Last updated: 2026-07-08

Purpose: help a new developer understand what is current product documentation, what is archived history, and what has been superseded.

## Current

Root-level docs:

- `README.md` — project overview and setup.
- `STATUS.md` — current project state and active constraints.
- `ROADMAP.md` — current 90-day direction.
- `PRODUCT_SURFACE.md` — pages users can actually see.
- `FEATURE_STATUS.md` — production, validated, prototype, and archived feature status.
- `SCRIPT_REGISTRY.md` — script purpose and lifecycle.
- `DOCUMENT_INDEX.md` — this index.
- `AGENTS.md` — local agent/workflow preferences.
- `CLAUDE.md` — local assistant context.

Current docs under `docs/`:

- `docs/STATUS.md` — historical status log and migration execution notes.
- `docs/PROJECT_OPERATING_SYSTEM.md` — canonical maintenance protocol for source-of-truth rules, validation, logs, rollback scope, and AI/human conduct.
- `docs/PROJECT.md` — project overview.
- `docs/PRODUCT_STRATEGY.md` — product strategy.
- `docs/DATA_SCHEMA.md` — schema reference.
- `docs/CONTENT_RULES.md` — content standards.
- `docs/PERFORMANCE.md` — performance notes.
- `docs/DESIGN_TOKENS.md` — design token reference.
- `docs/UI_RULES.md` — UI rules.
- `docs/AI_AGENT_RULES.md` — agent workflow.
- `docs/FILE_STRUCTURE.md` — file structure reference.
- `docs/HANDOFF.md` — handoff notes.
- `docs/TECH_DEBT.md` — older technical debt log; use `TECHNICAL_DEBT_REPORT.md` in archive for latest cleanup audit context.
- `docs/LEARNING_MATERIAL_INVENTORY.md` — active/future/archive classification for learning and research material.
- `docs/reports/` — current human-readable cleanup and audit reports that still guide active maintenance.
- `docs/graduation/` — current V1 Graduation Inspiration Library handoff docs, including wireframes, random behavior, content guide, and source/image policy.

## Archived

Product audits:

- `docs/archive/product-audits/`
- Contains benchmark audits, page reviews, UX reports, information architecture notes, and product audit history.
- Screenshot evidence for those audits is stored under `docs/archive/product-audits/evidence/`.

Data governance:

- `docs/archive/data-governance/`
- Contains country/type/style/era reports, taxonomy stability reviews, metadata completion plans, and write reports.

Learning experiments:

- `docs/archive/learning-experiments/`
- Contains validated but non-productized learning-layer concepts:
  - Why Study This
  - Active Learning
  - Learning Bridge
  - Learning Graph
  - Design Decision

Research:

- `docs/archive/research/`
- Contains source/reference research reports.

Reports:

- `docs/archive/reports/`
- Contains repository state, engineering audit, product consolidation, technical debt, old roadmap, and overnight work report.

Plans:

- `docs/archive/plans/`
- Contains old handoff, project analysis, and Batch 5 planning documents from 2026-05-26.

Archived scripts:

- `docs/archive/scripts/one-off/`
- Contains old one-off sprint scripts preserved as text files after removal from the active `scripts/` workspace.

Learning material reports:

- `docs/archive/learning-materials/`
- Contains report and planning markdown files moved out of `src/` while preserving their original source paths.

## Superseded

These documents are kept for history but should not guide new work directly:

- `docs/archive/reports/ROADMAP_90_DAYS.md` — superseded by root `ROADMAP.md`.
- `docs/archive/reports/PRODUCT_CONSOLIDATION.md` — distilled into root `STATUS.md`, `PRODUCT_SURFACE.md`, and `FEATURE_STATUS.md`.
- `docs/archive/reports/REPOSITORY_STATE.md` — superseded by root `DOCUMENT_INDEX.md` and this cleanup sprint.
- `docs/archive/reports/TECHNICAL_DEBT_REPORT.md` — useful audit context, but day-to-day cleanup should follow root `ROADMAP.md`.
- Root-level product/page review reports now under `docs/archive/product-audits/` — use only as historical evidence unless a specific issue is re-opened.
- Root-level data sprint reports now under `docs/archive/data-governance/` — use only to understand past normalization decisions.

## Rule For Future Docs

- Current operating docs belong at root or `docs/`.
- Historical reports belong under `docs/archive/`.
- Generated machine reports belong under `reports/`.
- Do not add new root-level sprint reports.
