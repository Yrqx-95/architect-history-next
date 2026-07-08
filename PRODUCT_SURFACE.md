# Product Surface

Last updated: 2026-06-10

Purpose: list only the pages and routes users can actually see. Experiments and reports are intentionally excluded.

## Public Pages

| Surface | Route | User Value |
|---|---|---|
| Home | `/[lang]` | Entry point into featured architecture, learning, browsing, and search |
| Building Detail | `/[lang]/building/[slug]` | Learn about a specific building, its images, metadata, context, and related items |
| Architect Detail | `/[lang]/architect/[slug]` | Learn about an architect, representative works, biography/context, and relationships |
| Search | `/[lang]/search` | Find buildings, architects, cities, countries, styles, and learning-related terms |
| Browse Index | `/[lang]/browse` | Entry point for archive browsing |
| Buildings Browse | `/[lang]/browse/buildings` | Browse building records |
| Architects Browse | `/[lang]/browse/architects` | Browse architect records |
| Country Index | `/[lang]/browse/country` | Browse countries/regions |
| Country Page | `/[lang]/browse/country/[slug]` | Browse buildings by country/region |
| Type Page | `/[lang]/browse/type/[slug]` | Browse buildings by building type |
| Style Index | `/[lang]/browse/style` | Browse architectural styles |
| Style Page | `/[lang]/browse/style/[slug]` | Browse buildings by style |
| Era Page | `/[lang]/browse/era/[slug]` | Browse buildings by era |
| Learn | `/[lang]/learn` | Study-oriented entry point for concepts and learning paths |
| Learning Paths Index | `/[lang]/paths` | Browse learning paths |
| Learning Path Detail | `/[lang]/paths/[slug]` | Study one learning path |
| Timeline | `/[lang]/timeline` | Explore architecture chronologically |
| Glossary | `/[lang]/glossary` | Learn architecture terms |
| Code Index | `/[lang]/code` | Browse architecture/code learning topics |
| Code Topic | `/[lang]/code/[slug]` | Learn a specific code/topic concept |
| Graph | `/[lang]/graph` | Relationship graph entry |
| Map | `/[lang]/map` | Geographic/archive map entry |
| Feedback | `/[lang]/feedback` | Feedback/contact page |

## API Surfaces

| Surface | Route | User-Facing Role |
|---|---|---|
| Search API | `/api/search` | Powers search results |
| Image Proxy API | `/api/image-proxy` | Safely proxies allowed remote images |

## Language Handling

- Root `/` redirects to a language route.
- Supported languages: `zh`, `en`, `ja`.
- Chinese script toggle exists for simplified/traditional display.

## Not Product Surface

- Root-level or archived Markdown reports.
- Learning experiment reports.
- Dry-run/write reports.
- Data governance review packs.
- Benchmark evidence screenshots.
- Temporary files.
