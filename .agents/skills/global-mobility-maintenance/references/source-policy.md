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

- `A`: for a current page, current official or legal material directly supports the core conditions. On a stale page, A describes the last completed review, not confirmation that the source is still accessible or current.
- `B`: an official basis exists, but an operational detail, amount, implementation history, or source conflict remains material.
- `C`: only a credible secondary lead is available. Keep `status: "candidate-unverified"`, label the page as pending competent-authority confirmation, and do not present it as open.

Do not upgrade a grade merely because several secondary sources repeat the same assertion.

## Handle incomplete or conflicting evidence

Use the repository [update policy](../../../../UPDATE_POLICY.md) for status transitions, 30-day review records and standard warnings. A failed search or inaccessible source is an evidence gap, not positive evidence of closure.

If a previously authoritative URL is temporarily inaccessible, search for an official replacement first. If none is found, preserve the last authoritative URL, identify the access failure in the stale warning or change description, and do not replace it with a commercial link. Remove it only when an equally authoritative replacement or positive evidence makes the old source obsolete.

When official sources conflict, preserve the conflict, lower confidence if appropriate, and avoid choosing the more favorable rule. Record effective and transitional dates precisely.

## Preserve an auditable change

For material changes, retain enough context in the page or `CHANGELOG.md` to identify the former rule, new rule, official publication/effective dates, authority, source URL and evidence-grade change. Keep access and site review dates in central records or the commit/PR, following the update policy. Do not copy long source passages; summarize and link.

Follow the repository's [methodology](../../../../METHODOLOGY.md), [update policy](../../../../UPDATE_POLICY.md), [independence rules](../../../../INDEPENDENCE.md), and [disclaimer](../../../../DISCLAIMER.md).
