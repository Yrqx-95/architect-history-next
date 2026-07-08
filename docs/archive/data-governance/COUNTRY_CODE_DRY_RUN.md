# Country Code Dry Run

Generated: 2026-06-08T11:38:16.410Z

## Schema Reality

Requested fields were checked against the current `buildings` table. Available relevant fields: `country`, `location`, `city`, `description`, `significance`, `ai_tags`, `name_*`, `wikipedia_url`. No standalone `address`, `region`, or `tags` columns exist.

## Summary

- Missing `country_code`: 830
- High-confidence automatic candidates: 778
- Medium-confidence candidates: 14
- Unable to determine automatically: 38
- Estimated high-confidence coverage: 93.73%
- Estimated remaining after high-confidence fill: 52
- Estimated remaining after high + medium review: 38

## High-Confidence Source Breakdown

| Source | Count |
|---|---|
| location | 687 |
| country | 91 |

## High-Confidence Country Distribution

| Country code | Count |
|---|---|
| US | 170 |
| JP | 103 |
| CH | 64 |
| ES | 46 |
| PT | 37 |
| FI | 37 |
| IT | 34 |
| DE | 33 |
| FR | 33 |
| GB | 28 |
| DK | 28 |
| BR | 18 |
| NL | 16 |
| MX | 15 |
| BE | 13 |
| AU | 12 |
| CN | 10 |
| AT | 8 |
| KR | 7 |
| IL | 7 |
| LU | 7 |
| UY | 5 |
| CZ | 5 |
| SG | 4 |
| PL | 3 |
| SE | 3 |
| TW | 3 |
| GE | 2 |
| MK | 2 |
| LK | 2 |
| BD | 2 |
| VA | 2 |
| GR | 1 |
| AR | 1 |
| IR | 1 |
| NZ | 1 |
| ZA | 1 |
| CL | 1 |
| PH | 1 |
| ID | 1 |
| MY | 1 |
| KW | 1 |
| HK | 1 |
| IN | 1 |
| MC | 1 |
| SY | 1 |
| EG | 1 |
| CO | 1 |
| PE | 1 |
| NO | 1 |
| RU | 1 |

## Medium-Confidence Candidates

These are text-token matches from title/slug/description patterns. Review before writing.

| Building | Name | Candidate | Evidence |
|---|---|---|---|
| bordeaux-courthouse | Bordeaux Courthouse | FR | bordeaux |
| cuadra-san-cristobal | Cuadra San Cristobal | MX | cuadra san cristobal |
| dar-al-islam | Dar al-Islam | EG | dar al-islam |
| dentsu-osaka-office | Dentsu Osaka Office | JP | osaka |
| dome-over-manhattan | Dome over Manhattan | US | manhattan |
| grollo-tower | Grollo Tower | AU | grollo |
| harting-vertriebsgebaude | Harting Vertriebsgebäude | DE | harting |
| kagawa-prefectural-government-office-main | Kagawa Prefectural Government Office Main Building | JP | kagawa |
| nuestra-senora-del-libano-montevideo | Nuestra Señora del Líbano, Montevideo | UY | montevideo |
| palazzo-donnaregina | Palazzo Donnaregina | IT | palazzo |
| paris-opera-ballet-school | Paris Opera Ballet School | FR | paris |
| parkeergarage-bijenkorf | Parkeergarage Bijenkorf | NL | bijenkorf |
| shinjuku-station-west-concourse | Shinjuku Station West Concourse | JP | shinjuku |
| temple-of-san-antonio-de | Temple of San Antonio de las Huertas, Mexico City | MX | san antonio de las huertas |

## Unable / Ambiguous Cases

| Building | Name | Year | Reason |
|---|---|---|---|
| akai-house | Akai House |  | no country, no parseable/recognized location, no high-confidence token |
| alfred-de-schulthess-house | Alfred de Schulthess House |  | no country, no parseable/recognized location, no high-confidence token |
| ameritrust-tower | Ameritrust Tower |  | no country, no parseable/recognized location, no high-confidence token |
| big-roof | Big Roof | 1970 | no country, no parseable/recognized location, no high-confidence token |
| casa-do-chame-chame | Casa do Chame-Chame | 1964 | no country, no parseable/recognized location, no high-confidence token |
| casa-gilardi | Casa Gilardi |  | no country, no parseable/recognized location, no high-confidence token |
| casa-ottolenghi | Casa Ottolenghi | 1974 | no country, no parseable/recognized location, no high-confidence token |
| coolsingeltoren | Coolsingeltoren |  | no country, no parseable/recognized location, no high-confidence token |
| crematorium-uitzicht | Crematorium Uitzicht |  | no country, no parseable/recognized location, no high-confidence token |
| dymaxion-house | Dymaxion house |  | no country, no parseable/recognized location, no high-confidence token |
| elementary-school | elementary school |  | no country, no parseable/recognized location, no high-confidence token |
| ferry-house | Ferry House | 1951 | no country, no parseable/recognized location, no high-confidence token |
| francisco-q-sanchez-elementary-school | Francisco Q. Sanchez Elementary School | 1953 | no country, no parseable/recognized location, no high-confidence token |
| googies-coffee-shop | Googies Coffee Shop |  | no country, no parseable/recognized location, no high-confidence token |
| haifa-first-power-plant | Haifa first power plant |  | no country, no parseable/recognized location, no high-confidence token |
| hashima-city-hall-1959-2022 | Hashima City Hall (1959-2022) | 1959 | no country, no parseable/recognized location, no high-confidence token |
| hirosaki-city-hall | Hirosaki City Hall | 1958 | no country, no parseable/recognized location, no high-confidence token |
| inadomi-house | Inadomi House |  | no country, no parseable/recognized location, no high-confidence token |
| ishigaki-civic-hall | Ishigaki Civic Hall | 1985 | no country, no parseable/recognized location, no high-confidence token |
| j-m-teixeira-house | J. M. Teixeira House | 1990 | no country, no parseable/recognized location, no high-confidence token |
| museum-of-transport-and-communications | Museum of Transport and Communications | 2000 | no country, no parseable/recognized location, no high-confidence token |
| nordic-house | Nordic House | 1968 | no country, no parseable/recognized location, no high-confidence token |
| ohara-house | Ohara House |  | no country, no parseable/recognized location, no high-confidence token |
| prieto-lopez-house | Prieto López House | 1951 | no country, no parseable/recognized location, no high-confidence token |
| q115728606 | Q115728606 |  | no country, no parseable/recognized location, no high-confidence token |
| q115729435 | Q115729435 |  | no country, no parseable/recognized location, no high-confidence token |
| q115729496 | Q115729496 |  | no country, no parseable/recognized location, no high-confidence token |
| q115729511 | Q115729511 |  | no country, no parseable/recognized location, no high-confidence token |
| q115729853 | Q115729853 |  | no country, no parseable/recognized location, no high-confidence token |
| q115729861 | Q115729861 |  | no country, no parseable/recognized location, no high-confidence token |
| q116481414 | Q116481414 | 1984 | no country, no parseable/recognized location, no high-confidence token |
| q116771232 | Q116771232 |  | no country, no parseable/recognized location, no high-confidence token |
| q11814621 | Q11814621 |  | no country, no parseable/recognized location, no high-confidence token |
| q134570599 | Q134570599 |  | no country, no parseable/recognized location, no high-confidence token |
| q136394553 | Q136394553 | 2001 | no country, no parseable/recognized location, no high-confidence token |
| the-modulightor-building | The MODULIGHTOR Building |  | no country, no parseable/recognized location, no high-confidence token |
| william-beard-residence | William Beard Residence |  | no country, no parseable/recognized location, no high-confidence token |
| zip-up-house | Zip-Up House |  | no country, no parseable/recognized location, no high-confidence token |
