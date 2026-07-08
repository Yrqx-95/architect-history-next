# Archistory P1 Priority Roadmap

Review date: 2026-06-07

## Top 10 Remaining UX Problems

| Order | Problem | Priority | Estimated impact | Estimated effort |
|---:|---|---|---|---|
| 1 | Full-size blank hero/portrait placeholders make detail pages look broken | P1-A | Very high: trust, finish, first impression | Low-Medium |
| 2 | Architecture Student is below Code/Glossary on Learn and expands into a long document | P1-A | Very high: Learn activation and comprehension | Medium |
| 3 | Browse leads with inventory counts and repeated record cards | P1-A | High: reduces database feeling | Medium |
| 4 | Timeline leads with collection density and uses competing navigation systems | P1-A/P1-B | High: changes Timeline from table to exploration | Medium-High |
| 5 | Tablet header wraps and crowds navigation/language controls | P1-A | High: immediate usability and polish | Low-Medium |
| 6 | Building and architect pages lack one explicit recommended continuation | P1-A/P1-B | High: session depth and discoverability | Medium |
| 7 | Mixed-language fallbacks and source-like labels remain visible | P1-A | High: perceived completeness across locales | Medium |
| 8 | Glossary opens as search + filters instead of contextual learning support | P1-A | Medium-High: improves Learn bridges | Medium |
| 9 | Code index and topic status framing feel like exam/content-ops tools | P1-A/P1-B | Medium-High: aligns product promise | Medium |
| 10 | Recommended terms and repeated related cards lack clear ranking or learning reason | P1-B | Medium: reduces cognitive load and repetition | Medium-High |

## Recommended Implementation Order

### 1. Repair the first impression

1. Collapse failed image states into intentional compact fallbacks.
2. Fix the tablet header breakpoint and reduce controls shown between mobile and desktop.
3. Remove mixed-language fallbacks from visible primary copy.

These are broad trust improvements with limited conceptual risk.

### 2. Establish one next step

1. Move Architecture Student above Code and Glossary on Learn.
2. Make Stage 01 the only expanded stage by default.
3. Add "Continue from this building" and "Start with these works" blocks to detail pages.

This turns the existing graph and content into a product without adding new content.

### 3. Replace database framing

1. Put curated Browse entry points before totals.
2. Put historical questions and period orientation before Timeline density.
3. Put contextual starter terms before Glossary filters.
4. Put a recommended Code topic sequence before the complete index.

### 4. Reduce repetition

1. Give selected works, timeline, related entities, and similar items distinct jobs.
2. Rank recommended terms and explain the first choices.
3. Demote counts, status badges, and source metadata when they are not the user's primary task.

## What Should Be Fixed Next

The next implementation sprint should contain only these four P1-A packages:

1. **Resilient media fallbacks** for Building and Architect detail.
2. **Learn sequencing** with Architecture Student first and progressive stage disclosure.
3. **Responsive header correction** for the 768px tablet state.
4. **Localization cleanup** for primary summaries and relationship/source labels.

Together, these address the strongest unfinished, confusing, and uncomfortable signals with relatively low product risk.

## What Should Intentionally Wait

- Redesigning the full Timeline interaction: important, but it needs a clear design decision between period-first and continuous-rail models.
- Reworking all Browse card types: first validate the curated-entry hierarchy.
- Consolidating architect works/timeline/related sections: useful after the recommended sequence is established.
- Large glossary taxonomy changes: first test contextual entry and return-to-stage behavior.
- Any new content, routes, databases, imports, OCR, PDFs, AI features, or learning paths.

## Success Criteria For The Next Review

- No detail-page first viewport is dominated by a blank media box.
- At 768px, no header label wraps and all controls remain comfortably tappable.
- A new user can identify the Learn starting action in the first viewport.
- Every Building and Architect detail page presents one recommended continuation before a broad related-items grid.
- Browse and Timeline first viewports contain a reason to explore, not only counts.
- English, Chinese, and Japanese primary copy does not unexpectedly switch language.
