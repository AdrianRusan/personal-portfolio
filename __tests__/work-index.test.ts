/**
 * @jest-environment node
 */
import fs from "node:fs";
import path from "node:path";
import sitemap from "@/app/sitemap";
import { caseStudyResults } from "@/data/work";
import { WORK_DIR } from "@/lib/blog";

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
      expect(fs.readFileSync(file, "utf8")).toContain(figure);
    },
  );
});
