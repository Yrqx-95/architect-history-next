# Project Recovery Audit - 2026-06

Generated: 2026-06-12

Project: Archistory / Architect History (`/Users/liquanxing/Downloads/archistory`)

## Current Project Summary

Archistory is a Next.js App Router application backed by Supabase. The current product shape matches the root docs: an architecture learning navigator with public archive pages for buildings, architects, styles, countries, types, eras, search, timeline, glossary, code topics, graph, map, paths, and feedback.

The app is recoverable and currently builds locally. However, the repository and production database are not in a clean release-ready state. The highest risk is not the frontend. The highest risk is Supabase security: the live public schema has RLS disabled on exposed tables, and `anon` / `authenticated` have broad write/delete/truncate privileges.

Recommendation in one sentence: continue the project, but pause all feature work until the database permissions, repository state, and content-quality gates are stabilized.

## Documentation Read First

Read:

- `README.md`
- `STATUS.md`
- `ROADMAP.md`
- `DOCUMENT_INDEX.md`
- `SCRIPT_REGISTRY.md`
- `PRODUCT_SURFACE.md`
- `FEATURE_STATUS.md`

The docs consistently say: no new features, no redesign, repository cleanup first, data/content quality next, image authority unresolved, and learning experiments paused.

Important mismatch: `STATUS.md` says the current data audit has 0 errors with remaining warnings/info. The 0-error part is true, but the current run produced 3787 non-error issues, so the real state is still content-quality-heavy.

## Codebase Structure

Routes:

- 23 `page.tsx` route files under `src/app`
- Dynamic locale routing under `src/app/[lang]`
- Public route groups include home, search, browse, building detail, architect detail, style, country, type, era, learn, paths, timeline, glossary, code, graph, map, feedback
- API routes: `/api/search`, `/api/image-proxy`

Components:

- Core UI components live in `src/components`
- Search components live in `src/components/search`
- Gallery components live in `src/components/image-gallery`
- Navigation/language/theme/client providers exist: `LanguageSwitcher`, `MobileNav`, `ChineseScriptProvider`, `ChineseScriptToggle`, `SystemThemeSync`, `ScrollRevealProvider`

Lib/content:

- Supabase access: `src/lib/supabase.ts`, `src/lib/data.ts`
- Display/i18n/taxonomy: `src/lib/i18n.ts`, `src/lib/locale.ts`, `src/lib/display.ts`, `src/lib/taxonomy-display.ts`, `src/lib/taxonomy.ts`
- Learning/code/glossary content is partly local under `src/lib` and `src/content`

Scripts:

- Governance scripts exist for data audit, type/style/country normalization, orphan styles, image audit/cache/registry, content coverage, and portrait reporting
- `SCRIPT_REGISTRY.md` is broadly aligned with actual scripts

Database/Supabase:

- Local migrations exist under `db/migrations`
- Supabase project id inferred from config: `usuqjsjluietcnudxwvz`
- Supabase migration list from platform API returned empty, so local migrations are not reflected as managed Supabase migrations

i18n:

- Supported languages: `zh`, `en`, `ja`
- Root route redirects based on `Accept-Language`
- Language switcher preserves current route slug on detail pages
- Chinese simplified/traditional display toggle exists for Chinese pages

Package scripts:

- `dev`, `build`, `start`, `lint`, `typecheck`
- `test`, `test:unit`, `test:e2e`
- data/image/content governance scripts

## Local Run And Checks

Dependencies:

- `node_modules` already existed; no install was performed.

Commands run:

| Command | Result |
|---|---|
| `npm run typecheck` | Pass |
| `npm run lint` | Pass |
| `npm run build` | Pass |
| `npm run data:audit` | Pass, generated 3787 issues with 0 errors |
| `npm run test:unit` | Pass, 1 file / 3 tests |
| `PLAYWRIGHT_BASE_URL=http://localhost:3001 npm run test:e2e` | Pass, 6 tests |

Build status:

- `next build` completed successfully with Next.js 16.2.6 and Turbopack
- Generated 3396 static pages
- Build warning: using edge runtime on a page disables static generation for that page
- No local Vercel build break found

Local server notes:

- A pre-existing Next dev server was already running at `localhost:3001` with PID `11474`
- My attempted `npm run dev` did not remain running because Next detected the existing server
- Playwright failed against `127.0.0.1:3000` because no server was there
- Playwright passed against `http://localhost:3001`
- Next dev log warned that `127.0.0.1` cross-origin access to dev resources was blocked; use `localhost` or configure `allowedDevOrigins` for that dev workflow

## Current Product Surface

Smoke-tested representative pages:

| Surface | Route | Result |
|---|---|---|
| Home | `/zh` | 200, renders content |
| Search | `/en/search` | 200, renders search UI |
| Search interaction | `/en/search?q=villa+savoye` | Finds `Villa Savoye` |
| Architect detail | `/zh/architect/le-corbusier` | 200 |
| Building detail | `/en/building/villa-savoye` | 200 |
| Style page | `/ja/browse/style/modernism` | 200, but broken images present |
| Learn | `/zh/learn` | 200 |
| Browse | `/en/browse` | 200 |
| Timeline | `/ja/timeline` | 200 |
| Glossary | `/en/glossary` | 200 |
| Code topic | `/ja/code/floor-area-ratio` | 200 |
| Map | `/zh/map` | 200 |
| Graph | `/en/graph` | 200 |
| Feedback | `/ja/feedback` | 200 |

Navigation:

- Main nav links exist for learn, browse/archive, architects, buildings, styles, relations/graph, countries, code, glossary, timeline, search, feedback
- Footer exposes browse, era, style, learning, and feedback links

Language switching:

- Three language links are present on tested pages
- On `/zh/building/villa-savoye`, links point to `/zh/building/villa-savoye`, `/en/building/villa-savoye`, `/ja/building/villa-savoye`

Runtime issues observed:

- Some pages emit image proxy `400 Bad Request` console errors
- Some pages emit LCP image warnings about above-the-fold images not using eager/priority loading
- `/en/glossary` emitted a React hydration mismatch warning
- Earlier dev log also recorded hydration mismatch on browse/buildings caused by client/server attribute differences around reveal styles

## Data Status

From `npm run data:audit`:

| Table | Rows |
|---|---:|
| architects | 106 |
| buildings | 875 |
| styles | 43 |
| eras | 12 |
| building_types | 20 |
| images | 7276 |

Additional live data aggregation:

| Metric | Count |
|---|---:|
| country codes in buildings | 52 |
| country names in buildings | 25 |
| country code/name pairs | 73 |

Data audit summary:

| Severity | Count |
|---|---:|
| error | 0 |
| warning | 1297 |
| info | 2490 |
| total | 3787 |

Top data issues:

| Field | Count |
|---|---:|
| `era_slug` | 875 |
| `description` | 875 |
| `significance` | 872 |
| `name_ja` | 743 |
| `type_slug` | 352 |
| `country_code` | 52 |
| `architect_slug` | 17 |
| `year_start` | 1 |

Missing translations/content:

- Buildings missing Japanese names: 743
- Buildings missing Chinese names: 743
- Buildings with missing/short zh/en description: 875
- Buildings with missing/short zh/en significance: 875
- Architects missing Japanese names: 5
- Architects missing Chinese names: 7
- Architects missing zh/en bio content: 57
- Styles/types have zh/ja names filled in the current queried data

Slug and taxonomy status:

- Broken slug shape: none found for architects/buildings/styles/types/eras
- Duplicate slugs: none found for architects/buildings/styles/types
- Unmapped type slugs: none found
- Unmapped style slugs: none found
- Unmapped era references exist: 10 non-slug Chinese/Japanese-style era labels, including `古典时代`, `文艺复兴`, `巴洛克`, `当代`, `20世纪现代主义`, `现代主义大师`

Empty or placeholder fields:

- Placeholder scan found 0 obvious `TODO` / `TBD` / lorem / placeholder markers in sampled text fields
- The real problem is missing or too-short content, not literal placeholder text

Images:

- Database includes non-displayable image-like URLs such as `.svg`, `.pdf`, `.ogg`
- `isDisplayableImageUrl` filters many of these, but rendered pages still show image proxy failures
- `/ja/browse/style/modernism` had 34 images and 8 broken rendered images in the Playwright smoke check

## Security Risks

### 2026-06-13 P0 Security Repair

Applied Supabase migrations through the Supabase plugin:

- `20260612162851_lock_down_public_read_permissions_v2`
- `20260612164824_revoke_public_postgis_metadata_access`

Local migration record added:

- `db/migrations/v11-lock-down-public-read-permissions.sql`

What changed:

- Enabled RLS on application-owned public archive tables:
  `architects`, `buildings`, `images`, `styles`, `eras`, `building_types`,
  `architect_styles`, `building_styles`, `architect_eras`, `building_eras`,
  `style_eras`, `architect_influences`, `sources`, `tags`
- Added explicit public SELECT-only policies for `anon` and `authenticated`
- Revoked broad table, sequence, and function privileges from API roles
- Revoked public access to `building_summary` and changed it to `security_invoker`
- Set `public.update_building_search()` search path to `public, pg_temp`
- Attempted to remove PostGIS metadata/function exposure; these objects remain owned/granted by `supabase_admin` and need separate extension-owner remediation

Verification after repair:

- Anonymous Supabase client can still read `buildings` and sees 875 rows
- Anonymous insert/update/delete against `buildings` now fails with `permission denied for table buildings`
- `npm run typecheck` passed
- `npm run lint` passed
- `npm run data:audit` passed with the same 3787 data-quality issues
- `npm run build` passed and generated 3396 static pages
- `npm run test:unit` passed
- `PLAYWRIGHT_BASE_URL=http://localhost:3001 npm run test:e2e` passed

Residual security items:

- Supabase Advisor still reports `public.spatial_ref_sys` RLS disabled. Enabling RLS failed because the migration role is not the owner of this PostGIS extension table.
- Supabase Advisor still reports `cube`, `earthdistance`, `pg_trgm`, and `postgis` installed in `public`.
- Supabase Advisor still reports public/authenticated execution for `public.st_estimatedextent(...)`. Direct revoke statements succeeded syntactically but did not remove ACL entries granted by `supabase_admin`; this likely requires extension-owner remediation or moving PostGIS-related extensions out of `public`.

P0: live Supabase permissions are unsafe.

Supabase Advisor security findings:

- `security_definer_view`: `public.building_summary` is a security definer view. Remediation: [Supabase lint 0010](https://supabase.com/docs/guides/database/database-linter?lint=0010_security_definer_view)
- `function_search_path_mutable`: `public.update_building_search` has mutable search path. Remediation: [Supabase lint 0011](https://supabase.com/docs/guides/database/database-linter?lint=0011_function_search_path_mutable)
- `rls_disabled_in_public`: RLS disabled on public exposed tables including `architects`, `buildings`, `images`, `styles`, `eras`, `building_types`, and relationship tables. Remediation: [Supabase lint 0013](https://supabase.com/docs/guides/database/database-linter?lint=0013_rls_disabled_in_public)
- `extension_in_public`: `cube`, `earthdistance`, `pg_trgm`, `postgis` installed in public schema. Remediation: [Supabase lint 0014](https://supabase.com/docs/guides/database/database-linter?lint=0014_extension_in_public)
- public can execute `SECURITY DEFINER` PostGIS functions. Remediation: [Supabase lint 0028](https://supabase.com/docs/guides/database/database-linter?lint=0028_anon_security_definer_function_executable)
- signed-in users can execute the same functions. Remediation: [Supabase lint 0029](https://supabase.com/docs/guides/database/database-linter?lint=0029_authenticated_security_definer_function_executable)

Direct SQL confirmation:

- Original audit: 15 public base tables queried had `rls_enabled=false`
- Original audit: `anon` had `DELETE`, `INSERT`, `REFERENCES`, `SELECT`, `TRIGGER`, `TRUNCATE`, `UPDATE` on 18 public relations
- Original audit: `authenticated` had the same broad privileges on 18 public relations
- After repair: application-owned archive tables have RLS enabled and SELECT-only public policies
- After repair: core application table write attempts with anon are denied

This was the highest-priority risk and has been partially remediated for application-owned archive tables. Remaining Supabase extension-owned objects still need a separate security cleanup.

Other security/config risks:

- `vercel.json` is tracked and contains production Supabase URL and anon key. The anon key is designed for browser use, but hardcoding deployment env config in Git increases rotation and environment drift risk.
- `.env.local` exists and contains all required keys, including `SUPABASE_SERVICE_ROLE_KEY`; it is ignored and not tracked.
- Inline scripts exist in `src/app/[lang]/layout.tsx` for theme prepaint and Chinese script prepaint. They are small and intentional, but they require CSP planning if stricter security headers are added.

## Data Quality Risks

The app has enough curated/local overlay content to look useful on key pages, but the database is not uniformly product-quality.

Main risks:

- All 875 buildings lack `era_slug` according to the current audit
- 352 buildings lack `type_slug`
- 743 buildings lack zh/ja localized names
- 875 buildings have missing or short zh/en descriptions
- 872 buildings have missing or short zh/en significance
- 52 buildings lack `country_code`
- 17 buildings lack `architect_slug`
- Homepage displays filtered product counts such as 518 buildings, while the database has 875 buildings; this may be intentional quality filtering, but should be documented clearly to avoid confusion
- Image registry/source authority remains unresolved; rendered proxy failures show this is user-visible

## Build And Deployment Status

Local:

- TypeScript: pass
- ESLint: pass
- Production build: pass
- Unit tests: pass
- E2E smoke tests: pass on `localhost:3001`

Vercel:

- `vercel.json` specifies Next.js framework, `next build`, `.next`
- Local `next build` succeeds, so no immediate Vercel build failure was reproduced
- Deployment environment is partly hardcoded in `vercel.json`, which should be replaced with Vercel-managed environment variables

Supabase:

- App can read current data and build pages
- Supabase managed migration list is empty
- Local migrations and live database state have drifted, especially around RLS

## What Already Works

- The app builds with Next.js 16.2.6
- Core public pages render
- Search API returns expected building results
- Image proxy rejects untrusted domains
- Language redirects and language switcher work in smoke tests
- Type/style slug mapping is clean
- Slug format and duplicate slug checks are clean
- Existing unit/e2e smoke tests still provide a useful baseline
- Documentation has a coherent recovery direction: stabilize, do not expand

## What Is Broken

- Live Supabase security posture is broken: RLS off plus broad anon/auth write privileges
- Supabase platform migrations are not tracking local migrations
- Rendered pages show image proxy 400s and broken images
- Hydration mismatch warnings exist on some pages
- `npm run test:e2e` fails if pointed at `127.0.0.1:3000`; it passes with correct `localhost:3001`
- Browser plugin could not open localhost due `ERR_BLOCKED_BY_CLIENT`, so rendered QA used Playwright fallback

## What Is Incomplete

- Building content quality is incomplete at scale
- Era assignment is incomplete
- Building type assignment is incomplete
- Country-code completion is incomplete
- Japanese and Chinese building names are incomplete
- Image authority/storage strategy is incomplete
- Sitemap/robots/hreflang alternates are missing or not implemented as route files
- CMS/admin remains only an idea and should stay paused

## What Is Outdated

- Root status is optimistic relative to current audit volume
- Local migration baseline says RLS should be enabled, but live Supabase says it is not
- Supabase migrations appear unmanaged on the platform
- Historical deployment notes in `docs/STATUS.md` should not be treated as current deployment proof
- Git worktree contains many uncommitted/untracked files, so current repo state is difficult to reason about as a release baseline

## Recommended Next 10 Actions

1. Finish Supabase extension-owned security cleanup: move PostGIS/cube/earthdistance/pg_trgm out of `public` or use an owner-level migration to remove public exposure for `spatial_ref_sys` and `st_estimatedextent`.
2. Rotate Supabase anon/service keys if there is any chance the previous broad privileges were exposed publicly; remove hardcoded env values from `vercel.json`.
3. Reconcile live Supabase schema with `db/migrations`; create a current schema dump and adopt migrations as the source of truth from this point forward.
4. Commit or intentionally discard the current worktree in small groups: docs, production code, data governance, generated reports, images, tests.
5. Fix image proxy failures and identify the top broken image sources shown on style/browse/learn/timeline pages.
6. Fix hydration mismatch warnings around reveal/client-only attributes and glossary rendering.
7. Restore data audit expectations: document that 0 errors still leaves 3787 warnings/info, and make warnings trend visible.
8. Prioritize data cleanup in this order: `era_slug`, `type_slug`, `country_code`, building localized names, descriptions, significance.
9. Add sitemap/robots/hreflang metadata strategy before any SEO push.
10. Keep feature expansion frozen until the above items are resolved and `typecheck`, `lint`, `build`, `data:audit`, unit tests, and e2e tests are all stable release gates.

## Continue, Pause, Or Simplify?

Continue, but in recovery mode.

Do not pause the project permanently: the product already has a real surface, a working build, multilingual routes, search, detail pages, learning entry points, and enough data to be meaningful.

Do pause new features and UI redesigns. The next phase should be simplification and hardening: secure Supabase, clean the repository state, fix visible image/runtime warnings, and make the data quality workflow honest and repeatable.

If time is limited, simplify the product promise to: "a multilingual architecture archive with learning-oriented entry points." Defer graph/map/advanced learning layers until the database and content foundation are trustworthy.

## Files Changed By This Audit

Expected audit/report changes:

- `docs/reports/PROJECT_RECOVERY_AUDIT_2026-06.md` - created as requested
- `db/migrations/v11-lock-down-public-read-permissions.sql` - added to record the Supabase security lockdown applied on 2026-06-13
- `reports/data-audit.json` - generated/updated by `npm run data:audit`
- `reports/data-audit.md` - generated/updated by `npm run data:audit`

No product code was intentionally modified.
