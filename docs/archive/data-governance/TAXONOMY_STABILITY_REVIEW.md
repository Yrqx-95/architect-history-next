# Taxonomy Stability Review

Date: 2026-06-08

## Scope

Final engineering consistency review for the style taxonomy cleanup. This review did not add product features. It checked migration safety, canonical style stability, alias correctness, normalization behavior, and final verification commands.

## Migration Review

### `v6-style-taxonomy-finalization.sql`

Status: safe to keep.

- Execution order: must run before `v6-normalize-remaining-style-slugs.sql`, because the normalization migration points buildings to the new canonical `styles.slug` values.
- Idempotency: uses `INSERT ... ON CONFLICT (slug) DO UPDATE`, so repeat execution does not create duplicate style rows.
- Duplicate insert risk: low. `slug` is unique and every inserted row is keyed by slug.
- Existing assignment risk: low. This migration only upserts rows in `styles`; it does not touch buildings.

Adjustment made during this review:

- Changed `structural-expressionism.parent_slug` from `high-tech` to `NULL`, because some assigned works, such as Gateway Arch, are structural/formal expression but not high-tech.
- Changed `natural-materials.parent_slug` from `eco-architecture` to `NULL`, because material expression is not always ecological architecture.

### `v6-normalize-remaining-style-slugs.sql`

Status: safe to keep after adjustment.

Original risk found:

- The migration initially used full-array replacement such as `SET style_slugs = ARRAY[...]`.
- That was correct for the current snapshot but could overwrite later unrelated style assignments if the migration were replayed after future editorial updates.

Fix applied:

- Rewrote the migration to use `array_replace(style_slugs, old, new)` with `old = ANY(style_slugs)`.
- This preserves unrelated assignments and is repeat-safe.
- Re-running it after normalization performs no changes.

Current behavior:

- Idempotent: yes.
- Preserves existing unrelated style assignments: yes.
- Requires v6 canonical style migration first: yes.

## Canonical Style Stability

### Suitable For Long-Term Taxonomy

These are stable architectural history categories or durable form/material tendencies:

- `structural-expressionism`
- `sculptural-architecture`
- `geometric-abstraction`
- `exposed-concrete`
- `prairie-school`
- `expressionism`
- `adaptive-reuse`
- `industrial-reuse`
- `urban-design`

Notes:

- `prairie-school` is a recognized historical movement and can remain as a canonical style.
- `expressionism` overlaps with modernism historically, but it is a distinct enough movement/tendency to keep.
- `adaptive-reuse` and `industrial-reuse` are strategies rather than pure styles, but the current `styles` table already functions as a broader taxonomy of movements, tendencies, and design approaches.

### Keep, But Watch

These are usable now, but should be reviewed if the taxonomy later splits into style / material / strategy facets:

- `natural-materials`: better understood as material expression than style.
- `emergency-architecture`: context/use-case driven, not a classical style. It is acceptable as a design-practice category for now, but could move to a future `design_approaches` or `project_contexts` taxonomy.

### Suggested Future Renaming Or Grouping

No immediate rename is required for data stability, but future governance could improve clarity:

- Consider a broader taxonomy label such as `design-approach` or a separate table if `adaptive-reuse`, `urban-design`, `industrial-reuse`, and `emergency-architecture` grow.
- Consider separating material tendencies (`exposed-concrete`, `natural-materials`) from historical styles if the archive needs stricter art-history classification.
- Keep `sculptural-architecture` broad; do not split into project-specific shape labels.

## Alias Review

File: `scripts/style-slug-aliases.json`

Final checks:

- Alias count: 49
- Invalid alias targets: 0
- Cycles: 0
- Self-maps: 0

Multiple aliases to one canonical target exist, but they are expected synonym/fallback cases:

- `modernism`: `现代主义`, `现代主义建筑`, `早期现代主义`
- `renaissance`: `文艺复兴建筑`, `文艺复兴`
- `baroque`: `巴洛克建筑`, `巴洛克`
- `japanese-modern`: `日本现代建筑`, `现代日本`
- `classical`: `古典主义`, `古典建筑`
- `international-style`: `国际式`, `国际风格`

No one-to-many ambiguity was found in the JSON structure because each alias key maps to exactly one canonical slug.

## Normalize Script Review

File: `scripts/normalize-style-slugs.ts`

Status: safe after adjustment.

Verified behavior:

- Dry-run and write share the same change generation path.
- Alias targets are validated before any write.
- Canonical slugs are not remapped unless they appear as alias keys.
- Duplicate style slugs are removed after mapping.
- Re-running after normalization reports 0 updated buildings and 0 updated assignments.
- Re-running `--write` after normalization does not overwrite the existing v6 migration with a no-op file.

Adjustment made during this review:

- SQL generation now emits `array_replace` updates for replacements instead of full-array updates.
- The script writes `db/migrations/v6-normalize-remaining-style-slugs.sql` only when `--write` has actual changes.

Repeat-run check:

- Dry-run after normalization: 0 changes.
- Write after normalization: 0 changes.
- Migration hash remained unchanged before and after repeat `--write`.

## Final Audit Results

`npm run data:audit`:

```text
exit status: 0
total issues: 4953
errors: 0
warnings: 2463
info: 2490
```

`npm run data:orphan-styles`:

```text
exit status: 0
orphan assignments: 0
unique orphan values: 0
```

## Final Verification

Passed:

```bash
npm run data:audit
npm run data:orphan-styles
npm run lint
npm run typecheck
npm run build
npm test
```

Known non-blocking test logs:

- Playwright web server still logs `Internal: NoFallbackError` during intentional 404 checks.
- Image proxy tests may log invalid remote image warnings while still passing expected assertions.

## Remaining Risks

1. The `styles` table is currently doing more than strict style classification; it also holds design strategies, material tendencies, and urban-scale approaches. This is acceptable for now but should be revisited if taxonomy navigation becomes more formal.
2. `emergency-architecture` is the weakest long-term canonical style. It is defensible as a practice/context category, but would be a candidate to move if a separate `project_contexts` taxonomy is introduced.
3. The current local environment lacks Supabase CLI or `psql`; canonical style rows were synced via Supabase client, while migration SQL records the replayable source of truth.
