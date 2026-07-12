# 毕业制作案例与主体建筑统一任务清单

更新时间：2026-07-12  
状态：进行中  
唯一主记录：本文件  
当前下一步：合并 transport batch 001 的只读审核 PR；随后同步 CASE-094/133 图片与元数据，新增四语 `transport-hub` 用途，再生成 guarded migration/rollback 并执行全历史隔离 PostgreSQL dry-run。

## 最终目标

毕业制作和主体网站从同一个 `buildings` 建筑主体读取名称、建筑师、年代、地点、来源和图片；毕业制作只保留独有的研究分析层。建立多语言、可多选的建筑用途体系，使“图书馆 / library / 図書館”等查询能够召回所有对应用途建筑，而不是只匹配名称文字。

## 不可破坏的边界

- 不依据模糊名称自动合并建筑。
- 未验证建筑身份、图片内容、摄影者、许可和来源前，不批准映射。
- 不把 `SUPABASE_SERVICE_ROLE_KEY` 暴露给浏览器。
- 新公开表必须启用 RLS，并建立明确只读策略后才能开放 Data API。
- 所有数据库写入必须有前向迁移、回滚、dry-run 和写后查询证据。
- 双轨读取与旧 URL 回归测试完成前，不删除 `cases.json`。
- 必须保留现有 `CASE-xxx` 地址和公开导出兼容性。
- 数据或运行代码变更必须走 Reviewed production release；只改审计脚本和文档时不浪费全站部署。

## 阶段清单

### G0 — 建立只读身份审计（已完成）

- [x] 对 139 个毕业案例与 875 个主体建筑执行多语言匹配。
- [x] 匹配同时参考名称、建筑师、年份和地点。
- [x] 冲突记录不会进入自动链接候选。
- [x] 新增 `npm run graduation:match-buildings`。
- [x] 新增匹配规则单元测试。
- [x] 结果：18 exact、1 probable、101 new-building、19 identity-review。
- [x] 审计报告：[GRADUATION_BUILDING_UNIFICATION_AUDIT_2026-07-12.md](reports/GRADUATION_BUILDING_UNIFICATION_AUDIT_2026-07-12.md)
- [x] PR #6 合并，merge commit `e7280c73534c2202689fed4a5b91b84451abac85`。

完成证据：毕业内容 QA 0 problem、typecheck 通过、lint 通过、17 个 unit tests 通过。

### G1 — 审核 18 条 exact-match（已完成）

- [x] 对照毕业案例 `source_url` 与主体建筑来源，确认是同一项目。
- [x] 对照建筑师、建成年份、城市和别名。
- [x] 检查毕业案例图片与主体图片是否都指向正确建筑。
- [x] 检查图片许可、摄影者和来源链接是否可继续使用。
- [x] 对每条记录写明 `approved` / `rejected` / `needs-research`。
- [x] 生成版本化决策文件 `db/review-decisions/graduation-building-links-001.json`。
- [x] 为决策文件增加结构测试，禁止重复 CASE ID 或 building slug 误用。

完成条件：18 条全部有明确决策和证据；未确认记录不会进入迁移。

完成证据：18 条全部 `approved`；逐张视觉审核并记录 Commons 摄影者、许可和来源；替换了未展示建筑本体的 CASE-129 Centre Pompidou 图片；补齐 8 条笼统图片署名/许可并修正 CopenHill 文件名大小写。主体表 18 条 `official_url` 均为空，已作为 G5 迁移时必须从已审案例来源回填的显式数据缺口。决策结构测试 4 个、全部 unit tests 21 个、毕业内容 QA、typecheck、lint、production build 均通过。PR #8 合并，merge commit `f07efc1194f9fdfe087399fbac1acee74350fea7`；Reviewed production release run `29162774086` 成功，线上 CASE-129 已验证使用新图片与具体版权信息。

### G2 — 审核 probable 与 identity-review（已完成）

- [x] 人工核验 Elbphilharmonie probable match。
- [x] 逐条处理 19 个 identity-review，优先解决名称相似导致的假阳性。
- [x] 将确认不存在于主体库的记录转入 new-building 队列。
- [x] 更新匹配器的别名规则，但不为单个案例硬编码错误映射。

完成条件：probable 和 identity-review 队列归零或每条都有明确阻塞原因。

完成证据：通用归一化后得到 3 probable、16 identity-review；三条 probable（Kiasma、台中国家歌剧院、Elbphilharmonie）全部以名称别名、年份、建筑师和地点批准；16 条当前 identity-review 全部明确拒绝错误候选并转入 new-building，原 CASE-053 也因建筑师归一化自动降入 new-building。版本化决策文件 `db/review-decisions/graduation-building-links-002.json` 共 20 条：3 approved、17 rejected、0 needs-research。CASE-107 替换为完整展示建筑立面的 CC BY 4.0 图片；CASE-121 补齐摄影者与 CC BY-SA 4.0。匹配器新增事务所后缀、短专名和剧场名称通用规则，并增加防止地点 slug 假匹配的回归测试。

发布证据：PR #9 合并，merge commit `0613fbf87eb24bdd6d56fabd850cc594ebb9709b`；Reviewed production release run `29163477904` 成功。线上 CASE-107 与 CASE-121 均返回 HTTP 200；公开 JSON 已分别返回 Robert (S099001) / CC BY 4.0 与 Lapscause / CC BY-SA 4.0 的具体版权信息。

### G3 — 设计统一数据库结构（已完成）

- [x] 设计 `graduation_case_profiles`，以 `building_id` 引用唯一建筑主体。
- [x] 设计 `building_functions` 细粒度用途词表。
- [x] 设计 `building_function_aliases` 多语言同义词表。
- [x] 设计 `building_function_assignments` 多对多关联表。
- [x] 设计 `CASE-xxx` 兼容映射与唯一约束。
- [x] 明确字段所有权：基础事实归 `buildings`，毕业分析归 profile。
- [x] 设计 RLS、索引、唯一约束和审计时间字段。
- [x] 生成迁移草案和回滚，不直接应用。

完成条件：schema、RLS、索引、回滚和 Data API 权限全部通过审查。

完成证据：新增结构草案 `db/migrations/v23-graduation-building-unification-draft.sql`、逆依赖回滚和字段所有权设计文档 `docs/GRADUATION_UNIFICATION_SCHEMA.md`。四张表均有 RLS 和显式 Data API 权限；公开 profile 只读 `published`、公开用途分配只读 `approved`；CASE 主键格式、唯一 building 归属、用途 alias 唯一性、多用途复合主键、外键索引和审核时间一致性均有约束。只读核验线上 875 个 buildings、20 个 building_types、PostgreSQL 17.6、目标表与触发器无命名冲突；没有执行 DDL/DML。结构验证器通过，8 个 unit 文件共 31 个测试、typecheck、lint 全部通过。

合并证据：PR #10 的 Quality baseline run `29163802259` 成功，merge commit `de8d7bf7372f4c03fd96edfeaaaa2c47392e7253`。本阶段只有未应用的结构草案、文档和验证工具，没有触发生产部署。

### G4 — 建立智能用途分类（已完成）

- [x] 定义第一版用途词表：library、museum、theatre、school、university、community-center、elderly-care、social-housing、mixed-use 等。
- [x] 为每个用途建立 zh / zh-Hant / en / ja 别名。
- [x] 明确一级 `building_types` 与细粒度 `building_functions` 的区别。
- [x] 生成 875 座建筑的只读用途候选队列。
- [x] 先审核“图书馆”用途批次，验证多用途关系。
- [x] 禁止根据名称单独批量写入；结合来源与项目功能说明。

完成条件：搜索“图书馆 / library / 図書館”能基于统一用途关系得到相同建筑集合。

候选生成证据：`db/taxonomies/building-functions-v1.json` 定义 9 个用途和四语别名；alias 唯一性与四语 library 解析已有单元测试。只读生成器从 875 个主体得到 144 个候选关联：library 20、museum 84、theatre 11、school 10、university 14、community-center 0、elderly-care 0、social-housing 1、mixed-use 4。所有自动生成记录均为 `candidate`，明确标记名称只是发现信号，不能生成批准写入。

完成证据：版本化决策文件 `db/review-decisions/building-function-library-001.json` 覆盖全部 20 个 library 候选；16 条由 Wikidata `instance of` 关系确认，4 条由官方机构或建筑师基金会页面确认，20 个证据 URL 全部可访问。20 条全部批准 library，Hill Museum & Manuscript Library、LBJ Library and Museum、Musashino Art University Museum & Library 同时批准 museum，验证了多用途关系。四语查询均先解析为 `library` slug，再返回同一 approved 集合；9 个专项测试通过。另发现 5 条主体元数据 warning，已单独记录，未混入用途写入。

合并证据：PR #12 的 Quality baseline run `29164234121` 成功，merge commit `a5c1985b3cc09c09cd44b335317b31750645df29`。本阶段只有审核数据、报告和测试，没有生产数据库写入或网站部署。

### G5 — 迁移首批已批准映射（已完成）

- [x] 为 G1/G2 批准记录生成 guarded migration 和 rollback。
- [x] 在写入前验证 CASE ID、building ID、source URL 和行数。
- [x] 写入后查询验证 profile 数、外键和重复约束。
- [x] 保留旧 JSON，开启 Supabase + JSON 双轨读取。
- [x] 新增 API/页面测试，比较双轨结果一致性。

完成条件：批准案例从统一主体读取基础资料，旧页面和导出没有变化。

完成证据：PR #13 合并了 21 profiles、9 functions、122 aliases、23 approved assignments 的版本化数据包、guarded apply、rollback 和 PGlite dry-run；merge commit `0df1a59cccadf2ca98aa04638a3677fed19cdb9e`。PR #14 将结构草案正式化；merge commit `e45278e0cf495d001a39def28c9ffb2437e6b6e0`。生产已按顺序执行 `graduation_building_unification_foundation`（`20260711190612`）和 `graduation_unification_batch_001`（`20260711190655`）：21 个唯一 profile、9 functions、122 aliases、23 approved assignments，0 orphan，anon Data API 数量与数据包完全一致，四张新表 RLS 与只读策略有效。PR #15 合并 Supabase + JSON 双轨读取、API/页面回归测试与图片准入闸门；merge commit `c7be179d0423ac32994af5c4cc5230a9f9e17172`。Reviewed production release run `29165219866` 成功；质量门、54 个 unit、19 个 E2E、production build、Cloudflare deploy 与线上路由语义检查全部通过。线上 API 实测 `source=supabase+json`、100 个公开案例、21 个 unified profile、0 missing relation、0 canonical image takeover、21 image fallback；CASE-104 返回 HTTP 200 并显示 canonical 名称/地点/年份、完整联合建筑师和已审核 CC BY-SA 4.0 图片；旧 139 条兼容 JSON 仍返回 HTTP 200。详见 `GRADUATION_UNIFICATION_BATCH_001_PRODUCTION.md` 与 `GRADUATION_CANONICAL_IMAGE_GATE_001.md`。

### G6 — 处理 118 个 new-building candidates

- [x] 按来源可靠度和毕业页面使用价值分批。
- [x] Library batch 001：8 个主体完成身份、来源、用途、图片版权审核、生产迁移、发布与线上验收。
- [x] Library batch 002、museum batch 001 与 theatre batch 001 完成审核、生产迁移、发布与线上验收。
- [ ] 新建主体前核验建筑身份、建筑师、年份、地点和官方来源。
- [ ] 图片按 Archistory 版权规则重新审核，不直接继承未经确认的旧图片。
- [ ] 每批有 apply、rollback、写后审计和发布记录。
- [ ] 新主体建立后再创建 graduation profile。

完成条件：每条记录已链接主体、明确拒绝或留下可解释的证据缺口。

当前证据：重新以集合核对 139 个 CASE 后，21 个已链接、118 个需要新建主体；旧的 101 是匹配器重算和 G2 错误候选转入新建队列之前的历史快照。版本化队列覆盖 118 条，其中 23 条和 library 用途相关。Library batch 001 审核并迁移 CASE-018/021/022/023/027/029/042/070：8 条身份、官方来源、年份、地点和用途均通过；12 个官方证据 URL 实时访问 0 failure，8 个 Commons 文件作者与许可比对 0 mismatch。CASE-027 替换横置低价值图片，CASE-070 纠正“旧馆误当新馆”的错误图片。PR #17 发布审核图片，PR #18 合并 guarded migration，生产冲突预检两次均为 0；迁移 `graduation_library_batch_001`（`20260711201728`）写入 4 个新 architect、8 buildings、8 primary images、8 published profiles 和 17 approved assignments，写后 0 orphan、0 architect mismatch、0 duplicate primary image/function。PR #19 修正 21→29 的生产测试基线并把布局回归与数据回归分离；Reviewed production release run `29167078871` 成功。线上 API 实测 100 个公开案例、29 个 unified profile、0 missing relation；8 个 CASE 页面和 8 个主体建筑页均 HTTP 200，CASE 页面均显示已审核许可署名。G6 当前完成 8/118，剩余 110；library 子集完成 8/23，剩余 15。详见 `GRADUATION_NEW_BUILDING_LIBRARY_001.md`、`GRADUATION_LIBRARY_BATCH_001_DRY_RUN.md` 与 `GRADUATION_LIBRARY_BATCH_001_PRODUCTION.md`。

Library batch 002 已完成生产迁移与发布。Supabase migration `graduation_library_batch_002`（`20260711233931`）写入 11 个新 architect、14 buildings、14 primary images、14 profiles 和 36 assignments；写后 orphan、architect mismatch、duplicate primary image/function 全部为 0。PR #24 将生产 profile 基线从 29 更新为 43；Reviewed production release `29172691510` 的质量门、68 unit、19 E2E、Cloudflare deploy 和路由语义检查全部通过。线上 API 为 100 个公开案例、43 unified profiles、0 missing relation；14 个 CASE 页和 14 个 building 页均 HTTP 200，替换图与摄影者署名在线可见。G6 当前完成 22/118，剩余 96；library 子集完成 22/23，唯一剩余 CASE-079 是 `no_safe_image_yet`。详见 `GRADUATION_LIBRARY_BATCH_002_PRODUCTION.md`。

Museum batch 001 已建立只读审核队列，覆盖 CASE-041/045/047/051/052/053/054/055/058/060/109/118/124/132 共 14 条。实时核验确认 14 个 Commons 文件均存在且许可可追溯；13 张当前图片内容正确，CASE-051 的施工中图片被拒绝并找到 2024 年 Souka Kinmei / CC0 完工替代图。CASE-124 的旧官方 URL 404，已找到现行 Henning Larsen 页面；CASE-124/132 的准确作者与 CC BY-SA 4.0 许可已查清。该队列仍不授权数据库写入；下一步先查生产冲突并形成版本化正式决策。详见 `GRADUATION_NEW_BUILDING_MUSEUM_001_TRIAGE.md`。

Museum batch 001 的生产只读预检为 0 building slug conflict、0 CASE profile conflict，`museum` function 已存在；Kengo Kuma、Shigeru Ban、Zaha Hadid 三个主体建筑师已存在，按姓名复查未发现其余九个建筑师的别名重复。14 条版本化正式决策已建立并通过结构测试：全部身份与 museum 用途批准，CASE-051 替换施工图，CASE-124/132 修正作者与许可，CASE-118/124 更新现行官方 URL；文件仍明确禁止生产写入。下一步准备 guarded migration、rollback 与 dry-run。

Museum batch 001 的公开数据同步、migration pack 与 dry-run 已完成。CASE-051 新图本地化为 2000×1123、613KB、无 EXIF；CASE-124/132 和六条 Commons 来源署名已同步到 CSV 与公开 JSON。生成包包含 9 个新建筑师、14 buildings、14 primary images、14 profiles、16 assignments。隔离 PostgreSQL 依次重放 foundation、unification batch 001、library batch 001/002 后，第一次 forward、外部关系 rollback guard、精确 rollback、第二次 forward 与第二次 rollback 全部通过。详见 `GRADUATION_MUSEUM_BATCH_001_DRY_RUN.md`。

Museum batch 001 已完成生产迁移、双阶段发布和线上验收。PR #26 合并审核数据、CASE-051 正确 CC0 图片与 guarded migration pack；首次 Reviewed production release `29174147839` 在数据库写入前先发布图片和静态数据。生产冲突复查为 0 后，Supabase migration `graduation_museum_batch_001`（`20260712005222`）写入 9 个新 architect、14 buildings、14 primary images、14 published profiles 和 16 approved assignments；写后 profile 总数 57，本批全部计数符合预期，orphan profile / architect / function assignment 均为 0。PR #27 将生产读取基线从 43 更新为 57；最终 Reviewed production release `29174472413` 的质量门、完整测试、Cloudflare deploy 和路由语义检查全部通过。线上 API 实测 `source=supabase+json`、57 unified profiles、CASE-051 已统一；CASE-051 页面和 627413-byte CC0 图片均 HTTP 200。G6 当前完成 36/118，剩余 82；library 子集唯一剩余 CASE-079 继续为 `no_safe_image_yet`。详见 `GRADUATION_MUSEUM_BATCH_001_PRODUCTION.md`。

Museum batch 002 只读核验完成。剩余 82 条中只有 CASE-048 Aranya Art Center 的名称与官方机构说明明确属于 museum / art-center；官方建筑师与机构页面可确认 Neri&Hu、2019、秦皇岛和艺术中心用途，但原记录无图片来源、许可或摄影者。Commons 未找到对应建筑文件，Openverse 四组精确查询均为 0；官方展示图也没有开放复用许可，因此 CASE-048 与 CASE-079 一样标记 `no_safe_image_yet`，不下载图片、不生成 migration。明确 museum 候选现已审完，下一批转向 theatre / performing-arts / cultural-hall。详见 `GRADUATION_NEW_BUILDING_MUSEUM_002_TRIAGE.md`。

Theatre batch 001 已完成审核、双阶段发布、生产迁移和线上验收。5 条候选中 CASE-057/117/122/139 批准，CASE-091 因无开放许可图片保持 `no_safe_image_yet`；CASE-033 作为关键词假阳性排除。PR #30/#31 先发布审核数据与 4 张本地图片；生产冲突复查为 0 后，Supabase migration `graduation_theatre_batch_001`（`20260712015846`）写入 1 个新联合 architect、4 buildings、4 primary images、4 profiles 和 6 assignments。写后 published profile 总数为 61，本批计数全部符合预期，true orphan profile / architect relation / function assignment 均为 0。PR #32 将生产基线从 57 更新为 61；最终 Reviewed production release `29176154362` 的质量门、完整测试、Cloudflare deploy 和路由语义检查全部通过。线上 API 为 101 个公开案例、61 unified profiles、0 missing relation；4 个 CASE 页、4 个主体建筑页和 4 张图片均 HTTP 200。G6 当前完成 40/118，剩余 78；CASE-048、079、091 保持 `no_safe_image_yet`。详见 `GRADUATION_NEW_BUILDING_THEATRE_001_TRIAGE.md`、`GRADUATION_THEATRE_BATCH_001_DRY_RUN.md` 与 `GRADUATION_THEATRE_BATCH_001_PRODUCTION.md`。

Community/civic batch 001 已完成 6 条只读候选与正式审核。CASE-096 的机构、LA Conservancy 和 Commons 证据一致：1983 年 JACCC 中心建筑、Noguchi 广场与剧场身份明确，现图人工确认展示正确建筑和广场，Another Believer / CC BY-SA 4.0 元数据已通过 MediaWiki API 复核，因此批准进入 migration 准备。CASE-019 的现图是 2005 年旧国分寺市役所而非 2018 年 Cocobunji Plaza，明确拒绝；CASE-064/067/069/088 的官方图均有摄影者版权且无开放替代图，保持 `no_safe_image_yet`。另确认 CASE-069 应由 2012 修正为 2009。生产只读查重为 0 building / profile / architect conflict，所需 3 个 function 与 cultural type 均存在。本阶段不授权写入。详见 `GRADUATION_NEW_BUILDING_COMMUNITY_CIVIC_001_TRIAGE.md`。

CASE-096 migration pack 与全历史 dry-run 已完成。生成包包含 1 个新联合 architect、1 building、1 primary image、1 published profile 与 3 assignments；隔离 PostgreSQL 18.3 重放 foundation、首批统一、library 001/002、museum 001、theatre 001 后，两次 forward、外部关系 rollback guard 与两次精确 rollback 全部通过。加入新批次时发现并修复验证器的建筑师历史状态提前预置问题，library 002、museum 001 与 theatre 001 旧演练同时回归通过。生产尚未写入。详见 `GRADUATION_COMMUNITY_CIVIC_BATCH_001_DRY_RUN.md`。

Community/civic batch 001 已完成生产迁移与发布。Supabase migration `graduation_community_civic_batch_001`（`20260712023102`）写入 1 个新联合 architect、CASE-096 building、1 primary image、1 published profile 和 3 approved assignments；写后 profile 总数为 62，本批计数符合预期，三类真实 orphan 均为 0。PR #36 将生产基线从 61 更新为 62；Reviewed production release `29176957382` 的质量门、完整测试、Cloudflare deploy 和路由语义检查全部通过。线上 API 为 101 个公开案例、62 unified profiles、0 missing relation；CASE-096 页面、主体建筑页与 313521-byte CC BY-SA 4.0 图片均 HTTP 200。G6 当前完成 41/118，剩余 77；8 条案例保持 `no_safe_image_yet`。详见 `GRADUATION_COMMUNITY_CIVIC_BATCH_001_PRODUCTION.md`。

Social-care/community-support batch 001 已完成 8 条只读审核，0 条进入迁移。CASE-001/026/086/087/097 的建筑身份与用途成立，但无准确开放图片；CASE-097 唯一 Openverse 图为 CC BY-NC-ND，按版权规则拒绝。CASE-011 是富山县推广的服务模式而非单一建筑，禁止虚构 canonical building。CASE-024 与 CASE-065 被确认是同一 AU Childcare Support 建筑的两套不同毕业分析，暴露出 `graduation_case_profiles.building_id UNIQUE` 与目标不一致：必须允许多个 CASE profile 引用同一 building，并保留两条 CASE 路由。本批没有生产写入，G6 完成数仍为 41/118。详见 `GRADUATION_NEW_BUILDING_SOCIAL_CARE_001_TRIAGE.md`。

V24 profile many-to-one schema 已完成生产迁移与发布。PR #39 合并 guarded forward/rollback、隔离 PostgreSQL 共享建筑演练和运行时回归测试；Supabase migration `graduation_profile_many_to_one`（`20260712042433`）只移除 `building_id` 唯一约束并新增普通反查索引，未修改任何数据。写后仍为 62 profiles / 62 distinct buildings / 0 duplicate refs，CASE 主键、building 外键、RLS 与 published-only policy 均未变。Reviewed production release `29179669891` 的质量门、完整测试、Cloudflare deploy 与路由语义检查全部通过；线上 API 为 101 个公开案例、62 profiles、0 missing relation。数据库现已允许多个 CASE 保留独立分析并引用同一 canonical building。详见 `GRADUATION_PROFILE_MANY_TO_ONE_DRY_RUN.md` 与 `GRADUATION_PROFILE_MANY_TO_ONE_PRODUCTION.md`。

Disaster/community batch 001 已完成 CASE-037/090 的只读身份与图片审核。Home For All 与 Shelter 的一手记录在地点、面积、木造二层、2012 年 11 月完成、四个设计事务所及施工方字段一致，确认两条 CASE 是同一 `Home-for-All in Rikuzentakata` 建成项目的不同毕业分析；2016 拆除及 2022 近陆前高田站重建作为同一建筑历史记录，不另建主体。既有开放图片仍只是威尼斯双年展展览或模型，官方建成图片没有开放许可，因此 2 条均为 `no_safe_image_yet`、0 migration。生成器已在独立分支增加 existing building UUID/slug 精确复用、独立多 profile、跳过重复 building/architect/image/function、共享引用 rollback 保护，并通过 110 unit tests 与四个历史批次的隔离 PostgreSQL 18.3 回归。详见 `GRADUATION_NEW_BUILDING_DISASTER_COMMUNITY_001_TRIAGE.md`。

Education batch 001 已完成 CASE-006 Fuji Kindergarten 的只读审核。手塚官方项目、园方和立川市资料确认 Tezuka Architects、2007、立川及幼儿园用途，`school` function 通过。重新搜索发现两张内容准确且 Flickr 页面标示 CC BY 2.0 的照片，但上传者为 Forgemind ArchiMedia，标题或手塚官方页将原摄影者标为 Katsuhisa Kida；当前没有证据证明上传者有权替原摄影者重新授权。因此该记录不是“无准确图片”，而是“准确图片的开放授权链不完整”，继续 `no_safe_image_yet`、0 migration。详见 `GRADUATION_NEW_BUILDING_EDUCATION_001_TRIAGE.md`。

Transport batch 001 已完成 CASE-008/094/133 的只读审核。三条身份、交通用途和开放许可图片通过，生产主体查重为 0；CASE-094 当前铁路场图片被人工视觉审核拒绝，已找到江戸村のとくぞう / CC BY-SA 4.0 的清晰站体替代图；CASE-133 现图确认为 Syced 自有作品 / CC0，需补齐公开元数据。现有 9 个细用途没有交通节点，禁止用 `mixed-use` 冒充主用途；migration 前需新增四语 `transport-hub` function。三条获准进入 migration 准备，但本阶段不授权写入。详见 `GRADUATION_NEW_BUILDING_TRANSPORT_001_TRIAGE.md`。

下一个最小可验证步骤：通过 PR 合并 transport 001 正式决策；同步两条图片，再扩展用途词表并生成 migration pack。

### G7 — 统一搜索与筛选

- [ ] 搜索 API 同时读取建筑名称、别名、用途别名和毕业分析关键词。
- [ ] 用标准用途 slug 召回全部用途关联建筑。
- [ ] 结果标记“主体建筑”和“毕业设计参考”视角，不显示重复卡片。
- [ ] 增加用途、年代、国家、建筑师和毕业课题筛选。
- [ ] 为中英日同义查询建立回归测试。
- [ ] 测量查询性能，再决定是否增加 Postgres 全文索引。

完成条件：图书馆等核心查询召回完整、三语一致、无重复且性能可接受。

### G8 — 统一页面数据读取

- [ ] 毕业案例详情从 `buildings` 读取基础事实和图片。
- [ ] `graduation_case_profiles` 提供概念、研究关键词、平剖面与课题关系。
- [ ] 主体建筑页可显示“毕业设计参考”入口。
- [ ] 毕业页面可返回主体建筑的历史与来源层。
- [ ] 保持现有设计层级，不制造卡片套卡片。
- [ ] 三语、移动端、404 和可访问性验证通过。

完成条件：两处展示同一建筑时基础事实、图片和版权完全一致。

### G9 — 导出、兼容与退役旧数据

- [ ] 保持 `public/data/graduation/cases.json` 和 CSV 的兼容输出。
- [ ] 保持所有 `CASE-xxx` URL。
- [ ] 对比旧 JSON 与新查询的字段和记录数。
- [ ] 完成至少一个发布周期的双轨监测。
- [ ] 只有在无差异且可回滚时，才停止把 `cases.json` 作为运行时来源。
- [ ] 归档旧数据生成流程，不直接删除历史证据。

完成条件：Supabase 成为唯一运行时事实源，旧入口仍正常，回滚演练通过。

### G10 — 最终验收

- [ ] 数据关系审计 0 error。
- [ ] 毕业内容 QA 0 problem。
- [ ] 图片版权与建筑对应关系抽查通过。
- [ ] unit、E2E、production build 全绿。
- [ ] Cloudflare 发布成功。
- [ ] 线上验证首页、主体建筑、毕业案例、智能搜索和未知路由。
- [ ] 更新 `STATUS.md`、`PROJECT.md`、发布记录和本任务清单。

完成条件：本清单所有项目完成，目标才可标记 complete。

## 每次继续工作的固定流程

1. 先读本文件的“当前下一步”。
2. 只推进当前阶段，不跨过未满足的完成条件。
3. 完成后更新复选框、证据、风险和新的“当前下一步”。
4. 运行与风险相称的检查。
5. 通过 PR 合并；只有运行代码或公共数据改变才触发正式发布。
6. 在最终汇报中明确：完成了什么、验证了什么、剩余风险、下一步、没有把握的地方。
