# Duplicate Primary Image Review 001

Status: reviewed, applied and write-verified

Reviewed: 2026-07-13

Production migration: `20260713114101 duplicate_primary_image_review_001`

## Scope

The first review batch covers the four smallest Commons-vs-Commons conflicts from the 502-building duplicate-primary queue. Eight primary rows were visually compared. The remaining 498 buildings stay unreviewed and are not authorized for mutation.

## Decisions

| Building | Keep | Demote | Reason | Metadata repair |
|---|---|---|---|---|
| `paimio-sanatorium` | Tero Karppinen exterior | missing Jpatokal file | The retained image visibly belongs to the sanatorium; the old Commons page and original asset no longer exist. | Replace the broken thumbnail URL with the current Commons thumbnail. |
| `saynatsalo-town-hall` | Tiia Monto courtyard exterior | Antti Leppänen interior safe | The exterior identifies the red-brick town-hall complex; an interior furniture detail is not a primary building view. | Correct `Tiera / CC BY-SA 3.0` to `Tiia Monto / CC BY-SA 4.0`; add current thumbnail. |
| `yoyogi-national-gymnasium` | Rs1421 entrance/building view | weak bridge/context view | The retained image identifies the stadium; the alternative leaves the building at the edge of the frame. | Correct photographer `Kakidai` to `Rs1421`; add current thumbnail. |
| `finlandia-hall` | Thermos facade view | Korandgen wide exterior | The retained image is the stronger facade composition and matches the existing local override. | Correct `CC BY-SA 3.0` to `CC BY 2.5`; add current thumbnail. |

## Evidence

Building identity was checked against the official [Paimio Sanatorium history](https://paimiosanatorium.com/sanatorium/history/), [Alvar Aalto Foundation Säynätsalo page](https://www.alvaraalto.fi/en/architecture/saynatsalo-town-hall/), [Japan Sport Council Yoyogi guide](https://www.jpnsport.go.jp/yoyogi/Portals/0/yoyogi/pdf/2025/241228_yoyogi%20national%20stadium_information%20flyer%EF%BC%88english%EF%BC%89.pdf), and [Finlandia Hall architecture page](https://www.finlandiatalo.fi/en/finlandia-hall/architechture-design/).

Photographer, license, file status and current asset URLs were rechecked through Wikimedia Commons `imageinfo` and `extmetadata` on 2026-07-13. This check found three attribution mismatches in the database and one deleted Commons file.

## Execution

The migration passed an isolated PostgreSQL 18.3 dry-run with two forward/rollback cycles and replay refusal. The fresh production precheck found all eight reviewed rows, all eight prior primary flags and all four building identities unchanged. The guarded migration then applied successfully.

Write verification found exactly one primary image for each reviewed building, with the reviewed photographer, license and reachable thumbnail. The current production audit now reports 1,444 primary rows, 498 duplicate-primary buildings and zero buildings without a primary image. All remaining conflicts are Commons-vs-Unsplash and still require visual review.

Reviewed production release `29247544053` completed the clean quality gate, full test suite, Cloudflare deployment and route-semantics checks. Targeted live verification then found that Finlandia Hall's cached runtime override still exposed its old `CC BY-SA 3.0` value even though the database row had been corrected to Commons' current `CC BY 2.5`. The runtime-alignment follow-up corrects that override and makes the audit account for both cached and curated override layers; it requires one final Reviewed release.

Machine-readable decision: `db/review-decisions/duplicate-primary-image-review-001.json`
