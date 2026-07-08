# Recommended UX Direction

## Direction Statement

Archistory should become a two-mode product built on one shared knowledge system:

- **Learn** provides sequence and next steps.
- **Explore** provides archive discovery.
- Shared entities connect both without duplicating content.

## Product Model

### Learn

Primary route:

- Architecture Student

Secondary routes:

- Absolute Beginner
- Architecture History Explorer

Learning tools:

- Glossary
- Building Code
- Core 100 Terms

### Explore

Primary entities:

- Buildings
- Architects
- Timeline
- Styles
- Movements
- Places

### Shared Context

Every term, topic, building, architect, style, and period remains one entity. It may appear in several paths or collections with an explicit relationship reason.

## Behavioral References

### From Linear

Adopt:

- alignment discipline
- stable navigation levels
- compact metadata
- current-object context

Reject:

- productivity pressure
- dashboard identity

### From Notion

Adopt:

- readable page hierarchy
- breadcrumbs
- search-first indexes
- calm long-form layout

Reject:

- blank workspace behavior
- arbitrary nesting

### From Khan Academy

Adopt:

- visible “Start here”
- path and stage hierarchy
- continue-learning guidance
- beginner orientation

Reject:

- scores
- mastery
- school and exam identity

### From Google Arts & Culture

Adopt:

- image-led archive exploration
- time, place, movement, and material axes
- thematic collections
- visible relationship reasons

Reject:

- endless recommendation feeds
- discovery without return

### From Are.na

Adopt:

- one entity in multiple contexts
- related collections
- preserved source identity
- networked exploration after the primary route

Reject:

- ambiguous beginner onboarding
- user-created structure as a requirement

## Target User Journey

### Guided Journey

1. User sees Learn in navigation.
2. Homepage recommends Architecture Student.
3. User starts Drawing.
4. User opens Floor Plan.
5. Glossary explains the term.
6. A building demonstrates the concept.
7. Building page explains why it is relevant.
8. User returns to Continue Drawing or proceeds to Structure.

### Exploratory Journey

1. User opens a building.
2. User explores architect, style, and period.
3. A learning prompt identifies concepts visible in the building.
4. User enters the relevant Architecture Student stage.
5. Learn provides the next structured step.

## Page Archetypes

### 1. Learning Landing

Examples:

- Learn
- Architecture Student overview

Rules:

- one primary start
- moderate density
- stages visible
- lightweight term links

### 2. Knowledge Tool

Examples:

- Glossary
- Code index

Rules:

- search and filters first
- compact rows
- Learn parent context
- clear return and continuation

### 3. Reading Page

Examples:

- Code topic
- long glossary explanation

Rules:

- narrow reading column
- local outline
- related concepts after each major section where useful
- persistent path context when entered from Learn

### 4. Archive Landing

Examples:

- Explore
- Timeline

Rules:

- broad but curated
- multiple axes
- visual evidence
- clear category hierarchy

### 5. Entity Detail

Examples:

- Building
- Architect

Rules:

- editorial identity first
- stable metadata
- explicit “learn from this” bridge
- related entities with reasons

## Navigation Direction

### Transitional

- Learn
- Explore
- Building Code
- Glossary
- Timeline
- Search

### Target

- Learn
- Explore
- Timeline
- Search

Learn contains Code and Glossary conceptually. Explore contains buildings, architects, styles, movements, and places. Search spans both.

## Visual Direction

### Keep

- architectural imagery
- editorial seriousness
- neutral semantic color system
- restrained borders
- multilingual support

### Change

- normalize outer widths and title edges
- reduce nested cards
- use cards only for independent items
- use rows for terms and related links
- define one spacing rhythm per page archetype
- state why recommendations are related

## Content Direction

Do not add content as the first response.

Use existing content more effectively:

- Core 100 becomes the vocabulary spine.
- Glossary becomes the explanation layer.
- Code becomes a specialized learning tool.
- Building Learning Map becomes contextual evidence.
- Timeline becomes archive discovery and history-learning entry.
- Learning Graph becomes relationship logic behind ordinary UI.

## P0

1. Make Learn visible.
2. Make Architecture Student primary.
3. Establish Learn > Path > Stage > Item context.
4. Normalize widths, title alignment, and section rhythm.
5. Reframe Code and Glossary as Learn tools.
6. De-emphasize Exam Preparation.

## P1

1. Add path context to term and topic pages.
2. Add building evidence to stages.
3. Add explicit relationship reasons.
4. Add Continue Learning from detail pages.
5. Connect Timeline to History Explorer.
6. Standardize entity-detail foundations.

## P2

1. Curated thematic collections.
2. Unified search.
3. Lightweight recent/continue state.
4. Optional graph exploration.
5. User testing and navigation consolidation.

## Final Design Test

Any future UI proposal should answer:

1. Does it make the next action clearer?
2. Does it preserve the user’s current context?
3. Does it explain why items are related?
4. Does it keep the archive culturally rich?
5. Does it avoid school, exam, and dashboard identity?

If it cannot answer all five, it should not enter implementation.
