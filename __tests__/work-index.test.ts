/**
 * @jest-environment node
 */
import fs from "node:fs";
import path from "node:path";
import sitemap from "@/app/sitemap";
import { byCaseStudyOrder, caseStudyResults } from "@/data/work";
import { getPosts, WORK_DIR } from "@/lib/blog";

describe("/work index", () => {
  it("is in the sitemap", async () => {
    const urls = (await sitemap()).map((e) => e.url);
    expect(urls).toContain("https://www.adrian-rusan.com/work");
  });

  // R2: every headline number must appear in the case study it summarises.
  it.each(Object.entries(caseStudyResults))(
    "%s: the figure is stated in its MDX",
    (slug, { figure }) => {
      const file = path.join(WORK_DIR, `${slug}.mdx`);
      if (!fs.existsSync(file)) return; // study not merged on this branch yet
      // Body only (frontmatter dates hold digits), and not part of a longer number.
      const body = fs.readFileSync(file, "utf8").replace(/^---[\s\S]*?---/, "");
      const escaped = figure.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      expect(body).toMatch(new RegExp(`(^|[^\\d,])${escaped}(?![\\d,]\\d)`));
    },
  );

  // #54 R2: honesty-gate leads, then the cost study; the nine-PR study is unpublished.
  it("orders the published studies", async () => {
    const slugs = byCaseStudyOrder(await getPosts(WORK_DIR)).map((p) => p.slug);
    expect(slugs.slice(0, 2)).toEqual(["honesty-gate", "agent-cost-per-commit"]);
    expect(slugs).not.toContain("nine-prs-one-afternoon");
  });
});
