-- ============================================================
-- V6: Normalize remaining orphan style_slugs
-- Generated from scripts/style-slug-aliases.json
-- This data migration is idempotent and preserves unrelated assignments.
-- ============================================================

UPDATE buildings SET style_slugs = array_replace(style_slugs, '几何抽象', 'geometric-abstraction') WHERE slug = 'bank-of-china-tower' AND '几何抽象' = ANY(style_slugs);
UPDATE buildings SET style_slugs = array_replace(style_slugs, '应急建筑', 'emergency-architecture') WHERE slug = 'cardboard-cathedral' AND '应急建筑' = ANY(style_slugs);
UPDATE buildings SET style_slugs = array_replace(style_slugs, '结构表现主义', 'structural-expressionism') WHERE slug = 'beijing-national-stadium' AND '结构表现主义' = ANY(style_slugs);
UPDATE buildings SET style_slugs = array_replace(style_slugs, '雕塑建筑', 'sculptural-architecture') WHERE slug = 'dancing-house' AND '雕塑建筑' = ANY(style_slugs);
UPDATE buildings SET style_slugs = array_replace(style_slugs, '结构表现主义', 'structural-expressionism') WHERE slug = 'gateway-arch' AND '结构表现主义' = ANY(style_slugs);
UPDATE buildings SET style_slugs = array_replace(style_slugs, '雕塑建筑', 'sculptural-architecture') WHERE slug = 'guggenheim-bilbao' AND '雕塑建筑' = ANY(style_slugs);
UPDATE buildings SET style_slugs = array_replace(style_slugs, '雕塑建筑', 'sculptural-architecture') WHERE slug = 'guggenheim-nyc' AND '雕塑建筑' = ANY(style_slugs);
UPDATE buildings SET style_slugs = array_replace(style_slugs, '几何抽象', 'geometric-abstraction') WHERE slug = 'louvre-pyramid' AND '几何抽象' = ANY(style_slugs);
UPDATE buildings SET style_slugs = array_replace(style_slugs, '几何抽象', 'geometric-abstraction') WHERE slug = 'miho-museum' AND '几何抽象' = ANY(style_slugs);
UPDATE buildings SET style_slugs = array_replace(style_slugs, '清水混凝土', 'exposed-concrete') WHERE slug = 'naoshima' AND '清水混凝土' = ANY(style_slugs);
UPDATE buildings SET style_slugs = array_replace(style_slugs, '自然材料', 'natural-materials') WHERE slug = 'national-stadium-tokyo' AND '自然材料' = ANY(style_slugs);
UPDATE buildings SET style_slugs = array_replace(style_slugs, '历史建筑改造', 'adaptive-reuse') WHERE slug = 'reichstag-dome' AND '历史建筑改造' = ANY(style_slugs);
UPDATE buildings SET style_slugs = array_replace(style_slugs, '草原风格', 'prairie-school') WHERE slug = 'robie-house' AND '草原风格' = ANY(style_slugs);
UPDATE buildings SET style_slugs = array_replace(style_slugs, '城市设计', 'urban-design') WHERE slug = 'st-peters-square' AND '城市设计' = ANY(style_slugs);
UPDATE buildings SET style_slugs = array_replace(style_slugs, '工业改造', 'industrial-reuse') WHERE slug = 'tate-modern' AND '工业改造' = ANY(style_slugs);
UPDATE buildings SET style_slugs = array_replace(style_slugs, '自然材料', 'natural-materials') WHERE slug = 'v-and-a-dundee' AND '自然材料' = ANY(style_slugs);
UPDATE buildings SET style_slugs = array_replace(style_slugs, '清水混凝土', 'exposed-concrete') WHERE slug = 'water-temple' AND '清水混凝土' = ANY(style_slugs);
UPDATE buildings SET style_slugs = array_replace(style_slugs, '表现主义', 'expressionism') WHERE slug = 'chapel-of-notre-dame-du-haut' AND '表现主义' = ANY(style_slugs);
UPDATE buildings SET style_slugs = array_replace(style_slugs, '结构表现主义', 'structural-expressionism') WHERE slug = 'hongkong-bank' AND '结构表现主义' = ANY(style_slugs);
UPDATE buildings SET style_slugs = array_replace(style_slugs, '结构表现主义', 'structural-expressionism') WHERE slug = 'millau-viaduct' AND '结构表现主义' = ANY(style_slugs);
UPDATE buildings SET style_slugs = array_replace(style_slugs, '城市设计', 'urban-design') WHERE slug = 'piazza-del-campidoglio' AND '城市设计' = ANY(style_slugs);
UPDATE buildings SET style_slugs = array_replace(style_slugs, '雕塑建筑', 'sculptural-architecture') WHERE slug = 'walt-disney-concert-hall' AND '雕塑建筑' = ANY(style_slugs);
