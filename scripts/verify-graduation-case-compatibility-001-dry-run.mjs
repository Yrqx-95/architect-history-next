import fs from 'node:fs'
import { PGlite } from '@electric-sql/pglite'

const apply = fs.readFileSync('db/manual-operations/graduation-case-compatibility-001-apply.sql', 'utf8')
const rollback = fs.readFileSync('db/manual-operations/graduation-case-compatibility-001-rollback.sql', 'utf8')
const db = await PGlite.create()

await db.exec('CREATE ROLE anon NOLOGIN; CREATE ROLE authenticated NOLOGIN;')
await db.exec(apply)
const first = await db.query('select count(*)::int as count from graduation_case_compatibility')
if (first.rows[0].count !== 101) throw new Error('forward count mismatch')
await db.exec("insert into graduation_case_compatibility(case_id,payload,publication_status) values ('CASE-999','{\"id\":\"CASE-999\"}'::jsonb,'archived')")
let refused = false
try { await db.exec(rollback) } catch { refused = true }
if (!refused) throw new Error('rollback did not refuse row-count drift')
await db.exec('ROLLBACK')
await db.exec("delete from graduation_case_compatibility where case_id='CASE-999'")
await db.exec(rollback)
await db.exec(apply)
await db.exec(rollback)
console.log('Graduation CASE compatibility 001 dry-run passed: forward, drift guard, rollback, replay.')
