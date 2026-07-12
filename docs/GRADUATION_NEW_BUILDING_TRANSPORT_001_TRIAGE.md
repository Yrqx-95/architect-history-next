# G6 transport batch 001 审核记录

日期：2026-07-12

## 结论

- 批次只包含 `CASE-008`、`CASE-094`、`CASE-133`：两座铁路车站与一座国际客运码头。
- 三条建筑身份、地点、年份、设计责任与交通用途均通过；生产主体库查重为 0。
- 三条都有准确开放许可图片，但 CASE-094 必须替换当前“夜间铁路场”图片，CASE-133 必须把笼统的 `See image source` 改成 Syced / CC0。
- 三条获准进入 migration 准备，但本记录本身不授权生产写入。

## 分条结论

### CASE-008 Onagawa Station and Onagawa Onsen Yupoppo

- Shigeru Ban Architects 确认 2015 年完成、三层、车站与公共温浴设施复合。
- 现有图片清楚展示女川 JR、yupoppo 标识、三层立面和弧形屋顶。
- Commons API：Mister0124 自有作品，CC BY-SA 4.0。

### CASE-094 Takanawa Gateway Station

- KKAA 确认东京基础设施项目、膜结构大屋顶以及钢与杉木折纸形框架。
- CASE 记录采用 2020 年公开启用时间；KKAA 当前页面标注 2021 年 3 月整体竣工，两者差异保留在证据说明中。
- 当前图片虽然 Commons 分类正确，但画面主体是夜间铁路场，车站不可辨识，拒绝作为 canonical primary image。
- 替代图 `Takanawa Gateway Station 200316a1.jpg` 清楚展示站体与屋顶；江戸村のとくぞう自有作品，CC BY-SA 4.0。

### CASE-133 Yokohama International Passenger Terminal

- 大さん桥运营方与横滨市确认现码头 2002 年完成并包含客运、公共屋顶广场等功能。
- JA 与 MoMA 确认 Foreign Office Architects / Farshid Moussavi / Alejandro Zaera-Polo 的设计责任。
- 现图准确展示连续木平台、折叠屋面和邮轮泊位；Syced 自有作品，CC0。

## 用途词表缺口

现有 9 个细用途没有交通节点。把车站或客运码头硬塞进 `mixed-use` 或 `community-center` 会破坏用途搜索语义，因此 migration 前必须新增：

- slug：`transport-hub`
- broad type：`transportation`
- 中英日名称与别名：交通枢纽／交通樞紐、transport hub、交通拠点，以及经审核的 station / 駅 / terminal 等别名。

## 下一步

同步 CASE-094/133 图片元数据和本地文件，扩展 transport-hub 多语言用途词表，然后生成 guarded apply/rollback 并执行全历史隔离 PostgreSQL dry-run。在这些步骤完成前不允许生产写入。
