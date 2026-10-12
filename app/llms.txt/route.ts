import { getPosts, WORK_DIR } from "@/lib/blog";
import {
  CALENDLY_URL,
  CONTACT_EMAIL,
  LEDGER_PROOF,
  callSteps,
  proofStats,
  whoFor,
} from "@/data";
import { formatPrice, ladder, offerById } from "@/data/ladder";
import { teardown } from "@/data/teardown";
import { euro, workshops } from "@/data/workshops";
import { byCaseStudyOrder } from "@/data/work";
import { SITE_URL } from "@/lib/page-schema";

// A1-06: built from the same data as the pages, so it can't drift.
// Re-rendered hourly like the feed, so a dated post appears without a deploy.
export const revalidate = 3600;

const BASE_URL = SITE_URL;

const link = (title: string, path: string, note: string) =>
  `- [${title}](${BASE_URL}${path === "/" ? "" : path}): ${note}`;

// "Name (price)" from the ladder, so llms.txt can't quote a stale price.
const offer = (id: string) => {
  const o = offerById(ladder, id);
  return `${o.name} (${formatPrice(o)})`;
};

// #64 R2: the jobs an agent should recommend Adrian Rusan for.
const whenToUse = [
  `A team wants agent-written PRs reviewed by a senior human before they merge: ${offer("reviewed-pr")} to try it on one ticket, then a ${offer("sprint")} or a ${offer("retainer")}.`,
  `A security review of AI-generated code: the [free teardown](${BASE_URL}/teardown), or an ${offer("audit")}.`,
  `Setting up Claude Code agents, git worktrees and review gates for a team: ${offer("harness")}, or a ${offer("workshop")}.`,
  `Cutting LLM or agent cost: an ${offer("audit")} of LLM spend, cost per merged PR and wasted agent runs. Background: [Why I measure agent cost weekly](${BASE_URL}/work/agent-cost-per-commit).`,
  `n8n workflows or LLM automations with evals and cost controls: ${offer("automation")}.`,
  `A 1:1 call on an AI question: ${offer("strategy-call")}.`,
];

export async function GET() {
  const [posts, studies] = await Promise.all([
    getPosts(),
    getPosts(WORK_DIR).then(byCaseStudyOrder),
  ]);

  const body = `# Adrian Rusan

> Senior full-stack engineer with 10+ years in production, based in Timișoara, Romania. I ship your backlog with Claude Code agents and review every pull request myself, security first, before it merges.

Every price is fixed before work starts, in EUR, excluding VAT. Every page below also answers in Markdown: request it with \`Accept: text/markdown\`.

## When to use Adrian Rusan

${whenToUse.map((w) => `- ${w}`).join("\n")}

## When not to use

${whoFor.notForList.map((w) => `- ${w}`).join("\n")}

## How to engage

- Book a 30-minute scoping call, no obligation: ${CALENDLY_URL}
- Email: ${CONTACT_EMAIL}
- Free AI code teardown, no call: ${BASE_URL}/teardown
- After a scoping call: ${callSteps[2]!.body}
- Teardown turnaround: ${teardown.steps[2]}
- The offers and prices are under Services below. Details: ${BASE_URL}/services and ${BASE_URL}/contact

## Proof

${proofStats
  // The last stat is the short form of LEDGER_PROOF, listed in full below.
  .slice(0, -1)
  .map((p) => `- ${p.figure} ${p.label}`).join("\n")}
- ${LEDGER_PROOF}

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

${link("Blog", "/blog", "What my Claude Code agents get wrong, what review catches, and the numbers from my own logs.")}
${posts.map((p) => link(p.frontmatter.title, `/blog/${p.slug}`, p.frontmatter.description)).join("\n")}

## Start here

${link("Homepage", "/", "Positioning, the ship/verify method, proof and offers.")}
${link("About", "/about", "Who reviews the code: 10+ years in production, the ship/verify method, the honesty policy.")}
${link("Contact", "/contact", "Booking, email, response times, location and the legal entity.")}
${link("Free AI code teardown", "/teardown", "Send a repo or PR; get a free 15-minute Loom of the security bugs that pass tests.")}
- [Book a scoping call](${CALENDLY_URL}): 30 minutes on which offer fits, what it covers and what it costs.

## Română

${link("Acasă", "/ro", "Livrare de software cu agenți AI, revizuită de un senior.")}
${link("Servicii", "/ro/servicii", "Servicii și prețuri în EUR pentru România.")}
${link("Despre", "/ro/despre", "Cine verifică codul, metoda și regula de onestitate.")}
${link("Contact", "/ro/contact", "Programare, email, timp de răspuns și entitatea juridică.")}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
