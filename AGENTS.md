# Repository instructions

These instructions apply to the entire repository. This is a public, Chinese-first, source-led handbook, not an immigration sales site or personalized advisory service.

## Canonical boundaries

Read `METHODOLOGY.md`, `UPDATE_POLICY.md`, `INDEPENDENCE.md`, and `DISCLAIMER.md` before changing program facts. For maintenance work, use the repository skill at `.agents/skills/global-mobility-maintenance/SKILL.md`.

- Preserve the route-type-first, country-or-territory-second directory structure.
- The same country may have distinct pages in several route categories, and a historical route may coexist with a current route. Do not deduplicate by country name.
- Keep each country/category record on its own page; distinct programs in the same country and category may use separate blocks on that page. Do not add a global comparison table, ranking, score, visa-free count, success rate, or personalized recommendation.
- Do not add affiliate, referral, sales, promotional, guarantee, or paid-placement content.
- Keep citizenship, residence, work rights, tax residence, travel treatment, and banking compliance distinct.
- Preserve original currencies and statutory formulas; do not manufacture a converted “lowest price.”

## Evidence and status

Prefer legislation, gazettes, competent authorities, immigration departments, ministries, consulates, and official program portals. Commercial pages and secondary summaries may help find a source but cannot alone support an open program or material benefit.

Allowed frontmatter statuses are `current`, `stale`, `candidate-unverified`, and `archived-or-unverified`.

Every country page also has explicit `review_interval_days`: 30 for wage-indexed minimum-income or living-means tests, quotas, deadlines, real-estate qualifications, and rules explicitly undergoing rapid change; 90 for other current or stale pages; and 180 for candidate or warning-archive pages. For a page with several programs, use the shortest applicable interval. Do not infer this value from prose at runtime.

- `current` requires evidence A or B.
- `stale` means a formerly current page exceeded its review interval. Keep its last evidence grade and `last_verified`, add the standard “复核警示”, and change every program block to “待复核（最后核验：YYYY-MM-DD；原记录：开放）”. The retained A/B grade describes evidence as of `last_verified`, not current confirmation.
- `candidate-unverified` requires evidence C and an explicit warning.
- `archived-or-unverified` belongs only in `closed-paused-unverified/`.

Do not infer closure from a 404, failed search, inaccessible website, or missing English page. Preserve uncertainty and record official conflicts rather than selecting the rule most favorable to an applicant.

Change `last_verified` and the visible verification date only after reviewing the page's core claims against current sources on that date. Editorial or navigation-only work must not refresh verification dates. Record material closures, reopenings, threshold changes, and category changes in `CHANGELOG.md`.

## Repository operations

- Run `node scripts/audit-freshness.mjs` to build a review queue; its output is not proof of a policy change.
- Before editing, run the structure and navigation checks and record pre-existing failures. Do not repair unrelated failures without scope or misreport them as caused by the current change.
- Update the affected category `README.md` when adding, removing, or moving a country page.
- When adding a new top-level category, update the root index and category lists in both `scripts/generate-site-config.mjs` and `scripts/validate-repo.mjs`.
- Regenerate navigation with `node scripts/generate-site-config.mjs`; do not edit generated `mkdocs.yml` by hand.
- Keep GitHub Actions permissions minimal, pin third-party actions to full commit SHAs, and retain `persist-credentials: false`.
- Before handoff, run `node scripts/validate-repo.mjs`, `node scripts/audit-freshness.mjs --check-public-status`, `node scripts/generate-site-config.mjs --check`, and `node scripts/run-mkdocs.mjs build --strict --site-dir .site`.
- Preserve unrelated user changes and never commit private application records, credentials, tokens, machine-specific paths, or unpublished source files.
- Do not commit spreadsheets, CSV/TSV files, downloaded PDFs, or other source artifacts. Link official source documents externally; do not relicense copied source text as repository content.
- Do not change `LICENSE` or `LICENSE-CODE` unless the user explicitly requests a licensing change.
- Do not push, publish, merge, release, or mutate GitHub issues unless the user gives current explicit authorization.

A push to `main` triggers the Pages deployment workflow and is therefore a public publication action, not merely remote backup.

Use relative repository paths so the project remains portable across machines and Codex installations.
