-- ============================================================
-- V3: Curated Image Registry
-- Tracks stable, attribution-ready image assets separately from
-- raw imported image URLs.
-- ============================================================

CREATE TABLE IF NOT EXISTS curated_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  building_id UUID REFERENCES buildings(id) ON DELETE CASCADE,
  building_slug TEXT,
  role TEXT NOT NULL DEFAULT 'supporting',
  url_original TEXT NOT NULL,
  url_local TEXT,
  url_thumb_400 TEXT,
  width INTEGER,
  height INTEGER,
  photographer TEXT,
  source TEXT NOT NULL,
  source_url TEXT NOT NULL,
  license TEXT NOT NULL,
  license_url TEXT,
  attribution_required BOOLEAN NOT NULL DEFAULT true,
  storage_status TEXT NOT NULL DEFAULT 'external-verified-metadata',
  quality_status TEXT NOT NULL DEFAULT 'candidate',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (storage_status IN ('external-verified-metadata', 'cached', 'rejected')),
  CHECK (quality_status IN ('candidate', 'approved', 'rejected'))
);

CREATE INDEX IF NOT EXISTS idx_curated_images_building_id ON curated_images(building_id);
CREATE INDEX IF NOT EXISTS idx_curated_images_building_slug ON curated_images(building_slug);
CREATE INDEX IF NOT EXISTS idx_curated_images_role ON curated_images(role);
CREATE INDEX IF NOT EXISTS idx_curated_images_quality_status ON curated_images(quality_status);

