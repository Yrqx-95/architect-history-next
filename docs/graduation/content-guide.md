# Graduation Content Guide

This guide follows the V1 Graduation Inspiration Library plan. Use it when adding or editing issues, site types, cases, or teacher brief content.

## Product Position

The library helps architecture and interior design students move from:

```text
I have no thesis topic
```

to:

```text
I have a social issue, a plausible site type, several building-use ideas, and cases to research next.
```

It is not:

- a generic architecture encyclopedia
- an AI topic generator
- a login-based personal planning app
- a long essay collection

## Writing Style

Use clear, compact Chinese by default.

Prefer:

- short summaries
- concrete users
- concrete spatial response
- source-backed topics
- browsable tags

Avoid:

- abstract slogans
- moralizing language
- long paragraphs
- unsupported claims
- decorative or marketing-style copy

## Issues

File:

- `src/content/graduation/issues.json`

Planned future source file:

- `content/issues.csv`

Purpose:

An issue is a social or urban problem that can become a graduation design direction.

Required fields:

- `id`
- `title`
- `summary`
- `keywords`
- `recommended_site_types`
- `recommended_building_types`
- `reference_case_ids`
- `source_urls`
- `status`

Current enhancement field:

- `case_relation_notes`

Rules:

- `id` uses `ISSUE-001` format.
- `title` should be 8-30 Chinese characters when possible.
- `summary` should be about 50-120 Chinese characters.
- `keywords` should be 3-8 items.
- Every issue should have at least one strong site type and one strong case.
- `source_urls` should point to official or reliable factual sources.
- Use `published` only when the issue is ready to appear in primary flows.
- Use `draft` when source quality, relation quality, or case support is still weak.

Good issue summary pattern:

```text
[Affected people or condition] causes [specific pressure], so [site/building response] can provide [spatial or operational support].
```

Example:

```text
高龄单身户增加使日常照应、共食和社交支持变弱，社区需要低门槛且可持续运营的照护与交流空间。
```

## Site Types

File:

- `src/content/graduation/site-types.json`

Planned future source file:

- `content/site_types.csv`

Purpose:

A site type is not an exact land parcel. It is a reusable location pattern that students can search for in their own city.

Required fields:

- `id`
- `name`
- `address_example`
- `fit_reason`
- `keywords`
- `status`

Rules:

- `id` uses `SITE-001` format.
- `name` should be concrete and short.
- `address_example` can be a city/area-level example, not a precise address.
- `fit_reason` should explain why this site type matches certain issues.
- Keep site types broad enough for reuse but concrete enough to guide fieldwork.

Good site type examples:

- 商店街空铺
- 老旧团地底层
- 废校或闲置校舍
- 河边或运河沿线
- 旧仓库或小工厂

## Cases

File:

- `src/content/graduation/cases.json`

Planned future source file:

- `content/cases.csv`

Purpose:

A case gives students a precedent to inspect, not a style to copy.

Required fields:

- `id`
- `name`
- `location`
- `image_url`
- `concept`
- `keywords`
- `source_url`
- `year`
- `status`

Recommended fields:

- `architect`
- `image_source_url`
- `image_license`
- `image_credit`
- `image_note`
- `plan_url`
- `section_url`

Rules:

- `id` uses `CASE-001` format.
- Prefer official project names.
- `concept` should be one sentence, about 20-60 Chinese characters.
- `source_url` should be the best available project or institutional source.
- Use placeholders when image rights are unclear.
- If an image is representative rather than project-specific, say so in `image_note`.

## Relation Notes

Field:

- `issues[].case_relation_notes`

Purpose:

Explain why a case is connected to an issue.

Rules:

- One short sentence per issue-case relation.
- Do not repeat only the case concept.
- Answer: `why should a student look at this case for this issue?`
- Keep notes concise enough for card display.

Example:

```json
"CASE-001": "看福利、居住和日常交流如何混合成低压力社区。"
```

## Teacher Brief

File:

- `src/content/graduation/brief.json`

Purpose:

Translate the course requirement into an actionable checklist.

Must include:

- how this graduation project differs from previous assignments
- theme/site/use
- Q1-Q7
- proposal checklist
- fieldwork reminders

Rules:

- Do not rewrite course requirements into a different assignment.
- Keep it practical and scannable.
- The brief should help students prepare an actual proposal.

## Publishing Checklist

Before marking new content `published`, check:

- Does it have a real source?
- Does it connect to a spatial/building response?
- Does it have at least one plausible site type?
- Does it have at least one useful case?
- Are ids valid and references real?
- Are keywords useful for filtering?
- Is the writing short enough to scan?

## Expansion Targets

V1 seed target:

- 20 issues
- 10 site types
- 20 cases

Formal target from the plan:

- 100 issues
- 30-50 site types
- 100 cases

Expansion should happen only after source policy and schema validation are in place.
