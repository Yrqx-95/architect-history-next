import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// Public client for static generation (no auth/cookies needed)
export function createClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
