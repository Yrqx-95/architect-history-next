# Content Trust Review: Parc.1 + National Museum of Western Art

Reviewed package: `content-trust-parc1-nmwa-001`
Reviewed at: `2026-07-15T03:32:51.129Z`
Production apply: **not performed**

## Scope and safety

This package contains exactly two buildings:

- `parc1`
- `national-museum-of-western-art`

The preflight used an explicit-field Supabase anon-only read for the two exact slugs and their image rows. It accessed only `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`, with session persistence, token refresh, and URL session detection disabled. The helper did not print credentials, and no database write, migration apply, deploy, or release was performed.

Fresh evidence is retained at `/tmp/archistory-e2-anon-preflight-20260715.json`.

## Supabase tooling check

- Local CLI behavior was checked with `npx --yes supabase --version` (`2.109.1`) and the migration help commands. The migration filename was created by `supabase migration new content_trust_parc1_nmwa_001`, not manually timestamped.
- The current [Supabase CLI migration documentation](https://supabase.com/docs/reference/cli/supabase-migration) and [Supabase changelog](https://supabase.com/changelog) were checked for relevant notices. The changelog's future TypeScript 5 requirement and Node 20 support/deprecation notices do not require a dependency change for this package, so package versions were not changed.
- No CLI login, remote migration apply, service-role access, SQL console, or production mutation was used.

## Parc.1 decision

Current preflight: building `39a3d5b5-0308-47e3-b2fe-aebb164353bf`, 30 image rows, and exactly three primary rows:

- `e93d4cdd-cc96-5de1-94a9-f1f545ece711`
- `648c05b4-77a9-58ec-b7b7-5e6969b4852c`
- `06dfee2c-4c2f-5dd3-8d25-8e3c0c27f6c3`

Metadata changes:

| Field | Before | Reviewed after |
| --- | --- | --- |
| `name_zh` / `name_ja` | empty | `Parc.1` / `Parc.1` |
| `city` | null | `Seoul` |
| `country` / `country_code` | null / `KR` | `South Korea` / `KR` |
| `type_slug` | null | `mixed-use` |
| `architect_slug` | `richard-rogers` | unchanged; project-level RSHP / Richard Rogers evidence only |
| `official_url` | null | RSHP Parc.1 project page |
| `description` / `significance` | null | concise `zh` / `en` / `ja` text grounded in RSHP claims |

Image decision remains `no-safe-image-yet`. The migration sets only the three confirmed unsafe `is_primary` flags to false; it does not delete rows. The curated binary remains in place, while the `parc1` local override mapping is removed. The shared runtime policy then prevents DB or local fallback from presenting those rows as a safe cover or gallery.

The policy is consumed by `getBuildingsWithCovers`, `getSearchIndex`, homepage/featured selection through the cover data path, browse cover data, the building detail gallery resolver, and `ImageGallery`'s accessible empty state. The detail path no longer promotes `supportingImages.slice(0, 1)` for a suppressed building.

RSHP evidence: <https://rshp.com/projects/mixed-use/parc-1/>. The page identifies Parc.1 in Seoul, South Korea, describes the mixed-use composition, and separately lists project directors, project leads, and a co-architect context. The package therefore does not collapse the project team into unconditional sole-person authorship.

## National Museum of Western Art decision

Current preflight: building `17b396f4-6a4c-4e33-963d-dcc697879221`, six image rows, and two current primary rows:

- `cbf9a81a-c87d-51d2-8da0-954cce0d7f5e`: Commons banner, `663highland, cropped by Tmv`, `CC BY 2.5`, 3200×492.
- `f8a78374-d972-5da2-8d2f-9204a7a68310`: Unsplash interior, Alexander Abero, Unsplash License.

Metadata changes:

| Field | Before | Reviewed after |
| --- | --- | --- |
| `name_zh` / `name_ja` | empty | `国立西洋美术馆` / `国立西洋美術館` |
| `architect_slug` | `kunio-maekawa` | `le-corbusier` |
| `city` / `country` | null / null | `Tokyo` / `Japan` |
| `country_code` / `type_slug` | `JP` / `cultural` | unchanged |
| `era_slug` | null | `modern` |
| `official_url` | null | NMWA building page |
| `description` / `significance` | null | concise `zh` / `en` / `ja` text distinguishing designer from supervisors |

The NMWA image decision is **no image-row change in this package**. The NMWA page identifies Le Corbusier as the Main Building designer, lists Junzo Sakakura, Kunio Maekawa, and Takamasa Yoshizaka as supervisors, and gives the Tokyo/1959 facts. The Commons page confirms the banner subject, author/crop attribution, selectable CC BY 2.5 license, and 3200×492 dimensions. However, the banner's extreme aspect ratio is not safe to promote through the existing `object-cover` 16:9 mobile / 2:1 desktop gallery frame without a dedicated crop/presentation decision. The live page currently displays the Unsplash interior in all three languages at the checked 390px and 1440px viewports. Image presentation remains a follow-up.

Official evidence: <https://www.nmwa.go.jp/en/about/building.html>
Commons evidence: <https://commons.wikimedia.org/wiki/File:The_Architectural_Work_of_Le_Corbusier_banner.jpg>

## Guarded artifacts

- Migration: `supabase/migrations/20260715033636_content_trust_parc1_nmwa_001.sql`
- Manual apply parity file: `db/manual-operations/content-trust-parc1-nmwa-001-apply.sql`
- Guarded rollback: `db/manual-operations/content-trust-parc1-nmwa-001-rollback.sql`
- Isolated PostgreSQL verifier: `scripts/verify-content-trust-parc1-nmwa-001-dry-run.mjs`

The forward migration is guarded by the fresh building values, timestamps, exact image row counts, target image IDs, and primary flags. The rollback restores the actual preflight primary state for Parc.1 and the prior NMWA metadata state. Both paths reject replay or drift rather than silently overwriting changes. NMWA image rows are deliberately excluded from the forward update.

## Risks and stopping conditions

- The reviewed content describes the official evidence boundary; it does not create a multi-author schema for Parc.1.
- Parc.1 has no safe primary image after suppression. A future replacement must pass identity, source, author, and license review before any new primary is selected.
- NMWA's current duplicate-primary state is observed and protected by preconditions, but this package does not normalize it because neither candidate passed the crop/presentation bar.
- Production Supabase remains unchanged. Any fresh preflight drift, unknown extra image relation, changed primary state, or changed reviewed text must stop apply/rollback.
