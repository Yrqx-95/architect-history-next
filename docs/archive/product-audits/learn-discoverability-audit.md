# Archistory Learn Discoverability Audit

## Executive Diagnosis

Learn exists as a route and content system, but the production information architecture does not present it as a primary product.

The current navigation exposes Building Code and Glossary directly. Users therefore encounter two learning tools before they encounter the learning system that explains how those tools fit together.

The core problem is not absence of learning content. It is broken product framing:

`Archive content -> isolated tool -> isolated term`

instead of:

`Archive or Learn entry -> learning path -> stage -> term/topic -> related knowledge -> next step`

## Journey Tests

### Case A: Homepage

Question: Can a first-time user find Learn in under three seconds?

Production finding: No, not reliably.

- The homepage contains a learning section.
- Its primary visible choices are Building Code, Glossary, and Exam Preparation.
- It does not clearly present the `/learn` page as the learning center.
- Architecture Student is not the primary homepage route.
- Exam Preparation appears at equal card weight despite being incomplete and strategically secondary.

Users can find learning tools, but cannot clearly find the learning product.

### Case B: Building Detail

Question: Can a user discover Learn from a building?

Finding: Only indirectly.

- Building pages contain study-map and knowledge-network material.
- These modules demonstrate that buildings can teach concepts.
- The first viewport remains an archive-detail experience.
- The relationship to a named learning path is not obvious.
- There is no persistent or early “learn from this building” route into Architecture Student.

The content supports learning, but the product language does not consistently identify it as Learn.

### Case C: Glossary

Question: Can a user understand that Glossary belongs to Learn?

Finding: Partially.

- Glossary includes a route back to Learn.
- Deep-linked terms support progression from a learning path.
- Top navigation still presents Glossary as a peer of Explore and Timeline.

Users arriving from Learn understand the relationship. Users arriving from navigation can interpret Glossary as an independent encyclopedia.

### Case D: Code Topics

Question: Can a user understand that Building Code belongs to Learn?

Finding: Partially.

- Code pages link back to Learn.
- Related terms and topics support progression.
- Top navigation presents Building Code as a standalone top-level destination.
- Technical density and exam-adjacent content can dominate the broader archive-learning identity.

### Case E: Timeline

Question: Can a user discover Learn?

Finding: No clear route.

- Timeline is a strong knowledge-discovery surface.
- It connects periods, movements, architects, and buildings.
- It does not visibly translate historical exploration into a learning path or next lesson.

## Navigation Audit

Current production desktop navigation:

- Explore
- Building Code
- Glossary
- Timeline
- Search

Current production mobile structure:

- Explore
- Timeline
- Search
- Learn section containing Code and Glossary

Problems:

1. Learn is absent as a direct desktop destination.
2. Mobile uses “Learn” as a group label but does not link to the Learning Center.
3. Building Code and Glossary appear more important than their parent learning system.
4. Timeline appears top-level while Buildings and Architects are grouped under Explore.
5. Search is mixed with content destinations despite being a global utility.

## Recommended Information Architecture

### Transitional P0 Structure

Desktop:

- Learn
- Explore
- Building Code
- Glossary
- Timeline
- Search

This is intentionally conservative. It adds discoverability without immediately removing existing familiar links.

Mobile:

- Explore
- Timeline
- Search
- Learn
  - Learning Center
  - Building Code
  - Glossary

### Target Structure

Primary:

- Learn
- Explore
- Timeline
- Search

Learn:

- Architecture Student
- Learning Paths
- Core 100
- Building Code
- Glossary
- Learning Graph

Explore:

- Buildings
- Architects
- Styles
- Countries / Regions
- Movements

Search remains a global utility rather than a content family.

## P0 Recommendations

### P0.1 Add Direct Learn Entry

Add a visible `/[lang]/learn` entry to desktop and mobile navigation.

### P0.2 Make Homepage Path-First

Within the existing Learn section:

- Primary: Architecture Student.
- Secondary: Learning Center.
- Supporting tools: Building Code and Glossary.
- De-emphasize Exam Preparation.

### P0.3 Establish Parent-Child Language

Code and Glossary pages should visibly identify themselves as Learn tools through:

- breadcrumb or parent label
- back-to-Learn action
- consistent section language
- next learning step

### P0.4 Add Archive-to-Learn Bridges

On Building Detail, use existing learning-map data to present a clear learning action. Do not create a new route; connect to the relevant Learn stage or glossary term.

## P1 Recommendations

### P1.1 Move Code and Glossary Under Learn Conceptually

They may temporarily remain top-level links, but design and copy should establish them as components of Learn.

### P1.2 Add Timeline-to-Path Connections

Historical periods, movements, and buildings should link to the Architecture History Explorer path where relevant.

### P1.3 Preserve Learning Context

When moving from a path to a glossary or code topic, show:

- current path
- current stage
- related terms
- continue-learning target

### P1.4 Use Architecture Student as Default Start

The Learn page should not ask beginners to choose among equally weighted products before understanding the system.

## P2 Recommendations

### P2.1 Personalized Continuation Without Accounts

Use lightweight local state only if later approved:

- recently viewed stage
- last opened term
- continue learning

This should not require accounts or gamification.

### P2.2 Cross-Archive Learning Collections

Connect buildings, architects, terms, and periods through curated study collections.

## Success Criteria

- New users can identify Learn in under three seconds.
- Homepage offers one clear learning start.
- Code and Glossary are understood as Learn tools.
- Building and Timeline pages expose meaningful learning continuations.
- Architecture Student becomes the default learning route.
- The product retains archive identity and avoids an exam-preparation identity.
