# Graduation theatre batch 001 生产记录

日期：2026-07-12

## 批次范围

- 4 个毕业案例：CASE-057、CASE-117、CASE-122、CASE-139。
- 1 个新联合建筑师主体。
- 4 个新建筑主体。
- 4 张已审核主图。
- 4 个 published graduation profiles。
- 6 条 approved function assignments：4 条主 `theatre`，Harpa 与 The Shed 各有 1 条次 `mixed-use`。
- CASE-091 的身份和用途成立，但没有可确认开放许可的准确图片，保持 `no_safe_image_yet`，未进入迁移。

## 图片与来源审核

- CASE-057 使用 Ebiebi2 的完整会馆外观，CC BY-SA 4.0。
- CASE-117 使用 Christian David 的 Oslo Opera House 完工照片，CC BY-SA 4.0。
- CASE-122 拒绝 2010 年施工中旧图，替换为 Gary J. Wood 的 2017 年完工外观，CC BY-SA 2.0。
- CASE-139 拒绝信息量不足的局部近景，替换为 Ajay Suresh 的完整建筑外观，CC BY 2.0。
- 4 张图均人工确认建筑对应关系，本地化为 2000px JPEG 并移除元数据。

## 发布与迁移顺序

1. PR #30 合并审核数据、图片、正式决策和 guarded migration pack，commit `b65eb54`。
2. 首次 Reviewed production release `29175552913` 被旧的公开案例数量基线拦截，在部署与数据库写入前停止。
3. PR #31 将公开案例基线从 100 更新为 101，commit `b4bfcb2`；Reviewed production release `29175745862` 成功，先发布 4 张图片与公开数据。
4. 生产冲突复查：building、profile、新 architect、image 冲突均为 0；所需 function 与 cultural type 全部存在。
5. 应用 Supabase migration `graduation_theatre_batch_001`，版本 `20260712015846`。
6. 写后核验：61 published profiles；本批 4 buildings、4 images、4 primary images、4 profiles、6 approved assignments、4 primary assignments；true orphan profile、architect relation、function assignment 均为 0。
7. PR #32 将生产读取基线从 57 更新为 61，merge commit `5215977`。
8. 最终 Reviewed production release `29176154362` 成功，质量门、完整测试、Cloudflare deploy 与生产 200/404 路由语义检查全部通过。

## 线上验收

- `/api/v1/graduation/cases` 返回 `source=supabase+json`、101 个公开案例、61 profiles、61 个 unified CASE ID。
- CASE-057、117、122、139 全部存在于 unified CASE ID。
- `missingFallbackCaseIds=[]`，`missingBuildingCaseIds=[]`。
- 4 个 CASE 路由和 4 个主体 building 路由均返回 HTTP 200。
- 4 张本地图片均返回 HTTP 200、`image/jpeg`，线上字节数与发布文件一致。

## 已知边界

- 统一 profile 完成 61 个，但 canonical image takeover 准入仍为 0；毕业页面继续读取已审核 JSON fallback 图片，等待 G8 逐条切换。
- 全库 915 座建筑中 875 条旧记录的 `architect_id` 仍为空；这是既有覆盖缺口。已填 `architect_id` 却找不到对应建筑师的真实孤儿关系为 0，本批 4 条关系全部有效。
- GitHub Actions 仍提示 `actions/checkout@v4` 与 `actions/setup-node@v4` 的 Node 20 action runtime 兼容警告；本次 runner 强制使用 Node 24，未影响发布。
