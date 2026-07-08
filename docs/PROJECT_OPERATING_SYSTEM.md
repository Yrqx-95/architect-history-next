# Project Operating System

Last updated: 2026-07-08

Purpose: keep Archistory easy to maintain for years without making the process heavy.

## One Rule

Every change should make the project easier to understand, not harder.

If a file, script, image, or document needs explanation, put that explanation where the next maintainer will actually find it.

## Start Here

For normal work, read only these first:

1. `STATUS.md`
2. `DOCUMENT_INDEX.md`
3. `docs/WORKLOG.md`
4. the feature doc for the area you are touching

For AI-assisted work, also read `docs/AI_AGENT_RULES.md`.

## Where Things Belong

| Thing | Put it here |
|---|---|
| current project overview | root docs or `docs/` |
| old reports and old plans | `docs/archive/` |
| generated script output | `reports/` |
| source CSV and manifests | `content/` |
| app-consumed content | `src/content/` |
| public exported data | `public/data/` |
| runtime images | `public/images/` |
| repeatable tools | `scripts/` |

Do not add new root-level sprint reports. Do not use `git clean` to make the tree look tidy.

## Work Rules

1. Find the source of truth before editing.
2. Keep changes small enough to review.
3. Do not delete untracked files just because they are untracked.
4. If moving a file, update references and `DOCUMENT_INDEX.md`.
5. If adding a script, update `SCRIPT_REGISTRY.md`.
6. If changing visible product behavior, update `docs/WORKLOG.md`.
7. If changing user flow or visual design, also update `docs/USER_SIMULATION_LOG.md`.
8. Remove local caches after verification: `.next/` and `tsconfig.tsbuildinfo`.

## Validation

Use the smallest check that matches the risk:

| Change | Check |
|---|---|
| docs only | search moved paths with `rg` |
| data/content | run the relevant audit script |
| graduation data | `npm run graduation:audit` |
| TypeScript or React | `npm run typecheck` and `npm run lint` |
| route or image behavior | local 200 smoke test |
| release candidate | `npm run build` and browser/Playwright QA |

Do not say a task is fully done if the matching check was not run.

## Worklog Template

Use this for meaningful entries in `docs/WORKLOG.md`:

```markdown
## YYYY-MM-DD - Short Title

### Intent
- What was the goal?

### Changes
- What changed?

### Validation
- What passed?
- What was not run?

### Remaining Risk
- What might still be wrong?

### Rollback Scope
- Which files belong together if reverted?

### Next Step
- One concrete next action.
```

## Done Means

1. The requested change works.
2. The right docs or logs are updated.
3. The right validation passed.
4. Generated caches are gone.
5. Remaining risk and next step are clear.
