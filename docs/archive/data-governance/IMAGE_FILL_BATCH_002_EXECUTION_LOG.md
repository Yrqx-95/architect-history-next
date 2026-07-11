# Image Fill Batch 002 Execution Log

- Project: `architect-history`
- Supabase project ID: `usuqjsjluietcnudxwvz`
- Applied at: 2026-07-11 (Asia/Tokyo)
- Scope: replace 32 reviewed low-confidence Unsplash primary images with verified Wikimedia Commons images.

## Review gates

- Building identity checked against the catalog building row, Wikidata P18 evidence, Commons title/description, and a visual review of the downloaded thumbnail.
- Copyright metadata required an accepted open license, photographer/creator, and Commons source URL.
- CC BY, CC BY-SA, CC0, and Public domain were accepted; NC, ND, unknown, or incomplete attribution was rejected.
- Construction-progress, model/exhibition, unresolved Q-ID placeholder, obvious same-name mismatch, and poor/ambiguous hero candidates were held.
- Candidates that could not be visually downloaded because of Wikimedia rate limiting were held rather than inferred safe.

## Applied buildings (32)

- `1-spring-street`
- `akai-house`
- `alvar-aalto-aerola-1953`
- `andre-malraux-cultural-centre`
- `australia-square-tower`
- `baloise-bellinzona`
- `bianda-house`
- `big-roof`
- `bunshaft-residence`
- `burroughs-wellcome-company-corporate-headquarters`
- `campbell-sports-center`
- `centro-de-arte-contemporanea-graca-morais`
- `constance-perkins-house`
- `cuadra-san-cristobal`
- `hooper-house-baltimore-county-maryland`
- `intiland-tower`
- `ishigaki-civic-hall`
- `ishikawa-ongakudo`
- `jyvaskyla-workers-club`
- `kagawa-prefectural-government-office-main`
- `marcel-breuer-house-ii`
- `niigata-city-art-museum`
- `prieto-lopez-house`
- `san-giovanni-battista`
- `standard-rental-house-by-alvar`
- `tehtaanmaki`
- `toulouse-school-of-economics`
- `tour-de-lille`
- `toyama-shimin-plaza`
- `university-center-management-sciences-bordeaux`
- `valtiontalo`
- `villa-tammekann`

## Explicit hold examples

- `20-times-square`: construction-progress image.
- `hirosaki-civic-hall`: candidate metadata says Hirosaki City Hall, not Civic Hall.
- `zip-up-house`: model/exhibition image.
- `alfred-lerner-hall`, `kinokuniya-hall`: required creator attribution missing.
- `q115688741`, `q123419260`, `q123419408`, `q123419414`, `q124744900`, `q125398396`, `q17369491`, `q5761063`, `q5818111`, `q8341610`: unresolved Q-ID placeholder identity.
- Commons-search `needs_review` candidates were not uploaded without exact entity proof.

## Database execution

- One transaction with preconditions; no partial write.
- Matched buildings before write: 32/32.
- Existing primary image before write: exactly one Unsplash primary for 32/32.
- Duplicate target source URLs before write: 0.
- Inserted Commons primary images: 32.
- Demoted previous Unsplash primary images: 32.

## Verification

- Affected buildings: 32.
- Exactly one primary image: 32/32.
- Commons primary image: 32/32.
- Missing photographer, license, or source URL: 0.
- Rejected NC/ND license rows: 0.
- Unsplash still primary among affected buildings: 0.
- Full image audit: 7,321 total rows; 4,903 Commons rows; 0 missing licenses; 0 missing source URLs; 0 invalid URLs.

## Remaining risk

- Wikimedia rate limiting prevented visual download of some otherwise safe-auto candidates; these remain held for a later review pass.
- The current queue's Commons keyword-search results remain noisy and require manual entity verification.
