import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = process.cwd()
export const FORWARD_PATH = path.join(ROOT, 'db/migrations/v23-graduation-building-unification.sql')
export const ROLLBACK_PATH = path.join(ROOT, 'db/migrations/v23-graduation-building-unification-rollback.sql')

const TABLES = [
  'graduation_case_profiles',
  'building_functions',
  'building_function_aliases',
  'building_function_assignments',
]

function requirePattern(errors, sql, pattern, message) {
  if (!pattern.test(sql)) errors.push(message)
}

export function validateGraduationUnificationSchema(forwardSql, rollbackSql) {
  const errors = []

  requirePattern(errors, forwardSql, /V23: Graduation case \/ building unification foundation/, 'Forward SQL must identify the reviewed V23 foundation migration.')
  requirePattern(errors, forwardSql, /BEGIN;[\s\S]*COMMIT;/, 'Forward SQL must be transactional.')
  requirePattern(errors, rollbackSql, /BEGIN;[\s\S]*COMMIT;/, 'Rollback SQL must be transactional.')

  for (const table of TABLES) {
    requirePattern(
      errors,
      forwardSql,
      new RegExp(`CREATE TABLE public\\.${table}\\s*\\(`),
      `Missing table ${table}.`,
    )
    requirePattern(
      errors,
      forwardSql,
      new RegExp(`ALTER TABLE public\\.${table} ENABLE ROW LEVEL SECURITY;`),
      `RLS is not enabled for ${table}.`,
    )
    requirePattern(
      errors,
      rollbackSql,
      new RegExp(`DROP TABLE IF EXISTS public\\.${table};`),
      `Rollback does not drop ${table}.`,
    )
  }

  requirePattern(
    errors,
    forwardSql,
    /case_id TEXT PRIMARY KEY[\s\S]*building_id UUID NOT NULL UNIQUE[\s\S]*REFERENCES public\.buildings\(id\) ON DELETE RESTRICT/,
    'CASE compatibility must use a primary case_id and a unique restricted building reference.',
  )
  requirePattern(
    errors,
    forwardSql,
    /CHECK \(case_id ~ '\^CASE-\[0-9\]\{3\}\$'\)/,
    'CASE IDs must enforce the CASE-000 format.',
  )
  requirePattern(
    errors,
    forwardSql,
    /PRIMARY KEY \(locale, normalized_alias\)/,
    'Aliases need one unambiguous normalized term per locale.',
  )
  requirePattern(
    errors,
    forwardSql,
    /PRIMARY KEY \(building_id, function_slug\)/,
    'Function assignments must prevent duplicate building/function pairs.',
  )
  requirePattern(
    errors,
    forwardSql,
    /WHERE review_status = 'approved'/,
    'Approved function lookup needs a partial index or equivalent guard.',
  )
  requirePattern(
    errors,
    forwardSql,
    /FOR SELECT TO anon, authenticated[\s\S]*publication_status = 'published'/,
    'Public graduation profiles must be limited to published rows.',
  )
  requirePattern(
    errors,
    forwardSql,
    /FOR SELECT TO anon, authenticated[\s\S]*review_status = 'approved'/,
    'Public function assignments must be limited to approved rows.',
  )
  requirePattern(
    errors,
    forwardSql,
    /REVOKE ALL PRIVILEGES ON TABLE[\s\S]*FROM anon, authenticated;/,
    'Browser roles must have privileges revoked before the explicit read grant.',
  )
  requirePattern(
    errors,
    forwardSql,
    /GRANT SELECT ON TABLE[\s\S]*TO anon, authenticated;/,
    'Browser roles need an explicit SELECT grant for the Data API.',
  )
  requirePattern(
    errors,
    forwardSql,
    /REVOKE ALL ON FUNCTION public\.set_archistory_updated_at\(\) FROM PUBLIC, anon, authenticated;/,
    'The trigger function must not be executable by public browser roles.',
  )

  const executableDml = forwardSql
    .split('\n')
    .filter(line => /^\s*(INSERT INTO|UPDATE\s+public\.|DELETE FROM|TRUNCATE)\b/i.test(line))
  if (executableDml.length > 0) {
    errors.push(`Structure-only foundation contains data mutation: ${executableDml.join(' | ')}`)
  }

  if (/DROP TABLE IF EXISTS public\.(buildings|architects|images|building_types)\b/.test(rollbackSql)) {
    errors.push('Rollback must never drop canonical archive tables.')
  }

  const rollbackPositions = TABLES.map(table => rollbackSql.indexOf(`DROP TABLE IF EXISTS public.${table};`))
  const expectedOrder = [3, 2, 1, 0]
  const actualOrder = rollbackPositions
    .map((position, index) => ({ position, index }))
    .sort((a, b) => a.position - b.position)
    .map(item => item.index)
  if (JSON.stringify(actualOrder) !== JSON.stringify(expectedOrder)) {
    errors.push('Rollback tables are not dropped in reverse dependency order.')
  }

  return errors
}

export function validateFiles() {
  const forwardSql = fs.readFileSync(FORWARD_PATH, 'utf8')
  const rollbackSql = fs.readFileSync(ROLLBACK_PATH, 'utf8')
  return validateGraduationUnificationSchema(forwardSql, rollbackSql)
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])
if (isMain) {
  const errors = validateFiles()
  if (errors.length) {
    console.error(`Graduation unification schema validation failed (${errors.length}):`)
    for (const error of errors) console.error(`- ${error}`)
    process.exit(1)
  }
  console.log('Graduation unification schema validation passed.')
  console.log('- 4 structure-only tables')
  console.log('- CASE compatibility and unique building ownership')
  console.log('- RLS plus explicit Data API grants')
  console.log('- reverse-order rollback without canonical table mutation')
}
