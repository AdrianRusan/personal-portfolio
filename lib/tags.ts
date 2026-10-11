// Display labels for post tags. Slugs stay as-is in frontmatter and URLs;
// only names that sentence case gets wrong are listed.
const labels: Record<string, string> = {
  ai: "AI",
  "claude-code": "Claude Code",
  "claude-md": "CLAUDE.md",
  "llm-costs": "Cost",
  mdx: "MDX",
  typescript: "TypeScript",
};

export function tagLabel(tag: string): string {
  if (labels[tag]) return labels[tag];
  const words = tag.replace(/-/g, " ");
  return words.charAt(0).toUpperCase() + words.slice(1);
}

// R3-F24: the /blog index filters on these four only, in this order. A tag
// linked from a post (?tag=ai) still filters and gets its own chip.
const FILTER_TAGS = ["claude-code", "code-review", "security", "llm-costs"];

export function filterTags(allTags: string[], activeTag?: string): string[] {
  const tags = FILTER_TAGS.filter((t) => allTags.includes(t));
  return activeTag && allTags.includes(activeTag) && !tags.includes(activeTag)
    ? [...tags, activeTag]
    : tags;
}
