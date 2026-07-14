# Content Trust Miho 001

## Scope

Content-only correction for `miho-museum`. No image mutation, no architect identity change, and no graduation data change.

## Reviewed decision

- Decision file: `db/review-decisions/content-trust-miho-001.json`
- Official architecture source: https://www.miho.jp/en/architecture/approach/
- Collection/opening context: https://www.miho.jp/en/intro/history/
- Existing primary image review: Wikimedia Commons, CC BY-SA 4.0
- Production recheck: `name_zh` and `name_ja` were already `美秀美术馆` and `ミホ・ミュージアム`; the migration preserves both and only adds source/content fields.

## Guarded write

Migration `20260714041451_content_trust_miho_001.sql` requires the reviewed building id, slug, architect, year, original names, original significance, null source/description, original timestamp, and exactly one primary image. It verifies names, source, and all three language keys after the write.

## Verification record

- [ ] Isolated PGlite/PostgreSQL dry-run: forward, replay refusal, rollback
- [ ] CI checks
- [ ] Production precheck
- [ ] Guarded production migration
- [ ] Post-write SQL verification
- [ ] Reviewed production release
- [ ] Live HTTP verification
