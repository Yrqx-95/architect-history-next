# 毕业制作案例与主体建筑统一任务清单

更新时间：2026-07-12  
状态：进行中  
唯一主记录：本文件  
当前下一步：运行 CASE-034 migration pack 的完整质量门；通过后以独立 PR 合并，生产写入前重复冲突预检。

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

Transport-hub taxonomy 001 与图片准备已完成。词表新增 `transport-hub` / `transportation` 及四语 17 aliases；生产只读预检为 0 function conflict、0 alias conflict、0 assignment。隔离 PostgreSQL 18.3 重放 foundation 与首批 taxonomy 后，forward、依赖 assignment rollback guard、精确 rollback、第二次 forward/rollback 全部通过。CASE-094 新图优化为 2000×1328 / 588249 bytes，CASE-133 为 2000×1500 / 849421 bytes；graduation QA 0 problem。Supabase migration 文件通过 CLI 生成，尚未应用生产。详见 `GRADUATION_TRANSPORT_TAXONOMY_001_DRY_RUN.md`。

Transport-hub taxonomy 001 已完成生产迁移与发布。PR #44 合并 taxonomy、migration 与两张图片；Supabase migration `building_function_transport_hub_001`（`20260712053356`）将 9/122 functions/aliases 更新为 10/139，assignments 保持 101。两表 RLS、policy、anon/authenticated SELECT 与 anon REST 均通过；advisors 无本迁移新增问题。Reviewed production release `29181377729` 成功，CASE-094/133 页面和图片均 HTTP 200，线上 API 为 101 public cases / 62 profiles / 0 missing relation。详见 `GRADUATION_TRANSPORT_TAXONOMY_001_PRODUCTION.md`。

Transport batch 001 migration pack 已生成：1 new architect、3 buildings、3 primary images、3 published profiles、5 assignments。生产只读预检为 0 building/image/profile/architect conflict，required functions 2/2、type 1/1。隔离 PostgreSQL 18.3 全历史重放、两次 forward/rollback 与外部 relation guard 全部通过。详见 `GRADUATION_TRANSPORT_BATCH_001_DRY_RUN.md`。

Transport batch 001 已完成生产写入、发布与线上验收。PR #45 合并生成包后，第二次生产冲突复查仍为 0；Supabase migration `graduation_transport_batch_001`（`20260712055147`）写入 1 architect、3 buildings、3 primary images、3 profiles 与 5 assignments。生产总数从 62/916/7265/101 更新为 65 profiles / 919 buildings / 7268 images / 106 assignments；本批 3 条 primary `transport-hub` 全部存在，orphan、architect mismatch、duplicate primary image/function 均为 0。RLS/policy 保持，advisors 无本迁移新增问题。PR #46 将读取基线更新为 65；最终 Reviewed production release `29181886192` 的质量门、完整测试、Cloudflare deploy 与 route semantics 全部通过。线上 API 为 `source=supabase+json`、101 public cases、65 profiles、0 missing relation；3 个 CASE、3 个 canonical building 和 3 张图片均 HTTP 200，三种语言 building 路由 9/9 为 200。G6 已迁移 44/118，尚未迁移 74；版本化队列中尚未完成正式审核的记录为 56。详见 `GRADUATION_TRANSPORT_BATCH_001_PRODUCTION.md`。

下一个最小可验证步骤：从尚未正式审核的 56 条队列中选择一个用途边界清晰的小批次，只读核验建筑身份、用途、准确图片和开放许可，再决定是否进入 migration 准备。

Urban public-space batch 001 已完成 CASE-014/050/056/110/111 的只读审核。CASE-050/056/110/111 身份与开放图片通过；CASE-014 是跨七区持续整备的防洪与步行系统，缺少边界明确的完成年份和设计作者，禁止虚构 canonical building。CASE-110 的现有署名/许可应由 David Berkowitz / CC BY-SA 3.0 修正为 Beyond My Ken / CC BY-SA 4.0；CASE-111 当前标牌近景准确但封面代表性不足，已选定 Emily / CC BY 2.0 的 Black Square 全景替代。现有细用途缺少城市公共空间，migration 前必须新增四语 `public-space` taxonomy。本阶段 0 生产写入。详见 `GRADUATION_NEW_BUILDING_PUBLIC_SPACE_001_TRIAGE.md`。

下一个最小可验证步骤：同步 CASE-110 元数据和 CASE-111 本地图；建立 `public-space` taxonomy 的 alias 冲突预检、guarded migration/rollback 与隔离 PostgreSQL dry-run。

Public-space taxonomy 001 与图片准备已完成。词表新增 `public-space` / `public-space` broad type 及四语 26 aliases；生产只读预检为 0 function conflict、0 alias conflict、0 assignment，目标 broad type 1 条。CASE-110 已修正为 Beyond My Ken / CC BY-SA 4.0；CASE-111 已替换为 Emily / CC BY 2.0 的 Black Square 全景并优化为 2000×1333 / 730822 bytes。Graduation QA 为 0 problem。隔离 PostgreSQL 18.3 的 forward、依赖 assignment rollback guard、精确 rollback 与第二次 replay 全部通过。Supabase migration 文件由 CLI 生成，尚未应用生产。详见 `GRADUATION_PUBLIC_SPACE_TAXONOMY_001_DRY_RUN.md`。

下一个最小可验证步骤：通过 PR 合并 taxonomy、图片与 migration；生产冲突复查为 0 后应用 taxonomy，核验 11 functions / 165 aliases、RLS/policy、advisors，并运行 Reviewed release。

Public-space taxonomy 001 已完成生产迁移、发布与线上验收。PR #49 合并后生产冲突复查仍为 0；Supabase migration `building_function_public_space_001`（`20260712062946`）将 10/139 functions/aliases 更新为 11/165，assignments 保持 106。目标 1 function / 26 aliases / 4 locales，RLS、policy、anon/authenticated SELECT 与 anon REST 全部通过；advisors 无本迁移新增问题。Reviewed production release `29182787593` 成功，CASE-110/111 页面和 CASE-111 730822-byte 图片均 HTTP 200，线上 API 为 101 public cases / 65 profiles / 0 missing relation。详见 `GRADUATION_PUBLIC_SPACE_TAXONOMY_001_PRODUCTION.md`。

下一个最小可验证步骤：生成 4 条 approved public-space canonical building/profile migration pack，执行全历史隔离 PostgreSQL dry-run；CASE-014 继续保持 identity_not_bounded，不得进入 migration。

Urban public-space batch 001 migration pack 已生成：4 architects（3 new，MVRDV 复用）、4 buildings、4 primary images、4 published profiles、5 assignments。CASE-014 不在任何 seed 中。全历史隔离 PostgreSQL 18.3 的两次 forward/rollback 与外部 curated-image guard 全部通过；首次演练发现并修复验证器未汇总 prior pack broad types 的问题，未跳过旧 transport taxonomy。生成器曾因 CASE-050 署名漂移拒绝输出，公开数据同步为 KKPCW / CC BY-SA 4.0 后才通过。Supabase migration 文件由 CLI 创建且与 reviewed apply SQL 一致，生产尚未写入。详见 `GRADUATION_PUBLIC_SPACE_BATCH_001_DRY_RUN.md`。

下一个最小可验证步骤：通过 PR 合并 migration pack；生产冲突复查为 0 后写入，核验 69 profiles、923 buildings、7272 images、111 assignments，并更新读取基线与运行最终 Reviewed release。

Urban public-space batch 001 已完成生产写入、发布与线上验收。Supabase migration `graduation_public_space_batch_001`（`20260712065152`）写入 3 个新联合 architect、4 buildings、4 primary images、4 published profiles 和 5 approved assignments，并复用既有 MVRDV architect；CASE-014 保持 `identity_not_bounded`，未进入任何 seed。生产总数从 65/919/7268/106 更新为 69 profiles / 923 buildings / 7272 images / 111 assignments；orphan、architect mismatch、duplicate primary image/function 均为 0，RLS/policy 与 advisors 通过。PR #52 更新读取基线；首次 Reviewed release `29183395825` 成功。线上发现 CASE-050/111 的 graduation API architect 仍来自旧 JSON compatibility fallback，PR #53 精确同步 canonical 值并增加回归断言；最终 Reviewed release `29183774782` 在 10m02s 内成功。线上 API 为 101 public cases / 69 profiles / 0 missing relation，4 个 CASE、4 个 building 和 CASE-111 图片全部 HTTP 200。G6 已迁移 48/118，尚未迁移 70；版本化队列中尚未完成正式审核的记录为 51。详见 `GRADUATION_PUBLIC_SPACE_BATCH_001_PRODUCTION.md`。

下一个最小可验证步骤：从尚未正式审核的 51 条队列中选择一个用途边界清晰的小批次，先完成只读身份、用途、准确图片和开放许可审核；G8 前继续把 compatibility fallback 漂移作为写后验收项。

Public-toilet batch 001 已完成 CASE-031/044/049 的只读审核。CASE-031 是覆盖涩谷多个地点和设计者的 THE TOKYO TOILET 项目级参考，当前 Mr.Asylum / CC BY-SA 4.0 图片实际只展示片山正通＋Wonderwall 的恵比寿公園厕所，不能把项目总称映射成该单体，正式决定为 `project_scope_not_single_building`，后续先恢复占位图。CASE-044 的单体身份、2021-06-24 开放、隈研吾、用途、图片内容、鋸香具師 / CC BY-SA 4.0 均通过；生产无 building/profile conflict，复用既有 `kengo-kuma` architect，但迁移前需新增 `public-toilet` taxonomy。CASE-049 的记录源当前 404、现行 Kengo Kuma sitemap 无该项目，且没有准确开放图片，保持 `no_safe_image_yet`。本批 3 条均未生产写入；G6 已迁移 48/118，尚未迁移 70，版本化队列中尚未完成正式审核的记录从 51 减至 48。详见 `GRADUATION_NEW_BUILDING_PUBLIC_TOILET_001_TRIAGE.md`。

下一个最小可验证步骤：通过 PR 固化只读决策；随后把 CASE-031 恢复为中性占位图，为 `public-toilet` 建立四语 taxonomy migration、alias 冲突预检、guarded rollback 与隔离 PostgreSQL dry-run。上述门槛通过前不写入 CASE-044。

Public-toilet taxonomy 001 与 CASE-031 图片纠偏已完成本地准备。词表新增 `public-toilet`，复用 `civic-public` broad type，四语共 24 aliases；生产只读预检为 0 function conflict、0 alias conflict、0 assignment，`civic-public` type 1 条，当前基线 11 functions / 165 aliases / 111 assignments。隔离 PostgreSQL 18.3 按历史顺序重放 base 与 `public-space` 后，forward、依赖 assignment rollback guard、精确 rollback 与第二次 replay 全部通过。CASE-031 已从具体的恵比寿公園厕所图片恢复中性占位图，清空误导性的图片来源、许可和摄影者，但保留 CASE 路由与分析层。Supabase migration 文件由 CLI 创建并与 reviewed apply SQL 字节一致，尚未应用生产。详见 `GRADUATION_PUBLIC_TOILET_TAXONOMY_001_DRY_RUN.md`。

下一个最小可验证步骤：通过 PR 合并 taxonomy、guarded migration/rollback、CASE-031 fallback 修正和测试；Reviewed 静态发布成功后复查生产冲突，仍为 0 才应用 taxonomy migration。

Public-toilet taxonomy 001 与 CASE-031 图片纠偏已完成生产发布。PR #56 合并 taxonomy、guarded SQL、migration、CASE-031 placeholder 与测试；首次 Reviewed release `29184612266` 在完整 E2E 阶段发现公开 API 从 101 降至 100，原因是 placeholder CASE 被过滤，该次未部署。PR #57 改为允许显式 placeholder 保留 published CASE route，同时继续要求所有真实图片必须有 source/license/credit；修复后的静态 release `29184818646` 成功。最终生产冲突复查仍为 0 后，Supabase migration `building_function_public_toilet_001`（`20260712075921`）将 11/165 functions/aliases 更新为 12/189，assignments 保持 111；目标 1 function / 24 aliases / 4 locales / 0 assignments。两表 RLS、policy、anon/authenticated SELECT、匿名 REST 与 advisors 均通过。数据库写后 Reviewed release `29185134025` 成功；线上 API 为 101 cases / 69 profiles / 0 missing relation，CASE-031 中英日路由与 placeholder 均 HTTP 200。详见 `GRADUATION_PUBLIC_TOILET_TAXONOMY_001_PRODUCTION.md`。

下一个最小可验证步骤：生成仅包含 CASE-044 的 canonical building/profile migration pack，复用 `kengo-kuma` architect，写入准确 CC BY-SA 4.0 图片，并执行全历史隔离 PostgreSQL forward/guard/rollback/replay。

CASE-044 public-toilet batch 001 migration pack 已生成：复用既有 `kengo-kuma` architect，创建 1 building、1 primary image、1 published profile 和 2 assignments；CASE-031/049 不在任何 seed 中。第一次生产预检发现 decision 把细用途 `public-toilet` 错当成 building broad `type_slug`，而生产不存在该 building type；已改为 `civic-public` broad type，并保留 `public-toilet` primary function。验证器同时收紧为只从版本化 function taxonomy 派生允许的 broad types，不再由当前 pack 自创测试 type。修正后生产预检为 architect exact 1、building/image/profile/assignment conflict 全部 0、functions 2/2、type 1/1。全历史隔离 PostgreSQL 18.3 的两次 forward/rollback 与外部 curated-image guard 全部通过；42 files / 149 tests、typecheck、QA 均通过，migration 与 reviewed SQL 字节一致。生产尚未写入。详见 `GRADUATION_PUBLIC_TOILET_BATCH_001_DRY_RUN.md`。

下一个最小可验证步骤：通过 PR 合并 migration pack；生产冲突复查仍为 0 后应用 migration，写后核验 70 profiles / 924 buildings / 7273 images / 113 assignments 与关系安全门。

CASE-044 public-toilet batch 001 已完成生产写入、发布与线上验收。Supabase migration `graduation_public_toilet_batch_001`（`20260712094552`）复用既有 `kengo-kuma` architect，写入 1 building、1 primary image、1 published profile 和 2 approved assignments；building broad type 为 `civic-public`，primary function 为 `public-toilet`。生产总数从 69/923/7272/111 更新为 70 profiles / 924 buildings / 7273 images / 113 assignments；orphan、architect mismatch、duplicate primary image/function 均为 0，RLS/policy 与 advisors 通过。PR #60 更新读取基线；Reviewed release `29188112986` 成功。线上 API 为 101 cases / 70 profiles / 0 missing relation，CASE-044 三语 CASE、三语 building 与图片全部 HTTP 200。G6 已迁移 49/118，尚未迁移 69；版本化队列中尚未完成正式审核的记录为 48。详见 `GRADUATION_PUBLIC_TOILET_BATCH_001_PRODUCTION.md`。

下一个最小可验证步骤：从剩余 48 条未正式审核记录中选择用途边界清晰的小批次，只读核验建筑身份、年份、地点、设计者、准确图片、摄影者和开放许可，再决定是否进入 migration 准备。

Shimokitazawa retail / mixed-use batch 001 已完成 CASE-038/039 的只读审核。BONUS TRACK 与 MIKAN SHIMOKITA 是下北泽两个独立地点、不同年份和设计团队的建成商业项目，身份、年份、用途与图片均通过。BONUS TRACK 的 MDPI DOI/JATS 确认 Version of Record 为 CC BY 4.0，Figure 3 图注明确为 morinakayasuaki，已取得并核对 2340×1568 原始 figure；现有 550×369 本地图需在迁移前替换。MIKAN Commons 图片为 Souka Kinmei 自有作品、2800×1572、CC0。生产无 target building/architect/profile conflict，`commercial` broad type 已存在。现有用途缺少零售商业，迁移前必须新增 `retail` function，不能只用宽泛 `mixed-use`。本批 2 条均未生产写入；G6 已迁移 49/118，尚未迁移 69，未正式审核队列从 48 减至 46。详见 `GRADUATION_NEW_BUILDING_SHIMOKITAZAWA_RETAIL_001_TRIAGE.md`。

只读决策已通过 PR #62 合并。BONUS TRACK 图片已由核验过的 MDPI Figure 3 原始 TIFF 更新为 2000×1340 网站 JPEG，署名和图片说明同步到权威 CSV 与生成数据。`retail` 四语 taxonomy 已准备 20 个明确别名，排除过宽的 `shop`、`store`、`店`、`店舗`；guarded apply、依赖感知 rollback、Supabase migration 和 PostgreSQL 18 隔离 dry-run 均已建立。生产只读预检确认 `commercial` 存在、`retail` 不存在、20 个 alias 冲突为 0；尚未写生产。

Retail taxonomy 001 与 CASE-038 高清图片已完成生产迁移、发布和线上验收。PR #63 合并版本化 taxonomy 与图片；Supabase migration `building_function_retail_001`（`20260712102033`）将 12/189 更新为 13 functions / 209 aliases，`retail` 四语各 5 个 alias、0 assignments。RLS/policy/anon SELECT 正常，advisors 无新增。Reviewed release `29188986536` 成功；CASE-038/039 中英日路由、CASE-038 2000×1340 图片均 HTTP 200，线上图片 SHA-256 与仓库一致。API 为 101 cases / 70 profiles / 0 missing relation。详见 `GRADUATION_RETAIL_TAXONOMY_001_PRODUCTION.md`。

CASE-038/039 migration pack 已生成：2 new architects / 2 buildings / 2 primary images / 2 profiles / 5 assignments。两条 CASE 保留不同 concept/keywords；两栋 building broad type 为 `commercial`，`retail` 为各自 primary function。生成器修正了非 Commons 图片 repository 被统一误标的问题，CASE-038 明确为 MDPI。完整历史 PostgreSQL 18.3 forward、外部 curated-image rollback 拒绝、精确 rollback/replay 全部通过。生产只读预检为五类 conflict 全部 0、required functions 3/3、type 1/1；基线 70/924/7273/113，预期写后 72/926/7275/118。尚未生产写入。详见 `GRADUATION_SHIMOKITAZAWA_RETAIL_BATCH_001_DRY_RUN.md`。

CASE-038/039 生产 migration 已成功执行，实际 version `20260712104005`。总数精确更新为 72 profiles / 926 buildings / 7275 images / 118 assignments；目标 2 architects / 2 buildings / 2 images / 2 profiles / 5 assignments，orphan、architect mismatch、primary image/function 异常均为 0；CASE-038/039 profile 分别指向各自 building，concept 和 keywords 均保持两套独立值。RLS/policy 与 advisors 正常。生产 E2E 预跑发现 CASE-039 API architect 仍由 JSON compatibility fallback 返回旧 `Taiju Yamashita Design and Associates`，而 canonical 为 `Taiju Yamashita Design and Architecture`；已修正权威 CSV 与生成数据，并加入两条 canonical 回归断言。尚未运行数据库写后的 Reviewed release。

Shimokitazawa retail batch 001 已完成生产迁移、发布和线上验收。Supabase migration `graduation_shimokitazawa_retail_batch_001`（`20260712104005`）写入 2 architects / 2 buildings / 2 primary images / 2 profiles / 5 assignments；总数更新为 72/926/7275/118，orphan、architect mismatch、primary image/function 异常均为 0，两套 profile concept/keywords 保持独立。PR #66 修正 CASE-039 JSON compatibility fallback 的 architect 漂移并加入 canonical 回归断言。Reviewed release `29189628666` 成功；6 CASE 路由、6 building 路由、2 图片全部 HTTP 200，API 为 101 cases / 72 profiles / 0 missing。G6 已迁移 51/118，尚未迁移 67；尚未正式审核队列 46。详见 `GRADUATION_SHIMOKITAZAWA_RETAIL_BATCH_001_PRODUCTION.md`。

Retail-led mixed-use batch 002 已完成 CASE-074/116 的只读审核。Klein Dytham 与 MVRDV 官方页确认两栋项目身份、2011/2014 年份、设计者和 retail + residential/mixed program；Markthal 另具明确 covered public square 属性。两张 Commons 图人工确认准确，分别为 Jonathan Lin / CC BY-SA 2.0 / 4608×3126 与 Michielverbeek own work / CC BY-SA 4.0 / 4352×3264。生产仅有 MVRDV architect，可复用；Klein Dytham、两栋 building 与两个 profile 均无冲突。本批 2 条均通过，但现图仍是远程 URL，必须本地化后才可生成 migration。未正式审核队列从 46 减至 44。详见 `GRADUATION_NEW_BUILDING_RETAIL_MIXED_USE_002_TRIAGE.md`。

Retail-led mixed-use batch 002 的图片与公开数据已完成本地准备。CASE-074 优化为 2000×1356 / 826075 bytes / SHA-256 `1c0d1f0a61a6962b1a0dad829e4fe97d51e7a121e752728accc25b4da0aea5c7`；CASE-116 为 2000×1500 / 998567 bytes / SHA-256 `fb6583a1511215e133910bb1c56daf033c32e45fa0e79ffd8c57f8e773e18958`。两张最终 JPEG 已人工复核，权威 CSV、公开 CSV/JSON 与源 JSON 已同步本地路径、摄影者、许可和审核说明。46 files / 164 unit tests、lint、typecheck、graduation QA 全部通过。尚未生成或写入数据库 migration。

Retail-led mixed-use batch 002 migration pack 已生成：2 architects（1 new Klein Dytham、1 existing MVRDV）/ 2 buildings / 2 primary images / 2 profiles / 5 assignments。两栋 broad type 为 `mixed-use`，`retail` 为 primary；Markthal 另有 `public-space` secondary。完整历史 PostgreSQL 18.3 forward、外部 curated-image rollback 拒绝、精确 rollback/replay 全部通过。生产只读预检为新 architect 与四类 target conflict 全部 0、MVRDV exact match 1、functions 3/3、type 1/1；基线 72/926/7275/118，预期写后 74/928/7277/123。migration 与 reviewed apply SQL 字节一致，尚未生产写入。详见 `GRADUATION_RETAIL_MIXED_USE_BATCH_002_DRY_RUN.md`。

Retail-led mixed-use batch 002 生产 migration 已成功执行，实际 version `20260712113024`。总数精确更新为 74 profiles / 928 buildings / 7277 images / 123 assignments；目标 1 new architect / 2 buildings / 2 images / 2 profiles / 5 assignments，orphan、architect mismatch、primary image/function 异常均为 0；两条 profile concept/keywords 保持独立，RLS/policy 与 advisors 正常。尚未运行数据库写后的 Reviewed release。

Retail-led mixed-use batch 002 已完成生产迁移、发布和线上验收。Supabase migration `graduation_retail_mixed_use_batch_002`（`20260712113024`）新增 1 个 Klein Dytham architect、复用既有 MVRDV，写入 2 buildings / 2 primary images / 2 profiles / 5 assignments；总数更新为 74/928/7277/123，orphan、architect mismatch、primary image/function 异常均为 0，两套 profile concept/keywords 保持独立。PR #71 合并 74-profile E2E 基线与 canonical 回归断言。Reviewed release `29191052908` 成功；6 CASE 路由、6 building 路由、2 图片全部 HTTP 200，API 为 101 cases / 74 profiles / 0 missing。G6 已迁移 53/118，尚未迁移 65；尚未正式审核队列 44。详见 `GRADUATION_RETAIL_MIXED_USE_BATCH_002_PRODUCTION.md`。

Disaster memorial batch 002 已完成 CASE-015 的只读审核。Kengo Kuma and Associates 官方页确认南三陆311纪念馆位于宫城县、2022 年完成、1,433 m² / 2 层，并展示灾害记忆与艺术作品；canonical broad type 决定为 `cultural`，既有 `museum` 为唯一 primary function，不把官方宽泛的 Community 分类误写为具体 `community-center`。Commons 原图为 Yasu 自有作品、5753×3835、CC BY-SA 3.0；仓库已有同源 1600×1066 图片，原图与本地图均人工确认准确。生产只读查询确认复用既有 `kengo-kuma`，target building/profile conflict 均为 0，function/type 各 1/1。本批批准进入 migration 准备，但尚未授权生产写入。G6 已迁移仍为 53/118，尚未正式审核队列从 44 减至 43。详见 `GRADUATION_NEW_BUILDING_DISASTER_MEMORIAL_002_TRIAGE.md`。

CASE-015 migration pack 已生成：复用既有 Kengo Kuma，准备写入 1 building / 1 primary image / 1 profile / 1 `museum` primary assignment。完整历史 PostgreSQL 18.3 forward、外部 curated-image rollback 拒绝、精确 rollback/replay 全部通过。生产只读预检为 target building/image/profile/assignment conflict 全部 0、architect exact match 1、function/type 各 1/1；基线 74/928/7277/123，预期写后 75/929/7278/124。CLI migration 与 reviewed apply SQL 字节一致，尚未生产写入。详见 `GRADUATION_DISASTER_MEMORIAL_BATCH_002_DRY_RUN.md`。

CASE-015 生产 migration 已成功执行，实际 version `20260712115840`。总数精确更新为 75 profiles / 929 buildings / 7278 images / 124 assignments；目标 1 building / 1 image / 1 profile / 1 assignment 全部匹配，orphan、architect mismatch、primary image/function 异常均为 0。graduation profile/function assignment RLS 与 published-only policy 正常，advisors 保持既有 13 security / 27 performance。尚未运行数据库写后的 Reviewed release。

Disaster memorial batch 002 已完成生产迁移、发布和线上验收。Supabase migration `graduation_disaster_memorial_batch_002`（`20260712115840`）复用既有 Kengo Kuma，写入 1 building / 1 primary image / 1 profile / 1 `museum` primary assignment；总数更新为 75/929/7278/124，orphan、architect mismatch、primary image/function 异常均为 0。PR #75 修正 JSON compatibility layer 的 architect 与图片署名漂移并加入 canonical 回归断言。Reviewed release `29191945706` 成功；3 CASE 路由、3 building 路由和图片全部 HTTP 200，API 为 101 cases / 75 profiles / 0 missing。G6 已迁移 54/118，尚未迁移 64；尚未正式审核队列 43。详见 `GRADUATION_DISASTER_MEMORIAL_BATCH_002_PRODUCTION.md`。

Zero-waste batch 003 已完成 CASE-002 Kamikatsu Zero Waste Center 的只读审核。Hiroshi Nakamura & NAP 官方页确认 2020 年完成、上胜町地址、木造、1,176 m²，以及分类、储存、修理、再利用、教育、研究、交流与住宿的复合功能。Commons 图人工确认准确且声明 CC0，但页面明确缺少作者信息；上传者 `Sorrysorry` 不被自动写成摄影者。生产也没有 recycling/waste-management function，不能仅以 `community-center` 掩盖核心用途。本批身份通过但迁移批准 0 条；G6 已迁移仍为 54/118，尚未正式审核队列从 43 减至 42。详见 `GRADUATION_NEW_BUILDING_ZERO_WASTE_003_TRIAGE.md`。

KOIL interior batch 004 已完成 CASE-035 的只读审核。Naruse Inokuma 官方资料确认该对象是 2014 年 4 月完成、2,576 m² 的创新中心室内设计与监理，并非事务所独立设计的宿主建筑。现有 `KOIL_GARDEN.jpg` 虽为 Souka Kinmei 自有作品、CC0、1924×1080，但人工查看确认它拍摄的是带 `KOIL GARDEN by MITSUI FUDOSAN` 标识的另一处低层外部设施，不是 2014 年创新中心室内。权利安全不能替代对象正确性，本批迁移批准 0 条；G6 已迁移仍为 54/118，尚未正式审核队列从 42 减至 41。详见 `GRADUATION_NEW_BUILDING_KOIL_INTERIOR_004_TRIAGE.md`。

MIYASHITA PARK batch 005 已完成 CASE-040 的只读审核。Nikken 官方页确认 2020 年涩谷 PPP 重建项目包含公园、停车、四层零售和十八层酒店；Takenaka 为 lead architect，Nikken 为 project architect，必须使用联合实体保留两者。现图虽为 Syced / CC0，但人工确认主体是 Tower Records 和铁路，不是项目本体。新候选 `Miyashita Park 2025 May 26 various 01.jpg` 为 Nesnad 自有作品、4032×3024、CC BY 4.0，人工确认准确展示复合体、屋顶绿化与项目标识。生产 target building/profile conflict 0，functions 3/3、type 1/1。本批批准在图片替换后进入 migration；G6 已迁移仍为 54/118，尚未正式审核队列从 41 减至 40。详见 `GRADUATION_NEW_BUILDING_MIYASHITA_PARK_005_TRIAGE.md`。

CASE-040 替代图已完成本地化。Nesnad 原图优化为 2000×1500 网站 JPEG，SHA-256 `164a7731ca18c6ac26ed5519873ce9bbc0c1bbc4cd84bf427906a1373483baf2`；最终文件已人工复核，权威 CSV、公开 CSV/JSON、源 JSON 与 image manifest 已同步 `Photo: Nesnad / Wikimedia Commons`、CC BY 4.0 和准确 Commons 来源。兼容 architect 同步为 `Takenaka Corporation + Nikken Sekkei`。尚未生成或写入数据库 migration。

CASE-040 migration pack 已生成：1 new joint architect / 1 building / 1 primary image / 1 profile / 3 assignments，`mixed-use` primary，`retail` 与 `public-space` secondary。完整历史 PostgreSQL 18.3 forward、外部 curated-image rollback 拒绝、精确 rollback/replay 全部通过。生产预检为五类 conflict 全部 0、functions 3/3、type 1/1；基线 75/929/7278/124，预期写后 76/930/7279/127。CLI migration 与 reviewed apply SQL 字节一致，尚未生产写入。详见 `GRADUATION_MIYASHITA_PARK_BATCH_005_DRY_RUN.md`。

CASE-040 生产 migration 已成功执行，实际 version `20260712124927`。总数精确更新为 76 profiles / 930 buildings / 7279 images / 127 assignments；目标 1 architect / 1 building / 1 image / 1 profile / 3 assignments 全部匹配，orphan、primary image/function 异常均为 0，RLS 正常，advisors 保持既有 13 security / 27 performance。尚未运行数据库写后的最终 Reviewed release。

MIYASHITA PARK batch 005 已完成生产迁移、双阶段发布和线上验收。Supabase migration `graduation_miyashita_park_batch_005`（`20260712124927`）写入 1 joint architect / 1 building / 1 primary image / 1 profile / 3 assignments；总数更新为 76/930/7279/127，关系异常为 0。静态 release `29192872574` 与最终 release `29193418710` 均成功；3 CASE、3 building 与图片全部 HTTP 200，API 为 101 cases / 76 profiles / 0 missing，并返回准确联合建筑师与 Nesnad / CC BY 4.0 署名。G6 已迁移 55/118，尚未迁移 63；尚未正式审核队列 40。详见 `GRADUATION_MIYASHITA_PARK_BATCH_005_PRODUCTION.md`。

Shiroiya Hotel batch 006 已完成 CASE-028 的只读审核。官方确认项目由既有主楼改造与新建 Green Tower 共同组成同一酒店复合体，Sou Fujimoto 设计、2020 年完成、位于前桥。Commons 图为 こやまひろ 自有作品、2000×1500、CC BY 4.0，人工确认准确。生产可复用 `fujimoto`，building/profile conflict 均为 0，但缺少 `hotel`/`hospitality` function；不能只用 mixed-use 或 retail 隐藏核心住宿用途。本批批准在新增 `hotel` taxonomy 后迁移；G6 已迁移仍为 55/118，尚未正式审核队列从 40 减至 39。详见 `GRADUATION_NEW_BUILDING_SHIROIYA_HOTEL_006_TRIAGE.md`。

下一个最小可验证步骤：通过 PR 合并审核决策；随后建立 `hotel` 中英日多语言 taxonomy、guarded migration、rollback 与隔离 PostgreSQL dry-run。

Hotel taxonomy 001 已完成本地与生产只读预检：新增 `hotel` / `commercial` 四语 20 aliases，不把泛旅游或住宅意图并入酒店搜索。生产为 0 function conflict / 0 alias conflict / 0 assignment / 1 commercial type，基线 13 functions / 209 aliases / 127 assignments；相关三表 RLS/policy 正常，advisors 保持既有 13 security / 27 performance。隔离 PostgreSQL forward、assignment rollback guard、精确 rollback 和 replay 均通过；55 files / 193 tests、typecheck、lint 与 migration 字节一致通过。完整 E2E 18/19，唯一失败来自受保护的并发 `architect-content.ts` 工作，本批未修改。Supabase migration 尚未写入生产。详见 `GRADUATION_HOTEL_TAXONOMY_001_DRY_RUN.md`。

下一个最小可验证步骤：通过 PR 合并 hotel taxonomy；紧接着重复生产冲突预检，通过后才 apply migration。

Hotel taxonomy 001 已完成生产迁移、发布与线上验收。Supabase migration `building_function_hotel_001`（`20260712143511`）将 13/209 functions/aliases 更新为 14/229，assignments 保持 127；目标为 1 function / 20 aliases / 4 locales / 0 assignments。RLS/policy 正常，advisors 保持既有 13 security / 27 performance。Reviewed release `29196546583` 在 9m49s 内成功。线上 API 为 101 cases / 76 profiles / 0 missing；CASE-028 保持公开但尚未 unified，等待建筑 migration。当前搜索还未消费 function aliases，属 G7 范围。详见 `GRADUATION_HOTEL_TAXONOMY_001_PRODUCTION.md`。

下一个最小可验证步骤：生成 CASE-028 迁移包，复用 `fujimoto`，建立 1 canonical hotel complex / 1 primary image / 1 profile / 2 assignments，先跑隔离 dry-run。

CASE-028 Shiroiya Hotel batch 006 migration pack 已生成：复用既有 `fujimoto`，不新增 architect；建立 1 canonical hotel complex / 1 exact CC BY 4.0 primary image / 1 published profile / 2 assignments，`hotel` primary、`retail` secondary。生产只读预检为 architect exact 1，building/image/profile/assignment conflict 全部 0，functions 2/2、type 1/1，基线 76/930/7279/127。全历史隔离 PostgreSQL forward、外部 curated-image rollback guard、精确 rollback 与 replay 全部通过；migration 由项目内 CLI 创建并与 apply SQL 字节一致。56 files / 197 tests、graduation QA 0 problem、typecheck 和 lint 通过；本地图片 1600×1200，SHA-256 `31464c57312a8c2c1b477568591f5291998834c068e6d78d5f038fcabc5a148b`。生产尚未写入。详见 `GRADUATION_SHIROIYA_HOTEL_BATCH_006_DRY_RUN.md`。

下一个最小可验证步骤：运行全量单测、typecheck、lint 和图片 QA；通过 PR 后立即重复生产冲突预检。

CASE-028 Shiroiya Hotel batch 006 已完成生产迁移、兼容纠偏、发布和线上验收。Supabase migration `graduation_shiroiya_hotel_batch_006`（`20260712145447`）复用 `fujimoto`，写入 1 building / 1 primary image / 1 profile / 2 assignments；总数更新为 77/931/7280/129，orphan、architect mismatch、primary image/function 异常均为 0，RLS/policy 和 advisors 正常。PR #88 修正 JSON compatibility architect 漂移并加入 canonical 回归。Reviewed release `29197317708` 首次被短暂的 Supabase REST malformed response 拦截且未部署；生产 buildings 全字段控制字符扫描为 0，第二次 9m55s 完整成功。6 CASE/building 三语路由、图片全部 HTTP 200，API 为 101 cases / 77 profiles / 0 missing，并返回 Sou Fujimoto 与 こやまひろ / CC BY 4.0。G6 已迁移 56/118，尚未迁移 62，尚未正式审核队列 39。详见 `GRADUATION_SHIROIYA_HOTEL_BATCH_006_PRODUCTION.md`。

ACROS Fukuoka batch 007 已完成 CASE-016 的只读审核。ACROS 官方与竹中工务店资料一致确认：基本构想为日本设计、竹中工务店、Emilio Ambasz，正式设计为日本设计、竹中工务店；因此拒绝当前单一 `Emilio Ambasz` 表达，canonical architect 决定为新联合实体 `Nihon Sekkei + Takenaka Corporation`，并把 Emilio Ambasz 保留为 building 来源说明中的 basic concept contributor。Commons 原图为 Kenta Mabuchi / Flickr、2426×1625、CC BY-SA 2.0，FlickreviewR 已确认；仓库 1600×1071 文件人工确认准确展示建筑本体与阶梯绿化。broad type 为 `mixed-use`，functions 为 `mixed-use` primary、`theatre`/`retail`/`public-space` secondary，不把“公民复合设施”误缩窄成 `community-center`。生产 target building/profile conflict 0，可复用 Takenaka，required functions 4/4、type 1/1；尚未生成 migration 或写生产。G6 已迁移仍为 56/118，尚未迁移 62；尚未正式审核队列从 39 减至 38。详见 `GRADUATION_NEW_BUILDING_ACROS_FUKUOKA_007_TRIAGE.md`。

下一个最小可验证步骤：通过 PR 固化 CASE-016 只读决策；合并后同步 compatibility architect，生成 1 joint architect / 1 building / 1 primary image / 1 profile / 4 assignments 的 guarded migration 与 rollback，并执行全历史隔离 PostgreSQL dry-run。生产写入前必须重复冲突预检。

CASE-016 ACROS Fukuoka batch 007 migration pack 已生成。兼容数据 architect 已从错误的单一 `Emilio Ambasz` 对齐为 `Nihon Sekkei + Takenaka Corporation`；migration 建立 1 new joint architect / 1 building / 1 primary image / 1 profile / 4 assignments，`mixed-use` primary，`theatre`、`retail`、`public-space` secondary。全历史隔离 PostgreSQL 18.3 已重放至 Shiroiya Hotel，forward、外部 curated-image rollback guard、精确 rollback/replay 全部通过。Supabase migration `20260712153311_graduation_acros_fukuoka_batch_007.sql` 由项目内 CLI 创建并与 reviewed apply SQL 字节一致。生产基线 77/931/7280/129，预期写后 78/932/7281/133；尚未生产写入。详见 `GRADUATION_ACROS_FUKUOKA_BATCH_007_DRY_RUN.md`。

下一个最小可验证步骤：运行 unit、graduation QA、typecheck、lint、图片 QA 与 `git diff --check`；通过 PR 合并 migration pack 后立即重复生产冲突预检，仍为 0 才允许 apply。

CASE-033 Yu no Eki Ohyu batch 008 已完成生产迁移、测试基线纠偏、发布和线上验收。Supabase migration `graduation_yu_no_eki_ohyu_batch_008`（`20260712231018`）复用 `kengo-kuma`，写入 1 building / 1 primary image / 1 published profile / 4 assignments；总数更新为 79/933/7282/137，orphan、architect mismatch、primary image/function 异常均为 0，RLS/policy 正常，advisors 保持 13 security / 27 performance。第一次 Reviewed release `29213008830` 因渲染 E2E 仍硬编码旧 fallback 标题而在部署前停止；PR #97 将布局测试改为验证实际 H1 与 image alt 一致，同时保留 unified-read 的严格 canonical 断言。第二次 release `29213243381` 在 8m11s 内完整成功。6 个中英日 CASE/building 路由和图片全部 HTTP 200，API 为 101 cases / 79 profiles / 0 missing，并返回 Kengo Kuma 与掬茶 / CC BY-SA 4.0。G6 已迁移 58/118，尚未迁移 60；尚未正式审核队列 37。详见 `GRADUATION_YU_NO_EKI_OHYU_BATCH_008_PRODUCTION.md`。

下一个最小可验证步骤：从剩余 37 条未正式审核记录中选择下一个不需降低身份或图片权利标准的边界清晰小批次，先完成只读调查和生产冲突预检。

KAIT Workshop batch 009 已完成 CASE-034 的正式只读审核。神奈川工科大学确认该设施由 Junya Ishigami 设计、2008 年春完成、约 2,000 m²，是校园内支持学生自主制作的无隔墙开放工坊；对附近学生的科学活动只是附带开放，不扩大为 community center。broad type 决定为 `educational`，仅批准 `university` primary；当前没有 makerspace taxonomy，但不以 `mixed-use` 掩盖教育身份。Commons 图为 Epiq own work、3648×2736、CC BY-SA 3.0；仓库 1600×1200 文件人工确认准确展示 KAIT Workshop 室内柱林和制作设备。生产无 Junya Ishigami、target building/profile conflict，required function/type 各 1/1；尚未生成 migration 或写生产。G6 已迁移仍为 58/118，尚未迁移 60；尚未正式审核队列从 37 减至 36。详见 `GRADUATION_NEW_BUILDING_KAIT_WORKSHOP_009_TRIAGE.md`。

下一个最小可验证步骤：通过 PR 固化 CASE-034 只读决策；合并后同步 compatibility architect，生成 1 architect / 1 building / 1 primary image / 1 profile / 1 assignment 的 guarded migration 与 rollback，并执行全历史隔离 PostgreSQL dry-run。

CASE-034 KAIT Workshop batch 009 migration pack 已生成。兼容数据 architect 已从 `Junya Ishigami and Associates` 对齐为 canonical `Junya Ishigami`；migration 建立 1 architect / 1 building / 1 primary interior image / 1 profile / 1 `university` assignment。全历史隔离 PostgreSQL 18.3 已重放至 Yu no Eki Ohyu，forward、外部 curated-image rollback guard、精确 rollback/replay 全部通过。Supabase migration `20260713002212_graduation_kait_workshop_batch_009.sql` 由项目内 CLI 创建并与 reviewed apply SQL 字节一致。生产基线 79/933/7282/137，预期写后 80/934/7283/138；尚未生产写入。详见 `GRADUATION_KAIT_WORKSHOP_BATCH_009_DRY_RUN.md`。

下一个最小可验证步骤：运行 unit、graduation QA、typecheck、lint、图片 QA 与 `git diff --check`；通过 PR 合并 migration pack 后立即重复生产冲突预检，仍为 0 才允许 apply。

CASE-016 ACROS Fukuoka batch 007 已完成生产迁移、发布和线上验收。Supabase migration `graduation_acros_fukuoka_batch_007`（`20260712153752`）写入 1 joint formal-design architect / 1 building / 1 primary image / 1 published profile / 4 assignments；总数更新为 78/932/7281/133，orphan、architect mismatch、primary image/function 异常均为 0，RLS/policy 正常，advisors 保持 13 security / 27 performance。四条 assignment evidence 均保留 Emilio Ambasz 的 basic-concept 角色。PR #92 将生产基线更新为 78 并加入 canonical 回归；Reviewed release `29198674126` 在 8m11s 内成功。6 个中英日 CASE/building 路由和图片全部 HTTP 200，API 为 101 cases / 78 profiles / 0 missing，并返回 Nihon Sekkei + Takenaka Corporation 与 Kenta Mabuchi / CC BY-SA 2.0。G6 已迁移 57/118，尚未迁移 61；尚未正式审核队列 38。详见 `GRADUATION_ACROS_FUKUOKA_BATCH_007_PRODUCTION.md`。

下一个最小可验证步骤：从剩余 38 条未正式审核记录中选择下一个不需降低身份或图片权利标准的边界清晰小批次，先完成只读调查和生产冲突预检。

Yu no Eki Ohyu batch 008 已完成 CASE-033 的正式只读审核。Kengo Kuma 官方确认项目为 2018 年秋田县鹿角市、1,026 m² 的 community center，组合 shop、café、open-air theater、park、footbath 和 biotope；鹿角市确认其法定道路休息站身份、地址、停车、充电、24 小时厕所、市场和足汤。broad type 决定为 `transportation`，functions 为 `transport-hub` primary、`community-center`/`retail`/`public-space` secondary；不因附属露天活动空间误加 `theatre`。Commons 原图为掬茶 own work、6000×3376、CC BY-SA 4.0；仓库 1600×900 文件人工确认准确展示建筑主体。生产可复用 `kengo-kuma`，target building/profile conflict 0，required functions 4/4、type 1/1；尚未生成 migration 或写生产。G6 已迁移仍为 57/118，尚未迁移 61；尚未正式审核队列从 38 减至 37。详见 `GRADUATION_NEW_BUILDING_YU_NO_EKI_OHYU_008_TRIAGE.md`。

下一个最小可验证步骤：通过 PR 固化 CASE-033 只读决策；合并后同步 compatibility architect，生成 1 building / 1 primary image / 1 profile / 4 assignments 的 guarded migration 与 rollback，并执行全历史隔离 PostgreSQL dry-run。

CASE-033 Yu no Eki Ohyu batch 008 migration pack 已生成。兼容数据 architect 已从 `Kengo Kuma and Associates` 对齐为 canonical `Kengo Kuma`；migration 复用既有 `kengo-kuma`，建立 1 building / 1 primary image / 1 profile / 4 assignments，`transport-hub` primary，`community-center`、`retail`、`public-space` secondary。全历史隔离 PostgreSQL 18.3 已重放至 ACROS Fukuoka，forward、外部 curated-image rollback guard、精确 rollback/replay 全部通过。Supabase migration `20260712230644_graduation_yu_no_eki_ohyu_batch_008.sql` 由项目内 CLI 创建并与 reviewed apply SQL 字节一致。生产基线 78/932/7281/133，预期写后 79/933/7282/137；尚未生产写入。详见 `GRADUATION_YU_NO_EKI_OHYU_BATCH_008_DRY_RUN.md`。

下一个最小可验证步骤：运行 unit、graduation QA、typecheck、lint、图片 QA 与 `git diff --check`；通过 PR 合并 migration pack 后立即重复生产冲突预检，仍为 0 才允许 apply。

CASE-034 KAIT Workshop batch 009 已完成生产迁移、发布和线上验收。Supabase migration `graduation_kait_workshop_batch_009`（`20260713002530`）写入 1 architect / 1 building / 1 primary interior image / 1 published profile / 1 `university` primary assignment；总数更新为 80/934/7283/138，orphan、architect mismatch、primary image/function 异常均为 0，RLS/policy 正常，advisors 保持 13 security / 27 performance。PR #101 将生产读取基线更新为 80 并加入 canonical 回归；Reviewed release `29215437762` 在 8m38s 内完整成功。6 个中英日 CASE/building 路由和图片最终全部 HTTP 200，API 为 101 cases / 80 profiles / 0 missing，并返回 Junya Ishigami 与 Epiq / CC BY-SA 3.0。首次独立日文建筑请求在部署传播窗口短暂命中旧 edge 状态，随后的正文核对及连续三次请求均为 canonical HTTP 200。G6 已迁移 59/118，尚未迁移 59；尚未正式审核队列 36。详见 `GRADUATION_KAIT_WORKSHOP_BATCH_009_PRODUCTION.md`。

下一个最小可验证步骤：从剩余 36 条未正式审核记录中选择下一个不需降低身份或图片权利标准的边界清晰小批次，先完成只读调查和生产冲突预检。

Roadside Station Mashiko batch 010 已完成 CASE-043 正式只读审核。MOUNT FUJI ARCHITECTS STUDIO 官方资料确认项目位于栃木、2016 年完成、主要用途为道之驿；道之驿运营方与关东道之驿资料确认地址、停车、餐厅和物产销售。broad type 决定为 `transportation`，functions 为 `transport-hub` primary、`retail` secondary；不以证据不足的信息扩大为 `community-center` 或 `public-space`。Commons 图为アラツク own work、4522×1129、CC BY-SA 4.0；仓库 1600×399 文件人工确认准确。生产 architect/building/image/profile conflicts 全部 0，functions 2/2、type 1/1。本批尚未生成 migration 或写生产；G6 已迁移仍为 59/118，尚未正式审核队列从 36 减至 35。详见 `GRADUATION_NEW_BUILDING_ROADSIDE_STATION_MASHIKO_010_TRIAGE.md`。

下一个最小可验证步骤：通过 PR 固化 CASE-043 决策；随后生成 guarded migration/rollback，并执行全历史隔离 PostgreSQL dry-run。生产写入前必须重复冲突预检。

CASE-043 Roadside Station Mashiko batch 010 migration pack 已生成：1 new architect / 1 building / 1 primary image / 1 published profile / 2 assignments，`transport-hub` primary、`retail` secondary。全历史隔离 PostgreSQL 18.3 forward、外部 curated-image rollback guard、精确 rollback/replay 全部通过。生产基线 80/934/7283/138，预期写后 81/935/7284/140；尚未写生产。详见 `GRADUATION_ROADSIDE_STATION_MASHIKO_BATCH_010_DRY_RUN.md`。

下一个最小可验证步骤：通过 PR 合并 migration pack；随后重复生产冲突预检，仍为 0 才允许 apply。

CASE-043 Roadside Station Mashiko batch 010 已完成生产迁移、发布和线上验收。Supabase migration `graduation_roadside_station_mashiko_batch_010`（`20260713013758`）写入 1 architect / 1 building / 1 primary image / 1 profile / 2 assignments；总数更新为 81/935/7284/140，目标关系、RLS/policy 正常，advisors 保持 13 security / 27 performance。首次 release `29217933562` 因 GitHub Actions 的 Wikimedia 请求得到合法 fallback PNG 而在部署前停止；PR #108 移除不稳定第三方 CI 夹具后，release `29218152614` 在 9m43s 内成功。6 个三语 CASE/building 路由和图片全部 HTTP 200，API 为 101 cases / 81 profiles / 0 missing。G6 已迁移 60/118，尚未迁移 58；尚未正式审核队列 35。详见 `GRADUATION_ROADSIDE_STATION_MASHIKO_BATCH_010_PRODUCTION.md`。

下一个最小可验证步骤：从剩余 35 条未正式审核记录中选择身份与开放图片证据完整的下一条，先完成只读调查与生产冲突预检。

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
