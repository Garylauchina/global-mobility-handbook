# Review checklist

Use the sections relevant to the requested maintenance mode. Do not expand a single-page correction into an unsolicited global review.

## Existing-page refresh

- Confirm the program's official name and competent authority.
- Check intake state, threshold or income formula, fund type, first status and validity, residence or renewal rule, local work rights, dependants, permanent-residence or citizenship path, tax caution, and key limitations.
- Check nationality restrictions, quotas, deadlines, transitional provisions, and effective dates when the official material exposes them.
- Open every retained primary link; replace dead links only with an equally authoritative source.
- Reconcile `status`, `evidence`, frontmatter, visible labels, warning text, and category placement.
- Update the central review record only after reviewing every core field and program block; apply the [update policy](../../../../UPDATE_POLICY.md) for dates, status transitions and the standard warning. Do not add site verification dates to the page.

## New country or program page

- Confirm that the route fits [the repository scope](../../../../METHODOLOGY.md) and is not an ordinary work, family, or generic visitor route. Student routes belong only in the dedicated study and student residence category and follow [study-student-residence.md](study-student-residence.md).
- Search the warning archive before adding a duplicate or rebranded program.
- Use the established frontmatter keys and page field order from a nearby page in the same category. A registered third-level route leaf may add the structural `country` and `route` keys required by its category.
- Assign `current` only with A- or B-grade evidence. Use `candidate-unverified` plus evidence C when official detail is insufficient.
- Register the page in central review records, add it to the direct parent index required by its hierarchy, and update affected ancestor indexes. If a country has distinct routes in several categories, keep separate pages rather than a cross-country total table.
- Regenerate `mkdocs.yml` after an index changes.

Current, stale, and candidate pages keep these frontmatter keys: `title`, `category`, `status`, `evidence`, and `region`. Each program block keeps the field set established for its category and the page ends with “纠错与更新”. Programs sharing a page also share its evidence grade and central review record; review every block before advancing that record.

## Closure, pause, replacement, or reopening

- Require positive evidence of the transition; an inaccessible page alone is insufficient.
- Record the announcement or legal date separately from the effective date.
- Preserve transitional rights for existing applicants when officially documented.
- Move a non-current country page into `closed-paused-unverified/`, update central review paths and affected indexes, and regenerate navigation. For a third-level route leaf, follow its category reference and never overwrite an existing warning-archive country page.
- Reopening requires a current application route and sufficient official support; historical eligibility alone is insufficient.
- Record the transition in `CHANGELOG.md`.

Warning-archive pages use `title`, `category`, and `status: "archived-or-unverified"` in frontmatter. Evidence belongs to each program block because one country page may describe several historical or uncertain programs; do not force active-page fields onto this template. These pages remain part of the full monthly review.

## Broken or conflicting source

- Search the same authority's current domain, legislation database, gazette, archived official notice, and local-language page.
- Do not silently replace a primary source with a commercial summary.
- If no official replacement is found, retain the last authoritative URL and note the access failure in the stale warning or change description.
- If official pages disagree, state the conflict and retain the more conservative presentation until clarified.
- Leave the central review record unchanged if the core facts could not be re-established.

## Batch or periodic review

- Use `node scripts/audit-freshness.mjs` for priority; a monthly review covers the complete registered policy-page list, including candidate, warning-archive and not-yet-due pages. Keep a list of pages actually opened.
- Review in bounded batches that can be evidenced and validated.
- Do not apply one country's rule, terminology, fee, or status to another by pattern matching.
- Report pages reviewed with no change separately from pages not reviewed.
- Do not mass-refresh dates.

## Final checks

- No global comparison table, ranking, success rate, recommendation, affiliate content, or personal application data was added.
- Changed claims have claim-matched sources and explicit uncertainty where needed.
- Category indexes and generated navigation agree.
- Select validation by the affected behavior using [maintenance checks](../../../../MAINTENANCE.md). A release requires the complete set; report unfinished review work separately from build results.
- For external publication, reuse authorization for the same action and target; ask only when it is missing.
