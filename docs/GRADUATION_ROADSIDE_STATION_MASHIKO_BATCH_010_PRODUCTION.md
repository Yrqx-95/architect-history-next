# Graduation Roadside Station Mashiko Batch 010 Production Record

Date: 2026-07-13
Migration: `graduation_roadside_station_mashiko_batch_010`
Version: `20260713013758`

## Result

- Inserted 1 architect, 1 building, 1 primary image, 1 published CASE-043 profile and 2 approved assignments.
- Totals changed exactly from 80/934/7283/138 to 81 profiles / 935 buildings / 7284 images / 140 assignments.
- Target records, primary image and `transport-hub` primary assignment matched exactly; orphan profiles remained 0.
- RLS and public-read policies remained enabled. Advisors remained 13 security / 27 performance.

## Release and live verification

- PR #106 merged the migration pack; PR #107 advanced the production baseline; PR #108 removed a flaky third-party Wikimedia CI fixture.
- Release `29217933562` stopped before deployment when GitHub Actions received the legitimate fallback PNG from Wikimedia.
- Reviewed release `29218152614` succeeded in 9m43s.
- CASE-043 and `roadside-station-mashiko` routes: 6/6 HTTP 200; image HTTP 200, 113132 bytes.
- API: `supabase+json`, 101 cases, 81 profiles / unified IDs, no missing relations; canonical architect, location, year and CC BY-SA 4.0 credit matched.

## G6 state

- Migrated: 60/118.
- Not yet migrated: 58.
- Formally unreviewed queue: 35.
