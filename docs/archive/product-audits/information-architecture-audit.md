# Archistory Information Architecture Audit

## Product Vision

Archistory should behave as an **Architecture Learning Archive**.

This means the product must support two complementary intentions:

1. Explore architecture through buildings, architects, time, styles, and places.
2. Learn architecture through paths, concepts, vocabulary, code, and connected examples.

The archive provides evidence and cultural depth. Learn provides sequence and direction.

## Current Structural Problem

The current site architecture reflects the order in which features were built more than the mental model users need.

- Explore groups several archive entities.
- Timeline is separated from Explore.
- Building Code and Glossary are top-level.
- Learn is a route but not a visible top-level product.
- Search is presented alongside destinations.

This makes the site appear to contain independent databases and tools rather than one connected learning archive.

## Domain Classification

### Archive System

- Buildings
- Architects
- Styles
- Countries / Regions
- Movements
- Timeline
- Explore

Purpose:

- browse entities
- understand context
- discover relationships
- inspect primary archive records

### Learning System

- Learn
- Learning Paths
- Architecture Student
- Core 100 Terms
- Building Code
- Glossary
- Learning Graph
- Building Learning Map

Purpose:

- provide a starting point
- sequence knowledge
- recommend vocabulary
- connect concepts to real buildings
- tell users what to do next

### Global Utilities

- Search
- Language
- Chinese script setting
- Theme behavior

Purpose:

- support navigation and access
- remain available across both archive and learning modes

## Recommended Target IA

### Primary Navigation

- Learn
- Explore
- Timeline
- Search

### Learn Hub

- Architecture Student
- Absolute Beginner
- Architecture History Explorer
- Core 100 Terms
- Building Code
- Glossary
- Learning Graph

Architecture Student should be the primary route. The other paths may remain visible but should not compete equally until they provide comparable depth.

### Explore Hub

- Buildings
- Architects
- Styles
- Movements
- Countries / Regions
- Building relationships

### Timeline

Timeline may remain top-level because time is a core organizing axis of Archistory. It should nevertheless connect into both systems:

- archive exploration by period
- history learning through Architecture History Explorer

### Search

Search should operate globally across:

- entities
- terms
- code topics
- periods
- learning paths

It is a utility, not a product category.

## Where Each Area Belongs

| Area | Primary Role | Navigation Level | Notes |
|---|---|---|---|
| Learn | Learning system | Top-level | Product start for guided users |
| Architecture Student | Learning path | Learn primary | Default learning route |
| Glossary | Learning tool | Learn secondary | Can remain temporarily top-level |
| Building Code | Learning tool | Learn secondary | Avoid exam-first framing |
| Core 100 | Learning foundation | Learn secondary | Vocabulary spine |
| Learning Graph | Knowledge structure | Learn secondary | Supports nonlinear discovery |
| Building Learning Map | Contextual learning layer | Embedded + Learn | Best exposed from building pages |
| Explore | Archive system | Top-level | Main archive entry |
| Buildings | Archive entity | Explore secondary | Also linked from learning examples |
| Architects | Archive entity | Explore secondary | Also linked from historical learning |
| Timeline | Hybrid | Top-level | Archive axis and history-learning bridge |
| Search | Utility | Global | Should search both systems |

## Key Relationship Model

Archistory should not force users to choose permanently between Archive and Learn.

The intended loop is:

`Learn path -> term or topic -> building example -> architect/period -> related concept -> continue path`

The reverse loop is equally important:

`Building or timeline discovery -> learning question -> term/topic -> relevant path`

This loop is the product advantage. A conventional encyclopedia can connect entities. A conventional course can sequence lessons. Archistory should do both.

## P0 Recommendations

1. Make Learn a visible top-level destination.
2. Make Architecture Student the default guided start.
3. Label Glossary and Building Code as Learn tools.
4. Add direct homepage routes to Learn and Architecture Student.
5. Preserve current routes during the transition.

## P1 Recommendations

1. Consolidate Learn sub-navigation.
2. Consolidate Explore sub-navigation.
3. Add contextual learning links to Building and Timeline pages.
4. Preserve path context when opening terms and code topics.
5. Reframe Learning Graph as a discovery mode, not a technical feature.

## P2 Recommendations

1. Unify global search across learning and archive entities.
2. Introduce curated cross-domain collections.
3. Add lightweight continuation history if approved.
4. Evaluate whether Timeline remains top-level after user testing.

## What Should Not Happen

- Do not make Learn a quiz portal.
- Do not make Building Code the dominant product identity.
- Do not hide the archive behind course progression.
- Do not copy a school dashboard with grades, streaks, or test pressure.
- Do not place every feature at the same navigation level.
- Do not add new routes merely to express hierarchy; improve grouping first.
