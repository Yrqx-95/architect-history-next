# Glossary Curation Report

## Result

All 596 unpublished candidates from the existing learning-source extraction were reviewed and assigned exactly one outcome.

| Grade | Meaning | Count |
| --- | --- | ---: |
| A | Curated draft term, ready for editorial review | 74 |
| B | Plausible term requiring further verification or writing | 449 |
| C | Rejected as a glossary entry, with a recorded reason | 73 |
| **Total** |  | **596** |

No candidate remains unclassified. A-grade records include Japanese, English, and Chinese labels; a reading; slug; category; definitions; aliases; related terms; retained `sourceRefs`; and `draft: true`.

## Category Coverage

Counts use the curated primary category for A-grade terms and the review classifier for B/C candidates.

| Category | A | B | C | Total |
| --- | ---: | ---: | ---: | ---: |
| architectural-history | 14 | 132 | 46 | 192 |
| building-code | 6 | 24 | 0 | 30 |
| construction | 5 | 12 | 0 | 17 |
| drawing | 4 | 13 | 1 | 18 |
| equipment | 1 | 9 | 0 | 10 |
| furniture | 0 | 11 | 1 | 12 |
| interior-design | 0 | 4 | 1 | 5 |
| lighting | 0 | 12 | 10 | 22 |
| materials | 6 | 54 | 0 | 60 |
| planning | 28 | 84 | 12 | 124 |
| spatial-design | 6 | 40 | 1 | 47 |
| structure | 4 | 46 | 1 | 51 |
| style | 0 | 8 | 0 | 8 |
| color | 0 | 0 | 0 | 0 |
| presentation | 0 | 0 | 0 | 0 |
| **Total** | **74** | **449** | **73** | **596** |

## Coverage Observations

- Architectural history and planning dominate the candidate pool.
- Materials and structure have substantial review backlogs but already contain useful A-grade foundations.
- Color and presentation have no candidates in the current source set.
- Interior design, style, equipment, and furniture are thinly represented.
- Lighting has candidates, but many are product names or context-dependent phrases and therefore require stricter review.

## Duplicate Findings

The source extraction contained 736 mentions representing 631 unique normalized terms. Of those unique terms, 35 were already public glossary entries, leaving the 596-item curation pool.

The highest repeated term was `サービス動線` with five mentions. `混合セメント`, `細骨材率`, and `空気量` each appeared three times. Exact duplicates were consolidated while preserving every source reference. See `merge-log.md` for canonical and deliberately deferred merges.

## Suggested Next Focus

This phase intentionally performed no new extraction. After editorial approval of this batch, the largest value would come from:

1. Reviewing B-grade structural, material, and code terms where technical precision matters most.
2. Filling category gaps in color, presentation, acoustics, environmental systems, accessibility, and contemporary interior design.
3. Prioritizing sources with definitional context rather than product catalogs or isolated slide labels.
4. Promoting A-grade drafts only after terminology, translations, aliases, and cross-links receive human review.

## Deliverables

- `curated-terms.ts`: 74 A-grade draft entries.
- `aliases.ts`: generated aliases and explicit canonical merges.
- `pending-review.ts`: 449 B-grade candidates.
- `rejected-candidates.ts`: 73 C-grade candidates with reasons.
- `candidate-pool.ts`: reproducible reconstruction of the 596-item pool.
- `types.ts`: staged curation types.
- `merge-log.md`: duplicate and canonicalization decisions.

These files are isolated under `src/content/curated-glossary/` and are not connected to routes, navigation, UI components, or the public glossary.
