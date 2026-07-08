import fs from 'node:fs'
import path from 'node:path'
import { createClient } from '@supabase/supabase-js'

export const ROOT = process.cwd()

export function loadEnvFile(filePath = path.join(ROOT, '.env.local')) {
  if (!fs.existsSync(filePath)) return
  for (const rawLine of fs.readFileSync(filePath, 'utf8').split('\n')) {
    const line = rawLine.trim()
    if (!line || line.startsWith('#')) continue
    const eq = line.indexOf('=')
    if (eq === -1) continue
    const key = line.slice(0, eq).trim()
    const value = line.slice(eq + 1).trim().replace(/^['"]|['"]$/g, '')
    if (!process.env[key]) process.env[key] = value
  }
}

export function getSupabaseClient() {
  loadEnvFile()
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or Supabase key in environment')
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  })
}

export async function fetchAll<T>(table: string): Promise<T[]> {
  const supabase = getSupabaseClient()
  const pageSize = 1000
  const rows: T[] = []
  for (let from = 0; ; from += pageSize) {
    const to = from + pageSize - 1
    const { data, error } = await supabase.from(table).select('*').range(from, to)
    if (error) throw new Error(`${table}: ${error.message}`)
    if (!data?.length) break
    rows.push(...(data as T[]))
    if (data.length < pageSize) break
  }
  return rows
}

export function normalizeKey(value: unknown) {
  return String(value || '')
    .normalize('NFKC')
    .toLowerCase()
    .trim()
}

export function ensureReportDir() {
  const reportDir = path.join(ROOT, 'reports')
  fs.mkdirSync(reportDir, { recursive: true })
  return reportDir
}
