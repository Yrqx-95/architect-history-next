# Graduation museum batch 001 生产记录

日期：2026-07-12

## 批次范围

- 14 个毕业案例：CASE-041、045、047、051、052、053、054、055、058、060、109、118、124、132。
- 9 个新建筑师主体。
- 14 个新建筑主体。
- 14 张已审核主图。
- 14 个 published graduation profiles。
- 16 条 approved function assignments，其中 14 条主用途为 `museum`；CASE-051 另有 `library` 与 `mixed-use`。

## 图片与来源审核

- 14 张图片均核验建筑对应关系、作者、许可和 Commons 来源。
- CASE-051 拒绝 2020 年施工中旧图，替换为 Souka Kinmei 2024 年完工图片，许可 CC0。
- CASE-124 与 CASE-132 校正为具体摄影者及 CC BY-SA 4.0。
- CASE-079 未进入本批次：当前建筑可确认，但尚无同时满足建筑正确与开放许可可确认的图片，保持 `no_safe_image_yet`。

## 发布顺序

1. PR #26 合并 commit `66e66965570c622f8e2b9764a6d24766e6e79e8c`。
2. Reviewed production release `29174147839` 成功，先把 CASE-051 图片与公开数据部署到 Cloudflare。
3. 生产只读冲突复查：building、profile、新 architect 冲突均为 0；三个所需 function 与 cultural type 全部存在。
4. 应用 Supabase migration `graduation_museum_batch_001`，版本 `20260712005222`。
5. 写后核验通过：57 published profiles；本批 14 profiles、14 buildings、14 images、14 primary images、16 approved assignments、14 primary assignments；三类 orphan 均为 0。
6. PR #27 合并 commit `30fb35e402bf4993cc8ef644171df0e178c7c1a0`，把生产 E2E 固定基线更新为 57。
7. 最终 Reviewed production release `29174472413` 成功。

## 线上验收

- `/api/v1/graduation/cases` 返回 `source=supabase+json`、`profileCount=57`、57 个 unified CASE ID。
- CASE-051 存在于 unified CASE ID；名称、图片路径、CC0 与摄影者署名正确。
- `/zh/graduation/cases/CASE-051` 返回 HTTP 200。
- `/images/graduation/cases/case-051-kadokawa-culture-museum.jpg` 返回 HTTP 200、`image/jpeg`、627413 bytes。
- 发布流程验证首页 HTTP 200、不存在建筑路由 HTTP 404。

## 已知维护事项

- GitHub Actions 提示 `actions/checkout@v4` 与 `actions/setup-node@v4` 仍以 Node 20 action runtime 为目标，当前由 runner 强制使用 Node 24；不影响本批次，但应在上游 action 提供新 major 后升级。
- 双轨读取仍保留 JSON fallback；这是 G9 完成前的预期状态，不应提前删除。
