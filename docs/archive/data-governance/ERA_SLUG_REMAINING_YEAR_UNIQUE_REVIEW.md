# Era Slug Remaining Year-Unique Review

Generated: 2026-07-09T04:12:12.101Z

## Scope

- This is a read-only review queue for the remaining `year-unique` era candidates.
- It does not write Supabase and does not generate a migration.
- These records stayed unassigned after the high-confidence, year-unique A, contemporary, and reviewed postmodern batches.
- The goal is to make the remaining exceptions explicit before deciding whether any future write batch is justified.

## Summary By Review Lane

| Review lane | Count |
|---|---:|
| historical-date-review | 3 |
| postmodern-style-holdout | 6 |
| postmodern-weak-identity | 5 |
| contemporary-identity-cleanup | 5 |
| unexpected-year-unique | 0 |

## Summary By Candidate Era

| Candidate era | Count |
|---|---:|
| postmodern | 11 |
| contemporary | 5 |
| early-modern | 1 |
| industrial-revolution | 1 |
| post-war | 1 |

## Review Queue

| Lane | Building | Name | Year | Candidate era | Architect | Type | Styles | Hint | Next action |
|---|---|---|---:|---|---|---|---|---|---|
| historical-date-review | fondazione-querini-stampalia | Fondazione Querini Stampalia | 1869 | industrial-revolution |  |  |  | Current year_start points to the institution/building chronology rather than the Scarpa intervention most readers will expect; review date meaning before assigning industrial-revolution. | Verify the building phase/year semantics before preparing any era write. |
| historical-date-review | cleveland-museum-of-art-building | Cleveland Museum of Art building | 1913 | early-modern |  | cultural |  | Candidate era is mechanically clear, but architect metadata is missing; review whether 1913 is the intended building phase before assigning early-modern. | Verify the building phase/year semantics before preparing any era write. |
| historical-date-review | swedish-centre-for-architecture-and | Swedish Centre for Architecture and Design | 1962 | post-war | rafael-moneo |  |  | Current architect/year pairing looks suspicious for this institution; review identity, architect, and building phase before assigning post-war. | Verify the building phase/year semantics before preparing any era write. |
| postmodern-style-holdout | national-assembly-dhaka | National Assembly Building | 1982 | postmodern | louis-kahn | government | modernism, brutalism | Late Kahn work with modernism/brutalism style slugs; completion year alone should not make it a postmodern write candidate. | Resolve whether this should remain an era exception or receive a clearer period label with style caveats. |
| postmodern-style-holdout | church-of-light | Church of the Light | 1989 | postmodern | tadao-ando | religious | minimalism, contemporary-japanese | Ando work better explained through minimalism, concrete, light, and Japanese modernity; hold out from postmodern era assignment until taxonomy wording is settled. | Resolve whether this should remain an era exception or receive a clearer period label with style caveats. |
| postmodern-style-holdout | water-temple | Water Temple | 1991 | postmodern | tadao-ando | religious | minimalism, exposed-concrete | Ando work with minimalism/exposed-concrete reading; review with the Ando group before assigning postmodern. | Resolve whether this should remain an era exception or receive a clearer period label with style caveats. |
| postmodern-style-holdout | naoshima | Naoshima Contemporary Art Museum | 1992 | postmodern | tadao-ando | cultural | minimalism, exposed-concrete | Ando museum with minimalism/exposed-concrete reading; review with the Ando group before assigning postmodern. | Resolve whether this should remain an era exception or receive a clearer period label with style caveats. |
| postmodern-style-holdout | therme-vals | Therme Vals | 1996 | postmodern | zumthor | leisure | contemporary-swiss, minimalism | Zumthor work better explained through material atmosphere, minimalism, and Swiss contemporary architecture. | Resolve whether this should remain an era exception or receive a clearer period label with style caveats. |
| postmodern-style-holdout | kunsthaus-bregenz | Kunsthaus Bregenz | 1997 | postmodern | zumthor | cultural | contemporary-swiss, minimalism | Zumthor work better explained through material atmosphere, minimalism, and Swiss contemporary architecture. | Resolve whether this should remain an era exception or receive a clearer period label with style caveats. |
| postmodern-weak-identity | q116481414 | Q116481414 | 1984 | postmodern | christian-de-portzamparc |  |  | Wikidata-style placeholder slug with no public-facing label; resolve identity before era assignment. | Fix identity, country, type, and display label before assigning era metadata. |
| postmodern-weak-identity | q125679109 | Q125679109 | 1985 | postmodern | alvaro-siza-vieira |  |  | Wikidata-style placeholder slug; review with related Siza/Castanheira Schilderswijk housing records before era assignment. | Fix identity, country, type, and display label before assigning era metadata. |
| postmodern-weak-identity | q125679110 | Q125679110 | 1985 | postmodern | alvaro-siza-vieira |  |  | Wikidata-style placeholder slug; review with related Siza/Castanheira Schilderswijk housing records before era assignment. | Fix identity, country, type, and display label before assigning era metadata. |
| postmodern-weak-identity | untitled | Untitled | 1996 | postmodern | peter-eisenman |  |  | Untitled public-art/infrastructure-like record with likely country-code conflict; resolve whether it belongs in the building archive before era assignment. | Fix identity, country, type, and display label before assigning era metadata. |
| postmodern-weak-identity | q125679108 | Q125679108 | 1999 | postmodern | alvaro-siza-vieira |  |  | Wikidata-style placeholder slug with likely country-code conflict; resolve identity and country before era assignment. | Fix identity, country, type, and display label before assigning era metadata. |
| contemporary-identity-cleanup | q136394553 | Q136394553 | 2001 | contemporary | mario-botta |  |  | Wikidata-style placeholder slug; keep for identity cleanup before era assignment. | Fix identity/slug first; do not hide malformed records inside an era normalization batch. |
| contemporary-identity-cleanup | q125679066 | Q125679066 | 2005 | contemporary | bernard-tschumi |  |  | Wikidata-style placeholder slug; keep for identity cleanup before era assignment. | Fix identity/slug first; do not hide malformed records inside an era normalization batch. |
| contemporary-identity-cleanup | q3412221 | Q3412221 | 2007 | contemporary | jean-philippe-vassal |  |  | Wikidata-style placeholder slug; keep for identity cleanup before era assignment. | Fix identity/slug first; do not hide malformed records inside an era normalization batch. |
| contemporary-identity-cleanup | q123517303 | Q123517303 | 2008 | contemporary | eduardo-souto-de-moura |  |  | Wikidata-style placeholder slug; keep for identity cleanup before era assignment. | Fix identity/slug first; do not hide malformed records inside an era normalization batch. |
| contemporary-identity-cleanup | (missing slug) | 耶稣堂 (圣塞瓦斯蒂安) | 2011 | contemporary | rafael-moneo |  |  | Missing slug; cannot safely write era metadata until the record has a stable slug. | Fix identity/slug first; do not hide malformed records inside an era normalization batch. |

## Recommended Next Step

- Do not auto-write this queue as one batch.
- Resolve `contemporary-identity-cleanup` and `postmodern-weak-identity` as identity/taxonomy fixes first.
- Review `historical-date-review` records against project phase/year semantics before assigning any era.
- Keep `postmodern-style-holdout` separate from chronological batch work until the era/style vocabulary is settled.
