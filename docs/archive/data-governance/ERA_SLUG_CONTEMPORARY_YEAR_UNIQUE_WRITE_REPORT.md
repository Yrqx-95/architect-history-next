# Era Slug Contemporary Year Unique Write Report

Generated: 2026-07-08T16:09:06.889Z

## Scope

- This batch writes only unassigned buildings whose `year_start` fits exactly the `contemporary` era range.
- It excludes weak identity records and known malformed records before writing.
- It does not touch `postmodern`, `year-overlap`, `missing-year`, or any pre-2000 records.
- `contemporary` is used here as a chronological era bucket, not as a style judgment.

## Summary

- Writable decisions: 119
- Excluded from automatic write: 8
- Migration: `db/migrations/v17-normalize-contemporary-year-unique-era-slugs.sql`
- Rollback SQL: `reports/era-slug-contemporary-year-unique-rollback.sql`

## Manual Exclusions

| Building | Year | Candidate era | Reason |
|---|---:|---|---|
| q136394553 | 2001 | contemporary | Wikidata-style placeholder slug; keep for identity cleanup before era assignment. |
| q134893563 | 2004 | contemporary | Wikidata-style placeholder slug; keep for identity cleanup before era assignment. |
| q125679066 | 2005 | contemporary | Wikidata-style placeholder slug; keep for identity cleanup before era assignment. |
| new-orleans | 2007 | contemporary | Name/slug identifies a place rather than a clear building record; keep for identity cleanup before era assignment. |
| q3412221 | 2007 | contemporary | Wikidata-style placeholder slug; keep for identity cleanup before era assignment. |
| q123517303 | 2008 | contemporary | Wikidata-style placeholder slug; keep for identity cleanup before era assignment. |
| (missing slug) | 2011 | contemporary | Missing slug. |
| q118539028 | 2018 | contemporary | Wikidata-style placeholder slug; keep for identity cleanup before era assignment. |

## Decisions

| Building | Name | Year | era_slug | Reason |
|---|---|---:|---|---|
| bellevue-arts-museum | Bellevue Arts Museum | 2001 | contemporary | year_start 2001 fits exactly one current era range: contemporary |
| ishikawa-ongakudo | Ishikawa Ongakudō | 2001 | contemporary | year_start 2001 fits exactly one current era range: contemporary |
| sendai-mediatheque | Sendai Mediatheque | 2001 | contemporary | year_start 2001 fits exactly one current era range: contemporary |
| skylight | Skylight | 2001 | contemporary | year_start 2001 fits exactly one current era range: contemporary |
| tower-of-siza | Tower of Siza | 2001 | contemporary | year_start 2001 fits exactly one current era range: contemporary |
| zenith-de-rouen | Zénith de Rouen | 2001 | contemporary | year_start 2001 fits exactly one current era range: contemporary |
| cathedral-of-our-lady-of | Cathedral of Our Lady of the Angels | 2002 | contemporary | year_start 2002 fits exactly one current era range: contemporary |
| ciutat-de-la-justicia-de | Ciutat de la Justícia de Barcelona i l'Hospitalet de Llobregat | 2002 | contemporary | year_start 2002 fits exactly one current era range: contemporary |
| french-embassy-building | French Embassy building | 2002 | contemporary | year_start 2002 fits exactly one current era range: contemporary |
| hochhaus-neue-donau | Hochhaus Neue Donau | 2002 | contemporary | year_start 2002 fits exactly one current era range: contemporary |
| oscar-niemeyer-museum | Oscar Niemeyer Museum | 2002 | contemporary | year_start 2002 fits exactly one current era range: contemporary |
| teatro-degli-arcimboldi | Teatro degli Arcimboldi | 2002 | contemporary | year_start 2002 fits exactly one current era range: contemporary |
| estadio-municipal-de-braga | Estádio Municipal de Braga | 2003 | contemporary | year_start 2003 fits exactly one current era range: contemporary |
| loceanografic | L'Oceanogràfic | 2003 | contemporary | year_start 2003 fits exactly one current era range: contemporary |
| nittele-tower | Nittele Tower | 2003 | contemporary | year_start 2003 fits exactly one current era range: contemporary |
| the-gherkin | 30 St Mary Axe (The Gherkin) | 2003 | contemporary | year_start 2003 fits exactly one current era range: contemporary |
| toki-messe | Toki Messe | 2003 | contemporary | year_start 2003 fits exactly one current era range: contemporary |
| valladolid-science-museum | Valladolid Science Museum | 2003 | contemporary | year_start 2003 fits exactly one current era range: contemporary |
| walt-disney-concert-hall | Walt Disney Concert Hall | 2003 | contemporary | year_start 2003 fits exactly one current era range: contemporary |
| chiesa-del-santo-volto | Chiesa del Santo Volto | 2004 | contemporary | year_start 2004 fits exactly one current era range: contemporary |
| footbridge-of-the-science-museum | Footbridge of the Science Museum (Valladolid) | 2004 | contemporary | year_start 2004 fits exactly one current era range: contemporary |
| kanazawa-museum | 21st Century Museum Kanazawa | 2004 | contemporary | year_start 2004 fits exactly one current era range: contemporary |
| millau-viaduct | Millau Viaduct | 2004 | contemporary | year_start 2004 fits exactly one current era range: contemporary |
| naoshima-chichu-art-museum | Chichu Art Museum | 2004 | contemporary | year_start 2004 fits exactly one current era range: contemporary |
| seattle-central-library | Seattle Central Library | 2004 | contemporary | year_start 2004 fits exactly one current era range: contemporary |
| bank-of-shanghai-headquarters | Bank of Shanghai Headquarters | 2005 | contemporary | year_start 2005 fits exactly one current era range: contemporary |
| casa-da-musica | Casa da Música | 2005 | contemporary | year_start 2005 fits exactly one current era range: contemporary |
| memorial-to-the-murdered-jews | Memorial to the Murdered Jews of Europe | 2005 | contemporary | year_start 2005 fits exactly one current era range: contemporary |
| meti-handmade-school | METI Handmade School | 2005 | contemporary | year_start 2005 fits exactly one current era range: contemporary |
| riparian-plaza | Riparian Plaza | 2005 | contemporary | year_start 2005 fits exactly one current era range: contemporary |
| verona-203a | Verona 203A | 2005 | contemporary | year_start 2005 fits exactly one current era range: contemporary |
| americas-cup-building | America's Cup Building | 2006 | contemporary | year_start 2006 fits exactly one current era range: contemporary |
| de-citadel | De Citadel | 2006 | contemporary | year_start 2006 fits exactly one current era range: contemporary |
| hyatt-regency-barcelona-tower | Hyatt Regency Barcelona Tower | 2006 | contemporary | year_start 2006 fits exactly one current era range: contemporary |
| museum-of-modern-literature | Museum of Modern Literature | 2006 | contemporary | year_start 2006 fits exactly one current era range: contemporary |
| toulouse-school-of-economics | Toulouse School of Economics | 2006 | contemporary | year_start 2006 fits exactly one current era range: contemporary |
| blue-condominium | Blue Condominium | 2007 | contemporary | year_start 2007 fits exactly one current era range: contemporary |
| bruder-klaus-chapel | Bruder Klaus Field Chapel | 2007 | contemporary | year_start 2007 fits exactly one current era range: contemporary |
| campus-palmas-altas-sevilla | Campus Palmas Altas (Sevilla) | 2007 | contemporary | year_start 2007 fits exactly one current era range: contemporary |
| extension-of-museo-del-prado | Extension of Museo del Prado | 2007 | contemporary | year_start 2007 fits exactly one current era range: contemporary |
| kolumba-museum | Kolumba Museum | 2007 | contemporary | year_start 2007 fits exactly one current era range: contemporary |
| national-art-center-tokyo | The National Art Center Tokyo | 2007 | contemporary | year_start 2007 fits exactly one current era range: contemporary |
| new-museum-nyc | New Museum | 2007 | contemporary | year_start 2007 fits exactly one current era range: contemporary |
| rena-lange-headquarters | Rena Lange Headquarters | 2007 | contemporary | year_start 2007 fits exactly one current era range: contemporary |
| shimane-museum-of-ancient-izumo | Shimane Museum of Ancient Izumo | 2007 | contemporary | year_start 2007 fits exactly one current era range: contemporary |
| yokosuka-museum-of-art | Yokosuka Museum of Art | 2007 | contemporary | year_start 2007 fits exactly one current era range: contemporary |
| zenith-limoges-metropole | Zénith Limoges Métropole | 2007 | contemporary | year_start 2007 fits exactly one current era range: contemporary |
| beijing-national-stadium | Beijing National Stadium | 2008 | contemporary | year_start 2008 fits exactly one current era range: contemporary |
| museo-del-teatro-romano-de | Museo del Teatro Romano de Cartagena | 2008 | contemporary | year_start 2008 fits exactly one current era range: contemporary |
| ningbo-museum | Ningbo Museum | 2008 | contemporary | year_start 2008 fits exactly one current era range: contemporary |
| tour-granite | Tour Granite | 2008 | contemporary | year_start 2008 fits exactly one current era range: contemporary |
| acropolis-museum | Acropolis Museum | 2009 | contemporary | year_start 2009 fits exactly one current era range: contemporary |
| ceremonial-palace-of-georgia | Ceremonial Palace of Georgia | 2009 | contemporary | year_start 2009 fits exactly one current era range: contemporary |
| horizontal-skyscraper-vanke-center | Horizontal Skyscraper – Vanke Center | 2009 | contemporary | year_start 2009 fits exactly one current era range: contemporary |
| linked-hybrid | Linked Hybrid | 2009 | contemporary | year_start 2009 fits exactly one current era range: contemporary |
| musee-herge | Musée Hergé | 2009 | contemporary | year_start 2009 fits exactly one current era range: contemporary |
| 8-house | 8 House | 2010 | contemporary | year_start 2010 fits exactly one current era range: contemporary |
| guangzhou-opera-house | Guangzhou Opera House | 2010 | contemporary | year_start 2010 fits exactly one current era range: contemporary |
| musashino-art-museum | Musashino Art University Library | 2010 | contemporary | year_start 2010 fits exactly one current era range: contemporary |
| paraninfo-de-la-universidad-del | Paraninfo de la Universidad del País Vasco | 2010 | contemporary | year_start 2010 fits exactly one current era range: contemporary |
| pompidou-metz | Centre Pompidou-Metz | 2010 | contemporary | year_start 2010 fits exactly one current era range: contemporary |
| rolex-learning-center | Rolex Learning Center | 2010 | contemporary | year_start 2010 fits exactly one current era range: contemporary |
| vitra-haus | VitraHaus | 2010 | contemporary | year_start 2010 fits exactly one current era range: contemporary |
| arenas-de-barcelona | Arenas de Barcelona | 2011 | contemporary | year_start 2011 fits exactly one current era range: contemporary |
| cite-de-locean-et-du | Cité de l'Océan et du Surf | 2011 | contemporary | year_start 2011 fits exactly one current era range: contemporary |
| house-na | House NA | 2011 | contemporary | year_start 2011 fits exactly one current era range: contemporary |
| asakusa-culture-center | Asakusa Culture and Tourism Center | 2012 | contemporary | year_start 2012 fits exactly one current era range: contemporary |
| campbell-sports-center | Campbell Sports Center | 2012 | contemporary | year_start 2012 fits exactly one current era range: contemporary |
| cctv-headquarters | CCTV Headquarters | 2012 | contemporary | year_start 2012 fits exactly one current era range: contemporary |
| central-library-des-moines | Central Library, Des Moines | 2012 | contemporary | year_start 2012 fits exactly one current era range: contemporary |
| cidade-das-artes-bibi-ferreira | Cidade das Artes Bibi Ferreira | 2012 | contemporary | year_start 2012 fits exactly one current era range: contemporary |
| daeyang-gallery-and-house | Daeyang Gallery and House | 2012 | contemporary | year_start 2012 fits exactly one current era range: contemporary |
| heydar-aliyev-center | Heydar Aliyev Center | 2012 | contemporary | year_start 2012 fits exactly one current era range: contemporary |
| louvre-lens | Louvre-Lens | 2012 | contemporary | year_start 2012 fits exactly one current era range: contemporary |
| shard | The Shard | 2012 | contemporary | year_start 2012 fits exactly one current era range: contemporary |
| atelier-museu-julio-pomar | Atelier-Museu Júlio Pomar | 2013 | contemporary | year_start 2013 fits exactly one current era range: contemporary |
| cardboard-cathedral | Cardboard Cathedral | 2013 | contemporary | year_start 2013 fits exactly one current era range: contemporary |
| coleccion-jumex | Colección Jumex | 2013 | contemporary | year_start 2013 fits exactly one current era range: contemporary |
| coliseu-de-viana-do-castelo | Coliseu de Viana do Castelo | 2013 | contemporary | year_start 2013 fits exactly one current era range: contemporary |
| discovery-primea | Discovery Primea | 2013 | contemporary | year_start 2013 fits exactly one current era range: contemporary |
| paris-la-defense-arena | Paris La Défense Arena | 2013 | contemporary | year_start 2013 fits exactly one current era range: contemporary |
| serpentine-pavilion-2013 | Serpentine Pavilion 2013 | 2013 | contemporary | year_start 2013 fits exactly one current era range: contemporary |
| 122-leadenhall-street | 122 Leadenhall Street | 2014 | contemporary | year_start 2014 fits exactly one current era range: contemporary |
| aga-khan-museum | Aga Khan Museum | 2014 | contemporary | year_start 2014 fits exactly one current era range: contemporary |
| aspen-art-museum | Aspen Art Museum | 2014 | contemporary | year_start 2014 fits exactly one current era range: contemporary |
| center-of-innovation-anacleto-angelini | Center of Innovation Anacleto Angelini | 2014 | contemporary | year_start 2014 fits exactly one current era range: contemporary |
| dongdaemun-design-plaza | Dongdaemun Design Plaza | 2014 | contemporary | year_start 2014 fits exactly one current era range: contemporary |
| louis-vuitton-fondation | Louis Vuitton Foundation | 2014 | contemporary | year_start 2014 fits exactly one current era range: contemporary |
| one57 | One57 | 2014 | contemporary | year_start 2014 fits exactly one current era range: contemporary |
| gckeyaki-terrace | GC Keyaki Terrace | 2015 | contemporary | year_start 2015 fits exactly one current era range: contemporary |
| ibm-studios | IBM Studios | 2015 | contemporary | year_start 2015 fits exactly one current era range: contemporary |
| philharmonie-de-paris | Philharmonie de Paris | 2015 | contemporary | year_start 2015 fits exactly one current era range: contemporary |
| utec-campus | UTEC campus | 2015 | contemporary | year_start 2015 fits exactly one current era range: contemporary |
| whitney-museum | Whitney Museum of American Art | 2015 | contemporary | year_start 2015 fits exactly one current era range: contemporary |
| international-towers-sydney | International Towers Sydney | 2016 | contemporary | year_start 2016 fits exactly one current era range: contemporary |
| museu-de-arte-contemporanea-nadir | Museu de Arte Contemporânea Nadir Afonso | 2016 | contemporary | year_start 2016 fits exactly one current era range: contemporary |
| taichung-metropolitan-opera | Taichung Metropolitan Opera House | 2016 | contemporary | year_start 2016 fits exactly one current era range: contemporary |
| via-57-west | VIA 57 West | 2016 | contemporary | year_start 2016 fits exactly one current era range: contemporary |
| amorepacific-headquarters | Amorepacific Headquarters | 2017 | contemporary | year_start 2017 fits exactly one current era range: contemporary |
| apple-park | Apple Park | 2017 | contemporary | year_start 2017 fits exactly one current era range: contemporary |
| hamburg-elbphilharmonie | Elbphilharmonie Hamburg | 2017 | contemporary | year_start 2017 fits exactly one current era range: contemporary |
| lego-house | LEGO House | 2017 | contemporary | year_start 2017 fits exactly one current era range: contemporary |
| mt-fuji-center | Mt. Fuji World Heritage Centre | 2017 | contemporary | year_start 2017 fits exactly one current era range: contemporary |
| 3-world-trade-center | 3 World Trade Center | 2018 | contemporary | year_start 2018 fits exactly one current era range: contemporary |
| institute-for-contemporary-art-richmond | Institute for Contemporary Art, Richmond | 2018 | contemporary | year_start 2018 fits exactly one current era range: contemporary |
| v-and-a-dundee | V&A Dundee | 2018 | contemporary | year_start 2018 fits exactly one current era range: contemporary |
| beijing-daxing-airport | Beijing Daxing International Airport | 2019 | contemporary | year_start 2019 fits exactly one current era range: contemporary |
| copenhill | CopenHill | 2019 | contemporary | year_start 2019 fits exactly one current era range: contemporary |
| james-simon-gallery | James Simon Gallery | 2019 | contemporary | year_start 2019 fits exactly one current era range: contemporary |
| l-arbre-blanc | L'Arbre Blanc | 2019 | contemporary | year_start 2019 fits exactly one current era range: contemporary |
| national-stadium-tokyo | Japan National Stadium | 2019 | contemporary | year_start 2019 fits exactly one current era range: contemporary |
| new-national-stadium | New National Stadium | 2019 | contemporary | year_start 2019 fits exactly one current era range: contemporary |
| one-monte-carlo | One Monte-Carlo | 2019 | contemporary | year_start 2019 fits exactly one current era range: contemporary |
| torres-atrio | Torres Atrio | 2019 | contemporary | year_start 2019 fits exactly one current era range: contemporary |
| parc1 | Parc1 | 2020 | contemporary | year_start 2020 fits exactly one current era range: contemporary |
| marsk-tower | Marsk Tower | 2021 | contemporary | year_start 2021 fits exactly one current era range: contemporary |
| tour-eria | Tour Eria | 2021 | contemporary | year_start 2021 fits exactly one current era range: contemporary |
| reinhard-ernst-museum | Reinhard Ernst Museum | 2024 | contemporary | year_start 2024 fits exactly one current era range: contemporary |
| tours-sisters | Tours Sisters | 2025 | contemporary | year_start 2025 fits exactly one current era range: contemporary |

## Verification Plan

- Apply the generated migration to Supabase production.
- Verify `buildings.era_slug` populated count increases by the writable decision count.
- Verify `building_eras` receives the same relationship count for this batch.
- Run `npm run data:audit`, `npm run data:plan-eras`, `npm run typecheck`, `npm run lint`, and `git diff --check`.
