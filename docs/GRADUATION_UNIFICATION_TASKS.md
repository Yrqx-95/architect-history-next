# 毕业制作案例与主体建筑统一任务清单

更新时间：2026-07-12  
状态：进行中  
唯一主记录：本文件  
当前下一步：进入 `G6`，对 101 个 new-building candidates 按来源可靠度和毕业页面价值分批审核；第一批只做身份、来源和图片版权决策，不直接批量写库。

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

### G6 — 处理 101 个 new-building candidates

- [ ] 按来源可靠度和毕业页面使用价值分批。
- [ ] 新建主体前核验建筑身份、建筑师、年份、地点和官方来源。
- [ ] 图片按 Archistory 版权规则重新审核，不直接继承未经确认的旧图片。
- [ ] 每批有 apply、rollback、写后审计和发布记录。
- [ ] 新主体建立后再创建 graduation profile。

完成条件：每条记录已链接主体、明确拒绝或留下可解释的证据缺口。

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
