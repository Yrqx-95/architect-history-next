# Postmodern Era Weak Identity Review

Generated: 2026-07-09

## Scope

- This is a manual review note for the `weak-identity-review` lane from `reports/era-slug-postmodern-review-queue.md`.
- It does not write Supabase and does not generate a migration.
- These records should not enter an automatic `postmodern` era write batch until identity, country, and type metadata are reviewed.
- Wikidata is used here only as an external clue source; each record still needs project-level judgment before any data write.

## Summary

| Current slug | Wikidata | Current local state | External clue | Suggested next action |
|---|---|---|---|---|
| `q116481414` | [Q116481414](https://www.wikidata.org/wiki/Q116481414) | `name_en=Q116481414`, architect `christian-de-portzamparc`, year `1984`, no country/type | Wikidata has no English label, but claims France, Christian de Portzamparc, 1984, and instance `music school`. | Research the actual building name before assigning era/type/country. Likely a French music school by Portzamparc, but the label is missing. |
| `q125679109` | [Q125679109](https://www.wikidata.org/wiki/Q125679109) | `name_en=Q125679109`, architect `alvaro-siza-vieira`, year `1985`, country `NL`, no type | Description says housing complex at Parallelweg, Schilderswijk, Den Haag, Netherlands; instance `housing estate`; architects include Álvaro Siza Vieira, Carlos Castanheira, Van den Broek en Bakema. | Rename/slug as a Den Haag housing complex only after checking whether the project should be represented as Siza work, collaboration, or duplicate/fragment. |
| `q125679110` | [Q125679110](https://www.wikidata.org/wiki/Q125679110) | `name_en=Q125679110`, architect `alvaro-siza-vieira`, year `1985`, country `NL`, no type | Description says housing complex at Van der Vennestraat, Schilderswijk, Den Haag, Netherlands; instance `housing estate`; architects include Álvaro Siza Vieira, Carlos Castanheira, Mecanoo. | Review together with `q125679109`; they may be related Schilderswijk housing records and should not be normalized independently without checking duplication. |
| `q125679342` | [Q125679342](https://www.wikidata.org/wiki/Q125679342) | `name_en=Q125679342`, architect `steven-holl`, year `1998`, country `NL`, no type | Description says office building at Sarphatistraat 410, Amsterdam; instance `office building`; architect Steven Holl. | Research the common project name before assigning era/type. Country and architect look plausible, but the public-facing name is missing. |
| `q125679108` | [Q125679108](https://www.wikidata.org/wiki/Q125679108) | `name_en=Q125679108`, architect `alvaro-siza-vieira`, year `1999`, country `LU`, no type | Description says housing complex at Avenue Ceramique, Maastricht, Netherlands; instance `housing estate`; architects include Álvaro Siza Vieira and Carlos Castanheira. | Treat as a likely local country-code mismatch: local `LU` conflicts with Wikidata Netherlands/Maastricht. Verify before any era/type write. |
| `untitled` | [Q127587635](https://www.wikidata.org/wiki/Q127587635) | `name_en=Untitled`, architect `peter-eisenman`, year `1996`, country `LU`, no type | Wikidata label is `Untitled`; description says public-space artwork by Peter Eisenman in Aachen, Germany; instances include `bus shelter` and `sculpture`. | Treat as probably not a normal building archive record. Local `LU` conflicts with Germany/Aachen. Decide whether to exclude, reclassify, or keep as public-art/infrastructure before era assignment. |

## Recommended Order

1. Resolve country conflicts first: `q125679108` and `untitled`.
2. Review possible grouped/duplicate Siza housing records: `q125679109`, `q125679110`, and `q125679108`.
3. Research missing public-facing names: `q116481414` and `q125679342`.
4. Only after identity cleanup, decide whether any of these should receive `era_slug=postmodern`.

## Notes For Future Write Batch

- Do not include these six records in a postmodern automatic write batch by default.
- If any record is corrected, prefer a small dedicated identity/taxonomy migration with rollback notes rather than hiding it inside an era normalization batch.
- If a record remains a weak or non-building entity, mark it as excluded in the future postmodern write report.
