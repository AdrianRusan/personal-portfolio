// The headline number per case study, for the /work index. Keyed by MDX slug
// so content/work stays untouched; a study without an entry shows no figure.
// Each figure is quoted from its own MDX (checked in __tests__/work-index).
export const caseStudyResults: Record<
  string,
  { figure: string; label: string }
> = {
  "30-reviewed-prs-3-vulnerabilities": {
    figure: "3",
    label: "shell-injection paths from request input, caught in review before merge",
  },
  "honesty-gate": {
    figure: "1,400",
    label: "strings per page traced to a source before anything publishes",
  },
  "agent-cost-per-commit": {
    // #54 R2: lead with the lesson; the 68% drop and its rebound are in the body.
    figure: "Weekly",
    label:
      "cost per commit, with the counting method written down. The one-off cut did not last; the measurement did.",
  },
};

// #54 R2: display order on /work and the homepage cards. Unlisted studies
// follow, newest first (getPosts' order).
// F11: the core-offer proof leads.
const CASE_STUDY_ORDER = [
  "30-reviewed-prs-3-vulnerabilities",
  "honesty-gate",
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
