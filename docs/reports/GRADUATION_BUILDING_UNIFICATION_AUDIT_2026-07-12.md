# Graduation Building Unification Audit

Audited: 2026-07-12

## Outcome

The graduation case library and the main building archive can share one canonical building source, but the migration must preserve graduation-specific analysis in a separate profile rather than merging all fields into `buildings`.

The first read-only identity pass compared 139 graduation cases with 875 Supabase buildings using multilingual normalized names, architect identity, year, and location. It made no database writes.

| Review lane | Count | Meaning |
|---|---:|---|
| exact-match | 18 | Same normalized identity with no detected year or architect conflict; still requires visible-source and image review. |
| probable-match | 1 | Strong candidate supported by year and architect, but name is not identical. |
| new-building-candidate | 101 | No credible canonical building candidate; research before creating a building. |
| identity-review | 19 | Weak similarity or conflicting evidence; never auto-link. |

The complete local queue is generated at `reports/graduation-building-match-report.{json,md}` by `npm run graduation:match-buildings`.

## Exact-match review queue

| Graduation case | Canonical building candidate | Score |
|---|---|---:|
| CASE-007 — Sendai Mediatheque | `sendai-mediatheque` | 122 |
| CASE-046 — Chichu Art Museum | `naoshima-chichu-art-museum` | 122 |
| CASE-099 — Tate Modern | `tate-modern` | 122 |
| CASE-103 — 21st Century Museum of Contemporary Art, Kanazawa | `kanazawa-museum` | 122 |
| CASE-106 — Rolex Learning Center | `rolex-learning-center` | 122 |
| CASE-119 — Louvre-Lens | `louvre-lens` | 122 |
| CASE-123 — Aga Khan Museum | `aga-khan-museum` | 122 |
| CASE-125 — VitraHaus | `vitra-haus` | 122 |
| CASE-138 — CopenHill | `copenhill` | 122 |
| CASE-128 — SESC Pompeia | `sesc-pompeia` | 112 |
| CASE-061 — Japan National Stadium | `national-stadium-tokyo` | 110 |
| CASE-104 — Seattle Central Library | `seattle-central-library` | 110 |
| CASE-108 — Centre Pompidou-Metz | `pompidou-metz` | 110 |
| CASE-120 — Guangzhou Opera House | `guangzhou-opera-house` | 110 |
| CASE-127 — CCTV Headquarters | `cctv-headquarters` | 110 |
| CASE-129 — Centre Pompidou | `centre-pompidou` | 110 |
| CASE-131 — Casa da Música | `casa-da-musica` | 110 |
| CASE-135 — Kunsthal Rotterdam | `kunsthal` | 110 |

Probable match: CASE-121 — Elbphilharmonie → `hamburg-elbphilharmonie` (score 102; name similarity 0.80, identical year and architect).

## Target model

### Canonical entity

`buildings` remains the only owner of building identity, names, architect, date, location, source links, and image relationships.

### Graduation lens

Create `graduation_case_profiles` only after exact-match decisions are approved. It should reference `building_id` and own graduation-specific fields such as concept, comparison keywords, plan/section references, and publication status.

### Fine-grained functions

Keep current `building_types` as broad, single-value categories. Add a separate many-to-many function taxonomy so one building can be both `library`, `learning-center`, and `community-space`.

Recommended future tables:

- `building_functions`
- `building_function_aliases`
- `building_function_assignments`
- `graduation_case_profiles`

All public-schema tables must have RLS and explicit read policies before Data API access is granted. No service-role credential may enter client code.

## Migration boundary

1. Review the 18 exact candidates against each graduation source, canonical source, and image identity.
2. Record approved mappings in a versioned decision artifact.
3. Generate a reversible schema migration; do not apply it from this audit script.
4. Dual-read old JSON and new profiles during rollout.
5. Preserve every existing `CASE-xxx` URL through an explicit ID mapping.
6. Remove `cases.json` only after page, export, search, and 404 tests pass against the unified source.

## Known blindspot

The matcher can detect conflicts but cannot prove architectural identity from names alone. Generic names such as museums, libraries, theatres, and prefectural facilities produce strong-looking false similarities; those records remain in `identity-review` even when a human may later determine that they are new canonical buildings.

## G2 reviewed outcome

The second review pass resolved the original one probable match and nineteen identity-review items. It also improved general matching behavior without adding one-off CASE-to-slug rules:

- architecture-practice suffixes such as `Architects` and `& Associates` are normalized;
- distinctive short project names can match their expanded institutional names;
- `theater` / `theatre` and `opera house` wording is treated as a probable alias, never as an exact automatic link;
- building slugs are excluded from distinctive-name containment so a location-only slug such as `naoshima` cannot create a false alias.

The recalibrated raw queue is 18 exact, 3 probable, 102 new-building candidates and 16 identity-review items. The versioned G2 decision file covers all 3 probable and all 16 current identity-review items, plus CASE-053 which the improved architect normalization safely moved from identity-review to new-building-candidate.

Approved aliases:

| Graduation case | Canonical building | Evidence |
|---|---|---|
| CASE-102 — Kiasma Museum of Contemporary Art | `kiasma` | canonical short name, same 1998 completion, Steven Holl, Finland |
| CASE-107 — National Taichung Theater | `taichung-metropolitan-opera` | English venue-name variant, same 2016 completion, Toyo Ito, Taichung |
| CASE-121 — Elbphilharmonie | `hamburg-elbphilharmonie` | expanded city name, same 2017 completion, Herzog & de Meuron, Hamburg |

The other 17 fuzzy candidates were rejected as links and routed to canonical new-building research. CASE-107 received a replacement facade image because the previous licensed night photograph showed mainly the surrounding skyline. CASE-121's previously generic Commons credit was replaced with photographer `Lapscause` and `CC BY-SA 4.0`.

Decision artifact: `db/review-decisions/graduation-building-links-002.json`.
