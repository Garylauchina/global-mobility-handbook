# Repository instructions

These instructions apply to the entire repository. This is a public, Chinese-first, source-led handbook, not an immigration sales site or personalized advisory service.

## Canonical boundaries

Use `METHODOLOGY.md` for evidence/schema questions, `UPDATE_POLICY.md` for review/status transitions, and `INDEPENDENCE.md` or `DISCLAIMER.md` when those boundaries are in scope. For policy maintenance, use `.agents/skills/global-mobility-maintenance/SKILL.md`; load only relevant references.

- Preserve the route-type-first, country-or-territory-second directory structure. A category may define a third-level route leaf when materially different subroutes need independent evidence and review dates; structural index pages do not carry policy metadata.
- The same country may have distinct pages in several route categories, and a historical route may coexist with a current route. Do not deduplicate by country name.
- Keep each policy record on its category/country content page or on a category-defined route leaf; distinct programs sharing one review date may use separate blocks on that page. Do not add a global comparison table, ranking, score, visa-free count, success rate, or personalized recommendation.
- Do not add affiliate, referral, sales, promotional, guarantee, or paid-placement content.
- Keep citizenship, residence, work rights, tax residence, travel treatment, and banking compliance distinct.
- Preserve original currencies and statutory formulas; do not manufacture a converted “lowest price.”

## Evidence and status

Prefer legislation, gazettes, competent authorities, immigration departments, ministries, consulates, and official program portals. Commercial pages and secondary summaries may help find a source but cannot alone support an open program or material benefit.

Allowed frontmatter statuses are `current`, `stale`, `candidate-unverified`, and `archived-or-unverified`.

Every policy content page also has explicit `review_interval_days`: 30 for wage-indexed minimum-income or living-means tests, study-permit financial thresholds, quotas, deadlines, real-estate qualifications, and rules explicitly undergoing rapid change; 90 for other current or stale pages; and 180 for candidate or warning-archive pages. For a page with several programs, use the shortest applicable interval. Do not infer this value from prose at runtime.

- `current` requires evidence A or B.
- `stale` means a formerly current page exceeded its review interval. Keep its last evidence grade and `last_verified`, add the standard “复核警示”, and change every program block to “待复核（最后核验：YYYY-MM-DD；原记录：开放）”. The retained A/B grade describes evidence as of `last_verified`, not current confirmation.
- `candidate-unverified` requires evidence C and an explicit warning.
- `archived-or-unverified` belongs only in `closed-paused-unverified/`.

Do not infer closure from a 404, failed search, inaccessible website, or missing English page. Preserve uncertainty and record official conflicts rather than selecting the rule most favorable to an applicant.

Change `last_verified` and the visible verification date only after reviewing the page's core claims against current sources on that date. Editorial or navigation-only work must not refresh verification dates. Record material closures, reopenings, threshold changes, and category changes in `CHANGELOG.md`.

## Repository operations

- Define the requested output and relevant acceptance checks at task start. Inspect affected files; baseline tests are useful when needed to distinguish existing failures, not mandatory before each edit.
- For a periodic review, run `node scripts/audit-freshness.mjs` to build the queue; it is not evidence of a policy change.
- Update every affected category or country index when adding, removing, or moving a policy content page.
- When adding a new top-level category, update the root index and the shared registry in `scripts/content-tree.mjs`; validation, freshness auditing, and navigation generation must consume its exact leaf enumeration and reject unregistered depth below a leaf.
- Regenerate navigation with `node scripts/generate-site-config.mjs`; do not edit generated `mkdocs.yml` by hand.
- Keep GitHub Actions permissions minimal, pin third-party actions to full commit SHAs, and retain `persist-credentials: false`.
- Select checks by impact: `node scripts/validate-repo.mjs` for content/schema; `node scripts/audit-freshness.mjs --check-public-status` for status/date changes; `node scripts/generate-site-config.mjs --check` for navigation; `node scripts/run-mkdocs.mjs build --strict --site-dir .site` for rendering, shared site changes, or publication. For instruction-only edits, validate changed Skills and links. Run the full set for a release or cross-cutting change, once after the final edits.
- Preserve unrelated user changes and never commit private application records, credentials, tokens, machine-specific paths, or unpublished source files.
- Do not commit spreadsheets, CSV/TSV files, downloaded PDFs, or other source artifacts. Link official source documents externally; do not relicense copied source text as repository content.
- Do not change `LICENSE` or `LICENSE-CODE` unless the user explicitly requests a licensing change.
- Proceed directly with scoped local edits, builds, tests, and repairs. Fix in-scope failures and rerun affected checks until passed; report unrelated failures or external blockers precisely.
- For push, publication, merge, release, or GitHub issue changes, use existing authorization for the same action and target. If absent, prepare the validated result and ask once.

A push to `main` triggers the Pages deployment workflow and is therefore a public publication action, not merely remote backup.

Use relative repository paths so the project remains portable across machines and Codex installations.
