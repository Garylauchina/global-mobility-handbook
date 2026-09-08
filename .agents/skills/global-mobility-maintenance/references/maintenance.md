# Handbook Maintenance

Keep the public handbook current without turning uncertain research into application advice.

## Establish scope

Work from the repository root. Define the requested pages, output, and relevant acceptance checks.

Use [methodology](../../../../METHODOLOGY.md) for evidence/schema questions and [update policy](../../../../UPDATE_POLICY.md) for status transitions. Read only what the current change needs.

- For any factual, source, status, threshold, eligibility, or evidence change, read [source-policy.md](source-policy.md).
- For a periodic review, new page, program closure/reopening, category move, or batch refresh, also read [review-checklist.md](review-checklist.md).
- For an AI benchmark, parallel batch review, or any material rule change that needs a policy timeline, also read [benchmark-and-timeline.md](benchmark-and-timeline.md).
- For the study and student residence category, including a country index or education-level route page, also read [study-student-residence.md](study-student-residence.md).

Use baseline checks when needed to distinguish existing failures. Do not run the full suite before every edit. Repair in-scope failures; report unrelated blockers accurately.

## Build the review queue

Run `node scripts/audit-freshness.mjs`. Prioritize already-due pages, official announcements, reported corrections, broken competent-authority links, and material rule changes. If the user names specific pages, keep the review scoped to those pages unless a discovered change necessarily affects another page.

The freshness report is a queue, not evidence that a rule changed. Never update facts or `last_verified` merely because a date is due.

## Verify Policy Claims

Use current competent-authority, legislation, gazette, consular, or official program sources. Search secondary sources only to discover official material or to retain a clearly labeled C-grade lead.

For each reviewed claim:

1. Identify the exact program and competent authority.
2. Verify the page's core fields against current official material.
3. Record conflicts, effective dates, transitional rules, and source publication dates separately.
4. Distinguish confirmed absence or closure from a missing page, failed search, or inaccessible site.

If current authoritative verification is unavailable, do not refresh the date. Report the page as pending and preserve the uncertainty.

For a benchmark, keep first-pass reviewers independent, then give every sampled page to a different blind reviewer. Reconcile disagreements claim by claim before editing. A fast AI search is not a reason to lower the evidence standard or treat a failed search as proof that nothing changed.

## Make bounded changes

Preserve the route-type-first, country-second structure and the field order defined for each category. Use a third-level route leaf only when registered in `scripts/content-tree.mjs`; structural index pages do not carry policy metadata. Do not add a global comparison table, school ranking, recommendation score, visa-free count, success-rate claim, affiliate link, or personalized recommendation.

- Update `last_verified` and the visible verification date only after reviewing the page's core claims on that date.
- Keep `review_interval_days` explicit: use 30 for wage-indexed minimum-income or living-means tests, quotas, deadlines, real-estate qualifications, and rules explicitly undergoing rapid change; 90 for other current or stale pages; and 180 for candidate or warning-archive pages. Do not infer the interval from wording at runtime.
- Editorial, formatting, spelling, or link-label changes do not refresh the verification date.
- Keep `status`, `evidence`, category placement, warning text, and visible facts consistent. When a due `current` page cannot be reverified, use `status: "stale"`, retain its old date and evidence grade, insert the standard “复核警示” from the checklist, and change every program block's current-status value to the standard “待复核” form. On a stale page, A/B describes evidence as of `last_verified`, not current confirmation.
- Preserve original currencies and statutory formulas. Do not invent a converted lowest price.
- Explain old rule, new rule, effective date, authority, and uncertainty when a material rule changed.
- Append material changes to the program page's policy timeline. Keep the current snapshot in the standard fields; never leave an obsolete rule there merely to preserve history, and never silently erase the former rule from an existing timeline.
- Add material closures, reopenings, threshold changes, or category changes to `CHANGELOG.md`.
- If a policy content page is added, removed, or moved, update every affected category or country index and regenerate navigation with `node scripts/generate-site-config.mjs`.

Do not edit generated `mkdocs.yml` by hand.

## Validate and hand off

Choose checks for the affected behavior:

- Content/schema: `node scripts/validate-repo.mjs`.
- Status/date transitions: `node scripts/audit-freshness.mjs --check-public-status`.
- Navigation: `node scripts/generate-site-config.mjs --check`.
- Rendering or publication: `node scripts/run-mkdocs.mjs build --strict --site-dir .site`.

For a release or cross-cutting change, run the full set after final edits. For instruction-only edits, check changed Skills and references. Fix in-scope failures and rerun affected checks until passed.

Run the active Codex `skill-creator` validator as well when this skill itself changes. Locate the validator in that installation rather than storing a machine-specific absolute path in the repository.

In the handoff, list reviewed pages, material changes, official sources, unresolved conflicts, whether verification dates changed, and validation results. Separate verified facts from pending research.

If a validation failure existed before the edit and is outside scope, do not claim a green result or silently repair it. Report the exact baseline and final failure and which changed files were independently checked. If dependencies are unavailable, report the skipped build instead of substituting a weaker command.

For push, publication, merge, release, or GitHub issue changes, reuse authorization covering that action and target; ask once if it is missing. A local build does not create authorization by itself.
