# G6 disaster/community batch 001 审核记录

日期：2026-07-12

## 结论

- 批次边界仅包含 `CASE-037` 与 `CASE-090`，不混入纪念馆、车站、福利设施或一般城市公共空间。
- 两条 CASE 是同一建成项目 `Home-for-All in Rikuzentakata / 陸前高田のみんなの家` 的两套毕业分析，不是两栋建筑。
- 将来迁移时必须保留两条 CASE 路由及各自 concept/keywords，并共同引用一个 `home-for-all-rikuzentakata` canonical building。
- 本批迁移批准数为 0。准确建成照片与开放许可仍无法同时满足，状态保持 `no_safe_image_yet`。

## 身份核验

Home For All 的项目页与施工方 Shelter 的项目记录在以下关键字段一致：

- 地点：岩手县陆前高田市；
- 建筑面积：30.18 m²；
- 延床面积：29.96 m²；
- 结构与层数：木造、2 层；
- 完成：2012 年 11 月；
- 设计：伊东丰雄建筑设计事务所、乾久美子建筑设计事务所、藤本壮介建筑设计事务所、平田晃久建筑设计事务所；
- 施工：Shelter。

项目不是静态留在原址：2016 年因土地抬高工程拆除，2022 年在陆前高田站附近重建，并继续使用保存下来的海啸盐害杉木柱。这里记录为同一建筑的迁移/重建历史，不另建第二个 canonical building。

身份来源：

- https://www.home-for-all.org/rikuzentakata
- https://en.shelter.inc/our-works/home-for-all-in-rikuzentakata/

## 图片审核

- 既有 Commons/Openverse 结果是威尼斯双年展日本馆展览或模型，不是陆前高田建成建筑，禁止作为封面。
- 官方项目页可以证明建筑身份，但页面摄影未声明开放复用许可，不能下载或迁移。
- 因此两条 CASE 都继续使用 placeholder，不生成 image seed，不生成 migration。

## 生成器前置修复

共享建筑首次写入前，批次生成器已增加显式 `migration_mode`：

- 未声明时保持旧行为 `create_canonical_building`；
- `reuse_existing_canonical_building` 必须同时匹配生产 building UUID 与 slug；
- 复用模式只生成独立 profile，不重复生成 building、architect、primary image 或 function assignment；
- profile 临时表不再错误限制 `building_id` 唯一；
- 精确 rollback 只删除本批 profile，并保留复用的 canonical building；
- 本批新建 building 如果后来出现外部 profile、图片或其他关系，rollback 继续拒绝删除。

四个历史 G6 migration pack 已重新通过隔离 PostgreSQL 18.3 forward / guard / rollback / second-forward / second-rollback 演练。新增共享 building 单元测试证明两个 CASE 可保持不同 concept/keywords 并引用同一 building。

## 当前写入权限

本记录与决策文件只完成只读审核，不授权生产写入、图片下载或发布。下一步不是放宽图片标准，而是先完成生成器变更的 PR 合并；之后继续下一个边界清晰的 G6 批次，等待准确开放图片出现时再处理 CASE-037/090。
