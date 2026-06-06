# Archistory Learning Graph Overview

## Purpose

The learning graph connects Code Topics and Glossary Terms without changing the user interface.

It turns isolated learning pages into an internal curriculum layer that can later power:

- Learning Paths
- Recommended Next Topic
- Beginner Curriculum
- Exam Preparation Mode
- Search Relevance
- Topic Dependency Graph
- Related Glossary Blocks

This layer is local and lightweight. It does not add routes, Supabase tables, navigation items, visible UI, analytics, or exam systems.

## Structure

The graph lives in `src/lib/learning-graph/`.

- `types.ts`: TypeScript types for graph nodes, dependencies, paths, and validation reports.
- `learning-graph.ts`: One `LearningGraphNode` for each existing Code Topic.
- `learning-paths.ts`: Canonical topic orders for beginner, architecture student, and exam-preparation paths.
- `helpers.ts`: Read helpers for nodes, terms, related topics, next topics, and paths.
- `required-terms.ts`: Three-tier term relationship data: required, must-know, and related terms.
- `next-topic-engine.ts`: Previous, recommended next, and alternative next topic data.
- `validate-learning-graph.ts`: Validation helper for broken topic and glossary references.
- `index.ts`: Public exports.

Related Phase 2 foundation layers:

- `src/lib/learning-reviews/`: 30-second, 3-minute, and 10-minute review data.
- `src/lib/exam-concepts/`: Formula, keyword, condition, trap, and process concepts.
- `src/lib/search-intelligence/`: Learning search aliases and exam keyword expansion.
- `src/lib/diagram-specs/`: Diagram specification library for future SVG or illustration work.
- `src/lib/building-code-mapping.ts`: Future archive-to-code mapping for "Learn From This Building".
- `src/lib/learning-audit/`: Learning-system coverage reports.

## How to Add a New Topic

1. Add the Code Topic to the existing learning topic data.
2. Add any needed glossary terms to the glossary data.
3. Add a matching `LearningGraphNode` in `learning-graph.ts`.
4. Include:
   - `topicSlug`
   - `learningStage`
   - `difficulty`
   - `requiredGlossaryTerms`
   - `requiredTopics`
   - `nextTopics`
   - `relatedTopics`
   - `examConcepts`
   - `learningObjectives`
   - `commonConfusions`
5. Run validation and confirm there are no broken references.

## How to Add Glossary Relationships

Use glossary slugs in `requiredGlossaryTerms`.

Do not use display labels such as `容積率` or `前面道路` as identifiers. Display labels can vary by language, but slugs remain stable.

Example:

```ts
requiredGlossaryTerms: [
  'floor-area-ratio',
  'total-floor-area',
  'site-area',
]
```

## How to Add Learning Paths

Add a new `LearningPath` in `learning-paths.ts`.

Each path should define:

- `id`
- `title`
- `description`
- `topicOrder`

Use topic slugs only. A path should represent a clear learner intent, such as beginner onboarding, design-studio support, or exam review.

## Future Exam Mode Usage

Exam Mode can use this layer to:

- Load exam-heavy topics first.
- Show required concepts before examples.
- Generate topic checklists.
- Surface common confusions as review prompts.
- Recommend the next topic after a completed review.

The current graph already records:

- `examConcepts`
- `commonConfusions`
- `difficulty`
- `learningStage`

## Future Search Usage

Search can use this layer to improve relevance.

Examples:

- A search for `1.25` can prioritize road and north-side slant topics.
- A search for `FAR` can prioritize `floor-area-ratio` and related glossary terms.
- A search for `高さ制限` can group height-control topics together.

The graph can also provide topic clusters, prerequisite hints, and related glossary suggestions.

## Validation

Use `validateLearningGraph()` to check:

- Every learning topic has a graph node.
- Every graph node points to an existing learning topic.
- Required glossary term slugs exist.
- Topic references in dependencies and paths are not broken.
- Core fields are present.

The validation layer is intentionally local. It is designed to be easy to add to CI later without changing product behavior.
