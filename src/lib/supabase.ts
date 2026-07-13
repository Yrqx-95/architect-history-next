import { createClient as createSupabaseClient } from '@supabase/supabase-js'

function requiredEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

// Public client for static generation (no auth/cookies needed)
export function createClient(options?: { cacheVersion?: string }) {
  return createSupabaseClient(
    requiredEnv('NEXT_PUBLIC_SUPABASE_URL'),
    requiredEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
    options?.cacheVersion ? {
      global: {
        fetch: (input, init) => {
          const headers = new Headers(init?.headers)
          headers.set('x-archistory-data-version', options.cacheVersion || '')
          return fetch(input, { ...init, headers, cache: 'force-cache' })
        },
      },
    } : undefined,
  )
}
