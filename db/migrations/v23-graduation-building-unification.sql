-- ============================================================
-- V23: Graduation case / building unification foundation
--
-- Approved for migration after G5 reviewed seed data, isolated PostgreSQL
-- forward/rollback rehearsal, and repository quality-gate review.
--
-- This migration creates structure only. It does not insert, update, merge,
-- or delete any building, graduation case, image, or function assignment.
-- ============================================================

BEGIN;

-- Graduation-only analysis. Canonical facts and images remain owned by
-- public.buildings, public.architects, and public.images.
CREATE TABLE public.graduation_case_profiles (
  case_id TEXT PRIMARY KEY,
  building_id UUID NOT NULL
    REFERENCES public.buildings(id) ON DELETE RESTRICT,
  concept_zh TEXT NOT NULL,
  concept_zh_hant TEXT,
  concept_en TEXT,
  concept_ja TEXT,
  keywords_zh TEXT[] NOT NULL DEFAULT '{}',
  keywords_zh_hant TEXT[] NOT NULL DEFAULT '{}',
  keywords_en TEXT[] NOT NULL DEFAULT '{}',
  keywords_ja TEXT[] NOT NULL DEFAULT '{}',
  plan_url TEXT,
  section_url TEXT,
  source_url TEXT NOT NULL,
  publication_status TEXT NOT NULL DEFAULT 'draft'
    CHECK (publication_status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT graduation_case_profiles_case_id_format
    CHECK (case_id ~ '^CASE-[0-9]{3}$'),
  CONSTRAINT graduation_case_profiles_source_url_format
    CHECK (source_url ~ '^https://'),
  CONSTRAINT graduation_case_profiles_plan_url_format
    CHECK (plan_url IS NULL OR plan_url = '' OR plan_url ~ '^https://'),
  CONSTRAINT graduation_case_profiles_section_url_format
    CHECK (section_url IS NULL OR section_url = '' OR section_url ~ '^https://'),
  CONSTRAINT graduation_case_profiles_audit_time_order
    CHECK (updated_at >= created_at)
);

-- A building_type is the broad primary category already stored on buildings.
-- A building_function is a finer, reusable and optionally hierarchical use.
CREATE TABLE public.building_functions (
  slug TEXT PRIMARY KEY,
  parent_slug TEXT REFERENCES public.building_functions(slug)
    ON DELETE RESTRICT,
  broad_type_slug TEXT REFERENCES public.building_types(slug)
    ON DELETE RESTRICT,
  name_zh TEXT NOT NULL,
  name_zh_hant TEXT NOT NULL,
  name_en TEXT NOT NULL,
  name_ja TEXT NOT NULL,
  description_zh TEXT,
  description_zh_hant TEXT,
  description_en TEXT,
  description_ja TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT building_functions_slug_format
    CHECK (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  CONSTRAINT building_functions_not_own_parent
    CHECK (parent_slug IS NULL OR parent_slug <> slug),
  CONSTRAINT building_functions_audit_time_order
    CHECK (updated_at >= created_at)
);

-- Search aliases are language-specific. One normalized term in one locale
-- resolves to one canonical function, preventing ambiguous automatic routing.
CREATE TABLE public.building_function_aliases (
  function_slug TEXT NOT NULL
    REFERENCES public.building_functions(slug) ON DELETE CASCADE,
  locale TEXT NOT NULL
    CHECK (locale IN ('zh', 'zh-Hant', 'en', 'ja')),
  alias TEXT NOT NULL CHECK (btrim(alias) <> ''),
  normalized_alias TEXT GENERATED ALWAYS AS (lower(btrim(alias))) STORED,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (locale, normalized_alias)
);

-- Multiple approved uses may belong to one building. Candidates remain hidden
-- from the public Data API until reviewed and explicitly approved.
CREATE TABLE public.building_function_assignments (
  building_id UUID NOT NULL
    REFERENCES public.buildings(id) ON DELETE CASCADE,
  function_slug TEXT NOT NULL
    REFERENCES public.building_functions(slug) ON DELETE RESTRICT,
  is_primary BOOLEAN NOT NULL DEFAULT false,
  confidence NUMERIC(4,3) NOT NULL
    CHECK (confidence >= 0 AND confidence <= 1),
  review_status TEXT NOT NULL DEFAULT 'candidate'
    CHECK (review_status IN ('candidate', 'approved', 'rejected')),
  assignment_method TEXT NOT NULL
    CHECK (assignment_method IN ('manual', 'source-derived', 'imported', 'ai-suggested')),
  evidence_url TEXT,
  evidence_note TEXT,
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (building_id, function_slug),
  CONSTRAINT building_function_assignments_evidence_url_format
    CHECK (evidence_url IS NULL OR evidence_url ~ '^https://'),
  CONSTRAINT building_function_assignments_review_consistency
    CHECK (
      (review_status = 'candidate' AND reviewed_at IS NULL)
      OR (review_status IN ('approved', 'rejected') AND reviewed_at IS NOT NULL)
    ),
  CONSTRAINT building_function_assignments_audit_time_order
    CHECK (updated_at >= created_at)
);

-- Foreign-key and query-path indexes. A building can support more than one
-- CASE analysis, so profile building_id uses a non-unique lookup index.
CREATE INDEX idx_graduation_case_profiles_building_id
  ON public.graduation_case_profiles(building_id);
CREATE INDEX idx_graduation_case_profiles_publication_status
  ON public.graduation_case_profiles(publication_status);
CREATE INDEX idx_building_functions_parent_slug
  ON public.building_functions(parent_slug);
CREATE INDEX idx_building_functions_broad_type_slug
  ON public.building_functions(broad_type_slug);
CREATE INDEX idx_building_function_aliases_function_slug
  ON public.building_function_aliases(function_slug);
CREATE INDEX idx_building_function_assignments_function_approved
  ON public.building_function_assignments(function_slug, building_id)
  WHERE review_status = 'approved';
CREATE INDEX idx_building_function_assignments_review_status
  ON public.building_function_assignments(review_status);
CREATE UNIQUE INDEX idx_building_function_assignments_one_primary
  ON public.building_function_assignments(building_id)
  WHERE is_primary = true AND review_status = 'approved';

-- Keep audit timestamps truthful without depending on every importer to set
-- updated_at manually.
CREATE FUNCTION public.set_archistory_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public, pg_temp
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_graduation_case_profiles_updated_at
  BEFORE UPDATE ON public.graduation_case_profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_archistory_updated_at();
CREATE TRIGGER set_building_functions_updated_at
  BEFORE UPDATE ON public.building_functions
  FOR EACH ROW EXECUTE FUNCTION public.set_archistory_updated_at();
CREATE TRIGGER set_building_function_assignments_updated_at
  BEFORE UPDATE ON public.building_function_assignments
  FOR EACH ROW EXECUTE FUNCTION public.set_archistory_updated_at();

-- Explicit Data API access. Public roles can only read rows allowed by RLS;
-- browser roles cannot mutate any of these tables or execute the trigger.
ALTER TABLE public.graduation_case_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.building_functions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.building_function_aliases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.building_function_assignments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read published graduation profiles"
  ON public.graduation_case_profiles
  FOR SELECT TO anon, authenticated
  USING (publication_status = 'published');
CREATE POLICY "public read active building functions"
  ON public.building_functions
  FOR SELECT TO anon, authenticated
  USING (is_active = true);
CREATE POLICY "public read active building function aliases"
  ON public.building_function_aliases
  FOR SELECT TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM public.building_functions
      WHERE building_functions.slug = building_function_aliases.function_slug
        AND building_functions.is_active = true
    )
  );
CREATE POLICY "public read approved building function assignments"
  ON public.building_function_assignments
  FOR SELECT TO anon, authenticated
  USING (review_status = 'approved');

REVOKE ALL PRIVILEGES ON TABLE
  public.graduation_case_profiles,
  public.building_functions,
  public.building_function_aliases,
  public.building_function_assignments
FROM anon, authenticated;

GRANT SELECT ON TABLE
  public.graduation_case_profiles,
  public.building_functions,
  public.building_function_aliases,
  public.building_function_assignments
TO anon, authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE
  public.graduation_case_profiles,
  public.building_functions,
  public.building_function_aliases,
  public.building_function_assignments
TO service_role;

REVOKE ALL ON FUNCTION public.set_archistory_updated_at() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.set_archistory_updated_at() TO service_role;

COMMIT;
