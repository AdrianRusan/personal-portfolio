import { getPosts, WORK_DIR } from "@/lib/blog";
import { CALENDLY_URL } from "@/data";
import { formatPrice, ladder } from "@/data/ladder";
import { euro, workshops } from "@/data/workshops";
import { byCaseStudyOrder } from "@/data/work";
import { SITE_URL } from "@/lib/page-schema";

// A1-06: built from the same data as the pages, so it can't drift.
// Re-rendered hourly like the feed, so a dated post appears without a deploy.
export const revalidate = 3600;

const BASE_URL = SITE_URL;

const link = (title: string, path: string, note: string) =>
  `- [${title}](${BASE_URL}${path === "/" ? "" : path}): ${note}`;

export async function GET() {
  const [posts, studies] = await Promise.all([
    getPosts(),
    getPosts(WORK_DIR).then(byCaseStudyOrder),
  ]);

  const body = `# Adrian Rusan

> Senior software engineer offering agent-accelerated delivery, reviewed: a fleet of Claude Code agents ships the backlog, and a senior engineer security-reviews every pull request before it merges.

Every price is fixed before work starts, in EUR, excluding VAT.

## Services

${ladder.map((o) => link(o.name, "/services", `${formatPrice(o)}. ${o.summary}`)).join("\n")}

## Workshops

${Object.values(workshops)
  .map((w) =>
    link(w.title, `/workshops/${w.slug}`, `${euro(w.price)}. ${w.description}`),
  )
  .join("\n")}

## Case studies

${link("All case studies", "/work", "Documented runs: what broke, what I built, the number it moved.")}
${studies.map((s) => link(s.frontmatter.title, `/work/${s.slug}`, s.frontmatter.description)).join("\n")}

## Posts

${link("Blog", "/blog", "Field notes on shipping production software with Claude Code agents and senior review.")}
${posts.map((p) => link(p.frontmatter.title, `/blog/${p.slug}`, p.frontmatter.description)).join("\n")}

## Start here

${link("Homepage", "/", "Positioning, the ship/verify method, proof and offers.")}
${link("Free AI code teardown", "/teardown", "Send a repo or PR; get a free 15-minute Loom of the security bugs that pass tests.")}
- [Book a scoping call](${CALENDLY_URL}): 30 minutes on which offer fits, what it covers and what it costs.

## Română

${link("Acasă", "/ro", "Livrare de software cu agenți AI, revizuită de un senior.")}
${link("Servicii", "/ro/servicii", "Servicii și prețuri în EUR pentru România.")}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
