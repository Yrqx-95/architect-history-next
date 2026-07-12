# G6 New Building Review — Museum Batch 001 Triage

日期：2026-07-12
范围：14 个尚未统一的博物馆 / 美术馆案例
状态：实时来源、图片元数据和视觉初筛完成；待写正式决策文件

## 结论

- 14 个 Commons 文件页全部可访问，实际文件均存在，分辨率均足够用于网站主图。
- 13 张当前图片与对应建筑一致；`CASE-051` 是 2020 年施工中照片，不能代表完工项目，已找到并审片通过一张 2024 年 CC0 替代图。
- `CASE-124` 与 `CASE-132` 的旧数据把许可证写成 `See image source`，但 Commons 实际均为 CC BY-SA 4.0，且有明确作者。
- 12 个现行官方来源直接可访问。`CASE-118` 的旧 Zaha Hadid URL 已重定向至现行 ZHA 项目页；`CASE-124` 的旧 Henning Larsen URL 404，现行项目页可用。
- 本报告不授权数据库写入；下一步必须把规范事实、用途、来源和图片结论写成版本化决策后再准备 migration。

## 逐条初筛

| CASE | 身份 / 来源 | 图片与版权 | 初筛结论 |
|---|---|---|---|
| CASE-041 | Benesse 官方页确认犬岛精炼所美术馆、三分一博志、2008 | KimonBerlin，CC BY-SA 2.0；画面是项目保留并再生的工业遗构 | 可继续，决策中注明“遗构视角” |
| CASE-045 | Benesse 官方页确认丰岛美术馆、西泽立卫、2010 | Bea Phi，CC BY-SA 4.0；标志性混凝土壳体外观 | 可继续 |
| CASE-047 | 十和田市现代美术馆官方页确认西泽立卫与 2008 项目 | Angaurits，CC0；完整街角外观 | 可继续 |
| CASE-051 | KKAA 官方页确认 2020-10 完成；KADOKAWA 明确“隈研吾设计监修、鹿岛设计施工” | 旧图为施工状态，拒绝；替代图 `本棟から角川武蔵野ミュージアムを写す.jpg`，Souka Kinmei，CC0，2024，2800×1572 | 替图后可继续；主体 architect 以 KKAA 为主，鹿岛作为设计施工协作保留 |
| CASE-052 | 日建设计官方页确认 Hoki Museum、千叶、2010 完成 | W650neco，CC BY-SA 3.0；完整展示 30m 悬挑 | 可继续 |
| CASE-053 | 坂茂建筑事务所官方页确认大分县立美术馆、2014 完成、museum program | 大分帰省中，CC BY-SA 4.0；完整主立面 | 可继续 |
| CASE-054 | 馆方官方页确认 2020 更新、青木淳与西泽彻夫 master design | Tokyo-Good，CC BY-SA 4.0；Commons 明确为更新后外观 | 可继续 |
| CASE-055 | KKAA 官方页确认长崎县美术馆、2005-02 完成 | Kenta Mabuchi，CC BY-SA 2.0；完整水道与两翼关系 | 可继续 |
| CASE-058 | 馆方确认守山、1998-03-22 开馆；JIA 确认竹中工务店为设计者 | 663highland，CC BY 2.5；完整水庭与切妻屋面 | 可继续 |
| CASE-060 | 馆方确认京都嵯峨岚山、2019-10 开馆；安田工作室确认设计监理 | 運動会プロテインパワー，CC BY-SA 4.0；入口与立面清晰 | 可继续 |
| CASE-109 | 馆方建筑页确认 Peter Cook、Colin Fournier、Graz、2003 | Isiwal，CC BY-SA 4.0；标志性外观，右侧有小型施工车辆但不遮挡主体 | 可继续 |
| CASE-118 | 现行 ZHA 项目页确认 Rome、1998–2009 | Jean-Pierre Dalbéra，CC BY 2.0；室内楼梯与流线空间清楚 | 可继续 |
| CASE-124 | 现行 Henning Larsen 项目页确认 Aarhus、2009–2014、completed | Gardar Rurak，CC BY-SA 4.0；完整外观 | 修正官方 URL、许可和作者后可继续 |
| CASE-132 | Heatherwick Studio 官方页确认 Cape Town、2017 完成与开放 | Michael Rowe，CC BY-SA 4.0；粮仓改造外观清楚 | 修正许可和作者后可继续 |

## 必须写入正式决策的修正

1. `CASE-051`
   - 拒绝：`https://commons.wikimedia.org/wiki/File:Kadokawa_Culture_Museum.2020-03-03.jpg`
   - 替换：`https://commons.wikimedia.org/wiki/File:本棟から角川武蔵野ミュージアムを写す.jpg`
   - 许可 / 作者：CC0，Souka Kinmei / Wikimedia Commons。
2. `CASE-124`
   - 官方来源改为 `https://www.henninglarsen.com/projects/moesgaard`。
   - 许可 / 作者改为 CC BY-SA 4.0，Gardar Rurak / Wikimedia Commons。
3. `CASE-132`
   - 许可 / 作者改为 CC BY-SA 4.0，Michael Rowe / Wikimedia Commons。
4. `CASE-118`
   - 官方来源规范为现行重定向目标 `https://www.zha.com/projects/architecture/maxxi-museum-of-xxi-century-arts`。

## 仍需完成

1. 查询生产 architect、building slug 与 function slug，避免 UUID 或 slug 冲突。
2. 为 14 条生成规范名称、四语名称、国家代码、主体类型与 museum 多用途分配。
3. 建立版本化决策文件及结构测试；未通过前不生成 apply SQL。

## 参考来源

- https://benesse-artsite.jp/en/art/seirensho.html
- https://benesse-artsite.jp/en/art/teshima-artmuseum.html
- https://towadaartcenter.com/en/about/
- https://kkaa.co.jp/en/project/tokorozawa-sakura-town-kadokawa-culture-museum/
- https://www.kadokawa.co.jp/topics/4214/
- https://www.nikken.co.jp/en/projects/cultural/hoki_museum.html
- https://shigerubanarchitects.com/works/oita-prefectural-art-museum/
- https://kyotocity-kyocera.museum/en/architecture
- https://kkaa.co.jp/en/project/nagasaki-prefectural-art-museum/
- https://www.sagawa-artmuseum.or.jp/en/
- https://www.jia.or.jp/twentyfive_years/4948/
- https://fukuda-art-museum.jp/en/concept
- https://www.yasudaatelier.com/architect/archi_17_01.html
- https://www.museum-joanneum.at/en/kunsthaus-graz/discover/architecture
- https://www.zha.com/projects/architecture/maxxi-museum-of-xxi-century-arts
- https://www.henninglarsen.com/projects/moesgaard
- https://heatherwick.com/projects/buildings/zeitz-mocaa/
