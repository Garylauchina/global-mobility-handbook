# Study and student residence pages

Read this reference before creating or reviewing a study-category index or policy page.

## Scope and hierarchy

- Record immigration status tied to formal education: admission-linked permission, financial proof, validity and renewal, study conditions, work rights, dependants, guardianship, progression or post-study status, and long-term-status boundaries.
- Do not add school rankings or directories, admissions odds, application essays, course reviews, scholarship recommendations, education-agent services, or a cross-country comparison table.
- Use the registered hierarchy `study-student-residence/<country>/<route>/README.md`. The category and country `README.md` files are structural indexes without policy frontmatter or verification dates. Every route leaf has independent metadata and enters the freshness queue separately.
- Keep the category index, country index, actual directories, and generated navigation synchronized through `scripts/content-tree.mjs` and `scripts/generate-site-config.mjs`.

## Evidence boundaries

- Prefer immigration legislation and the national immigration authority for status, work rights, dependants, validity, caps, and transitions. Use the responsible education ministry or provincial authority for education-level rules within its jurisdiction.
- Separate an admission letter from immigration approval. Separate a study permit from an entry visa, work authorization, post-study permit, permanent residence, citizenship, tax residence, and health coverage.
- Preserve federal, provincial, territorial, and school-level boundaries. Do not convert one province's funds, guardianship, tuition, insurance, school designation, or admission rule into a national rule.
- Record current intake caps, annual financial formulas, attestation requirements, announced future changes, effective dates, and transition rules. Failed searches or unavailable school pages do not prove a national route closed.
- Link official pages and legal texts; do not commit downloaded application forms, school brochures, PDFs, screenshots, or personal application records.

## Leaf metadata and fields

In addition to the standard active-page frontmatter, require `country` and a stable directory-matched `route` slug. Dynamic financial thresholds, caps, or rapidly changing work/post-study rules normally require `review_interval_days: 30`.

Each program block uses this order:

1. `当前状态`
2. `适用对象与核心资格`
3. `录取与院校要求`
4. `资金证明`
5. `首次许可与期限`
6. `续签与学籍变化`
7. `学习期间工作`
8. `家属`
9. `毕业后或升学路径`
10. `永居或入籍边界`
11. `税务提示`
12. `关键限制与变化`
13. `证据等级`
14. `主要来源`
15. `本条核验日期`

Use “不适用” or a precise negative boundary when a field does not confer a benefit; never leave it blank. Keep material changes in the route page's policy timeline under the repository timeline rules.

## Closure and reopening

- Do not move a closed third-level route leaf directly to `closed-paused-unverified/<country>/README.md`; that path may already contain other historical programs.
- After positive official evidence of closure, pause, or replacement, convert the route into a distinct program block on the existing warning-archive country page, or create that country page if absent. Never overwrite an existing block. Review every block on the warning page before advancing its shared page-level date.
- In the same change, remove the active route leaf from its country index, update all affected indexes and generated navigation, and record the transition in `CHANGELOG.md`. Preserve the former route name, old and new status, announcement and effective dates, transition treatment, sources, evidence grade, and verification date in the warning block.
- A later reopening creates or restores a current route leaf only with a current application path and sufficient official evidence. Keep the historical warning block as history unless a separately justified correction is appended.

## Review focus by education level

- Higher education: institution designation, course type and duration, admission or attestation documents, transfer rules, on/off-campus work, mandatory placement authorization, dependant work eligibility, post-graduation work eligibility, and whether study time affects later status.
- Primary and secondary education: minor status, school or board acceptance, school designation treatment, parental consent, custodian or guardianship, accompanying-parent status, permit validity, within-level transfers, transition to higher education, and the absence of ordinary student work or post-graduation rights unless official rules expressly provide them.
