# Archistory Homepage Learning Entry Audit

## Main Question

Can a first-time visitor understand:

- what Archistory is
- how to begin
- what to click next

## Current Production Answer

The homepage successfully communicates that Archistory is an architecture archive. It does not yet communicate with equal clarity that Archistory is a guided architecture learning product.

The archive identity is carried by:

- featured buildings
- architects
- timeline and styles
- imagery
- archive metrics and search

The Learn identity is carried by one section containing:

- Building Code
- Glossary
- Exam Preparation

This presents learning tools rather than a learning journey.

## Three-Second Test

### What the site communicates

“This is a broad, visually curated architecture archive.”

### What remains unclear

- Where should a learner start?
- Is Learn a destination?
- Is Building Code the main product?
- Is the site preparing users for an exam?
- How do buildings, vocabulary, history, and code connect?

### Likely next clicks

Users are more likely to:

- search
- open a featured building
- open Building Code
- open Glossary

They are less likely to discover the Architecture Student path because it is not the visible primary CTA on the production homepage.

## Current Learn Section Audit

### Strengths

- It appears before deeper archive sections.
- The section title signals an intended start.
- The three-card structure is easy to scan.
- Code and Glossary are functional destinations.

### Problems

1. The section has no clear link to the Learning Center.
2. Architecture Student is absent.
3. Exam Preparation receives equal visual weight despite being incomplete.
4. Cards describe tools, not progression.
5. The section does not explain how learning connects to the archive.

## Recommended Entry Design

Modify only the existing Learn section.

### Primary Action

**Architecture Student**

Purpose:

- give the user one recommended route
- communicate that learning is guided
- connect drawing, structure, materials, planning, and code

Destination:

`/[lang]/learn#architecture-student`

### Secondary Action

**Explore the Learning Center**

Purpose:

- show all current paths
- explain the broader learning system

Destination:

`/[lang]/learn`

### Supporting Tools

- Building Code
- Glossary

These should be visually lighter than the primary route.

### Secondary Paths

- Absolute Beginner
- Architecture History Explorer

They may be listed or linked, but Architecture Student should remain primary.

### Exam Preparation

Do not remove the underlying data. On the homepage:

- remove equal-route status
- place it as a future or supporting capability
- avoid leading with licensing or test language

## Recommended Copy Direction

The section should communicate:

“Start with a guided architecture path, then use the archive, glossary, and code topics as connected learning material.”

Avoid:

- “prepare for the exam”
- “master questions”
- “test your score”
- “complete modules”

Prefer:

- “read buildings”
- “connect concepts”
- “follow a study route”
- “explore terms through real works”
- “continue through the archive”

## Hierarchy Outline

1. Section label: Learn
2. Heading: Start with Architecture Student
3. Short explanation of the Architecture Learning Archive
4. Primary CTA: Start Architecture Student
5. Secondary CTA: Open Learning Center
6. Lightweight links: Building Code, Glossary
7. Optional secondary path labels

## P0

- Add direct Learn and Architecture Student links.
- Make Architecture Student visually primary.
- De-emphasize Exam Preparation.
- Localize all visible copy in `ja`, `zh`, and `en`.
- Preserve the current section position and homepage layout.

## P1

- Add one example of the learning loop:
  - stage
  - term
  - building
- Connect homepage topic links to the relevant Architecture Student stage where possible.
- Add clearer archive-to-learning language.

## P2

- Test first-time comprehension and CTA selection.
- Explore lightweight “continue learning” state.
- Personalize suggested start only after the default route is proven.

## Success Criteria

- A first-time user identifies a learning start within three seconds.
- Architecture Student receives the most clicks in the Learn section.
- Users understand that Code and Glossary support the path.
- Homepage still feels like an architecture archive.
- Exam preparation does not dominate product identity.
