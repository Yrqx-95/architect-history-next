# Graduation Random Inspiration Rules

This document describes the V1 random inspiration behavior from the plan. The feature must combine structured local data and must not call AI.

## Goal

Return one usable thesis direction:

- 1 social issue
- 1-2 site types
- 1-3 reference cases
- exportable JSON and CSV bundle

The result should help a student move from blank page to a direction that can be researched further.

## Current Route

`/[lang]/graduation/random`

## Data Inputs

Current local JSON sources:

- `src/content/graduation/issues.json`
- `src/content/graduation/site-types.json`
- `src/content/graduation/cases.json`

Required issue fields:

- `id`
- `title`
- `summary`
- `keywords`
- `recommended_site_types`
- `recommended_building_types`
- `reference_case_ids`
- `case_relation_notes`
- `status`

Required site fields:

- `id`
- `name`
- `address_example`
- `fit_reason`
- `keywords`
- `status`

Required case fields:

- `id`
- `name`
- `location`
- `image_url`
- `concept`
- `keywords`
- `source_url`
- `status`

## Selection Logic

Current implementation:

1. Load published issues.
2. Choose one issue using the current seed.
3. Read its `recommended_site_types`.
4. Resolve matching site type objects.
5. Read its `reference_case_ids`.
6. Resolve matching case objects.
7. Show the first 1-2 sites and first 1-3 cases.
8. Show relation notes from `case_relation_notes`.

The current seed changes when the user clicks `再来一次`.

## Planned Filter Logic

When filters are added, use this order:

1. Start with published issues.
2. If tag is present, keep issues whose keywords include the tag.
3. If site type is present, keep issues whose `recommended_site_types` include that site id.
4. If building type is present, keep issues whose `recommended_building_types` include that building type.
5. If the filtered pool is empty, fall back to all published issues.
6. Select one issue from the final pool.

Pseudo-code:

```text
function getRandomInspiration(filters, seed):
    issues = loadPublishedIssues()

    if filters.tag:
        issues = issues where filters.tag in issue.keywords

    if filters.siteType:
        issues = issues where filters.siteType in issue.recommended_site_types

    if filters.buildingType:
        issues = issues where filters.buildingType in issue.recommended_building_types

    if issues is empty:
        issues = loadPublishedIssues()

    selectedIssue = seededPick(issues, seed)
    sites = getSiteTypesByIds(selectedIssue.recommended_site_types).slice(0, 2)
    cases = getCasesByIds(selectedIssue.reference_case_ids).slice(0, 3)

    return {
        issue: selectedIssue,
        site_types: sites,
        cases: cases,
        cases_with_notes: cases with selectedIssue.case_relation_notes,
        generated_title: selectedIssue.recommended_building_types[0] + " for " + selectedIssue.title
    }
```

## Export Shape

JSON export:

```json
{
  "issue": {},
  "site_types": [],
  "cases": [],
  "cases_with_notes": [
    {
      "case": {},
      "relation_note": ""
    }
  ],
  "exported_at": ""
}
```

CSV export:

One row per related case.

Columns:

- `issue_id`
- `issue_title`
- `issue_summary`
- `building_types`
- `site_ids`
- `site_names`
- `case_id`
- `case_name`
- `relation_note`
- `case_location`
- `case_concept`
- `case_source_url`

## Quality Rules

- Never generate unsupported text with AI.
- Every returned case must exist in `cases.json`.
- Every returned site type must exist in `site-types.json`.
- Every case in a random result should have a non-empty relation note when shown from an issue context.
- Random results must remain exportable.
- If the data is weak, improve the data rather than inventing a better-looking result.

## Known Future Work

- Add visible filters before random generation.
- Add stable shareable seed in URL.
- Add tests for deterministic seed behavior after filter controls exist.
