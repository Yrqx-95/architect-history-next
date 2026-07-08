-- ============================================================
-- V4: Building type taxonomy additions
-- Adds precise type slugs for legacy display-name values found by data audit.
-- ============================================================

INSERT INTO building_types (slug, name_zh, name_en, name_ja)
VALUES
  ('civic-public', '公共建筑', 'Civic / Public', '公共建築'),
  ('research-institute', '科研建筑', 'Research Institute', '研究施設'),
  ('observation', '观景建筑', 'Observation', '展望施設')
ON CONFLICT (slug) DO UPDATE SET
  name_zh = EXCLUDED.name_zh,
  name_en = EXCLUDED.name_en,
  name_ja = EXCLUDED.name_ja;
