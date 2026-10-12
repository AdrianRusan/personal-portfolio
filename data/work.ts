// The headline number per case study, for the /work index. Keyed by MDX slug
// so content/work stays untouched; a study without an entry shows no figure.
// Each figure is quoted from its own MDX (checked in __tests__/work-index).
export const caseStudyResults: Record<
  string,
  { figure: string; label: string }
> = {
  "30-reviewed-prs-3-vulnerabilities": {
    figure: "3",
    // #98: the October re-audit found 5 security misses; the label points at them.
    label: "shell-injection paths from request input caught in review. The study lists the 5 security bugs it missed.",
  },
  "honesty-gate": {
    // A2 F13: the outcome, not the input size.
    figure: "0",
    label: 'the true count behind a landing-page line labelled "real number". The gate keeps lines like it off the page.',
  },
  "nine-prs-one-afternoon": {
    figure: "9",
    label: "reviewed PRs merged in 100 minutes, each through typecheck, lint, build and tests first",
  },
  "agent-cost-per-commit": {
    // R3-F15: a number like the other two; the rebound stays in the label.
    figure: "57%",
    label: "lower cost per merged PR in one month, then it rose 42% by early October",
  },
};

// #54 R2: display order on /work and the homepage cards. Unlisted studies
// follow, newest first (getPosts' order).
// F11: the core-offer proof leads.
const CASE_STUDY_ORDER = [
  "30-reviewed-prs-3-vulnerabilities",
  "honesty-gate",
  "nine-prs-one-afternoon",
  "agent-cost-per-commit",
];
export function byCaseStudyOrder<T extends { slug: string }>(studies: T[]) {
  const rank = (slug: string) => {
    const i = CASE_STUDY_ORDER.indexOf(slug);
    return i === -1 ? CASE_STUDY_ORDER.length : i;
  };
  return [...studies].sort((a, b) => rank(a.slug) - rank(b.slug));
}

// The /work index description: page meta and its Markdown (#64).
export const WORK_DESCRIPTION =
  "Case studies from documented runs: what broke, what I built, the number it moved, and what it taught me about shipping with AI agents.";
