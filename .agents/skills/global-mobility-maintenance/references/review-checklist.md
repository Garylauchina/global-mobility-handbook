# Review checklist

Use the sections relevant to the requested maintenance mode. Do not expand a single-page correction into an unsolicited global review.

## Existing-page refresh

- Confirm the program's official name and competent authority.
- Check intake state, threshold or income formula, fund type, first status and validity, residence or renewal rule, local work rights, dependants, permanent-residence or citizenship path, tax caution, and key limitations.
- Check nationality restrictions, quotas, deadlines, transitional provisions, and effective dates when the official material exposes them.
- Open every retained primary link; replace dead links only with an equally authoritative source.
- Reconcile `status`, `evidence`, frontmatter, visible labels, warning text, and category placement.
- Refresh both verification dates only after the full core review.
- If the page is due but cannot be fully reverified, retain the dates and evidence grade, set `status: "stale"`, add the following block after the page's standard disclaimer, and change every “当前状态” value to `待复核（最后核验：YYYY-MM-DD；原记录：开放）`:

  `> **复核警示：** 本页已超过复核周期。以下内容最后核验于 YYYY-MM-DD；在完成主管机关复核前，不应视为当前开放规则。`

## New country or program page

- Confirm that the route fits [the repository scope](../../../../METHODOLOGY.md) and is not an ordinary work, student, family, or generic visitor route.
- Search the warning archive before adding a duplicate or rebranded program.
- Use the established frontmatter keys and page field order from a nearby page in the same category.
- Assign `current` only with A- or B-grade evidence. Use `candidate-unverified` plus evidence C when official detail is insufficient.
- Add the page to exactly one primary category index. If a country has distinct routes in several categories, keep separate pages rather than a cross-country total table.
- Regenerate `mkdocs.yml` after the category index changes.

Current, stale, and candidate pages keep these frontmatter keys: `title`, `category`, `status`, `last_verified`, `review_interval_days`, `evidence`, and `region`. Use 30 for wage-indexed minimum-income or living-means tests, quotas, deadlines, real-estate qualifications, and rules explicitly undergoing rapid change; 90 for other current or stale pages; and 180 for candidates. Each program block keeps the established fields from “当前状态” through “本条核验日期”, and the page ends with “纠错与更新”. A country page may contain several distinct programs in the same category; use the shortest applicable interval and review every block before advancing the shared page date or evidence grade.

## Closure, pause, replacement, or reopening

- Require positive evidence of the transition; an inaccessible page alone is insufficient.
- Record the announcement or legal date separately from the effective date.
- Preserve transitional rights for existing applicants when officially documented.
- Move a non-current page into `closed-paused-unverified/`, update both affected category indexes, and regenerate navigation.
- Reopening requires a current application route and sufficient official support; historical eligibility alone is insufficient.
- Record the transition in `CHANGELOG.md`.

Warning-archive pages use `title`, `category`, `status: "archived-or-unverified"`, `last_verified`, and `review_interval_days: 180` in frontmatter. Evidence belongs to each program block because one country page may describe several historical or uncertain programs; do not force active-page fields onto this template. Move the page-level date and every block's verification date together only after all blocks on that page have been reviewed.

## Broken or conflicting source

- Search the same authority's current domain, legislation database, gazette, archived official notice, and local-language page.
- Do not silently replace a primary source with a commercial summary.
- If no official replacement is found, retain the last authoritative URL and note the access failure in the stale warning or change description.
- If official pages disagree, state the conflict and retain the more conservative presentation until clarified.
- Leave `last_verified` unchanged if the core facts could not be re-established.

## Batch or periodic review

- Start with `node scripts/audit-freshness.mjs` and keep a list of pages actually opened.
- Review in bounded batches that can be evidenced and validated.
- Do not apply one country's rule, terminology, fee, or status to another by pattern matching.
- Report pages reviewed with no change separately from pages not reviewed.
- Do not mass-refresh dates.

## Final checks

- No global comparison table, ranking, success rate, recommendation, affiliate content, or personal application data was added.
- Changed claims have claim-matched sources and explicit uncertainty where needed.
- Category indexes and generated navigation agree.
- `node scripts/validate-repo.mjs` passes.
- `node scripts/audit-freshness.mjs --check-public-status` passes; no overdue page is still presented as `current`.
- `node scripts/generate-site-config.mjs --check` passes.
- `node scripts/run-mkdocs.mjs build --strict --site-dir .site` passes.
- External publication waits for explicit authorization.
