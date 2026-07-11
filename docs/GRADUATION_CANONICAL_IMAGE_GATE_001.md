# Graduation Canonical Image Gate 001

日期：2026-07-12

结论：`0 / 21` 主体主图获准接管毕业案例图片；双轨读取继续使用已审核 JSON 图片

## 门禁条件

主体图片必须同时满足：

- 一座建筑恰好一张 `is_primary=true`；
- 图片确实展示该建筑；
- 来源属于允许的开放版权来源；
- 许可、摄影者和作品页完整；
- Commons 文件当前存在；
- 数据库作者与许可必须和 Commons API 当前值一致。

仅仅“字段非空”或文件名看起来正确不能通过。

## 审核结果

### 重复主图：3 个主体

- CASE-102 Kiasma：两张 primary，其中一张 Commons 文件是 `Darkwing Duck`，明确错误。
- CASE-128 SESC Pompéia：Unsplash 与 Commons 同时是 primary。
- CASE-123 Aga Khan Museum：Unsplash 与 Commons 花园图同时是 primary。

### 版权或作品页不完整：4 个主体

- CASE-007 Sendai Mediatheque
- CASE-107 Taichung Metropolitan Opera House
- CASE-119 Louvre-Lens
- CASE-121 Elbphilharmonie

这些记录缺摄影者，且 `source_url` 是拼接错误的 upload URL，不是 Commons `File:` 作品页。

### 低可信或不满足开放图片策略：2 个主体

- CASE-125 VitraHaus
- CASE-135 Kunsthal

### Commons API 复核：12 个主体

8 个数据库所写 Commons 文件标题当前不存在：Chichu Art Museum、Japan National Stadium、Kanazawa 21st Century Museum、Centre Pompidou-Metz、CCTV Headquarters、Centre Pompidou、Casa da Música、CopenHill。

4 个文件存在，但数据库署名不一致：

| CASE | Building | Database credit | Commons API credit | License mismatch |
|---|---|---|---|---|
| CASE-099 | Tate Modern | Duncan | Acabashi | DB `CC BY-SA 3.0`; Commons `CC BY-SA 4.0` |
| CASE-104 | Seattle Central Library | J. Miers | DVD R W | no |
| CASE-106 | Rolex Learning Center | Niamor | Mikado1201 | no |
| CASE-120 | Guangzhou Opera House | GnuDoyng | 圍棋一級 | no |

## 运行时处理

`mergeGraduationCases` 只有在 source URL 进入版本化批准集合后才允许主体图片接管。Batch 001 的批准集合为空，因此：

- 名称、建筑师、年份和中文地点优先使用 canonical building；
- 概念、关键词和 CASE 来源使用 graduation profile；
- 图片、摄影者和许可继续使用 G1/G2 已审核 JSON；
- API diagnostics 明确列出全部 fallback image CASE IDs。

同样的保守规则用于 canonical 缺失字段：例如 SESC Pompéia 的 `buildings.year_start` 为空时继续显示已审核年份；现有主体 schema 只能保存一个 architect，而部分 CASE 有联合设计团队，因此暂时保留更完整的审核字符串，直到建立多建筑师关系，避免统一过程丢失正确事实。

G8 必须先修复主体图片记录、重新视觉审核和版权核对，再逐条加入批准集合。不得因为统一数据源目标而降低图片正确性。
