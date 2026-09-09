# 全库核验记录 · 2026-09-09

已逐页核对全部 173 个政策内容页，包括候选、归档和尚未到期项目。核验涉及主管机关当前入口、资格与资金、期限与续签、工作、家属、长期路径、税务边界，以及已公布变化和过渡安排。

**100 页完成核心事实核验；73 页仍有证据缺口。** 部分未完成页已作有来源支持的纠错；“发现变化”与“全页通过”是两个维度。核验尝试覆盖全库，不等于所有政策事实均通过，也不代表任何个人申请必然符合资格。

使用实际读取的官方网页、法规、公报、办理指南和官方 PDF；抓取失败时尝试同机关替代入口或当地语言正文。HTTP 成功、搜索摘要或未检索到项目不能单独作为事实通过或项目关闭的依据。结构检查、网站构建和部署也不构成政策核验。

## 覆盖与结果

| 分类 | 已核对页面 | 核心事实已核实 | 待补证 |
| --- | ---: | ---: | ---: |
| 投资入籍 | 12 | 5 | 7 |
| 投资永居 | 12 | 8 | 4 |
| 投资居留 | 23 | 13 | 10 |
| 创业与经营居留 | 4 | 3 | 1 |
| 留学与学生居留 | 20 | 19 | 1 |
| 数字游民与远程工作 | 48 | 19 | 29 |
| 访客或财力型远程工作 | 3 | 3 | 0 |
| 被动收入与退休居留 | 22 | 14 | 8 |
| 停办、暂停与待核 | 29 | 16 | 13 |
| **合计** | **173** | **100** | **73** |

只有核心事实已核实的页面，中央 `page_reviews` 才推进至本轮日期；其余保留原记录，全库历史基准仍为 2026-09-02。缺口页明确展示待补证事项，有核心证据不足的原 A 级页面调整为 B；候选或归档状态按实际开放证据单独判断。子页面不重复声明本站核验时间，官方公布日、生效日与截止日继续保留。

## 实质修正示例

- 韩国数字游民收入分档与最长三年、爱沙尼亚官方收入标准冲突、马来西亚本地客户工作边界。
- 日本经营管理和归化审查口径、葡萄牙归化及家庭规则、巴拿马投资门槛、巴林永久居留性质。
- 美国公立高中固定 I-94 期限与转学衔接、毕业生 cap-gap 工作边界；把已宣布但尚未生效的规则独立列示。
- 加拿大访客境外收入证明、墨西哥特定领馆的财力金额、新西兰访客及远程工作范围。
- 印度尼西亚 E33G 已有开放及本人资格的官方依据，迁入数字游民分类；家属与续签上限继续列为缺口。
- 归档项目区分积极的关闭证据、已立法待细则和仍无法确认，避免以无法访问推断停办。

## 逐页原始记录

记录包含页面路径、结论、`fully_verified`、逐字段判断、来源 URL 与真实访问结果、修正及未决问题。同轮重复使用的来源保留各页对应关系，不把访问次数作为独立证据数量。

- [citizenship-retirement-archive.json](./citizenship-retirement-archive.json)
- [digital-nomad.json](./digital-nomad.json)
- [investment-business.json](./investment-business.json)
- [study-germany-switzerland.json](./study-germany-switzerland.json)
- [study-japan-singapore.json](./study-japan-singapore.json)
- [study-visitors.json](./study-visitors.json)
- [visitors-canada-mexico.json](./visitors-canada-mexico.json)

## 待补证清单

以下缺口已同步显示在相关页面。未取得正文与官方规则冲突分别保留，不能任选对申请人更有利的说法。

| 页面 | 尚待确认的内容 |
| --- | --- |
| [投资入籍 / 柬埔寨](https://github.com/Garylauchina/global-mobility-handbook/blob/main/citizenship-by-investment/cambodia/README.md) | 须读出高棉文扫描法及次法令的具体投资、捐赠、居住和家属条款；当前统一收件入口仍不明。 |
| [投资入籍 / 埃及](https://github.com/Garylauchina/global-mobility-handbook/blob/main/citizenship-by-investment/egypt/README.md) | 尚缺现行法律条款直接重建无语言及无居住要求豁免；不能以程序主页未列该要求推定豁免。 |
| [投资入籍 / 格林纳达](https://github.com/Garylauchina/global-mobility-handbook/blob/main/citizenship-by-investment/grenada/README.md) | 官方现行费用页与FAQ尽调费分别列5000与6000美元，需主管机关明确适用版本。 |
| [投资入籍 / 约旦](https://github.com/Garylauchina/global-mobility-handbook/blob/main/citizenship-by-investment/jordan/README.md) | 当前实施细则中的具体就业数量与收件操作清单尚未建立完整直接证据。 |
| [投资入籍 / 圣卢西亚](https://github.com/Garylauchina/global-mobility-handbook/blob/main/citizenship-by-investment/saint-lucia/README.md) | 无实体居住依据仅成功打开官网2022年说明，未获得当前有效法规/FAQ完整重建该字段。 |
| [投资入籍 / 圣多美和普林西比](https://github.com/Garylauchina/global-mobility-handbook/blob/main/citizenship-by-investment/sao-tome-and-principe/README.md) | 官方资格卡片与FAQ父母祖父母年龄分别18岁和55岁，需法律文本或主管机关确认。 |
| [投资入籍 / 瓦努阿图](https://github.com/Garylauchina/global-mobility-handbook/blob/main/citizenship-by-investment/vanuatu/README.md) | 当前REO条件、居住豁免与近期护照程序待官网可读资料补齐；不能仅凭费用页通过全项。 |
| [停办、暂停与待核 / 阿根廷](https://github.com/Garylauchina/global-mobility-handbook/blob/main/closed-paused-unverified/argentina/README.md) | 未取得合格投资金额、完整申请细则和可验证的现行收件入口；保留已立法待细则，不称法律不存在。 |
| [停办、暂停与待核 / 格鲁吉亚](https://github.com/Garylauchina/global-mobility-handbook/blob/main/closed-paused-unverified/georgia/README.md) | 主管机关当前独立项目续办/结束的正式状态公告未取得。 |
| [停办、暂停与待核 / 格林纳达](https://github.com/Garylauchina/global-mobility-handbook/blob/main/closed-paused-unverified/grenada/README.md) | 当前政府受理渠道和实际开放状态未确证。 |
| [停办、暂停与待核 / 黑山](https://github.com/Garylauchina/global-mobility-handbook/blob/main/closed-paused-unverified/montenegro/README.md) | 本轮尚缺可读的终止后实施确认/现行国籍主管机关状态页。 |
| [停办、暂停与待核 / 纳米比亚](https://github.com/Garylauchina/global-mobility-handbook/blob/main/closed-paused-unverified/namibia/README.md) | 需现行内政法律、统一投资条件和主管机关办理入口；不以私人地产营销补齐。 |
| [停办、暂停与待核 / 尼日利亚](https://github.com/Garylauchina/global-mobility-handbook/blob/main/closed-paused-unverified/nigeria/README.md) | 缺独立DNV主管机关正面开放/资格证据。 |
| [停办、暂停与待核 / 北马其顿](https://github.com/Garylauchina/global-mobility-handbook/blob/main/closed-paused-unverified/north-macedonia/README.md) | 欠缺专门DNV法源、收入与受理入口；原一般外国人登记来源覆盖不足。 |
| [停办、暂停与待核 / 阿曼](https://github.com/Garylauchina/global-mobility-handbook/blob/main/closed-paused-unverified/oman/README.md) | 需移民主管机关对纯养老金退休路径的直接说明；当前仅能保留未确认。 |
| [停办、暂停与待核 / 菲律宾](https://github.com/Garylauchina/global-mobility-handbook/blob/main/closed-paused-unverified/philippines/README.md) | 现行DFA实施指南、完整收件入口及数额仍缺直接材料。 |
| [停办、暂停与待核 / 卢旺达](https://github.com/Garylauchina/global-mobility-handbook/blob/main/closed-paused-unverified/rwanda/README.md) | 专门DNV开放或未开放的主管机关说明未取得；维持未确认边界。 |
| [停办、暂停与待核 / 塞尔维亚](https://github.com/Garylauchina/global-mobility-handbook/blob/main/closed-paused-unverified/serbia/README.md) | 不能从一般门户无项目条目推出法律上绝对不存在。 |
| [停办、暂停与待核 / 塞舌尔](https://github.com/Garylauchina/global-mobility-handbook/blob/main/closed-paused-unverified/seychelles/README.md) | 专项Workcation收件、资格、续期和身份衔接未重建。 |
| [停办、暂停与待核 / 塞拉利昂](https://github.com/Garylauchina/global-mobility-handbook/blob/main/closed-paused-unverified/sierra-leone/README.md) | 本国当前CBI生效法源、统一费用与稳定受理入口仍需补齐。 |
| [数字游民与远程工作 / 阿尔巴尼亚](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/albania/README.md) | 普通永久居留5年和缺席计算尚须现行法律补证。 |
| [数字游民与远程工作 / 安道尔](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/andorra/README.md) | 20年归化年限与当前配额余量尚未找到匹配的已打开法律/主管机关正文。 |
| [数字游民与远程工作 / 伯利兹](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/belize/README.md) | 当前移民递件入口、费用币种冲突、普通PR一年/离境14天与税183天法条未完整核验 |
| [数字游民与远程工作 / 巴西](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/brazil/README.md) | 月收入 1,500 美元或存款 18,000 美元、首次一年及续签一年等原记录，连同家属和持续资格条件，仍待可读取的主管机关正文复证。 |
| [数字游民与远程工作 / 保加利亚](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/bulgaria/README.md) | 当前受理程序、家属操作及长期身份年限计算尚未建立完整官方依据。 |
| [数字游民与远程工作 / 佛得角](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/cabo-verde/README.md) | 临时居留两年及每两年续签、永居五年和归化五年的现行法条适用尚需完整核对。 |
| [数字游民与远程工作 / 哥斯达黎加](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/costa-rica/README.md) | 同一主管项目站仍列两个家庭收入金额，需要DGME确认具体标准，不能宣称门槛已完全核验 |
| [数字游民与远程工作 / 库拉索](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/curacao/README.md) | 需主管机关提供当前完整资金、住宿、保险附件及申请受理确认 |
| [数字游民与远程工作 / 塞浦路斯](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/cyprus/README.md) | 现行金额、期限、受理状态、工作、家属、长期居留与税务核心规则仍未取得可读取的主管机关正文，保留原记录待确认。 |
| [数字游民与远程工作 / 厄瓜多尔](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/ecuador/README.md) | 长期居留衔接、离境限制及全部家属亲属资格仍缺现行完整官方依据。 |
| [数字游民与远程工作 / 爱沙尼亚](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/estonia/README.md) | 外交部与政府 e-Residency 页所列收入金额和证明期间存在冲突，需主管机关确认适用标准。 |
| [数字游民与远程工作 / 希腊](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/greece/README.md) | 5年长期居民、7年国籍及Z.1具体计期/离境规则缺完整当前法源，尚未形成全页闭环 |
| [数字游民与远程工作 / 危地马拉](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/guatemala/README.md) | 所有核心字段欠主管机关正文；搜索线索提单人2000/家庭3000，与旧页3000概括可能不同，未将摘要直接用于修改门槛；2025年新条例的期限、家属、续期、工作范围及长期衔接未读到完整条文 |
| [数字游民与远程工作 / 印度尼西亚](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/indonesia/README.md) | 家属签证的具体适用及续签总年限仍缺统一现行说明；本人资格与项目开放已有官方依据。 |
| [数字游民与远程工作 / 意大利](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/italy/README.md) | 5年EU长期居留及10年归化的一般法律与本许可累计适用仍未交叉补证 |
| [数字游民与远程工作 / 日本](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/japan/README.md) | 外务省与该名单未载日本主体报酬完整禁止条文；需入管厅活动定义正文补证 |
| [数字游民与远程工作 / 哈萨克斯坦](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/kazakhstan/README.md) | 两馆对3000美元是否包含等号不一致；伦敦正文所指申请国籍和48国邀请函豁免完整清单未呈现 |
| [数字游民与远程工作 / 肯尼亚](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/kenya/README.md) | 年55000法定阈值、依亲Pass、当地无偿活动限制、税籍122/183规则需法规/主管说明补证 |
| [数字游民与远程工作 / 拉脱维亚](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/latvia/README.md) | 家属无配套、D签长期累计及183天税籍三个字段未完成当前官方交叉补证 |
| [数字游民与远程工作 / 马来西亚](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/malaysia/README.md) | 非科技扩展后完整现行资格/金额/担保要求；砂拉越独立项目不在本页已核范围 |
| [数字游民与远程工作 / 毛里求斯](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/mauritius/README.md) | 专项文件未证实子女24岁上限，已移除固定年龄；20年PR衔接仍需正式依据 |
| [数字游民与远程工作 / 摩尔多瓦](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/moldova/README.md) | 5年长期居留与该身份计算、离境限制仍缺当前主管机关正文；专项税务申报程序尚需税务局复核 |
| [数字游民与远程工作 / 黑山](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/montenegro/README.md) | 原页税收优惠另有收入公式未在当前所读主管页面出现；需要现行所得税/实施规则补证 |
| [数字游民与远程工作 / 罗马尼亚](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/romania/README.md) | 初次签证收入前6个月回溯、家属普通团聚、长期5年可否累计以及特殊税务豁免未完成交叉补证 |
| [数字游民与远程工作 / 塞舌尔](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/seychelles/README.md) | 所有专项核心资格、收入证据、期限、家属、当地工作及PR税务须官方新入口/书面说明，普通旅游授权不作替代 |
| [数字游民与远程工作 / 南非](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/south-africa/README.md) | 家属各办访问身份的当前官方手续尚未补证；专项清单未覆盖 |
| [数字游民与远程工作 / 西班牙](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/spain/README.md) | 旧页家属居留允许受雇/自雇的明确当前执行依据尚未读到；UGE附件持续超时 |
| [数字游民与远程工作 / 中国台湾](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/taiwan/README.md) | 两年停留上限及家属扩展已有主管机关线索，但仍须取得现行法律正文确认适用细节。 |
| [数字游民与远程工作 / 乌拉圭](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/uruguay/README.md) | 家属分别办理与普通临时/永久转换路径尚需移民机关当前服务页补证 |
| [创业与经营居留 / 斐济](https://github.com/Garylauchina/global-mobility-handbook/blob/main/entrepreneur-business-residence/fiji/README.md) | 现行首次许可期限与具体工作授权范围仍待主管机关确认；原列三年期限尚未完成复证。 |
| [投资永居 / 毛里求斯](https://github.com/Garylauchina/global-mobility-handbook/blob/main/investment-permanent-residence/mauritius/README.md) | 直接取得二十年永久居留后的持续投资、经营、家属及工作条件仍缺完整现行依据，不能套用普通职业许可规则。 |
| [投资永居 / 巴拿马](https://github.com/Garylauchina/global-mobility-handbook/blob/main/investment-permanent-residence/panama/README.md) | 家属类别、普通归化五年及一般离境限制仍需补充现行直接依据。 |
| [投资永居 / 塞舌尔](https://github.com/Garylauchina/global-mobility-handbook/blob/main/investment-permanent-residence/seychelles/README.md) | 家属附属许可的具体条件尚未完整确认。 |
| [投资永居 / 韩国](https://github.com/Garylauchina/global-mobility-handbook/blob/main/investment-permanent-residence/south-korea/README.md) | 家属年龄和受养条件，以及普通 F-5 永居、归化的完整适用规则仍需补证。 |
| [投资居留 / 哥伦比亚](https://github.com/Garylauchina/global-mobility-handbook/blob/main/investment-residence/colombia/README.md) | M投资者签证的具体受雇/经商许可范围在已打开官方项目及现行Article79中未明列，仍需签证附注或主管机关正式解释 |
| [投资居留 / 印度尼西亚](https://github.com/Garylauchina/global-mobility-handbook/blob/main/investment-residence/indonesia/README.md) | 全国目录HTTP403；当前存款资产选项与详细家属年龄、经济依赖条件未完整确认 |
| [投资居留 / 约旦](https://github.com/Garylauchina/global-mobility-handbook/blob/main/investment-residence/jordan/README.md) | 房产居留工作权、家属年龄和依赖范围及完整实施细则未取得直接现行官方证据；不能计完整核验 |
| [投资居留 / 毛里求斯](https://github.com/Garylauchina/global-mobility-handbook/blob/main/investment-residence/mauritius/README.md) | Smart City房产居留持有人的工作豁免范围未找到直接现行条文；375k正好临界值与部分介绍页exceed措辞须主管机关确认 |
| [投资居留 / 阿曼](https://github.com/Garylauchina/global-mobility-handbook/blob/main/investment-residence/oman/README.md) | 续签、离境期限、受雇许可、具体家属证明边界未获完整规则 |
| [投资居留 / 菲律宾](https://github.com/Garylauchina/global-mobility-handbook/blob/main/investment-residence/philippines/README.md) | 2026 BOI办理文件与现行DOLE完整工作例外条文访问未成功；不据2000/2014规则独立断言全部现行实施细则已核实 |
| [投资居留 / 卡塔尔](https://github.com/Garylauchina/global-mobility-handbook/blob/main/investment-residence/qatar/README.md) | 当前房产路线工作许可和家属年龄/受养证明实施细节未完整公开或取得 |
| [投资居留 / 沙特阿拉伯](https://github.com/Garylauchina/global-mobility-handbook/blob/main/investment-residence/saudi-arabia/README.md) | 现行FAQ有第一年10天、之后5天的最低停留，而详细条件无此条；必须由中心厘清适用版本 |
| [投资居留 / 斯里兰卡](https://github.com/Garylauchina/global-mobility-handbook/blob/main/investment-residence/sri-lanka/README.md) | 自由受雇与无关业务工作权、受养人完整定义仍缺；8June税务通知正文当前无法取得 |
| [投资居留 / 阿联酋](https://github.com/Garylauchina/global-mobility-handbook/blob/main/investment-residence/united-arab-emirates/README.md) | 官方5年/10年及房产融资冲突需主管机关澄清；境外停留>6个月豁免及具体工作许可正文未成功复证 |
| [被动收入与退休居留 / 巴林](https://github.com/Garylauchina/global-mobility-handbook/blob/main/passive-income-retirement/bahrain/README.md) | 家属具体资格、劳动许可和税务具体陈述仍需直接材料补齐。 |
| [被动收入与退休居留 / 巴西](https://github.com/Garylauchina/global-mobility-handbook/blob/main/passive-income-retirement/brazil/README.md) | 退休类别工作、家庭及长期转换条款需补直接材料。 |
| [被动收入与退休居留 / 哥斯达黎加](https://github.com/Garylauchina/global-mobility-handbook/blob/main/passive-income-retirement/costa-rica/README.md) | 现行门槛、家属、居留期限/工作和PR条款尚需可读完整法源。 |
| [被动收入与退休居留 / 希腊](https://github.com/Garylauchina/global-mobility-handbook/blob/main/passive-income-retirement/greece/README.md) | 现行居留期限、长期居民及归化适用条件需补完整法源。 |
| [被动收入与退休居留 / 爱尔兰](https://github.com/Garylauchina/global-mobility-handbook/blob/main/passive-income-retirement/ireland/README.md) | Stamp0是否可计入个人入籍时段存在官方展示与历史口径矛盾，未获适用法规/主管机关明确说明。 |
| [被动收入与退休居留 / 意大利](https://github.com/Garylauchina/global-mobility-handbook/blob/main/passive-income-retirement/italy/README.md) | 年度临时居留续签及本类别当前长期居民完整条件仍需直接法规核对；罗马官方页面夹有2007费用旧值，未照抄。 |
| [被动收入与退休居留 / 南非](https://github.com/Garylauchina/global-mobility-handbook/blob/main/passive-income-retirement/south-africa/README.md) | 退休申请金额37000/38000官方冲突待书面确认；工作背书和具体PR条文仍需补现行直接法源。 |
| [被动收入与退休居留 / 阿联酋](https://github.com/Garylauchina/global-mobility-handbook/blob/main/passive-income-retirement/united-arab-emirates/README.md) | 联邦18万收入、家属及税务具体依据尚缺可读官方正文。 |
| [留学与学生居留 / 法国：大学留学](https://github.com/Garylauchina/global-mobility-handbook/blob/main/study-student-residence/france/university/README.md) | 现行行政指南支持学生身份不直接适用一般欧盟长期居留，但 CESEDA L426-18 的排除条款及学习年限计算尚未取得可读法条全文完成复证。 |
