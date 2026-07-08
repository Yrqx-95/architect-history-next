# Type Slug Write Report

Generated: 2026-06-08T16:18:41.997Z
Mode: write

## Scope

- Only high-confidence candidates were eligible for write.
- Medium-confidence and manual-review candidates were not written.
- A small safety exclusion list blocks high-rule matches that are visibly ambiguous or incorrect.

## Pre-Write Summary

- Total buildings: 875
- Missing type_slug before: 740
- High-confidence candidates detected: 323
- Planned high-confidence writes: 317
- Safety exclusions from high set: 6

## Planned Type Distribution

| type_slug | Count |
|---|---:|
| residential | 108 |
| cultural | 106 |
| commercial | 29 |
| religious | 24 |
| educational | 15 |
| sports | 12 |
| monument | 7 |
| transportation | 6 |
| government | 5 |
| industrial | 4 |
| healthcare | 1 |

## Post-Write Summary

- Remaining missing type_slug: 423
- New type_slug coverage: 51.66%
- data:audit exit status: 0
- data:audit total issues: 3858
- data:audit errors: 0
- data:audit warnings: 1368
- data:audit type_slug warnings: 423

## Full Type Distribution After Write

| type_slug | Count |
|---|---:|
| cultural | 152 |
| residential | 129 |
| religious | 44 |
| commercial | 36 |
| educational | 18 |
| sports | 14 |
| government | 12 |
| transportation | 11 |
| civic-public | 7 |
| monument | 7 |
| industrial | 5 |
| office | 5 |
| public-space | 3 |
| healthcare | 2 |
| infrastructure | 2 |
| leisure | 1 |
| mixed-use | 1 |
| observation | 1 |
| research-institute | 1 |
| temporary | 1 |

## Safety Exclusions

| Building | Name | Candidate | Evidence | Reason |
|---|---|---|---|---|
| casa-de-cha-da-boa | Casa de Chá da Boa Nova | residential | casa | `Casa de Cha` is a tea house/restaurant, not residential. |
| casa-roberto-ivens-casa | Casa Roberto Ivens - Casa da Arquitetura | residential | casa | `Casa da Arquitetura` is a cultural/institutional use, not residential. |
| casa-das-historias-paula-rego | Casa das Histórias Paula Rego | residential | casa | `Casa` is ambiguous here; this is a cultural building, not residential. |
| asilo-santelia | Asilo Sant'Elia | religious | sant | High rule matched only `sant`; this is a school/nursery, not a religious building. |
| cuadra-san-cristobal | Cuadra San Cristobal | religious | san | High rule matched only `san`; this work is not religious. |
| casa-do-benin | Casa do Benin | residential | casa | `Casa` is ambiguous here; likely cultural rather than residential. |

## Rollback

- Forward migration: `db/migrations/v8-normalize-high-confidence-type-slugs.sql`
- Rollback SQL: `reports/type-slug-high-confidence-rollback.sql`
- Forward SQL is idempotent because it updates only `type_slug IS NULL` rows.
- Rollback SQL clears only the exact type slugs written by this sprint.

## Planned / Written Records

| Building | Name | type_slug | Subtype | Evidence |
|---|---|---|---|---|
| renaissance-paris-arc-de-triomphe | Renaissance Paris Arc de Triomphe Hotel | commercial | commercial-retail | hotel |
| auerbacher-home | Auerbacher Home | residential | house | home |
| skybreak-house | Skybreak House | residential | house | house |
| gateway-arch | 圣路易斯拱门 | monument | monument-memorial | arch |
| ashford-designer-outlet | Ashford Designer Outlet | commercial | commercial-intl | designer outlet |
| campus-palmas-altas-sevilla | Campus Palmas Altas (Sevilla) | educational | school-university | campus |
| bordeaux-courthouse | Bordeaux Courthouse | government | government | courthouse |
| zip-up-house | Zip-Up House | residential | house | house |
| millennium-dome | Millennium Dome | sports | stadium | dome |
| kleanthis-vikelidis-stadium | Kleanthis Vikelidis Stadium | sports | stadium | stadium |
| one-monte-carlo | One Monte-Carlo | commercial | commercial-retail | one monte-carlo |
| hospital-materno-infantil-gregorio-maranon | Hospital Materno-Infantil Gregorio Marañón | healthcare | healthcare | hospital |
| serralves-museum-of-contemporary-art | Serralves Museum of Contemporary Art | cultural | art-museum | contemporary art |
| museum-of-fine-arts-houston | Museum of Fine Arts, Houston | cultural | art-museum | fine arts |
| national-museum-of-roman-art | National Museum of Roman Art | cultural | museum | museum |
| atelier-museu-julio-pomar | Atelier-Museu Júlio Pomar | cultural | museum | museu |
| j-m-teixeira-house | J. M. Teixeira House | residential | house | house |
| extension-of-museo-del-prado | Extension of Museo del Prado | cultural | museum | museo |
| moderna-museet | Moderna Museet | cultural | hall-cultural | moderna museet |
| museu-de-arte-contemporanea-nadir | Museu de Arte Contemporânea Nadir Afonso | cultural | art-museum | museu de arte |
| lauditori | L'Auditori | cultural | hall-cultural | auditori |
| valladolid-science-museum | Valladolid Science Museum | cultural | museum | museum |
| thyssen-bornemisza-museum | Thyssen-Bornemisza Museum | cultural | museum | museum |
| facultad-de-ciencias-de-la | Facultad de Ciencias de la Comunicación de Santiago de Compostela | educational | school-university | facultad |
| biblioteca-municipal-de-viana-do | Biblioteca Municipal de Viana do Castelo | cultural | museum | biblioteca |
| cathedral-of-our-lady-of | Cathedral of Our Lady of the Angels | religious | cathedral | cathedral |
| iwasaki-art-museum | Iwasaki Art Museum | cultural | art-museum | art museum |
| museo-del-teatro-romano-de | Museo del Teatro Romano de Cartagena | cultural | museum | museo |
| ensemble-of-alvaro-sizas-architecture | ensemble of Álvaro Siza's architecture works in Portugal | industrial | industrial | works |
| san-nicola-di-bari | San Nicola di Bari | religious | cathedral | san |
| tokyo-metropolitan-gymnasium | Tokyo Metropolitan Gymnasium | sports | stadium | gymnasium |
| aga-khan-museum | Aga Khan Museum | cultural | museum | museum |
| national-museum-of-modern-art | National Museum of Modern Art, Kyoto | cultural | art-museum | modern art |
| s-holm-row-houses | Søholm Row Houses | residential | house | houses |
| munkegaard-school | Munkegaard School | educational | school-university | school |
| posta-design-hotel | Posta Design Hotel | commercial | commercial-retail | hotel |
| salgueiros-metro-station | Salgueiros metro station | transportation | airport-station | metro |
| utzons-house-in-helleb-k | Utzon's House in Hellebæk | residential | house | house |
| paustian-house | Paustian House | residential | house | house |
| coliseu-de-viana-do-castelo | Coliseu de Viana do Castelo | cultural | hall-cultural | coliseu |
| trindade-metro-station | Trindade metro station | transportation | airport-station | metro |
| reinhard-ernst-museum | Reinhard Ernst Museum | cultural | museum | museum |
| rothenborg-house | Rothenborg House | residential | house | house |
| casa-lavezzari | Casa Lavezzari | residential | house | casa |
| casa-toninello | Casa Toninello | residential | house | casa |
| villa-of-floriculturist | Villa of floriculturist | residential | house | villa |
| war-memorial-in-como | War memorial in Como | monument | monument-memorial | memorial |
| bank-melli-iran-university-of | Bank Melli Iran (University of Tehran Branch) | educational | school-university | university |
| spiral | Spiral | cultural | named-cultural | spiral |
| skovshoved-petrol-station | Skovshoved Petrol Station | transportation | airport-station | station |
| casa-comolli-rustici | Casa Comolli-Rustici | residential | house | casa |
| casa-giuliani-frigerio | Casa Giuliani Frigerio | residential | house | casa |
| kingo-houses | Kingo Houses | residential | house | houses |
| arne-jacobsen-s-own-house | Arne Jacobsen’s own house in Charlottenlund | residential | house | house |
| shimane-museum-of-ancient-izumo | Shimane Museum of Ancient Izumo | cultural | museum | museum |
| bellavista-housing-estate | Bellavista housing estate | residential | house | housing |
| war-memorial-in-erba | war memorial in Erba | monument | monument-memorial | memorial |
| mendelsohn-housing-scheme-luckenwalde | Mendelsohn-housing scheme (Luckenwalde) | residential | house | housing |
| mendelsohn-house | Mendelsohn House | residential | house | house |
| fredensborg-houses | Fredensborg Houses | residential | house | houses |
| stelling-house | Stelling House | residential | house | house |
| r-dovre-library | Rødovre Library | cultural | museum | library |
| casa-rustici | Casa Rustici | residential | house | casa |
| gilbey-house | Gilbey House | residential | house | house |
| japanese-sword-museum | Japanese Sword Museum | cultural | museum | museum |
| casa-ghiringhelli | Casa Ghiringhelli | residential | house | casa |
| casa-pedraglio | Casa Pedraglio | residential | house | casa |
| schocken-department-store-stuttgart | Schocken Department Store, Stuttgart | commercial | commercial-retail | store |
| bagsv-rd-church | Bagsværd Church | religious | cathedral | church |
| estadio-municipal-de-braga | Estádio Municipal de Braga | sports | stadium-intl | estadio |
| bellevue-teatret | Bellevue Teatret | cultural | named-cultural | teatret |
| red-banner-textile-factory | Red Banner Textile Factory | industrial | industrial | factory |
| rathaus-mainz | Rathaus Mainz | government | civic-government-intl | rathaus |
| villa-bianca | Villa Bianca | residential | house | villa |
| schaubuhne-am-lehniner-platz | Schaubühne am Lehniner Platz | cultural | named-cultural | schaubuhne |
| kaufhaus-schocken | Kaufhaus Schocken | commercial | commercial-retail | kaufhaus |
| schocken-library | Schocken Library | cultural | museum | library |
| cohen-house | Cohen House | residential | house | house |
| petersdorff-department-store | Petersdorff Department Store | commercial | commercial-retail | store |
| weizmann-house | Weizmann House | residential | house | house |
| salman-schocken-house | Salman Schocken house | residential | house | house |
| mercado-municipal-do-caranda | Mercado Municipal do Carandá | commercial | commercial-intl | mercado |
| haifa-first-power-plant | Haifa first power plant | industrial | industrial | plant |
| former-weichmanns-textile-house | Former Weichmann's Textile House | residential | house | house |
| loisium-weinerlebniswelt-vinothek | LOISIUM WeinErlebnisWelt & Vinothek | commercial | commercial-intl | vinothek |
| loisium-wine-spa-resort-langenlois | Loisium Wine & Spa Resort Langenlois | commercial | commercial-retail | resort |
| kiasma | Kiasma | cultural | museum | kiasma |
| pace-collection-showroom | Pace Collection showroom | cultural | art-museum | collection |
| cite-de-locean-et-du | Cité de l'Océan et du Surf | cultural | named-cultural | océan et du surf |
| institute-for-contemporary-art-richmond | Institute for Contemporary Art, Richmond | cultural | art-museum | contemporary art |
| buro-und-geschaftshaus | Büro- und Geschäftshaus | commercial | commercial-intl | geschaftshaus |
| house-vi | House VI | residential | house | house |
| memorial-to-the-murdered-jews | Memorial to the Murdered Jews of Europe | monument | monument-memorial | memorial |
| state-farm-stadium | State Farm Stadium | sports | stadium | stadium |
| the-nelson-atkins-museum-of-art | The Nelson-Atkins Museum of Art | cultural | art-museum | museum of art |
| bellevue-arts-museum | Bellevue Arts Museum | cultural | museum | museum |
| zenith-limoges-metropole | Zénith Limoges Métropole | cultural | named-cultural | zenith |
| c-v-starr-east-asian | C. V. Starr East Asian Library | cultural | museum | library |
| paris-la-defense-arena | Paris La Défense Arena | sports | stadium | arena |
| sakai-city-semboku-suemura-archaeological | Sakai City Semboku Suemura Archaeological Museum | cultural | museum | museum |
| musee-herge | Musée Hergé | cultural | museum | musée |
| acropolis-museum | Acropolis Museum | cultural | museum | museum |
| zenith-de-rouen | Zénith de Rouen | cultural | named-cultural | zenith |
| le-rocher-de-palmer | Le Rocher de Palmer | cultural | named-cultural | rocher de palmer |
| blue-condominium | Blue Condominium | residential | house | condominium |
| luis-barragan-house-and-studio | Luis Barragán House and Studio | residential | house | house |
| prieto-lopez-house | Prieto López House | residential | house | house |
| casa-gilardi | Casa Gilardi | residential | house | casa |
| paris-opera-ballet-school | Paris Opera Ballet School | educational | school-university | school |
| les-champs-libres | Les Champs Libres | cultural | named-cultural | champs libres |
| cidade-das-artes-bibi-ferreira | Cidade das Artes Bibi Ferreira | cultural | hall-cultural | cidade das artes |
| philharmonie-luxembourg | Philharmonie Luxembourg | cultural | museum | philharmonie |
| philharmonie-de-paris | Philharmonie de Paris | cultural | museum | philharmonie |
| stoppelaere-house | Stoppelaëre House | residential | house | house |
| casa-do-chame-chame | Casa do Chame-Chame | residential | house | casa |
| coaty-restaurante | Coaty Restaurante | commercial | commercial-intl | restaurante |
| valeria-p-cirell-house | Valéria P. Cirell House | residential | house | house |
| teatro-oficina | Teatro Oficina | cultural | named-cultural | teatro |
| espirito-santo-do-cerrado-church | Espirito Santo do Cerrado church | religious | cathedral | church |
| sesc-pompeia | SESC Pompéia | cultural | named-cultural | sesc pompéia |
| santa-maria-dos-anjos-church | Santa Maria dos Anjos Church | religious | cathedral | santa |
| glass-house | Glass House | residential | house | house |
| san-giovanni-battista | San Giovanni Battista | religious | cathedral | san |
| negozio-di-arredamento-gavina | Negozio di arredamento Gavina | commercial | commercial-retail | negozio |
| brion-tomb | Brion tomb | monument | monument-memorial | tomb |
| gipsoteca-canoviana | Gipsoteca canoviana | cultural | art-museum | gipsoteca |
| villa-aalto | Villa Aalto | residential | house | villa |
| de-bijenkorf | De Bijenkorf | commercial | commercial-intl | bijenkorf |
| abele-residence | Abele Residence | residential | house | residence |
| marcel-breuer-house-and-studio | Marcel Breuer House and Studio | residential | house | house |
| henry-chamberlain-house | Henry Chamberlain House | residential | house | house |
| marcel-breuer-house-at-pocantico | Marcel Breuer House at Pocantico | residential | house | house |
| villa-e-1027 | Villa E-1027 | residential | house | villa |
| villa-veritti | Villa Veritti | residential | house | villa |
| standard-rental-house-by-alvar | Standard rental house by Alvar Aalto | residential | house | house |
| muuratsalo-experimental-house | Muuratsalo Experimental House | residential | house | house |
| valtiontalo | Valtiontalo | government | civic-government-intl | valtiontalo |
| villa-mairea | Villa Mairea | residential | house | villa |
| college-of-education-training-school | College of Education training school | educational | school-university | college |
| alvar-aalto-museum-jyvaskyla | Alvar Aalto Museum Jyväskylä | cultural | museum | museum |
| st-francis-de-sales-church | St. Francis de Sales Church | religious | cathedral | church |
| marcel-breuer-house-ii | Marcel Breuer House II | residential | house | house |
| sea-lane-house | Sea Lane House | residential | house | house |
| shangri-la | Shangri-la | commercial | commercial-retail | shangri-la |
| nordic-house | Nordic House | residential | house | house |
| kirjatalo | Kirjatalo | cultural | named-cultural | kirjatalo |
| our-lady-of-the-annunciation | Our Lady of the Annunciation Chapel at Annunciation Priory | religious | cathedral | chapel |
| atlanta-fulton-county-central-library | Atlanta Fulton County Central Library | cultural | museum | library |
| casa-ottolenghi | Casa Ottolenghi | residential | house | casa |
| parkeergarage-bijenkorf | Parkeergarage Bijenkorf | commercial | commercial-intl | bijenkorf |
| villa-tammekann | Villa Tammekann | residential | house | villa |
| kunsten-museum-of-modern-art | Kunsten Museum of Modern Art Aalborg | cultural | art-museum | modern art |
| muurame-church | Muurame Church | religious | cathedral | church |
| rovaniemi-city-library | Rovaniemi City Library | cultural | museum | library |
| seinajoki-city-theatre | Seinäjoki City Theatre | cultural | museum | theatre |
| hill-museum-manuscript-library | Hill Museum & Manuscript Library | cultural | museum | museum |
| hooper-house-baltimore-county-maryland | Hooper House (Baltimore County, Maryland) | residential | house | house |
| seymour-krieger-house | Seymour Krieger House | residential | house | house |
| saint-johns-abbey | Saint John's Abbey | religious | cathedral | abbey |
| kulttuuritalo | Kulttuuritalo | cultural | named-cultural | kulttuuritalo |
| maison-de-verre | Maison de Verre | residential | house | maison |
| constance-perkins-house | Constance Perkins House | residential | house | house |
| william-beard-residence | William Beard Residence | residential | house | residence |
| church-of-the-three-crosses | Church of the Three Crosses | religious | cathedral | church |
| kunstzaal-zuid | Kunstzaal Zuid | cultural | hall-cultural | kunstzaal |
| the-alan-i-w-frank | The Alan I W Frank House | residential | house | house |
| stillman-house | Stillman House | residential | house | house |
| villa-tempe-a-paia | Villa Tempe a paia | residential | house | villa |
| palos-verdes-high-school | Palos Verdes High School | educational | school-university | school |
| cleveland-museum-of-art | Cleveland Museum of Art | cultural | art-museum | museum of art |
| pylkonmaki-church | Pylkönmäki Church | religious | cathedral | church |
| francisco-q-sanchez-elementary-school | Francisco Q. Sanchez Elementary School | educational | school-university | elementary |
| inadomi-house | Inadomi House | residential | house | house |
| akai-house | Akai House | residential | house | house |
| ohara-house | Ohara House | residential | house | house |
| kaufmann-desert-house | Kaufmann Desert House | residential | house | house |
| holiday-house-motel | Holiday House Motel | residential | house | house |
| moore-house | Moore House | residential | house | house |
| arthur-and-mona-hofmann-house | Arthur and Mona Hofmann House | residential | house | house |
| corona-avenue-school | Corona Avenue School | educational | school-university | school |
| clark-house | Clark House | residential | house | house |
| maury-and-bernice-sorrells-house | Maury and Bernice Sorrells House | residential | house | house |
| harry-koblick-house | Harry Koblick House | residential | house | house |
| tremaine-house | Tremaine House | residential | house | house |
| casa-tuia | Casa Tuia | residential | house | casa |
| emerson-middle-school | Emerson Middle School | educational | school-university | school |
| greenberg-house | Greenberg house | residential | house | house |
| alfred-de-schulthess-house | Alfred de Schulthess House | residential | house | house |
| googies-coffee-shop | Googies Coffee Shop | commercial | commercial-intl | coffee shop |
| arango-house | Arango House | residential | house | house |
| sheats-apartments | Sheats Apartments | residential | house | apartments |
| foster-carling-house | Foster Carling House | residential | house | house |
| j-w-schaffer-house | J.W. Schaffer House | residential | house | house |
| garcia-house | Garcia House | residential | house | house |
| stevens-house | Stevens House | residential | house | house |
| willis-harpel-house | Willis Harpel House | residential | house | house |
| sheats-goldstein-residence | Sheats Goldstein Residence | residential | house | residence |
| balboa-island-house | Balboa Island House | residential | house | house |
| leo-m-harvey-house | Leo M. Harvey House | residential | house | house |
| elrod-house | Elrod House | residential | house | house |
| douglas-and-octavia-walstrom-house | Douglas and Octavia Walstrom House | residential | house | house |
| john-and-mary-lautner-house | John and Mary Lautner House | residential | house | house |
| revere-quality-institute-house | Revere Quality Institute House | residential | house | house |
| john-and-alice-fullam-house | John and Alice Fullam House | residential | house | house |
| warren-mcguirk-alumni-stadium | Warren McGuirk Alumni Stadium | sports | stadium | stadium |
| rudolph-tuskegee-chapel | Rudolph Tuskegee Chapel | religious | cathedral | chapel |
| beinecke-rare-book-manuscript-library | Beinecke Rare Book & Manuscript Library | cultural | museum | library |
| manhattan-house | Manhattan House | residential | house | house |
| carlton-hotel | Carlton Hotel | commercial | commercial-retail | hotel |
| the-concourse | The Concourse | transportation | airport-station | concourse |
| lyndon-baines-johnson-library-and | Lyndon Baines Johnson Library and Museum | cultural | museum | library |
| louis-micheels-house | Louis Micheels House | residential | house | house |
| milam-residence | Milam Residence | residential | house | residence |
| picker-art-gallery | Picker Art Gallery | cultural | art-museum | gallery |
| bunshaft-residence | Bunshaft Residence | residential | house | residence |
| hiss-residence | Hiss Residence | residential | house | residence |
| michael-and-joan-lenihan-glazer | Michael and Joan Lenihan Glazer Residence | residential | house | residence |
| rose-seidler-house | Rose Seidler House | residential | house | house |
| horizon-apartments | Horizon Apartments | residential | house | apartments |
| hagi-uragami-museum | Hagi Uragami Museum | cultural | museum | museum |
| hyogo-prefectural-museum-of-history | Hyogo Prefectural Museum of History | cultural | museum | museum |
| yokohama-museum-of-art | Yokohama Museum of Art | cultural | art-museum | museum of art |
| italie-deux | Italie Deux | commercial | commercial-retail | italie deux |
| assumption-of-mary-cathedral-hiroshima | Assumption of Mary Cathedral, Hiroshima | religious | cathedral | cathedral |
| mercure-yokosuka | Mercure Yokosuka | commercial | commercial-retail | mercure |
| cenotaph-for-the-a-bomb-victims | Cenotaph for the A-Bomb Victims | monument | monument-memorial | cenotaph |
| flame-of-peace | Flame of Peace | monument | monument-memorial | flame of peace |
| saitama-museum-of-natural-history | Saitama Museum of Natural History | cultural | museum | museum |
| skopje-train-station | Skopje Train Station | transportation | airport-station | station |
| saitama-prefectural-museum-of-history | Saitama Prefectural Museum of History and Folklore | cultural | museum | museum |
| kumamoto-prefectural-theater | Kumamoto Prefectural Theater | cultural | museum | theater |
| international-house-of-japan | International House of Japan | residential | house | house |
| asian-arts-museum | Asian Arts Museum | cultural | museum | museum |
| kurashiki-city-art-museum | Kurashiki City Art Museum | cultural | art-museum | art museum |
| ongakudo | Ongakudō | cultural | hall-cultural | ongakudo |
| kumamoto-prefectural-museum-of-art | Kumamoto Prefectural Museum of Art | cultural | art-museum | museum of art |
| rohm-theatre-kyoto | Rohm Theatre Kyoto | cultural | museum | theatre |
| yokosuka-arts-theatre | Yokosuka Arts Theatre | cultural | museum | theatre |
| miyagi-museum-of-art | Miyagi Museum of Art | cultural | art-museum | museum of art |
| the-national-museum-of-modern | The National Museum of Modern Art, Tokyo | cultural | art-museum | modern art |
| yamaguchi-prefectural-museum | Yamaguchi Prefectural Museum | cultural | museum | museum |
| minneapolis-institute-of-art | Minneapolis Institute of Art | cultural | named-cultural | institute of art |
| museum-of-east-asian-art | Museum of East-Asian Art | cultural | art-museum | art museum |
| grand-prince-hotel-akasaka | Grand Prince Hotel Akasaka | commercial | commercial-retail | hotel |
| gaumont-grand-ecran-italie | Gaumont Grand Écran Italie | commercial | commercial-intl | gaumont |
| discovery-primea | Discovery Primea | commercial | commercial-retail | discovery primea |
| hayashibara-museum-of-art | Hayashibara Museum of Art | cultural | art-museum | museum of art |
| kunio-maekawa-house | Kunio Maekawa House | residential | house | house |
| tokyo-metropolitan-art-museum | Tokyo Metropolitan Art Museum | cultural | art-museum | art museum |
| yamanashi-prefectural-museum-of-art | Yamanashi Prefectural Museum of Art | cultural | art-museum | museum of art |
| miyazaki-prefectural-museum-of-nature | Miyazaki Prefectural Museum of Nature and History | cultural | museum | museum |
| shinjuku-station-west-concourse | Shinjuku Station West Concourse | transportation | airport-station | station |
| st-marys-cathedral | St. Mary's Cathedral | religious | cathedral | cathedral |
| apa-hotel-resort-tokyo-bay | APA Hotel & Resort Tokyo Bay Makuhari | commercial | commercial-retail | hotel |
| niigata-city-art-museum | Niigata City Art Museum | cultural | art-museum | art museum |
| fukuoka-art-museum | Fukuoka Art Museum | cultural | art-museum | art museum |
| national-museum-of-western-art | National Museum of Western Art | cultural | museum | museum |
| tokyo-bunka-kaikan | Tokyo Bunka Kaikan | cultural | named-cultural | bunka kaikan |
| lake-biwa-otsu-prince-hotel | Lake Biwa Otsu Prince Hotel | commercial | commercial-retail | hotel |
| proposed-domed-brooklyn-dodgers-stadium | Proposed domed Brooklyn Dodgers stadium | sports | stadium | stadium |
| dymaxion-house | Dymaxion house | residential | house | house |
| hirosaki-city-museum | Hirosaki City Museum | cultural | museum | museum |
| setagaya-city-local-museum | Setagaya City Local Museum | cultural | museum | museum |
| national-museum-of-japanese-history | National Museum of Japanese History | cultural | museum | museum |
| tokyo-metropolitan-theatre | Tokyo Metropolitan Theatre | cultural | museum | theatre |
| komazawa-gymnasium | Komazawa Gymnasium | sports | stadium | gymnasium |
| ishikawa-ongakudo | Ishikawa Ongakudō | cultural | hall-cultural | ongakudo |
| dome-over-manhattan | Dome over Manhattan | sports | stadium | dome |
| church-of-san-juan-de | church of San Juan de Ávila | religious | cathedral | church |
| temple-of-san-antonio-de | Temple of San Antonio de las Huertas, Mexico City | religious | cathedral | temple |
| deposito-julio-herrera-y-obes | Depósito Julio Herrera y Obes | industrial | industrial | deposito |
| montreal-biosphere | Montreal Biosphère | cultural | named-cultural | biosphere |
| church-of-nuestra-senora-de | church of Nuestra Señora de Guadalupe | religious | cathedral | church |
| church-of-cristo-obrero-y | Church of Cristo Obrero y Nuestra Señora de Lourdes | religious | cathedral | church |
| montevideo-shopping | Montevideo Shopping | commercial | commercial-retail | shopping |
| national-coach-museum | National Coach Museum | cultural | museum | museum |
| museu-brasileiro-da-escultura | Museu Brasileiro da Escultura | cultural | museum | museu |
| estadio-serra-dourada | Estádio Serra Dourada | sports | stadium-intl | estadio |
| cais-das-artes | Cais das Artes | cultural | hall-cultural | cais das artes |
| museum-of-modern-literature | Museum of Modern Literature | cultural | museum | museum |
| mughal-museum | Mughal Museum | cultural | museum | museum |
| central-library-des-moines | Central Library, Des Moines | cultural | museum | library |
| kaufhaus-tyrol | Kaufhaus Tyrol | commercial | commercial-retail | kaufhaus |
| james-simon-gallery | James Simon Gallery | cultural | art-museum | gallery |
| saint-louis-art-museum | Saint Louis Art Museum | cultural | art-museum | art museum |
| coleccion-jumex | Colección Jumex | cultural | named-cultural | coleccion |
| ciutat-de-la-justicia-de | Ciutat de la Justícia de Barcelona i l'Hospitalet de Llobregat | government | civic-government-intl | justicia |
| 1-cobham-mews-studios | 1 Cobham Mews Studios | residential | house | mews |
| unipol-dome | Unipol Dome | sports | stadium | dome |
| musee-d-art-moderne | Musée d’Art Moderne | cultural | museum | musée |
| elementary-school | elementary school | educational | school-university | elementary |
| salerno-courthouse | Salerno Courthouse | government | government | courthouse |
| ningbo-museum | Ningbo Museum | cultural | museum | museum |
| five-scattered-houses-ningbo | Five Scattered Houses, Ningbo | residential | house | houses |
| bianchi-house | Bianchi House | residential | house | house |
| toulouse-school-of-economics | Toulouse School of Economics | educational | school-university | school |
| santantonio-abate-parish-church | Sant'Antonio Abate Parish Church | religious | cathedral | parish |
| watari-museum-of-contemporary-art | Watari Museum of Contemporary Art | cultural | art-museum | contemporary art |
| museum-of-modern-and-contemporary | Museum of Modern and Contemporary Art of Trento and Rovereto | cultural | art-museum | contemporary art |
| teatro-degli-arcimboldi | Teatro degli Arcimboldi | cultural | named-cultural | teatro |
| dortmund-city-and-state-library | Dortmund City and State Library | cultural | museum | library |
| biblioteca-comunale-centrale-antonio-tiraboschi | Biblioteca comunale centrale Antonio Tiraboschi | cultural | museum | biblioteca |
| museum-tinguely | Museum Tinguely | cultural | museum | museum |
| evry-cathedral | Évry Cathedral | religious | cathedral | cathedral |
| santo-papa-giovanni-xxiii-church | Santo Papa Giovanni XXIII Church | religious | cathedral | church |
| maison-du-livre-de-limage | Maison du Livre, de l'Image et du Son | residential | house | maison |
| house-delorenzi | House Delorenzi | residential | house | house |
| scuola-media | Scuola Media | educational | school-university | scuola |
| saint-peter-church | Saint Peter Church | religious | cathedral | church |
| centro-commerciale-le-torri | Centro commerciale Le Torri | commercial | commercial-intl | commerciale |
| rotonda-house | Rotonda House | residential | house | house |
| santa-maria-degli-angeli | Santa Maria degli Angeli | religious | cathedral | santa |
| bianda-house | Bianda House | residential | house | house |
| casino-di-campione | Casinò di Campione | commercial | commercial-retail | casino |
| utec-campus | UTEC campus | educational | school-university | campus |
| yokosuka-museum-of-art | Yokosuka Museum of Art | cultural | art-museum | museum of art |
| meti-handmade-school | METI Handmade School | educational | school-university | school |
