# Era Identity Cleanup Review

Generated: 2026-07-09T03:38:31.454Z

## Scope

- This is a read-only identity cleanup review for weak `year-unique` era candidates.
- It does not write Supabase and does not create a migration.
- External facts are fetched from Wikidata using each row's `wikidata_id`.
- Use this report before deciding which records are safe enough for a future metadata migration.

## Summary By Review Lane

| Review lane | Count |
|---|---:|
| safe-metadata-cleanup | 0 |
| commons-name-candidate | 4 |
| manual-name-research | 8 |
| archive-scope-review | 1 |

## Review Queue

| Lane | Confidence | Current slug | Current name | Wikidata | Wikidata description | Suggested name | Suggested slug | Country | Architect | Type/location | Note |
|---|---|---|---|---|---|---|---|---|---|---|---|
| manual-name-research | medium | q116481414 | Q116481414 | Q116481414 |  |  |  | (blank) -> FR | christian-de-portzamparc | music school / 7th arrondissement of Paris | No public-facing English label or Commons category; derive name manually from description/address before writing. |
| manual-name-research | medium | q125679109 | Q125679109 | Q125679109 | housing complex at Parallelweg, Schilderswijk, Den Haag, the Netherlands |  |  | NL -> NL | alvaro-siza-vieira | housing estate / The Hague | No public-facing English label or Commons category; derive name manually from description/address before writing. |
| manual-name-research | medium | q125679110 | Q125679110 | Q125679110 | housing complex at Van der Vennestraat, Schilderswijk, Den Haag, the Netherlands |  |  | NL -> NL | alvaro-siza-vieira | housing estate / The Hague | No public-facing English label or Commons category; derive name manually from description/address before writing. |
| archive-scope-review | medium | untitled | Untitled | Q127587635 | artwork in public space by Peter Eisenman in Aachen, Germany | Untitled | untitled | LU -> DE | peter-eisenman | bus shelter / Aachen | Wikidata describes this as public artwork/infrastructure, not a clear building archive record. |
| commons-name-candidate | medium | q125679342 | Q125679342 | Q125679342 | office building at Sarphatistraat 410, Centrum, Amsterdam, the Netherlands | Kantoorgebouw Het Oosten | kantoorgebouw-het-oosten | NL -> NL | steven-holl | office building / Amsterdam | No English Wikidata label, but Commons category gives a plausible public-facing name. |
| manual-name-research | medium | q125679108 | Q125679108 | Q125679108 | housing complex at Avenue Céramique 22-26, Céramique-terrein, Maastricht, the Netherlands |  |  | LU -> NL | alvaro-siza-vieira | housing estate / Maastricht | No public-facing English label or Commons category; derive name manually from description/address before writing. |
| commons-name-candidate | medium | q136394553 | Q136394553 | Q136394553 |  | Fontana di Piazzale della Pace (Parma) | fontana-di-piazzale-della-pace-parma | (blank) -> IT | mario-botta | reflecting pool / Parma | No English Wikidata label, but Commons category gives a plausible public-facing name. |
| commons-name-candidate | medium | q134893563 | Q134893563 | Q134893563 |  | Terraços de Bragança | terracos-de-braganca | PT -> PT | alvaro-siza-vieira | housing estate / Misericórdia | No English Wikidata label, but Commons category gives a plausible public-facing name. |
| manual-name-research | medium | q125679066 | Q125679066 | Q125679066 | architectural structure at Passage 26 - 77, Centrum, Den Haag, the Netherlands |  |  | NL -> NL | bernard-tschumi | architectural structure / The Hague | No public-facing English label or Commons category; derive name manually from description/address before writing. |
| manual-name-research | medium | q3412221 | Q3412221 | Q3412221 |  |  |  | FR -> FR | jean-philippe-vassal | campus / Bordeaux | No public-facing English label or Commons category; derive name manually from description/address before writing. |
| manual-name-research | medium | q123517303 | Q123517303 | Q123517303 |  |  |  | PT -> PT | eduardo-souto-de-moura | arts center / Sé, Santa Maria e Meixedo | No public-facing English label or Commons category; derive name manually from description/address before writing. |
| manual-name-research | medium | (missing slug) | 耶稣堂 (圣塞瓦斯蒂安) | Q9006868 | church building in Donostia-San Sebastian, Spain |  |  | ES -> ES | rafael-moneo | church building / San Sebastián | No public-facing English label or Commons category; derive name manually from description/address before writing. |
| commons-name-candidate | medium | q118539028 | Q118539028 | Q118539028 |  | Capela do Monte | capela-do-monte | PT -> PT | alvaro-siza-vieira | chapel / Bensafrim e Barão de São João | No English Wikidata label, but Commons category gives a plausible public-facing name. |

## Recommended Next Step

- No `safe-metadata-cleanup` records remain in this review snapshot.
- Keep `commons-name-candidate` as review-first: Commons category names are useful but not always final display names.
- Do not assign era metadata to `archive-scope-review` records until deciding whether they belong in `buildings`.
- Run `data:plan-eras` after any future metadata write to confirm the remaining queue changes as expected.
