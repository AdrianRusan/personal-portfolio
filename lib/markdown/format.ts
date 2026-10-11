import { SITE_URL } from "@/lib/page-schema";

// Shared pieces of every Markdown response (#64 R1).

export const MARKDOWN_HEADERS = {
  "Content-Type": "text/markdown; charset=utf-8",
  Vary: "Accept",
};

export const blocks = (...parts: (string | false | undefined)[]) =>
  parts.filter(Boolean).join("\n\n");

export const list = (items: string[]) => items.map((i) => `- ${i}`).join("\n");

const FOOTER = `---

More for agents: [llms.txt](${SITE_URL}/llms.txt) · [sitemap.xml](${SITE_URL}/sitemap.xml)`;

// Site-relative links ("](/x" and "](#x") become absolute, so the Markdown
// still works once it has left the site.
// Code fences (odd segments of a split on ```) are left as written.
export const finish = (path: string, body: string) =>
  `${blocks(body, FOOTER)}\n`
    .split("```")
    .map((part, i) =>
      i % 2
        ? part
        : part
            .replace(/\]\(\//g, `](${SITE_URL}/`)
            .replace(/\]\(#/g, `](${SITE_URL}${path === "/" ? "" : path}#`),
    )
    .join("```");

export const notFoundMarkdown = (path: string) =>
  finish(
    path,
    blocks(
      "# 404: page not found",
      `There is no page at \`${path.replace(/[^\w\-./~%]/g, "")}\` on adrian-rusan.com. It may have moved, or the link may be mistyped.`,
      "Every page is listed in the sitemap, and llms.txt describes the site for agents: what Adrian Rusan offers, the prices and how to book.",
    ),
  );
