# Archistory Visual Consistency Audit

## Scope and Method

This audit reviews the current product structure and implementation for:

- Homepage
- Building Detail
- Architect Detail
- Glossary
- Code Topics
- Timeline
- Explore
- Learn

The review focuses on layout, typography, spacing, density, alignment, and the consistency of visual surfaces. It does not propose a full redesign.

## Executive Diagnosis

Archistory does not have a single visual-quality problem. It has a page-archetype problem.

The site currently mixes at least four interface models:

1. Editorial archive pages with large images and asymmetrical composition.
2. Dense archive indexes with many small links and records.
3. Learning pages with stages, cards, terms, and progression.
4. Reference pages with long-form technical content.

Each model is individually understandable, but the rules connecting them are not explicit. This creates the user impression that some pages are spacious and finished while others are crowded, database-like, or incomplete.

## Measured System Inconsistencies

### Width System

- Global layout uses `--container-wide: 80rem`.
- `PageShell` defaults to `--container-content: 64rem`.
- Timeline and Explore override the shell with `!max-w-[86rem]`.
- Code articles return to a narrow reading column.
- Building and Architect details use different multi-column compositions within the same global frame.

The result is visible edge drift between pages. Navigation, page titles, content grids, and lower sections do not consistently share a left or right alignment.

### Spacing System

The code defines spacing tokens, but section utilities use separate Tailwind margins:

- `.section-sm`: `mb-7 sm:mb-10`
- `.section`: `mb-12 sm:mb-16`
- `.section-lg`: `mb-16 sm:mb-24`

Pages then add their own borders, padding, grid gaps, and internal margins. This produces compound spacing that is difficult to predict. Large hero-to-content gaps and compressed card interiors can appear on the same page.

### Surface System

The site uses:

- `bg-surface`
- `bg-surface-muted`
- `bg-surface-raised`
- semantic borders
- card shadows

These surfaces do not yet have clear functional roles. A muted surface may represent a section background, a card, a selected state, or a placeholder. This weakens hierarchy and contributed to the Learn path cards appearing visually inconsistent.

## Page Findings

### Homepage

Strengths:

- Strong archive identity.
- Editorial imagery gives the site cultural authority.
- Featured content has more visual character than a conventional database.

Problems:

- The page alternates between editorial compositions, card grids, pills, lists, and metric bands without a stable section rhythm.
- The Learn section uses a tool-card pattern that does not visually establish a primary learning route.
- Several equally weighted sections make it difficult to identify the intended next action.
- Information density changes abruptly between sparse section headings and dense link collections.

### Building Detail

Strengths:

- Good use of imagery and factual context.
- Sticky metadata supports reference use.
- Learning-map and related-content modules create meaningful depth.

Problems:

- The page moves from gallery to metadata, narrative, learning map, knowledge network, sources, and related buildings without a consistent section header grammar.
- The initial detail layout and later learning modules do not share a common grid.
- Learning content arrives too late to shape the first impression.
- Long pages need stronger progress and context preservation.

### Architect Detail

Strengths:

- Editorial 12-column composition suits portrait-led storytelling.
- Chronology and works sections support archive exploration.

Problems:

- The hero architecture differs substantially from Building Detail even though both are entity pages.
- Section density fluctuates between open editorial areas and compact data lists.
- Reusable entity-detail alignments are not obvious.

### Glossary

Strengths:

- Search and category controls fit the task.
- Two-column term presentation improves scan speed on large screens.
- Deep-linked terms support learning flows.

Problems:

- It reads primarily as an index tool, not clearly as part of a learning system.
- Search controls, term groups, and selected-term treatment compete at similar visual weight.
- The page is denser than Learn but lacks a clear transition explaining the relationship.

### Code Topics

Strengths:

- Narrow reading width is appropriate for technical explanations.
- Formulas, examples, verification notes, and related topics support serious study.

Problems:

- Long pages become highly dense and reference-like.
- Repeated article blocks can create a textbook or exam-preparation impression.
- Next-step guidance appears after substantial reading rather than being continuously available.
- Code index and Code detail do not yet feel like stages within the same learning product.

### Timeline

Strengths:

- The timeline is a distinctive archive-exploration surface.
- Period, decade, movement, and building relationships create rich context.

Problems:

- The 86rem override produces different page edges from most of the site.
- Multiple rails, metrics, period summaries, and decade indexes create high simultaneous density.
- The page asks users to understand several historical navigation systems at once.
- Learning entry points are not visually separated from archive navigation.

### Explore

Strengths:

- Broad access to buildings, architects, styles, countries, and historical structures.
- Appropriate breadth for an archive product.

Problems:

- The page behaves like a directory of directories.
- Multiple sections use similar border and text treatments, so importance is hard to infer.
- Dense link collections can feel database-like rather than curated.
- The 86rem layout is not consistently shared with related archive pages.

### Learn

Strengths:

- Three paths communicate distinct audiences.
- Architecture Student has the strongest product potential.
- Stage-to-term links begin to connect paths with the glossary.

Problems:

- The primary path and description-only paths use nearly the same structural language.
- Stage cards can feel heavy when each contains labels, chips, and repeated glossary groups.
- Large differences in stage count create uneven path height and white space.
- Path color and surface variation previously made the three routes feel like separate systems.

## Density Map

| Page | Information Density | White-Space Density | Main Risk |
|---|---:|---:|---|
| Homepage | Medium-high | Medium | Too many equal sections |
| Building Detail | High | Medium | Long journey without persistent orientation |
| Architect Detail | Medium-high | Medium-high | Entity pages feel structurally unrelated |
| Glossary | High | Low-medium | Tool feels detached from Learn |
| Code Index | Medium | Medium | Category hierarchy needs stronger learning context |
| Code Detail | Very high | Low | Textbook/exam-prep feeling |
| Timeline | Very high | Low-medium | Too many simultaneous navigation models |
| Explore | High | Low-medium | Directory/database feeling |
| Learn | Medium | Medium-high | Uneven path weights and card repetition |

## P0 Findings

### P0.1 Define Four Page Archetypes

Create explicit layout rules for:

- Archive landing
- Entity detail
- Learning landing/path
- Reference/tool

Each archetype needs one standard maximum width, title alignment, section rhythm, and density target.

### P0.2 Normalize Width and Alignment

Resolve the current 64rem, 80rem, and 86rem competition. Pages may have different widths, but the relationship must be intentional:

- Shared outer page edge.
- Shared title edge.
- Shared reading-column width.
- Predictable sidebar width.

### P0.3 Establish Surface Roles

Assign each semantic surface one job:

- Page background
- Section band
- Interactive item
- Selected/highlighted item
- Raised overlay

Do not use card backgrounds merely to fill empty space.

### P0.4 Normalize Section Rhythm

Define a small section-spacing scale and prevent each page from combining independent margins and padding without rules. A section should have a predictable relationship between:

- eyebrow
- title
- description
- action
- content
- next section

## P1 Findings

### P1.1 Shared Entity Detail Framework

Building and Architect pages should retain distinct content while sharing:

- breadcrumb alignment
- title baseline
- metadata placement
- section headings
- related-content footer

### P1.2 Density Rules by Task

- Archive indexes: compact, highly scannable.
- Learning paths: moderate density, obvious progression.
- Reference articles: calm reading column with persistent context.
- Editorial details: image-led but not excessively sparse.

### P1.3 Standardize Stage and Term Presentation

Recommended terms should read as lightweight learning links, not nested cards inside large cards. Repeated labels should be reduced where context is already clear.

### P1.4 Standardize Sidebars

Sticky metadata, filters, and learning outlines should use a consistent width and top offset. Sidebars should not begin at unrelated vertical positions.

## P2 Findings

### P2.1 Visual QA Checklist

For every page:

- Verify title and content edges.
- Compare top and bottom section spacing.
- Check narrow, standard, and wide desktop widths.
- Check density in Japanese, Chinese, and English.
- Check light and dark system themes.

### P2.2 Component Usage Documentation

Document when to use:

- plain sections
- cards
- border lists
- chips
- pills
- metrics
- sticky sidebars

### P2.3 Content-Length Stress Tests

Use long Japanese and English labels to identify wrapping, empty columns, and uneven card heights before release.

## Recommended Order

1. Define archetypes and width rules.
2. Normalize section rhythm and surface semantics.
3. Align Learn, Glossary, and Code as one visual family.
4. Align Building and Architect detail foundations.
5. Reduce Timeline and Explore density through hierarchy, not content removal.
6. Add repeatable visual QA.

## What Not to Change

- Do not remove archive depth.
- Do not turn all pages into uniform cards.
- Do not make learning pages resemble exam dashboards.
- Do not flatten Building and Architect pages into identical templates.
- Do not solve density by hiding valuable content without providing another discovery path.
