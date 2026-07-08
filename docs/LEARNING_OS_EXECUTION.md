# Archistory Learning OS Execution Notes

This file records the current implementation direction for turning Archistory from an archive browsing site into an architecture learning operating system.

## First Principle

Archistory should be built from verifiable architectural knowledge units, not from decorative learning pages. Preserve this chain first:

1. `Source`
2. `Claim`
3. `Claim -> Source` citation
4. Stable permalink
5. `last_verified_at`
6. `confidence`

If scope or time is constrained, keep this chain intact and delay graph/search/recommendation layers.

## Current P0 Slice

Implemented as a derived API layer over the existing archive data:

- `GET /api/v1/buildings/[slug]`
- `POST /api/v1/grounding/query`
- `GET /api/v1/claims/[id]`
- `GET /api/v1/sources/[id]`

The API currently derives claims and sources from local archive records, content overlays, official URLs, Wikipedia URLs, and image source URLs. It does not yet persist claims into the database at runtime.

## Durable Schema Target

The migration `db/migrations/v12-knowledge-os-claims-sources.sql` defines the first durable tables for:

- `sources`
- `claims`
- `claim_sources`
- `ai_citation_events`
- `user_events`

This is the storage target for the next phase. The current API layer should migrate from derived claims to persisted reviewed claims when ingestion/review tooling exists.

## Non-Goals For This Slice

- No Neo4j or graph database yet.
- No OpenSearch/vector hybrid search yet.
- No recommendation engine yet.
- No new visual redesign in this slice.

Those layers should be projections on top of the claim/source layer, not replacements for it.

## Next Recommended Step

Build a small internal reviewer page or script that shows one building, its derived claims, and its sources, then lets us mark each claim as `approved`, `needs_review`, or `rejected`. After that, write approved claims into the new tables.
