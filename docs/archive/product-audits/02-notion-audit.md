# Notion Audit

Research date: June 7, 2026
Observed URLs:

- https://www.notion.so (redirected to https://www.notion.com/ja)
- https://www.notion.com/help/guides (localized to `/ja/help/guides`)

## Screenshot Evidence

![Notion homepage](evidence/benchmark/notion-home.png)

Observed at: https://www.notion.com/ja

The homepage uses one large proposition, short supporting copy, and clear primary/secondary actions before introducing product families.

![Notion guides](evidence/benchmark/notion-guides.png)

Observed at: https://www.notion.com/ja/help/guides

The guide index establishes hierarchy in this order: breadcrumb, search, page title, description, divider, topic filter, article list.

## A. Navigation Audit

### Observed

- Mobile public navigation is reduced to logo, one primary signup action, and menu.
- The guide page uses breadcrumbs to preserve parent context.
- Search appears before the guide index because retrieval is a primary task.
- Topic filtering is secondary to search and title.

### Assessment

Notion does not expose every product area in the first row. It gives the current page a strong local hierarchy and uses menus, breadcrumbs, and search for depth.

## B. Homepage Audit

### Three-second message

“Notion is an integrated workspace with AI assistance.”

### Next action

- Start free.
- Request a demo.
- Continue to a specific product capability.

### Density

The homepage is long, but each viewport normally contains one idea. Density accumulates vertically rather than being presented simultaneously.

## C. Layout System Audit

### Observed

- Large headings use short supporting paragraphs.
- Content is grouped into clear bands.
- Cards are used for product families and guides, but broad sections remain unframed.
- The guide index has generous outer margins and compact internal typography.
- Search, filters, titles, descriptions, and reading time have distinct visual roles.

### Why it does not feel empty

White space is anchored by recognizable structure: breadcrumb, search, title, illustration, divider, filter, and content. Empty space is not unassigned.

## D. Learning Experience Audit

Notion’s guides are not a course, but they demonstrate:

- topic-based filtering
- task-oriented titles
- short summaries
- reading-time expectations
- search-first retrieval

The system supports self-directed learning rather than prescribed sequence.

## E. Knowledge Architecture Audit

Notion treats knowledge as pages within navigable contexts. Breadcrumbs and topic taxonomies preserve location. Search acts as a cross-cutting retrieval layer.

The key pattern is a consistent document grammar: title, explanation, blocks, links, and related material.

## Archistory Comparison

### Can Copy

- Breadcrumbs for Learn > Path > Stage > Term.
- Stable content-block spacing.
- Search-first glossary presentation.
- Short descriptions and reading-time or estimated-time metadata.
- Clear separation of page title, controls, and content.

### Should Adapt

- Use Notion-like content calm for Code and Glossary pages.
- Establish a repeatable knowledge-page grammar for terms, topics, buildings, and architects.
- Use progressive disclosure for dense related material.
- Keep a local outline on long Code pages.

### Should Avoid

- Generic workspace styling.
- User-configurable blank canvases.
- Deep nesting without editorial curation.
- Excessive card grids on content indexes.
- AI-first framing.

## Main Lesson

Notion’s value for Archistory is not its visual minimalism alone. It is the way every empty area belongs to a readable document hierarchy.
