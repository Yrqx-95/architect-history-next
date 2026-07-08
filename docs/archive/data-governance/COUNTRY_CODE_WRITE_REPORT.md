# Country Code Write Report

Generated: 2026-06-08T16:26:16.749Z
Mode: write

## Scope

- Sprint 04 re-ran dry-run against the current database state.
- Only high-confidence candidates from `country` or parseable `location` were eligible.
- Medium-confidence text-token candidates and unresolved records were not written.
- Generic building-name tokens and description-only inference were not used.
- Priority policy: `country` / `location` / `city` / `wikipedia_url` outrank `description`; this sprint only allowed `country` and `location` for writes.

## Summary

- Missing country_code before write: 52
- Dry-run high-confidence candidates: 0
- Actual writes: 0
- Safety exclusions: 0

## Planned Country Distribution

| Country code | Count |
|---|---:|
| None | 0 |

## Post-Write Summary

- Remaining missing country_code: 52
- New country_code coverage: 94.06%
- data:audit exit status: 0
- data:audit total issues: 3858
- data:audit errors: 0
- data:audit warnings: 1368
- data:audit country_code warnings: 52

## Country Distribution Top 20 After Write

| Country code | Count |
|---|---:|
| US | 181 |
| JP | 119 |
| CH | 64 |
| ES | 48 |
| FR | 39 |
| FI | 37 |
| PT | 37 |
| DE | 34 |
| IT | 34 |
| GB | 30 |
| DK | 28 |
| BR | 18 |
| NL | 16 |
| MX | 15 |
| BE | 13 |
| AU | 12 |
| CN | 12 |
| AT | 8 |
| KR | 8 |
| IL | 7 |

## Safety Exclusions

None.

## Migration Files

- Forward migration: `db/migrations/v9-normalize-country-codes-sprint04.sql`
- Rollback migration: `db/migrations/v9-normalize-country-codes-sprint04-rollback.sql`
- Forward migration updates only `country_code IS NULL` records.
- Rollback migration only clears exact values written by this sprint.
