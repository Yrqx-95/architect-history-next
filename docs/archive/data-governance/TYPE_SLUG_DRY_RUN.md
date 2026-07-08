# Type Slug Dry Run

Generated: 2026-06-08T11:38:16.428Z

## Summary

- Missing `type_slug`: 740
- High-confidence candidates: 323
- Medium-confidence candidates: 273
- Needs manual confirmation: 144
- Estimated high-confidence coverage: 43.65%
- Estimated remaining after high-confidence fill: 417
- Estimated remaining after high + medium review: 144

## Rule Notes

The current canonical `building_types` table uses broad slugs such as `cultural`, `religious`, `residential`, `transportation`, `sports`, and `government`. The dry-run preserves detected subtypes separately, for example museum/art-museum/library/theater all map to `cultural` unless the taxonomy is expanded later.

## High-Confidence Type Distribution

| type_slug | Count |
|---|---|
| residential | 112 |
| cultural | 106 |
| commercial | 29 |
| religious | 26 |
| educational | 15 |
| sports | 12 |
| monument | 7 |
| transportation | 6 |
| government | 5 |
| industrial | 4 |
| healthcare | 1 |

## High-Confidence Candidates

| Building | Name | type_slug | Subtype | Evidence |
|---|---|---|---|---|
| 1-cobham-mews-studios | 1 Cobham Mews Studios | residential | house | mews |
| abele-residence | Abele Residence | residential | house | residence |
| acropolis-museum | Acropolis Museum | cultural | museum | museum |
| aga-khan-museum | Aga Khan Museum | cultural | museum | museum |
| akai-house | Akai House | residential | house | house |
| alfred-de-schulthess-house | Alfred de Schulthess House | residential | house | house |
| alvar-aalto-museum-jyvaskyla | Alvar Aalto Museum Jyväskylä | cultural | museum | museum |
| apa-hotel-resort-tokyo-bay | APA Hotel & Resort Tokyo Bay Makuhari | commercial | commercial-retail | hotel |
| arango-house | Arango House | residential | house | house |
| arne-jacobsen-s-own-house | Arne Jacobsen’s own house in Charlottenlund | residential | house | house |
| arthur-and-mona-hofmann-house | Arthur and Mona Hofmann House | residential | house | house |
| ashford-designer-outlet | Ashford Designer Outlet | commercial | commercial-intl | designer outlet |
| asian-arts-museum | Asian Arts Museum | cultural | museum | museum |
| asilo-santelia | Asilo Sant'Elia | religious | cathedral | sant |
| assumption-of-mary-cathedral-hiroshima | Assumption of Mary Cathedral, Hiroshima | religious | cathedral | cathedral |
| atelier-museu-julio-pomar | Atelier-Museu Júlio Pomar | cultural | museum | museu |
| atlanta-fulton-county-central-library | Atlanta Fulton County Central Library | cultural | museum | library |
| auerbacher-home | Auerbacher Home | residential | house | home |
| bagsv-rd-church | Bagsværd Church | religious | cathedral | church |
| balboa-island-house | Balboa Island House | residential | house | house |
| bank-melli-iran-university-of | Bank Melli Iran (University of Tehran Branch) | educational | school-university | university |
| beinecke-rare-book-manuscript-library | Beinecke Rare Book & Manuscript Library | cultural | museum | library |
| bellavista-housing-estate | Bellavista housing estate | residential | house | housing |
| bellevue-arts-museum | Bellevue Arts Museum | cultural | museum | museum |
| bellevue-teatret | Bellevue Teatret | cultural | named-cultural | teatret |
| bianchi-house | Bianchi House | residential | house | house |
| bianda-house | Bianda House | residential | house | house |
| biblioteca-comunale-centrale-antonio-tiraboschi | Biblioteca comunale centrale Antonio Tiraboschi | cultural | museum | biblioteca |
| biblioteca-municipal-de-viana-do | Biblioteca Municipal de Viana do Castelo | cultural | museum | biblioteca |
| blue-condominium | Blue Condominium | residential | house | condominium |
| bordeaux-courthouse | Bordeaux Courthouse | government | government | courthouse |
| brion-tomb | Brion tomb | monument | monument-memorial | tomb |
| bunshaft-residence | Bunshaft Residence | residential | house | residence |
| buro-und-geschaftshaus | Büro- und Geschäftshaus | commercial | commercial-intl | geschaftshaus |
| c-v-starr-east-asian | C. V. Starr East Asian Library | cultural | museum | library |
| cais-das-artes | Cais das Artes | cultural | hall-cultural | cais das artes |
| campus-palmas-altas-sevilla | Campus Palmas Altas (Sevilla) | educational | school-university | campus |
| carlton-hotel | Carlton Hotel | commercial | commercial-retail | hotel |
| casa-comolli-rustici | Casa Comolli-Rustici | residential | house | casa |
| casa-das-historias-paula-rego | Casa das Histórias Paula Rego | residential | house | casa |
| casa-de-cha-da-boa | Casa de Chá da Boa Nova | residential | house | casa |
| casa-do-benin | Casa do Benin | residential | house | casa |
| casa-do-chame-chame | Casa do Chame-Chame | residential | house | casa |
| casa-ghiringhelli | Casa Ghiringhelli | residential | house | casa |
| casa-gilardi | Casa Gilardi | residential | house | casa |
| casa-giuliani-frigerio | Casa Giuliani Frigerio | residential | house | casa |
| casa-lavezzari | Casa Lavezzari | residential | house | casa |
| casa-ottolenghi | Casa Ottolenghi | residential | house | casa |
| casa-pedraglio | Casa Pedraglio | residential | house | casa |
| casa-roberto-ivens-casa | Casa Roberto Ivens - Casa da Arquitetura | residential | house | casa |
| casa-rustici | Casa Rustici | residential | house | casa |
| casa-toninello | Casa Toninello | residential | house | casa |
| casa-tuia | Casa Tuia | residential | house | casa |
| casino-di-campione | Casinò di Campione | commercial | commercial-retail | casino |
| cathedral-of-our-lady-of | Cathedral of Our Lady of the Angels | religious | cathedral | cathedral |
| cenotaph-for-the-a-bomb-victims | Cenotaph for the A-Bomb Victims | monument | monument-memorial | cenotaph |
| central-library-des-moines | Central Library, Des Moines | cultural | museum | library |
| centro-commerciale-le-torri | Centro commerciale Le Torri | commercial | commercial-intl | commerciale |
| church-of-cristo-obrero-y | Church of Cristo Obrero y Nuestra Señora de Lourdes | religious | cathedral | church |
| church-of-nuestra-senora-de | church of Nuestra Señora de Guadalupe | religious | cathedral | church |
| church-of-san-juan-de | church of San Juan de Ávila | religious | cathedral | church |
| church-of-the-three-crosses | Church of the Three Crosses | religious | cathedral | church |
| cidade-das-artes-bibi-ferreira | Cidade das Artes Bibi Ferreira | cultural | hall-cultural | cidade das artes |
| cite-de-locean-et-du | Cité de l'Océan et du Surf | cultural | named-cultural | océan et du surf |
| ciutat-de-la-justicia-de | Ciutat de la Justícia de Barcelona i l'Hospitalet de Llobregat | government | civic-government-intl | justicia |
| clark-house | Clark House | residential | house | house |
| cleveland-museum-of-art | Cleveland Museum of Art | cultural | art-museum | museum of art |
| coaty-restaurante | Coaty Restaurante | commercial | commercial-intl | restaurante |
| cohen-house | Cohen House | residential | house | house |
| coleccion-jumex | Colección Jumex | cultural | named-cultural | coleccion |
| coliseu-de-viana-do-castelo | Coliseu de Viana do Castelo | cultural | hall-cultural | coliseu |
| college-of-education-training-school | College of Education training school | educational | school-university | college |
| constance-perkins-house | Constance Perkins House | residential | house | house |
| corona-avenue-school | Corona Avenue School | educational | school-university | school |
| cuadra-san-cristobal | Cuadra San Cristobal | religious | cathedral | san |
| de-bijenkorf | De Bijenkorf | commercial | commercial-intl | bijenkorf |
| deposito-julio-herrera-y-obes | Depósito Julio Herrera y Obes | industrial | industrial | deposito |
| discovery-primea | Discovery Primea | commercial | commercial-retail | discovery primea |
| dome-over-manhattan | Dome over Manhattan | sports | stadium | dome |
| dortmund-city-and-state-library | Dortmund City and State Library | cultural | museum | library |
| douglas-and-octavia-walstrom-house | Douglas and Octavia Walstrom House | residential | house | house |
| dymaxion-house | Dymaxion house | residential | house | house |
| elementary-school | elementary school | educational | school-university | elementary |
| elrod-house | Elrod House | residential | house | house |
| emerson-middle-school | Emerson Middle School | educational | school-university | school |
| ensemble-of-alvaro-sizas-architecture | ensemble of Álvaro Siza's architecture works in Portugal | industrial | industrial | works |
| espirito-santo-do-cerrado-church | Espirito Santo do Cerrado church | religious | cathedral | church |
| estadio-municipal-de-braga | Estádio Municipal de Braga | sports | stadium-intl | estadio |
| estadio-serra-dourada | Estádio Serra Dourada | sports | stadium-intl | estadio |
| evry-cathedral | Évry Cathedral | religious | cathedral | cathedral |
| extension-of-museo-del-prado | Extension of Museo del Prado | cultural | museum | museo |
| facultad-de-ciencias-de-la | Facultad de Ciencias de la Comunicación de Santiago de Compostela | educational | school-university | facultad |
| five-scattered-houses-ningbo | Five Scattered Houses, Ningbo | residential | house | houses |
| flame-of-peace | Flame of Peace | monument | monument-memorial | flame of peace |
| former-weichmanns-textile-house | Former Weichmann's Textile House | residential | house | house |
| foster-carling-house | Foster Carling House | residential | house | house |
| francisco-q-sanchez-elementary-school | Francisco Q. Sanchez Elementary School | educational | school-university | elementary |
| fredensborg-houses | Fredensborg Houses | residential | house | houses |
| fukuoka-art-museum | Fukuoka Art Museum | cultural | art-museum | art museum |
| garcia-house | Garcia House | residential | house | house |
| gateway-arch | Gateway Arch | monument | monument-memorial | arch |
| gaumont-grand-ecran-italie | Gaumont Grand Écran Italie | commercial | commercial-intl | gaumont |
| gilbey-house | Gilbey House | residential | house | house |
| gipsoteca-canoviana | Gipsoteca canoviana | cultural | art-museum | gipsoteca |
| glass-house | Glass House | residential | house | house |
| googies-coffee-shop | Googies Coffee Shop | commercial | commercial-intl | coffee shop |
| grand-prince-hotel-akasaka | Grand Prince Hotel Akasaka | commercial | commercial-retail | hotel |
| greenberg-house | Greenberg house | residential | house | house |
| hagi-uragami-museum | Hagi Uragami Museum | cultural | museum | museum |
| haifa-first-power-plant | Haifa first power plant | industrial | industrial | plant |
| harry-koblick-house | Harry Koblick House | residential | house | house |
| hayashibara-museum-of-art | Hayashibara Museum of Art | cultural | art-museum | museum of art |
| henry-chamberlain-house | Henry Chamberlain House | residential | house | house |
| hill-museum-manuscript-library | Hill Museum & Manuscript Library | cultural | museum | museum |
| hirosaki-city-museum | Hirosaki City Museum | cultural | museum | museum |
| hiss-residence | Hiss Residence | residential | house | residence |
| holiday-house-motel | Holiday House Motel | residential | house | house |
| hooper-house-baltimore-county-maryland | Hooper House (Baltimore County, Maryland) | residential | house | house |
| horizon-apartments | Horizon Apartments | residential | house | apartments |
| hospital-materno-infantil-gregorio-maranon | Hospital Materno-Infantil Gregorio Marañón | healthcare | healthcare | hospital |
| house-delorenzi | House Delorenzi | residential | house | house |
| house-vi | House VI | residential | house | house |
| hyogo-prefectural-museum-of-history | Hyogo Prefectural Museum of History | cultural | museum | museum |
| inadomi-house | Inadomi House | residential | house | house |
| institute-for-contemporary-art-richmond | Institute for Contemporary Art, Richmond | cultural | art-museum | contemporary art |
| international-house-of-japan | International House of Japan | residential | house | house |
| ishikawa-ongakudo | Ishikawa Ongakudō | cultural | hall-cultural | ongakudo |
| italie-deux | Italie Deux | commercial | commercial-retail | italie deux |
| iwasaki-art-museum | Iwasaki Art Museum | cultural | art-museum | art museum |
| j-m-teixeira-house | J. M. Teixeira House | residential | house | house |
| j-w-schaffer-house | J.W. Schaffer House | residential | house | house |
| james-simon-gallery | James Simon Gallery | cultural | art-museum | gallery |
| japanese-sword-museum | Japanese Sword Museum | cultural | museum | museum |
| john-and-alice-fullam-house | John and Alice Fullam House | residential | house | house |
| john-and-mary-lautner-house | John and Mary Lautner House | residential | house | house |
| kaufhaus-schocken | Kaufhaus Schocken | commercial | commercial-retail | kaufhaus |
| kaufhaus-tyrol | Kaufhaus Tyrol | commercial | commercial-retail | kaufhaus |
| kaufmann-desert-house | Kaufmann Desert House | residential | house | house |
| kiasma | Kiasma | cultural | museum | kiasma |
| kingo-houses | Kingo Houses | residential | house | houses |
| kirjatalo | Kirjatalo | cultural | named-cultural | kirjatalo |
| kleanthis-vikelidis-stadium | Kleanthis Vikelidis Stadium | sports | stadium | stadium |
| komazawa-gymnasium | Komazawa Gymnasium | sports | stadium | gymnasium |
| kulttuuritalo | Kulttuuritalo | cultural | named-cultural | kulttuuritalo |
| kumamoto-prefectural-museum-of-art | Kumamoto Prefectural Museum of Art | cultural | art-museum | museum of art |
| kumamoto-prefectural-theater | Kumamoto Prefectural Theater | cultural | museum | theater |
| kunio-maekawa-house | Kunio Maekawa House | residential | house | house |
| kunsten-museum-of-modern-art | Kunsten Museum of Modern Art Aalborg | cultural | art-museum | modern art |
| kunstzaal-zuid | Kunstzaal Zuid | cultural | hall-cultural | kunstzaal |
| kurashiki-city-art-museum | Kurashiki City Art Museum | cultural | art-museum | art museum |
| lake-biwa-otsu-prince-hotel | Lake Biwa Otsu Prince Hotel | commercial | commercial-retail | hotel |
| lauditori | L'Auditori | cultural | hall-cultural | auditori |
| le-rocher-de-palmer | Le Rocher de Palmer | cultural | named-cultural | rocher de palmer |
| leo-m-harvey-house | Leo M. Harvey House | residential | house | house |
| les-champs-libres | Les Champs Libres | cultural | named-cultural | champs libres |
| loisium-weinerlebniswelt-vinothek | LOISIUM WeinErlebnisWelt & Vinothek | commercial | commercial-intl | vinothek |
| loisium-wine-spa-resort-langenlois | Loisium Wine & Spa Resort Langenlois | commercial | commercial-retail | resort |
| louis-micheels-house | Louis Micheels House | residential | house | house |
| luis-barragan-house-and-studio | Luis Barragán House and Studio | residential | house | house |
| lyndon-baines-johnson-library-and | Lyndon Baines Johnson Library and Museum | cultural | museum | library |
| maison-de-verre | Maison de Verre | residential | house | maison |
| maison-du-livre-de-limage | Maison du Livre, de l'Image et du Son | residential | house | maison |
| manhattan-house | Manhattan House | residential | house | house |
| marcel-breuer-house-and-studio | Marcel Breuer House and Studio | residential | house | house |
| marcel-breuer-house-at-pocantico | Marcel Breuer House at Pocantico | residential | house | house |
| marcel-breuer-house-ii | Marcel Breuer House II | residential | house | house |
| maury-and-bernice-sorrells-house | Maury and Bernice Sorrells House | residential | house | house |
| memorial-to-the-murdered-jews | Memorial to the Murdered Jews of Europe | monument | monument-memorial | memorial |
| mendelsohn-house | Mendelsohn House | residential | house | house |
| mendelsohn-housing-scheme-luckenwalde | Mendelsohn-housing scheme (Luckenwalde) | residential | house | housing |
| mercado-municipal-do-caranda | Mercado Municipal do Carandá | commercial | commercial-intl | mercado |
| mercure-yokosuka | Mercure Yokosuka | commercial | commercial-retail | mercure |
| meti-handmade-school | METI Handmade School | educational | school-university | school |
| michael-and-joan-lenihan-glazer | Michael and Joan Lenihan Glazer Residence | residential | house | residence |
| milam-residence | Milam Residence | residential | house | residence |
| millennium-dome | Millennium Dome | sports | stadium | dome |
| minneapolis-institute-of-art | Minneapolis Institute of Art | cultural | named-cultural | institute of art |
| miyagi-museum-of-art | Miyagi Museum of Art | cultural | art-museum | museum of art |
| miyazaki-prefectural-museum-of-nature | Miyazaki Prefectural Museum of Nature and History | cultural | museum | museum |
| moderna-museet | Moderna Museet | cultural | hall-cultural | moderna museet |
| montevideo-shopping | Montevideo Shopping | commercial | commercial-retail | shopping |
| montreal-biosphere | Montreal Biosphère | cultural | named-cultural | biosphere |
| moore-house | Moore House | residential | house | house |
| mughal-museum | Mughal Museum | cultural | museum | museum |
| munkegaard-school | Munkegaard School | educational | school-university | school |
| musee-d-art-moderne | Musée d’Art Moderne | cultural | museum | musée |
| musee-herge | Musée Hergé | cultural | museum | musée |
| museo-del-teatro-romano-de | Museo del Teatro Romano de Cartagena | cultural | museum | museo |
| museu-brasileiro-da-escultura | Museu Brasileiro da Escultura | cultural | museum | museu |
| museu-de-arte-contemporanea-nadir | Museu de Arte Contemporânea Nadir Afonso | cultural | art-museum | museu de arte |
| museum-of-east-asian-art | Museum of East-Asian Art | cultural | art-museum | art museum |
| museum-of-fine-arts-houston | Museum of Fine Arts, Houston | cultural | art-museum | fine arts |
| museum-of-modern-and-contemporary | Museum of Modern and Contemporary Art of Trento and Rovereto | cultural | art-museum | contemporary art |
| museum-of-modern-literature | Museum of Modern Literature | cultural | museum | museum |
| museum-tinguely | Museum Tinguely | cultural | museum | museum |
| muurame-church | Muurame Church | religious | cathedral | church |
| muuratsalo-experimental-house | Muuratsalo Experimental House | residential | house | house |
| national-coach-museum | National Coach Museum | cultural | museum | museum |
| national-museum-of-japanese-history | National Museum of Japanese History | cultural | museum | museum |
| national-museum-of-modern-art | National Museum of Modern Art, Kyoto | cultural | art-museum | modern art |
| national-museum-of-roman-art | National Museum of Roman Art | cultural | museum | museum |
| national-museum-of-western-art | National Museum of Western Art | cultural | museum | museum |
| negozio-di-arredamento-gavina | Negozio di arredamento Gavina | commercial | commercial-retail | negozio |
| niigata-city-art-museum | Niigata City Art Museum | cultural | art-museum | art museum |
| ningbo-museum | Ningbo Museum | cultural | museum | museum |
| nordic-house | Nordic House | residential | house | house |
| ohara-house | Ohara House | residential | house | house |
| one-monte-carlo | One Monte-Carlo | commercial | commercial-retail | one monte-carlo |
| ongakudo | Ongakudō | cultural | hall-cultural | ongakudo |
| our-lady-of-the-annunciation | Our Lady of the Annunciation Chapel at Annunciation Priory | religious | cathedral | chapel |
| pace-collection-showroom | Pace Collection showroom | cultural | art-museum | collection |
| palos-verdes-high-school | Palos Verdes High School | educational | school-university | school |
| paris-la-defense-arena | Paris La Défense Arena | sports | stadium | arena |
| paris-opera-ballet-school | Paris Opera Ballet School | educational | school-university | school |
| parkeergarage-bijenkorf | Parkeergarage Bijenkorf | commercial | commercial-intl | bijenkorf |
| paustian-house | Paustian House | residential | house | house |
| petersdorff-department-store | Petersdorff Department Store | commercial | commercial-retail | store |
| philharmonie-de-paris | Philharmonie de Paris | cultural | museum | philharmonie |
| philharmonie-luxembourg | Philharmonie Luxembourg | cultural | museum | philharmonie |
| picker-art-gallery | Picker Art Gallery | cultural | art-museum | gallery |

## Medium-Confidence Candidates

| Building | Name | type_slug | Subtype | Evidence | Alternatives |
|---|---|---|---|---|---|
| 1-spring-street | 1 Spring Street | office | tower-office | spring street |  |
| 122-leadenhall-street | 122 Leadenhall Street | office | office-headquarters | leadenhall |  |
| 190-192-sloane-street | 190–192 Sloane Street | office | tower-office | sloane street |  |
| 20-times-square | 20 Times Square | office | tower-office | times square | public-space:public-space |
| 25th-of-april-society-headquarters | 25th of April Society Headquarters | office | office-headquarters | headquarters |  |
| 3-world-trade-center | 3 World Trade Center | office | tower-office | center | civic-public:hall-center, office:office-headquarters |
| 4-world-trade-center | 4 World Trade Center | office | tower-office | center | civic-public:hall-center, office:office-headquarters |
| 51-astor-place | 51 Astor Place | office | tower-office | astor place |  |
| 88-wood-street | 88 Wood Street | office | tower-office | wood street |  |
| 945-madison-avenue | 945 Madison Avenue | office | tower-office | madison avenue |  |
| aalto-hochhaus | Aalto-Hochhaus | office | tower-office | hochhaus |  |
| aarhus-city-hall | Aarhus City Hall | government | government | city hall | civic-public:hall-center |
| airman-memorial-chapel | Airman Memorial Chapel | religious | cathedral | chapel | monument:monument-memorial |
| alfred-lerner-hall | Alfred Lerner Hall | civic-public | hall-center | hall |  |
| americas-cup-building | America's Cup Building | office | tower-office | building |  |
| ameritrust-tower | Ameritrust Tower | office | tower-office | tower | office:office-headquarters |
| amorepacific-headquarters | Amorepacific Headquarters | office | office-headquarters | headquarters |  |
| andre-malraux-cultural-centre | André Malraux Cultural Centre | cultural | museum | cultural centre | cultural:hall-cultural, office:tower-office, civic-public:hall-center |
| arenas-de-barcelona | Arenas de Barcelona | leisure | leisure-named | arenas de barcelona |  |
| ariston-club | Ariston Club | civic-public | hall-center | club |  |
| arne-jacobsen-bau-in-mainz-hartenberg-munchfeld | Arne-Jacobsen-Bau in Mainz-Hartenberg/Münchfeld | office | tower-office | bau |  |
| atocha-cercanias | Atocha-Cercanías | transportation | station-intl | atocha |  |
| audrey-jones-beck-building | Audrey Jones Beck Building | office | tower-office | building |  |
| australia-square | Australia Square | public-space | public-space | square |  |
| australia-square-tower | Australia Square Tower | office | tower-office | tower | office:office-headquarters, public-space:public-space |
| bairro-da-malagueira | Bairro da Malagueira | residential | housing-general | bairro |  |
| baloise-bellinzona | Baloise Bellinzona | office | tower-office | baloise bellinzona |  |
| banca-popolare-di-verona | Banca Popolare di Verona | office | tower-office | banca |  |
| bank-leumi-building-jerusalem | Bank Leumi Building, Jerusalem | office | tower-office | leumi |  |
| bank-of-shanghai-headquarters | Bank of Shanghai Headquarters | office | office-headquarters | headquarters |  |
| bank-of-spain-building-in | Bank of Spain building in Jaén | office | tower-office | building | office:office-headquarters |
| bank-of-spain-headquarters | Bank of Spain headquarters | government | government | bank of spain headquarters | office:office-headquarters |
| bankinter-building | Bankinter building | office | tower-office | bankinter |  |
| barack-obama-presidential-center | Barack Obama Presidential Center | office | tower-office | center | civic-public:hall-center |
| big-roof | Big Roof | public-space | park-intl | big roof |  |
| blue-front-shibaura | BLUE FRONT SHIBAURA | office | tower-office | blue front shibaura |  |
| bodmer-foundation | Bodmer Foundation | civic-public | hall-center | foundation |  |
| bonjour-tristesse | Bonjour Tristesse | residential | housing-general | bonjour tristesse |  |
| botta-building-basel | Botta Building Basel | office | tower-office | building |  |
| bridge-of-peace | Bridge of Peace | transportation | airport-station | bridge of peace | infrastructure:infrastructure |
| burroughs-wellcome-company-corporate-headquarters | Burroughs Wellcome Company Corporate Headquarters | office | office-headquarters | company |  |
| campbell-sports-center | Campbell Sports Center | sports | stadium-intl | sports center | office:tower-office, civic-public:hall-center |
| can-feliz | Can Feliz | residential | housing-general | can feliz |  |
| can-lis | Can Lis | residential | housing-general | can lis |  |
| capita-centre | Capita Centre | office | tower-office | centre | civic-public:hall-center |
| carlos-ramos-pavilion | Carlos Ramos Pavilion | temporary | pavilion | pavilion |  |
| carmen-wurth-forum | Carmen Würth Forum | civic-public | hall-center | forum |  |
| case-dautore | Case d'autore | residential | housing-general | case- |  |
| celine-and-heiner-bastian-exhibition | Celine and Heiner Bastian exhibition room | temporary | pavilion | exhibition room |  |
| center-of-innovation-anacleto-angelini | Center of Innovation Anacleto Angelini | office | tower-office | center | civic-public:hall-center |
| centre-georges-pompidou | Centre Georges Pompidou | cultural | hall-cultural | centre georges pompidou | office:tower-office, civic-public:hall-center |
| ceremonial-palace-of-georgia | Ceremonial Palace of Georgia | civic-public | hall-center | palace |  |
| chapelle-cumenique-de-flaine | chapelle œcuménique de Flaine | religious | religious-intl | chapelle |  |
| chiesa-del-santo-volto | Chiesa del Santo Volto | religious | religious-intl | chiesa |  |
| chiesa-di-nostra-signora-del | Chiesa di Nostra Signora del Cadore | religious | religious-intl | chiesa |  |
| chusanren-building-main-building | Chusanren Building main building | office | tower-office | building |  |
| city-center-towers-complex | City Center Towers Complex | office | tower-office | center | civic-public:hall-center |
| cleveland-museum-of-art-building | Cleveland Museum of Art building | cultural | art-museum | museum of art | cultural:museum, office:tower-office |
| club-house-du-golf-de-beauvallon | Club-house du golf de Beauvallon | residential | house | house | civic-public:hall-center |
| col-legi-darquitectes | Col·legi d'Arquitectes | civic-public | hall-center | col-legi |  |
| college-of-education-staff-dormitory | College of Education staff dormitory | residential | house | dormitory | educational:school-university |
| conference-center-unesco | Conference Center UNESCO | office | tower-office | center | civic-public:hall-center, civic-public:civic-public |
| conjunto-habitacional-da-bouca | Conjunto Habitacional da Bouça | residential | housing-general | bouca |  |
| coolsingeltoren | Coolsingeltoren | office | tower-office | coolsingeltoren |  |
| crawford-manor | Crawford Manor | residential | housing-general | manor |  |
| creative-arts-center-colgate-university | Creative Arts Center [Colgate University] | cultural | museum | arts center | educational:school-university, office:tower-office, civic-public:hall-center |
| crematorium-uitzicht | Crematorium Uitzicht | religious | religious-intl | crematorium |  |
| crescent-professional-building | Crescent Professional Building | office | tower-office | building |  |
| cyclorama-building | Cyclorama Building | office | tower-office | building |  |
| cymbalista-synagogue-and-jewish-heritage | Cymbalista Synagogue and Jewish Heritage Center | religious | cathedral | synagogue | office:tower-office, civic-public:hall-center |
| daeyang-gallery-and-house | Daeyang Gallery and House | cultural | art-museum | gallery | residential:house |
| danish-national-bank | Danish National Bank | office | tower-office | national bank |  |
| dar-al-islam | Dar al-Islam | religious | religious-intl | dar al-islam |  |
| de-la-warr-pavilion | De La Warr Pavilion | temporary | pavilion | pavilion |  |
| dentsu-osaka-building | Dentsu Osaka Building | office | tower-office | building | office:office-headquarters |
| dentsu-osaka-office | Dentsu Osaka Office | office | office-headquarters | dentsu |  |
| dentsu-tsukiji-building | Dentsu Tsukiji Building | office | tower-office | building | office:office-headquarters |
| ebisu-east-park-toilet | Ebisu East Park Toilet | public-space | public-space | park |  |
| edifici-illa-diagonal | Edifici Illa Diagonal | office | tower-office | edifici |  |
| edificio-urumea | Edificio Urumea | office | tower-office | edificio |  |
| edp-headquarters-ii | EDP Headquarters II | office | office-headquarters | headquarters |  |
| egg-company-building-ii | Egg Company Building II | office | tower-office | building | office:office-headquarters |
| einstein-tower | Einstein Tower | office | tower-office | tower | office:office-headquarters |
| esbjerg-performing-arts-centre | Esbjerg Performing Arts Centre | cultural | museum | performing arts | office:tower-office, civic-public:hall-center |
| european-court-of-human-rights | European Court of Human Rights building | government | government | court of | office:tower-office |
| evere-crematorium | Evere Crematorium | religious | religious-intl | crematorium |  |
| expo-70-pavilion | Expo '70 Pavilion | temporary | pavilion | expo |  |
| fcg-building | FCG Building | office | tower-office | building |  |
| ferry-house | Ferry House | residential | house | house | transportation:airport-station |
| finnish-pavilion | Finnish pavilion | temporary | pavilion | pavilion |  |
| fondazione-querini-stampalia | Fondazione Querini Stampalia | civic-public | hall-center | fondazione |  |
| footbridge-of-the-science-museum | Footbridge of the Science Museum (Valladolid) | cultural | museum | museum | infrastructure:infrastructure |
| former-tokyo-metropolitan-government-building | Former Tokyo Metropolitan Government Building | government | government | government | office:tower-office |
| forum-castrop-rauxel | Forum Castrop-Rauxel | civic-public | hall-center | forum |  |
| foundation-e-g-buhrle-collection | Foundation E.G. Bührle Collection | cultural | art-museum | collection | civic-public:hall-center |
| french-embassy-building | French Embassy building | government | government | embassy | office:tower-office |
| friedhof-der-synagogengemeinde-konigsberg | Friedhof der Synagogengemeinde (Königsberg) | religious | religious-intl | friedhof |  |
| government-service-center | Government Service Center | government | government | government | office:tower-office, civic-public:hall-center, civic-public:civic-public |
| grollo-tower | Grollo Tower | office | tower-office | tower | office:office-headquarters |
| groninger-museum-building | Groninger Museum Building | cultural | museum | museum | office:tower-office |
| grosse-pointe-public-library-central | Grosse Pointe Public Library Central Branch | cultural | museum | library | civic-public:civic-public |
| hachiro-yuasa-memorial-museum | Hachirō Yuasa Memorial Museum | cultural | museum | museum | monument:monument-memorial |
| hadassah-university-hospital-mt-scopus | Hadassah University Hospital, Mt. Scopus | educational | school-university | university | healthcare:healthcare |
| haras-de-la-huderie | Haras de la Huderie | residential | housing-general | haras de la huderie |  |
| harting-vertriebsgebaude | Harting Vertriebsgebäude | office | tower-office | harting vertriebsgebäude |  |
| hashima-city-hall-1959-2022 | Hashima City Hall (1959-2022) | government | government | city hall | civic-public:hall-center |
| haus-am-checkpoint-charlie | Haus am Checkpoint Charlie | residential | housing-general | haus |  |
| haus-des-deutschen-metallarbeiterverbandes | Haus des Deutschen Metallarbeiterverbandes | residential | housing-general | haus |  |
| haus-van-middelem-dupont | Haus van Middelem-Dupont | residential | housing-general | haus |  |
| helsinki-university-of-technology-main | Helsinki University of Technology Main Building | educational | school-university | university | office:tower-office |
| hirosaki-city-hall | Hirosaki City Hall | government | government | city hall | civic-public:hall-center |
| hirosaki-civic-hall | Hirosaki Civic Hall | cultural | museum | civic hall | civic-public:hall-center |
| hiroshima-national-peace-memorial-hall | Hiroshima National Peace Memorial Hall for the Atomic Bomb Victims | monument | monument-memorial | memorial | civic-public:hall-center |
| hiroshima-peace-memorial-museum | Hiroshima Peace Memorial Museum | cultural | museum | museum | monument:monument-memorial |
| hirshhorn-museum-and-sculpture-garden | Hirshhorn Museum and Sculpture Garden | cultural | museum | museum | public-space:public-space |
| hochhaus-neue-donau | Hochhaus Neue Donau | office | tower-office | hochhaus |  |
| horizontal-skyscraper-vanke-center | Horizontal Skyscraper – Vanke Center | office | tower-office | center | civic-public:hall-center, office:office-headquarters |
| hotel-marcel | Hotel Marcel | residential | house | hotel marcel | commercial:commercial-retail |
| hyatt-regency-barcelona-tower | Hyatt Regency Barcelona Tower | office | tower-office | tower | office:office-headquarters |
| ibaraki-prefectural-culture-center | Ibaraki Prefectural Culture Center | cultural | museum | culture center | office:tower-office, civic-public:hall-center |
| ibm-studios | IBM Studios | office | tower-office | ibm studios |  |
| ichimura-memorial-gymnasium | Ichimura Memorial Gymnasium | sports | stadium | gymnasium | monument:monument-memorial |
| ilot-des-hautes-formes | Îlot des Hautes-Formes | residential | housing-general | ilot |  |
| international-conference-center-hiroshima | International Conference Center Hiroshima | office | tower-office | center | civic-public:hall-center, civic-public:civic-public |
| international-towers-sydney | International Towers Sydney | office | tower-office | towers |  |
| intiland-tower | Intiland Tower | office | tower-office | tower | office:office-headquarters |
| ishigaki-civic-hall | Ishigaki Civic Hall | cultural | museum | civic hall | civic-public:hall-center |
| jewett-arts-center | Jewett Arts Center | cultural | museum | arts center | office:tower-office, civic-public:hall-center |
| jyvaskyla-workers-club | Jyväskylä Workers' Club | civic-public | hall-center | club |  |
| kagawa-prefectural-government-office | Kagawa Prefectural Government Office | government | government | government | office:office-headquarters |
| kagawa-prefectural-government-office-main | Kagawa Prefectural Government Office Main Building | government | government | government | office:tower-office, office:office-headquarters |
| kanazawa-bunka-hall | Kanazawa Bunka Hall | cultural | hall-cultural | bunka hall | civic-public:hall-center |
| kinokuniya-hall | Kinokuniya Hall | cultural | named-cultural | kinokuniya hall | civic-public:hall-center |
| kirishima-international-concert-hall | Kirishima International Concert Hall | cultural | museum | concert hall | civic-public:hall-center |
| kishi-memorial-gymnasium | Kishi Memorial Gymnasium | sports | stadium | gymnasium | monument:monument-memorial |
| kursaal-convention-centre | Kursaal convention centre | office | tower-office | centre | civic-public:hall-center, civic-public:civic-public |
| kuwait-embassy-building | Kuwait Embassy building | government | government | embassy | office:tower-office |
| kuwait-national-assembly-building | Kuwait National Assembly Building | government | government | assembly | office:tower-office |
| la-felicite | La Félicité | residential | housing-general | felicite |  |
| landhaus-bejach | Landhaus Bejach | residential | housing-general | landhaus |  |
| lange-voorhout-102-the-hague | Lange Voorhout 102, The Hague | residential | housing-general | lange voorhout |  |
| lever-house | Lever House | residential | house | house | office:office-headquarters |
| library-of-the-university-of | Library of the University of Deusto | cultural | museum | library | educational:school-university |
| lippo-centre | Lippo Centre | office | tower-office | centre | civic-public:hall-center |
| lloyds-building | Lloyd's building | office | tower-office | building | office:office-headquarters |
| loceanografic | L'Oceanogràfic | cultural | named-cultural | oceanogràfic | leisure:leisure-named |
| logrono-town-hall | Logroño town hall | government | government | town hall | civic-public:hall-center |
| los-angeles-county-hall-of | Los Angeles County Hall of Records | government | government | county hall | civic-public:hall-center |
| lunuganga-country-estate | Lunuganga Country Estate | residential | housing-general | estate |  |
| lutzowplatz-1 | Lützowplatz 1 | office | tower-office | lutzowplatz |  |
| lvmh-tower | LVMH Tower | office | tower-office | tower | office:office-headquarters |
| madrid-puerta-de-atocha-almudena-grandes | Madrid-Puerta de Atocha-Almudena Grandes | transportation | station-intl | atocha |  |
| makuhari-messe | Makuhari Messe | transportation | station-intl | messe |  |
| mizuho-bank-uchisaiwaicho-head-office | Mizuho Bank Uchisaiwaichō Head Office Building | office | tower-office | head office | office:office-headquarters |
| mlc-centre | MLC Centre | office | tower-office | centre | civic-public:hall-center |
| murray-d-lincoln-campus-center | Murray D. Lincoln Campus Center | educational | school-university | campus | office:tower-office, civic-public:hall-center |
| museum-of-transport-and-communications | Museum of Transport and Communications | cultural | museum | museum | transportation:airport-station |
| nagano-city-arts-center | Nagano City Arts Center | cultural | museum | arts center | office:tower-office, civic-public:hall-center |
| nara-kintetsu-building | Nara Kintetsu Building | office | tower-office | building |  |
| neutra-office-building | Neutra Office Building | office | tower-office | building | office:office-headquarters |
| neutra-vdl-studio-and-residences | Neutra VDL Studio and Residences | residential | housing-general | neutra vdl |  |
| new-orleans | New Orleans | residential | housing-general | new orleans |  |
| new-york-public-library-for | New York Public Library for the Performing Arts | cultural | museum | library | civic-public:civic-public |
| niagara-falls-public-library | Niagara Falls Public Library | cultural | museum | library | civic-public:civic-public |
| nippon-gaishi-hall | Nippon Gaishi Hall | civic-public | hall-center | hall |  |
| nittele-tower | Nittele Tower | office | tower-office | tower | office:office-headquarters |
| nuestra-senora-del-libano-montevideo | Nuestra Señora del Líbano, Montevideo | religious | religious-intl | nuestra señora |  |
| okayama-prefectural-government-building | Okayama Prefectural Government Building | government | government | government | office:tower-office |
| okayama-symphony-hall | Okayama Symphony Hall | cultural | hall-cultural | symphony hall | civic-public:hall-center |
| olivetti-exhibition-centre-in-venice | Olivetti Exhibition centre in Venice, Italy | office | tower-office | centre | civic-public:hall-center, temporary:pavilion |
| one-raffles-place | One Raffles Place | office | tower-office | one raffles place |  |
| one57 | One57 | office | tower-office | one57 |  |
| orange-county-government-center | Orange County Government Center | government | government | government | office:tower-office, civic-public:hall-center |
| otaniemi-water-tower | Otaniemi water tower | office | tower-office | tower | office:office-headquarters, infrastructure:infrastructure |
| pa-technology-cambridge-laboratory-pats-center | PA Technology Cambridge Laboratory (PATS-Center) | research-institute | research | laboratory | office:tower-office, civic-public:hall-center |
| painted-desert-community-complex-historic | Painted Desert Community Complex Historic District | civic-public | hall-center | community |  |
| palace-of-villahermosa | Palace of Villahermosa | civic-public | hall-center | palace |  |
| palacio-de-congresos-de-toledo | Palacio de Congresos de Toledo | civic-public | hall-center | palacio |  |
| palacio-de-los-deportes | Palacio de los Deportes | sports | stadium-intl | palacio de los deportes | civic-public:hall-center |
| palacio-pascual-de-riquelme | Palacio Pascual de Riquelme | civic-public | hall-center | palacio |  |
| palazzo-abatellis | Palazzo Abatellis | civic-public | hall-center | palazzo |  |
| palazzo-bocconi | Palazzo Bocconi | civic-public | hall-center | palazzo |  |
| palazzo-brusarosco | Palazzo Brusarosco | civic-public | hall-center | palazzo |  |
| palazzo-donnaregina | Palazzo Donnaregina | civic-public | hall-center | palazzo |  |
| palazzo-terragni | Palazzo Terragni | civic-public | hall-center | palazzo |  |
| paleis-of-justice-in-antwerp | Paleis of Justice in Antwerp | government | government | justice | civic-public:hall-center |
| paraninfo-de-la-universidad-del | Paraninfo de la Universidad del País Vasco | civic-public | hall-center | paraninfo |  |
| parc-de-la-villette | parc de la Villette | public-space | park-intl | parc |  |
| parc1 | Parc1 | office | tower-office | parc1 |  |
| parque-revolucion | Parque Revolución | public-space | park-intl | parque |  |
| parroquia-maronita-de-nuestra-senora | Parroquia Maronita de Nuestra Señora del Líbano | religious | religious-intl | parroquia |  |
| pavilhao-de-portugal | Pavilhão de Portugal | public-space | park-intl | pavilhão de portugal |  |
| pearlman-mountain-cabin | Pearlman Mountain Cabin | residential | housing-general | cabin |  |
| pickering-operations-complex | Pickering Operations Complex | civic-public | hall-center | complex |  |
| plaza-de-toros-de-pamplona | Plaza de Toros de Pamplona | public-space | public-space | plaza |  |
| presidential-palace-damascus | Presidential Palace, Damascus | government | government | presidential palace | civic-public:hall-center |
| private-bridge-of-palazzo-querini | Private bridge of Palazzo Querini Stampalia | civic-public | hall-center | palazzo | infrastructure:infrastructure |
| qv-1 | QV.1 | office | tower-office | qv.1 |  |
| r-dovre-town-hall | Rødovre Town Hall | government | government | town hall | civic-public:hall-center |
| radisson-collection-royal-hotel | Radisson Collection Royal Hotel | cultural | art-museum | collection | commercial:commercial-retail |
| ransila-i-building | Ransila I building | office | tower-office | building |  |
| rena-lange-headquarters | Rena Lange Headquarters | office | office-headquarters | headquarters |  |
| renmin-building | Renmin Building | office | tower-office | building |  |
| reynolds-metals-company-international-headquarters | Reynolds Metals Company International Headquarters | office | office-headquarters | company |  |
| riparian-plaza | Riparian Plaza | public-space | public-space | plaza |  |
| riverside-centre-brisbane | Riverside Centre, Brisbane | office | tower-office | centre | civic-public:hall-center |
| robert-c-weaver-federal-building | Robert C. Weaver Federal Building | government | government | federal building | office:tower-office |
| rovaniemi-town-hall | Rovaniemi Town Hall | government | government | town hall | civic-public:hall-center |
| rudersdal-town-hall | Rudersdal Town Hall | government | government | town hall | civic-public:hall-center |
| saitama-hall | Saitama Hall | civic-public | hall-center | hall |  |
| san-francisco-museum-of-modern | San Francisco Museum of Modern Art | religious | cathedral | san | cultural:art-museum, cultural:museum |
| sanderling-beach-club | Sanderling Beach Club | civic-public | hall-center | club |  |
| sao-paulo-museum-of-art | São Paulo Museum of Art building | cultural | art-museum | museum of art | cultural:museum, office:tower-office |
| serpentine-gallery-pavilion-2005 | Serpentine Gallery Pavilion 2005 | cultural | art-museum | gallery | temporary:pavilion |
| serpentine-gallery-pavilion-2017 | Serpentine Gallery Pavilion 2017 | cultural | art-museum | gallery | temporary:pavilion |
| shangyin-opera-house | Shangyin Opera House | cultural | museum | opera house | residential:house |
| shinjuku-park-tower | Shinjuku Park Tower | office | tower-office | tower | office:office-headquarters, public-space:public-space |
| shizuoka-press-and-broadcasting-center | Shizuoka Press and Broadcasting Center | office | tower-office | center | civic-public:hall-center |
| silk-center | Silk Center | office | tower-office | center | civic-public:hall-center |
| simmons-hall | Simmons Hall | civic-public | hall-center | hall |  |

## Needs Manual Confirmation

| Building | Name | Year | Reason |
|---|---|---|---|
|  | 耶稣堂 (圣塞瓦斯蒂安) | 2011 | no reliable title/description/tag pattern |
| aaltoalvari | AaltoAlvari | 1955 | no reliable title/description/tag pattern |
| alvar-aalto-aerola-1953 | Alvar Aalto - Aerola 1953 |  | no reliable title/description/tag pattern |
| columbushaus | Columbushaus | 1932 | no reliable title/description/tag pattern |
| danteum | Danteum |  | no reliable title/description/tag pattern |
| de-citadel | De Citadel | 2006 | no reliable title/description/tag pattern |
| dorre-barriak | Dorre Barriak |  | no reliable title/description/tag pattern |
| fiore-di-botta | Fiore di Botta |  | no reliable title/description/tag pattern |
| interbau | Interbau |  | no reliable title/description/tag pattern |
| la-fortezza | La Fortezza | 1989 | no reliable title/description/tag pattern |
| linked-hybrid | Linked Hybrid | 2009 | no reliable title/description/tag pattern |
| louise-catherine | Louise-Catherine |  | no reliable title/description/tag pattern |
| lozzi | Lozzi | 1954 | no reliable title/description/tag pattern |
| lyhty | Lyhty | 1954 | no reliable title/description/tag pattern |
| nhk-fujimigaoka-clubhouse | NHK Fujimigaoka Clubhouse | 1954 | no reliable title/description/tag pattern |
| q115688741 | Q115688741 |  | no reliable title/description/tag pattern |
| q115728606 | Q115728606 |  | no reliable title/description/tag pattern |
| q115729435 | Q115729435 |  | no reliable title/description/tag pattern |
| q115729496 | Q115729496 |  | no reliable title/description/tag pattern |
| q115729511 | Q115729511 |  | no reliable title/description/tag pattern |
| q115729853 | Q115729853 |  | no reliable title/description/tag pattern |
| q115729861 | Q115729861 |  | no reliable title/description/tag pattern |
| q116138909 | Q116138909 |  | no reliable title/description/tag pattern |
| q116481414 | Q116481414 | 1984 | no reliable title/description/tag pattern |
| q116771232 | Q116771232 |  | no reliable title/description/tag pattern |
| q117081639 | Q117081639 |  | no reliable title/description/tag pattern |
| q117081642 | Q117081642 |  | no reliable title/description/tag pattern |
| q117255504 | Q117255504 |  | no reliable title/description/tag pattern |
| q11814621 | Q11814621 |  | no reliable title/description/tag pattern |
| q118287826 | Q118287826 |  | no reliable title/description/tag pattern |
| q118287915 | Q118287915 |  | no reliable title/description/tag pattern |
| q118287920 | Q118287920 |  | no reliable title/description/tag pattern |
| q118287922 | Q118287922 |  | no reliable title/description/tag pattern |
| q118539028 | Q118539028 | 2018 | no reliable title/description/tag pattern |
| q118611433 | Q118611433 |  | no reliable title/description/tag pattern |
| q118611436 | Q118611436 |  | no reliable title/description/tag pattern |
| q118611444 | Q118611444 |  | no reliable title/description/tag pattern |
| q118664057 | Q118664057 |  | no reliable title/description/tag pattern |
| q118665760 | Q118665760 |  | no reliable title/description/tag pattern |
| q118667334 | Q118667334 |  | no reliable title/description/tag pattern |
| q118668613 | Q118668613 |  | no reliable title/description/tag pattern |
| q118669289 | Q118669289 |  | no reliable title/description/tag pattern |
| q118708649 | Q118708649 |  | no reliable title/description/tag pattern |
| q118708684 | Q118708684 |  | no reliable title/description/tag pattern |
| q118712927 | Q118712927 |  | no reliable title/description/tag pattern |
| q118713222 | Q118713222 |  | no reliable title/description/tag pattern |
| q118713740 | Q118713740 |  | no reliable title/description/tag pattern |
| q118715993 | Q118715993 |  | no reliable title/description/tag pattern |
| q118720022 | Q118720022 |  | no reliable title/description/tag pattern |
| q118905462 | Q118905462 |  | no reliable title/description/tag pattern |
| q118945918 | Q118945918 |  | no reliable title/description/tag pattern |
| q118946915 | Q118946915 |  | no reliable title/description/tag pattern |
| q118946928 | Q118946928 |  | no reliable title/description/tag pattern |
| q118946937 | Q118946937 |  | no reliable title/description/tag pattern |
| q118947199 | Q118947199 |  | no reliable title/description/tag pattern |
| q118947481 | Q118947481 |  | no reliable title/description/tag pattern |
| q118947517 | Q118947517 |  | no reliable title/description/tag pattern |
| q118948600 | Q118948600 |  | no reliable title/description/tag pattern |
| q118953146 | Q118953146 |  | no reliable title/description/tag pattern |
| q118965498 | Q118965498 |  | no reliable title/description/tag pattern |
| q118968533 | Q118968533 |  | no reliable title/description/tag pattern |
| q118968795 | Q118968795 |  | no reliable title/description/tag pattern |
| q118970462 | Q118970462 |  | no reliable title/description/tag pattern |
| q119719715 | Q119719715 |  | no reliable title/description/tag pattern |
| q119719767 | Q119719767 |  | no reliable title/description/tag pattern |
| q120109558 | Q120109558 |  | no reliable title/description/tag pattern |
| q120109739 | Q120109739 |  | no reliable title/description/tag pattern |
| q120491047 | Q120491047 |  | no reliable title/description/tag pattern |
| q120716510 | Q120716510 |  | no reliable title/description/tag pattern |
| q120742346 | Q120742346 |  | no reliable title/description/tag pattern |
| q121054636 | Q121054636 |  | no reliable title/description/tag pattern |
| q121055430 | Q121055430 |  | no reliable title/description/tag pattern |
| q121056036 | Q121056036 |  | no reliable title/description/tag pattern |
| q121463077 | Q121463077 |  | no reliable title/description/tag pattern |
| q121463107 | Q121463107 |  | no reliable title/description/tag pattern |
| q122828995 | Q122828995 |  | no reliable title/description/tag pattern |
| q122871954 | Q122871954 |  | no reliable title/description/tag pattern |
| q123135351 | Q123135351 |  | no reliable title/description/tag pattern |
| q123135365 | Q123135365 |  | no reliable title/description/tag pattern |
| q123418941 | Q123418941 |  | no reliable title/description/tag pattern |
| q123419221 | Q123419221 |  | no reliable title/description/tag pattern |
| q123419222 | Q123419222 |  | no reliable title/description/tag pattern |
| q123419260 | Q123419260 |  | no reliable title/description/tag pattern |
| q123419315 | Q123419315 |  | no reliable title/description/tag pattern |
| q123419408 | Q123419408 |  | no reliable title/description/tag pattern |
| q123419414 | Q123419414 |  | no reliable title/description/tag pattern |
| q123421340 | Q123421340 |  | no reliable title/description/tag pattern |
| q123434353 | Q123434353 |  | no reliable title/description/tag pattern |
| q123436303 | Q123436303 |  | no reliable title/description/tag pattern |
| q123455689 | Q123455689 |  | no reliable title/description/tag pattern |
| q123455694 | Q123455694 |  | no reliable title/description/tag pattern |
| q123455747 | Q123455747 |  | no reliable title/description/tag pattern |
| q123455758 | Q123455758 |  | no reliable title/description/tag pattern |
| q123455828 | Q123455828 |  | no reliable title/description/tag pattern |
| q123517303 | Q123517303 | 2008 | no reliable title/description/tag pattern |
| q124556059 | Q124556059 |  | no reliable title/description/tag pattern |
| q124744868 | Q124744868 |  | no reliable title/description/tag pattern |
| q124744900 | Q124744900 |  | no reliable title/description/tag pattern |
| q124858735 | Q124858735 |  | no reliable title/description/tag pattern |
| q125054375 | Q125054375 |  | no reliable title/description/tag pattern |
| q125398396 | Q125398396 |  | no reliable title/description/tag pattern |
| q125407914 | Q125407914 |  | no reliable title/description/tag pattern |
| q125408225 | Q125408225 |  | no reliable title/description/tag pattern |
| q125408690 | Q125408690 |  | no reliable title/description/tag pattern |
| q125408772 | Q125408772 |  | no reliable title/description/tag pattern |
| q125408801 | Q125408801 |  | no reliable title/description/tag pattern |
| q125679066 | Q125679066 | 2005 | no reliable title/description/tag pattern |
| q125679108 | Q125679108 | 1999 | no reliable title/description/tag pattern |
| q125679109 | Q125679109 | 1985 | no reliable title/description/tag pattern |
| q125679110 | Q125679110 | 1985 | no reliable title/description/tag pattern |
| q125679182 | Q125679182 | 2000 | no reliable title/description/tag pattern |
| q125679342 | Q125679342 | 1998 | no reliable title/description/tag pattern |
| q125966353 | Q125966353 |  | no reliable title/description/tag pattern |
| q125966383 | Q125966383 |  | no reliable title/description/tag pattern |
| q126393128 | Q126393128 |  | no reliable title/description/tag pattern |
| q127603672 | Q127603672 |  | no reliable title/description/tag pattern |
| q127603813 | Q127603813 |  | no reliable title/description/tag pattern |
| q130356897 | Q130356897 |  | no reliable title/description/tag pattern |
| q131197083 | Q131197083 |  | no reliable title/description/tag pattern |
| q134570599 | Q134570599 |  | no reliable title/description/tag pattern |
| q134893563 | Q134893563 | 2004 | no reliable title/description/tag pattern |
| q135529199 | Q135529199 |  | no reliable title/description/tag pattern |
| q135641257 | Q135641257 |  | no reliable title/description/tag pattern |
| q136332206 | Q136332206 |  | no reliable title/description/tag pattern |
| q136394553 | Q136394553 | 2001 | no reliable title/description/tag pattern |
| q17347122 | Q17347122 |  | no reliable title/description/tag pattern |
| q17369491 | Q17369491 | 1958 | no reliable title/description/tag pattern |
| q25461513 | Q25461513 |  | no reliable title/description/tag pattern |
| q3149040 | Q3149040 |  | no reliable title/description/tag pattern |
| q3412221 | Q3412221 | 2007 | no reliable title/description/tag pattern |
| q3661058 | Q3661058 |  | no reliable title/description/tag pattern |
| q5761063 | Q5761063 |  | no reliable title/description/tag pattern |
| q5818111 | Q5818111 |  | no reliable title/description/tag pattern |
| q679969 | Q679969 |  | no reliable title/description/tag pattern |
| q8341610 | Q8341610 |  | no reliable title/description/tag pattern |
| quinta-da-conceicao | Quinta da Conceição |  | no reliable title/description/tag pattern |
| ristinkirkko | Ristinkirkko | 1978 | no reliable title/description/tag pattern |
| sahkotalo | Sähkötalo | 1972 | no reliable title/description/tag pattern |
| stephanuskirche-wolfsburg | Stephanuskirche (Wolfsburg) | 1968 | no reliable title/description/tag pattern |
| sunila | Sunila |  | no reliable title/description/tag pattern |
| tehtaanmaki | Tehtaanmäki | 1937 | no reliable title/description/tag pattern |
| tepia | TEPIA |  | no reliable title/description/tag pattern |
| the-marnix | The Marnix | 1962 | no reliable title/description/tag pattern |
| untitled | Untitled | 1996 | no reliable title/description/tag pattern |
