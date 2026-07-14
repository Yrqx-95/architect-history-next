# Image Fill Batch 003 Execution Log

- Project: `architect-history`
- Supabase project ID: `usuqjsjluietcnudxwvz`
- Applied at: 2026-07-12T02:39:57+09:00
- Scope: replace 9 visually reviewed low-confidence primary images with Wikimedia Commons images.
- Apply SQL: `db/manual-operations/image-fill-batch-003-apply.sql`
- Rollback SQL: `db/manual-operations/image-fill-batch-003-rollback.sql`
- Review report: `docs/archive/data-governance/IMAGE_FILL_REVIEWED_BATCH_003.md`

> Historical record only. Do not replay the apply SQL against the current
> database. The executed SQL correctly targeted the nine Batch 003 buildings,
> but its internal temporary-table name and preflight exception text still say
> `image_fill_batch_002` / `Batch 002`. Those strings are preserved here because
> this file records the exact executed artifact; the production result is
> independently verified below.

## Preflight

- Matched buildings: 9/9
- Exactly one current primary per building: 9/9
- Existing reviewed candidate rows: 0
- Attribution fields complete before execution: 9/9
- Result: passed

## Execution

- Status: completed in one PostgreSQL transaction
- Inserted Commons primary images: 9
- Demoted previous primary images: 9
- First execution attempt: safely rejected during SQL parsing because generated SQL contained stray `+` characters; no database changes occurred
- Generator corrected and preflight rerun before the successful transaction

## Verification

- Affected buildings with exactly one primary image: 9/9
- Inserted Commons images marked primary: 9/9
- Inserted rows with photographer, license, and source URL: 9/9
- Total image rows after write: 7,220
- Missing licenses: 0
- Missing source URLs: 0
- Policy-safe image gap after write: 182, down from 191
- Rollback readiness: passed; exact previous primary IDs and inserted source URLs are recorded
- Rollback executed: no, because all database verification checks passed

## Held Back

- Construction-progress and model images
- Q-ID placeholder identities
- `clark-house` because the filename/entity match needs deeper review
- `hirosaki-civic-hall` because the candidate appears to show city hall rather than civic hall
- Four candidates whose visual download was blocked by Wikimedia HTTP 429
