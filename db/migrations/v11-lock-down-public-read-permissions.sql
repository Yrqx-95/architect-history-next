-- Archistory public API permission lockdown.
-- Applied to Supabase project usuqjsjluietcnudxwvz on 2026-06-13.
--
-- Intent:
-- - Public API roles may read archive content.
-- - Public API roles must not insert, update, delete, truncate, trigger, or
--   reference archive tables.
-- - RLS is enabled on application-owned public tables with explicit SELECT
--   policies only.
--
-- Note:
-- PostGIS-owned public objects such as spatial_ref_sys, geometry_columns,
-- geography_columns, and st_estimatedextent still require extension-owner or
-- extension-schema remediation. The application does not depend on public
-- access to those objects.

GRANT USAGE ON SCHEMA public TO anon, authenticated;
REVOKE CREATE ON SCHEMA public FROM anon, authenticated;

REVOKE ALL PRIVILEGES ON ALL TABLES IN SCHEMA public FROM anon, authenticated;
REVOKE ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public FROM anon, authenticated;
REVOKE ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public FROM anon, authenticated;
REVOKE EXECUTE ON ALL FUNCTIONS IN SCHEMA public FROM PUBLIC;

ALTER TABLE public.architects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.buildings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.styles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.eras ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.building_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.architect_styles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.building_styles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.architect_eras ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.building_eras ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.style_eras ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.architect_influences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public read architects" ON public.architects;
CREATE POLICY "public read architects" ON public.architects FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public read buildings" ON public.buildings;
CREATE POLICY "public read buildings" ON public.buildings FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public read images" ON public.images;
CREATE POLICY "public read images" ON public.images FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public read styles" ON public.styles;
CREATE POLICY "public read styles" ON public.styles FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public read eras" ON public.eras;
CREATE POLICY "public read eras" ON public.eras FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public read building_types" ON public.building_types;
CREATE POLICY "public read building_types" ON public.building_types FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public read architect_styles" ON public.architect_styles;
CREATE POLICY "public read architect_styles" ON public.architect_styles FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public read building_styles" ON public.building_styles;
CREATE POLICY "public read building_styles" ON public.building_styles FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public read architect_eras" ON public.architect_eras;
CREATE POLICY "public read architect_eras" ON public.architect_eras FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public read building_eras" ON public.building_eras;
CREATE POLICY "public read building_eras" ON public.building_eras FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public read style_eras" ON public.style_eras;
CREATE POLICY "public read style_eras" ON public.style_eras FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public read architect_influences" ON public.architect_influences;
CREATE POLICY "public read architect_influences" ON public.architect_influences FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public read sources" ON public.sources;
CREATE POLICY "public read sources" ON public.sources FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public read tags" ON public.tags;
CREATE POLICY "public read tags" ON public.tags FOR SELECT TO anon, authenticated USING (true);

GRANT SELECT ON TABLE
  public.architects,
  public.buildings,
  public.images,
  public.styles,
  public.eras,
  public.building_types,
  public.architect_styles,
  public.building_styles,
  public.architect_eras,
  public.building_eras,
  public.style_eras,
  public.architect_influences,
  public.sources,
  public.tags
TO anon, authenticated;

ALTER VIEW public.building_summary SET (security_invoker = true);
REVOKE ALL PRIVILEGES ON public.building_summary FROM anon, authenticated;

ALTER FUNCTION public.update_building_search() SET search_path = public, pg_temp;

REVOKE ALL PRIVILEGES ON TABLE public.geography_columns FROM PUBLIC, anon, authenticated;
REVOKE ALL PRIVILEGES ON TABLE public.geometry_columns FROM PUBLIC, anon, authenticated;
REVOKE ALL PRIVILEGES ON TABLE public.spatial_ref_sys FROM PUBLIC, anon, authenticated;

REVOKE EXECUTE ON FUNCTION public.st_estimatedextent(text, text) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.st_estimatedextent(text, text, text) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.st_estimatedextent(text, text, text, boolean) FROM PUBLIC, anon, authenticated;
