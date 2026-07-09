# Era Identity Cleanup Review

Generated: 2026-07-09T04:45:32.388Z

## Scope

- This is a read-only identity cleanup review for weak `year-unique` era candidates.
- It does not write Supabase and does not create a migration.
- External facts are fetched from Wikidata using each row's `wikidata_id`.
- Use this report before deciding which records are safe enough for a future metadata migration.

## Summary By Review Lane

| Review lane | Count |
|---|---:|
| safe-metadata-cleanup | 0 |
| commons-name-candidate | 0 |
| manual-name-research | 0 |
| archive-scope-review | 2 |

## Review Queue

| Lane | Confidence | Current slug | Current name | Wikidata | Wikidata description | Suggested name | Suggested slug | Country | Architect | Type/location | Note |
|---|---|---|---|---|---|---|---|---|---|---|---|
| archive-scope-review | medium | untitled | Untitled | Q127587635 | artwork in public space by Peter Eisenman in Aachen, Germany | Untitled | untitled | LU -> DE | peter-eisenman | bus shelter / Aachen | Wikidata describes this as public artwork/infrastructure, not a clear building archive record. |
| archive-scope-review | medium | q136394553 | Q136394553 | Q136394553 |  | Fontana di Piazzale della Pace (Parma) | fontana-di-piazzale-della-pace-parma | (blank) -> IT | mario-botta | reflecting pool / Parma | Wikidata describes this as public artwork/infrastructure, not a clear building archive record. |

## Recommended Next Step

- No `safe-metadata-cleanup` records remain in this review snapshot.
- No `commons-name-candidate` records remain in this review snapshot.
- Do not assign era metadata to `archive-scope-review` records until deciding whether they belong in `buildings`.
- Run `data:plan-eras` after any future metadata write to confirm the remaining queue changes as expected.
