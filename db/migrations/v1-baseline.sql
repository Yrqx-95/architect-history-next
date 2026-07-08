-- ============================================================
-- V1: Baseline schema
-- Generated from the application schema used by Archistory.
--
-- This file is the repository baseline for rebuilding a fresh database.
-- Before using it for production disaster recovery, compare it with a
-- Supabase `pg_dump --schema-only` export from the live project and reconcile
-- any platform-managed grants, policies, triggers, or functions.
-- ============================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ============================================================
-- Taxonomy
-- ============================================================

CREATE TABLE IF NOT EXISTS eras (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name_zh TEXT,
  name_en TEXT NOT NULL,
  name_ja TEXT,
  year_start INTEGER,
  year_end INTEGER
);

CREATE TABLE IF NOT EXISTS styles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name_zh TEXT,
  name_en TEXT NOT NULL,
  name_ja TEXT,
  parent_slug TEXT REFERENCES styles(slug) ON DELETE SET NULL,
  era_slug TEXT REFERENCES eras(slug) ON DELETE SET NULL,
  description JSONB,
  keywords TEXT[] NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS building_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name_zh TEXT,
  name_en TEXT NOT NULL,
  name_ja TEXT
);

-- ============================================================
-- Core entities
-- ============================================================

CREATE TABLE IF NOT EXISTS architects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  wikidata_id TEXT,
  name_zh TEXT,
  name_en TEXT NOT NULL,
  name_ja TEXT,
  alt_names TEXT[] NOT NULL DEFAULT '{}',
  birth_year INTEGER,
  death_year INTEGER,
  nationalities TEXT[] NOT NULL DEFAULT '{}',
  era_slug TEXT REFERENCES eras(slug) ON DELETE SET NULL,
  style_slugs TEXT[] NOT NULL DEFAULT '{}',
  bio_zh TEXT,
  bio_en TEXT,
  bio_ja TEXT,
  core_ideas TEXT[] NOT NULL DEFAULT '{}',
  education TEXT,
  influences TEXT[] NOT NULL DEFAULT '{}',
  influenced TEXT[] NOT NULL DEFAULT '{}',
  wikipedia_url TEXT,
  official_url TEXT
);

CREATE TABLE IF NOT EXISTS buildings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  wikidata_id TEXT,
  name_zh TEXT,
  name_en TEXT NOT NULL,
  name_ja TEXT,
  architect_id UUID REFERENCES architects(id) ON DELETE SET NULL,
  architect_slug TEXT REFERENCES architects(slug) ON DELETE SET NULL,
  year_start INTEGER,
  year_end INTEGER,
  status TEXT,
  city TEXT,
  country TEXT,
  country_code TEXT,
  location JSONB,
  type_slug TEXT REFERENCES building_types(slug) ON DELETE SET NULL,
  style_slugs TEXT[] NOT NULL DEFAULT '{}',
  era_slug TEXT REFERENCES eras(slug) ON DELETE SET NULL,
  area_sqm NUMERIC,
  materials TEXT[] NOT NULL DEFAULT '{}',
  structure TEXT,
  description JSONB,
  significance JSONB,
  spatial_feat JSONB,
  light_feat JSONB,
  circulation JSONB,
  heritage TEXT,
  wikipedia_url TEXT,
  official_url TEXT
);

CREATE TABLE IF NOT EXISTS images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  building_id UUID NOT NULL REFERENCES buildings(id) ON DELETE CASCADE,
  url_original TEXT NOT NULL,
  url_thumb_400 TEXT,
  photographer TEXT,
  source TEXT NOT NULL,
  license TEXT,
  source_url TEXT NOT NULL,
  img_type TEXT NOT NULL DEFAULT 'exterior',
  is_primary BOOLEAN NOT NULL DEFAULT false
);

-- ============================================================
-- Indexes
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_architects_slug ON architects(slug);
CREATE INDEX IF NOT EXISTS idx_architects_era_slug ON architects(era_slug);
CREATE INDEX IF NOT EXISTS idx_architects_style_slugs ON architects USING GIN(style_slugs);

CREATE INDEX IF NOT EXISTS idx_buildings_slug ON buildings(slug);
CREATE INDEX IF NOT EXISTS idx_buildings_architect_id ON buildings(architect_id);
CREATE INDEX IF NOT EXISTS idx_buildings_architect_slug ON buildings(architect_slug);
CREATE INDEX IF NOT EXISTS idx_buildings_country_code ON buildings(country_code);
CREATE INDEX IF NOT EXISTS idx_buildings_type_slug ON buildings(type_slug);
CREATE INDEX IF NOT EXISTS idx_buildings_era_slug ON buildings(era_slug);
CREATE INDEX IF NOT EXISTS idx_buildings_style_slugs ON buildings USING GIN(style_slugs);
CREATE INDEX IF NOT EXISTS idx_buildings_year_start ON buildings(year_start);

CREATE INDEX IF NOT EXISTS idx_images_building_id ON images(building_id);
CREATE INDEX IF NOT EXISTS idx_images_primary ON images(building_id, is_primary DESC);

CREATE INDEX IF NOT EXISTS idx_styles_slug ON styles(slug);
CREATE INDEX IF NOT EXISTS idx_styles_parent_slug ON styles(parent_slug);
CREATE INDEX IF NOT EXISTS idx_styles_era_slug ON styles(era_slug);

CREATE INDEX IF NOT EXISTS idx_eras_slug ON eras(slug);
CREATE INDEX IF NOT EXISTS idx_building_types_slug ON building_types(slug);

-- ============================================================
-- Row Level Security
-- Public archive data is readable by anon/auth users.
-- Writes should happen through controlled service-role scripts or future CMS.
-- ============================================================

ALTER TABLE eras ENABLE ROW LEVEL SECURITY;
ALTER TABLE styles ENABLE ROW LEVEL SECURITY;
ALTER TABLE building_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE architects ENABLE ROW LEVEL SECURITY;
ALTER TABLE buildings ENABLE ROW LEVEL SECURITY;
ALTER TABLE images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read eras" ON eras FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "public read styles" ON styles FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "public read building_types" ON building_types FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "public read architects" ON architects FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "public read buildings" ON buildings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "public read images" ON images FOR SELECT TO anon, authenticated USING (true);

-- ============================================================
-- Views / functions
-- ============================================================
-- No application-owned views or database functions are required by the current
-- codebase baseline. Add future search/materialized views in later migrations.
