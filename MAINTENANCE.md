# 维护手册

从仓库根目录操作。证据与收录边界见[研究方法](./METHODOLOGY.md)，月度节奏、中央日期记录、首页基准及状态转换统一遵循[更新政策](./UPDATE_POLICY.md)。仓库 Skill 按任务路由到本手册及专用检查表，不另建一套维护规则。

## 准备与复核清单

先明确本轮交付是局部修正、全库月更还是发布，选择对应检查。需要区分既有失败时先运行基线检查；保留无关用户改动，不把局部修正扩大为全库研究。

```bash
node scripts/audit-freshness.mjs
```

时效队列用于安排工作，不是政策变化的证据。需要复现历史或未来排队结果时可加 `--as-of YYYY-MM-DD`。全库月更必须对照 `scripts/content-tree.mjs` 枚举的完整政策页清单与 `.maintenance/review-state.json`，覆盖候选、警示归档和尚未到期的页面，并记录哪些已完成、未完成或有证据冲突。

## 逐页复核与改动

1. 打开政策页及主管机关来源，确认官方项目名、管辖范围和当前入口。依照 GitHub 仓库的[复核检查表](https://github.com/Garylauchina/global-mobility-handbook/blob/main/.agents/skills/global-mobility-maintenance/references/review-checklist.md)核对完整字段；留学路线另用其专用参考。
2. 核对来源公布日、政策生效日、过渡安排、配额和国籍限制。证据必须支持对应事实；来源冲突或无法重建核心事实时保留不确定性，不以检索失败推断关闭。
3. 更新当前快照；重要政策变化追加时间线并按更新政策记入 `CHANGELOG.md`。仅到期转为待复核时，直接采用更新政策的标准文案。
4. 按实际完成范围更新中央 `page_reviews`；同页所有项目块完成后才推进该页记录。记录访问日期、争议裁决和材料更正的过程可写入提交或 PR 说明。
5. 全库月更结束时核对完整清单；只有全部实质复核完成，才推进中央全库基准和中英文首页。未完成时报告缺口，保留上次全库基准。

主管机关链接失效时，先查找同一机关的新页面、法规库、公报、官方存档及当地语言页面。仍无替代来源时保留最后权威链接，记录访问问题，不用商业链接替代。只修改文字或链接标签不构成内容复核。

新增、删除或迁移政策页时，同步维护中央记录中的路径、受影响类别及国家索引，并运行 `node scripts/generate-site-config.mjs`。遵循类别字段与已注册叶页层级；第三层留学路线归档须合入对应警示页的独立项目块，不能覆盖已有历史项目。

## AI批量复核与基准测试

普通月更逐页核对核心官方来源，可分组并行；重大变动、来源冲突或证据不足的页面优先独立复查。只有用户明确要求基准测试或质量抽检时，才采用独立首审、交叉盲审和计时流程，不将其作为每次月更的必跑步骤。具体规则与政策时间线格式见 GitHub 仓库的[基准与时间线参考](https://github.com/Garylauchina/global-mobility-handbook/blob/main/.agents/skills/global-mobility-maintenance/references/benchmark-and-timeline.md)，仅阅读当前任务对应章节。

通常保留直接来源URL、标题、条款或章节、公布/生效日及访问记录即可；除非用户需要，无须下载网页或截图。下载的源材料、个人申请信息和机器路径不得提交仓库。

## 检查与发布

局部改动按影响选择检查：内容或中央记录运行结构与时效检查；目录改动检查导航；渲染或共享站点改动检查严格构建及搜索。发布或跨站改动在最终编辑后运行完整检查：

```bash
node --test scripts/*.test.mjs
node scripts/validate-repo.mjs
node scripts/audit-freshness.mjs --check-public-status
node scripts/generate-site-config.mjs --check
mobility_site_dir="$(mktemp -d)"
node scripts/run-mkdocs.mjs build --strict --site-dir "$mobility_site_dir"
node scripts/validate-search.mjs "$mobility_site_dir"
```

构建输出必须是仓库外的绝对临时目录；运行前确认 `mktemp -d` 使用的系统临时目录在仓库外。包装器的临时配置会被清理，相对输出目录无法可靠留存；仓库内目录也可能与 `docs_dir` 冲突。搜索检查使用同一次构建产物，覆盖中文和英文查询。若 MkDocs 仅安装在现有虚拟环境，可在构建命令前设置 `MKDOCS_BIN="$PWD/.venv/bin/mkdocs"`。

仓库 Skill 改动还需定位当前 Codex 安装的 `skill-creator/scripts/quick_validate.py`，验证 Skill 及其链接；不把本机绝对路径写入仓库。修复范围内失败并重跑受影响检查；无关失败、缺少依赖或未运行项目须如实报告，不以较弱检查冒充通过。

推送到 `main` 会触发 GitHub Pages 发布。复用覆盖同一动作和目标的已有授权；没有授权时，先准备验证通过的结果再询问。发布后确认对应提交的验证与部署工作流成功，检查线上首页、导航和中英文搜索。构建成功只说明结构与运行检查通过，不证明政策事实正确。

交付说明列出实际复核范围、实质变化、来源和未决问题、中央记录或首页基准是否变动，以及检查和发布结果。政策事实、复核完成情况和部署状态分别报告。

## 迁移到新环境

1. 克隆仓库，从根目录打开 Codex；使用 `.agents/skills/global-mobility-maintenance/SKILL.md`。
2. 安装 Node.js 22、Python 和 `requirements-docs.txt` 中的依赖。
3. 运行上述完整检查，确认 Pages 来源为 GitHub Actions，并核对最近一次部署。

仓库规则、Skill 和脚本使用相对路径，不依赖原电脑的私人记忆或用户名。GitHub Pages 的已发布站点不因 Codex 环境迁移而中断。
