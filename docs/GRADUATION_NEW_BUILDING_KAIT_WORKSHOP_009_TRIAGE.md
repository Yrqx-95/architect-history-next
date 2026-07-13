# G6 KAIT Workshop batch 009 审核记录

日期：2026-07-13

## 结论

- `CASE-034 KAIT Workshop` 的建筑身份、2008 年、神奈川工科大学校园、Junya Ishigami 设计、大学自主制作工坊用途和现有图片均通过只读审核。
- 生产不存在 Junya Ishigami architect、目标 building 或 CASE-034 profile；本批需要建立 canonical `junya-ishigami`。
- 本批批准进入 migration 准备，但尚未修改公开 CASE 数据、生成 migration 或写入生产。

## 身份与用途证据

- 神奈川工科大学官方英文页确认 KAIT Workshop 由 Junya Ishigami 规划，建筑约 2,000 m²、屋顶高度 5 m，由 305 根柱支撑，是无隔墙的开放制作空间。
- 大学日文页确认设施于 2008 年春完成，设计者为石上纯也，服务学生自主、创造性制作活动。
- 官方同时明确它不属于大学正式课程，但仍是校园内面向学生的大学设施；设备包括陶艺、失蜡铸造、金属、木工、激光切割、3D 打印和多种加工机器。
- 对附近中小学生的科学课程与实践活动属于附带开放项目，不足以把 canonical function 扩大为 `community-center`。

## 用途决定

- broad type：`educational`。
- function：`university` primary。
- 不添加 `school`：主体机构和核心使用者是大学，`university` 已准确覆盖。
- 不添加 `community-center`：对外活动存在，但官方核心定位仍是支持大学生自主制作的校园设施。
- 当前 taxonomy 没有细粒度 `workshop` / `makerspace`；本批不为单一案例临时造词，也不使用宽泛 `mixed-use` 掩盖教育身份。

## 图片审核

- Commons 文件：`KAIT_Workshop_Junya_Ishigami_internal_view.JPG`。
- 摄影者：Epiq；来源：own work；拍摄日期：2011-05-23。
- 原始尺寸：3648×2736；许可：CC BY-SA 3.0。
- 仓库文件：`public/images/graduation/cases/case-034-kait-workshop.jpg`，1600×1200，SHA-256 `1c467d7fd42f96314f6b4bc6fcea859f1dc5e221e1ab5156bc118c52a50e03fb`。
- 已人工查看本地文件：画面准确展示 KAIT Workshop 开放室内、白色柱林、天窗和制作设备，不是 KAIT Plaza 或普通校园教室；可继续使用。

## 生产只读预检

- `junya-ishigami` / Junya Ishigami architect matches：0。
- `kait-workshop` / Kanagawa Institute of Technology Workshop building conflicts：0。
- CASE-034 profile conflict：0。
- required `university` function：1/1 active。
- required `educational` broad type：1/1。

## 来源

- Kanagawa Institute of Technology English：https://en.kait.jp/facilities/kait-workshop.html
- 神奈川工科大学日本语：https://www.kait.jp/about/equipment/kaitkoubou/
- Wikimedia Commons：https://commons.wikimedia.org/wiki/File:KAIT_Workshop_Junya_Ishigami_internal_view.JPG

## 队列影响与下一门槛

- 本批正式审核 1 条；G6 已迁移仍为 58/118，尚未迁移 60；尚未正式审核队列从 37 减至 36。
- 下一步先通过 PR 固化审核决策；随后同步 CASE-034 compatibility architect 为 canonical `Junya Ishigami`，生成 1 architect / 1 building / 1 primary image / 1 profile / 1 assignment 的 guarded migration 与 rollback，并运行全历史隔离 PostgreSQL dry-run。
- 生产写入前必须重复冲突预检；任何身份、图片或用途证据漂移都应暂停。
