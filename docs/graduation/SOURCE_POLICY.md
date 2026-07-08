# Graduation Source And Image Policy

This policy follows the V1 Graduation Inspiration Library plan. It applies to issue facts, site type examples, case sources, and images.

## Core Principle

Source traceability is more important than visual completeness.

If an image or claim cannot be traced, keep a placeholder or draft status rather than presenting weak material as finished.

## Source Priority

For cases, use this order:

1. Official project page or architect/studio page
2. Public institution or facility owner page
3. Official press/media kit
4. Reputable architecture databases or magazines
5. Wikimedia Commons or other clearly licensed image/source repositories
6. General reposts only when no better source exists, and only as draft support

For social issues, use this order:

1. Japanese government or public agency sources
2. Local government sources
3. University/research institute reports
4. Established news or policy summaries
5. Other sources only as leads, not final evidence

## Image Rules

Use local images only when:

- the image source is recorded
- the license is recorded
- the credit is recorded
- the file is stored under `public/images/graduation/cases/`

Required image fields for local real images:

- `image_source_url`
- `image_license`
- `image_credit`

Use `image_note` when:

- the image is representative rather than project-specific
- the image shows a typology rather than the exact project
- the image could otherwise mislead a student

When rights are unclear:

- keep `/images/graduation/case-placeholder.svg`
- keep the case source link
- do not download and rehost the image

## Placeholder Policy

The placeholder is not a failure. It means:

- the case is useful enough to cite
- the image is not yet source-cleared
- the project should remain source-first

Current placeholder:

- `/images/graduation/case-placeholder.svg`

## Case Status Rules

Use `published` when:

- source is acceptable
- concept is clear
- relation to issues is useful
- image is either source-cleared or intentionally placeholder-first

Use `draft` when:

- source is broad or not project-specific
- case is only a typology placeholder
- architect/year is unknown and important
- image/source quality still needs review

## Citation In The UI

Case detail pages should show:

- source link
- image source link when available
- image license when available
- image credit when available
- image note when needed

Issue detail pages should show:

- source URLs
- related site types
- related cases
- relation notes

## Do Not Do

- Do not download images from random repost sites.
- Do not use images without license/credit fields.
- Do not imply a representative image is an official project image.
- Do not replace source quality with better-looking visuals.
- Do not add unsupported statistics or claims.
- Do not mark content published only because the page looks better.

## Current Known Gaps

Some cases still use placeholders because accepted project images are not yet available. This is intentional and should remain until a better source is found.

## Review Checklist

Before adding or changing a case:

- Is the source URL the best available source?
- Is the project name accurate?
- Is the location accurate?
- Is the architect/year known or intentionally blank?
- If using a real image, are source/license/credit present?
- If using a representative image, is `image_note` clear?
- Does at least one issue explain why this case matters?

Before adding or changing an issue:

- Is the issue grounded in a reliable source?
- Is the social problem specific enough?
- Can it become architecture/interior design work?
- Are site types plausible?
- Are related cases genuinely useful?
