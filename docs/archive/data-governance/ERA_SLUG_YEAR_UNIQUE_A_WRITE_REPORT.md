# Era Slug Year Unique A Write Report

Generated: 2026-07-08T15:46:23.110Z

## Scope

- This batch writes only unassigned buildings whose `year_start` fits exactly one current era range.
- This batch is intentionally limited to pre-1980 eras: `renaissance`, `neoclassical`, `industrial-revolution`, `early-modern`, `modern`, and `post-war`.
- It excludes weak identity records, known duplicate-like records, and records whose source year may describe an older host building rather than the architectural intervention.
- It does not touch `year-overlap`, `missing-year`, `postmodern`, or `contemporary` candidates.

## Summary

- Writable decisions: 170
- Excluded from automatic write: 3
- Migration: `db/migrations/v16-normalize-year-unique-a-era-slugs.sql`
- Rollback SQL: `reports/era-slug-year-unique-a-rollback.sql`

## Distribution

| era_slug | Count |
|---|---:|
| post-war | 103 |
| modern | 38 |
| early-modern | 20 |
| industrial-revolution | 4 |
| neoclassical | 3 |
| renaissance | 2 |

## Manual Exclusions

| Building | Year | Candidate era | Reason |
|---|---:|---|---|
| fondazione-querini-stampalia | 1869 | industrial-revolution | Original building year points to 1869, but this record is likely used as a Scarpa intervention reference; keep for manual review. |
| cleveland-museum-of-art-building | 1913 | early-modern | Likely duplicate or weaker companion record for cleveland-museum-of-art; keep one canonical target out of automatic writes until reviewed. |
| swedish-centre-for-architecture-and | 1962 | post-war | Year and architect context look unstable for automatic period assignment; keep for manual review. |

## Decisions

| Building | Name | Year | era_slug | Reason |
|---|---|---:|---|---|
| palazzo-abatellis | Palazzo Abatellis | 1495 | renaissance | year_start 1495 fits exactly one current era range: renaissance |
| santantonio-abate-parish-church | Sant'Antonio Abate Parish Church | 1502 | renaissance | year_start 1502 fits exactly one current era range: renaissance |
| palacio-pascual-de-riquelme | Palacio Pascual de Riquelme | 1800 | neoclassical | year_start 1800 fits exactly one current era range: neoclassical |
| palace-of-villahermosa | Palace of Villahermosa | 1805 | neoclassical | year_start 1805 fits exactly one current era range: neoclassical |
| gipsoteca-canoviana | Gipsoteca canoviana | 1832 | neoclassical | year_start 1832 fits exactly one current era range: neoclassical |
| pylkonmaki-church | Pylkönmäki Church | 1860 | industrial-revolution | year_start 1860 fits exactly one current era range: industrial-revolution |
| saint-louis-art-museum | Saint Louis Art Museum | 1879 | industrial-revolution | year_start 1879 fits exactly one current era range: industrial-revolution |
| minneapolis-institute-of-art | Minneapolis Institute of Art | 1883 | industrial-revolution | year_start 1883 fits exactly one current era range: industrial-revolution |
| auditorium-building | Auditorium Building | 1889 | industrial-revolution | year_start 1889 fits exactly one current era range: industrial-revolution |
| fagus-factory | Fagus Factory | 1911 | early-modern | year_start 1911 fits exactly one current era range: early-modern |
| cleveland-museum-of-art | Cleveland Museum of Art | 1913 | early-modern | year_start 1913 fits exactly one current era range: early-modern |
| mendelsohn-house | Mendelsohn House | 1913 | early-modern | year_start 1913 fits exactly one current era range: early-modern |
| einstein-tower | Einstein Tower | 1920 | early-modern | year_start 1920 fits exactly one current era range: early-modern |
| landhaus-bejach | Landhaus Bejach | 1920 | early-modern | year_start 1920 fits exactly one current era range: early-modern |
| mendelsohn-housing-scheme-luckenwalde | Mendelsohn-housing scheme (Luckenwalde) | 1920 | early-modern | year_start 1920 fits exactly one current era range: early-modern |
| saitama-museum-of-natural-history | Saitama Museum of Natural History | 1921 | early-modern | year_start 1921 fits exactly one current era range: early-modern |
| plaza-de-toros-de-pamplona | Plaza de Toros de Pamplona | 1922 | early-modern | year_start 1922 fits exactly one current era range: early-modern |
| jyvaskyla-workers-club | Jyväskylä Workers' Club | 1925 | early-modern | year_start 1925 fits exactly one current era range: early-modern |
| red-banner-textile-factory | Red Banner Textile Factory | 1925 | early-modern | year_start 1925 fits exactly one current era range: early-modern |
| bauhaus-dessau | Bauhaus Dessau | 1926 | early-modern | year_start 1926 fits exactly one current era range: early-modern |
| tokyo-metropolitan-art-museum | Tokyo Metropolitan Art Museum | 1926 | early-modern | year_start 1926 fits exactly one current era range: early-modern |
| friedhof-der-synagogengemeinde-konigsberg | Friedhof der Synagogengemeinde (Königsberg) | 1927 | early-modern | year_start 1927 fits exactly one current era range: early-modern |
| maison-de-verre | Maison de Verre | 1928 | early-modern | year_start 1928 fits exactly one current era range: early-modern |
| southwestern-finland-agricultural-cooperative-building | Southwestern Finland Agricultural Cooperative Building | 1928 | early-modern | year_start 1928 fits exactly one current era range: early-modern |
| standard-rental-house-by-alvar | Standard rental house by Alvar Aalto | 1928 | early-modern | year_start 1928 fits exactly one current era range: early-modern |
| barcelona-pavilion | Barcelona Pavilion | 1929 | early-modern | year_start 1929 fits exactly one current era range: early-modern |
| muurame-church | Muurame Church | 1929 | early-modern | year_start 1929 fits exactly one current era range: early-modern |
| parroquia-maronita-de-nuestra-senora | Parroquia Maronita de Nuestra Señora del Líbano | 1929 | early-modern | year_start 1929 fits exactly one current era range: early-modern |
| valtiontalo | Valtiontalo | 1929 | early-modern | year_start 1929 fits exactly one current era range: early-modern |
| arne-jacobsen-s-own-house | Arne Jacobsen’s own house in Charlottenlund | 1931 | modern | year_start 1931 fits exactly one current era range: modern |
| villa-savoye | Villa Savoye | 1931 | modern | year_start 1931 fits exactly one current era range: modern |
| columbushaus | Columbushaus | 1932 | modern | year_start 1932 fits exactly one current era range: modern |
| neutra-vdl-studio-and-residences | Neutra VDL Studio and Residences | 1932 | modern | year_start 1932 fits exactly one current era range: modern |
| palazzo-terragni | Palazzo Terragni | 1932 | modern | year_start 1932 fits exactly one current era range: modern |
| villa-tammekann | Villa Tammekann | 1932 | modern | year_start 1932 fits exactly one current era range: modern |
| paimio-sanatorium | Paimio Sanatorium | 1933 | modern | year_start 1933 fits exactly one current era range: modern |
| the-nelson-atkins-museum-of-art | The Nelson-Atkins Museum of Art | 1933 | modern | year_start 1933 fits exactly one current era range: modern |
| asilo-santelia | Asilo Sant'Elia | 1934 | modern | year_start 1934 fits exactly one current era range: modern |
| bellavista-housing-estate | Bellavista housing estate | 1934 | modern | year_start 1934 fits exactly one current era range: modern |
| de-la-warr-pavilion | De La Warr Pavilion | 1935 | modern | year_start 1935 fits exactly one current era range: modern |
| parque-revolucion | Parque Revolución | 1935 | modern | year_start 1935 fits exactly one current era range: modern |
| salman-schocken-house | Salman Schocken house | 1935 | modern | year_start 1935 fits exactly one current era range: modern |
| schocken-library | Schocken Library | 1935 | modern | year_start 1935 fits exactly one current era range: modern |
| villa-aalto | Villa Aalto | 1935 | modern | year_start 1935 fits exactly one current era range: modern |
| vyborg-library | Viipuri Library | 1935 | modern | year_start 1935 fits exactly one current era range: modern |
| bellevue-teatret | Bellevue Teatret | 1936 | modern | year_start 1936 fits exactly one current era range: modern |
| cohen-house | Cohen House | 1936 | modern | year_start 1936 fits exactly one current era range: modern |
| skovshoved-petrol-station | Skovshoved Petrol Station | 1936 | modern | year_start 1936 fits exactly one current era range: modern |
| bank-leumi-building-jerusalem | Bank Leumi Building, Jerusalem | 1937 | modern | year_start 1937 fits exactly one current era range: modern |
| gilbey-house | Gilbey House | 1937 | modern | year_start 1937 fits exactly one current era range: modern |
| stelling-house | Stelling House | 1937 | modern | year_start 1937 fits exactly one current era range: modern |
| taliesin-west | Taliesin West | 1937 | modern | year_start 1937 fits exactly one current era range: modern |
| tehtaanmaki | Tehtaanmäki | 1937 | modern | year_start 1937 fits exactly one current era range: modern |
| villa-of-floriculturist | Villa of floriculturist | 1937 | modern | year_start 1937 fits exactly one current era range: modern |
| weizmann-house | Weizmann House | 1937 | modern | year_start 1937 fits exactly one current era range: modern |
| gropius-house | Gropius House | 1938 | modern | year_start 1938 fits exactly one current era range: modern |
| hadassah-university-hospital-mt-scopus | Hadassah University Hospital, Mt. Scopus | 1938 | modern | year_start 1938 fits exactly one current era range: modern |
| terassitalo | Terassitalo | 1938 | modern | year_start 1938 fits exactly one current era range: modern |
| fallingwater | Fallingwater | 1939 | modern | year_start 1939 fits exactly one current era range: modern |
| villa-mairea | Villa Mairea | 1939 | modern | year_start 1939 fits exactly one current era range: modern |
| henry-chamberlain-house | Henry Chamberlain House | 1940 | modern | year_start 1940 fits exactly one current era range: modern |
| the-alan-i-w-frank | The Alan I W Frank House | 1940 | modern | year_start 1940 fits exactly one current era range: modern |
| aarhus-city-hall | Aarhus City Hall | 1941 | modern | year_start 1941 fits exactly one current era range: modern |
| kishi-memorial-gymnasium | Kishi Memorial Gymnasium | 1941 | modern | year_start 1941 fits exactly one current era range: modern |
| kunio-maekawa-house | Kunio Maekawa House | 1942 | modern | year_start 1942 fits exactly one current era range: modern |
| rudersdal-town-hall | Rudersdal Town Hall | 1942 | modern | year_start 1942 fits exactly one current era range: modern |
| abele-residence | Abele Residence | 1943 | modern | year_start 1943 fits exactly one current era range: modern |
| chiesa-di-nostra-signora-del | Chiesa di Nostra Signora del Cadore | 1961 | post-war | year_start 1961 fits exactly one current era range: post-war |
| hayashibara-museum-of-art | Hayashibara Museum of Art | 1961 | post-war | year_start 1961 fits exactly one current era range: post-war |
| milam-residence | Milam Residence | 1961 | post-war | year_start 1961 fits exactly one current era range: post-war |
| palos-verdes-high-school | Palos Verdes High School | 1961 | post-war | year_start 1961 fits exactly one current era range: post-war |
| tokyo-bunka-kaikan | Tokyo Bunka Kaikan | 1961 | post-war | year_start 1961 fits exactly one current era range: post-war |
| aalto-hochhaus | Aalto-Hochhaus | 1962 | post-war | year_start 1962 fits exactly one current era range: post-war |
| cyclorama-building | Cyclorama Building | 1962 | post-war | year_start 1962 fits exactly one current era range: post-war |
| dulles-airport | Dulles Airport Terminal | 1962 | post-war | year_start 1962 fits exactly one current era range: post-war |
| garcia-house | Garcia House | 1962 | post-war | year_start 1962 fits exactly one current era range: post-war |
| los-angeles-county-hall-of | Los Angeles County Hall of Records | 1962 | post-war | year_start 1962 fits exactly one current era range: post-war |
| the-marnix | The Marnix | 1962 | post-war | year_start 1962 fits exactly one current era range: post-war |
| tour-telus | Tour Telus | 1962 | post-war | year_start 1962 fits exactly one current era range: post-war |
| twa-terminal | TWA Flight Center | 1962 | post-war | year_start 1962 fits exactly one current era range: post-war |
| beinecke-rare-book-manuscript-library | Beinecke Rare Book & Manuscript Library | 1963 | post-war | year_start 1963 fits exactly one current era range: post-war |
| chusanren-building-main-building | Chusanren Building main building | 1963 | post-war | year_start 1963 fits exactly one current era range: post-war |
| fredensborg-houses | Fredensborg Houses | 1963 | post-war | year_start 1963 fits exactly one current era range: post-war |
| national-museum-of-modern-art | National Museum of Modern Art, Kyoto | 1963 | post-war | year_start 1963 fits exactly one current era range: post-war |
| our-lady-of-the-annunciation | Our Lady of the Annunciation Chapel at Annunciation Priory | 1963 | post-war | year_start 1963 fits exactly one current era range: post-war |
| casa-do-chame-chame | Casa do Chame-Chame | 1964 | post-war | year_start 1964 fits exactly one current era range: post-war |
| flame-of-peace | Flame of Peace | 1964 | post-war | year_start 1964 fits exactly one current era range: post-war |
| helsinki-university-of-technology-main | Helsinki University of Technology Main Building | 1964 | post-war | year_start 1964 fits exactly one current era range: post-war |
| hirosaki-civic-hall | Hirosaki Civic Hall | 1964 | post-war | year_start 1964 fits exactly one current era range: post-war |
| komazawa-gymnasium | Komazawa Gymnasium | 1964 | post-war | year_start 1964 fits exactly one current era range: post-war |
| st-marys-cathedral | St. Mary's Cathedral | 1964 | post-war | year_start 1964 fits exactly one current era range: post-war |
| yoyogi-national-gymnasium | Yoyogi National Gymnasium | 1964 | post-war | year_start 1964 fits exactly one current era range: post-war |
| 190-192-sloane-street | 190–192 Sloane Street | 1965 | post-war | year_start 1965 fits exactly one current era range: post-war |
| gateway-arch | Gateway Arch | 1965 | post-war | year_start 1965 fits exactly one current era range: post-war |
| hill-museum-manuscript-library | Hill Museum & Manuscript Library | 1965 | post-war | year_start 1965 fits exactly one current era range: post-war |
| new-york-public-library-for | New York Public Library for the Performing Arts | 1965 | post-war | year_start 1965 fits exactly one current era range: post-war |
| painted-desert-community-complex-historic | Painted Desert Community Complex Historic District | 1965 | post-war | year_start 1965 fits exactly one current era range: post-war |
| salk-institute | Salk Institute | 1965 | post-war | year_start 1965 fits exactly one current era range: post-war |
| warren-mcguirk-alumni-stadium | Warren McGuirk Alumni Stadium | 1965 | post-war | year_start 1965 fits exactly one current era range: post-war |
| 945-madison-avenue | 945 Madison Avenue | 1966 | post-war | year_start 1966 fits exactly one current era range: post-war |
| copan-building | Copan Building | 1966 | post-war | year_start 1966 fits exactly one current era range: post-war |
| forum-castrop-rauxel | Forum Castrop-Rauxel | 1966 | post-war | year_start 1966 fits exactly one current era range: post-war |
| saitama-hall | Saitama Hall | 1966 | post-war | year_start 1966 fits exactly one current era range: post-war |
| shinjuku-station-west-concourse | Shinjuku Station West Concourse | 1966 | post-war | year_start 1966 fits exactly one current era range: post-war |
| sony-building | Sony Building | 1966 | post-war | year_start 1966 fits exactly one current era range: post-war |
| tidal-pools-of-leca-de | Tidal pools of Leça de Palmeira | 1966 | post-war | year_start 1966 fits exactly one current era range: post-war |
| yamanashi-broadcasting-and-press-centre | Yamanashi Broadcasting and Press Centre | 1966 | post-war | year_start 1966 fits exactly one current era range: post-war |
| church-of-nuestra-senora-de | church of Nuestra Señora de Guadalupe | 1967 | post-war | year_start 1967 fits exactly one current era range: post-war |
| montreal-biosphere | Montreal Biosphère | 1967 | post-war | year_start 1967 fits exactly one current era range: post-war |
| orange-county-government-center | Orange County Government Center | 1967 | post-war | year_start 1967 fits exactly one current era range: post-war |
| shizuoka-press-and-broadcasting-center | Shizuoka Press and Broadcasting Center | 1967 | post-war | year_start 1967 fits exactly one current era range: post-war |
| cuadra-san-cristobal | Cuadra San Cristobal | 1968 | post-war | year_start 1968 fits exactly one current era range: post-war |
| elrod-house | Elrod House | 1968 | post-war | year_start 1968 fits exactly one current era range: post-war |
| japanese-sword-museum | Japanese Sword Museum | 1968 | post-war | year_start 1968 fits exactly one current era range: post-war |
| national-gallery-berlin | Neue Nationalgalerie | 1968 | post-war | year_start 1968 fits exactly one current era range: post-war |
| nordic-house | Nordic House | 1968 | post-war | year_start 1968 fits exactly one current era range: post-war |
| palacio-de-los-deportes | Palacio de los Deportes | 1968 | post-war | year_start 1968 fits exactly one current era range: post-war |
| robert-c-weaver-federal-building | Robert C. Weaver Federal Building | 1968 | post-war | year_start 1968 fits exactly one current era range: post-war |
| stephanuskirche-wolfsburg | Stephanuskirche (Wolfsburg) | 1968 | post-war | year_start 1968 fits exactly one current era range: post-war |
| arne-jacobsen-bau-in-mainz-hartenberg-munchfeld | Arne-Jacobsen-Bau in Mainz-Hartenberg/Münchfeld | 1969 | post-war | year_start 1969 fits exactly one current era range: post-war |
| burroughs-wellcome-company-corporate-headquarters | Burroughs Wellcome Company Corporate Headquarters | 1969 | post-war | year_start 1969 fits exactly one current era range: post-war |
| kirjatalo | Kirjatalo | 1969 | post-war | year_start 1969 fits exactly one current era range: post-war |
| picker-art-gallery | Picker Art Gallery | 1969 | post-war | year_start 1969 fits exactly one current era range: post-war |
| uberseering-12 | Überseering 12 | 1969 | post-war | year_start 1969 fits exactly one current era range: post-war |
| big-roof | Big Roof | 1970 | post-war | year_start 1970 fits exactly one current era range: post-war |
| brasilia-cathedral | Cathedral of Brasília | 1970 | post-war | year_start 1970 fits exactly one current era range: post-war |
| hotel-marcel | Hotel Marcel | 1970 | post-war | year_start 1970 fits exactly one current era range: post-war |
| murray-d-lincoln-campus-center | Murray D. Lincoln Campus Center | 1970 | post-war | year_start 1970 fits exactly one current era range: post-war |
| r-dovre-library | Rødovre Library | 1970 | post-war | year_start 1970 fits exactly one current era range: post-war |
| can-lis | Can Lis | 1971 | post-war | year_start 1971 fits exactly one current era range: post-war |
| finlandia-hall | Finlandia Hall | 1971 | post-war | year_start 1971 fits exactly one current era range: post-war |
| lyndon-baines-johnson-library-and | Lyndon Baines Johnson Library and Museum | 1971 | post-war | year_start 1971 fits exactly one current era range: post-war |
| miyazaki-prefectural-museum-of-nature | Miyazaki Prefectural Museum of Nature and History | 1971 | post-war | year_start 1971 fits exactly one current era range: post-war |
| saitama-prefectural-museum-of-history | Saitama Prefectural Museum of History and Folklore | 1971 | post-war | year_start 1971 fits exactly one current era range: post-war |
| carlton-hotel | Carlton Hotel | 1972 | post-war | year_start 1972 fits exactly one current era range: post-war |
| kimbell-art-museum | Kimbell Art Museum | 1972 | post-war | year_start 1972 fits exactly one current era range: post-war |
| kunsten-museum-of-modern-art | Kunsten Museum of Modern Art Aalborg | 1972 | post-war | year_start 1972 fits exactly one current era range: post-war |
| louis-micheels-house | Louis Micheels House | 1972 | post-war | year_start 1972 fits exactly one current era range: post-war |
| nakagin-capsule-tower | Nakagin Capsule Tower | 1972 | post-war | year_start 1972 fits exactly one current era range: post-war |
| sahkotalo | Sähkötalo | 1972 | post-war | year_start 1972 fits exactly one current era range: post-war |
| united-nations-university | United Nations University | 1972 | post-war | year_start 1972 fits exactly one current era range: post-war |
| alvar-aalto-museum-jyvaskyla | Alvar Aalto Museum Jyväskylä | 1973 | post-war | year_start 1973 fits exactly one current era range: post-war |
| bianchi-house | Bianchi House | 1973 | post-war | year_start 1973 fits exactly one current era range: post-war |
| chapelle-cumenique-de-flaine | chapelle œcuménique de Flaine | 1973 | post-war | year_start 1973 fits exactly one current era range: post-war |
| edificio-urumea | Edificio Urumea | 1973 | post-war | year_start 1973 fits exactly one current era range: post-war |
| sydney-opera-house | Sydney Opera House | 1973 | post-war | year_start 1973 fits exactly one current era range: post-war |
| uris-hall | Uris Hall | 1973 | post-war | year_start 1973 fits exactly one current era range: post-war |
| casa-ottolenghi | Casa Ottolenghi | 1974 | post-war | year_start 1974 fits exactly one current era range: post-war |
| hirshhorn-museum-and-sculpture-garden | Hirshhorn Museum and Sculpture Garden | 1974 | post-war | year_start 1974 fits exactly one current era range: post-war |
| parkeergarage-bijenkorf | Parkeergarage Bijenkorf | 1974 | post-war | year_start 1974 fits exactly one current era range: post-war |
| solow-building | Solow Building | 1974 | post-war | year_start 1974 fits exactly one current era range: post-war |
| w-r-grace-building | W. R. Grace Building | 1974 | post-war | year_start 1974 fits exactly one current era range: post-war |
| biblioteca-comunale-centrale-antonio-tiraboschi | Biblioteca comunale centrale Antonio Tiraboschi | 1975 | post-war | year_start 1975 fits exactly one current era range: post-war |
| house-vi | House VI | 1975 | post-war | year_start 1975 fits exactly one current era range: post-war |
| bagsv-rd-church | Bagsværd Church | 1976 | post-war | year_start 1976 fits exactly one current era range: post-war |
| kumamoto-prefectural-museum-of-art | Kumamoto Prefectural Museum of Art | 1976 | post-war | year_start 1976 fits exactly one current era range: post-war |
| row-house-sumiyoshi | Row House in Sumiyoshi | 1976 | post-war | year_start 1976 fits exactly one current era range: post-war |
| bankinter-building | Bankinter building | 1977 | post-war | year_start 1977 fits exactly one current era range: post-war |
| centre-georges-pompidou | Centre Georges Pompidou | 1977 | post-war | year_start 1977 fits exactly one current era range: post-war |
| centre-pompidou | Centre Pompidou | 1977 | post-war | year_start 1977 fits exactly one current era range: post-war |
| hirosaki-city-museum | Hirosaki City Museum | 1977 | post-war | year_start 1977 fits exactly one current era range: post-war |
| mlc-centre | MLC Centre | 1977 | post-war | year_start 1977 fits exactly one current era range: post-war |
| museum-of-east-asian-art | Museum of East-Asian Art | 1977 | post-war | year_start 1977 fits exactly one current era range: post-war |
| brion-tomb | Brion tomb | 1978 | post-war | year_start 1978 fits exactly one current era range: post-war |
| danish-national-bank | Danish National Bank | 1978 | post-war | year_start 1978 fits exactly one current era range: post-war |
| east-building-national-gallery | East Building, National Gallery | 1978 | post-war | year_start 1978 fits exactly one current era range: post-war |
| ristinkirkko | Ristinkirkko | 1978 | post-war | year_start 1978 fits exactly one current era range: post-war |
| dar-al-islam | Dar al-Islam | 1979 | post-war | year_start 1979 fits exactly one current era range: post-war |
| fukuoka-art-museum | Fukuoka Art Museum | 1979 | post-war | year_start 1979 fits exactly one current era range: post-war |
| parc-de-la-villette | parc de la Villette | 1979 | post-war | year_start 1979 fits exactly one current era range: post-war |

## Verification Plan

- Apply the generated migration to Supabase production.
- Verify `buildings.era_slug` populated count increases by the writable decision count.
- Verify `building_eras` receives the same relationship count for this batch.
- Run `npm run data:audit`, `npm run typecheck`, `npm run lint`, and `git diff --check`.
