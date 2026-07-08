# Type Slug Medium Review

Generated: 2026-06-08T16:58:55.534Z

## Scope

- Recomputed medium-confidence `type_slug` candidates from the current database after Sprint 03.
- No database writes were performed.
- `country_code` and `era_slug` were not processed.
- No new `building_types` were added.

## Summary

- Total buildings: 875
- Remaining missing type_slug: 423
- Medium-confidence candidates: 273
- Manual / no-rule candidates: 150
- A. Safe after rule refinement: 71
- B. Needs human review: 200
- C. Reject / unsafe: 2
- Estimated safe writes next round: 71

## Category Distribution By Candidate Type

### A. Safe After Rule Refinement

| type_slug | Count |
|---|---|
| cultural | 26 |
| government | 23 |
| religious | 7 |
| temporary | 4 |
| educational | 3 |
| sports | 3 |
| transportation | 3 |
| monument | 1 |
| research-institute | 1 |

### B. Needs Human Review

| type_slug | Count |
|---|---|
| office | 112 |
| residential | 28 |
| civic-public | 27 |
| public-space | 9 |
| cultural | 7 |
| religious | 5 |
| leisure | 4 |
| sports | 3 |
| temporary | 2 |
| transportation | 2 |
| educational | 1 |

### C. Reject / Unsafe

| type_slug | Count |
|---|---|
| cultural | 1 |
| religious | 1 |

## Representative Cases

### A. Safe After Rule Refinement

| Building | Name | Candidate | Subtype | Evidence | Reason |
|---|---|---|---|---|---|
| airman-memorial-chapel | Airman Memorial Chapel | religious | cathedral | chapel | The conflict is caused by a known compound phrase; the specific phrase should outrank the generic token. |
| hirshhorn-museum-and-sculpture-garden | Hirshhorn Museum and Sculpture Garden | cultural | museum | museum | A strong type word was present, but the current rules downgraded it because another broad rule also matched. |
| european-court-of-human-rights | European Court of Human Rights building | government | government | court of | A strong type word was present, but the current rules downgraded it because another broad rule also matched. |
| centre-georges-pompidou | Centre Georges Pompidou | cultural | hall-cultural | centre georges pompidou | A strong type word was present, but the current rules downgraded it because another broad rule also matched. |
| pa-technology-cambridge-laboratory-pats-center | PA Technology Cambridge Laboratory (PATS-Center) | research-institute | research | laboratory | A strong type word was present, but the current rules downgraded it because another broad rule also matched. |
| paleis-of-justice-in-antwerp | Paleis of Justice in Antwerp | government | government | justice | A strong type word was present, but the current rules downgraded it because another broad rule also matched. |
| serpentine-gallery-pavilion-2005 | Serpentine Gallery Pavilion 2005 | cultural | art-museum | gallery | A strong type word was present, but the current rules downgraded it because another broad rule also matched. |
| logrono-town-hall | Logroño town hall | government | government | town hall | A strong type word was present, but the current rules downgraded it because another broad rule also matched. |
| footbridge-of-the-science-museum | Footbridge of the Science Museum (Valladolid) | cultural | museum | museum | A strong type word was present, but the current rules downgraded it because another broad rule also matched. |
| atocha-cercanias | Atocha-Cercanías | transportation | station-intl | atocha | The matched word is a relatively specific function term; it can be promoted after narrowing the regex. |
| carlos-ramos-pavilion | Carlos Ramos Pavilion | temporary | pavilion | pavilion | The matched word is a relatively specific function term; it can be promoted after narrowing the regex. |
| bank-of-spain-headquarters | Bank of Spain headquarters | government | government | bank of spain headquarters | A strong type word was present, but the current rules downgraded it because another broad rule also matched. |
| r-dovre-town-hall | Rødovre Town Hall | government | government | town hall | A strong type word was present, but the current rules downgraded it because another broad rule also matched. |
| rudersdal-town-hall | Rudersdal Town Hall | government | government | town hall | A strong type word was present, but the current rules downgraded it because another broad rule also matched. |
| nagano-city-arts-center | Nagano City Arts Center | cultural | museum | arts center | A strong type word was present, but the current rules downgraded it because another broad rule also matched. |
| sydney-opera-house | Sydney Opera House | cultural | museum | opera house | The conflict is caused by a known compound phrase; the specific phrase should outrank the generic token. |
| aarhus-city-hall | Aarhus City Hall | government | government | city hall | A strong type word was present, but the current rules downgraded it because another broad rule also matched. |
| kuwait-national-assembly-building | Kuwait National Assembly Building | government | government | assembly | A strong type word was present, but the current rules downgraded it because another broad rule also matched. |
| kirishima-international-concert-hall | Kirishima International Concert Hall | cultural | museum | concert hall | A strong type word was present, but the current rules downgraded it because another broad rule also matched. |
| de-la-warr-pavilion | De La Warr Pavilion | temporary | pavilion | pavilion | The matched word is a relatively specific function term; it can be promoted after narrowing the regex. |
| campbell-sports-center | Campbell Sports Center | sports | stadium-intl | sports center | A strong type word was present, but the current rules downgraded it because another broad rule also matched. |
| madrid-puerta-de-atocha-almudena-grandes | Madrid-Puerta de Atocha-Almudena Grandes | transportation | station-intl | atocha | The matched word is a relatively specific function term; it can be promoted after narrowing the regex. |
| shangyin-opera-house | Shangyin Opera House | cultural | museum | opera house | The conflict is caused by a known compound phrase; the specific phrase should outrank the generic token. |
| tschumi-pavilion | Tschumi Pavilion | temporary | pavilion | pavilion | The matched word is a relatively specific function term; it can be promoted after narrowing the regex. |
| french-embassy-building | French Embassy building | government | government | embassy | A strong type word was present, but the current rules downgraded it because another broad rule also matched. |
| dar-al-islam | Dar al-Islam | religious | religious-intl | dar-al-islam | The matched word is a relatively specific function term; it can be promoted after narrowing the regex. |
| sao-paulo-museum-of-art | São Paulo Museum of Art building | cultural | art-museum | museum of art | A strong type word was present, but the current rules downgraded it because another broad rule also matched. |
| sri-lankan-parliament-building | Sri Lankan Parliament Building | government | government | parliament | A strong type word was present, but the current rules downgraded it because another broad rule also matched. |
| chiesa-di-nostra-signora-del | Chiesa di Nostra Signora del Cadore | religious | religious-intl | chiesa | The matched word is a relatively specific function term; it can be promoted after narrowing the regex. |
| finnish-pavilion | Finnish pavilion | temporary | pavilion | pavilion | The matched word is a relatively specific function term; it can be promoted after narrowing the regex. |
| sports-hall-u2 | Sports Hall U2 | sports | stadium | sports hall | A strong type word was present, but the current rules downgraded it because another broad rule also matched. |
| grosse-pointe-public-library-central | Grosse Pointe Public Library Central Branch | cultural | museum | library | A strong type word was present, but the current rules downgraded it because another broad rule also matched. |
| helsinki-university-of-technology-main | Helsinki University of Technology Main Building | educational | school-university | university | A strong type word was present, but the current rules downgraded it because another broad rule also matched. |
| rovaniemi-town-hall | Rovaniemi Town Hall | government | government | town hall | A strong type word was present, but the current rules downgraded it because another broad rule also matched. |
| robert-c-weaver-federal-building | Robert C. Weaver Federal Building | government | government | federal building | A strong type word was present, but the current rules downgraded it because another broad rule also matched. |
| chapelle-cumenique-de-flaine | chapelle œcuménique de Flaine | religious | religious-intl | chapelle | The matched word is a relatively specific function term; it can be promoted after narrowing the regex. |
| murray-d-lincoln-campus-center | Murray D. Lincoln Campus Center | educational | school-university | campus | A strong type word was present, but the current rules downgraded it because another broad rule also matched. |
| cleveland-museum-of-art-building | Cleveland Museum of Art building | cultural | art-museum | museum of art | A strong type word was present, but the current rules downgraded it because another broad rule also matched. |
| los-angeles-county-hall-of | Los Angeles County Hall of Records | government | government | county hall | A strong type word was present, but the current rules downgraded it because another broad rule also matched. |
| government-service-center | Government Service Center | government | government | government | A strong type word was present, but the current rules downgraded it because another broad rule also matched. |

### B. Needs Human Review

| Building | Name | Candidate | Subtype | Evidence | Reason |
|---|---|---|---|---|---|
| parc1 | Parc1 | office | tower-office | parc1 | `hall`, `center/centre`, `tower`, `building`, `house`, `foundation`, and named venue terms can represent several functions. |
| 88-wood-street | 88 Wood Street | office | tower-office | wood street | `hall`, `center/centre`, `tower`, `building`, `house`, `foundation`, and named venue terms can represent several functions. |
| toki-messe | Toki Messe | transportation | station-intl | messe | `hall`, `center/centre`, `tower`, `building`, `house`, `foundation`, and named venue terms can represent several functions. |
| 122-leadenhall-street | 122 Leadenhall Street | office | office-headquarters | leadenhall | `hall`, `center/centre`, `tower`, `building`, `house`, `foundation`, and named venue terms can represent several functions. |
| arenas-de-barcelona | Arenas de Barcelona | leisure | leisure-named | arenas de barcelona | `hall`, `center/centre`, `tower`, `building`, `house`, `foundation`, and named venue terms can represent several functions. |
| hyatt-regency-barcelona-tower | Hyatt Regency Barcelona Tower | office | tower-office | tower | `hall`, `center/centre`, `tower`, `building`, `house`, `foundation`, and named venue terms can represent several functions. |
| nittele-tower | Nittele Tower | office | tower-office | tower | `hall`, `center/centre`, `tower`, `building`, `house`, `foundation`, and named venue terms can represent several functions. |
| torres-atrio | Torres Atrio | office | tower-office | torres | `hall`, `center/centre`, `tower`, `building`, `house`, `foundation`, and named venue terms can represent several functions. |
| skylight | Skylight | leisure | leisure-named | skylight | `hall`, `center/centre`, `tower`, `building`, `house`, `foundation`, and named venue terms can represent several functions. |
| telehouse-south | Telehouse South | office | tower-office | telehouse | `hall`, `center/centre`, `tower`, `building`, `house`, `foundation`, and named venue terms can represent several functions. |
| lloyds-building | Lloyd's building | office | tower-office | building | `hall`, `center/centre`, `tower`, `building`, `house`, `foundation`, and named venue terms can represent several functions. |
| 3-world-trade-center | 3 World Trade Center | office | tower-office | center | `hall`, `center/centre`, `tower`, `building`, `house`, `foundation`, and named venue terms can represent several functions. |
| the-o2 | The O2 | leisure | leisure-named | the o2 | `hall`, `center/centre`, `tower`, `building`, `house`, `foundation`, and named venue terms can represent several functions. |
| international-towers-sydney | International Towers Sydney | office | tower-office | towers | `hall`, `center/centre`, `tower`, `building`, `house`, `foundation`, and named venue terms can represent several functions. |
| 20-times-square | 20 Times Square | office | tower-office | times square | `hall`, `center/centre`, `tower`, `building`, `house`, `foundation`, and named venue terms can represent several functions. |
| palacio-de-congresos-de-toledo | Palacio de Congresos de Toledo | civic-public | hall-center | palacio | `hall`, `center/centre`, `tower`, `building`, `house`, `foundation`, and named venue terms can represent several functions. |
| kursaal-convention-centre | Kursaal convention centre | office | tower-office | centre | `hall`, `center/centre`, `tower`, `building`, `house`, `foundation`, and named venue terms can represent several functions. |
| audrey-jones-beck-building | Audrey Jones Beck Building | office | tower-office | building | `hall`, `center/centre`, `tower`, `building`, `house`, `foundation`, and named venue terms can represent several functions. |
| torre-puig | Torre Puig | office | tower-office | torre | `hall`, `center/centre`, `tower`, `building`, `house`, `foundation`, and named venue terms can represent several functions. |
| bankinter-building | Bankinter building | office | tower-office | bankinter | `hall`, `center/centre`, `tower`, `building`, `house`, `foundation`, and named venue terms can represent several functions. |
| pavilhao-de-portugal | Pavilhão de Portugal | public-space | park-intl | pavilhão de portugal | The candidate was not unsafe, but the current evidence is not specific enough for automatic write. |
| new-orleans | New Orleans | residential | housing-general | new orleans | `hall`, `center/centre`, `tower`, `building`, `house`, `foundation`, and named venue terms can represent several functions. |
| conjunto-habitacional-da-bouca | Conjunto Habitacional da Bouça | residential | housing-general | bouca | `hall`, `center/centre`, `tower`, `building`, `house`, `foundation`, and named venue terms can represent several functions. |
| plaza-de-toros-de-pamplona | Plaza de Toros de Pamplona | public-space | public-space | plaza | `hall`, `center/centre`, `tower`, `building`, `house`, `foundation`, and named venue terms can represent several functions. |
| edificio-urumea | Edificio Urumea | office | tower-office | edificio | `hall`, `center/centre`, `tower`, `building`, `house`, `foundation`, and named venue terms can represent several functions. |
| bairro-da-malagueira | Bairro da Malagueira | residential | housing-general | bairro | `hall`, `center/centre`, `tower`, `building`, `house`, `foundation`, and named venue terms can represent several functions. |
| tower-of-siza | Tower of Siza | office | tower-office | tower | `hall`, `center/centre`, `tower`, `building`, `house`, `foundation`, and named venue terms can represent several functions. |
| 25th-of-april-society-headquarters | 25th of April Society Headquarters | office | office-headquarters | headquarters | `hall`, `center/centre`, `tower`, `building`, `house`, `foundation`, and named venue terms can represent several functions. |
| palace-of-villahermosa | Palace of Villahermosa | civic-public | hall-center | palace | `hall`, `center/centre`, `tower`, `building`, `house`, `foundation`, and named venue terms can represent several functions. |
| swedish-centre-for-architecture-and | Swedish Centre for Architecture and Design | office | tower-office | centre | `hall`, `center/centre`, `tower`, `building`, `house`, `foundation`, and named venue terms can represent several functions. |
| col-legi-darquitectes | Col·legi d'Arquitectes | civic-public | hall-center | col-legi | `hall`, `center/centre`, `tower`, `building`, `house`, `foundation`, and named venue terms can represent several functions. |
| paraninfo-de-la-universidad-del | Paraninfo de la Universidad del País Vasco | civic-public | hall-center | paraninfo | `hall`, `center/centre`, `tower`, `building`, `house`, `foundation`, and named venue terms can represent several functions. |
| tidal-pools-of-leca-de | Tidal pools of Leça de Palmeira | leisure | leisure-named | tidal pools | `hall`, `center/centre`, `tower`, `building`, `house`, `foundation`, and named venue terms can represent several functions. |
| haus-van-middelem-dupont | Haus van Middelem-Dupont | residential | housing-general | haus | `hall`, `center/centre`, `tower`, `building`, `house`, `foundation`, and named venue terms can represent several functions. |
| edifici-illa-diagonal | Edifici Illa Diagonal | office | tower-office | edifici | `hall`, `center/centre`, `tower`, `building`, `house`, `foundation`, and named venue terms can represent several functions. |
| bank-of-spain-building-in | Bank of Spain building in Jaén | office | tower-office | building | `hall`, `center/centre`, `tower`, `building`, `house`, `foundation`, and named venue terms can represent several functions. |
| dentsu-osaka-building | Dentsu Osaka Building | office | tower-office | building | `hall`, `center/centre`, `tower`, `building`, `house`, `foundation`, and named venue terms can represent several functions. |
| tv-asahi-headquarters | TV Asahi headquarters | office | office-headquarters | headquarters | `hall`, `center/centre`, `tower`, `building`, `house`, `foundation`, and named venue terms can represent several functions. |
| toyama-shimin-plaza | Toyama Shimin Plaza | public-space | public-space | plaza | `hall`, `center/centre`, `tower`, `building`, `house`, `foundation`, and named venue terms can represent several functions. |
| makuhari-messe | Makuhari Messe | transportation | station-intl | messe | `hall`, `center/centre`, `tower`, `building`, `house`, `foundation`, and named venue terms can represent several functions. |
| palazzo-donnaregina | Palazzo Donnaregina | civic-public | hall-center | palazzo | `hall`, `center/centre`, `tower`, `building`, `house`, `foundation`, and named venue terms can represent several functions. |
| bonjour-tristesse | Bonjour Tristesse | residential | housing-general | bonjour tristesse | `hall`, `center/centre`, `tower`, `building`, `house`, `foundation`, and named venue terms can represent several functions. |
| palacio-pascual-de-riquelme | Palacio Pascual de Riquelme | civic-public | hall-center | palacio | `hall`, `center/centre`, `tower`, `building`, `house`, `foundation`, and named venue terms can represent several functions. |
| 4-world-trade-center | 4 World Trade Center | office | tower-office | center | `hall`, `center/centre`, `tower`, `building`, `house`, `foundation`, and named venue terms can represent several functions. |
| library-of-the-university-of | Library of the University of Deusto | cultural | museum | library | Multiple strong type words point to different canonical types, so the rule cannot safely choose automatically. |
| utzon-center | Utzon Center | office | tower-office | center | `hall`, `center/centre`, `tower`, `building`, `house`, `foundation`, and named venue terms can represent several functions. |
| ebisu-east-park-toilet | Ebisu East Park Toilet | public-space | public-space | park | `hall`, `center/centre`, `tower`, `building`, `house`, `foundation`, and named venue terms can represent several functions. |
| utzon-huset | Utzon-huset | residential | housing-general | utzon-huset | `hall`, `center/centre`, `tower`, `building`, `house`, `foundation`, and named venue terms can represent several functions. |
| can-feliz | Can Feliz | residential | housing-general | can feliz | `hall`, `center/centre`, `tower`, `building`, `house`, `foundation`, and named venue terms can represent several functions. |
| museum-of-transport-and-communications | Museum of Transport and Communications | cultural | museum | museum | Multiple strong type words point to different canonical types, so the rule cannot safely choose automatically. |

### C. Reject / Unsafe

| Building | Name | Candidate | Subtype | Evidence | Reason |
|---|---|---|---|---|---|
| radisson-collection-royal-hotel | Radisson Collection Royal Hotel | cultural | art-museum | collection | `Collection` in hotel brand names is not reliable evidence for cultural/art-museum use. |
| san-francisco-museum-of-modern | San Francisco Museum of Modern Art | religious | cathedral | san | Rule depends on a generic or misleading token such as `san`, `sant`, or `casa`. |

## Misclassification Risks

- `hall`, `center/centre`, `complex`, `foundation`, and `palace` can be cultural, civic, office, commercial, or residential depending on context.
- `tower`, `building`, `bank`, and address-like names are often office/commercial, but can also be residential, institutional, or mixed-use.
- `house` and `casa` are especially risky: they can mean residence, museum, cultural institution, restaurant, or foundation.
- `san`, `sant`, and `santa` are unsafe as religious markers because they also appear in place names and personal names.
- `institute` is not enough by itself: it can be educational, research, cultural, or administrative.

## Suggested Rule Changes

- Promote exact strong phrases before generic rules: `museum`, `library`, `theatre/theater/teatro`, `cathedral/church/chapel`, `station/terminal/airport`, `stadium/gymnasium`, `school/university/faculty`, `hospital/sanatorium`.
- Demote or remove generic religious tokens: do not classify from bare `san`, `sant`, or `santa`.
- Demote bare `casa`; only auto-map residential when the phrase is an explicit residence/house pattern or curated exception.
- Split `center/centre/hall/complex/foundation` into exact phrase rules, then leave the remaining generic matches in human review.
- Keep current `building_types` taxonomy for now. No new type is required by Sprint 05; gaps are evidence-quality problems, not taxonomy gaps.

## Next-Round Recommendation

The next safe write batch should only use Category A after rule refinement, with an expected maximum of 71 writes. Category B should become a curated manual checklist. Category C should not be written automatically.
