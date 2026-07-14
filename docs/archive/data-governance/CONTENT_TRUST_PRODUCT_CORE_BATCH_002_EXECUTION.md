# Content trust product-core batch 002 execution

- Review decision: `db/review-decisions/content-trust-product-core-batch-002.json`
- Migration: `20260714020710_content_trust_product_core_batch_002.sql`
- Rollback: `db/manual-operations/content-trust-product-core-batch-002-rollback.sql`
- Scope: Apple Park, Fallingwater, Marsk Tower.
- Excluded: graduation-linked records, portrait/image-fill work, identity-review records, and any record without an accessible authoritative source.

## Changes

- Added one accessible official source URL per building.
- Replaced non-English placeholder text stored under `significance.en`.
- Added source-backed Chinese, English, and Japanese description/significance fields.
- Normalized Fallingwater to Mill Run and Marsk Tower to Skærbæk using the cited official pages.
- Retained the existing identity-safe open-license primary image for each record; no image write was needed.

## Safety

- Migration aborts unless all three records still match the reviewed null-source/null-description snapshot.
- Rollback aborts unless all three records still match the batch's complete post-write shape.
- This batch does not alter architects, graduation relations, JSON compatibility payloads, or protected concurrent files.
