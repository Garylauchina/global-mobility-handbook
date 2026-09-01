# 贡献指南

欢迎提交纠错和政策更新。为了避免知识库变成营销目录，请遵守以下规则：

维护者还应遵循[维护手册](./MAINTENANCE.md)；日期到期本身不是规则变化的证据。

1. 每项事实变化必须附主管机关、法律文本、政府公报或领馆操作页。
2. 中介、开发商、基金销售页或新闻转载不能作为唯一证据。
3. 写明旧规则、新规则、变化生效日和你的核验日期。
4. 不提交个人申请材料、护照、账户、住址、联系方式、付款信息或其他个人信息。
5. 不提交推广、返佣、开户链接、优惠码、保证获批、保证回购或签证/免签排名。
6. 保留原币和法定公式；不要用未经说明的汇率换算制造“最低价”。
7. 区分公民身份、居留、工作权、税务居民、旅行待遇和银行KYC。

提交前请运行：

```bash
node scripts/audit-freshness.mjs
node scripts/validate-repo.mjs
node scripts/audit-freshness.mjs --check-public-status
node scripts/generate-site-config.mjs --check
```

如修改了类别目录或新增国家页面，请先运行 `node scripts/generate-site-config.mjs` 更新站点导航。需要本地预览时，安装 `requirements-docs.txt` 后运行：

```bash
node scripts/run-mkdocs.mjs serve
```
