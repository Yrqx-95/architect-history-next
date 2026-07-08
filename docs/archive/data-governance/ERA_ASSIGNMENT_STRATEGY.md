# Era Assignment Strategy

Generated: 2026-06-08T11:38:16.429Z

## Current State

- Missing `era_slug`: 875
- High-confidence style-based candidates: 32
- Medium-confidence year/style candidates: 500
- Manual / insufficient data: 343

## Era Taxonomy Proposal

Use the existing `eras` table as the canonical target set for Sprint 01:

- `classical-era`
- `medieval`
- `renaissance`
- `baroque`
- `neoclassical`
- `industrial-revolution`
- `art-nouveau`
- `early-modern`
- `modern`
- `post-war`
- `postmodern`
- `contemporary`

Do not create new eras in this sprint.

## Strategy

1. Style-first mapping for historically specific styles:
   - `classical` -> `classical-era`
   - `renaissance`, `palladian`, `mannerism` -> `renaissance`
   - `baroque`, `english-baroque` -> `baroque`
   - `art-nouveau`, `catalan-modernisme` -> `art-nouveau`
   - `postmodern` -> `postmodern`
2. Year range mapping only after style-specific rules.
3. Manual exception list for ancient/historic works, completion-year ambiguity, long construction phases, restoration/reuse projects, and architect-death anomalies.
4. Dry-run report before writing.

## High-Confidence Distribution

| era_slug | Count |
|---|---|
| renaissance | 13 |
| baroque | 7 |
| art-nouveau | 6 |
| classical-era | 5 |
| postmodern | 1 |

## High-Confidence Examples

| Building | Name | Year | Candidate | Reason |
|---|---|---|---|---|
| basilica-fano | Basilica at Fano | -27 | classical-era | style classical |
| basilica-palladiana | Basilica Palladiana | 1549 | renaissance | renaissance/palladian/mannerism style |
| carson-pirie-scott | Carson Pirie Scott Building | 1904 | art-nouveau | art nouveau/catalan modernisme style |
| casa-batllo | Casa Batlló | 1906 | art-nouveau | art nouveau/catalan modernisme style |
| casa-mila | Casa Milà (La Pedrera) | 1912 | art-nouveau | art nouveau/catalan modernisme style |
| florence-cathedral-dome | Florence Cathedral Dome | 1436 | renaissance | renaissance/palladian/mannerism style |
| greenwich-hospital | Greenwich Hospital | 1696 | baroque | baroque style |
| hampton-court | Hampton Court Palace | 1694 | classical-era | style classical |
| hiroshima-city-museum | Hiroshima City Museum | 1989 | postmodern | postmodern style |
| laurentian-library | Laurentian Library | 1571 | renaissance | renaissance/palladian/mannerism style |
| oratorio-dei-filippini | Oratorio dei Filippini | 1640 | baroque | baroque style |
| ospedale-innocenti | Ospedale degli Innocenti | 1445 | renaissance | renaissance/palladian/mannerism style |
| palau-guell | Palau Güell | 1890 | art-nouveau | art nouveau/catalan modernisme style |
| palazzo-barberini | Palazzo Barberini | 1633 | baroque | baroque style |
| palazzo-rucellai | Palazzo Rucellai | 1451 | renaissance | renaissance/palladian/mannerism style |
| park-guell | Park Güell | 1914 | art-nouveau | art nouveau/catalan modernisme style |
| pazzi-chapel | Pazzi Chapel | 1461 | renaissance | renaissance/palladian/mannerism style |
| piazza-del-campidoglio | Piazza del Campidoglio | 1564 | renaissance | renaissance/palladian/mannerism style |
| sagrada-familia | Sagrada Familia | 1882 | art-nouveau | art nouveau/catalan modernisme style |
| san-carlo-alle-quattro-fontane | San Carlo alle Quattro Fontane | 1646 | baroque | baroque style |
| san-giorgio-maggiore | San Giorgio Maggiore | 1580 | renaissance | renaissance/palladian/mannerism style |
| sant-andrea-al-quirinale | Sant'Andrea al Quirinale | 1670 | baroque | baroque style |
| sant-andrea-mantua | Basilica of Sant'Andrea | 1472 | renaissance | renaissance/palladian/mannerism style |
| sant-ivo-alla-sapienza | Sant'Ivo alla Sapienza | 1660 | baroque | baroque style |
| santa-maria-novella | Santa Maria Novella Facade | 1470 | renaissance | renaissance/palladian/mannerism style |
| sheldonian-theatre | Sheldonian Theatre | 1669 | classical-era | style classical |
| st-pauls-cathedral | St. Paul's Cathedral | 1710 | classical-era | style classical |
| st-peters-dome | St. Peter's Basilica Dome | 1590 | renaissance | renaissance/palladian/mannerism style |
| st-peters-square | St. Peter's Square | 1667 | baroque | baroque style |
| teatro-olimpico | Teatro Olimpico | 1585 | renaissance | renaissance/palladian/mannerism style |
| todaiji-temple | Todai-ji Temple | 752 | classical-era | style classical |
| villa-rotonda | Villa Rotonda | 1570 | renaissance | renaissance/palladian/mannerism style |

## Medium-Confidence Examples

| Building | Name | Year | Candidate | Reason |
|---|---|---|---|---|
|  | 耶稣堂 (圣塞瓦斯蒂安) | 2011 | contemporary | year range |
| 1-cobham-mews-studios | 1 Cobham Mews Studios | 1987 | postmodern | year range; contemporary exceptions possible |
| 122-leadenhall-street | 122 Leadenhall Street | 2014 | contemporary | year range |
| 190-192-sloane-street | 190–192 Sloane Street | 1965 | post-war | year range |
| 3-world-trade-center | 3 World Trade Center | 2018 | contemporary | year range |
| 8-house | 8 House | 2010 | contemporary | year range |
| 88-wood-street | 88 Wood Street | 1998 | postmodern | year range; contemporary exceptions possible |
| 945-madison-avenue | 945 Madison Avenue | 1966 | post-war | year range |
| aalto-hochhaus | Aalto-Hochhaus | 1962 | post-war | year range |
| aaltoalvari | AaltoAlvari | 1955 | post-war | year range |
| aarhus-city-hall | Aarhus City Hall | 1941 | modern | year range before post-war |
| abele-residence | Abele Residence | 1943 | modern | year range before post-war |
| acropolis-museum | Acropolis Museum | 2009 | contemporary | year range |
| aga-khan-museum | Aga Khan Museum | 2014 | contemporary | year range |
| alfred-lerner-hall | Alfred Lerner Hall | 1999 | postmodern | year range; contemporary exceptions possible |
| alvar-aalto-museum-jyvaskyla | Alvar Aalto Museum Jyväskylä | 1973 | post-war | year range |
| americas-cup-building | America's Cup Building | 2006 | contemporary | year range |
| amorepacific-headquarters | Amorepacific Headquarters | 2017 | contemporary | year range |
| apa-hotel-resort-tokyo-bay | APA Hotel & Resort Tokyo Bay Makuhari | 1993 | postmodern | year range; contemporary exceptions possible |
| apple-park | Apple Park | 2017 | contemporary | year range |
| arenas-de-barcelona | Arenas de Barcelona | 2011 | contemporary | year range |
| arne-jacobsen-bau-in-mainz-hartenberg-munchfeld | Arne-Jacobsen-Bau in Mainz-Hartenberg/Münchfeld | 1969 | post-war | year range |
| arne-jacobsen-s-own-house | Arne Jacobsen’s own house in Charlottenlund | 1931 | modern | year range before post-war |
| asakusa-culture-center | Asakusa Culture and Tourism Center | 2012 | contemporary | year range |
| ashford-designer-outlet | Ashford Designer Outlet | 2000 | contemporary | year range |
| asian-arts-museum | Asian Arts Museum | 1998 | postmodern | year range; contemporary exceptions possible |
| asilo-santelia | Asilo Sant'Elia | 1934 | modern | year range before post-war |
| aspen-art-museum | Aspen Art Museum | 2014 | contemporary | year range |
| assumption-of-mary-cathedral-hiroshima | Assumption of Mary Cathedral, Hiroshima | 1950 | post-war | year range |
| atelier-museu-julio-pomar | Atelier-Museu Júlio Pomar | 2013 | contemporary | year range |
| atlanta-fulton-county-central-library | Atlanta Fulton County Central Library | 1980 | postmodern | year range; contemporary exceptions possible |
| auditorium-building | Auditorium Building | 1889 | industrial-revolution | year range; style may vary |
| bagsv-rd-church | Bagsværd Church | 1976 | post-war | year range |
| bank-leumi-building-jerusalem | Bank Leumi Building, Jerusalem | 1937 | modern | year range before post-war |
| bank-melli-iran-university-of | Bank Melli Iran (University of Tehran Branch) | 1959 | post-war | year range |
| bank-of-china-tower | Bank of China Tower | 1990 | postmodern | year range; contemporary exceptions possible |
| bank-of-shanghai-headquarters | Bank of Shanghai Headquarters | 2005 | contemporary | year range |
| bank-of-spain-headquarters | Bank of Spain headquarters | 1891 | industrial-revolution | year range; style may vary |
| bankinter-building | Bankinter building | 1977 | post-war | year range |
| barcelona-pavilion | Barcelona Pavilion | 1929 | early-modern | year range; style/style_slug review needed |
| bauhaus-dessau | Bauhaus Dessau | 1926 | early-modern | year range; style/style_slug review needed |
| beijing-daxing-airport | Beijing Daxing International Airport | 2019 | contemporary | year range |
| beijing-national-stadium | Beijing National Stadium | 2008 | contemporary | year range |
| beinecke-rare-book-manuscript-library | Beinecke Rare Book & Manuscript Library | 1963 | post-war | year range |
| bellavista-housing-estate | Bellavista housing estate | 1934 | modern | year range before post-war |
| bellevue-arts-museum | Bellevue Arts Museum | 2001 | contemporary | year range |
| bellevue-teatret | Bellevue Teatret | 1936 | modern | year range before post-war |
| bianchi-house | Bianchi House | 1973 | post-war | year range |
| biblioteca-comunale-centrale-antonio-tiraboschi | Biblioteca comunale centrale Antonio Tiraboschi | 1975 | post-war | year range |
| big-roof | Big Roof | 1970 | post-war | year range |
| blue-condominium | Blue Condominium | 2007 | contemporary | year range |
| bodmer-foundation | Bodmer Foundation | 1998 | postmodern | year range; contemporary exceptions possible |
| bordeaux-courthouse | Bordeaux Courthouse | 1998 | postmodern | year range; contemporary exceptions possible |
| brasilia-cathedral | Cathedral of Brasília | 1970 | post-war | year range |
| brion-tomb | Brion tomb | 1978 | post-war | year range |
| bruder-klaus-chapel | Bruder Klaus Field Chapel | 2007 | contemporary | year range |
| burroughs-wellcome-company-corporate-headquarters | Burroughs Wellcome Company Corporate Headquarters | 1969 | post-war | year range |
| campbell-sports-center | Campbell Sports Center | 2012 | contemporary | year range |
| campus-palmas-altas-sevilla | Campus Palmas Altas (Sevilla) | 2007 | contemporary | year range |
| can-lis | Can Lis | 1971 | post-war | year range |
| cardboard-cathedral | Cardboard Cathedral | 2013 | contemporary | year range |
| carlton-hotel | Carlton Hotel | 1972 | post-war | year range |
| casa-da-musica | Casa da Música | 2005 | contemporary | year range |
| casa-de-cha-da-boa | Casa de Chá da Boa Nova | 1958 | post-war | year range |
| casa-do-chame-chame | Casa do Chame-Chame | 1964 | post-war | year range |
| casa-ottolenghi | Casa Ottolenghi | 1974 | post-war | year range |
| cathedral-of-our-lady-of | Cathedral of Our Lady of the Angels | 2002 | contemporary | year range |
| cctv-headquarters | CCTV Headquarters | 2012 | contemporary | year range |
| cenotaph-for-the-a-bomb-victims | Cenotaph for the A-Bomb Victims | 1952 | post-war | year range |
| center-of-innovation-anacleto-angelini | Center of Innovation Anacleto Angelini | 2014 | contemporary | year range |
| central-library-des-moines | Central Library, Des Moines | 2012 | contemporary | year range |
| centre-georges-pompidou | Centre Georges Pompidou | 1977 | post-war | year range |
| centre-pompidou | Centre Pompidou | 1977 | post-war | year range |
| centro-commerciale-le-torri | Centro commerciale Le Torri | 1992 | postmodern | year range; contemporary exceptions possible |
| ceremonial-palace-of-georgia | Ceremonial Palace of Georgia | 2009 | contemporary | year range |
| chandigarh | Chandigarh Capitol Complex | 1953 | post-war | year range |
| chapel-of-notre-dame-du-haut | Chapel of Notre Dame du Haut | 1955 | post-war | year range |
| chapelle-cumenique-de-flaine | chapelle œcuménique de Flaine | 1973 | post-war | year range |
| chiesa-del-santo-volto | Chiesa del Santo Volto | 2004 | contemporary | year range |
| chiesa-di-nostra-signora-del | Chiesa di Nostra Signora del Cadore | 1961 | post-war | year range |
| church-of-cristo-obrero-y | Church of Cristo Obrero y Nuestra Señora de Lourdes | 1960 | post-war | year range |
| church-of-light | Church of the Light | 1989 | postmodern | year range; contemporary exceptions possible |
| church-of-nuestra-senora-de | church of Nuestra Señora de Guadalupe | 1967 | post-war | year range |
| church-of-the-three-crosses | Church of the Three Crosses | 1957 | post-war | year range |
| chusanren-building-main-building | Chusanren Building main building | 1963 | post-war | year range |
| cidade-das-artes-bibi-ferreira | Cidade das Artes Bibi Ferreira | 2012 | contemporary | year range |
| cite-de-locean-et-du | Cité de l'Océan et du Surf | 2011 | contemporary | year range |
| ciutat-de-la-justicia-de | Ciutat de la Justícia de Barcelona i l'Hospitalet de Llobregat | 2002 | contemporary | year range |
| clark-house | Clark House | 1957 | post-war | year range |
| cleveland-museum-of-art | Cleveland Museum of Art | 1913 | early-modern | year range; style/style_slug review needed |
| cleveland-museum-of-art-building | Cleveland Museum of Art building | 1913 | early-modern | year range; style/style_slug review needed |
| coaty-restaurante | Coaty Restaurante | 1990 | postmodern | year range; contemporary exceptions possible |
| cohen-house | Cohen House | 1936 | modern | year range before post-war |
| coleccion-jumex | Colección Jumex | 2013 | contemporary | year range |
| coliseu-de-viana-do-castelo | Coliseu de Viana do Castelo | 2013 | contemporary | year range |
| college-of-education-staff-dormitory | College of Education staff dormitory | 1954 | post-war | year range |
| college-of-education-training-school | College of Education training school | 1954 | post-war | year range |
| columbushaus | Columbushaus | 1932 | modern | year range before post-war |
| conference-center-unesco | Conference Center UNESCO | 1958 | post-war | year range |
| constance-perkins-house | Constance Perkins House | 1955 | post-war | year range |
| copan-building | Copan Building | 1966 | post-war | year range |
| copenhill | CopenHill | 2019 | contemporary | year range |
| cuadra-san-cristobal | Cuadra San Cristobal | 1968 | post-war | year range |
| cyclorama-building | Cyclorama Building | 1962 | post-war | year range |
| cymbalista-synagogue-and-jewish-heritage | Cymbalista Synagogue and Jewish Heritage Center | 1998 | postmodern | year range; contemporary exceptions possible |
| daeyang-gallery-and-house | Daeyang Gallery and House | 2012 | contemporary | year range |
| dancing-house | Dancing House | 1996 | postmodern | year range; contemporary exceptions possible |
| danish-national-bank | Danish National Bank | 1978 | post-war | year range |
| dar-al-islam | Dar al-Islam | 1979 | post-war | year range |
| de-bijenkorf | De Bijenkorf | 1953 | post-war | year range |
| de-citadel | De Citadel | 2006 | contemporary | year range |
| de-la-warr-pavilion | De La Warr Pavilion | 1935 | modern | year range before post-war |
| discovery-primea | Discovery Primea | 2013 | contemporary | year range |
| dome-over-manhattan | Dome over Manhattan | 1960 | post-war | year range |
| dongdaemun-design-plaza | Dongdaemun Design Plaza | 2014 | contemporary | year range |
| dortmund-city-and-state-library | Dortmund City and State Library | 1999 | postmodern | year range; contemporary exceptions possible |
| dulles-airport | Dulles Airport Terminal | 1962 | post-war | year range |
| east-building-national-gallery | East Building, National Gallery | 1978 | post-war | year range |
| edificio-urumea | Edificio Urumea | 1973 | post-war | year range |
| einstein-tower | Einstein Tower | 1920 | early-modern | year range; style/style_slug review needed |
| elrod-house | Elrod House | 1968 | post-war | year range |
| esbjerg-performing-arts-centre | Esbjerg Performing Arts Centre | 1997 | postmodern | year range; contemporary exceptions possible |
| estadio-municipal-de-braga | Estádio Municipal de Braga | 2003 | contemporary | year range |
| european-court-of-human-rights | European Court of Human Rights building | 1994 | postmodern | year range; contemporary exceptions possible |
| evry-cathedral | Évry Cathedral | 1992 | postmodern | year range; contemporary exceptions possible |
| extension-of-museo-del-prado | Extension of Museo del Prado | 2007 | contemporary | year range |
| fagus-factory | Fagus Factory | 1911 | early-modern | year range; style/style_slug review needed |
| fallingwater | Fallingwater | 1939 | modern | year range before post-war |
| farnsworth-house | Farnsworth House | 1951 | post-war | year range |
| fcg-building | FCG Building | 1996 | postmodern | year range; contemporary exceptions possible |
| ferry-house | Ferry House | 1951 | post-war | year range |
| finlandia-hall | Finlandia Hall | 1971 | post-war | year range |
| finnish-pavilion | Finnish pavilion | 1956 | post-war | year range |
| flame-of-peace | Flame of Peace | 1964 | post-war | year range |
| fondazione-querini-stampalia | Fondazione Querini Stampalia | 1869 | industrial-revolution | year range; style may vary |
| footbridge-of-the-science-museum | Footbridge of the Science Museum (Valladolid) | 2004 | contemporary | year range |
| former-tokyo-metropolitan-government-building | Former Tokyo Metropolitan Government Building | 1957 | post-war | year range |
| forum-castrop-rauxel | Forum Castrop-Rauxel | 1966 | post-war | year range |
| foundation-e-g-buhrle-collection | Foundation E.G. Bührle Collection | 1960 | post-war | year range |
| francisco-q-sanchez-elementary-school | Francisco Q. Sanchez Elementary School | 1953 | post-war | year range |
| fredensborg-houses | Fredensborg Houses | 1963 | post-war | year range |
| french-embassy-building | French Embassy building | 2002 | contemporary | year range |
| friedhof-der-synagogengemeinde-konigsberg | Friedhof der Synagogengemeinde (Königsberg) | 1927 | early-modern | year range; style/style_slug review needed |
| fukuoka-art-museum | Fukuoka Art Museum | 1979 | post-war | year range |
| garcia-house | Garcia House | 1962 | post-war | year range |
| gateway-arch | Gateway Arch | 1965 | post-war | year range |
| gckeyaki-terrace | GC Keyaki Terrace | 2015 | contemporary | year range |
| gilbey-house | Gilbey House | 1937 | modern | year range before post-war |
| gipsoteca-canoviana | Gipsoteca canoviana | 1832 | neoclassical | year range; style may vary |
| glass-house | Glass House | 1951 | post-war | year range |
| grand-prince-hotel-akasaka | Grand Prince Hotel Akasaka | 1955 | post-war | year range |
| groninger-museum-building | Groninger Museum Building | 1986 | postmodern | year range; contemporary exceptions possible |
| gropius-house | Gropius House | 1938 | modern | year range before post-war |
| guangzhou-opera-house | Guangzhou Opera House | 2010 | contemporary | year range |
| guggenheim | Guggenheim Museum | 1959 | post-war | year range |
| guggenheim-bilbao | Guggenheim Museum Bilbao | 1997 | postmodern | year range; contemporary exceptions possible |
| guggenheim-nyc | Guggenheim Museum NYC | 1959 | post-war | year range |
| hadassah-university-hospital-mt-scopus | Hadassah University Hospital, Mt. Scopus | 1938 | modern | year range before post-war |
| hamburg-elbphilharmonie | Elbphilharmonie Hamburg | 2017 | contemporary | year range |
| hashima-city-hall-1959-2022 | Hashima City Hall (1959-2022) | 1959 | post-war | year range |
| hayashibara-museum-of-art | Hayashibara Museum of Art | 1961 | post-war | year range |
| helsinki-university-of-technology-main | Helsinki University of Technology Main Building | 1964 | post-war | year range |
| henry-chamberlain-house | Henry Chamberlain House | 1940 | modern | year range before post-war |
| heydar-aliyev-center | Heydar Aliyev Center | 2012 | contemporary | year range |
| hill-museum-manuscript-library | Hill Museum & Manuscript Library | 1965 | post-war | year range |
| hirosaki-city-hall | Hirosaki City Hall | 1958 | post-war | year range |
| hirosaki-city-museum | Hirosaki City Museum | 1977 | post-war | year range |
| hirosaki-civic-hall | Hirosaki Civic Hall | 1964 | post-war | year range |
| hiroshima-peace-memorial-museum | Hiroshima Peace Memorial Museum | 1955 | post-war | year range |
| hiroshima-peace-museum | Hiroshima Peace Memorial Museum | 1955 | post-war | year range |
| hirshhorn-museum-and-sculpture-garden | Hirshhorn Museum and Sculpture Garden | 1974 | post-war | year range |
| hiss-residence | Hiss Residence | 1953 | post-war | year range |
| hochhaus-neue-donau | Hochhaus Neue Donau | 2002 | contemporary | year range |
| hongkong-bank | HSBC Building Hong Kong | 1985 | postmodern | year range; contemporary exceptions possible |
| hooper-house-baltimore-county-maryland | Hooper House (Baltimore County, Maryland) | 1959 | post-war | year range |
| horizon-apartments | Horizon Apartments | 1998 | postmodern | year range; contemporary exceptions possible |
| horizontal-skyscraper-vanke-center | Horizontal Skyscraper – Vanke Center | 2009 | contemporary | year range |
| hotel-marcel | Hotel Marcel | 1970 | post-war | year range |
| house-na | House NA | 2011 | contemporary | year range |
| house-vi | House VI | 1975 | post-war | year range |

## Risk Cases

| Building | Name | Year | Reason |
|---|---|---|---|
| 1-spring-street | 1 Spring Street |  | missing year_start |
| 20-times-square | 20 Times Square |  | missing year_start |
| 25th-of-april-society-headquarters | 25th of April Society Headquarters |  | missing year_start |
| 4-world-trade-center | 4 World Trade Center |  | missing year_start |
| 51-astor-place | 51 Astor Place |  | missing year_start |
| airman-memorial-chapel | Airman Memorial Chapel |  | missing year_start |
| akai-house | Akai House |  | missing year_start |
| alfred-de-schulthess-house | Alfred de Schulthess House |  | missing year_start |
| alvar-aalto-aerola-1953 | Alvar Aalto - Aerola 1953 |  | missing year_start |
| ameritrust-tower | Ameritrust Tower |  | missing year_start |
| andre-malraux-cultural-centre | André Malraux Cultural Centre |  | missing year_start |
| arango-house | Arango House |  | missing year_start |
| ariston-club | Ariston Club |  | missing year_start |
| arthur-and-mona-hofmann-house | Arthur and Mona Hofmann House |  | missing year_start |
| atocha-cercanias | Atocha-Cercanías |  | missing year_start |
| audrey-jones-beck-building | Audrey Jones Beck Building |  | missing year_start |
| auerbacher-home | Auerbacher Home |  | missing year_start |
| australia-square | Australia Square |  | missing year_start |
| australia-square-tower | Australia Square Tower |  | missing year_start |
| bairro-da-malagueira | Bairro da Malagueira |  | missing year_start |
| balboa-island-house | Balboa Island House |  | missing year_start |
| baloise-bellinzona | Baloise Bellinzona |  | missing year_start |
| banca-popolare-di-verona | Banca Popolare di Verona |  | missing year_start |
| bank-of-spain-building-in | Bank of Spain building in Jaén |  | missing year_start |
| barack-obama-presidential-center | Barack Obama Presidential Center |  | missing year_start |
| bianda-house | Bianda House |  | missing year_start |
| biblioteca-municipal-de-viana-do | Biblioteca Municipal de Viana do Castelo |  | missing year_start |
| blue-front-shibaura | BLUE FRONT SHIBAURA |  | missing year_start |
| bonjour-tristesse | Bonjour Tristesse |  | missing year_start |
| botta-building-basel | Botta Building Basel |  | missing year_start |
| bridge-of-peace | Bridge of Peace |  | missing year_start |
| bunshaft-residence | Bunshaft Residence |  | missing year_start |
| buro-und-geschaftshaus | Büro- und Geschäftshaus |  | missing year_start |
| c-v-starr-east-asian | C. V. Starr East Asian Library |  | missing year_start |
| cais-das-artes | Cais das Artes |  | missing year_start |
| can-feliz | Can Feliz |  | missing year_start |
| capita-centre | Capita Centre |  | missing year_start |
| carlos-ramos-pavilion | Carlos Ramos Pavilion |  | missing year_start |
| carmen-wurth-forum | Carmen Würth Forum |  | missing year_start |
| casa-comolli-rustici | Casa Comolli-Rustici |  | missing year_start |
| casa-das-historias-paula-rego | Casa das Histórias Paula Rego |  | missing year_start |
| casa-do-benin | Casa do Benin |  | missing year_start |
| casa-ghiringhelli | Casa Ghiringhelli |  | missing year_start |
| casa-gilardi | Casa Gilardi |  | missing year_start |
| casa-giuliani-frigerio | Casa Giuliani Frigerio |  | missing year_start |
| casa-lavezzari | Casa Lavezzari |  | missing year_start |
| casa-pedraglio | Casa Pedraglio |  | missing year_start |
| casa-roberto-ivens-casa | Casa Roberto Ivens - Casa da Arquitetura |  | missing year_start |
| casa-rustici | Casa Rustici |  | missing year_start |
| casa-toninello | Casa Toninello |  | missing year_start |
| casa-tuia | Casa Tuia |  | missing year_start |
| case-dautore | Case d'autore |  | missing year_start |
| casino-di-campione | Casinò di Campione |  | missing year_start |
| celine-and-heiner-bastian-exhibition | Celine and Heiner Bastian exhibition room |  | missing year_start |
| church-of-san-juan-de | church of San Juan de Ávila |  | missing year_start |
| city-center-towers-complex | City Center Towers Complex |  | missing year_start |
| club-house-du-golf-de-beauvallon | Club-house du golf de Beauvallon |  | missing year_start |
| col-legi-darquitectes | Col·legi d'Arquitectes |  | missing year_start |
| conjunto-habitacional-da-bouca | Conjunto Habitacional da Bouça |  | missing year_start |
| coolsingeltoren | Coolsingeltoren |  | missing year_start |
| corona-avenue-school | Corona Avenue School |  | missing year_start |
| crawford-manor | Crawford Manor |  | missing year_start |
| creative-arts-center-colgate-university | Creative Arts Center [Colgate University] |  | missing year_start |
| crematorium-uitzicht | Crematorium Uitzicht |  | missing year_start |
| crescent-professional-building | Crescent Professional Building |  | missing year_start |
| danteum | Danteum |  | missing year_start |
| dentsu-osaka-building | Dentsu Osaka Building |  | missing year_start |
| dentsu-osaka-office | Dentsu Osaka Office |  | missing year_start |
| dentsu-tsukiji-building | Dentsu Tsukiji Building |  | missing year_start |
| deposito-julio-herrera-y-obes | Depósito Julio Herrera y Obes |  | missing year_start |
| dorre-barriak | Dorre Barriak |  | missing year_start |
| douglas-and-octavia-walstrom-house | Douglas and Octavia Walstrom House |  | missing year_start |
| dymaxion-house | Dymaxion house |  | missing year_start |
| ebisu-east-park-toilet | Ebisu East Park Toilet |  | missing year_start |
| edifici-illa-diagonal | Edifici Illa Diagonal |  | missing year_start |
| edp-headquarters-ii | EDP Headquarters II |  | missing year_start |
| egg-company-building-ii | Egg Company Building II |  | missing year_start |
| elementary-school | elementary school |  | missing year_start |
| emerson-middle-school | Emerson Middle School |  | missing year_start |
| ensemble-of-alvaro-sizas-architecture | ensemble of Álvaro Siza's architecture works in Portugal |  | missing year_start |
| espirito-santo-do-cerrado-church | Espirito Santo do Cerrado church |  | missing year_start |
| estadio-serra-dourada | Estádio Serra Dourada |  | missing year_start |
| evere-crematorium | Evere Crematorium |  | missing year_start |
| expo-70-pavilion | Expo '70 Pavilion |  | missing year_start |
| facultad-de-ciencias-de-la | Facultad de Ciencias de la Comunicación de Santiago de Compostela |  | missing year_start |
| fiore-di-botta | Fiore di Botta |  | missing year_start |
| five-scattered-houses-ningbo | Five Scattered Houses, Ningbo |  | missing year_start |
| former-weichmanns-textile-house | Former Weichmann's Textile House |  | missing year_start |
| foster-carling-house | Foster Carling House |  | missing year_start |
| gaumont-grand-ecran-italie | Gaumont Grand Écran Italie |  | missing year_start |
| googies-coffee-shop | Googies Coffee Shop |  | missing year_start |
| government-service-center | Government Service Center |  | missing year_start |
| greenberg-house | Greenberg house |  | missing year_start |
| grollo-tower | Grollo Tower |  | missing year_start |
| grosse-pointe-public-library-central | Grosse Pointe Public Library Central Branch |  | missing year_start |
| hachiro-yuasa-memorial-museum | Hachirō Yuasa Memorial Museum |  | missing year_start |
| hagi-uragami-museum | Hagi Uragami Museum |  | missing year_start |
| haifa-first-power-plant | Haifa first power plant |  | missing year_start |
| haras-de-la-huderie | Haras de la Huderie |  | missing year_start |
| harry-koblick-house | Harry Koblick House |  | missing year_start |
| harting-vertriebsgebaude | Harting Vertriebsgebäude |  | missing year_start |
| haus-am-checkpoint-charlie | Haus am Checkpoint Charlie |  | missing year_start |
| haus-des-deutschen-metallarbeiterverbandes | Haus des Deutschen Metallarbeiterverbandes |  | missing year_start |
| haus-van-middelem-dupont | Haus van Middelem-Dupont |  | missing year_start |
| hiroshima-national-peace-memorial-hall | Hiroshima National Peace Memorial Hall for the Atomic Bomb Victims |  | missing year_start |
| holiday-house-motel | Holiday House Motel |  | missing year_start |
| hospital-materno-infantil-gregorio-maranon | Hospital Materno-Infantil Gregorio Marañón |  | missing year_start |
| house-delorenzi | House Delorenzi |  | missing year_start |
| hyogo-prefectural-museum-of-history | Hyogo Prefectural Museum of History |  | missing year_start |
| ibaraki-prefectural-culture-center | Ibaraki Prefectural Culture Center |  | missing year_start |
| ichimura-memorial-gymnasium | Ichimura Memorial Gymnasium |  | missing year_start |
| ilot-des-hautes-formes | Îlot des Hautes-Formes |  | missing year_start |
| inadomi-house | Inadomi House |  | missing year_start |
| interbau | Interbau |  | missing year_start |
| international-conference-center-hiroshima | International Conference Center Hiroshima |  | missing year_start |
| jewett-arts-center | Jewett Arts Center |  | missing year_start |
| john-and-mary-lautner-house | John and Mary Lautner House |  | missing year_start |
| kagawa-prefectural-government-office | Kagawa Prefectural Government Office |  | missing year_start |
| kanazawa-bunka-hall | Kanazawa Bunka Hall |  | missing year_start |
| kaufhaus-tyrol | Kaufhaus Tyrol |  | missing year_start |
| kinokuniya-hall | Kinokuniya Hall |  | missing year_start |
| kirishima-international-concert-hall | Kirishima International Concert Hall |  | missing year_start |
| kurashiki-city-art-museum | Kurashiki City Art Museum |  | missing year_start |
| kuwait-embassy-building | Kuwait Embassy building |  | missing year_start |
| la-felicite | La Félicité |  | missing year_start |
| le-rocher-de-palmer | Le Rocher de Palmer |  | missing year_start |
| leo-m-harvey-house | Leo M. Harvey House |  | missing year_start |
| les-champs-libres | Les Champs Libres |  | missing year_start |
| lever-house | Lever House |  | missing year_start |
| logrono-town-hall | Logroño town hall |  | missing year_start |
| loisium-weinerlebniswelt-vinothek | LOISIUM WeinErlebnisWelt & Vinothek |  | missing year_start |
| loisium-wine-spa-resort-langenlois | Loisium Wine & Spa Resort Langenlois |  | missing year_start |
| louise-catherine | Louise-Catherine |  | missing year_start |
| lutzowplatz-1 | Lützowplatz 1 |  | missing year_start |
| lvmh-tower | LVMH Tower |  | missing year_start |
| madrid-puerta-de-atocha-almudena-grandes | Madrid-Puerta de Atocha-Almudena Grandes |  | missing year_start |
| maison-du-livre-de-limage | Maison du Livre, de l'Image et du Son |  | missing year_start |
| maury-and-bernice-sorrells-house | Maury and Bernice Sorrells House |  | missing year_start |
| mercado-municipal-do-caranda | Mercado Municipal do Carandá |  | missing year_start |
| mercure-yokosuka | Mercure Yokosuka |  | missing year_start |
| moore-house | Moore House |  | missing year_start |
| mughal-museum | Mughal Museum |  | missing year_start |
| nagano-city-arts-center | Nagano City Arts Center |  | missing year_start |
| nara-kintetsu-building | Nara Kintetsu Building |  | missing year_start |
| national-coach-museum | National Coach Museum |  | missing year_start |
| niagara-falls-public-library | Niagara Falls Public Library |  | missing year_start |
| nuestra-senora-del-libano-montevideo | Nuestra Señora del Líbano, Montevideo |  | missing year_start |
| ohara-house | Ohara House |  | missing year_start |
| ongakudo | Ongakudō |  | missing year_start |
| otaniemi-water-tower | Otaniemi water tower |  | missing year_start |
| pa-technology-cambridge-laboratory-pats-center | PA Technology Cambridge Laboratory (PATS-Center) |  | missing year_start |
| pace-collection-showroom | Pace Collection showroom |  | missing year_start |
| palacio-de-congresos-de-toledo | Palacio de Congresos de Toledo |  | missing year_start |
| palazzo-bocconi | Palazzo Bocconi |  | missing year_start |
| palazzo-brusarosco | Palazzo Brusarosco |  | missing year_start |
| palazzo-donnaregina | Palazzo Donnaregina |  | missing year_start |
| paleis-of-justice-in-antwerp | Paleis of Justice in Antwerp |  | missing year_start |
| pearlman-mountain-cabin | Pearlman Mountain Cabin |  | missing year_start |
| petersdorff-department-store | Petersdorff Department Store |  | missing year_start |
| philharmonie-luxembourg | Philharmonie Luxembourg |  | missing year_start |
| pickering-operations-complex | Pickering Operations Complex |  | missing year_start |
| private-bridge-of-palazzo-querini | Private bridge of Palazzo Querini Stampalia |  | missing year_start |
| q115688741 | Q115688741 |  | missing year_start |
| q115728606 | Q115728606 |  | missing year_start |
| q115729435 | Q115729435 |  | missing year_start |
| q115729496 | Q115729496 |  | missing year_start |
| q115729511 | Q115729511 |  | missing year_start |
| q115729853 | Q115729853 |  | missing year_start |
| q115729861 | Q115729861 |  | missing year_start |
| q116138909 | Q116138909 |  | missing year_start |
| q116771232 | Q116771232 |  | missing year_start |
| q117081639 | Q117081639 |  | missing year_start |
| q117081642 | Q117081642 |  | missing year_start |
| q117255504 | Q117255504 |  | missing year_start |
| q11814621 | Q11814621 |  | missing year_start |
| q118287826 | Q118287826 |  | missing year_start |
| q118287915 | Q118287915 |  | missing year_start |
| q118287920 | Q118287920 |  | missing year_start |
| q118287922 | Q118287922 |  | missing year_start |
| q118611433 | Q118611433 |  | missing year_start |

## Explicit Risks

- Pure year mapping is unsafe for long-running historical projects and revival styles.
- Completion year may differ from design year, construction start, dedication, or major renovation.
- Adaptive reuse projects may carry both original era and intervention era; this requires editorial policy.
- Ancient/historic buildings without a modern architect should be handled with an exception list.
