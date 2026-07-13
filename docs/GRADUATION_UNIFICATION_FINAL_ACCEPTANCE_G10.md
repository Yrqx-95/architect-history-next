# Graduation Unification Final Acceptance — G10

Date: 2026-07-13

## Data and content

- 101 published compatibility rows; 88 published canonical profiles; 0 missing building relations; 0 compatibility payload ID mismatches.
- 118-record new-building queue: 67 migrated, 51 explicitly rejected/evidence-gapped, 0 formally unreviewed.
- Production totals: 942 buildings / 7291 images / 152 approved/candidate function assignments in the table; graduation writes introduced no orphan profile.
- `npm run data:audit`: 0 errors.
- Graduation content QA: 100 issues / 50 site types / 139 CASE records / 0 problems.
- Supabase RLS/policies pass; advisors remain at the established 13 security / 27 performance baseline.

## Image and identity sampling

CASE-005, CASE-100, CASE-104, CASE-126 and CASE-136 were sampled across CC0, CC BY and CC BY-SA sources. CASE pages retain their separately reviewed compatibility image unless an explicit canonical-image takeover is approved; canonical facts come from the building/profile relation. CASE-126 and Metropol Parasol additionally pass exact reciprocal-page image and rights checks in all three languages.

## Tests and compatibility

- 66 unit files / 227 tests pass.
- Clean Reviewed release complete test suite passes; local graduation unified-read, three-language reciprocal-page, mobile and 404 tests pass.
- Production build creates 4,449 static pages.
- `/data/graduation/cases.json` and `.csv` remain downloadable; all `CASE-xxx` routes are retained.
- The compatibility table is 101/101 semantically equal to the versioned JSON payload; the runtime no longer imports that JSON.
- Isolated rollback rehearsal passed forward, injected row-count drift refusal, exact rollback and replay.

## Search

`library`, `图书馆`, `図書館` and `function=library` return one identical complete building set with no duplicate slugs. Function, period, country, architect and graduation-issue filters compose. Measured cold search latency was 246 ms at first index hydration and 3–14 ms afterward; warm requests were 2–6 ms, so no Postgres FTS index was added.

## Final production acceptance

Reviewed release `29225114137` completed successfully. Live verification returned HTTP 200 for the homepage, canonical Metropol Parasol building, CASE-126, compatibility JSON and CSV; unknown building and CASE routes returned true HTTP 404. The graduation API reported `source=supabase`, 101 cases, 88 profiles and no missing relations. Japanese library search returned 43 unique buildings, and the combined filter returned only Kanazawa Umimirai Library.
