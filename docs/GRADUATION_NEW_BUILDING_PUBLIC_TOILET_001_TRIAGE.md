# G6 public-toilet batch 001 审核记录

日期：2026-07-12

## 结论

- 批次覆盖 CASE-031/044/049，共 3 条公共厕所相关候选；本阶段只读审核，不授权生产写入。
- CASE-044 的单体身份、地点、开放日期、设计者、用途、图片内容、作者和 CC BY-SA 4.0 许可均通过，可进入 taxonomy 与 migration 准备。
- CASE-031 是覆盖涩谷多个地点和设计者的 THE TOKYO TOILET 项目级案例，不是一栋建筑。当前图片只展示其中的恵比寿公園厕所，不能把项目总称错误映射成该单体。
- CASE-049 的记录源 URL 当前返回 404，Kengo Kuma 当前项目 sitemap 也没有该条目；同时没有准确开放图片，保持 `no_safe_image_yet`。
- 生产只读查重：3 个 CASE profile 均不存在；`nabeshima-shoto-park-toilet` 与 `mokumoku-yuusui-toilet` 均无 building conflict；既有 `kengo-kuma` architect 可复用。

## 分条结论

### CASE-031 The Tokyo Toilet

- 官方首页将 THE TOKYO TOILET 定义为分布在涩谷不同地点、由 16 位创作者参与的公共厕所体系；CASE concept 也明确讨论整个网络。
- Commons 的 `Tokyo Toilet Project 04.jpg` 是 Mr.Asylum 自有作品、CC BY-SA 4.0，图片本身许可安全。
- 但文件说明明确指出画面是恵比寿公園厕所，由片山正通与 Wonderwall 设计。它不是整个 THE TOKYO TOILET 项目的可代表单体，也不是可用来虚构一个总项目 canonical building 的证据。
- 正式决定为 `project_scope_not_single_building`。当前 fallback 图片应恢复中性占位图，直到找到有明确开放权利的项目级组合图；CASE 路由与原分析继续保留。

### CASE-044 Nabeshima Shoto Park Toilet

- THE TOKYO TOILET 官方设施页确认地址为松濤 2-10-7、创作者为 Kengo Kuma、开放日为 2021-06-24。
- Kengo Kuma and Associates 当前仍提供该单体的专属项目页，建筑身份边界明确。
- Commons `Shoto park 2302.jpg` 的说明与分类均指向锅岛松涛公园厕所；人工查看可见木板围合的五个小屋式厕所与公园步道。
- MediaWiki API 返回作者 鋸香具師、自有作品、CC BY-SA 4.0、750×500。虽分辨率不高，但足以准确识别主体，不需要用官方作品摄影替代。
- 可建立 `nabeshima-shoto-park-toilet`，复用既有 `kengo-kuma` architect；主用途为 `public-toilet`，`public-space` 仅作为次用途。

### CASE-049 Mokumoku Yuusui Toilet

- 队列中的官方 URL 当前为 404；Kengo Kuma 当前 sitemap 没有对应项目。
- Commons API 以英文项目名搜索没有返回准确文件，也没有其他作者与开放许可可同时核实的建成照片。
- 不能把 Kengo Kuma 官网展示图当作可复用图片；网页能证明身份时也不自动授予图片许可。
- 在找到可访问的一手身份来源与准确开放图片之前，不建立 canonical building，不进入 migration。

## 用途词表缺口

现有 11 个细用途没有公共厕所。只使用 `public-space` 会丢失明确的设施用途和中英日检索意图，因此迁移前应新增：

- slug：`public-toilet`
- broad type：`civic-public`
- 核心名称：公共厕所／公共廁所、public toilet、公共トイレ
- 别名可覆盖 restroom、public restroom、washroom、公厕／公廁、公共便所、公衆トイレ、公衆便所、トイレ，但不能把泛化的 `toilet` 无条件映射到住宅或室内卫生间用途。

CASE-044 使用 `public-toilet` primary、`public-space` secondary。

## 下一步

先通过 PR 固化本批只读决策。随后把 CASE-031 的具体单体图片恢复为占位图，并为 `public-toilet` 建立四语 taxonomy、alias 冲突预检、guarded rollback 与隔离 PostgreSQL dry-run。上述步骤完成前不允许生产写入 CASE-044；CASE-049 继续等待准确开放图片。
