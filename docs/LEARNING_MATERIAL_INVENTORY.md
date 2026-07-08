# Learning Material Inventory

Last updated: 2026-07-03

Purpose: classify learning and research material before deleting or productizing it. Do not delete `future` material only because it is not currently imported by a route.

## Active

These files are imported by current routes, components, or API handlers.

| Area | Files | Current surface |
|---|---|---|
| Code topics | `src/lib/learning-topics.ts`, `src/lib/learning/*` | `/[lang]/code`, `/[lang]/code/[slug]`, topic cards and badges |
| Public glossary | `src/lib/glossary/*` | `/[lang]/glossary`, code topic detail pages |
| Learning graph | `src/lib/learning-graph/*.ts` | `/[lang]/code/[slug]` related topics and prerequisite terms |
| Learning paths | `src/lib/learning-paths.ts` | `/[lang]/paths`, `/[lang]/paths/[slug]` |
| Building learning overlay | `src/content/building-learning-map/building-learning-map.ts` | `/[lang]/building/[slug]` |
| Architect knowledge relations | `src/lib/architect-knowledge-relations.ts` | `/[lang]/graph`, architect detail pages |
| Knowledge OS API layer | `src/lib/knowledge-os.ts` | `/api/v1/*` claim/source/grounding endpoints |

## Future

These files are not clearly wired into the current public product, but they contain structured material that may support the Learning OS direction.

| Area | Files | Why keep |
|---|---|---|
| Core learning terms | `src/content/core-learning-terms/core-100-terms.ts` | Structured term pool for the future knowledge/learning layer |
| Learning source registry | `src/content/learning-sources/*.ts` | Source-first extraction registry and remaining candidate lists |
| Learning product sections | `src/content/learning-product/path-sections.ts` | Draft structured copy for future learning path productization |
| Exam concepts | `src/lib/exam-concepts/*.ts` | Possible future study/review layer |
| Learning reviews | `src/lib/learning-reviews/*.ts` | Possible future review/compression layer |
| Search intelligence | `src/lib/search-intelligence/*.ts` | Possible future search alias and query-expansion layer |
| Diagram specs | `src/lib/diagram-specs/*.ts` | Possible future diagram rendering/spec library |
| Building-code bridge | `src/lib/building-code-mapping.ts` | Possible future "learn from this building" mapping |

## Archived

These report, planning, and isolated candidate-pool files were moved out of `src/` on 2026-07-03. They are preserved under `docs/archive/learning-materials/` with their original source path mirrored.

- `docs/archive/learning-materials/src/content/building-learning-map/building-learning-map-report.md`
- `docs/archive/learning-materials/src/content/core-learning-terms/core-100-report.md`
- `docs/archive/learning-materials/src/content/curated-glossary/` — reports plus archived `.ts.txt` candidate-pool files
- `docs/archive/learning-materials/src/content/knowledge-roadmap/knowledge-gap-action-plan.md`
- `docs/archive/learning-materials/src/content/learning-product/learning-path-product-plan.md`
- `docs/archive/learning-materials/src/lib/learning-audit/phase-2-learning-audit.md`
- `docs/archive/learning-materials/src/lib/learning-graph/learning-graph-overview.md`

## Delete Candidates

None yet.

Reason: every unimported TypeScript file found in this pass appears to be structured content, source registry material, or future Learning OS infrastructure. Deleting it now would be a product decision, not housekeeping.

## Next Review Rule

Before deleting a `future` file, first answer:

1. Is it duplicate data that exists in a better active source?
2. Is it stale enough that it would mislead future work?
3. Can it be archived as text instead of deleted?
4. Does `npm run typecheck`, `npm run lint`, and the core route test suite still pass after removal?
