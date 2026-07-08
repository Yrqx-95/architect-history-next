# Archistory Codex Rules

## Project Vision

Archistory is:

**Architecture Archive + Architecture Learning Platform**

It should help users discover architecture as cultural history and learn the
technical language needed to understand buildings, drawings, regulations, and
professional examinations.

### Target Users

- Architecture students
- Interior design students
- Architecture enthusiasts
- Second Class Architect candidates

## Product Principles

### 1. Archive First

Architecture, architects, works, periods, styles, and places remain the primary
editorial foundation. Learning features should deepen the archive rather than
turn the product into a generic course platform.

### 2. Learning Second

Learning tools should connect naturally to architectural examples. Explanations
must be useful for study without overwhelming browsing and editorial reading.

### 3. Multilingual

User-facing content must support Chinese, Japanese, and English. Japanese
technical terms and readings remain visible when they are necessary for
understanding Japanese architectural practice or examinations.

### 4. Source Traceable

Facts, legal references, images, and educational explanations must be
traceable. Official sources, government guides, editorial explanations, and
exam references must remain visibly distinct.

### 5. Exam Friendly

Learning content should support quick review, conceptual understanding, and
worked problem solving. It must not present educational summaries as binding
legal conclusions.

### 6. Mobile First

Core reading, diagrams, formulas, navigation, and learning sequences must work
at common mobile widths before desktop enhancements are added.

## UI Principles

### Do

- Put diagrams before dense explanation when spatial understanding matters.
- Prioritize reading stability and clear information hierarchy.
- Use simple, predictable interactions.
- Use subtle motion only when it clarifies section progression.
- Maintain high contrast for primary, secondary, and metadata text.
- Keep touch targets large and layouts resilient at mobile widths.

### Avoid

- Heavy glassmorphism
- Excessive blur
- Flashy animations
- Spring overload
- Parallax abuse
- Dashboard-like information density
- Scroll hijacking
- Motion that makes long-form reading unstable
- Decorative cards without a clear information purpose

## Learning System Principles

Every mature Code Topic should include:

1. Overview
2. Exam Snapshot
3. Diagram
4. Formula
5. Variables
6. Applicability
7. Calculation Steps
8. Worked Examples
9. Comparison Table
10. Exam Focus
11. Common Mistakes
12. Memory Tips
13. Required Terms
14. Next Topic
15. Related Topics
16. Sources

Code Topics must preserve a clear distinction between:

- Official source material
- Government guidance
- Archistory editorial explanation
- Exam-oriented reference notes
- Illustrative examples

Legal learning content must include an educational disclaimer and must not be
used as the sole basis for permit applications, design approval, or legal
determination.

## Glossary Rules

Japanese terminology is the canonical learning anchor.

Every glossary term should include:

- Japanese term
- Reading
- Chinese term
- English term
- Short definition in Chinese
- Short definition in Japanese
- Short definition in English

Definitions should be concise and should not duplicate full Code Topic
explanations.

The glossary should support:

- Search aliases
- Japanese readings
- English abbreviations
- Related terms
- Related Code Topics

Glossary links must preserve the user's current language while keeping the
Japanese term visible.

## Learning Path Rules

Archistory should support three canonical learning paths:

1. Absolute Beginner
2. Architecture Student
3. Second Class Architect Candidate

Each path should define:

- Ordered stages
- Learning goals
- Topic order
- Estimated study time
- Prerequisites
- Recommended next topics

Learning paths should reuse the shared learning graph. They must not create
duplicate topic content.

## Search Principles

Search should recognize:

- Japanese terms
- Japanese readings
- Chinese terms
- English terms
- Common abbreviations such as FAR and BCR
- Exam keywords

Search results should be grouped by:

- Code Topics
- Glossary
- Buildings
- Architects
- Styles
- Learning Paths

Search aliases should improve discovery without changing canonical titles or
creating duplicate content.

## Content Extraction Rules

When processing textbooks, class materials, PDFs, or other educational
references, never reproduce the source as a substitute for the original.

Extract only structured learning signals such as:

- Glossary terms
- Materials
- Furniture terminology
- Styles
- Drawing terms
- Exam concepts
- Formula variables
- Common mistakes
- Diagram requirements
- Source references

Generated content must use editorial paraphrase and retain enough attribution
for later review.

Do not:

- Copy complete textbook sections
- Store scanned pages
- Reproduce full exercises or answer sheets
- Build a question bank from copyrighted materials without permission
- Present extracted notes as verified legal interpretation

## Copyright Rules

No full textbook copying.

No scanned page reproduction.

No long quotations.

Use:

- Editorial paraphrase
- Terminology extraction
- Short compliant citation where necessary
- Page or section references
- Source attribution

Copyrighted learning materials should normally be registered as
`reference_only`. Their metadata may support private study, editorial
verification, and traceability, but their full contents must not be stored in
the repository.

## Review Workflow

### Draft

A topic may be marked `draft` when:

- The content structure is complete enough for educational use.
- Sources are recorded but may still require final article-level verification.
- Examples are clearly labeled as learning examples.
- The content does not claim legal authority.
- A reviewer and review date may be absent.

Draft content must visibly state that it is educational and unverified.

### Reviewed

A topic may be marked `reviewed` only when:

- Chinese, Japanese, and English versions have been checked for equivalent
  meaning.
- Formulas, examples, terminology, and cross-links are internally consistent.
- Source URLs and legal references have been manually checked.
- Common mistakes and exam notes have been reviewed against reliable teaching
  materials.
- A reviewer and review date are recorded.

Reviewed content is editorially checked but is still not legal advice.

### Verified

A topic may be marked `verified` only when:

- Every legal reference has been checked against the current official source.
- Article numbers, conditions, exceptions, and jurisdictional limitations have
  been confirmed.
- Educational summaries do not overstate the official rule.
- Diagrams and worked examples have been checked by a qualified reviewer.
- Multilingual versions have completed final review.
- Reviewer identity and last-reviewed date are recorded.

Verified status applies only to the reviewed content and date. It does not
guarantee that future legal amendments are already reflected.

## Change Discipline

- Prefer existing semantic color, spacing, typography, and component systems.
- Do not introduce a second implementation for an existing concept.
- Keep learning data separate from presentation code.
- Add optional fields when only some topics need deeper structures.
- Preserve existing routes and slugs unless a migration plan exists.
- Run lint and production build after implementation changes.
- Validate important user flows on mobile and desktop.
- Never commit secrets, local environment files, generated caches, or source
  materials that the repository is not licensed to distribute.
