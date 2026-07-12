# Graduation new-building theatre batch 001 审核

日期：2026-07-12

## 范围与结论

从生产统一集合之外的 82 个 new-building candidates 中，以名称、关键词和概念交叉筛出 5 个明确包含剧院、歌剧院、音乐厅或表演艺术空间的案例：CASE-057、091、117、122、139。CASE-033 虽出现“文化活动”描述，但本体是温泉街公共节点，不是表演设施，作为关键词假阳性排除。

5 条建筑身份与表演用途均确认；其中 4 条具备建筑内容正确、作者明确、开放许可可核验的图片，批准进入 guarded migration 准备。CASE-091 身份与 theatre / museum / mixed-use 功能成立，但没有安全图片，保持 `no_safe_image_yet`。

## 逐条结果

### CASE-057 — 荘銀タクト鶴岡

- 鹤冈市记录 2017 年 8 月竣工、2018 年 3 月正式开放。
- 机构页面明确说明大剧场、自然声学、音乐与市民文化活动；设计记录指向 SANAA。
- 找到 Commons `Tact-Tsuruoka 1.jpg`，Ebiebi2，CC BY-SA 4.0，5184×3888。
- 人工审片确认完整展示当前会馆及层叠折板屋面；批准 `theatre`。

### CASE-091 — マルホンまきあーとテラス

- 机构记录 1258 席大/中厅、302 席小厅、市民画廊、工作室与石卷市博物馆。
- 大成建设记录 2021 年 1 月竣工、藤本壮介建筑设计事务所设计。
- Commons 与 Openverse 的日英精确查询均无对应建筑图片。
- 石卷市与机构页面虽有外观图，但市政府网站政策明确要求超出引用范围的转载须事前许可。
- 结论：`no_safe_image_yet`，不下载、不迁移。

### CASE-117 — Oslo Opera House

- Snøhetta 官方项目记录 2000–2008、奥斯陆、已完成，并明确主剧场与公共屋顶。
- 原 Commons 图为 Christian David 2024 年完整外观，CC BY-SA 4.0，10401×5200。
- 人工审片确认歌剧院、坡屋顶、玻璃大厅和滨水环境；批准 `theatre`。

### CASE-122 — Harpa

- Henning Larsen 官方项目记录 2005–2011、雷克雅未克、音乐厅和会议中心及四个表演厅。
- 原图 `Harpa (4492910359).jpg` 拍摄于 2010 年，人工审片确认是施工状态，拒绝继续使用。
- 替换为 `Harpa From Arnarhóll (33650129491).jpg`，Gary J. Wood，CC BY-SA 2.0，2017 年完整建筑外观。
- 批准主用途 `theatre`，次用途 `mixed-use`。

### CASE-139 — The Shed

- DS+R 官方项目记录 2019 年 4 月开放、纽约、DS+R 主创建筑师、Rockwell Group 合作建筑师，并明确表演、视觉艺术和活动用途。
- 原 Commons 图片内容正确，但只是外壳近景，不能完整说明建筑。
- 替换为 `The Shed - Complete (48206488176).jpg`，Ajay Suresh，CC BY 2.0，2019 年完整建筑与公共广场。
- 批准主用途 `theatre`，次用途 `mixed-use`。

## 图片本地化

4 张批准图片均已本地化、移除元数据并统一压缩至最长边 2000px：

- CASE-057：597792 bytes，2000×1500。
- CASE-117：437158 bytes，2000×1000。
- CASE-122：430108 bytes，2000×1333。
- CASE-139：984479 bytes，2000×1500。

原始文件合计约 46.6MB，本地优化后约 2.45MB，减少远端依赖与源站流量。

## 写入边界

- 正式决策批准 4 条，排除 1 条。
- 本文件和决策文件本身不授权生产写入。
- 只有 guarded apply、rollback、全历史重放 dry-run、生产冲突复查和 PR 检查通过后，才能应用 Supabase migration。
