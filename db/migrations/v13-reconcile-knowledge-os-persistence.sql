-- ============================================================
-- V13: Reconcile Knowledge OS persistence tables
--
-- Intent:
-- - Preserve the existing legacy public.sources table.
-- - Add the missing columns needed by the V12 Knowledge OS persistence model.
-- - Create the missing claims, claim_sources, ai_citation_events, and user_events
--   tables without changing existing archive data.
--
-- Applied to Supabase project usuqjsjluietcnudxwvz on 2026-07-08 as
-- migration `reconcile_knowledge_os_persistence`.
-- ============================================================

BEGIN;

ALTER TABLE public.sources
  ADD COLUMN IF NOT EXISTS publisher TEXT,
  ADD COLUMN IF NOT EXISTS authors JSONB NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS publication_date DATE,
  ADD COLUMN IF NOT EXISTS doi TEXT,
  ADD COLUMN IF NOT EXISTS license TEXT,
  ADD COLUMN IF NOT EXISTS accessed_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS checksum TEXT,
  ADD COLUMN IF NOT EXISTS is_primary BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS trust_tier TEXT NOT NULL DEFAULT 'C',
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'sources_trust_tier_check'
      AND conrelid = 'public.sources'::regclass
  ) THEN
    ALTER TABLE public.sources
      ADD CONSTRAINT sources_trust_tier_check
      CHECK (trust_tier IN ('S', 'A', 'B', 'C', 'D'));
  END IF;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS sources_url_unique ON public.sources(url);
CREATE UNIQUE INDEX IF NOT EXISTS sources_doi_unique ON public.sources(doi);
CREATE INDEX IF NOT EXISTS idx_sources_trust_tier ON public.sources(trust_tier);
CREATE INDEX IF NOT EXISTS idx_sources_source_type ON public.sources(source_type);
CREATE INDEX IF NOT EXISTS idx_sources_url ON public.sources(url);
CREATE INDEX IF NOT EXISTS idx_sources_doi ON public.sources(doi);

CREATE TABLE IF NOT EXISTS public.claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stable_id TEXT NOT NULL UNIQUE,
  subject_type TEXT NOT NULL,
  subject_id TEXT NOT NULL,
  predicate TEXT NOT NULL,
  object_type TEXT,
  object_id TEXT,
  value_text TEXT,
  value_normalized JSONB,
  confidence NUMERIC(4,3) NOT NULL CHECK (confidence >= 0 AND confidence <= 1),
  review_status TEXT NOT NULL DEFAULT 'draft' CHECK (review_status IN ('draft', 'derived', 'approved', 'needs_review', 'rejected')),
  last_verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.claim_sources (
  claim_id UUID NOT NULL REFERENCES public.claims(id) ON DELETE CASCADE,
  source_id UUID NOT NULL REFERENCES public.sources(id) ON DELETE CASCADE,
  locator JSONB,
  excerpt TEXT,
  support_type TEXT NOT NULL DEFAULT 'supports' CHECK (support_type IN ('supports', 'context', 'contradicts')),
  evidence_score NUMERIC(4,3) NOT NULL DEFAULT 0.8 CHECK (evidence_score >= 0 AND evidence_score <= 1),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (claim_id, source_id)
);

CREATE TABLE IF NOT EXISTS public.ai_citation_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider TEXT NOT NULL,
  query_hash TEXT NOT NULL,
  claim_ids TEXT[] NOT NULL DEFAULT '{}',
  source_ids TEXT[] NOT NULL DEFAULT '{}',
  api_key_id TEXT,
  latency_ms INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.user_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  event_name TEXT NOT NULL,
  entity_type TEXT,
  entity_id TEXT,
  path_id TEXT,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_claims_subject ON public.claims(subject_type, subject_id);
CREATE INDEX IF NOT EXISTS idx_claims_predicate ON public.claims(predicate);
CREATE INDEX IF NOT EXISTS idx_claims_review_status ON public.claims(review_status);
CREATE INDEX IF NOT EXISTS idx_claims_confidence ON public.claims(confidence DESC);
CREATE INDEX IF NOT EXISTS idx_claim_sources_source ON public.claim_sources(source_id);
CREATE INDEX IF NOT EXISTS idx_ai_citation_events_provider_created ON public.ai_citation_events(provider, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_events_user_time ON public.user_events(user_id, occurred_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_events_name_time ON public.user_events(event_name, occurred_at DESC);

ALTER TABLE public.sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.claim_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_citation_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public read sources" ON public.sources;
CREATE POLICY "public read sources" ON public.sources FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public read approved claims" ON public.claims;
CREATE POLICY "public read approved claims" ON public.claims FOR SELECT TO anon, authenticated USING (review_status IN ('approved', 'derived'));

DROP POLICY IF EXISTS "public read claim sources" ON public.claim_sources;
CREATE POLICY "public read claim sources" ON public.claim_sources FOR SELECT TO anon, authenticated USING (true);

REVOKE ALL PRIVILEGES ON public.claims, public.claim_sources, public.ai_citation_events, public.user_events FROM anon, authenticated;
GRANT SELECT ON public.sources, public.claims, public.claim_sources TO anon, authenticated;

COMMIT;
