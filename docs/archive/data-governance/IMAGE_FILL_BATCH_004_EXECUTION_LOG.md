# Image Fill Batch 004 Execution Log

- Project: `architect-history`
- Supabase project ID: `usuqjsjluietcnudxwvz`
- Applied at: 2026-07-12T02:47:55+09:00
- Scope: replace the Carmen Würth Forum low-confidence primary with one visually reviewed Wikimedia Commons image.
- Apply SQL: `db/manual-operations/image-fill-batch-004-apply.sql`
- Rollback SQL: `db/manual-operations/image-fill-batch-004-rollback.sql`

> Historical record only. The apply SQL has already been executed and must not
> be replayed against the current database.

## Verification

- Transaction status: completed
- Exactly one primary image: 1/1
- Commons primary image: 1/1
- Photographer, license, and source URL complete: 1/1
- Policy-safe image gap after write: 181, down from 182
- Rollback executed: no; all checks passed
