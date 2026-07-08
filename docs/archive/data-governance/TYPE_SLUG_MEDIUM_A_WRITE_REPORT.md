# Type Slug Medium A Write Report

Generated: 2026-06-08T23:24:56.156Z
Mode: write

## Scope

- Only Sprint 05 category A candidates were eligible for write.
- Sprint 05 category B, category C, and manual/no-rule candidates were not written.
- No building_types were added.
- No country_code or era_slug records were processed.

## Pre-Write Summary

- Total buildings: 875
- Missing type_slug before: 423
- Sprint 05 A candidates: 71
- Planned writes after safety validation: 71
- Safety exclusions / skips: 0
- Actual writes: 71

## Planned Type Distribution

| type_slug | Count |
|---|---:|
| cultural | 26 |
| government | 23 |
| religious | 7 |
| temporary | 4 |
| educational | 3 |
| sports | 3 |
| transportation | 3 |
| monument | 1 |
| research-institute | 1 |

## Post-Write Summary

- Remaining missing type_slug: 352
- New type_slug coverage: 59.77%

## Type Distribution Top 20 After Write

| type_slug | Count |
|---|---:|
| cultural | 178 |
| residential | 129 |
| religious | 51 |
| commercial | 36 |
| government | 35 |
| educational | 21 |
| sports | 17 |
| transportation | 14 |
| monument | 8 |
| civic-public | 7 |
| industrial | 5 |
| office | 5 |
| temporary | 5 |
| public-space | 3 |
| healthcare | 2 |
| infrastructure | 2 |
| research-institute | 2 |
| leisure | 1 |
| mixed-use | 1 |
| observation | 1 |

## Safety Exclusions / Skips

None.

## Migration Files

- Forward migration: `db/migrations/v10-normalize-medium-a-type-slugs.sql`
- Rollback migration: `db/migrations/v10-normalize-medium-a-type-slugs-rollback.sql`
- Forward migration updates only `type_slug IS NULL` rows.
- Rollback migration clears only exact slugs written by this sprint.

## Written Records

| Building | Name | type_slug | Subtype | Evidence | Reason |
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
| new-york-public-library-for | New York Public Library for the Performing Arts | cultural | museum | library | A strong type word was present, but the current rules downgraded it because another broad rule also matched. |
| niagara-falls-public-library | Niagara Falls Public Library | cultural | museum | library | A strong type word was present, but the current rules downgraded it because another broad rule also matched. |
| orange-county-government-center | Orange County Government Center | government | government | government | A strong type word was present, but the current rules downgraded it because another broad rule also matched. |
| jewett-arts-center | Jewett Arts Center | cultural | museum | arts center | A strong type word was present, but the current rules downgraded it because another broad rule also matched. |
| presidential-palace-damascus | Presidential Palace, Damascus | government | government | presidential palace | A strong type word was present, but the current rules downgraded it because another broad rule also matched. |
| hirosaki-city-hall | Hirosaki City Hall | government | government | city hall | A strong type word was present, but the current rules downgraded it because another broad rule also matched. |
| hiroshima-national-peace-memorial-hall | Hiroshima National Peace Memorial Hall for the Atomic Bomb Victims | monument | monument-memorial | memorial | A strong type word was present, but the current rules downgraded it because another broad rule also matched. |
| united-nations-university | United Nations University | educational | school-university | university | A strong type word was present, but the current rules downgraded it because another broad rule also matched. |
| kagawa-prefectural-government-office | Kagawa Prefectural Government Office | government | government | government | A strong type word was present, but the current rules downgraded it because another broad rule also matched. |
| former-tokyo-metropolitan-government-building | Former Tokyo Metropolitan Government Building | government | government | government | A strong type word was present, but the current rules downgraded it because another broad rule also matched. |
| kuwait-embassy-building | Kuwait Embassy building | government | government | embassy | A strong type word was present, but the current rules downgraded it because another broad rule also matched. |
| kinokuniya-hall | Kinokuniya Hall | cultural | named-cultural | kinokuniya hall | A strong type word was present, but the current rules downgraded it because another broad rule also matched. |
| kagawa-prefectural-government-office-main | Kagawa Prefectural Government Office Main Building | government | government | government | A strong type word was present, but the current rules downgraded it because another broad rule also matched. |
| hashima-city-hall-1959-2022 | Hashima City Hall (1959-2022) | government | government | city hall | A strong type word was present, but the current rules downgraded it because another broad rule also matched. |
| hirosaki-civic-hall | Hirosaki Civic Hall | cultural | museum | civic hall | A strong type word was present, but the current rules downgraded it because another broad rule also matched. |
| ishigaki-civic-hall | Ishigaki Civic Hall | cultural | museum | civic hall | A strong type word was present, but the current rules downgraded it because another broad rule also matched. |
| okayama-prefectural-government-building | Okayama Prefectural Government Building | government | government | government | A strong type word was present, but the current rules downgraded it because another broad rule also matched. |
| ibaraki-prefectural-culture-center | Ibaraki Prefectural Culture Center | cultural | museum | culture center | A strong type word was present, but the current rules downgraded it because another broad rule also matched. |
| kanazawa-bunka-hall | Kanazawa Bunka Hall | cultural | hall-cultural | bunka hall | A strong type word was present, but the current rules downgraded it because another broad rule also matched. |
| okayama-symphony-hall | Okayama Symphony Hall | cultural | hall-cultural | symphony hall | A strong type word was present, but the current rules downgraded it because another broad rule also matched. |
| loceanografic | L'Oceanogràfic | cultural | named-cultural | oceanogràfic | A strong type word was present, but the current rules downgraded it because another broad rule also matched. |
| nuestra-senora-del-libano-montevideo | Nuestra Señora del Líbano, Montevideo | religious | religious-intl | nuestra señora | The matched word is a relatively specific function term; it can be promoted after narrowing the regex. |
| palacio-de-los-deportes | Palacio de los Deportes | sports | stadium-intl | palacio de los deportes | A strong type word was present, but the current rules downgraded it because another broad rule also matched. |
| parroquia-maronita-de-nuestra-senora | Parroquia Maronita de Nuestra Señora del Líbano | religious | religious-intl | parroquia | The matched word is a relatively specific function term; it can be promoted after narrowing the regex. |
| esbjerg-performing-arts-centre | Esbjerg Performing Arts Centre | cultural | museum | performing arts | A strong type word was present, but the current rules downgraded it because another broad rule also matched. |
| foundation-e-g-buhrle-collection | Foundation E.G. Bührle Collection | cultural | art-museum | collection | A strong type word was present, but the current rules downgraded it because another broad rule also matched. |
| andre-malraux-cultural-centre | André Malraux Cultural Centre | cultural | museum | cultural centre | A strong type word was present, but the current rules downgraded it because another broad rule also matched. |
| serpentine-gallery-pavilion-2017 | Serpentine Gallery Pavilion 2017 | cultural | art-museum | gallery | A strong type word was present, but the current rules downgraded it because another broad rule also matched. |
| bridge-of-peace | Bridge of Peace | transportation | airport-station | bridge of peace | A strong type word was present, but the current rules downgraded it because another broad rule also matched. |
| groninger-museum-building | Groninger Museum Building | cultural | museum | museum | A strong type word was present, but the current rules downgraded it because another broad rule also matched. |
| chiesa-del-santo-volto | Chiesa del Santo Volto | religious | religious-intl | chiesa | The matched word is a relatively specific function term; it can be promoted after narrowing the regex. |
