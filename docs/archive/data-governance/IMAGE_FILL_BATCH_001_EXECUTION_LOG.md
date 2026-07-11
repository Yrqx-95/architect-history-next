# Image Fill Batch 001 Execution Log

- Project: `architect-history`
- Supabase project ID: `usuqjsjluietcnudxwvz`
- Prepared at: 2026-07-10T21:21:47+09:00
- Scope: replace 13 reviewed low-confidence primary images with Wikimedia Commons images.
- Apply SQL: `db/manual-operations/image-fill-batch-001-apply.sql`
- Rollback SQL: `db/manual-operations/image-fill-batch-001-rollback.sql`
- Review report: `docs/archive/data-governance/IMAGE_FILL_REVIEWED_BATCH_001.md`

## Preflight

- Expected decisions: 13
- Matched buildings: 13
- Matched previous primary images: 13
- Existing reviewed candidates: 0
- Current primary images across affected buildings: 13
- Result: passed

## Execution

- Status: completed
- Applied at: 2026-07-10T21:23:48+09:00
- Inserted Commons primary images: 13
- Demoted previous Unsplash primary images: 13
- Database operation: one transaction; no precondition exception and no partial write

## Verification

- Affected buildings with exactly one primary image: 13/13
- Inserted Commons images marked primary: 13/13
- Previous reviewed primary IDs marked non-primary: 13/13
- Inserted rows missing photographer, license, or source URL: 0
- Wikimedia Commons API files present with image URL and license metadata: 13/13
- Policy-safe image gap after write: 230, down from 243
- Image audit after write: 7,289 total rows, 4,807 trusted-open rows, 0 missing licenses, 0 missing source URLs
- Rollback readiness: passed; exact previous primary IDs and inserted source URLs are recorded in the rollback SQL
- Rollback executed: no, because every database verification passed

## Notes

- This is a data-only operation; no schema, RLS, function, storage, or deployment changes are included.
- If verification fails, run the recorded rollback SQL as one transaction and verify the 13 previous primary image IDs are restored.
- Direct upload-host probing was temporarily rate-limited after two successful responses. Repeated retries were stopped; the single Commons API verification returned all 13 files with URLs and license metadata.
