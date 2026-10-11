// Display labels for post tags. Slugs stay as-is in frontmatter and URLs;
// only names that sentence case gets wrong are listed.
const labels: Record<string, string> = {
  ai: "AI",
  "claude-code": "Claude Code",
  "claude-md": "CLAUDE.md",
  "llm-costs": "LLM costs",
  mdx: "MDX",
  typescript: "TypeScript",
};

export function tagLabel(tag: string): string {
  if (labels[tag]) return labels[tag];
  const words = tag.replace(/-/g, " ");
  return words.charAt(0).toUpperCase() + words.slice(1);
}
