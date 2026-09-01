# Source and decision policy

Read this file before changing a program fact, source, status, category, threshold, eligibility rule, or evidence grade.

## Match evidence to claims

Use the narrowest authoritative source that actually supports the claim:

1. legislation, regulations, gazettes, and competent-authority rules;
2. immigration authority, ministry, consulate, or official program portal;
3. official news release or FAQ when primary rules do not expose the operational detail;
4. high-quality professional or cross-country indexes only for discovery or an explicitly C-grade lead.

A source being governmental does not make it relevant to every field. Confirm that the cited page supports the program name, current intake state, threshold, duration, residence conditions, work rights, dependants, and long-term path that the handbook states. Use more than one official source when no single page supports the core set.

Never use an intermediary, developer, fund seller, law firm, news article, search snippet, or AI summary as the sole support for an open program or a material benefit.

## Grade evidence

- `A`: for a current page, current official or legal material directly supports the core conditions. On a stale page, A records the grade reached on `last_verified`; it is not a claim that the source is still accessible or current.
- `B`: an official basis exists, but an operational detail, amount, implementation history, or source conflict remains material.
- `C`: only a credible secondary lead is available. Keep `status: "candidate-unverified"`, label the page as pending competent-authority confirmation, and do not present it as open.

Do not upgrade a grade merely because several secondary sources repeat the same assertion.

## Decide status conservatively

- `current`: a recognizable current legal or operational route is supported by A- or B-grade evidence.
- `stale`: the page was previously current but exceeded its review interval. Preserve the last grade and date as historical verification metadata, display “待复核”, and do not describe the status only as open.
- `candidate-unverified`: a plausible program lead lacks sufficient current competent-authority support; evidence must remain C.
- `archived-or-unverified`: the page belongs in the warning archive because it is closed, paused, replaced, transitional only, marketing-led, or too uncertain to present as current.

A 404, inaccessible portal, failed search, missing English page, or lack of recent news does not prove closure. Keep the previous state and report the evidence gap unless there is positive support for a transition.

When a due `current` page cannot be fully reverified, change only its presentation state to `stale`; do not fabricate a new verification date. Restore `current` only after a complete review, or move the page to the warning archive when positive evidence supports that transition. A stale transition is a review-state change, not a confirmed policy change: describe it in the commit or PR, but do not add it to `CHANGELOG.md` unless an underlying material rule also changed.

If a previously authoritative URL is temporarily inaccessible, search for an official replacement first. If none is found, preserve the last authoritative URL, identify the access failure in the stale warning or change description, and do not replace it with a commercial link. Remove it only when an equally authoritative replacement or positive evidence makes the old source obsolete.

When official sources conflict, preserve the conflict, lower confidence if appropriate, and avoid choosing the more favorable rule. Record effective and transitional dates precisely.

## Apply verification dates

Change both frontmatter `last_verified` and the visible page verification date only when the core page has been checked against current sources. Use the actual calendar date of that review in `YYYY-MM-DD` form.

Do not refresh the date for:

- spelling, layout, navigation, or translation-only edits;
- replacing a link without verifying the underlying claims;
- reviewing only one minor field while leaving other core fields unchecked;
- a secondary-source alert that has not been confirmed.

## Preserve an auditable change

For material changes, retain enough context in the page or `CHANGELOG.md` to identify the former rule, new rule, effective date, authority, source URL, access date, and evidence-grade change. Do not copy long source passages; summarize and link.

Follow the repository's [methodology](../../../../METHODOLOGY.md), [update policy](../../../../UPDATE_POLICY.md), [independence rules](../../../../INDEPENDENCE.md), and [disclaimer](../../../../DISCLAIMER.md).
