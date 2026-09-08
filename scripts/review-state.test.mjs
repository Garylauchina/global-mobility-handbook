import assert from "node:assert/strict";
import test from "node:test";
import {
  addCalendarMonth,
  dateInTimeZone,
  hasPageReviewDeclaration,
  homepageReviewLabels,
  monthlyReviewIsDue,
  parseIsoDate,
  validateReviewState,
} from "./review-state.mjs";

const policyPath = "investment-residence/example/README.md";
const secondPolicyPath = "study-student-residence/example/university/README.md";

function fixture() {
  return {
    state: {
      cadence: "monthly",
      last_full_review: "2026-09-02",
      page_reviews: { [policyPath]: "2026-09-02" },
    },
    options: {
      leafPaths: [policyPath],
      asOf: "2026-09-09",
      homepages: Object.fromEntries(Object.entries(homepageReviewLabels)
        .map(([file, label]) => [file, `${label} 2026-09-02\n`])),
    },
  };
}

test("calendar month clamps January 31 to February, including leap years", () => {
  assert.equal(addCalendarMonth("2026-01-31"), "2026-02-28");
  assert.equal(addCalendarMonth("2028-01-31"), "2028-02-29");
  assert.equal(addCalendarMonth("2100-01-31"), "2100-02-28");
  assert.equal(addCalendarMonth("2000-01-31"), "2000-02-29");
});

test("calendar month keeps the day when possible and rolls across years", () => {
  assert.equal(addCalendarMonth("2026-09-02"), "2026-10-02");
  assert.equal(addCalendarMonth("2026-03-31"), "2026-04-30");
  assert.equal(addCalendarMonth("2028-02-29"), "2028-03-29");
  assert.equal(addCalendarMonth("2026-12-31"), "2027-01-31");
});

test("rejects nonexistent dates instead of accepting Date normalization", () => {
  for (const value of ["2026-02-29", "2026-04-31", "2026-13-01", "2026-2-01", "2026-09-02junk", null, 20260902]) {
    assert.throws(() => parseIsoDate(value), /YYYY-MM-DD|valid date/);
  }
  assert.equal(parseIsoDate("2028-02-29").toISOString(), "2028-02-29T00:00:00.000Z");
});

test("review day uses the Shanghai date across the UTC midnight boundary", () => {
  assert.equal(dateInTimeZone(new Date("2026-09-08T16:00:00Z")), "2026-09-09");
  assert.equal(dateInTimeZone(new Date("2026-09-08T15:59:59Z")), "2026-09-08");
});

test("all statuses use a calendar month and are due on the boundary", () => {
  for (const status of ["current", "candidate-unverified", "archived-or-unverified"]) {
    assert.equal(monthlyReviewIsDue("2026-01-31", "2026-02-27", status), false);
    assert.equal(monthlyReviewIsDue("2026-01-31", "2026-02-28", status), true);
    assert.equal(monthlyReviewIsDue("2026-09-02", "2026-10-01", status), false);
    assert.equal(monthlyReviewIsDue("2026-09-02", "2026-10-02", status), true);
  }
  assert.equal(monthlyReviewIsDue("2028-01-31", "2028-02-28", "current"), false);
  assert.equal(monthlyReviewIsDue("2028-01-31", "2028-02-29", "current"), true);
});

test("a stale page stays in the queue even before its date-based deadline", () => {
  assert.equal(monthlyReviewIsDue("2026-09-02", "2026-09-09", "stale"), true);
});

test("rejects Markdown and prose declarations of page verification dates", () => {
  for (const declaration of [
    "- **本站核验：** 2026-09-02（证据 A）",
    "- **本条核验日期：** 2026-09-02",
    "- **核验日期：** 2026-09-02",
    "> **复核警示：** 以下内容最后核验于 2026-09-02；尚待复核。",
    "- **Last verified:** `2026-09-02`",
    "last_verified: 2026-09-02",
    "review_interval_days: 30",
  ]) {
    assert.equal(hasPageReviewDeclaration(declaration), true, declaration);
  }
});

test("keeps official publication, effective, and event dates intact", () => {
  for (const content of [
    "- **事件证据：** 主管机关于 2026-09-02 发布公告，2026-10-01 生效。",
    "- **事件生效日：** 2026-09-02；不是本站更新日期。",
    "- **关键限制与变化：** 2026 年 AEIS 申请截至核验日已经关闭，考试安排为 2026-09-01 至 2026-09-03。",
    "> **复核警示：** 本页尚未完成本轮月度复核；在完成主管机关复核前，不应视为当前开放规则。",
  ]) {
    assert.equal(hasPageReviewDeclaration(content), false, content);
  }
});

test("accepts a complete registry and both matching homepage declarations", () => {
  const { state, options } = fixture();
  assert.equal(validateReviewState(state, options), state);
});

test("a partial newer page review does not require advancing the full baseline", () => {
  const { state, options } = fixture();
  state.page_reviews[secondPolicyPath] = "2026-09-08";
  options.leafPaths.push(secondPolicyPath);
  assert.equal(validateReviewState(state, options), state);
});

test("rejects missing and extra policy registrations, including route leaves", () => {
  const { state, options } = fixture();
  options.leafPaths.push(secondPolicyPath);
  assert.throws(() => validateReviewState(state, options), /mismatch; missing: study-student-residence/);
  state.page_reviews[secondPolicyPath] = "2026-09-02";
  state.page_reviews["study-student-residence/example/README.md"] = "2026-09-02";
  assert.throws(() => validateReviewState(state, options), /extra: study-student-residence\/example\/README.md/);
});

test("rejects empty or duplicate leaf enumeration", () => {
  const { state, options } = fixture();
  for (const leafPaths of [[], [policyPath, policyPath]]) {
    assert.throws(() => validateReviewState(state, { ...options, leafPaths }), /unique policy leaf list/);
  }
});

test("rejects old interval policy, unknown fields, and invalid record containers", () => {
  const { state, options } = fixture();
  assert.throws(() => validateReviewState({ ...state, cadence: "90days" }, options), /cadence must be monthly/);
  assert.throws(() => validateReviewState({ ...state, review_interval_days: 30 }, options), /must contain only/);
  assert.throws(() => validateReviewState({ ...state, page_reviews: [] }, options), /page_reviews must be an object/);
  assert.throws(() => validateReviewState(null, options), /must be an object/);
});

test("rejects invalid and future central page dates", () => {
  const { state, options } = fixture();
  state.page_reviews[policyPath] = "2026-09-31";
  assert.throws(() => validateReviewState(state, options), /not a valid date/);
  state.page_reviews[policyPath] = "2026-09-10";
  assert.throws(() => validateReviewState(state, options), /Future review date/);
});

test("rejects invalid and future full-review baseline", () => {
  const { state, options } = fixture();
  assert.throws(() => validateReviewState({ ...state, last_full_review: "2026-02-29" }, options), /not a valid date/);
  assert.throws(() => validateReviewState({ ...state, last_full_review: "2026-09-10" }, options), /Future last_full_review/);
});

test("full-review baseline cannot move beyond any page's actual review", () => {
  const { state, options } = fixture();
  state.last_full_review = "2026-09-08";
  assert.throws(() => validateReviewState(state, options), /last_full_review 2026-09-08 exceeds page review 2026-09-02/);
});

test("rejects missing, duplicate, or inconsistent dates on either homepage", () => {
  for (const homepage of Object.keys(homepageReviewLabels)) {
    for (const variant of ["missing", "duplicate", "mismatch"]) {
      const { state, options } = fixture();
      if (variant === "missing") options.homepages[homepage] = "# Handbook\n";
      if (variant === "duplicate") options.homepages[homepage] += options.homepages[homepage];
      if (variant === "mismatch") options.homepages[homepage] = options.homepages[homepage].replace("2026-09-02", "2026-09-09");
      assert.throws(() => validateReviewState(state, options), /must declare exactly once/);
    }
  }
});
