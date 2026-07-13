import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const cases = JSON.parse(fs.readFileSync(path.join(root, 'public/data/graduation/cases.json'), 'utf8'))
  .filter(item => item.status === 'published')
  .sort((a, b) => a.id.localeCompare(b.id))
const applyPath = path.join(root, 'db/manual-operations/graduation-case-compatibility-001-apply.sql')
const rollbackPath = path.join(root, 'db/manual-operations/graduation-case-compatibility-001-rollback.sql')
const sql = value => `'${String(value).replaceAll("'", "''")}'`

if (cases.length !== 101) throw new Error(`Expected 101 published compatibility cases, found ${cases.length}`)
if (new Set(cases.map(item => item.id)).size !== cases.length) throw new Error('Duplicate compatibility CASE IDs')

const values = cases.map(item => `  (${sql(item.id)}, ${sql(JSON.stringify(item))}::jsonb, 'published')`).join(',\n')
const apply = `-- Reviewed graduation CASE compatibility payload foundation.\nBEGIN;\n\nDO $$\nBEGIN\n  IF to_regclass('public.graduation_case_compatibility') IS NOT NULL THEN\n    RAISE EXCEPTION 'graduation_case_compatibility already exists';\n  END IF;\nEND $$;\n\nCREATE TABLE public.graduation_case_compatibility (\n  case_id text PRIMARY KEY CHECK (case_id ~ '^CASE-[0-9]{3}$'),\n  payload jsonb NOT NULL CHECK (jsonb_typeof(payload) = 'object'),\n  publication_status text NOT NULL CHECK (publication_status IN ('published', 'archived')),\n  created_at timestamptz NOT NULL DEFAULT now(),\n  updated_at timestamptz NOT NULL DEFAULT now(),\n  CHECK (payload->>'id' = case_id)\n);\n\nINSERT INTO public.graduation_case_compatibility (case_id, payload, publication_status) VALUES\n${values};\n\nDO $$\nBEGIN\n  IF (SELECT count(*) FROM public.graduation_case_compatibility) <> 101 THEN\n    RAISE EXCEPTION 'expected exactly 101 compatibility rows';\n  END IF;\nEND $$;\n\nALTER TABLE public.graduation_case_compatibility ENABLE ROW LEVEL SECURITY;\nCREATE POLICY graduation_case_compatibility_public_read ON public.graduation_case_compatibility FOR SELECT TO anon, authenticated USING (publication_status = 'published');\nGRANT SELECT ON public.graduation_case_compatibility TO anon, authenticated;\nREVOKE INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER ON public.graduation_case_compatibility FROM anon, authenticated;\n\nCOMMIT;\n`
const rollback = `-- Guarded rollback for graduation CASE compatibility payload foundation.\nBEGIN;\n\nDO $$\nBEGIN\n  IF to_regclass('public.graduation_case_compatibility') IS NULL THEN\n    RAISE EXCEPTION 'graduation_case_compatibility does not exist';\n  END IF;\n  IF (SELECT count(*) FROM public.graduation_case_compatibility) <> 101 THEN\n    RAISE EXCEPTION 'refusing rollback: compatibility row count drifted from 101';\n  END IF;\nEND $$;\n\nDROP TABLE public.graduation_case_compatibility;\nCOMMIT;\n`

fs.writeFileSync(applyPath, apply)
fs.writeFileSync(rollbackPath, rollback)
console.log(`Prepared 101 compatibility rows.`)
