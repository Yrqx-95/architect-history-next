# Postmodern Era Style Conflict Review

Generated: 2026-07-09

## Scope

- This is a manual review note for the `style-conflict-review` lane from `reports/era-slug-postmodern-review-queue.md`.
- It does not write Supabase and does not generate a migration.
- The core issue is vocabulary: `postmodern` can mean a chronological bucket for 1980-1999, but several records have style slugs that point to late modernism, high-tech, minimalism, deconstructivism, or regional contemporary work.
- These records should not be presented to readers as uniformly "postmodern style" without a separate style explanation.

## Review Groups

### Hold Out Until Separately Reviewed

These records are too easy to misread if `postmodern` is used without qualification.

| Building | Year | Architect | Current styles | Reason |
|---|---:|---|---|---|
| `national-assembly-dhaka` | 1982 | `louis-kahn` | `modernism`, `brutalism` | Kahn's project belongs more clearly to late modern/brutalist discourse; completion year alone makes it look postmodern. |
| `church-of-light` | 1989 | `tadao-ando` | `minimalism`, `contemporary-japanese` | Ando's work is better explained through minimalism, concrete, light, and Japanese modernity than postmodern style. |
| `water-temple` | 1991 | `tadao-ando` | `minimalism`, `exposed-concrete` | Same Ando issue: chronological bucket may be acceptable, style label would mislead. |
| `naoshima` | 1992 | `tadao-ando` | `minimalism`, `exposed-concrete` | Same Ando issue; review with the Ando group rather than individually. |
| `therme-vals` | 1996 | `zumthor` | `contemporary-swiss`, `minimalism` | Zumthor is better treated through atmosphere/material/minimalism and Swiss contemporary architecture. |
| `kunsthaus-bregenz` | 1997 | `zumthor` | `contemporary-swiss`, `minimalism` | Same Zumthor issue; review with `therme-vals`. |

### Chronological Postmodern Candidate, Style Note Required

These can probably receive `era_slug=postmodern` only if the project treats `postmodern` as a chronological era bucket, not as a style claim.

| Building | Year | Architect | Current styles | Note |
|---|---:|---|---|---|
| `hongkong-bank` | 1985 | `norman-foster` | `high-tech`, `structural-expressionism` | High-tech / structural expressionist reading should remain primary. |
| `menil-collection` | 1987 | `renzo-piano` | `modernism`, `high-tech` | Late-modern/high-tech reading should remain visible. |
| `louvre-pyramid` | 1989 | `im-pei` | `modernism`, `geometric-abstraction` | Geometric modernist reading should remain primary. |
| `bank-of-china-tower` | 1990 | `im-pei` | `modernism`, `geometric-abstraction` | Same Pei/geometric-modern issue as `louvre-pyramid`. |
| `tokyo-metropolitan-government` | 1991 | `kenzo-tange` | `japanese-modern`, `metabolism` | Review as late Tange / Japanese modern-metabolist lineage before writing. |
| `kunsthal` | 1992 | `koolhaas` | `deconstructivism` | Deconstructivism can sit within the broad postmodern period, but should not be flattened into generic postmodernism. |
| `kansai-airport` | 1994 | `renzo-piano` | `high-tech` | High-tech infrastructure reading should stay primary. |
| `dancing-house` | 1996 | `frank-gehry` | `deconstructivism`, `sculptural-architecture` | Deconstructivism can be period-compatible, but the style explanation matters. |
| `guggenheim-bilbao` | 1997 | `frank-gehry` | `deconstructivism`, `sculptural-architecture` | Same Gehry/deconstructivist issue as `dancing-house`. |
| `miho-museum` | 1997 | `im-pei` | `modernism`, `geometric-abstraction` | Pei/geometric-modern reading should remain visible. |
| `kuala-lumpur-airport` | 1998 | `kurokawa` | `high-tech`, `contemporary-architecture` | High-tech/contemporary infrastructure reading should stay primary. |
| `reichstag-dome` | 1999 | `norman-foster` | `high-tech`, `adaptive-reuse` | Adaptive reuse and high-tech civic symbolism are the main style reading. |

## Suggested Batch Rule

- Do not automatically write the 6 hold-out records in a first postmodern batch.
- If a write batch is created, include only the 12 chronological candidates after confirming that `era_slug` is explicitly a time-period field.
- In the write report, say directly that `postmodern` is used as a chronological era bucket, while style pages remain responsible for high-tech, minimalism, deconstructivism, and other stylistic readings.
- Keep style slugs unchanged; do not "fix" these conflicts by deleting meaningful style metadata.

## Recommended Next Step

1. Prepare a small postmodern write batch only for lower-risk chronological candidates.
2. Exclude the 6 hold-out records and the 6 weak-identity records from that first write batch.
3. After the write batch, separately decide whether the hold-out records need era exceptions, style notes, or a clearer era taxonomy label.
