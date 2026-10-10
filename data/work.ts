// The headline number per case study, for the /work index. Keyed by MDX slug
// so content/work stays untouched; a study without an entry shows no figure.
// Each figure is quoted from its own MDX (checked in __tests__/work-index).
export const caseStudyResults: Record<
  string,
  { figure: string; label: string }
> = {
  "honesty-gate": {
    figure: "1,400",
    label: "strings per page traced to a source before anything publishes",
  },
  "agent-cost-per-commit": {
    figure: "68%",
    label: "lower agent cost per commit, July to August, before it came back",
  },
  "nine-prs-one-afternoon": {
    figure: "100 minutes",
    label: "for nine reviewed PRs from parallel agents",
  },
};
