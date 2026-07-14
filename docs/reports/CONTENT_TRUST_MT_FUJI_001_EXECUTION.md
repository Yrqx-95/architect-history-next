# Content Trust Mt. Fuji 001

## Scope

Content-only correction for `mt-fuji-center`. No image mutation, no architect identity change, and no graduation data change.

## Reviewed decision

- Decision file: `db/review-decisions/content-trust-mt-fuji-001.json`
- Official source: https://mtfuji-whc.jp/en/facility-overview/
- Spatial/source detail: https://mtfuji-whc.jp/guidance/en/zone01.html
- Existing primary image review: Wikimedia Commons, CC BY-SA 4.0

## Guarded write

Migration `20260714033425_content_trust_mt_fuji_001.sql` requires the reviewed building id, slug, architect, year, original significance, null source/description, original timestamp, and exactly one primary image. It verifies all three language keys after the write.

## Verification record

- [ ] Isolated PGlite/PostgreSQL dry-run: forward, replay refusal, rollback
- [ ] CI checks
- [ ] Production precheck
- [ ] Guarded production migration
- [ ] Post-write SQL verification
- [ ] Reviewed production release
- [ ] Live HTTP verification
