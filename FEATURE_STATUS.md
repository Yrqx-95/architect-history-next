# Feature Status

Last updated: 2026-07-15

Purpose: identify what is production, what has been validated, what remains prototype, and what has been archived.

## Production

| Feature | Status | Notes |
|---|---|---|
| Home | Production | Main entry page; current production commit `e8976735`, released in Reviewed production release `29394373142`. E5 Chromium QA confirmed one semantic order, Hero → entry → featured → stats → architects, with one stats DOM block and matching DOM/visual/Tab order. |
| Building detail | Production | Core archive/learning entry surface; Parc.1 no-safe policy and NMWA canonical identity/content were verified in production after the reviewed migration. NMWA image authority remains a separate follow-up. |
| Architect detail | Production | Core archive/learning entry surface |
| Search | Production | API and UI are live |
| Browse by country | Production | Includes country index/detail |
| Browse by type | Production | Depends on `type_slug` quality |
| Browse by style | Production | Style taxonomy is stable after cleanup |
| Browse by era | Production | Still limited by missing `era_slug` warnings |
| Learn | Production | Current learning entry point |
| Timeline | Production | Chronological exploration |
| Glossary | Production | Curated term learning |
| Code topics | Production | Learning/code topic surface |
| Image proxy | Production | Runtime image safety support |
| Data audit | Production governance | Release/data safety gate, not user-facing |
| Minimal tests | Production governance | Current release baseline: 74 unit files / 260 tests, 33 / 33 production E2E, and 4,446 generated static pages. |

## Validated

| Feature | Status | Notes |
|---|---|---|
| Why Study This | Validated | Good direction for V1 building-page learning block, not yet productized |
| Learning Bridge | Validated | Useful editorial bridge to exam/design/history learning, not yet productized |
| Product as Architecture Learning Navigator | Validated | Current positioning |
| Data governance workflow | Validated | Audit + dry-run + rollbackable migration pattern is working |
| Type/style normalization workflow | Validated | Error-level taxonomy issues are resolved |

## Prototype

| Feature | Status | Notes |
|---|---|---|
| Active Learning | Prototype | Strong prompt model, but needs UI and response pattern |
| Learning Graph | Prototype | Existing code/concept, but not fully unified as product navigation |
| Design Decision | Prototype | Good trade-off learning format, should wait for V2 |
| P0 type manual review workflow | Prototype/governance | Script exists; depends on human decisions |
| Curated image registry table | Prototype/pending | Migration exists but image authority is not settled |
| CMS/Admin | Prototype idea | Do not build before content governance stabilizes |

## Archived

| Feature / Artifact | Status | Location |
|---|---|---|
| Benchmark audits | Archived | `docs/archive/product-audits/` |
| Page review reports | Archived | `docs/archive/product-audits/` |
| Data sprint reports | Archived | `docs/archive/data-governance/` |
| Learning experiment reports | Archived | `docs/archive/learning-experiments/` |
| Research report | Archived | `docs/archive/research/` |
| Repository/product consolidation reports | Archived | `docs/archive/reports/` |

## Current Product Rule

Production features can be fixed and stabilized.

Validated and prototype features should not receive new expansion until V1 is stable and the repository remains clean.
