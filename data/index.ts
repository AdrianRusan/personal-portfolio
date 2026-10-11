// event slug must exist in Calendly (active "Scoping Call" event, slug "new-meeting")
export const CALENDLY_URL = "https://calendly.com/adrian-rusan/new-meeting";

// Async intake inbox for offers that don't require a call.
export const CONTACT_EMAIL = "contact@adrian-rusan.com";

// Paid 1:1 advice call (€200). Mailto until the paid Calendly event exists;
// swap to that event's URL once Adi creates it.
export const STRATEGY_CALL_URL = `mailto:${CONTACT_EMAIL}?subject=AI%20Strategy%20Call%20(%E2%82%AC200)`;

// YouTube channel id (starts with "UC"). One value drives every YouTube
// surface: null hides the Bio/schema links and keeps the Latest block blog-only.
export const YOUTUBE_CHANNEL_ID: string | null = null;
export const YOUTUBE_URL = YOUTUBE_CHANNEL_ID
  ? `https://www.youtube.com/channel/${YOUTUBE_CHANNEL_ID}`
  : null;

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

// Single risk-reversal guarantee, reused verbatim at every money CTA.
export const GUARANTEE =
  "If the first reviewed PR isn't merge-ready to your standard, you don't pay for it.";

export const navItems = [
  { name: "How it works", link: "#ship-verify" },
  { name: "Services", link: "#offers" },
  { name: "Work", link: "#work" },
  { name: "Blog", link: "/blog" },
];

// --- Ship / Verify homepage content ---

export const proofStats = [
  {
    figure: "30",
    label: "reviewed PRs · 9 agent batches · 2.5 days",
  },
  {
    figure: "3",
    label: "shell-injection vulnerabilities caught — that passed the tests",
  },
  {
    figure: "10+ yrs",
    label: "in production: Ipsos → PGL Esports → GoSocial → Bono Fintech",
  },
  {
    figure: `${WORKFLOW_NUMBERS.sessions}`,
    label: `sessions · ${WORKFLOW_NUMBERS.hours} h · ${WORKFLOW_NUMBERS.days} days`,
  },
];

export const shipVerify = [
  {
    tag: "SHIP",
    heading: "The agents write the volume",
    body: "Fleets of Claude Code agents run in parallel git worktrees, each dispatched a ticket and driven by your CLAUDE.md conventions. This is where the 2-3x comes from: a small team's throughput from one operator and a harness.",
  },
  {
    tag: "VERIFY",
    heading: "A senior human reviews every PR",
    body: "Every agent PR goes through a line-by-line adversarial review before it reaches you. Security first — injection, auth, secrets, access control — then correctness and scope. The assumption is the agent got it wrong until it's proven right. This is the part that's rare, and accountable.",
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
    body: "Your backlog, your repo or your AI question. I tell you which tier fits and what it costs, or that it isn't a fit.",
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
      "Because agent output is the draft, not the deliverable. Every PR goes through a line-by-line senior review that assumes the agent got it wrong until it's proven right. Agents give you 2-3x throughput, not 100x, and they get specific things wrong. The review is where those get caught, and every sprint ships you a log of what got caught in your codebase.",
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
      "Correct, they do. That's why this isn't a cheaper \"just run the agents\" service. Security is the first pass of every review: injection, auth, secrets, access control. The review has caught 3 shell-injection vulnerabilities the agents wrote that passed the automated tests. The guarantee is in writing: an in-scope vulnerability found in a PR I marked reviewed gets fixed free.",
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
      "An agency sells a team's hours with a markup, and new headcount takes months to hire and ramp. This sells reviewed outcomes in days, from one senior engineer running an agent fleet: no coordination overhead and no junior work billed at senior rates. Agencies using agents rarely put a senior adversarial review on top. Here that review is the product.",
  },
];

// Homepage FAQ (#54 R3): five /services questions picked by index, so RO
// (same order, data/ro-services.ts) picks the same ones, plus the call steps
// folded into one answer, last because the final CTA follows.
const HOME_FAQ_PICKS = [0, 2, 3, 6, 7];
export const homeFaq = (
  items: { question: string; answer: string }[],
  call: { question: string; steps: { body: string }[] },
) => [
  ...HOME_FAQ_PICKS.map((i) => items[i]!),
  { question: call.question, answer: call.steps.map((s) => s.body).join(" ") },
];
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
    "You lead engineering, found a company, or own delivery at a funded startup or scaleup — especially where a security review is non-negotiable: fintech, health, payments, anything handling money or PII.",
    "You're drowning in backlog and can't hire your way out fast enough.",
    "You want agent-speed throughput but need a senior human accountable for what merges.",
    "You'd rather hear the real multiplier than the flattering one.",
    "You run a small team and want AI automation without hiring.",
  ],
  notForList: [
    "You're shopping purely on hourly rate. The review layer is the value you'd be pricing out.",
    'You want to hear "100x" and don\'t care who reviews the code.',
    "You need a staff-aug seat with a badge and standups. This is outcome delivery, not headcount.",
    "You're pre-idea with no scope to fix a price against.",
  ],
};

export const techStackLeft = [
  "Next.js",
  "React.js",
  "Tailwind CSS",
  "TypeScript",
];

export const techStackRight = ["SQL", "REST API", "Node.js", "MongoDB"];

export const projects = [
  {
    id: 1,
    title: "ShopValue - Product Price Scrapper",
    description:
      "Elevate your shopping game with ShopValue. Track prices, spot trends and get the best deals from flip.ro.",
    img: "https://utfs.io/a/23x7w9tiht/302c56cd-01cb-4ea4-bf5d-33349de0a959-yg72dh.png",
    alt: "ShopValue image",
    iconLists: [
      "https://utfs.io/a/23x7w9tiht/89882599-3371-4fbc-b4f8-3825ce00e10b-2sz.svg",
      "https://utfs.io/a/23x7w9tiht/f4808e60-309b-4c54-97b3-86094cd55887-24500.svg",
      "https://utfs.io/a/23x7w9tiht/926347cb-afd7-4aef-b916-f491fe0b704f-2v3.svg",
      "https://utfs.io/a/23x7w9tiht/8ee0ad2e-2f9c-4436-8864-b97406507c85-2iv.svg",
    ],
    iconListsAlt: [
      "React icon",
      "Tailwind CSS icon",
      "TypeScript icon",
      "Framer Motion icon",
    ],
    // github: 'https://github.com/AdrianRusan/shop-value',
    link: "https://shop-value.vercel.app/",
  },
  {
    id: 2,
    title: "NextHub - Video Conferencing App",
    description:
      "Simplify your video conferencing experience with NextHub. Seamlessly connect with colleagues and friends.",
    img: "https://utfs.io/a/23x7w9tiht/9790aeb2-4bcd-47e7-b2a4-f085489d13d5-2pu.svg",
    alt: "NextHub image",
    iconLists: [
      "https://utfs.io/a/23x7w9tiht/488b9b22-8201-4f04-8ed8-00f38b137785-20eer.svg",
      "https://utfs.io/a/23x7w9tiht/f4808e60-309b-4c54-97b3-86094cd55887-24500.svg",
      "https://utfs.io/a/23x7w9tiht/926347cb-afd7-4aef-b916-f491fe0b704f-2v3.svg",
      "https://utfs.io/a/23x7w9tiht/99f9d107-5657-42a9-8020-4b92baea8f39-er2g00.svg",
      "https://utfs.io/a/23x7w9tiht/929d0b4c-5f54-485d-b3dd-827509c0c36d-2r.svg",
    ],
    iconListsAlt: [
      "Next.js icon",
      "Tailwind CSS icon",
      "TypeScript icon",
      "GetStream.io icon",
      "Clerk icon",
    ],
    github: "https://github.com/AdrianRusan/nexthub",
    link: "https://nexthub-project.vercel.app/",
  },
];

export const testimonials = [
  {
    quote:
      "I am very pleased with Adrian's efforts and progress on my project. I was informed on a daily basis about progress, and Adrian is very keen on delivering quality work. He made sure I was happy with the end result, I definitely recommend contacting Adrian if you are in need of any web related projects!",
    name: "Tim Claes",
    title: "Freelance mobile & Web engineer",
    img: "https://utfs.io/a/23x7w9tiht/7iidzn1TwzukCJ59vIyXoxIjwOYaTyPZtGk0mVdeKgr9LH8h",
  },
];

export const workExperience = [
  {
    id: 5,
    title: "Founding Engineer",
    company: "Bono Fintech",
    period: "2024 - Present",
    desc: "Founding engineer at a Romanian fintech: built its web apps, APIs and the AI document-processing behind them, end to end.",
    className: "md:col-span-2",
    // Neutral generated card (#54 R5): no real logo asset, and never another
    // company's image.
    thumbnail: "/experience-fintech.svg",
  },
  {
    id: 1,
    title: "Full Stack Engineer",
    company: "Rusan Adrian-Ionuț PFA",
    period: "Dec 2022 - Present",
    desc: "AI builds end to end: a receipt classification pipeline, an LLM presentation platform, and an agent-built SaaS platform run by a multi-session agent org.",
    className: "md:col-span-2",
    thumbnail:
      "https://utfs.io/a/23x7w9tiht/5204c033-6bdb-4b06-9c15-7965e18e5561-1v1dh.svg",
  },
  {
    id: 2,
    title: "Full-Stack Engineer",
    company: "GoSocial Development SRL",
    period: "Sep 2023 - Sep 2024",
    desc: "Developed automated web scraping solutions with Puppeteer and built a Facebook Marketing API-integrated dashboard, enhancing data handling efficiency and ad management capabilities.",
    className: "md:col-span-2",
    thumbnail:
      "https://utfs.io/a/23x7w9tiht/44cbb969-d079-456a-8554-c62cc61ffb1f-1v1dg.svg",
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "PGL Esports SRL",
    period: "Oct 2020 - Oct 2022",
    desc: "Built the real-time broadcast graphics, interactive leaderboards, and player-stats overlays for live esports events.",
    className: "md:col-span-2",
    thumbnail:
      "https://utfs.io/a/23x7w9tiht/9ae30726-e9a7-43bc-a28c-bce3e44eba67-1v1di.svg",
  },
  {
    id: 4,
    title: "Frontend Developer",
    company: "Ipsos Interactive Services SRL",
    period: "Jun 2016 - Sep 2020",
    desc: "Built and shipped 300+ interactive survey and data-collection microsites under tight deadlines for enterprise research accounts.",
    className: "md:col-span-2",
    thumbnail:
      "https://utfs.io/a/23x7w9tiht/48a6ace0-6271-444c-873a-5cf82e04d3fc-1v1dj.svg",
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
