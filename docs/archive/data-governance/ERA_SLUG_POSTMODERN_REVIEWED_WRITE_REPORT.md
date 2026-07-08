# Era Slug Postmodern Reviewed Write Report

Generated: 2026-07-08T23:12:35.119Z

## Scope

- This batch writes only unassigned buildings whose `year_start` fits exactly the `postmodern` era range.
- `postmodern` is used here as a chronological era bucket, not as a style label.
- The batch excludes weak identity records and style hold-outs identified in the postmodern review notes.
- It does not touch `year-overlap`, `missing-year`, `contemporary`, or already assigned records.

## Source Review Notes

- `docs/archive/data-governance/ERA_SLUG_POSTMODERN_WEAK_IDENTITY_REVIEW.md`
- `docs/archive/data-governance/ERA_SLUG_POSTMODERN_STYLE_CONFLICT_REVIEW.md`

## Summary

- Writable decisions: 87
- Excluded from automatic write: 12
- Migration: `db/migrations/v18-normalize-postmodern-reviewed-era-slugs.sql`
- Rollback SQL: `reports/era-slug-postmodern-reviewed-rollback.sql`

## Manual Exclusions

| Group | Building | Name | Year | Current styles | Reason |
|---|---|---|---:|---|---|
| style-hold-out | national-assembly-dhaka | National Assembly Building | 1982 | modernism, brutalism | Late Kahn work with modernism/brutalism style slugs; completion year alone should not make it a postmodern write candidate. |
| weak-identity | q116481414 | Q116481414 | 1984 |  | Wikidata-style placeholder slug with no public-facing label; resolve identity before era assignment. |
| weak-identity | q125679109 | Q125679109 | 1985 |  | Wikidata-style placeholder slug; review with related Siza/Castanheira Schilderswijk housing records before era assignment. |
| weak-identity | q125679110 | Q125679110 | 1985 |  | Wikidata-style placeholder slug; review with related Siza/Castanheira Schilderswijk housing records before era assignment. |
| style-hold-out | church-of-light | Church of the Light | 1989 | minimalism, contemporary-japanese | Ando work better explained through minimalism, concrete, light, and Japanese modernity; hold out from first postmodern batch. |
| style-hold-out | water-temple | Water Temple | 1991 | minimalism, exposed-concrete | Ando work with minimalism/exposed-concrete reading; hold out from first postmodern batch. |
| style-hold-out | naoshima | Naoshima Contemporary Art Museum | 1992 | minimalism, exposed-concrete | Ando museum with minimalism/exposed-concrete reading; hold out from first postmodern batch. |
| style-hold-out | therme-vals | Therme Vals | 1996 | contemporary-swiss, minimalism | Zumthor work better explained through material atmosphere, minimalism, and Swiss contemporary architecture. |
| weak-identity | untitled | Untitled | 1996 |  | Untitled public-art/infrastructure-like record with likely country-code conflict; resolve whether it belongs in the building archive before era assignment. |
| style-hold-out | kunsthaus-bregenz | Kunsthaus Bregenz | 1997 | contemporary-swiss, minimalism | Zumthor work better explained through material atmosphere, minimalism, and Swiss contemporary architecture. |
| weak-identity | q125679342 | Q125679342 | 1998 |  | Wikidata-style placeholder slug; research public-facing Steven Holl project name before era assignment. |
| weak-identity | q125679108 | Q125679108 | 1999 |  | Wikidata-style placeholder slug with likely country-code conflict; resolve identity and country before era assignment. |

## Decisions

| Building | Name | Year | Architect | Type | Current styles | Reason |
|---|---|---:|---|---|---|---|
| miyagi-museum-of-art | Miyagi Museum of Art | 1981 | kunio-maekawa | cultural |  | year_start 1981 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| national-museum-of-japanese-history | National Museum of Japanese History | 1981 | yoshinobu-ashihara | cultural |  | year_start 1981 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| rotonda-house | Rotonda House | 1981 | mario-botta | residential |  | year_start 1981 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| kumamoto-prefectural-theater | Kumamoto Prefectural Theater | 1982 | kunio-maekawa | cultural |  | year_start 1982 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| kuwait-national-assembly-building | Kuwait National Assembly Building | 1982 | j-rn-utzon | government |  | year_start 1982 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| wells-fargo-tower | Wells Fargo Tower | 1982 | paul-rudolph |  |  | year_start 1982 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| iwasaki-art-museum | Iwasaki Art Museum | 1983 | fumihiko-maki | cultural |  | year_start 1983 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| paris-opera-ballet-school | Paris Opera Ballet School | 1983 | christian-de-portzamparc | educational |  | year_start 1983 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| michael-and-joan-lenihan-glazer | Michael and Joan Lenihan Glazer Residence | 1984 | paul-rudolph | residential |  | year_start 1984 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| hongkong-bank | HSBC Building Hong Kong | 1985 | norman-foster | office | high-tech, structural-expressionism | year_start 1985 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| ishigaki-civic-hall | Ishigaki Civic Hall | 1985 | kunio-maekawa | cultural |  | year_start 1985 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| montevideo-shopping | Montevideo Shopping | 1985 | eladio-dieste | commercial |  | year_start 1985 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| niigata-city-art-museum | Niigata City Art Museum | 1985 | kunio-maekawa | cultural |  | year_start 1985 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| spiral | Spiral | 1985 | fumihiko-maki | cultural |  | year_start 1985 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| groninger-museum-building | Groninger Museum Building | 1986 | michele-de-lucchi | cultural |  | year_start 1986 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| intiland-tower | Intiland Tower | 1986 | paul-rudolph |  |  | year_start 1986 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| library-of-the-university-of | Library of the University of Deusto | 1986 | rafael-moneo |  |  | year_start 1986 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| lloyds-building | Lloyd's building | 1986 | richard-rogers |  |  | year_start 1986 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| makuhari-messe | Makuhari Messe | 1986 | fumihiko-maki |  |  | year_start 1986 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| national-museum-of-roman-art | National Museum of Roman Art | 1986 | rafael-moneo | cultural |  | year_start 1986 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| one-raffles-place | One Raffles Place | 1986 | kenzo-tange |  |  | year_start 1986 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| riverside-centre-brisbane | Riverside Centre, Brisbane | 1986 | harry-seidler |  |  | year_start 1986 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| rovaniemi-town-hall | Rovaniemi Town Hall | 1986 | alvar-aalto | government |  | year_start 1986 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| 1-cobham-mews-studios | 1 Cobham Mews Studios | 1987 | david-chipperfield | residential |  | year_start 1987 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| menil-collection | Menil Collection | 1987 | renzo-piano | cultural | modernism, high-tech | year_start 1987 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| museum-of-modern-and-contemporary | Museum of Modern and Contemporary Art of Trento and Rovereto | 1987 | mario-botta | cultural |  | year_start 1987 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| nippon-gaishi-hall | Nippon Gaishi Hall | 1987 | kenzo-tange |  |  | year_start 1987 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| paustian-house | Paustian House | 1987 | j-rn-utzon | residential |  | year_start 1987 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| seinajoki-city-theatre | Seinäjoki City Theatre | 1987 | alvar-aalto | cultural |  | year_start 1987 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| lippo-centre | Lippo Centre | 1988 | paul-rudolph |  |  | year_start 1988 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| la-fortezza | La Fortezza | 1989 | mario-botta |  |  | year_start 1989 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| lake-biwa-otsu-prince-hotel | Lake Biwa Otsu Prince Hotel | 1989 | kenzo-tange | commercial |  | year_start 1989 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| louvre-pyramid | Louvre Pyramid | 1989 | im-pei | cultural | modernism, geometric-abstraction | year_start 1989 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| serralves-museum-of-contemporary-art | Serralves Museum of Contemporary Art | 1989 | alvaro-siza-vieira | cultural |  | year_start 1989 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| toyama-shimin-plaza | Toyama Shimin Plaza | 1989 | fumihiko-maki |  |  | year_start 1989 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| wexner-center-for-the-arts | Wexner Center for the Arts | 1989 | peter-eisenman |  |  | year_start 1989 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| yokohama-museum-of-art | Yokohama Museum of Art | 1989 | kenzo-tange | cultural |  | year_start 1989 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| bank-of-china-tower | Bank of China Tower | 1990 | im-pei | commercial | modernism, geometric-abstraction | year_start 1990 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| coaty-restaurante | Coaty Restaurante | 1990 | lina-bo-bardi | commercial |  | year_start 1990 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| italie-deux | Italie Deux | 1990 | kenzo-tange | commercial |  | year_start 1990 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| j-m-teixeira-house | J. M. Teixeira House | 1990 | alvaro-siza-vieira | residential |  | year_start 1990 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| presidential-palace-damascus | Presidential Palace, Damascus | 1990 | kenzo-tange | government |  | year_start 1990 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| tokyo-metropolitan-theatre | Tokyo Metropolitan Theatre | 1990 | yoshinobu-ashihara | cultural |  | year_start 1990 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| tschumi-pavilion | Tschumi Pavilion | 1990 | bernard-tschumi | temporary |  | year_start 1990 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| watari-museum-of-contemporary-art | Watari Museum of Contemporary Art | 1990 | mario-botta | cultural |  | year_start 1990 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| okayama-symphony-hall | Okayama Symphony Hall | 1991 | yoshinobu-ashihara | cultural |  | year_start 1991 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| qv-1 | QV.1 | 1991 | harry-seidler |  |  | year_start 1991 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| tokyo-metropolitan-government | Tokyo Metropolitan Government Building | 1991 | kenzo-tange | government | japanese-modern, metabolism | year_start 1991 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| centro-commerciale-le-torri | Centro commerciale Le Torri | 1992 | mario-botta | commercial |  | year_start 1992 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| evry-cathedral | Évry Cathedral | 1992 | mario-botta | religious |  | year_start 1992 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| kunsthal | Kunsthal Rotterdam | 1992 | koolhaas | cultural | deconstructivism | year_start 1992 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| saint-peter-church | Saint Peter Church | 1992 | mario-botta | religious |  | year_start 1992 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| san-francisco-museum-of-modern | San Francisco Museum of Modern Art | 1992 | mario-botta |  |  | year_start 1992 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| thyssen-bornemisza-museum | Thyssen-Bornemisza Museum | 1992 | rafael-moneo | cultural |  | year_start 1992 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| apa-hotel-resort-tokyo-bay | APA Hotel & Resort Tokyo Bay Makuhari | 1993 | kenzo-tange | commercial |  | year_start 1993 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| teatro-oficina | Teatro Oficina | 1993 | lina-bo-bardi | cultural |  | year_start 1993 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| european-court-of-human-rights | European Court of Human Rights building | 1994 | richard-rogers | government |  | year_start 1994 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| kansai-airport | Kansai International Airport | 1994 | renzo-piano | transportation | high-tech | year_start 1994 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| shinjuku-park-tower | Shinjuku Park Tower | 1994 | kenzo-tange |  |  | year_start 1994 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| the-concourse | The Concourse | 1994 | paul-rudolph | transportation |  | year_start 1994 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| yokosuka-arts-theatre | Yokosuka Arts Theatre | 1994 | kenzo-tange | cultural |  | year_start 1994 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| museu-brasileiro-da-escultura | Museu Brasileiro da Escultura | 1995 | paulo-mendes-da-rocha | cultural |  | year_start 1995 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| tour-de-lille | Tour de Lille | 1995 | christian-de-portzamparc |  |  | year_start 1995 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| dancing-house | Dancing House | 1996 | frank-gehry | commercial | deconstructivism, sculptural-architecture | year_start 1996 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| fcg-building | FCG Building | 1996 | kenzo-tange |  |  | year_start 1996 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| museum-tinguely | Museum Tinguely | 1996 | mario-botta | cultural |  | year_start 1996 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| tokyo-fashion-town-building | Tokyo Fashion Town Building | 1996 | kenzo-tange |  |  | year_start 1996 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| esbjerg-performing-arts-centre | Esbjerg Performing Arts Centre | 1997 | j-rn-utzon | cultural |  | year_start 1997 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| guggenheim-bilbao | Guggenheim Museum Bilbao | 1997 | frank-gehry | cultural | deconstructivism, sculptural-architecture | year_start 1997 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| miho-museum | Miho Museum | 1997 | im-pei | cultural | modernism, geometric-abstraction | year_start 1997 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| 88-wood-street | 88 Wood Street | 1998 | richard-rogers |  |  | year_start 1998 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| asian-arts-museum | Asian Arts Museum | 1998 | kenzo-tange | cultural |  | year_start 1998 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| bodmer-foundation | Bodmer Foundation | 1998 | mario-botta |  |  | year_start 1998 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| bordeaux-courthouse | Bordeaux Courthouse | 1998 | richard-rogers | government |  | year_start 1998 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| cymbalista-synagogue-and-jewish-heritage | Cymbalista Synagogue and Jewish Heritage Center | 1998 | mario-botta |  |  | year_start 1998 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| horizon-apartments | Horizon Apartments | 1998 | harry-seidler | residential |  | year_start 1998 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| kiasma | Kiasma | 1998 | steven-holl | cultural |  | year_start 1998 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| kuala-lumpur-airport | Kuala Lumpur International Airport | 1998 | kurokawa | transportation | high-tech, contemporary-architecture | year_start 1998 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| luis-barragan-house-and-studio | Luis Barragán House and Studio | 1998 | luis-barragan | residential |  | year_start 1998 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| pavilhao-de-portugal | Pavilhão de Portugal | 1998 | alvaro-siza-vieira |  |  | year_start 1998 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| alfred-lerner-hall | Alfred Lerner Hall | 1999 | bernard-tschumi |  |  | year_start 1999 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| dortmund-city-and-state-library | Dortmund City and State Library | 1999 | mario-botta | cultural |  | year_start 1999 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| kursaal-convention-centre | Kursaal convention centre | 1999 | rafael-moneo |  |  | year_start 1999 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| lauditori | L'Auditori | 1999 | rafael-moneo | cultural |  | year_start 1999 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| reichstag-dome | Reichstag Dome | 1999 | norman-foster | government | high-tech, adaptive-reuse | year_start 1999 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| tokyo-dome-hotel | Tokyo Dome Hotel | 1999 | kenzo-tange |  |  | year_start 1999 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |
| toyama-international-conference-center | Toyama International Conference Center | 1999 | fumihiko-maki |  |  | year_start 1999 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label |

## Verification Plan

- Apply the generated migration to Supabase production only after human review.
- Verify `buildings.era_slug` populated count increases by the writable decision count.
- Verify `building_eras` receives the same relationship count for this batch.
- Run `npm run data:audit`, `npm run data:plan-eras`, `npm run typecheck`, `npm run lint`, and `git diff --check`.
