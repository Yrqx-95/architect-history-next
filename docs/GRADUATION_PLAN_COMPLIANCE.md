# Graduation V1 Plan Compliance

Last updated: 2026-07-09

This file tracks implementation against the user's V1 Graduation Inspiration Library plan. The plan is the priority source for future work on this submenu.

## Priority Rule

When choosing the next task for the graduation submenu, prefer unfinished items from the V1 plan before adding new enhancements. Enhancements are allowed only when they directly support a planned workflow and stay small enough to roll back.

## What Was In The Plan

| Plan item | Current status | Notes |
|---|---|---|
| Static-first, content-driven, no login, no AI | Done | Current implementation reads local JSON and does not use login or AI. |
| Submenu/page for Graduation Inspiration | Done | Implemented at `/[lang]/graduation/[[...slug]]`. |
| Home page | Done | `/zh/graduation`. |
| Issue library/list | Done | `/zh/graduation/issues`. |
| Issue detail | Done | `/zh/graduation/issues/:id`. |
| Site type library/list | Done | `/zh/graduation/sites`. |
| Site detail | Done | `/zh/graduation/sites/:id`. |
| Case library/list | Done | `/zh/graduation/cases`. |
| Case detail | Done | `/zh/graduation/cases/:id`. |
| Teacher brief page | Done | `/zh/graduation/brief`, using structured `brief.json`. |
| Random inspiration | Done | `/zh/graduation/random`, generated from structured local data. |
| Search and tag filtering | Done | Lists have keyword/tag filtering; issue list now also supports planned site type and building type filters. |
| JSON export | Done | List exports and bundle exports exist. |
| CSV export | Done | Bundle CSV export exists, editable CSV sources exist, and public list CSV/JSON exports are generated under `public/data/graduation/`. |
| Local JSON data | Done | `src/content/graduation/*.json`. |
| Editable CSV source files | Done | Added `content/issues.csv`, `content/site_types.csv`, and `content/cases.csv`. |
| CSV to JSON build script | Done | Added `scripts/build-graduation-data.mjs` and npm scripts `graduation:data` / `graduation:data:from-json`. |
| JSON Schemas | Done | Added `schemas/issue.schema.json`, `schemas/site_type.schema.json`, and `schemas/case.schema.json`; current 100 issues / 50 site types / 139 cases validate against them. |
| API contract / OpenAPI draft | Done | Added `api/openapi.yaml` with the planned home, issue, site, case, random, brief, and export contract. |
| Wireframes document | Done | Added `docs/graduation/wireframes.md`. |
| Random algorithm document | Done | Added `docs/graduation/random.md`. |
| Content guide | Done | Added `docs/graduation/content-guide.md`. |
| Source and image policy | Done | Added `docs/graduation/SOURCE_POLICY.md`. |
| Seed content 20/10/20 | Done | Current seed data exceeds the seed target: 100 issues, 50 site types, 139 cases. |
| Formal target content 100/30-50/100 | Done | Current content is 100 issues, 50 site types, 139 cases; site types are within the formal target range and cases now exceed the original V1 target. |
| Shareable filter URLs | Done | List filters are reflected in URL query strings for refreshable/shareable filtered views. |
| Content QA report | Done | Added `npm run graduation:audit`, generating `docs/GRADUATION_CONTENT_QA.md`. |
| Draft review pass | Done | Added `docs/GRADUATION_DRAFT_REVIEW.md`; promoted source-backed issues and site types conservatively. |

## Enhancements Added Outside The Strict Plan

| Enhancement | Why it was added | Keep? |
|---|---|---|
| Case image source/license/credit fields | Supports the plan's source-traceability and image copyright concerns. | Yes |
| `case_relation_notes` | Helps users understand why each case belongs to an issue. Not a required plan field, but supports the planned issue-site-case browsing path. | Yes, unless the page becomes too text-heavy. |
| `cases_with_notes` in JSON export | Makes exported bundles understandable outside the website. | Yes |
| Bundle-level CSV export | Plan requires CSV export; this is a partial implementation focused on current inspiration bundles. | Yes |

## Next Plan-First Tasks

1. Improve case confidence before large case publication:
   - current cases: 139 total / 100 published / 39 draft
   - placeholder images: 39/139
   - published placeholder cases: 0
   - explicit image source URLs: 100/139
   - local case images: 47/139
2. Run a publication-quality content review:
   - current issues: 100 total / 100 published / 0 draft
   - current site types: 50 total / 20 published / 30 draft
3. Start rendered user-simulation QA on the full 100/50/139 data set:
   - browse from home -> issue -> site -> case -> export
   - test random inspiration on mobile and desktop

## Current Recommendation

Next implementation should stay in quality mode, not raw expansion: continue slow retry localization for the remaining 14 remote Commons images, review whether any of the 30 draft site types should be surfaced, and run rendered user-simulation QA on the full 100/50/139 dataset.
