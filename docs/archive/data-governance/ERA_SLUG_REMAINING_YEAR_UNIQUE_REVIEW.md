# Era Slug Remaining Year-Unique Review

Generated: 2026-07-09T15:36:27.455Z

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
| postmodern-weak-identity | 0 |
| contemporary-identity-cleanup | 0 |
| unexpected-year-unique | 0 |

## Summary By Candidate Era

| Candidate era | Count |
|---|---:|
| postmodern | 6 |
| early-modern | 1 |
| industrial-revolution | 1 |
| post-war | 1 |

## Review Queue

| Lane | Building | Name | Year | Candidate era | Architect | Type | Styles | Hint | Next action |
|---|---|---|---:|---|---|---|---|---|---|
| historical-date-review | fondazione-querini-stampalia | Fondazione Querini Stampalia | 1869 | industrial-revolution |  |  |  | Source-backed holdout: 1869 points to the foundation/institution chronology, while the Carlo Scarpa architectural intervention belongs to 1959-1963; do not assign industrial-revolution to the Scarpa reading. | Verify the building phase/year semantics before preparing any era write. |
| historical-date-review | cleveland-museum-of-art-building | Cleveland Museum of Art building | 1913 | early-modern |  | cultural |  | Source-backed holdout: 1913 points to the institution/founding, while the Hubbell & Benes building opened in 1916 and the canonical cleveland-museum-of-art record already carries early-modern. | Verify the building phase/year semantics before preparing any era write. |
| historical-date-review | swedish-centre-for-architecture-and | Swedish Centre for Architecture and Design | 1962 | post-war | rafael-moneo |  |  | Source-backed holdout: 1962 points to the museum institution, while Rafael Moneo belongs to the 1991 competition / 1998 Skeppsholmen museum complex; do not assign post-war from the mixed record. | Verify the building phase/year semantics before preparing any era write. |
| postmodern-style-holdout | national-assembly-dhaka | National Assembly Building | 1982 | postmodern | louis-kahn | government | modernism, brutalism | Late Kahn work with modernism/brutalism style slugs; completion year alone should not make it a postmodern write candidate. | Resolve whether this should remain an era exception or receive a clearer period label with style caveats. |
| postmodern-style-holdout | church-of-light | Church of the Light | 1989 | postmodern | tadao-ando | religious | minimalism, contemporary-japanese | Ando work better explained through minimalism, concrete, light, and Japanese modernity; hold out from postmodern era assignment until taxonomy wording is settled. | Resolve whether this should remain an era exception or receive a clearer period label with style caveats. |
| postmodern-style-holdout | water-temple | Water Temple | 1991 | postmodern | tadao-ando | religious | minimalism, exposed-concrete | Ando work with minimalism/exposed-concrete reading; review with the Ando group before assigning postmodern. | Resolve whether this should remain an era exception or receive a clearer period label with style caveats. |
| postmodern-style-holdout | naoshima | Naoshima Contemporary Art Museum | 1992 | postmodern | tadao-ando | cultural | minimalism, exposed-concrete | Ando museum with minimalism/exposed-concrete reading; review with the Ando group before assigning postmodern. | Resolve whether this should remain an era exception or receive a clearer period label with style caveats. |
| postmodern-style-holdout | therme-vals | Therme Vals | 1996 | postmodern | zumthor | leisure | contemporary-swiss, minimalism | Zumthor work better explained through material atmosphere, minimalism, and Swiss contemporary architecture. | Resolve whether this should remain an era exception or receive a clearer period label with style caveats. |
| postmodern-style-holdout | kunsthaus-bregenz | Kunsthaus Bregenz | 1997 | postmodern | zumthor | cultural | contemporary-swiss, minimalism | Zumthor work better explained through material atmosphere, minimalism, and Swiss contemporary architecture. | Resolve whether this should remain an era exception or receive a clearer period label with style caveats. |

## Source-Backed Historical Date Findings

| Building | Finding | Source |
|---|---|---|
| fondazione-querini-stampalia | The official Fondazione page says the foundation has promoted its mission since 1869, but its architecture page separately dates Carlo Scarpa redesigning the ground floor and garden to 1959-1963. | [Fondazione Querini Stampalia, Architecture](https://www.querinistampalia.org/en/category-collection/architecture/) |
| cleveland-museum-of-art-building | The Cleveland Museum of Art article identifies Benjamin S. Hubbell and Dominick W. Benes as architects of the Cleveland Museum of Art (1916); the canonical cleveland-museum-of-art record already has early-modern. | [Cleveland Museum of Art, Cultural Visionary](https://www.clevelandart.org/articles/cultural-visonary) |
| swedish-centre-for-architecture-and | ArkDes dates the museum founding to 1962, Rafael Moneo winning the international competition to 1991, and the new Skeppsholmen buildings to 1998. | [ArkDes, The history of ArkDes](https://arkdes.se/en/about/the-history-of-arkdes/) |

## Recommended Next Step

- Do not auto-write this queue as one batch.
- No identity cleanup records remain in this review snapshot.
- Treat `historical-date-review` as source-backed holdouts, not as ready era writes.
- Keep `postmodern-style-holdout` separate from chronological batch work until the era/style vocabulary is settled.
