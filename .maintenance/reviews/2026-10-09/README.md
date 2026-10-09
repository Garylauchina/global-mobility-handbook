# 全库核验记录 · 2026-10-09

已逐页对全部 **173 / 173** 个政策内容页执行本轮核验，包括当前、待复核、候选、归档及尚未到期页面；分类与国家索引另做导航检查。**45 页完成核心字段核验，128 页仍有明确证据缺口或官方来源冲突。**

核验使用实际读取的主管机关网页、法规、公报、办理指南及官方PDF。读取失败后有限尝试同机关替代入口、官方法规原文或当地语言版本；访问成功、搜索摘要及未发现项目均不单独算事实证据，也不用于推断项目关闭。新一轮包含申请者国籍、护照、现有身份和领馆管辖条件；上轮通过数不能直接沿用。

## 覆盖与结果

| 分类 | 核验覆盖 | 核心字段已核实 | 待补证 |
| --- | ---: | ---: | ---: |
| 投资入籍 | 12 | 2 | 10 |
| 投资永居 | 12 | 2 | 10 |
| 投资居留 | 23 | 4 | 19 |
| 创业与经营居留 | 4 | 2 | 2 |
| 留学与学生居留 | 20 | 5 | 15 |
| 数字游民与远程工作 | 48 | 5 | 43 |
| 访客或财力型远程工作 | 3 | 2 | 1 |
| 被动收入与退休居留 | 22 | 7 | 15 |
| 停办、暂停与待核 | 29 | 16 | 13 |
| **合计** | **173** | **45** | **128** |

仅上述 45 页推进中央 `page_reviews` 至本轮日期。其余保留既有日期；已到期的当前页改为 `stale`，并保留原状态说明和具体未决。核心依据不足的原A级降为B级。归档及候选不因未取得证据而被推定开放或关闭。

**`last_full_review` 仍为历史基准 2026-09-02。** 全库覆盖不等于全库事实通过；结构、构建与部署检查也不替代政策核验。子页面不声明本站核验时间，继续保留官方公布、生效及截止日期。

## 实质更新

- 美国学生固定期限规则已被9月14日法院命令暂缓生效，当前规则与被暂停的原公告分开说明；EB-5更新10月签证公告。
- 澳大利亚10月2日起调整非学校课程转学限制至12个月，学校课程仍按原6个月；2027年7月恢复安排另列未来事件。
- 日本居留费用已于10月1日切换；永住新指引区分即期收入审查及2027年实施条款。
- 拉脱维亚投资居留修订及巴拿马第17号法令按已公布原文更新，过渡申请和新增路径的实际收件边界保留。
- 马来西亚远程工作新版FAQ、泰国DTV递交身份限制、西班牙远程工作及非盈利家属范围得到修正；相互冲突的领馆与部门口径继续明示。
- 阿根廷投资入籍已公布投资及家属金额；准确开放收件日期与完整细则仍缺证，继续留在待核分类。

## 逐页记录

每条记录包含页面路径、核心字段结论、实际读取来源及访问结果、修正和未决。`source_access_attempts` 单独保留本轮开始时该页引用链接的抓取结果；它不等于实质核验。原始网页正文未复制进仓库。

- [citizenship-retirement-archive.json](./citizenship-retirement-archive.json)
- [digital-nomad.json](./digital-nomad.json)
- [investment-business.json](./investment-business.json)
- [study-visitors.json](./study-visitors.json)

## 待补证与下一步

先处理主管机关已公布的新规执行细则、国籍／既有身份限制及相互冲突金额；已确认的旧缺口从当前页移除。对同一访问阻塞不重复重试；下轮从下列具体字段及原始记录继续。

| 页面 | 未决及最小下一步 |
| --- | --- |
| [安提瓜和巴布达](https://github.com/Garylauchina/global-mobility-handbook/blob/main/citizenship-by-investment/antigua-and-barbuda/README.md) | 完整现行受限国籍及俄罗斯/白俄罗斯等后续限制仍缺CIU直接现行依据。 |
| [柬埔寨](https://github.com/Garylauchina/global-mobility-handbook/blob/main/citizenship-by-investment/cambodia/README.md) | 高棉文法律条款尚未可靠逐条译读，现行投资/捐款金额、居住、身份及家属和统一受理入口未达到完整核实。 |
| [埃及](https://github.com/Garylauchina/global-mobility-handbook/blob/main/citizenship-by-investment/egypt/README.md) | 完整国籍/出生地身份限制、家属取得细则及无语言/居住豁免条款仍缺现行直接证据。 |
| [格林纳达](https://github.com/Garylauchina/global-mobility-handbook/blob/main/citizenship-by-investment/grenada/README.md) | 官方费用表与FAQ尽调费仍分别5000/6000美元，适用版本待主管机关确认。 |
| [约旦](https://github.com/Garylauchina/global-mobility-handbook/blob/main/citizenship-by-investment/jordan/README.md) | 完整现行就业人数、受限国籍/既有身份资格及收件实施清单尚未取得。 |
| [瑙鲁](https://github.com/Garylauchina/global-mobility-handbook/blob/main/citizenship-by-investment/nauru/README.md) | 安理会高风险国家规则的具体决议及项目执行范围仍缺直接现行解释，保留身份限制未决。 |
| [圣卢西亚](https://github.com/Garylauchina/global-mobility-handbook/blob/main/citizenship-by-investment/saint-lucia/README.md) | 无最低居住和完整受养人规则尚需现行法源；完整国籍限制与例外未补齐。 |
| [圣多美和普林西比](https://github.com/Garylauchina/global-mobility-handbook/blob/main/citizenship-by-investment/sao-tome-and-principe/README.md) | 父母祖父母18/55岁官方冲突未解决；完整国籍/司法辖区限制仍未列明。 |
| [土耳其](https://github.com/Garylauchina/global-mobility-handbook/blob/main/citizenship-by-investment/turkey/README.md) | 9月29日2024/2估值更新附件尚未取得正文；公开资料不能确认个案购房国籍，須主管机关逐国确认。 |
| [瓦努阿图](https://github.com/Garylauchina/global-mobility-handbook/blob/main/citizenship-by-investment/vanuatu/README.md) | 完整当前受限国名单、修订及REO资格未闭合；居住豁免、当前护照程序及EU/UK旅行待遇和加密支付限制尚缺本轮全部直接依据。 |
| [阿根廷](https://github.com/Garylauchina/global-mobility-handbook/blob/main/closed-paused-unverified/argentina/README.md) | 准确收件日、申请入口、国债期限及完整身份执行细则 |
| [巴林](https://github.com/Garylauchina/global-mobility-handbook/blob/main/closed-paused-unverified/bahrain/README.md) | 现行130k金额官方正文复证 |
| [格鲁吉亚](https://github.com/Garylauchina/global-mobility-handbook/blob/main/closed-paused-unverified/georgia/README.md) | 主管机关当前独立DN方案继续、结束或开放的正式状态与身份规则未取得 |
| [格林纳达](https://github.com/Garylauchina/global-mobility-handbook/blob/main/closed-paused-unverified/grenada/README.md) | 当前主管机关受理渠道、实际开放与完整执行状态 |
| [纳米比亚](https://github.com/Garylauchina/global-mobility-handbook/blob/main/closed-paused-unverified/namibia/README.md) | 现行投资居留立法、统一条件及正式入口未取得；未确认不等于法律上绝对不存在。 |
| [尼日利亚](https://github.com/Garylauchina/global-mobility-handbook/blob/main/closed-paused-unverified/nigeria/README.md) | 独立DNV法源、收入、期限、身份限制和申请入口均未获得直接证据。 |
| [北马其顿](https://github.com/Garylauchina/global-mobility-handbook/blob/main/closed-paused-unverified/north-macedonia/README.md) | 专项法源、完整申请者身份条件与实际受理证据未取得。 |
| [阿曼](https://github.com/Garylauchina/global-mobility-handbook/blob/main/closed-paused-unverified/oman/README.md) | 现行退休分支的收件与完整条件仍无法确认；不以旧4000 OMR营销数字补齐。 |
| [菲律宾](https://github.com/Garylauchina/global-mobility-handbook/blob/main/closed-paused-unverified/philippines/README.md) | 现行DFA实施指南、金额、费用、互惠国家执行名单和实际DNV受理仍缺。 |
| [卢旺达](https://github.com/Garylauchina/global-mobility-handbook/blob/main/closed-paused-unverified/rwanda/README.md) | 专门DNV法律和正面状态/资格/受理证据未取得。 |
| [塞尔维亚](https://github.com/Garylauchina/global-mobility-handbook/blob/main/closed-paused-unverified/serbia/README.md) | 数字游民便利不等于独立DNV；专项法律、身份范围及申请条件仍缺。 |
| [塞舌尔](https://github.com/Garylauchina/global-mobility-handbook/blob/main/closed-paused-unverified/seychelles/README.md) | 专项收件、收入、期限续期、身份限制与长期衔接仍缺现行直接依据。 |
| [塞拉利昂](https://github.com/Garylauchina/global-mobility-handbook/blob/main/closed-paused-unverified/sierra-leone/README.md) | 本国当前CBI生效法源、统一费用、身份范围及专门受理入口仍需补证。 |
| [阿尔巴尼亚](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/albania/README.md) | 数字游民计入一般PR的具体适用仍待确认 |
| [安道尔](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/andorra/README.md) | 配额剩余额度及具体资金计算条例未取得正文；条约国民具体续期期限未闭环 |
| [阿根廷](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/argentina/README.md) | 现行完整旅游免签国家范围及第三国签证便利与专项身份的适用边界尚未逐项闭合；专项家属另行申请的具体身份依据未补齐；阿根廷税务居民判定、境内履行远程服务的所得来源及申报义务未取得当前税务机关依据 |
| [巴巴多斯](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/barbados/README.md) | 完整国籍或特殊身份排除范围没有从公开条款闭环 |
| [伯利兹](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/belize/README.md) | 主管移民页404，现行收件渠道与费用币种冲突未闭环；一般PR离境规则与183天税务具体法条本轮未取得；2021附表有无后续修订未完全确认 |
| [巴西](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/brazil/README.md) | 首次一年/续期一年、具体家属团聚依据仍未完整取得 |
| [保加利亚](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/bulgaria/README.md) | 现行执行材料、国籍/合法停留转换边界、家属与长期身份规则未完成闭环 |
| [佛得角](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/cabo-verde/README.md) | 远程新路线特别国籍及入境限制仍未完全闭环 |
| [哥伦比亚](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/colombia/README.md) | 5488附条件免签/第三国PR能否满足5477第46条护照条件仍无明确主管解释 |
| [哥斯达黎加](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/costa-rica/README.md) | 家庭4000/5000美元官方站内冲突仍在；所引用一般签证分国籍指南及其例外未完整取得 |
| [库拉索](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/curacao/README.md) | 申请附件/在线表单未返回完整内容，无法完整确认当前财务证明、材料及实际受理条件。 |
| [塞浦路斯](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/cyprus/README.md) | 主管机关项目页403，原附件404；替代政府策略PDF亦403，无法用当前完整正文确认各字段及身份限制。 |
| [捷克](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/czech-republic/README.md) | 实际长期签证/居留的续期及永久居留累计规则尚未逐类闭合；捷克境内远程雇佣或经营的税务居民、所得及申报规则未取得当前税务机关依据 |
| [多米尼克](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/dominica/README.md) | 官方项目详情要求另按护照办理入境签证，未取得完整WIN特别国籍限制/豁免依据；不能把一般入境或CBI名单移植。 |
| [厄瓜多尔](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/ecuador/README.md) | 普通长期居留衔接、具体缺席上限、全部家属亲属资格仍未取得完整现行法源。 |
| [爱沙尼亚](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/estonia/README.md) | 外交部3960欧/月、3个月证明与政府e-Residency4500欧/月、6个月证明仍冲突，无法宣称金额完整闭合。 |
| [希腊](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/greece/README.md) | 数字游民专项离境/长期居留计时、7年归化条件及完整特别国籍限制未形成完整当前法源链。 |
| [危地马拉](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/guatemala/README.md) | 移民法第27条全部亲属与第78条永居条件、完整国籍入境分类仍未补齐。 |
| [匈牙利](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/hungary/README.md) | White Card持有人在匈远程工作所得的税务居民、收入来源及申报规则尚缺税务机关依据 |
| [印度尼西亚](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/indonesia/README.md) | Calling Visa完整国籍名单原页403，例外适用未闭环；E33G家属签证细则未取得 |
| [意大利](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/italy/README.md) | 现行文件内仍以2024示例列金额；5年EU长期/10年归化及本许可计时未形成完整当前链。 |
| [日本](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/japan/README.md) | ISA国籍主申请/家属名单PDF403，本轮未重新取得完整名单；ISA活动解释正文及FAQ PDF均403，雇佣/承揽本地报酬边界仍缺正文 |
| [哈萨克斯坦](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/kazakhstan/README.md) | 原伦敦/伯尔尼当前返回JS壳，历史至少/超过3000措辞差异未能排除；PR衔接专项法源不足。 |
| [肯尼亚](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/kenya/README.md) | 年55000美元及禁止当地无偿工作法源搜索定位但PDF403，不能把检索全文摘要作为已打开来源；家属Pass、PR、税籍及特殊身份限制仍未齐。 |
| [拉脱维亚](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/latvia/README.md) | 家属无配套、D签长期累计、183日税籍未完整当前交叉证实；新移民法2026-09-15生效线索需专项条文确认。 |
| [马来西亚](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/malaysia/README.md) | 同一v10收入总则minimum与材料问答>表述不一；等于24000/60000边界尚需官方澄清。 |
| [毛里求斯](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/mauritius/README.md) | EDB FAQ完整正文（含国籍附件、1500/500金额及入境转换例外）未读到；20年PR及转换规则未闭合 |
| [摩尔多瓦](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/moldova/README.md) | 长期居留累计与离境规则；税局具体申报细则；家属IGM现行清单链接404 |
| [黑山](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/montenegro/README.md) | 具体生计证明公式/税务规则；国籍入境名单及例外；长期居留累计 |
| [纳米比亚](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/namibia/README.md) | 完整身份与境内转换限制；家属年龄；长期累计法律依据 |
| [巴拿马](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/panama/README.md) | 受限制国籍完整名单及例外；第198号法令可读全文（原链接404，备用扫描未实读）；家庭/长期居留完整条款；36000年收入与超过3000月收入边界 |
| [葡萄牙](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/portugal/README.md) | AIMA专门办理入口不可读；完整国籍/辖区/既有身份转换条件 |
| [罗马尼亚](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/romania/README.md) | 普通家属团聚；长期5年累计；特殊国籍及境内已有身份条件；税务待遇 |
| [塞舌尔](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/seychelles/README.md) | Workcation当前收件状态、所有专项核心资格及待遇 |
| [斯洛文尼亚](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/slovenia/README.md) | 即时团聚已证实，但合资格家属的完整关系和受养范围未与现行法条闭合；数字游民转类后的长期居留累计条款未核实；斯洛文尼亚境内远程收入的税务居民及申报规则尚缺税务机关依据 |
| [南非](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/south-africa/README.md) | 家属具体身份及程序；国籍/境内变更法定例外全条款；访客不计PR法律条文 |
| [韩国](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/south-korea/README.md) | 法务部原PDF重定向循环，驻德使馆原页同样失败，3年累计上限本轮未补到正文；特殊国籍、在韩身份转换完整条件未闭环 |
| [斯里兰卡](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/sri-lanka/README.md) | 一般入境/现有身份转换细则；PR依据及家属受养范围细节 |
| [中国台湾](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/taiwan/README.md) | 大陆原居民取得外国国籍后的身份适用仍须个案及主管机关确认；家属延期材料细则未完成核查 |
| [泰国](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/thailand/README.md) | 华盛顿临时美国签证清单与新国籍/PR规则冲突；不计PR及本地工作权限法律完整依据 |
| [土耳其](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/turkey/README.md) | 土耳其境内履行远程工作所得的税务居民、收入来源及申报规则尚缺税务机关依据 |
| [阿联酋](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/united-arab-emirates/README.md) | 完整国籍及已有身份受理限制；一般长期/国籍法律链条未完整核 |
| [乌拉圭](https://github.com/Garylauchina/global-mobility-handbook/blob/main/digital-nomad-remote-work/uruguay/README.md) | 家属具体办理依据；完整国籍入境名单及例外 |
| [斐济](https://github.com/Garylauchina/global-mobility-handbook/blob/main/entrepreneur-business-residence/fiji/README.md) | Current permit duration and employment authorisation remain unresolved; sector exemptions and nationality/entry boundaries not fully closed. |
| [法国](https://github.com/Garylauchina/global-mobility-handbook/blob/main/entrepreneur-business-residence/france/README.md) | Project-specific treatment under special bilateral nationality regimes, particularly Algerian nationals, remains unverified; generic foreign-investor eligibility is insufficient. |
| [巴林](https://github.com/Garylauchina/global-mobility-handbook/blob/main/investment-permanent-residence/bahrain/README.md) | 所有当前官方入口均未取得正文；金额、期限、续期/停留、家属、工作和申请者身份限制均未完成当轮复证。 |
| [塞浦路斯](https://github.com/Garylauchina/global-mobility-handbook/blob/main/investment-permanent-residence/cyprus/README.md) | 403prevents current body verification of investment/income/work/family/continuity and specific nationality restrictions. |
| [马耳他](https://github.com/Garylauchina/global-mobility-handbook/blob/main/investment-permanent-residence/malta/README.md) | Current exhaustive MPRP sanctioned-country/close-ties scope is not established by the live overview;2024FAQ cannot establish whether later country-specific changes apply. |
| [毛里求斯](https://github.com/Garylauchina/global-mobility-handbook/blob/main/investment-permanent-residence/mauritius/README.md) | Need current direct-investor statutory/guideline terms, ongoing investment, work, dependents and nationality boundaries; general OP rules cannot substitute. |
| [巴拿马](https://github.com/Garylauchina/global-mobility-handbook/blob/main/investment-permanent-residence/panama/README.md) | General absence limits, precise ordinary dependent ages and complete special-nationality restrictions remain unverified. |
| [沙特阿拉伯](https://github.com/Garylauchina/global-mobility-handbook/blob/main/investment-permanent-residence/saudi-arabia/README.md) | 官方产品及实施规则未取得可读正文；本轮不能完整复证所有核心字段及国籍/年龄/现有沙特身份条件。 |
| [塞舌尔](https://github.com/Garylauchina/global-mobility-handbook/blob/main/investment-permanent-residence/seychelles/README.md) | 现行家属附属许可年龄/依赖及一般身份排除实施细则不完整；不能凭SIB概要闭合全部核心。 |
| [新加坡](https://github.com/Garylauchina/global-mobility-handbook/blob/main/investment-permanent-residence/singapore/README.md) | Project-specific nationality/stateless or special-identity treatment not expressly resolved by accessible factsheet; current EDB landing/alternative page returned antirobot shells. |
| [南非](https://github.com/Garylauchina/global-mobility-handbook/blob/main/investment-permanent-residence/south-africa/README.md) | VFS/DHA当前受理页仅加载壳，家庭成员文件、递件顺序及现行境内申请程序未取得完整正文。 |
| [韩国](https://github.com/Garylauchina/global-mobility-handbook/blob/main/investment-permanent-residence/south-korea/README.md) | 家属年龄/依赖、一般F5/归化适用和国籍/既有身份转换规则未完整取得。；税务机关指定2026解释页面本轮空正文，未重新闭合其具体居民判定文字。 |
| [安道尔](https://github.com/Garylauchina/global-mobility-handbook/blob/main/investment-residence/andorra/README.md) | 已实读初始许可办事页所列配偶/子女文件，但受养人年龄、依赖与全部适用亲属范围未完整确认；泛称符合条件受养人不足以闭合家属字段。 |
| [巴西](https://github.com/Garylauchina/global-mobility-handbook/blob/main/investment-residence/brazil/README.md) | RN36 core investment rules verified, but complete nationality/special-identity application restrictions not expressly established by opened general provisions. |
| [哥伦比亚](https://github.com/Garylauchina/global-mobility-handbook/blob/main/investment-residence/colombia/README.md) | M-investor work endorsement and complete special-nationality restrictions remain unconfirmed; generic M permission is not sufficient. |
| [希腊](https://github.com/Garylauchina/global-mobility-handbook/blob/main/investment-residence/greece/README.md) | Dual-national treatment and precise present operation of 2022 family exceptions under 2026 suspension need direct confirmation.；2026 incapacitated dependent adult child amendment source returned an anti-automation challenge; this specific family entitlement not fully verified. |
| [匈牙利](https://github.com/Garylauchina/global-mobility-handbook/blob/main/investment-residence/hungary/README.md) | 仅投资者页支持可团聚与工作权；家属年龄/受养定义和长期身份居住/融入条件未见当轮专项依据。；税务仅保留通用提醒，没有本轮税务机关来源，不能计为全部核心字段完成。 |
| [印度尼西亚](https://github.com/Garylauchina/global-mobility-handbook/blob/main/investment-residence/indonesia/README.md) | Nationalportal403; currentE28Cdepositoption, dependentage/economicconditions andCallingVisa/specialnationalities unresolved. |
| [约旦](https://github.com/Garylauchina/global-mobility-handbook/blob/main/investment-residence/jordan/README.md) | 购房居留的家属、受雇许可及申请者身份排除细则未取得；不得复用同篇新闻投资入籍家属规则。 |
| [拉脱维亚](https://github.com/Garylauchina/global-mobility-handbook/blob/main/investment-residence/latvia/README.md) | New state-founded fund route receiving institution/operational conditions and any article28 implementing suspensions not established by available dedicated official entry. |
| [卢森堡](https://github.com/Garylauchina/global-mobility-handbook/blob/main/investment-residence/luxembourg/README.md) | Cannot reread current investor thresholds, term, renewal, family and identity exceptions from moved Guichet entries; requires current procedural replacements. |
| [马来西亚](https://github.com/Garylauchina/global-mobility-handbook/blob/main/investment-residence/malaysia/README.md) | 本轮所读均为MM2H移民规则；税务只保留通用提醒，无税务机关依据，未完成核心税务字段复证。 |
| [毛里求斯](https://github.com/Garylauchina/global-mobility-handbook/blob/main/investment-residence/mauritius/README.md) | No current primary body accessible for all four property schemes; Smart City work and dependent eligibility and exact375000 boundary remain unresolved. |
| [阿曼](https://github.com/Garylauchina/global-mobility-handbook/blob/main/investment-residence/oman/README.md) | 六分支具体投资/提名文件、国籍及既有身份限制、离境期限、续签、其他受雇和家属证明边界仍不完整。 |
| [菲律宾](https://github.com/Garylauchina/global-mobility-handbook/blob/main/investment-residence/philippines/README.md) | No operativebodyrecoverable; allcurrentinvestment/term/work/familyrulesandDFAexcludednationalitylistremainunverifiedthisround. |
| [葡萄牙](https://github.com/Garylauchina/global-mobility-handbook/blob/main/investment-residence/portugal/README.md) | AIMA culture low-density discount simultaneously says20% and220k on250k base; need primary law/authority reconciliation. |
| [卡塔尔](https://github.com/Garylauchina/global-mobility-handbook/blob/main/investment-residence/qatar/README.md) | MOJ原页及两个官方替代入口均不可读，金额、90天及合资格物业区域未当轮复证。；家属年龄/受养证明、工作许可、申请者身份排除与税务规则仍未完整闭合。 |
| [沙特阿拉伯](https://github.com/Garylauchina/global-mobility-handbook/blob/main/investment-residence/saudi-arabia/README.md) | 官方产品及实施规则未取得可读正文；本轮不能完整复证所有核心字段及国籍/年龄/现有沙特身份条件。 |
| [斯里兰卡](https://github.com/Garylauchina/global-mobility-handbook/blob/main/investment-residence/sri-lanka/README.md) | 自由受雇及无关经营授权、受养人完整年龄与依赖边界未公开闭合。；完整国籍/既有身份限制尚未取得；税务机关后续申报通知404。 |
| [泰国](https://github.com/Garylauchina/global-mobility-handbook/blob/main/investment-residence/thailand/README.md) | Full current prohibited-identity treatment and Ministry of Interior implementation resolving portal-versus-BOI dependent scope remain unconfirmed. |
| [阿联酋](https://github.com/Garylauchina/global-mobility-handbook/blob/main/investment-residence/united-arab-emirates/README.md) | ICP当前10年与u.ae当前5年房产期限仍不一致，具体批件应向受理机关确认。；完整国籍/既有身份排除及工作许可条件未取得当轮可读主管原文。 |
| [巴林](https://github.com/Garylauchina/global-mobility-handbook/blob/main/passive-income-retirement/bahrain/README.md) | 普通退休服务地域与完整国籍/转换规则、家属/工作细则；黄金退休全部当前核心条件；税务具体豁免仍未闭合。 |
| [巴西](https://github.com/Garylauchina/global-mobility-handbook/blob/main/passive-income-retirement/brazil/README.md) | 退休类别工作、家属/长期转换及完整国籍或现有身份边界尚无本轮直接完整依据。 |
| [哥伦比亚](https://github.com/Garylauchina/global-mobility-handbook/blob/main/passive-income-retirement/colombia/README.md) | 完整特别国籍排除及既有身份转换条件未闭合。 |
| [哥斯达黎加](https://github.com/Garylauchina/global-mobility-handbook/blob/main/passive-income-retirement/costa-rica/README.md) | 两分支金额、期限、工作、家属、长期身份和完整国籍/境内转换条件均未取得本轮完整可读法源。 |
| [斐济](https://github.com/Garylauchina/global-mobility-handbook/blob/main/passive-income-retirement/fiji/README.md) | 10万元符号$的明确币种、完整续签/国籍限制及co-extensive家属细则尚未闭合。 |
| [希腊](https://github.com/Garylauchina/global-mobility-handbook/blob/main/passive-income-retirement/greece/README.md) | 现行3年期限、全部身份/转换限制、5年长期居民及7年归化适用条件未完整取得法源。 |
| [爱尔兰](https://github.com/Garylauchina/global-mobility-handbook/blob/main/passive-income-retirement/ireland/README.md) | 统一年度许可期限、家属财力要求及现有特殊身份转换边界仍未完整取得直接依据。 |
| [意大利](https://github.com/Garylauchina/global-mobility-handbook/blob/main/passive-income-retirement/italy/README.md) | 年度居留续签、EU长期与归化及完整特殊身份边界尚未取得本轮完整直接法源。 |
| [肯尼亚](https://github.com/Garylauchina/global-mobility-handbook/blob/main/passive-income-retirement/kenya/README.md) | ClassK具体PR计期、完整特殊身份条件尚未闭合。 |
| [毛里求斯](https://github.com/Garylauchina/global-mobility-handbook/blob/main/passive-income-retirement/mauritius/README.md) | 现行家属具体范围、既有许可转换和续签实施细则尚未从当前EDB正文完整确认 |
| [巴拿马](https://github.com/Garylauchina/global-mobility-handbook/blob/main/passive-income-retirement/panama/README.md) | 每家属250、子女25岁及残疾例外、无须续签具体条文、工作和完整身份转换尚缺完整现行文本。 |
| [菲律宾](https://github.com/Garylauchina/global-mobility-handbook/blob/main/passive-income-retirement/philippines/README.md) | PRA Identified Countries具体范围和审批边界，以及受雇AEP/劳动许可衔接未闭合。 |
| [卢旺达](https://github.com/Garylauchina/global-mobility-handbook/blob/main/passive-income-retirement/rwanda/README.md) | 完整身份规则、家属依附和一般长期身份适用条文尚未闭合。 |
| [南非](https://github.com/Garylauchina/global-mobility-handbook/blob/main/passive-income-retirement/south-africa/README.md) | 37000/38000金额冲突；现行工作背书、家属/PR与完整身份转换条件未闭合。 |
| [阿联酋](https://github.com/Garylauchina/global-mobility-handbook/blob/main/passive-income-retirement/united-arab-emirates/README.md) | 联邦18万口径及完整身份、家属担保与无个人所得税具体法源未取得本轮正文。 |
| [澳大利亚：中小学留学](https://github.com/Garylauchina/global-mobility-handbook/blob/main/study-student-residence/australia/primary-secondary/README.md) | 500/590及签证条件、485资格动态正文未载入，完整申请身份限制、家属细则仍待可读主管机关文本。；资金合并版与ATO现行税务正文不可读；本轮读到金额修订法不等于确认全部当前条件。；590监护人工作、期限、未满6岁家属及学校升学NPL完整条件未能本轮重新核实。 |
| [澳大利亚：大学留学](https://github.com/Garylauchina/global-mobility-handbook/blob/main/study-student-residence/australia/university/README.md) | 500/590及签证条件、485资格动态正文未载入，完整申请身份限制、家属细则仍待可读主管机关文本。；资金合并版与ATO现行税务正文不可读；本轮读到金额修订法不等于确认全部当前条件。；485 AFP、Graduate Diploma组合及印度/研究硕博年龄例外未当前完整闭合。 |
| [加拿大：中小学留学](https://github.com/Garylauchina/global-mobility-handbook/blob/main/study-student-residence/canada/primary-secondary/README.md) | IRCC未成年专题与Guide 5269的17岁强制custodian边界仍存在互相矛盾文字；须由主管机关个案确认，采用专题并保留裁量说明。 |
| [加拿大：大学留学](https://github.com/Garylauchina/global-mobility-handbook/blob/main/study-student-residence/canada/university/README.md) | CRS加拿大教育8个月现场/全日制及加拿大工作计分排除条件尚需现行计分细则原文复证。；Guide 5269仍写所有co-op须工签，专题已更新；保留旧指南不一致说明，不把通用指南视为当前高教实习依据。 |
| [法国：大学留学](https://github.com/Garylauchina/global-mobility-handbook/blob/main/study-student-residence/france/university/README.md) | 转入其他合资格身份后的历史学习年限计算尚未重建；全部双边APS特例未逐国完成。；资金47% SMIC的法令链接本轮仍403；当前金额由现行行政页确认。 |
| [德国：中小学留学](https://github.com/Garylauchina/global-mobility-handbook/blob/main/study-student-residence/germany/primary-secondary/README.md) | 外交部现行签证手册PDF返回400；已以§16f法条及2026雅加达指南补证，但低于九年级的操作例外、交换通常一年及国家签证12个月口径未完整重新读取。 |
| [日本：中小学留学](https://github.com/Garylauchina/global-mobility-handbook/blob/main/study-student-residence/japan/primary-secondary/README.md) | e-Gov上陆许可基准正文为空，K12年龄20/17/14及交流例外未能本轮逐条重读；境内转换及特殊国籍完整范围仍未闭合。；未成年劳动法网页编码及法规入口未取得本轮可靠完整正文，具体最低年龄、夜间与危险作业限制保留待补证。 |
| [日本：大学留学](https://github.com/Garylauchina/global-mobility-handbook/blob/main/study-student-residence/japan/university/README.md) | 境内由短期停留等身份转换留学的限制与特殊国籍完整适用仍待官方条文闭合；已读外务省当前国籍材料差异。；继续求职特定活动6个月及一次续期的期限依据未在当前办理正文闭合。 |
| [新加坡：中小学留学](https://github.com/Garylauchina/global-mobility-handbook/blob/main/study-student-residence/singapore/primary-secondary/README.md) | MOE招生与费用页面无法实际读取，AEIS/S-AEIS年级、CEQ、考试/成绩及2027窗口仍需主管机关可读正文补证；现有招生时间不得视为本轮新核实。 |
| [瑞士：中小学留学](https://github.com/Garylauchina/global-mobility-handbook/blob/main/study-student-residence/switzerland/primary-secondary/README.md) | FDFA入口403、AIG/VZAE动态页未取得正文；主要条款经SEM及州文件补证，但独立学生国籍签证例外、境内转类及教育后2年C计时原文仍需补齐。 |
| [瑞士：大学留学](https://github.com/Garylauchina/global-mobility-handbook/blob/main/study-student-residence/switzerland/university/README.md) | FDFA长期签证入口403，Fedlex AIG/VZAE网页仅JS外壳；SEM与州指令补证了主要条件，但按国籍的签证豁免、既有身份转类及教育后2年计C年限原法条未完整重新读取。 |
| [英国：中小学留学](https://github.com/Garylauchina/global-mobility-handbook/blob/main/study-student-residence/united-kingdom/primary-secondary/README.md) | 现行CS15.1和16.1对刚满16岁工作仍有文字冲突；未取得UKVI澄清。；父母同住资金行的boarding fees仍与申请指引冲突，须个案清单或UKVI确认。 |
| [英国：大学留学](https://github.com/Garylauchina/global-mobility-handbook/blob/main/study-student-residence/united-kingdom/university/README.md) | 政府资助学生带家属的6个月临界值：ST31.1(a)为6个月或以上，GOV.UK申请指引为超过6个月；未取得主管机关澄清。 |
| [美国：中小学留学](https://github.com/Garylauchina/global-mobility-handbook/blob/main/study-student-residence/united-states/primary-secondary/README.md) | 劳工部未成年人就业正文及替代访问均403，具体劳动年龄/工时边界本轮未闭合。；全国暂缓命令已实读；后续上诉/程序尚待官方最新案卷，FAM拒签条款与完整资金细则入口未读通。 |
| [美国：大学留学](https://github.com/Garylauchina/global-mobility-handbook/blob/main/study-student-residence/united-states/university/README.md) | FAM资金、非移民意图细则入口超时，USCIS资格章403；未据此声称全部核心细则复核完成。；全国暂缓命令已实读；9月30日上诉及10月后程序尚无本轮已读官方后续裁定，需跟进法院案卷。eCFR展示文本含受暂缓终规条文，不能单独代表可执行规则。 |
| [墨西哥](https://github.com/Garylauchina/global-mobility-handbook/blob/main/visitor-financial-remote/mexico/README.md) | 未完整取得国籍/现有境内身份转换例外；首次换卡、每次续签及全家属类别/附加资金尚需INM操作指南补证。 |

## 验证与发布

本地检查已通过：17项日期／状态回归测试；173页结构与链接检查；中央记录与本轮清单一一对应（45页推进、128页保留、全库基准不变）；0个逾期页面仍标current；生成导航一致；现有虚拟环境的严格MkDocs构建；718条索引上的11组中英文搜索断言，执行5个真实搜索worker脚本。构建目录位于仓库外。

本轮未修改Skill或维护周期，因此未重复创建Skill或定时任务。内容提交 [981db7b](https://github.com/Garylauchina/global-mobility-handbook/commit/981db7bec3cee053398bd8bb7ce32e30ea69fc21) 的[验证工作流](https://github.com/Garylauchina/global-mobility-handbook/actions/runs/37869345327)及[Pages部署工作流](https://github.com/Garylauchina/global-mobility-handbook/actions/runs/37869345420)均已成功。部署后实际下载21个首页／分类／国家／政策HTML和38个搜索及脚本产物，与本地严格构建逐文件一致；首页日期与45／128统计、9类导航及新加坡国家／叶页链接已确认。对线上下载产物重新执行11组中英文搜索，718条索引及5个搜索worker脚本全部通过。以上为HTTP内容和实际搜索执行检查，未另做可视化浏览器截图。
