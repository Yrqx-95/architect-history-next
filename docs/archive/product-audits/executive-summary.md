# Archistory Product and UX Audit Executive Summary

## Product Diagnosis

Archistory already has enough content and systems to support the position **Architecture Learning Archive**.

The main obstacle is no longer content volume. It is product coherence.

The archive, learning paths, glossary, code topics, timeline, learning graph, and building learning map currently behave like adjacent features. Users can access rich material, but the interface does not consistently explain:

- where to start
- how the systems relate
- what to do next
- whether the product is an archive, encyclopedia, or exam site

## Biggest UX Problems

### 1. Learn Is Not the Visible Parent Product

Production navigation exposes Building Code and Glossary but not Learn. The homepage also presents tools before the learning path.

Impact:

- users miss the guided experience
- Code and Glossary look like separate products
- the broader learning system remains hidden

### 2. No Stable Page-Archetype System

The site mixes 64rem, 80rem, and 86rem layouts; editorial, database, learning, and reference pages use different alignment and density rules.

Impact:

- page edges drift
- spacing feels arbitrary
- some areas feel unfinished
- users cannot build visual familiarity

### 3. Architecture Student Is Not Yet the Default Start

It has the strongest connection across Core 100, Glossary, Code, and archive entities, but it is not the dominant homepage or navigation route.

Impact:

- users choose between tools before understanding the system
- learning feels descriptive instead of guided

### 4. Archive-to-Learn Bridges Are Weak

Buildings and Timeline contain rich learning potential, but learning actions are late, indirect, or absent.

Impact:

- archive discovery does not naturally become study
- valuable learning-map data remains under-expressed

### 5. Density Is Not Task-Specific

Timeline and Explore are highly dense. Learn sometimes uses heavy cards and repeated labels. Code details can feel like technical textbooks.

Impact:

- archive pages can feel like databases
- learning pages can feel like static content
- Code can push the product toward exam identity

## Biggest IA Problems

1. Learn is structurally subordinate to its tools.
2. Timeline is separated from Explore without a clear hybrid role.
3. Search is mixed with content destinations.
4. Archive tools and learning tools share navigation levels inconsistently.
5. The Learning Graph and Building Learning Map are product strengths but are not framed as understandable user benefits.

## Highest-ROI Fixes

### P0

1. Add visible Learn navigation on desktop and mobile.
2. Make Architecture Student the primary homepage learning CTA.
3. Present Code and Glossary as supporting Learn tools.
4. De-emphasize Exam Preparation.
5. Define page archetypes and normalize content edges.
6. Establish consistent surface and section-spacing roles.

Expected impact:

- substantially higher Learn discovery
- clearer first-time comprehension
- lower perception of an unfinished or fragmented product

### P1

1. Preserve path context across Learn, Glossary, and Code.
2. Add explicit Building-to-Learn and Timeline-to-Learn bridges.
3. Standardize Building and Architect detail foundations.
4. Introduce density rules for archive, learning, and reference tasks.
5. Simplify stage and term presentation.

Expected impact:

- stronger learning continuation
- more archive depth converted into meaningful study
- less database and exam-prep perception

### P2

1. Unify search across archive and learning.
2. Add curated cross-domain collections.
3. Test lightweight continue-learning state.
4. Add repeatable visual and localization QA.
5. Evaluate navigation consolidation after usage data.

Expected impact:

- deeper discovery
- better return behavior
- scalable product consistency

## Recommended Implementation Order

1. Make Learn discoverable.
2. Establish Architecture Student as the default route.
3. Normalize width, alignment, spacing, and surface semantics.
4. Connect paths to Glossary and Code with preserved context.
5. Connect Building and Timeline pages back into learning.
6. Consolidate navigation only after the transitional structure is validated.
7. Improve global discovery and continuation.

## Estimated Impact

| Initiative | User Impact | Effort | Priority |
|---|---:|---:|---|
| Direct Learn navigation | Very high | Low | P0 |
| Homepage Architecture Student CTA | Very high | Low | P0 |
| Page-archetype and width rules | High | Medium | P0 |
| Learn/Glossary/Code context | High | Medium | P1 |
| Building and Timeline learning bridges | High | Medium | P1 |
| Unified search and collections | Medium-high | High | P2 |

## Strategic Direction

Archistory should not become:

- an architecture media homepage
- a generic encyclopedia
- a licensing-exam dashboard
- a collection of disconnected databases

It should combine:

- the cultural depth and visual discovery of an archive
- the structural clarity of a knowledge system
- the progression and next-step guidance of a learning product

The core product loop should be:

`Start a path -> learn a concept -> see it in a building -> explore its historical context -> return to the next learning step`

## Phase 2 Benchmark Questions

External research should now determine:

- how Linear controls dense information
- how Notion structures long knowledge pages
- how Khan Academy establishes progression
- how Google Arts & Culture enables archive discovery
- how Are.na supports networked exploration

Evidence must come from current live pages, real URLs, and screenshots. Recommendations should follow observation, not precede it.
