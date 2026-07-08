# Overnight Work Report

## 1. Files created

- src/content/core-learning-terms/core-100-terms.ts
- src/content/core-learning-terms/core-100-report.md
- src/content/curated-glossary/promotion-review-sprint.md
- src/content/curated-glossary/promotion-ready-terms.ts
- src/content/curated-glossary/promotion-still-pending.ts
- src/content/learning-product/learning-path-product-plan.md
- src/content/learning-product/path-sections.ts
- src/content/building-learning-map/building-learning-map.ts
- src/content/building-learning-map/building-learning-map-report.md
- docs/glossary-style-guide.md
- src/content/knowledge-roadmap/knowledge-gap-action-plan.md
- docs/theme-system-simplification-plan.md
- overnight-work-report.md

## 2. Files modified

Only new internal content/planning files were added. No public UI, routes, navigation, database schema, public glossary wiring, OCR, or source imports were modified.

## 3. What was not changed

- No commit.
- No push.
- No deploy.
- No homepage redesign.
- No navigation changes.
- No route changes.
- No database schema changes.
- No AI features.
- No user accounts.
- No animations.
- No OCR or new PDF scanning.

## 4. Core 100 summary

Created a balanced Core 100 architecture student vocabulary set. Category targets were followed as closely as existing data allowed, with architectural history capped to keep the product centered on learning rather than archive volume.

## 5. Promotion candidate summary

Reviewed the capped B-grade promotion shortlist. Sprint output: 80 PROMOTE draft terms, 82 KEEP_PENDING records, 1 sprint rejects. Promotion-ready terms still require human review before public use.

## 6. Learning path summary

Defined five product paths: Absolute Beginner, Architecture Student, Second-Class Architect Candidate, Interior Design Student, and Architecture History Explorer. Absolute Beginner and Architecture History Explorer are launchable as editorial structures; Architecture Student has the highest ROI.

## 7. Building-learning map summary

Created a 30-building v1 mapping for "Learn From This Building". Relationships are conceptual and marked for review. Existing code-topic links are used only where already present in the project.

## 8. Dark mode plan summary

Created a system-theme-only migration plan. No theme code was changed in this task.

## 9. Biggest risks

- Draft promoted terms may look more complete than they are; keep `needsReview` visible internally.
- Technical structure/material/code terms require specialist review.
- Building-learning mappings are conceptually useful but should not be treated as verified scholarship yet.
- Product scope can drift toward exam prep unless Architecture Learning Archive remains the guiding frame.

## 10. Recommended next command tomorrow

Validation has already been run once:

- `npx tsc --noEmit`: passed.
- `npm run lint`: passed with 0 errors and 2 existing `<img>` warnings in `CinematicHero.tsx` and `EditorialImage.tsx`.
- `npm run build`: passed; Next.js generated 3228 static pages.

Useful next command tomorrow if you want to recheck after edits:

`npm run lint && npm run build`

Then review:

1. `src/content/core-learning-terms/core-100-report.md`
2. `src/content/curated-glossary/promotion-review-sprint.md`
3. `src/content/learning-product/learning-path-product-plan.md`
