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

- [x] Isolated PGlite/PostgreSQL dry-run: forward, replay refusal, rollback
- [x] CI checks: PR #151 and follow-up PR #155 passed
- [x] Production precheck: current localized names and one primary matched
- [x] Guarded production migration: `content_trust_miho_001`
- [x] Post-write SQL verification: trilingual fields and one primary confirmed
- [x] Reviewed production release: run `29306217212`, success
- [x] Live HTTP verification: `/zh/building/miho-museum` returned 200 and rendered the reviewed content
