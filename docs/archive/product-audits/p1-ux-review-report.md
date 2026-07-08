# Archistory P1 UX Review Report

Review date: 2026-06-07
Scope: Review only; no product code, commit, push, or deployment.

## Method

Live local pages were reviewed in the running Next.js application at:

- Desktop: 1434/1440 x 900
- Tablet: 768 x 1024
- Mobile: 390 x 844
- Languages: Japanese, Chinese, English
- Theme: Light mode captured on real pages

Dark mode could not be captured reliably because the review browser retained a fixed light `prefers-color-scheme`; a temporary OS appearance command did not complete and was stopped. No dark-only finding is included without live evidence. Theme token consistency was not treated as a substitute for real-page evidence.

The red/black Next.js development indicator visible in some screenshots is not considered a product issue.

## Executive Finding

Archistory no longer lacks structure. The remaining problem is that strong editorial and educational material is frequently preceded by database signals:

- totals before reasons to explore
- equal cards before recommended sequence
- metadata before interpretation
- all options before one next step
- full-size placeholders when media fails

The product feels unfinished where fallbacks expose empty space or internal status. It feels database-like where counts and repeated records dominate. It feels confusing where multiple navigation models compete. It feels uncomfortable on tablet where the full header wraps and on mobile where long controls or expanded paths consume the viewport.

## Highest-Confidence Cross-Product Issues

### 1. Failed media is visually catastrophic

- Evidence: [building-ja-desktop-light.png](evidence/p1-review/building-ja-desktop-light.png), [architect-zh-mobile-light.png](evidence/p1-review/architect-zh-mobile-light.png)
- Result: A missing image becomes the largest object on the page.
- Priority: **P1-A**

### 2. Recommended next actions exist but are buried

- Evidence: [learn-en-tablet-light.png](evidence/p1-review/learn-en-tablet-light.png), [building-en-mobile-light.png](evidence/p1-review/building-en-mobile-light.png)
- Result: Users can browse but must invent their own sequence.
- Priority: **P1-A**

### 3. Counts still lead several discovery surfaces

- Evidence: [browse-en-mobile-light.png](evidence/p1-review/browse-en-mobile-light.png), [timeline-en-mobile-light.png](evidence/p1-review/timeline-en-mobile-light.png)
- Result: Browse and Timeline feel like collection dashboards.
- Priority: **P1-A**

### 4. Tablet navigation is a distinct broken-feeling state

- Evidence: [timeline-zh-tablet-light.png](evidence/p1-review/timeline-zh-tablet-light.png)
- Result: Navigation labels wrap into narrow columns and language/script controls crowd the header.
- Priority: **P1-A**

### 5. Localization fallbacks are visible as product seams

- Evidence: [building-en-mobile-light.png](evidence/p1-review/building-en-mobile-light.png), [architect-ja-desktop-light.png](evidence/p1-review/architect-ja-desktop-light.png)
- Result: Mixed Chinese/English/Japanese copy makes otherwise polished pages look incomplete.
- Priority: **P1-A**

## Section Conclusions

| Section | Current feeling | Key correction |
|---|---|---|
| Learn | Organized collection becoming a product | Put Architecture Student first and make stages progressive |
| Browse | Database with pockets of editorial value | Lead with curated entry points, demote totals |
| Timeline | Data atlas | Choose one historical navigation model |
| Building Detail | Deep but fragile | Collapse failed media and show one next action |
| Architect Detail | Most human/editorial surface | Add a recommended works sequence |
| Glossary | Dictionary database | Add contextual starter terms and return paths |
| Code Topics | Educational content with exam/index framing | Lead with sequence and spatial questions |

## Detailed Reports

- [learn-review.md](learn-review.md)
- [browse-review.md](browse-review.md)
- [timeline-review.md](timeline-review.md)
- [building-detail-review.md](building-detail-review.md)
- [architect-detail-review.md](architect-detail-review.md)
- [glossary-review.md](glossary-review.md)
- [code-review.md](code-review.md)

## Recommendation

Do not add content, routes, or learning paths next. Fix the experience hierarchy around the existing material: resilient media, one recommended next step, editorial entry before counts, compact tablet navigation, and consistent localization.
