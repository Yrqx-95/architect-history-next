# Data Quality Report

Date: 2026-06-08

Source:

- `reports/data-audit.json`
- Current audit result: `4953` total issues
- Current blocking errors: `0`
- Current warnings: `2463`
- Current info: `2490`

## Warning Summary

The remaining warning-level issues are data completeness and relationship-quality problems. They no longer block `data:audit`, but they materially affect browse quality, SEO metadata richness, search filtering, and recommendation accuracy.

Total building records represented in the audit: `875`

Buildings affected by at least one warning: `875`

Affected building ratio: `100.00%`

The reason this is 100% is that every building currently has `Missing era_slug`.

## Warning Classification

| Field | Warning message | Count | Affected buildings | Affected building ratio |
|---|---|---:|---:|---:|
| `era_slug` | Missing era_slug | 875 | 875 | 100.00% |
| `country_code` | Missing country_code | 830 | 830 | 94.86% |
| `type_slug` | Missing type_slug | 740 | 740 | 84.57% |
| `architect_slug` | Missing architect reference | 17 | 17 | 1.94% |
| `year_start` | Building year is more than 20 years after architect death year | 1 | 1 | 0.11% |

## TOP20 Warning Types

Only 5 unique warning types currently exist.

| Rank | Warning type | Count | Affected buildings | Impact |
|---:|---|---:|---:|---|
| 1 | `era_slug`: Missing era_slug | 875 | 875 | Timeline, era browse, historical context, related-content quality |
| 2 | `country_code`: Missing country_code | 830 | 830 | Country browse, locale display, geographic SEO, map/search facets |
| 3 | `type_slug`: Missing type_slug | 740 | 740 | Type browse, filters, recommendations, schema clarity |
| 4 | `architect_slug`: Missing architect reference | 17 | 17 | Authorship, related works, detail-page credibility |
| 5 | `year_start`: Building year after architect death | 1 | 1 | Historical correctness and trust |

## Highest Impact Warnings

### SEO Impact

Highest impact: `country_code` and `type_slug`

Why:

- `country_code` affects location normalization, region names, country archive pages, and geographic snippets.
- `type_slug` affects semantic categorization. Missing type weakens page intent, internal linking, and archive landing pages.
- `era_slug` also matters for historical long-tail SEO, but country/type are more directly reflected in browse URLs and page semantics.

Priority SEO fixes:

1. Fill `country_code` for 830 buildings.
2. Fill `type_slug` for 740 buildings.
3. Fill `era_slug` after defining a reliable year/style-to-era mapping.

### Search Impact

Highest impact: `type_slug`, `country_code`, and `era_slug`

Why:

- `type_slug` is the most useful filter/facet for intent such as museum, house, church, stadium, airport.
- `country_code` enables reliable country/region filtering independent of translated country names.
- `era_slug` enables historical search and timeline navigation.

Risk:

- Search can still return results by name/text, but filtering and ranking will be weaker because too many rows lack normalized facets.

### User Experience Impact

Highest impact: `era_slug` and `architect_slug`

Why:

- `era_slug` is missing on all 875 buildings, so era-based browsing and contextual grouping are unreliable.
- `architect_slug` affects trust directly: users expect building pages and cards to link to the correct architect where known.
- The single `year_start` warning is small in count but high in credibility risk because it signals a possible wrong attribution/date.

## P0 / P1 / P2 Priorities

### P0

Fix correctness and trust issues first.

1. `year_start`: `st-peters-dome`
   - Current warning: building year is more than 20 years after architect death year `(1564)`.
   - Building value: `1590`.
   - Action: verify whether the architect attribution, project phase, or completion year should be adjusted.

2. `architect_slug`: 17 missing architect references
   - Examples:
     - `todaiji-temple`
     - `museum-of-fine-arts-houston`
     - `cleveland-museum-of-art`
     - `the-nelson-atkins-museum-of-art`
     - `bank-of-spain-headquarters`
   - Action: classify each as:
     - known architect can be linked
     - unknown / collective / historical patronage
     - should use a new architect/entity record

### P1

Fix normalized browse/search fields at scale.

1. `country_code`: 830 buildings
   - Action: derive from existing `country` when safe.
   - Use dry-run first and report ambiguous countries.
   - Highest benefit for country pages, map views, localized display, and geographic search.

2. `type_slug`: 740 buildings
   - Action: map only when building type can be inferred from existing trusted values or known curated lists.
   - Avoid forcing unclear projects into broad types.
   - Highest benefit for type browse and search facets.

### P2

Improve historical organization after P0/P1.

1. `era_slug`: 875 buildings
   - Action: create an era assignment strategy based on `year_start`, existing style, and known historical exceptions.
   - Do not use only raw year ranges for all cases; historical styles overlap.
   - Recommended workflow:
     - generate dry-run report
     - classify high-confidence mappings
     - manually review exceptions
     - write only confirmed assignments

## Recommended Repair Order

1. P0: verify `st-peters-dome` date/attribution warning.
2. P0: resolve 17 missing `architect_slug` cases.
3. P1: generate `country_code` normalization dry-run.
4. P1: generate `type_slug` normalization dry-run.
5. P2: design and dry-run `era_slug` assignment.

## Current Status

The project is now past blocking data errors:

```text
data:audit errors: 0
style orphan assignments: 0
```

The remaining work is quality hardening rather than emergency repair. The largest systemic risk is not broken data anymore; it is incomplete normalized metadata across country, type, and era.
