# G6 disaster memorial batch 002 审核记录

日期：2026-07-12

## 批次边界与结论

- 本批只包含 `CASE-015 Minamisanriku 311 Memorial`。
- 不混入地区复兴总体规划、临时避难设施或没有安全图片的灾后项目。
- 建筑身份、设计者、年份、地点、用途和图片权利均通过，只读决策批准进入 migration 准备。
- 本记录不授权生产写入；下一步必须先生成 guarded migration，并通过隔离 PostgreSQL dry-run 和生产只读预检。

## 身份与用途

Kengo Kuma and Associates 官方页确认：

- 项目：Minamisanriku 311 Memorial / 南三陸311メモリアル；
- 地点：宫城县南三陆；
- 完成：2022；
- 规模：1,433 m²、2 层；
- 设计：Kengo Kuma and Associates；
- 内容：展示灾害记忆、Christian Boltanski 的作品及经历灾害的年轻艺术家作品。

canonical broad type 决定为 `cultural`，primary function 为既有 `museum`。官方页的 `Community` 是宽泛项目分类，不足以证明建筑是具体的 `community-center`，因此不添加该 function。

## 图片审核

- Commons 原图：5753×3835，Yasu 自有作品，拍摄于 2022-10-14，CC BY-SA 3.0。
- 仓库已有同源 1600×1066 本地图，SHA-256 为 `4c65257beed887a72068ad2df001fffab1cc966ade2484e2af256f8d49158fa1`。
- 原图与本地图均已人工查看，清楚展示建成纪念馆的门形开口和放射状南三陆杉木格栅，与官方项目说明一致。
- 官方项目摄影仅用于身份比对，其页面没有开放复用许可，不作为本站图片来源。

## 生产只读预检

- existing architect：`51797239-be38-4dbd-9d7e-e413ddf3c78a / kengo-kuma`。
- target canonical building conflict：0。
- CASE-015 profile conflict：0。
- required `museum` function：1/1。
- required `cultural` type：1/1。

## 队列影响

- 本批正式审核 1 条并批准 1 条进入 migration 准备。
- G6 已迁移仍为 53/118；尚未正式审核队列从 44 减至 43。
