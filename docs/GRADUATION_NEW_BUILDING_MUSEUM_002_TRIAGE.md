# Graduation new-building museum batch 002 审核

日期：2026-07-12

## 结论

Museum batch 001 之后，剩余 82 个 new-building candidates 中只有 CASE-048 Aranya Art Center 的名称与机构说明继续明确对应 museum / art-center 用途。建筑身份、建筑师、年份、地点与用途可以确认，但当前没有找到可安全复用的建筑图片，因此本批次不生成数据库迁移。

## CASE-048

- 身份：Aranya Art Center（The Void）。
- 建筑师：Neri&Hu Design and Research Office。
- 年份：2019。
- 地点：秦皇岛，河北，中国。
- 用途：当代艺术中心 / kunsthalle，可归入 `museum`。
- 官方建筑师来源：<https://neriandhu.com/en/works/the-void-aranya-art-center>，实时 HTTP 200。
- 官方机构来源：<https://www.aranyaartcenter.com/english/visit-copy>，实时 HTTP 200；页面明确记录 2019 年成立、秦皇岛位置与 Neri&Hu 设计。
- 图片状态：`no_safe_image_yet`。

## 图片版权核验

- 原始毕业案例没有 `image_source_url`、`image_license` 或 `image_credit`，不能直接继承任何展示图。
- Wikimedia Commons 以项目名称、The Void、Neri&Hu 与 Qinhuangdao 组合检索，没有找到该建筑的对应文件。
- Openverse API 以 `Aranya Art Center`、`The Void Aranya`、`Neri Hu Aranya`、`Aranya Qinhuangdao art` 查询均为 0 结果。
- 官方建筑师与机构网站展示的项目图没有可确认的开放复用许可；不能把“官网可见”理解为“允许复制到本站”。
- 搜索中出现的 `Aranya Litang.jpg` 是 Aranya Community Hall，不是 Aranya Art Center，已排除错误建筑。

## 决策

- 保留 CASE-048 的毕业案例与现有文字资料，不删除案例。
- 不下载、不上传、不代理官方图片。
- 不建立 canonical building / graduation profile，避免产生无合规图片的半完成主体。
- 后续只有在发现可核验的 CC0、CC BY、CC BY-SA 或明确授权图片时才重新打开。

## 下一步

明确 museum 候选已经审完：14 条已生产统一，CASE-048 与 CASE-079 因图片许可证据不足保持 `no_safe_image_yet`。G6 下一批转向 theatre / performing-arts / cultural-hall 候选，只先生成只读队列。
