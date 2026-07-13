# G8 Unified Page Read Verification

Date: 2026-07-13

## Result

Graduation CASE pages continue to preserve their dedicated analysis layout, but canonical name, year, location, architect relation and reviewed image metadata are merged from the building/profile relation. The profile remains responsible for concept, multilingual research keywords, plan/section links and issue relations.

Every one of the 88 published unified profiles now has a versioned local CASE-to-building link generated from reviewed migration packets. This makes reciprocal links stable even when static rendering temporarily uses the compatibility fallback instead of Supabase. Building pages list every published CASE analysis that references that building; CASE pages link back to the canonical building history and expose the building's official/Wikipedia sources when available.

## Verification

- CASE-126 and `metropol-parasol` use the same reviewed local image and copyright metadata.
- Reciprocal CASE/building links pass in Chinese, English and Japanese.
- The existing mobile viewport test remains width-safe at 390 px.
- Existing graduation unknown/unpublished route tests remain HTTP 404.
- Links have localized accessible names and the reciprocal section has an explicit heading association.
- The presentation remains flat sections and border-separated rows; no nested card surface was introduced.
