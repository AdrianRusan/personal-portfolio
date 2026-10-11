// event slug must exist in Calendly (active "Scoping Call" event, slug "new-meeting")
export const CALENDLY_URL = "https://calendly.com/adrian-rusan/new-meeting";

// Async intake inbox for offers that don't require a call.
export const CONTACT_EMAIL = "contact@adrian-rusan.com";

// Paid 1:1 advice call (€200). null until Adi creates the paid Calendly event
// (ADI-3); set it and every €200 CTA switches from email to booking, label too.
export const STRATEGY_CALL_CALENDLY_URL: string | null = null;
export const STRATEGY_CALL_URL =
  STRATEGY_CALL_CALENDLY_URL ??
  `mailto:${CONTACT_EMAIL}?subject=AI%20Strategy%20Call%20(%E2%82%AC200)`;
export const STRATEGY_CALL_CTA = STRATEGY_CALL_CALENDLY_URL
  ? "Book the €200 call"
  : "Email me to book the €200 call";

// Redacted sample of the sprint's Security Report (ADI-6), from my own 30-PR
// run. Set to null to hide every "See a sample report" link.
export const SAMPLE_REPORT_URL: string | null =
  "/sample-sprint-security-report.pdf";

// YouTube channel id (starts with "UC"). One value drives every YouTube
// surface: null hides the Bio/schema links and keeps the Latest block blog-only.
export const YOUTUBE_CHANNEL_ID: string | null = null;
export const YOUTUBE_URL = YOUTUBE_CHANNEL_ID
  ? `https://www.youtube.com/channel/${YOUTUBE_CHANNEL_ID}`
  : null;

// Current client, named with consent (A2: listed as a client engagement under
// the PFA, LinkedIn-level detail only). Every mention on the site (EN, RO,
// Person JSON-LD) reads this one constant.
export const FINTECH_EMPLOYER = "Bono Fintech";

// Tier credit window (#43 follow-up: the credit had no window). Every credit
// mention derives from these two, so the page and FAQPage JSON-LD agree.
export const CREDIT_DAYS = 30;
export const CREDIT_TERMS = `Move up a tier within ${CREDIT_DAYS} days and what you already paid counts toward it.`;

// The one set of workflow numbers (brief #54 R1). Single source: the 66-day
// post (content/blog/66-days-of-claude-code-by-the-numbers.mdx), counted by a
// script over Adi's own session logs. Every page derives from this constant.
// PRs = `gh pr create` calls, an upper bound on PRs opened, not merges.
// No client or repo names (R1).
export const WORKFLOW_NUMBERS = {
  sessions: 463,
  hours: 335,
  commits: 4920,
  prsOpened: 928,
  days: 66,
} as const;

const n = (v: number) => v.toLocaleString("en-US");
export const LEDGER_PROOF = `${WORKFLOW_NUMBERS.sessions} sessions · ${WORKFLOW_NUMBERS.hours} hours · ${n(WORKFLOW_NUMBERS.commits)} commits · ${WORKFLOW_NUMBERS.prsOpened} PRs opened (upper bound, not all merged) — ${WORKFLOW_NUMBERS.days} days, 6 Aug–10 Oct 2026, counted from my own session logs.`;

// The one capacity line (Offers, the ladder, /about).
export const CAPACITY =
  "The review layer is one senior human, so I run one sprint or retainer at a time.";

// Single risk-reversal guarantee, reused verbatim at every money CTA.
export const GUARANTEE =
  "If the first reviewed PR isn't merge-ready to your standard, you don't pay for it.";

// --- Ship / Verify homepage content ---

// Three buyer-facing stats (P2). The workflow ledger lives on /about only.
export const proofStats = [
  { figure: "30", label: "PRs reviewed in under 3 days" },
  {
    figure: "3",
    // Canonical facts: goals/2026-10-11-30pr-canonical-facts.md. The repo had
    // no tests or CI, so the stat makes no claim about tests.
    label: "injection paths caught before merge",
  },
  { figure: "10+ yrs", label: "in production" },
];

export const shipVerify = [
  {
    tag: "SHIP",
    label: "Ship",
    heading: "The agents write the volume",
    body: "Several Claude Code agents run in parallel git worktrees. Each one gets a ticket and follows your CLAUDE.md conventions. That is where the 2–3x comes from: a small team's throughput from one operator and a harness.",
  },
  {
    // tag is the styling key; label is what the page shows (RO overrides it).
    tag: "VERIFY",
    label: "Verify",
    heading: "I review every PR",
    body: "Every agent PR gets a line-by-line adversarial review before it reaches you. Security comes first: injection, auth, secrets and access control. Then correctness and scope. I assume the agent got it wrong until the code shows otherwise.",
  },
];

// "How a call works": what happens after someone clicks a booking CTA.
export const callSteps = [
  {
    heading: "Pick a 30-minute slot",
    body: "Book on Calendly and add one line on what you want built or shipped. No deck, no prep.",
  },
  {
    heading: "We look at the real work",
    body: "We look at your backlog, your repo or your AI question. I tell you which tier fits and what it costs, or that it isn't a fit.",
  },
  {
    heading: "You get it in writing",
    body: "Within one working day: the scope, the fixed price and a start date, by email. You decide. Nobody chases you.",
  },
];

// Objection-handling FAQ. One source for the visible FAQ (/ and /services) and
// the /services FAQPage JSON-LD, so the schema can't drift from the page.
export const faqs: { question: string; answer: string }[] = [
  {
    question: "How is the quality any good if AI agents wrote it?",
    answer:
      "The agent writes a draft. I decide what merges. Every PR goes through a line-by-line senior review that assumes the agent got it wrong until it's proven right. Agents give you 2–3x throughput, not 100x, and they get specific things wrong. The review is where those get caught, and every sprint ships you a log of what got caught in your codebase.",
  },
  {
    question: "What if the agents get it wrong, or can't do the ticket?",
    answer:
      "Then I fix it or write it myself. The agents are how the draft gets written; the price covers the reviewed result. A failed agent run costs me time, not you money, and nothing reaches you until it passes review.",
  },
  {
    question:
      "Unsupervised agents ship vulnerabilities. How do you handle security?",
    answer:
      "Correct, they do. Security is the first pass of every review: injection, auth, secrets, access control. On my own 30-PR run, a repo with no test suite, the review caught 3 shell-injection paths from request input before merge. The guarantee is in writing: an in-scope vulnerability found in a PR I marked reviewed gets fixed free.",
  },
  {
    question: "Who owns the code? Will you sign an NDA?",
    answer:
      "You own everything from the first commit: your repo, your branches, your IP. I sign your NDA or DPA before I get repo access, work happens in your repository under your access controls, and access is revoked at handoff unless you're on a retainer.",
  },
  {
    question: "What happens to our data and code with the AI tools?",
    answer:
      "Which AI tools touch your code is agreed in writing before access. If your policy rules a tool or provider out, it doesn't run on your repo. Your code is never reused in another client's work or published anywhere.",
  },
  {
    question: "What timezone do you work in?",
    answer:
      "Romania (EET/EEST, UTC+2/+3). That's a full overlap with European working hours and the morning of US East Coast teams. Day to day runs async in writing: you get the PRs, the review notes and a short written update, so nobody waits on a meeting.",
  },
  {
    question: "How do payment terms work?",
    answer: `Every price is fixed before work starts, in EUR, excluding VAT. The strategy call is paid up front. Sprints are 50% to book the slot and 50% on handoff. The Reviewed PR is paid only if it's merge-ready to your standard. Retainers bill monthly. ${CREDIT_TERMS}`,
  },
  {
    question: "What if it doesn't work out?",
    answer:
      "If the first reviewed PR isn't merge-ready to your standard, you don't pay for it. Your risk is highest before I've shipped anything, so the guarantee sits there. Scope is fixed on day 0, so there's no runaway bill. On a retainer, if month 1 misses the pace we agreed, you can stop there.",
  },
  {
    question: "Can you work as a normal contractor by the day?",
    answer:
      "Ongoing capacity is the retainer, from €4,000/month. It isn't the recommended way in: a sprint sells a reviewed outcome at a price agreed up front, which is a better deal than buying time. Start with one Reviewed PR if you want to test the working relationship first.",
  },
  {
    question: "Why not hire an agency, or more engineers?",
    answer:
      "An agency sells a team's hours with a markup, and new headcount takes months to hire and ramp. Here the first reviewed PR lands within days, from one senior engineer running several Claude Code agents: no coordination overhead and no junior work billed at senior rates. Agencies using agents rarely put a senior adversarial review on top. Here that review is the product.",
  },
  // C16 (F12): the four objections the call kept raising. Appended, so the
  // homepage picks by index (HOME_FAQ_PICKS) stay the same.
  {
    question: "Which stacks and languages do you review?",
    answer:
      "TypeScript and JavaScript end to end: Node, Nest.js, React, Next.js, Tailwind, SQL and MongoDB. That's where 10+ years of production work went. The security pass (injection, auth, secrets, access control) applies to any language, but if your stack is outside that list I say so on the call instead of learning on your money.",
  },
  {
    question: "Who pays for the LLM and API usage?",
    answer:
      "I do. LLM/API usage is included in the fixed price for sprints and reviewed PRs. No token bill arrives on top. Agent Fleet Setup is the exception: it runs on your team's own Claude Code licences, because the harness stays with you.",
  },
  {
    question: "What counts as one PR?",
    answer:
      "One ticket from your backlog, shipped as one reviewable pull request: a bug fix, a small feature or a slice of a bigger one. A ticket too big to review well in one pass gets split on the scope call, before the price is fixed, so you know the PR count up front.",
  },
  {
    question: "Who invoices, and in which currency?",
    answer:
      "Invoiced in EUR by my Romanian company; USD on request. The price on the invoice is the fixed price agreed before work started.",
  },
];

// Homepage FAQ (#54 R3): five /services questions picked by index, so RO
// (same order, data/ro-services.ts) picks the same ones, plus the call steps
// folded into one answer, last because the closing CTA follows. P2: the
// "doesn't work out" answer (7) repeats the hero guarantee, so 9 replaces it.
const HOME_FAQ_PICKS = [0, 2, 3, 6, 9];
export const homeFaq = (
  items: { question: string; answer: string }[],
  call: { question: string; steps: { body: string }[] },
) => [
  ...HOME_FAQ_PICKS.map((i) => items[i]!),
  { question: call.question, answer: call.steps.map((s) => s.body).join(" ") },
];
export const HOME_FAQ_HEADING = "Questions CTOs ask";
export const homeFaqs = homeFaq(faqs, {
  question: "What happens after I book a call?",
  steps: callSteps,
});

export const faqPageJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
});

export const whoFor = {
  forList: [
    "You lead engineering, founded the company or own delivery at a funded startup or scaleup, especially where security review is non-negotiable: fintech, health, payments, anything handling money or PII.",
    "You're drowning in backlog and can't hire your way out fast enough.",
    "You want agent-speed throughput but need a senior human accountable for what merges.",
    "You want the multiplier measured on real work.",
    "You run a small team and want AI automation without hiring.",
  ],
  notForList: [
    "You're shopping purely on hourly rate. The review layer is the value you'd be pricing out.",
    'You want to hear "100x" and don\'t care who reviews the code.',
    "You need a staff-aug seat with a badge and standups. I sell reviewed PRs at a fixed price.",
    "You're pre-idea with no scope to fix a price against.",
  ],
};

export const testimonials = [
  {
    quote:
      "I am very pleased with Adrian's efforts and progress on my project. I was informed on a daily basis about progress, and Adrian is very keen on delivering quality work. He made sure I was happy with the end result, I definitely recommend contacting Adrian if you are in need of any web related projects!",
    name: "Tim Claes",
    title: "Freelance mobile & web engineer",
    img: "https://utfs.io/a/23x7w9tiht/7iidzn1TwzukCJ59vIyXoxIjwOYaTyPZtGk0mVdeKgr9LH8h",
  },
];

// P2 (A2): the PFA is the umbrella; Bono is a client engagement under it, at
// LinkedIn level and no further (memory bono-contract-nda: no product detail
// or numbers).
export const workExperience: {
  id: number;
  title: string;
  company: string;
  period: string;
  desc: string;
  client?: string;
}[] = [
  {
    id: 1,
    title: "Independent engineer",
    company: "Rusan Adrian-Ionuț PFA",
    period: "Dec 2022 – Present",
    client: `Client: ${FINTECH_EMPLOYER}, founding engineer (contract), Sep 2024 – present. Built the core platform and AI internal tools; led a two-engineer squad.`,
    desc: "AI builds end to end: an LLM presentation platform and an agent-built SaaS run by a multi-session agent org.",
  },
  {
    id: 2,
    title: "Full-stack engineer",
    company: "GoSocial Development SRL",
    period: "Sep 2023 – Sep 2024",
    desc: "Built data parsers for multiple sources (-70% processing time), a Next.js/Nest.js Facebook Ads dashboard that removed 10 h/week of manual reporting, and Playwright E2E tests with GitHub Actions CI.",
  },
  {
    id: 3,
    title: "Full-stack engineer",
    company: "PGL Esports SRL",
    period: "Oct 2020 – Oct 2022",
    desc: "Built live overlay graphics and visualizations for PGL Major CS:GO streams with 2M+ concurrent viewers.",
  },
  {
    id: 4,
    title: "Frontend Developer",
    company: "Ipsos Interactive Services SRL",
    period: "Jun 2016 – Sep 2020",
    desc: "Delivered 300+ survey projects on time for enterprise research clients, and mentored three junior developers.",
  },
];

export const socialMedia = [
  {
    id: 1,
    img: "https://23x7w9tiht.ufs.sh/f/d0acc209-f51b-4737-bf8b-ea1e2d6c55a9-26z6.svg",
    url: "https://github.com/AdrianRusan",
    alt: "Adrian Rusan GitHub Profile",
  },
  {
    id: 2,
    img: "https://23x7w9tiht.ufs.sh/f/53382907-a497-4b6e-b3b9-92ce21e0be2b-24lbi.svg",
    url: "https://x.com/adrian_rusan",
    alt: "Adrian Rusan on X",
  },
  {
    id: 3,
    img: "https://23x7w9tiht.ufs.sh/f/5d83e728-2f46-4c99-b364-c7fc0ecefe77-1z75m.svg",
    url: "https://linkedin.com/in/adrian-rusan",
    alt: "Adrian Rusan LinkedIn Profile",
  },
];

// The /blog index description: page meta and its Markdown (#64).
export const BLOG_DESCRIPTION =
  "Field notes on shipping production software with a Claude Code agent fleet, and the senior review that catches what the agents miss.";
