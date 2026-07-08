# Product Consolidation

Generated: 2026-06-10

Scope: product identity and scope consolidation. No new features proposed beyond prioritization.

## What Is Archistory Right Now?

Best current definition: **Architecture Learning Navigator**.

Why not only Architecture Database:

- It already has archive/database traits: buildings, architects, countries, styles, eras, search, details, images.
- But the recent direction is not just storing facts. The strongest value is helping students move from a building to concepts, comparisons, exam topics, and design judgment.

Why not only Architecture Archive:

- Archive implies preservation and browsing.
- Archistory is moving toward guided learning, not just retrieval.

Why not yet Architecture Study Platform:

- A study platform implies exercises, progress, accounts, assessment, saved notes, and a stable curriculum.
- Archistory has validated learning concepts, but they are not fully productized.

Therefore the best near-term identity is:

> Archistory is an architecture learning navigator: it helps students start from buildings and move toward concepts, comparisons, history, exam knowledge, and design judgment.

## V1: Must Keep

These are the product surfaces that should remain in V1.

1. Building detail pages
2. Architect detail pages
3. Search
4. Browse by country / type / style / era
5. Learn page with curated concepts and paths
6. Image display with attribution
7. Multilingual zh/en/ja navigation and fallback
8. Data audit and smoke tests as release guardrails

V1 goal: make the existing archive trustworthy, searchable, and useful as a learning entry point.

## V2: Future Expansion

These are validated but should wait until V1 is stable.

1. Why Study This blocks on selected building pages
2. Active Learning prompts
3. Learning Graph navigation
4. Exam Connection / Learning Bridge blocks
5. Design Decision trade-off prompts
6. CMS/admin review workflow
7. User progress, notes, or saved learning paths
8. Full database-backed search index and concept graph

V2 goal: turn the learning navigator into a more interactive study platform.

## Pause

These should not receive more investment right now.

1. New learning layer experiments beyond the five already validated
2. New metadata categories
3. New taxonomy expansion unless audit errors require it
4. Big visual redesign
5. Large component reorganization
6. Image/object-storage migration before image source authority is decided
7. CMS before data/content governance is calmer
8. More benchmark reports before the current findings are consolidated

## Product Principle For The Next Phase

Do not ask "what else can Archistory become?"

Ask:

> Can a student reliably find a building, understand why it matters, compare it with related examples, and know what to study next?

If the answer is not consistently yes, V1 is not finished.

## If Development Stops For 3 Months

The biggest problem is content trust and completeness.

The app can render and has no current data-audit errors, but many pages still have thin descriptions, missing significance, missing Japanese names, missing era/type metadata, and unresolved image authority. A paused project would remain usable, but its educational credibility would be uneven.

## If Development Keeps Adding Features Aggressively

The biggest problem is product fragmentation.

Archistory would become a pile of promising layers: archive, glossary, learning path, graph, active prompts, exam bridge, decision simulator, CMS, image registry, metadata engine. Each is reasonable alone, but together they would make the project harder to maintain and harder for users to understand.

The risk is not lack of ideas. The risk is too many partially-productized ideas.
