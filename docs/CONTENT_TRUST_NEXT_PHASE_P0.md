# Content Trust Next Phase — P0 Baseline

Generated: 2026-07-13T07:25:05.820Z
Baseline commit: `1e369888680245aa637dddabdf886cf9a7930af0`

## Decision

P0 uses two equal lanes: 25 trust-repair records and 25 product-core records. This avoids spending the whole cycle on obscure incomplete rows or only polishing already-visible pages.

## Baseline

- Architects / buildings / images: 149 / 942 / 7291
- Data errors / warnings / info: 0 / 927 / 2624
- Graduation problems: 0
- Buildings missing source metadata: 38
- Buildings missing source text: 806
- Buildings marked as using display fallback: 942
- Formal building content overlays: 139
- Q-ID slug records quarantined outside the Top 50: 109

The source metrics are intentionally separate. Missing source metadata means the record lacks an overlay and official/Wikipedia/Wikidata pointers. Missing source text means the database lacks substantive building text. Neither count alone proves that a public page is false.
Q-ID slugs are kept in a separate identity quarantine and do not consume the Top 50 core-building capacity.

## First Reviewed Batch Candidate

These eight records combine current homepage/learning exposure with measurable content risk. The image flag is only a filename heuristic and cannot approve or reject an image.

| Slug | Building | Main reasons | Image check |
|---|---|---|---|
| `parc1` | Parc1 | missing-source-text, missing-type, missing-zh-content, missing-ja-content, missing-en-content, thin-description, thin-significance, homepage-image-identity-manual-review | 需人工审片 |
| `l-arbre-blanc` | L'Arbre Blanc | missing-source-metadata, missing-zh-content, missing-ja-content, missing-en-content, thin-description, thin-significance, homepage-image-identity-manual-review | 需人工审片 |
| `3-world-trade-center` | 3 World Trade Center | missing-source-text, missing-type, missing-zh-content, missing-ja-content, missing-en-content, thin-description, thin-significance, homepage-image-identity-manual-review | 需人工审片 |
| `reinhard-ernst-museum` | Reinhard Ernst Museum | missing-source-text, missing-zh-content, missing-ja-content, missing-en-content, thin-description, thin-significance | 无自动图片警报 |
| `marsk-tower` | Marsk Tower | missing-source-metadata, missing-zh-content, missing-ja-content, missing-en-content, thin-description, thin-significance | 无自动图片警报 |
| `apple-park` | Apple Park | missing-en-content, thin-description, thin-significance | 无自动图片警报 |
| `national-museum-of-western-art` | National Museum of Western Art | missing-source-text, missing-era, missing-zh-content, missing-ja-content, missing-en-content, thin-description, thin-significance | 无自动图片警报 |
| `fallingwater` | Fallingwater | missing-en-content, thin-description, thin-significance | 无自动图片警报 |

Before any content write, perform read-only identity, source, current-image, photographer, and license review for this batch. Split or reject records rather than lowering evidence standards.

## Top 50 Queue

| Rank | Lane | Slug | Score | Risk reasons | Product signals |
|---:|---|---|---:|---|---|
| 1 | trust-repair | `3-world-trade-center` | 40 | missing-source-text, missing-type, missing-zh-content, missing-ja-content, missing-en-content, thin-description, thin-significance, homepage-image-identity-manual-review | homepage-featured-12, architect-reading-reference-1 |
| 2 | trust-repair | `parc1` | 38 | missing-source-text, missing-type, missing-zh-content, missing-ja-content, missing-en-content, thin-description, thin-significance, homepage-image-identity-manual-review | homepage-featured-3 |
| 3 | trust-repair | `l-arbre-blanc` | 34 | missing-source-metadata, missing-zh-content, missing-ja-content, missing-en-content, thin-description, thin-significance, homepage-image-identity-manual-review | homepage-featured-5 |
| 4 | product-core | `national-stadium-tokyo` | 30 | missing-source-metadata, missing-zh-content, missing-ja-content, missing-en-content, thin-description, thin-significance | homepage-featured-6, graduation-linked, architect-reading-reference-1 |
| 5 | product-core | `apple-park` | 29 | missing-en-content, thin-description, thin-significance | homepage-featured-13, code-topic-example, architect-reading-reference-1, formal-content-overlay |
| 6 | product-core | `national-museum-of-western-art` | 28 | missing-source-text, missing-era, missing-zh-content, missing-ja-content, missing-en-content, thin-description, thin-significance | learning-path, architect-reading-reference-1 |
| 7 | product-core | `torres-atrio` | 28 | missing-source-text, missing-type, missing-zh-content, missing-ja-content, missing-en-content, thin-description, thin-significance | homepage-featured-8 |
| 8 | product-core | `james-simon-gallery` | 27 | missing-source-text, missing-zh-content, missing-ja-content, missing-en-content, thin-description, thin-significance | homepage-featured-10, architect-reading-reference-1 |
| 9 | product-core | `reinhard-ernst-museum` | 27 | missing-source-text, missing-zh-content, missing-ja-content, missing-en-content, thin-description, thin-significance | homepage-featured-1, architect-reading-reference-1 |
| 10 | product-core | `fallingwater` | 27 | missing-en-content, thin-description, thin-significance | learning-path, code-topic-example, architect-reading-reference-1, formal-content-overlay |
| 11 | product-core | `rose-seidler-house` | 26 | missing-source-text, missing-era, missing-en-content, thin-description, thin-significance | code-topic-example, architect-reading-reference-1, formal-content-overlay |
| 12 | product-core | `mt-fuji-center` | 26 | missing-source-metadata, missing-zh-content, missing-ja-content, missing-en-content, thin-description, thin-significance | homepage-featured-14, architect-reading-reference-1 |
| 13 | product-core | `capela-do-monte` | 25 | missing-source-text, missing-zh-content, missing-ja-content, missing-en-content, thin-description, thin-significance | homepage-featured-11 |
| 14 | product-core | `one-monte-carlo` | 25 | missing-source-text, missing-zh-content, missing-ja-content, missing-en-content, thin-description, thin-significance | homepage-featured-7 |
| 15 | product-core | `villa-mairea` | 25 | missing-source-text, missing-en-content, thin-description, thin-significance | learning-path, architect-reading-reference-1, formal-content-overlay |
| 16 | product-core | `copenhill` | 25 | missing-en-content, thin-description, thin-significance | homepage-featured-4, graduation-linked, architect-reading-reference-1, formal-content-overlay |
| 17 | product-core | `marsk-tower` | 24 | missing-source-metadata, missing-zh-content, missing-ja-content, missing-en-content, thin-description, thin-significance | homepage-featured-2 |
| 18 | product-core | `sesc-pompeia` | 22 | missing-source-text, missing-era, missing-en-content, thin-description, thin-significance | graduation-linked, architect-reading-reference-1, formal-content-overlay |
| 19 | trust-repair | `ameritrust-tower` | 21 | missing-source-text, missing-era, missing-type, missing-country, missing-zh-content, missing-ja-content, missing-en-content, thin-description, thin-significance | — |
| 20 | trust-repair | `coolsingeltoren` | 21 | missing-source-text, missing-era, missing-type, missing-country, missing-zh-content, missing-ja-content, missing-en-content, thin-description, thin-significance | — |
| 21 | trust-repair | `crematorium-uitzicht` | 21 | missing-source-text, missing-era, missing-type, missing-country, missing-zh-content, missing-ja-content, missing-en-content, thin-description, thin-significance | — |
| 22 | trust-repair | `dentsu-osaka-office` | 21 | missing-source-text, missing-era, missing-type, missing-country, missing-zh-content, missing-ja-content, missing-en-content, thin-description, thin-significance | — |
| 23 | trust-repair | `ferry-house` | 21 | missing-source-text, missing-era, missing-type, missing-country, missing-zh-content, missing-ja-content, missing-en-content, thin-description, thin-significance | — |
| 24 | trust-repair | `grollo-tower` | 21 | missing-source-text, missing-era, missing-type, missing-country, missing-zh-content, missing-ja-content, missing-en-content, thin-description, thin-significance | — |
| 25 | trust-repair | `harting-vertriebsgebaude` | 21 | missing-source-text, missing-era, missing-type, missing-country, missing-zh-content, missing-ja-content, missing-en-content, thin-description, thin-significance | — |
| 26 | trust-repair | `museum-of-transport-and-communications` | 21 | missing-source-text, missing-era, missing-type, missing-country, missing-zh-content, missing-ja-content, missing-en-content, thin-description, thin-significance | — |
| 27 | trust-repair | `palazzo-donnaregina` | 21 | missing-source-text, missing-era, missing-type, missing-country, missing-zh-content, missing-ja-content, missing-en-content, thin-description, thin-significance | — |
| 28 | trust-repair | `the-modulightor-building` | 21 | missing-source-text, missing-era, missing-type, missing-country, missing-zh-content, missing-ja-content, missing-en-content, thin-description, thin-significance | — |
| 29 | trust-repair | `4-world-trade-center` | 21 | missing-source-text, missing-era, missing-type, missing-zh-content, missing-ja-content, missing-en-content, thin-description, thin-significance | architect-reading-reference-1 |
| 30 | trust-repair | `australia-square` | 21 | missing-source-text, missing-era, missing-type, missing-zh-content, missing-ja-content, missing-en-content, thin-description, thin-significance | architect-reading-reference-1 |
| 31 | trust-repair | `casa-das-historias-paula-rego` | 21 | missing-source-text, missing-era, missing-type, missing-zh-content, missing-ja-content, missing-en-content, thin-description, thin-significance | architect-reading-reference-1 |
| 32 | trust-repair | `casa-de-cha-da-boa` | 21 | missing-source-text, missing-era, missing-type, missing-zh-content, missing-ja-content, missing-en-content, thin-description, thin-significance | architect-reading-reference-1 |
| 33 | trust-repair | `creative-arts-center-colgate-university` | 21 | missing-source-text, missing-era, missing-type, missing-zh-content, missing-ja-content, missing-en-content, thin-description, thin-significance | architect-reading-reference-1 |
| 34 | trust-repair | `lever-house` | 21 | missing-source-text, missing-era, missing-type, missing-zh-content, missing-ja-content, missing-en-content, thin-description, thin-significance | architect-reading-reference-1 |
| 35 | trust-repair | `taro-okamoto-memorial-museum` | 21 | missing-source-text, missing-era, missing-type, missing-zh-content, missing-ja-content, missing-en-content, thin-description, thin-significance | architect-reading-reference-1 |
| 36 | product-core | `fondazione-querini-stampalia` | 21 | missing-source-text, missing-era, missing-type, missing-en-content, thin-description, thin-significance | architect-reading-reference-1, formal-content-overlay |
| 37 | product-core | `olivetti-exhibition-centre-in-venice` | 21 | missing-source-text, missing-era, missing-type, missing-en-content, thin-description, thin-significance | architect-reading-reference-1, formal-content-overlay |
| 38 | product-core | `yale-art-and-architecture-building` | 21 | missing-source-text, missing-era, missing-type, missing-en-content, thin-description, thin-significance | architect-reading-reference-1, formal-content-overlay |
| 39 | product-core | `tate-modern` | 21 | missing-source-metadata, missing-era, missing-zh-content, missing-ja-content, missing-en-content, thin-description, thin-significance | graduation-linked, architect-reading-reference-1 |
| 40 | product-core | `3331-arts-chiyoda` | 20 | missing-source-text, missing-era, missing-zh-content, missing-ja-content, missing-en-content, thin-description, thin-significance | graduation-linked |
| 41 | product-core | `acros-fukuoka` | 20 | missing-source-text, missing-era, missing-zh-content, missing-ja-content, missing-en-content, thin-description, thin-significance | graduation-linked |
| 42 | product-core | `bibliotheca-alexandrina` | 20 | missing-source-text, missing-era, missing-zh-content, missing-ja-content, missing-en-content, thin-description, thin-significance | graduation-linked |
| 43 | product-core | `casa-gilardi` | 20 | missing-source-text, missing-era, missing-country, missing-en-content, thin-description, thin-significance | architect-reading-reference-1, formal-content-overlay |
| 44 | product-core | `cuadra-san-cristobal` | 20 | missing-source-text, missing-type, missing-country, missing-en-content, thin-description, thin-significance | architect-reading-reference-1, formal-content-overlay |
| 45 | product-core | `beijing-daxing-airport` | 20 | missing-en-content, thin-description | homepage-featured-9, architect-reading-reference-1, formal-content-overlay |
| 46 | trust-repair | `1-spring-street` | 19 | missing-source-text, missing-era, missing-type, missing-zh-content, missing-ja-content, missing-en-content, thin-description, thin-significance | — |
| 47 | trust-repair | `20-times-square` | 19 | missing-source-text, missing-era, missing-type, missing-zh-content, missing-ja-content, missing-en-content, thin-description, thin-significance | — |
| 48 | trust-repair | `25th-of-april-society-headquarters` | 19 | missing-source-text, missing-era, missing-type, missing-zh-content, missing-ja-content, missing-en-content, thin-description, thin-significance | — |
| 49 | trust-repair | `51-astor-place` | 19 | missing-source-text, missing-era, missing-type, missing-zh-content, missing-ja-content, missing-en-content, thin-description, thin-significance | — |
| 50 | trust-repair | `aaltoalvari` | 19 | missing-source-text, missing-era, missing-type, missing-zh-content, missing-ja-content, missing-en-content, thin-description, thin-significance | — |

## Execution Rules

1. Do not reopen G6–G10 or the 51 evidence-gap graduation records without new reliable open-license evidence.
2. Work in batches of 5–10: read-only investigation → reviewed decision → isolated dry-run when data changes are required → conflict check → guarded migration → write verification → PR → Reviewed production release → live verification.
3. Do not bulk-generate multilingual prose to reduce warning counts.
4. Do not treat fallback text as source-backed content.
5. Do not treat the homepage image heuristic as proof; inspect the actual image and its source page.

## Open Questions

- No production traffic or search-query analytics were available, so product exposure is inferred from current homepage, learning-path, code-topic, graduation, and architect-reading references.
- English overlay content currently falls back to Chinese in the overlay helper; the queue treats missing English as real work, but translation policy must be reviewed before bulk changes.
- The 942 fallback count describes display behavior, not 942 confirmed false or empty pages.

Machine-readable packet: `db/review-packets/content-trust-top-050.json`
