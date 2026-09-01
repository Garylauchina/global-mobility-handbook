# AI benchmark and policy timeline

Read this reference for an AI benchmark, parallel batch review, or a material policy change that needs an auditable timeline.

## Benchmark design

- State whether the run is a sample or a full-library review. Never describe a sample as a full re-verification.
- Select a bounded, reproducible set that covers different route types, regions, evidence grades, review intervals, active and warning states, dynamic formulas, and known recent-change cases.
- Give each page an independent first pass, then a blind review by a different reviewer. Do not expose the first verdict to the second reviewer.
- Require both reviewers to check the complete core field set in `review-checklist.md`, including source dates, announced dates, effective dates, transitional rules, quotas, nationality limits, and official-source conflicts.
- Use one result label per page: `verified-no-change`, `material-change-detected`, `future-change-announced`, or `evidence-incomplete`. A page may have both a material current change and a future announcement in its narrative, but select the label that drives the immediate maintenance action.
- Adjudicate disagreements against the underlying official sources. If a core field cannot be positively re-established, use `evidence-incomplete` and do not advance `last_verified`.
- Report wall-clock time separately from aggregate reviewer time. Also record approximate research batches or source opens so later runs can compare like with like. AI speed is an efficiency measurement, not evidence quality.
- Screenshots of official pages are optional evidence artifacts, not a default requirement. Unless the user asks to preserve them, keep claim-matched URLs, document titles, publication/effective dates, access date, and relevant article or section instead; do not commit downloaded source files.

## Timeline model

The standard program fields are the current snapshot. A timeline records material changes without making readers reconstruct today's rule from history.

- Start systematic forward recording from 2026-09-02. Earlier events may be added selectively when an official primary source is available; do not imply a complete historical record.
- Append events for closures, reopenings, threshold or eligibility changes, new statutory routes, duration or residence changes, material work/family/tax treatment changes, and officially announced future changes.
- Do not append an event for wording-only edits or a completed review that found no material change.
- For an effective change, update the current snapshot and append the event. For a future change, keep the current snapshot, add a visible future warning, and append the announcement. For a repository correction, label it as a correction rather than pretending it was a policy event.
- Record the official announcement or publication date, effective date, old rule, new rule, transitional treatment, official source, site verification date, and evidence grade when those facts are available. Use `未公开` or `不适用` instead of inventing a date or transition.
- Never overwrite an earlier event. If later official material corrects it, append a correction event and link both sources.

Use labels that do not duplicate the validator's standard program-field labels. A compact page pattern is:

```markdown
## 政策时间线

> 本时间线自 2026-09-02 起前向记录；仅在有官方一手证据时选择性补录此前事件，不保证覆盖完整历史。

### YYYY-MM-DD — 简短事件名

- **公布与生效：** 公布于……；生效于……
- **变化摘要：** 旧规则……；新规则……
- **过渡安排：** ……
- **官方依据：** [主管机关或公报](https://example.gov/)
- **本站核验：** YYYY-MM-DD（证据 A/B）
```
