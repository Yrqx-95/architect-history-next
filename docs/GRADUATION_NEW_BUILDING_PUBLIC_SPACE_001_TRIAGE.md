# G6 urban public-space batch 001 审核记录

日期：2026-07-12

## 结论

- 批次覆盖 CASE-014/050/056/110/111，共 5 条城市公园、滨水步道和景观公共空间候选。
- CASE-050/056/110/111 的身份、地点、年份、设计责任和用途通过，可进入 taxonomy 与 migration 准备；本记录不授权生产写入。
- CASE-014 暂不迁移：它是跨七区、持续整备的防洪与步行系统，不是完成年份和设计作者明确的单体项目。
- 五张当前图片均准确，但 CASE-110 的作者与许可记录错误；CASE-111 当前标牌近景不适合作为 canonical cover，已找到更清楚的开放替代图。
- 生产只读查重：5 个目标 slug 为 0 building conflict，5 个 CASE 为 0 profile conflict。

## 分条结论

### CASE-014 Sumida River Terrace

- 东京都资料将其定义为河堤系统上的 terrace 与跨七区连续滨水步道，且仍在持续连接和改善。
- 当前没有可证实的单一完成年份或设计作者；不能用东京都这一管理主体替代建筑师，也不能虚构一个完成年份。
- e97h0017 / CC BY-SA 3.0 图片准确展示白鬚西侧 terrace，但图片正确不能弥补主体身份边界缺失。

### CASE-050 Hisaya-odori Park

- 名古屋市确认 2020 年以公园与店铺一体的 Park-PFI 项目重新开放。
- 三井不动产明确列出日建设计与大成建设负责 park design，大成负责 architectural design，岩间造园负责 landscaping/planting；不得继续把 “Hisaya-odori Park PFI” 当成建筑师。
- KKPCW 自有作品 / CC BY-SA 4.0 图片清楚展示 Media Hiroba、公园商业边缘与电视塔轴线。

### CASE-056 Tainan Spring

- MVRDV 确认 2016–2020、台南、已实现的城市公共空间项目；原中国城商场地下层被转为下沉广场与城市水池。
- Pbdragonwang 自有作品 / CC BY-SA 4.0 图片清楚展示水池、保留混凝土框架和植栽公共空间。

### CASE-110 The High Line

- NYC Parks 与 Field Operations 确认 Field Operations、Diller Scofidio + Renfro 与 Piet Oudolf 的设计合作；第一段于 2009 年开放。
- 当前图片内容准确，但现行 Commons API 显示作者为 Beyond My Ken、自有作品、CC BY-SA 4.0；公开数据中的 David Berkowitz / CC BY-SA 3.0 必须修正。

### CASE-111 Superkilen

- 哥本哈根市与 BIG 确认项目 2012 年开放，由 BIG、Topotek 1、Superflex 合作完成。
- 当前 mike / CC BY-SA 2.0 图片只突出多国标牌，身份正确但封面代表性不足。
- 替代图 `Superkilen hill-top view.jpg` 从高点完整展示 Black Square 的条纹地面、起伏、城市家具与街区关系；Emily / Flickr 来源，CC BY 2.0。

## 用途词表缺口

现有细用途没有城市公共空间。用 `mixed-use` 作为公园、滨水步道或景观基础设施的主用途会破坏搜索语义，因此 migration 前必须新增：

- slug：`public-space`
- broad type：`public-space`
- 中英日核心名称：公共空间／公共空間、public space、公共空間
- 经审核别名应覆盖 park、公园／公園、plaza、广场／廣場、広場、promenade、waterfront、linear park 等，但不能让泛化的 “public” 单词单独命中。

CASE-050 可把 `mixed-use` 作为 secondary function，其余三条只使用 `public-space`。

## 下一步

先修正 CASE-110 图片元数据并本地化 CASE-111 替代图；再为 `public-space` 建立四语 taxonomy migration、alias 冲突预检、guarded rollback 与隔离 PostgreSQL dry-run。上述步骤完成前不允许生产写入。
