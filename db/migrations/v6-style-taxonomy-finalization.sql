-- ============================================================
-- V6: Finalize remaining orphan style taxonomy
-- Adds canonical style/form-language slugs for the remaining audited
-- style_slugs values before replacing legacy Chinese labels in buildings.
-- ============================================================

INSERT INTO styles (slug, name_zh, name_en, name_ja, parent_slug, era_slug, description, keywords)
VALUES
  (
    'structural-expressionism',
    '结构表现主义',
    'Structural Expressionism',
    '構造表現主義',
    NULL,
    NULL,
    '{"zh":"以外露或强调结构体系作为主要形式语言的建筑倾向。","en":"An architectural tendency that treats visible or emphasized structural systems as a primary formal language.","ja":"露出または強調された構造体系を主要な形式言語とする建築的傾向。"}'::jsonb,
    ARRAY['structure', 'expressive structure', 'engineering']::text[]
  ),
  (
    'sculptural-architecture',
    '雕塑建筑',
    'Sculptural Architecture',
    '彫刻的建築',
    NULL,
    NULL,
    '{"zh":"以强烈体量、曲面或可辨识造型作为主要空间与城市形象的建筑倾向。","en":"An architectural tendency defined by strong massing, curved surfaces, or highly recognizable form.","ja":"強い量塊、曲面、または認識しやすい形態によって特徴づけられる建築的傾向。"}'::jsonb,
    ARRAY['form', 'massing', 'iconic form']::text[]
  ),
  (
    'geometric-abstraction',
    '几何抽象',
    'Geometric Abstraction',
    '幾何学的抽象',
    'modernism',
    NULL,
    '{"zh":"以清晰几何、抽象构成和秩序化体量作为主要表达的建筑倾向。","en":"A formal tendency based on clear geometry, abstract composition, and ordered volumes.","ja":"明快な幾何、抽象的構成、秩序化されたヴォリュームを主な表現とする建築的傾向。"}'::jsonb,
    ARRAY['geometry', 'abstraction', 'composition']::text[]
  ),
  (
    'exposed-concrete',
    '清水混凝土',
    'Exposed Concrete',
    '打放しコンクリート',
    NULL,
    NULL,
    '{"zh":"将未覆饰混凝土的肌理、接缝和施工精度作为空间表达核心的建筑倾向。","en":"A material expression centered on the texture, joints, and precision of unfinished concrete.","ja":"打放しコンクリートの質感、目地、施工精度を空間表現の中心に置く建築的傾向。"}'::jsonb,
    ARRAY['concrete', 'material expression', 'surface']::text[]
  ),
  (
    'natural-materials',
    '自然材料',
    'Natural Materials',
    '自然素材',
    NULL,
    NULL,
    '{"zh":"强调木、石、竹等自然材料的触感、构造和环境关系的建筑倾向。","en":"An architectural tendency emphasizing the tactility, construction, and environmental relation of natural materials.","ja":"木、石、竹など自然素材の触感、構法、環境との関係を重視する建築的傾向。"}'::jsonb,
    ARRAY['wood', 'stone', 'material', 'craft']::text[]
  ),
  (
    'prairie-school',
    '草原风格',
    'Prairie School',
    'プレーリー派',
    'organic',
    NULL,
    '{"zh":"以低缓水平线、出檐、开放平面和场地连续性为特征的美国近代住宅建筑流派。","en":"An American modern residential movement marked by horizontal lines, broad eaves, open plans, and continuity with site.","ja":"水平線、深い軒、開放的な平面、敷地との連続性を特徴とするアメリカ近代住宅の潮流。"}'::jsonb,
    ARRAY['frank lloyd wright', 'horizontal', 'residential']::text[]
  ),
  (
    'expressionism',
    '表现主义',
    'Expressionism',
    '表現主義',
    'modernism',
    NULL,
    '{"zh":"通过塑性形体、情感化空间和非正统构成表达现代精神的建筑倾向。","en":"A modern architectural tendency using plastic form, emotive space, and non-orthogonal composition.","ja":"可塑的な形態、感情的な空間、非正統的な構成によって近代的精神を表す建築的傾向。"}'::jsonb,
    ARRAY['plastic form', 'emotive space', 'modernism']::text[]
  ),
  (
    'urban-design',
    '城市设计',
    'Urban Design',
    '都市デザイン',
    NULL,
    NULL,
    '{"zh":"以广场、轴线、公共空间和城市秩序作为主要设计对象的建筑与城市尺度实践。","en":"A city-scale design practice focused on squares, axes, public space, and urban order.","ja":"広場、軸線、公共空間、都市秩序を主な対象とする建築・都市スケールの実践。"}'::jsonb,
    ARRAY['public space', 'square', 'urban order']::text[]
  ),
  (
    'adaptive-reuse',
    '历史建筑改造',
    'Adaptive Reuse',
    '歴史的建築の再生',
    NULL,
    NULL,
    '{"zh":"在保留既有建筑价值的同时植入新功能、结构或公共流线的改造策略。","en":"A design strategy that preserves existing architectural value while introducing new function, structure, or circulation.","ja":"既存建築の価値を保ちながら、新しい機能、構造、動線を組み込む改修戦略。"}'::jsonb,
    ARRAY['reuse', 'renovation', 'heritage']::text[]
  ),
  (
    'industrial-reuse',
    '工业改造',
    'Industrial Reuse',
    '産業建築の再生',
    'adaptive-reuse',
    NULL,
    '{"zh":"将工业遗存、厂房或基础设施转化为文化、公共或商业用途的改造策略。","en":"A reuse strategy that converts industrial buildings or infrastructure into cultural, public, or commercial uses.","ja":"産業遺産、工場、インフラを文化、公共、商業用途へ転用する再生戦略。"}'::jsonb,
    ARRAY['industrial heritage', 'reuse', 'conversion']::text[]
  ),
  (
    'emergency-architecture',
    '应急建筑',
    'Emergency Architecture',
    '応急建築',
    NULL,
    NULL,
    '{"zh":"面向灾后、临时使用或快速建造场景的建筑实践。","en":"Architectural practice for post-disaster, temporary, or rapid-construction contexts.","ja":"災害後、一時利用、迅速な建設を必要とする状況に向けた建築実践。"}'::jsonb,
    ARRAY['temporary', 'disaster response', 'rapid construction']::text[]
  )
ON CONFLICT (slug) DO UPDATE SET
  name_zh = EXCLUDED.name_zh,
  name_en = EXCLUDED.name_en,
  name_ja = EXCLUDED.name_ja,
  parent_slug = EXCLUDED.parent_slug,
  era_slug = EXCLUDED.era_slug,
  description = EXCLUDED.description,
  keywords = EXCLUDED.keywords;
