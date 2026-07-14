# Architect identity Aravena 001

- Status: reviewed and applied; isolated PostgreSQL forward/replay/rollback checks and production post-write verification passed.
- Scope: merge the misspelled `alejandro-alavena` duplicate into canonical `aravena`.
- Canonical architect: `5000f72e-c893-4df6-84fe-33617581cd24` / Alejandro Aravena.
- Duplicate architect: `4a93c6b4-c020-4291-bbbf-cb2bd94f5257` / Alejandro Alavena.
- Reviewed buildings: `center-of-innovation-anacleto-angelini`, `edp-headquarters-ii`.

## Evidence

- The [Pritzker Architecture Prize biography](https://www.pritzkerprize.com/biography-ale-jan-dro-ara-ve-na) confirms the correct name, birth year, and ELEMENTAL leadership.
- ELEMENTAL's official archive includes both the [UC Anacleto Angelini Innovation Center](https://www.elementalchile.cl/en/works/centro-de-innovacion-uc-anacleto-angelini) and [EDP Headquarters](https://www.elementalchile.cl/en/works/edp-headquarters).
- The EDP II engineering consultant [credits Architecture to Elemental S.A.](https://www.afaconsult.com/projects/category/en/office/280).
- The production snapshot shows that full biography/taxonomy data belongs to `aravena`; the misspelled duplicate has no UUID relations and is referenced only by the two reviewed buildings.

## Intended change

1. Reassign only the two reviewed `buildings.architect_slug` values to `aravena`.
2. Delete the unreferenced misspelled architect row.
3. Remove the duplicate portrait override.
4. Permanently redirect all three language variants of the misspelled public URL.
5. Preserve all building facts, content, images, taxonomy, and graduation relations.

## Safety

- Forward migration: `supabase/migrations/20260714073151_architect_identity_aravena_001.sql`.
- Guarded rollback: `db/manual-operations/architect-identity-aravena-001-rollback.sql`.
- Isolated verifier: `npm run data:verify-architect-identity-aravena-001`.
- Isolated verifier result: passed on 2026-07-14.
- Production migration `20260714074424_architect_identity_aravena_001` was applied on 2026-07-14.

## Production verification

- Canonical `aravena` architect rows: 1; duplicate or conflicting architect rows: 0.
- Reviewed buildings on `aravena`: 2; remaining `alejandro-alavena` building references: 0.
- Both reviewed building search vectors contain `aravena` and no longer contain `alavena`.
- Stable totals: 942 buildings, 7,292 images, and 88 graduation case profiles.
- Architect total: 148, reduced by exactly the one reviewed duplicate.
- Canonical taxonomy relations remain 2 styles and 1 era.
- Supabase advisors remain at the pre-change baseline: 13 security notices and 27 performance notices; this batch introduced none.
