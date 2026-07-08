# Glossary UX Review

Review date: 2026-06-07

## Evidence

### G1. The first interaction is search and taxonomy, not learning support

- URLs: `http://localhost:3000/ja/glossary`, `http://localhost:3000/en/glossary`
- Screenshots: [evidence/p1-review/glossary-ja-desktop-light.png](evidence/p1-review/glossary-ja-desktop-light.png), [evidence/p1-review/glossary-en-mobile-light.png](evidence/p1-review/glossary-en-mobile-light.png)
- Problem: The page foregrounds "71 terms", a search field, and many category chips.
- Why it matters: This is effective dictionary infrastructure but offers little help to a learner who does not yet know what to search.
- Suggested solution: Add a small "Start with" group tied to Architecture Student Stage 01, then keep search and categories as the complete index.
- Priority: **P1-A**

### G2. Mobile category controls are crowded and partly obscured

- URL: `http://localhost:3000/en/glossary`
- Screenshot: [evidence/p1-review/glossary-en-mobile-light.png](evidence/p1-review/glossary-en-mobile-light.png)
- Problem: Search placeholder text truncates and category chips wrap into a dense cluster at the bottom of the viewport.
- Why it matters: The controls consume attention before any term is visible and make the page feel like filter UI.
- Suggested solution: Use a single category selector or horizontally scrollable compact row on mobile. Show the first learning-oriented terms immediately.
- Priority: **P1-A**

### G3. Search state is not clearly explained

- URL: `http://localhost:3000/ja/glossary?term=floor-plan`
- Screenshot: [evidence/p1-review/glossary-ja-desktop-light.png](evidence/p1-review/glossary-ja-desktop-light.png)
- Problem: The field shows `floor-plan`, while the result card shows the localized term. It is unclear whether this is a search, selected term, slug, or filter state.
- Why it matters: URL-driven Learn bridges should feel intentional, not like a technical query.
- Suggested solution: When opened from a learning path, display a selected-term banner: "From Drawing Literacy: Floor Plan", with a clear action to return to the stage.
- Priority: **P1-A**

### G4. Category labels mix conceptual levels

- URL: `http://localhost:3000/ja/glossary`
- Screenshot: [evidence/p1-review/glossary-ja-desktop-light.png](evidence/p1-review/glossary-ja-desktop-light.png)
- Problem: Categories include code concepts, drawings, planning/use, area, roads, height, fire, environment, structure, concrete, materials, construction, building parts, and use.
- Why it matters: Some are disciplines, some are objects, and some are regulation families. The taxonomy feels accumulated rather than taught.
- Suggested solution: Group categories under three learner-facing families: Draw and Plan, Build and Material, Regulate and Evaluate.
- Priority: **P1-B**

## Verdict

Glossary is a competent index but not yet a learning companion. The next step is contextual entry and return paths, not more terms.
