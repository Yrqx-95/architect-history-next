# Architect introductory profile review — 2026-07-14

## Scope

This is a read-only review of the production architects that resolve to a
`catalogArchitectProfile(...)` entry on PR #160.

- Branch baseline: `agent/expand-architect-content` at `357b012`
- Production snapshot: 148 architects and 942 buildings
- Registered content overlays: 134
- Introductory overlays present in production: 24
- Source set: 146 references across 142 unique URLs; 136 ordinary-request
  successes and 6 access-limited pages individually opened; 0 unconfirmed
- No database write was performed.

The introductory label is doing real work. Several profiles are not merely
short; their linked production records still have identity, localization,
date, or source gaps. Those records must not be promoted to reviewed content
until the underlying data is fixed or explicitly accepted.

## Confirmed blockers

### P0 — Grafton Architects identity and year repair

- The architect record has no Chinese name.
- `toulouse-school-of-economics` has no Chinese or Japanese name and no
  official URL. Its `year_start` is `2006`, while the official TSE material
  describes the new Grafton building as opening around 2019–2020. The year
  field needs a semantic decision before correction; it must not be changed
  mechanically.
- `q135641257` is a raw imported identity with no localized name, year, or
  official URL. Wikidata identifies it as Kingston University Town House;
  Kingston University records that the building opened in January 2020.

Evidence:

- [Toulouse School of Economics: TSE Building](https://www.tse-fr.eu/tse-building)
- [Kingston University: Town House wins the 2021 Stirling Prize](https://www.kingston.ac.uk/about/news/kingston-universitys-flagship-town-house-building-wins-2021-riba-stirling-prize)
- [Wikidata Q135641257](https://www.wikidata.org/wiki/Q135641257)

### P0 — MVRDV Book Mountain source repair

`book-mountain-spijkenisse` currently stores the truncated official URL
`https://www.mvrdv.com/projects/126/book-`. The verified project page is:

- [MVRDV: Book Mountain](https://www.mvrdv.com/projects/126/book-mountain)

The other two linked MVRDV records have names, years, and official URLs.

### P0 — UNEMORI architect-name typo

The production architect record uses `畷森泰行` in Chinese and Japanese. The
practice's official profile and company name use `畝森泰行` (Hiroyuki
Unemori). This is an identity typo, not a translation preference.

- [UNEMORI ARCHITECTS: Profile](https://unemori-archi.com/?page_id=26)

### P1 — Missing architect names

- `anna-heringer`: Chinese and Japanese names are empty.
- `grafton-architects`: Chinese name is empty.
- `pierre-chareau`: Chinese name is empty.
- `studio-mumbai`: Chinese and Japanese names are empty.

### P1 — No linked production buildings

- `studio-mumbai`
- `vo-trong-nghia`

These pages can still exist as architect records, but the absence of linked
works limits navigation and makes a representative-work review impossible.

### P1 — Linked-building metadata gaps

- `anna-heringer`: METI Handmade School lacks Chinese/Japanese names and an
  official URL.
- `pierre-chareau`: both linked buildings lack Chinese/Japanese names and
  official URLs; the Beauvallon clubhouse also lacks a year.
- `geoffrey-bawa`: both linked buildings lack Chinese/Japanese names and
  official URLs; the Parliament building also lacks a year.
- `tod-williams-billie-tsien-architects`: both linked buildings lack
  Chinese/Japanese names, years, and official URLs.

## All 24 introductory profiles

| Profile | Linked works | Current data assessment | Recommended lane |
|---|---:|---|---|
| `grafton-architects` | 2 | Raw building identity, missing names/source/year; TSE year suspect | P0 data repair |
| `mvrdv` | 3 | Book Mountain official URL truncated | P0 data repair |
| `unemori-architects` | 1 | Confirmed architect-name typo | P0 identity repair |
| `anna-heringer` | 1 | Missing architect and building localizations/source | P1 data repair |
| `pierre-chareau` | 2 | Missing architect name and building metadata | P1 data repair |
| `studio-mumbai` | 0 | Missing names and no linked works | P1 identity/relationship review |
| `geoffrey-bawa` | 2 | Linked-building localization/year/source gaps | P1 data repair |
| `tod-williams-billie-tsien-architects` | 2 | Linked-building localization/year/source gaps | P1 data repair |
| `vo-trong-nghia` | 0 | No linked works | P1 relationship review |
| `mitsuru-senda-environment-design-institute` | 2 | Linked records structurally complete | Content review candidate |
| `ryue-nishizawa` | 2 | Linked records structurally complete | Content review candidate |
| `snohetta` | 2 | Linked records structurally complete | Content review candidate |
| `adjaye-associates` | 1 | Linked record structurally complete | Later content review |
| `ala-architects` | 1 | Linked record structurally complete | Later content review |
| `alsop-stormer` | 1 | Linked record structurally complete | Later content review |
| `civic-architects` | 1 | Linked record structurally complete | Later content review |
| `coelacanth-associates-nagoya` | 1 | Linked record structurally complete | Later content review |
| `coelacanth-kh` | 1 | Linked record structurally complete | Later content review |
| `kw-hg-architects` | 1 | Linked record structurally complete | Later content review |
| `lundhagem-atelier-oslo` | 1 | Linked record structurally complete | Later content review |
| `mari-ito-uao` | 1 | Linked record structurally complete | Later content review |
| `mecanoo` | 1 | Linked record structurally complete | Later content review |
| `mikami-architects` | 1 | Linked record structurally complete | Later content review |
| `schmidt-hammer-lassen` | 1 | Linked record structurally complete | Later content review |

## Recommended sequence

1. Keep PR #160 draft. Do not hide the introductory disclosure.
2. Prepare a separate reviewed data batch for Grafton Architects, MVRDV Book
   Mountain, and the UNEMORI identity typo. Use decision record, migration,
   rollback, dry-run, and post-write verification.
3. After the P0 records are fixed, review a small content-only batch:
   Mitsuru Senda / Environment Design Institute, Ryue Nishizawa, and Snøhetta.
4. Review the remaining localization and relationship gaps before promoting
   their profiles.

## What this review does not establish

- It does not prove that every existing building image depicts the correct
  subject or has the best composition.
- It does not independently verify every sentence in the non-introductory
  overlays.
- It does not decide whether `year_start` means design start, competition win,
  construction start, opening, or completion. That semantic choice is required
  before correcting Toulouse School of Economics.
- It does not authorize a production write or PR #160 merge.
