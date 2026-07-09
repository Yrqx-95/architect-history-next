# Era Identity Manual Reviewed Write Report

Generated: 2026-07-09

## Scope

- Applied eight manually researched weak-identity records.
- Supabase migration: `normalize_manual_identity_era_slugs`.
- Local migration file: `db/migrations/v21-normalize-manual-identity-era-slugs.sql`.
- This batch resolved records where Wikidata IDs, blank/Q-style slugs, and non-English labels needed external name verification before era assignment.

## Decisions

| Wikidata | Previous slug | New slug | New name | Type | City | Country | Era |
|---|---|---|---|---|---|---|---|
| Q116481414 | q116481414 | conservatoire-erik-satie | Conservatoire Erik Satie | educational | Paris | France / FR | postmodern |
| Q125679109 | q125679109 | punt-en-komma-social-housing | Punt en Komma Social Housing | residential | The Hague | Netherlands / NL | postmodern |
| Q125679110 | q125679110 | duas-habitacoes-e-duas-lojas | Duas Habitações e Duas Lojas | mixed-use | The Hague | Netherlands / NL | postmodern |
| Q125679108 | q125679108 | ceramique-terrein-apartments-offices | Céramique Terrein Apartments and Offices | mixed-use | Maastricht | Netherlands / NL | postmodern |
| Q125679066 | q125679066 | de-passage-the-hague | De Passage | commercial | The Hague | Netherlands / NL | contemporary |
| Q3412221 | q3412221 | university-center-management-sciences-bordeaux | University Center of Management Sciences, Bordeaux | educational | Bordeaux | France / FR | contemporary |
| Q123517303 | q123517303 | centro-de-arte-contemporanea-graca-morais | Centro de Arte Contemporânea Graça Morais | cultural | Bragança | Portugal / PT | contemporary |
| Q9006868 | (blank) | iesu-church-san-sebastian | Iesu Church in San Sebastián | religious | San Sebastián | Spain / ES | contemporary |

## Source Notes

- `Conservatoire Erik Satie`: Ville de Paris identifies the conservatory as a Christian de Portzamparc project inaugurated in 1984; Paris Promeneurs also names the music conservatory and address.
- `Punt en Komma Social Housing`: CCA identifies the Siza/Castanheira Schilderswijk project as `106 Habitações Punt en Komma`.
- `Duas Habitações e Duas Lojas`: CCA identifies the Van der Vennestraat project as a housing and shopping complex in Schilderswijk.
- `Céramique Terrein Apartments and Offices`: CCA identifies the Maastricht project as Céramique Terrein apartments and offices; this also corrected the prior `LU` country code to `NL`.
- `De Passage`: Bernard Tschumi Architects identifies De Passage as the Hague passage project; secondary coverage describes the commercial passage connection.
- `University Center of Management Sciences, Bordeaux`: Lacaton & Vassal and Arquitectura Viva identify the Bordeaux management sciences campus project.
- `Centro de Arte Contemporânea Graça Morais`: VisitPortugal, Google Arts & Culture, and architecture directory sources identify the Souto de Moura cultural center in Bragança, opened in 2008.
- `Iesu Church in San Sebastián`: Rafael Moneo and Arquitectura Viva identify the church, opening/construction period, city, and religious use.

## Supabase Verification

- Supabase v21 migration applied: `normalize_manual_identity_era_slugs`.
- All 8 written records now have readable slug, `name_en`, city, country, `country_code`, `type_slug`, and `era_slug`.
- All 8 written records have a matching `building_eras` row.
- `buildings.era_slug`: 420 filled, 455 missing, 875 total.
- `building_eras`: 420 rows.

## Queue Impact

- `data:review-era-identity`: 2 candidates remain.
- `data:review-era-year-unique`: 11 candidates remain.
- `data:plan-eras`: 343 `missing-year`, 101 `year-overlap`, 11 `year-unique`.
- `data:audit`: 0 errors, 865 warnings, 2490 info, 3355 total.

## Remaining Risk

- The remaining identity queue is now archive-scope, not normal name cleanup:
  - `untitled` / `Q127587635`: public artwork/infrastructure-like bus shelter record with country mismatch.
  - `q136394553` / `Q136394553`: reflecting pool / fountain-like record.
- The remaining `postmodern-style-holdout` records should still not be auto-written as postmodern until era/style wording is settled.
- Historical-date records need phase/year review before assignment.

## Source Links

- https://www.paris.fr/lieux/conservatoire-municipal-erik-satie-1599
- https://paris-promeneurs.com/conservatoire-de-musique-erik/
- https://www.cca.qc.ca/en/archives/447183/alvaro-siza-fonds/469692/architectural-projects/472409/106-habitacoes-punt-en-komma-punt-en-komma-social-housing-schilderswijk-west-the-hague-the-netherlands-1981-1990
- https://www.cca.qc.ca/en/archives/447183/alvaro-siza-fonds/469692/architectural-projects/472954/duas-habitacoes-e-duas-lojas-housing-and-shopping-complex-schilderswijk-the-hague-the-netherlands-1985-1988
- https://www.cca.qc.ca/en/archives/447183/alvaro-siza-fonds/469692/architectural-projects/498351/ceramique-terrein-blocos-de-habitacao-e-escritorios-ceramic-terrain-apartments-and-offices-maastricht-the-netherlands-1990
- https://www.tschumi.com/projects/65
- https://www.lacatonvassal.com/index.php?idp=10
- https://arquitecturaviva.com/works/universidad-de-ciencias-de-la-administracion-9
- https://www.visitportugal.com/en/content/centro-de-arte-contemporanea-graca-morais
- https://artsandculture.google.com/story/gra%C3%A7a-morais-contemporary-art-centre-rede-portuguesa-de-arte-contemporanea-a-norte-rpac-norte/BAUhC7nQxfIBNA?hl=en
- https://espacodearquitetura.com/projetos/centro-de-arte-contemporanea-graca-morais/
- https://rafaelmoneo.com/en/projects/iesu-church-in-san-sebastian/
- https://arquitecturaviva.com/works/parroquia-iesu-6
