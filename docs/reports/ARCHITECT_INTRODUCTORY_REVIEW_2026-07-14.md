# Architect introductory profile review — 2026-07-14

## Current status

This report began as a read-only review of the 24 production architects that
resolved to a `catalogArchitectProfile(...)` entry on PR #160. It now also
records the reviewed P0 data release and the first content-only promotion.

- PR #160 branch: `agent/expand-architect-content`, synchronized with
  `origin/main` at `da3b00c`
- Production snapshot: 148 architects, 942 buildings, 88 profiles, and 7,289
  building images
- Registered content overlays: 134
- Registry maturity after this batch: 95 overlays using the established
  reviewed default, 3 explicitly marked `reviewed`, and 36 marked
  `introductory`
- Production introductory set: 24 before this review; 21 after the three
  promotions in this batch
- Registered sources after this batch: 380 references across 372 unique URLs
- No database write is part of PR #160.

The introductory label is still doing real work. Several remaining profiles
are not merely short; their linked production records have localization,
date, source, or relationship gaps. They must not be promoted until the data
is repaired or a reviewed decision explicitly accepts the gap.

## P0 data batch — completed in production

The original P0 findings were prepared as a separate reviewed data batch,
merged through PR #162, and recorded through PR #163.

- Production migration: `20260714112158_architect_intro_p0_data_001`
- Reviewed production release: GitHub Actions run `29328686040`, successful
- Grafton Architects now has the reviewed Chinese identity
  `格拉夫顿建筑事务所` and an official source URL.
- Kingston University Town House now uses the canonical slug
  `kingston-university-town-house`, localized names, year `2020`, location,
  educational type, official source, and the correct Grafton relationship.
- Three confirmed wrong Town House image rows were removed. This building is
  intentionally left without an image rather than filled with an unsafe
  substitute.
- Toulouse School of Economics now has localized names, year `2019`,
  Toulouse/France metadata, the Grafton relationship, and its official source.
- MVRDV Book Mountain now uses the complete official project URL
  `https://www.mvrdv.com/projects/126/book-mountain` everywhere reviewed.
- The UNEMORI architect identity typo was corrected from `畷森泰行` to
  `畝森泰行` in Chinese and Japanese.
- Search vectors, old slug removal, old URL removal, row counts, RLS state,
  production routes, and API payloads were verified after the write.

Evidence:

- [Toulouse School of Economics: TSE Building](https://www.tse-fr.eu/tse-building)
- [Kingston University: Town House wins the 2021 Stirling Prize](https://www.kingston.ac.uk/about/news/kingston-universitys-flagship-town-house-building-wins-2021-riba-stirling-prize)
- [MVRDV: Book Mountain](https://www.mvrdv.com/projects/126/book-mountain)
- [UNEMORI ARCHITECTS: Profile](https://unemori-archi.com/?page_id=26)

This resolves the identified P0 data blockers. It does not by itself turn the
Grafton, MVRDV, or UNEMORI profile prose into reviewed content; those three
profiles remain introductory.

## First reviewed content batch — implemented on PR #160

The following three profiles now use explicit, multilingual content grounded
in official sources. Their representative works were checked against the
production architect-building relationships before promotion.

| Profile                                      | Production-linked representative works                                            | Sources | Decision   |
| -------------------------------------------- | --------------------------------------------------------------------------------- | ------: | ---------- |
| `mitsuru-senda-environment-design-institute` | `ishikawa-prefectural-library`; `nakajima-library-akita-international-university` |       4 | `reviewed` |
| `ryue-nishizawa`                             | `teshima-art-museum`; `towada-art-center`                                         |       3 | `reviewed` |
| `snohetta`                                   | `bibliotheca-alexandrina`; `oslo-opera-house`                                     |       4 | `reviewed` |

Review boundaries:

- Mitsuru Senda / Environment Design Institute is framed through its official
  child-environment research, integrated environmental-design scope, and
  `遊環構造`, with Ishikawa and Nakajima Library as the linked examples.
- Ryue Nishizawa's independent work is kept separate from SANAA authorship.
  The 2010 Pritzker Prize is described as recognition of the collaborative
  Sejima/Nishizawa practice, not as an individual project credit.
- Snøhetta is framed through its published dialogue-driven,
  transdisciplinary process and the public-ground strategies of Bibliotheca
  Alexandrina and Oslo Opera House, not as a fixed visual style.

Primary sources:

- [Environment Design Institute: Company profile](https://www.ms-edi.co.jp/company/)
- [Environment Design Institute: Ishikawa Prefectural Library](https://www.ms-edi.co.jp/topics/2039/)
- [Ishikawa Prefectural Library: About](https://www.library.pref.ishikawa.lg.jp/category/aboutlibrary/2983.html)
- [Akita International University: Nakajima Library](https://web.aiu.ac.jp/en/education/support/library/outline/)
- [Pritzker Prize: Kazuyo Sejima and Ryue Nishizawa](https://www.pritzkerprize.com/laureates/2010)
- [Benesse Art Site Naoshima: Teshima Art Museum](https://benesse-artsite.jp/en/art/teshima-artmuseum.html)
- [Towada Art Center: About](https://towadaartcenter.com/en/about/)
- [Snøhetta: About](https://www.snohetta.com/about)
- [Snøhetta: Process](https://www.snohetta.com/process)
- [Snøhetta: Bibliotheca Alexandrina](https://www.snohetta.com/projects/bibliotheca-alexandrina)
- [Snøhetta: Norwegian National Opera and Ballet](https://www.snohetta.com/projects/norwegian-national-opera-and-ballet)

## Remaining P1 data and relationship gaps

### Missing architect names

- `anna-heringer`: Chinese and Japanese names are empty.
- `pierre-chareau`: Chinese name is empty.
- `studio-mumbai`: Chinese and Japanese names are empty.

### No linked production buildings

- `studio-mumbai`
- `vo-trong-nghia`

These pages can exist as architect records, but the absence of linked works
limits navigation and prevents a production-grounded representative-work
review.

### Linked-building metadata gaps

- `anna-heringer`: METI Handmade School lacks Chinese/Japanese names and an
  official URL.
- `pierre-chareau`: both linked buildings lack Chinese/Japanese names and
  official URLs; the Beauvallon clubhouse also lacks a year.
- `geoffrey-bawa`: both linked buildings lack Chinese/Japanese names and
  official URLs; the Parliament building also lacks a year.
- `tod-williams-billie-tsien-architects`: both linked buildings lack
  Chinese/Japanese names, years, and official URLs.

## Status of the original 24 production introductory profiles

| Profile                                      | Linked works | Current assessment                                        | Next lane                       |
| -------------------------------------------- | -----------: | --------------------------------------------------------- | ------------------------------- |
| `grafton-architects`                         |            2 | P0 production data repaired; prose remains introductory   | Content review                  |
| `mvrdv`                                      |            3 | Book Mountain source repaired; prose remains introductory | Content review                  |
| `unemori-architects`                         |            1 | Identity typo repaired; prose remains introductory        | Content review                  |
| `anna-heringer`                              |            1 | Architect and building localization/source gaps           | P1 data repair                  |
| `pierre-chareau`                             |            2 | Architect name and building metadata gaps                 | P1 data repair                  |
| `studio-mumbai`                              |            0 | Missing names and no linked works                         | P1 identity/relationship review |
| `geoffrey-bawa`                              |            2 | Linked-building localization/year/source gaps             | P1 data repair                  |
| `tod-williams-billie-tsien-architects`       |            2 | Linked-building localization/year/source gaps             | P1 data repair                  |
| `vo-trong-nghia`                             |            0 | No linked works                                           | P1 relationship review          |
| `mitsuru-senda-environment-design-institute` |            2 | Sources and production relationships reviewed             | Completed in this batch         |
| `ryue-nishizawa`                             |            2 | Sources, authorship boundary, and relationships reviewed  | Completed in this batch         |
| `snohetta`                                   |            2 | Sources, process framing, and relationships reviewed      | Completed in this batch         |
| `adjaye-associates`                          |            1 | Linked record structurally complete                       | Later content review            |
| `ala-architects`                             |            1 | Linked record structurally complete                       | Later content review            |
| `alsop-stormer`                              |            1 | Linked record structurally complete                       | Later content review            |
| `civic-architects`                           |            1 | Linked record structurally complete                       | Later content review            |
| `coelacanth-associates-nagoya`               |            1 | Linked record structurally complete                       | Later content review            |
| `coelacanth-kh`                              |            1 | Linked record structurally complete                       | Later content review            |
| `kw-hg-architects`                           |            1 | Linked record structurally complete                       | Later content review            |
| `lundhagem-atelier-oslo`                     |            1 | Linked record structurally complete                       | Later content review            |
| `mari-ito-uao`                               |            1 | Linked record structurally complete                       | Later content review            |
| `mecanoo`                                    |            1 | Linked record structurally complete                       | Later content review            |
| `mikami-architects`                          |            1 | Linked record structurally complete                       | Later content review            |
| `schmidt-hammer-lassen`                      |            1 | Linked record structurally complete                       | Later content review            |

## Recommended sequence

1. Keep PR #160 draft. Push and verify the three-profile reviewed content
   batch, but do not treat that as approval for every other change in the PR.
2. Prepare the remaining P1 identity, localization, date, source, and
   relationship repairs as a separate review-first data lane.
3. Promote Grafton, MVRDV, and UNEMORI only after reviewing their profile prose;
   the production data fix alone is insufficient.
4. Review the remaining structurally complete profiles in small content-only
   batches, preserving the introductory label until each one is sourced.
5. Re-run the production-to-overlay comparison before PR #160 can leave draft.

## What this review does not establish

- It does not prove that every existing building image depicts the correct
  subject or has the best composition.
- It does not independently verify every sentence in the 95 established
  overlays that use the reviewed default.
- It does not define one global meaning for `year_start`. The TSE row now has
  a reviewed project-specific decision of `2019`, but that decision must not
  be generalized mechanically to every building.
- It does not approve the unreviewed remainder of PR #160.
- It does not authorize another production write or the merge of PR #160.
