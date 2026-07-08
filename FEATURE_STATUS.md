# Feature Status

Last updated: 2026-06-10

Purpose: identify what is production, what has been validated, what remains prototype, and what has been archived.

## Production

| Feature | Status | Notes |
|---|---|---|
| Home | Production | Main entry page |
| Building detail | Production | Core archive/learning entry surface |
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
| Minimal tests | Production governance | Smoke safety net |

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
