-- ============================================================
-- V2: Knowledge Graph Junction Tables
-- Adds many-to-many relations for the Architecture Knowledge OS
-- ============================================================

-- Architect ↔ Style (many-to-many)
CREATE TABLE IF NOT EXISTS architect_styles (
  architect_id UUID REFERENCES architects(id) ON DELETE CASCADE,
  style_slug TEXT,
  PRIMARY KEY (architect_id, style_slug)
);

-- Building ↔ Style
CREATE TABLE IF NOT EXISTS building_styles (
  building_id UUID REFERENCES buildings(id) ON DELETE CASCADE,
  style_slug TEXT,
  PRIMARY KEY (building_id, style_slug)
);

-- Architect ↔ Era (many-to-many, some architects span eras)
CREATE TABLE IF NOT EXISTS architect_eras (
  architect_id UUID REFERENCES architects(id) ON DELETE CASCADE,
  era_slug TEXT REFERENCES eras(slug) ON DELETE CASCADE,
  PRIMARY KEY (architect_id, era_slug)
);

-- Building ↔ Era
CREATE TABLE IF NOT EXISTS building_eras (
  building_id UUID REFERENCES buildings(id) ON DELETE CASCADE,
  era_slug TEXT REFERENCES eras(slug) ON DELETE CASCADE,
  PRIMARY KEY (building_id, era_slug)
);

-- Style ↔ Era
CREATE TABLE IF NOT EXISTS style_eras (
  style_slug TEXT REFERENCES styles(slug) ON DELETE CASCADE,
  era_slug TEXT REFERENCES eras(slug) ON DELETE CASCADE,
  PRIMARY KEY (style_slug, era_slug)
);

-- Relations: architect influences
CREATE TABLE IF NOT EXISTS architect_influences (
  architect_id UUID REFERENCES architects(id) ON DELETE CASCADE,
  influenced_id UUID REFERENCES architects(id) ON DELETE CASCADE,
  relationship_type TEXT DEFAULT 'influenced', -- influenced / collaborated / taught
  PRIMARY KEY (architect_id, influenced_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_architect_styles_style ON architect_styles(style_slug);
CREATE INDEX IF NOT EXISTS idx_building_styles_style ON building_styles(style_slug);
CREATE INDEX IF NOT EXISTS idx_architect_eras_era ON architect_eras(era_slug);
CREATE INDEX IF NOT EXISTS idx_building_eras_era ON building_eras(era_slug);
