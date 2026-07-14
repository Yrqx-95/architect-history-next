DO $$
DECLARE matched_count integer;
BEGIN
  SELECT count(*) INTO matched_count FROM public.buildings
  WHERE slug='james-simon-gallery' AND official_url IS NULL AND description IS NULL
    AND updated_at='2026-07-08T16:11:20.896254+00:00'::timestamptz;
  IF matched_count <> 1 THEN RAISE EXCEPTION 'James Simon building precondition failed: %', matched_count; END IF;
  IF (SELECT count(*) FROM public.images WHERE building_id=(SELECT id FROM public.buildings WHERE slug='james-simon-gallery') AND is_primary) <> 2 THEN
    RAISE EXCEPTION 'James Simon primary image precondition failed';
  END IF;
END $$;

UPDATE public.buildings
SET name_zh='詹姆斯·西蒙画廊', name_ja='ジェームズ・シモン・ギャラリー', city='柏林', country='德国',
  official_url='https://davidchipperfield.com/projects/james-simon-galerie',
  description=jsonb_build_object(
    'zh','詹姆斯·西蒙画廊是柏林博物馆岛的新入口建筑，由 David Chipperfield Architects 设计并于 2019 年开放。建筑包含接待大厅、展览空间、咖啡馆、商店、衣帽间和礼堂，并通过宽阔台阶与博物馆岛公共空间连接。',
    'en','James-Simon-Galerie is the new entrance building for Berlin’s Museum Island, designed by David Chipperfield Architects and opened in 2019. It combines reception, exhibition spaces, a café, shop, cloakrooms, and an auditorium, extending the public realm with broad steps and a colonnaded terrace.',
    'ja','ジェームズ・シモン・ギャラリーは、ベルリンの博物館島に設けられた新しい入口建築で、David Chipperfield Architectsが設計し、2019年に開館しました。受付、展示空間、カフェ、ショップ、クローク、講堂を備え、幅広い階段と列柱のテラスによって公共空間を広げています.'
  ),
  significance=jsonb_build_object(
    'zh','项目不是孤立的新馆，而是连接博物馆岛历史建筑群、地下考古步道和当代访客流线的门槛。石材基座、细柱廊和层叠体量在保护历史视线的同时建立了新的公共入口。',
    'en','The project is not an isolated new museum but a threshold connecting the historic ensemble, the Archaeological Promenade, and contemporary visitor movement. Its stone plinth, slender colonnade, and stepped massing preserve historic views while creating a new civic entrance.',
    'ja','この建築は単独の新しい博物館ではなく、歴史的な建築群、考古学プロムナード、現代の来館者動線をつなぐ境界です。石の基壇、細い列柱、段状のボリュームが歴史的な眺望を守りながら、新しい公共の入口をつくっています.'
  ), updated_at=now()
WHERE slug='james-simon-gallery' AND official_url IS NULL AND description IS NULL;

UPDATE public.images
SET is_primary=false
WHERE id='a5953bc7-2c56-538f-8448-6ddfed17d25d'::uuid AND is_primary=true
  AND source='Unsplash' AND photographer='Sam Poullain' AND license='Unsplash License';

DO $$
BEGIN
  IF (SELECT count(*) FROM public.images WHERE building_id=(SELECT id FROM public.buildings WHERE slug='james-simon-gallery') AND is_primary) <> 1 THEN RAISE EXCEPTION 'James Simon postcondition primary count failed'; END IF;
END $$;
