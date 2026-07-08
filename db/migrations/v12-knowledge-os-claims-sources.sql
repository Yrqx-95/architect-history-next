-- ============================================================
-- V12: Knowledge OS Claim / Source foundation
-- Adds the durable fact layer required by the Archistory Learning OS plan.
--
-- Current API code can derive claims from the existing archive data. These
-- tables are the target persistence model for reviewed facts, citations,
-- grounding events, and user learning events.
-- ============================================================

CREATE TABLE IF NOT EXISTS sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_type TEXT NOT NULL,
  title TEXT NOT NULL,
  publisher TEXT,
  authors JSONB NOT NULL DEFAULT '[]',
  publication_date DATE,
  language TEXT,
  url TEXT,
  doi TEXT,
  license TEXT,
  accessed_at TIMESTAMPTZ,
  checksum TEXT,
  is_primary BOOLEAN NOT NULL DEFAULT false,
  trust_tier TEXT NOT NULL CHECK (trust_tier IN ('S', 'A', 'B', 'C', 'D')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (url),
  UNIQUE (doi)
);

CREATE TABLE IF NOT EXISTS claims (
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

CREATE TABLE IF NOT EXISTS claim_sources (
  claim_id UUID NOT NULL REFERENCES claims(id) ON DELETE CASCADE,
  source_id UUID NOT NULL REFERENCES sources(id) ON DELETE CASCADE,
  locator JSONB,
  excerpt TEXT,
  support_type TEXT NOT NULL DEFAULT 'supports' CHECK (support_type IN ('supports', 'context', 'contradicts')),
  evidence_score NUMERIC(4,3) NOT NULL DEFAULT 0.8 CHECK (evidence_score >= 0 AND evidence_score <= 1),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (claim_id, source_id)
);

CREATE TABLE IF NOT EXISTS ai_citation_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider TEXT NOT NULL,
  query_hash TEXT NOT NULL,
  claim_ids TEXT[] NOT NULL DEFAULT '{}',
  source_ids TEXT[] NOT NULL DEFAULT '{}',
  api_key_id TEXT,
  latency_ms INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  event_name TEXT NOT NULL,
  entity_type TEXT,
  entity_id TEXT,
  path_id TEXT,
  payload JSONB NOT NULL DEFAULT '{}',
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_sources_trust_tier ON sources(trust_tier);
CREATE INDEX IF NOT EXISTS idx_sources_source_type ON sources(source_type);
CREATE INDEX IF NOT EXISTS idx_sources_url ON sources(url);
CREATE INDEX IF NOT EXISTS idx_sources_doi ON sources(doi);

CREATE INDEX IF NOT EXISTS idx_claims_subject ON claims(subject_type, subject_id);
CREATE INDEX IF NOT EXISTS idx_claims_predicate ON claims(predicate);
CREATE INDEX IF NOT EXISTS idx_claims_review_status ON claims(review_status);
CREATE INDEX IF NOT EXISTS idx_claims_confidence ON claims(confidence DESC);

CREATE INDEX IF NOT EXISTS idx_claim_sources_source ON claim_sources(source_id);
CREATE INDEX IF NOT EXISTS idx_ai_citation_events_provider_created ON ai_citation_events(provider, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_events_user_time ON user_events(user_id, occurred_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_events_name_time ON user_events(event_name, occurred_at DESC);

ALTER TABLE sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE claim_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_citation_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read sources" ON sources FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "public read approved claims" ON claims FOR SELECT TO anon, authenticated USING (review_status IN ('approved', 'derived'));
CREATE POLICY "public read claim sources" ON claim_sources FOR SELECT TO anon, authenticated USING (true);

-- Events are not public archive content. Writes should be handled by service-role
-- route handlers or future authenticated event ingestion endpoints.
