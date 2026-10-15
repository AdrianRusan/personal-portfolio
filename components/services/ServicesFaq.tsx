import { SectionHeading } from "@/components/ui/SectionHeading";
import { VAT_LINE, VERACODE_LINE } from "@/data";

type FaqItem = { question: string; answer: string };

// R2-F10: the /services FAQ, cut from 14 to 8 by merging related questions.
// The homepage keeps picking from the full `faqs` list in data/index.ts.
const items: FaqItem[] = [
  {
    question:
      "How good is the code if AI agents wrote it, and what if the agents get it wrong?",
    answer:
      "Agent output is a draft. Every PR gets a line-by-line review that assumes the agent got it wrong until the code shows otherwise. When an agent can't do a ticket, I fix it or write it myself: a failed run costs me time, and the price covers the reviewed result. Agents give you 2–3x throughput and get specific things wrong, so every sprint ships a log of what the review caught in your codebase.",
  },
  {
    question:
      "Unsupervised agents ship vulnerabilities. How do you handle security?",
    answer: `They do. ${VERACODE_LINE} That's why security is the first pass of every review: injection, auth, secrets, access control. On my own 30-PR run, a repo with no test suite, the review caught 3 shell-injection paths from request input before merge. Anything in scope that I miss is covered by the security guarantee in the sprint terms.`,
  },
  {
    question:
      "Who owns the code, what happens to our data, and will you sign an NDA?",
    answer:
      "You own everything from the first commit. I sign your NDA or DPA before I get repo access and work in your repository under your access controls. Which AI tools touch your code is agreed in writing first; if your policy rules one out, it doesn't run on your repo. Your code is never reused for another client or published, and my access ends at handoff unless you're on a retainer.",
  },
  {
    question: "Which stacks and languages do you review?",
    answer:
      "TypeScript and JavaScript end to end: Node, Nest.js, React, Next.js, Tailwind, SQL and MongoDB. That's where 10+ years of production work went. The security pass (injection, auth, secrets, access control) applies to any language, but if your stack is outside that list I say so on the call.",
  },
  {
    question: "What timezone do you work in?",
    answer:
      "Romania (EET/EEST, UTC+2/+3), which overlaps fully with European hours and with the morning of US East Coast teams. Day to day runs async in writing: you get the PRs, the review notes and a short written update, so nobody waits on a meeting.",
  },
  {
    question: "What counts as one PR?",
    answer:
      "One ticket from your backlog, shipped as one reviewable pull request: a bug fix, a small feature or a slice of a bigger one. A ticket too big to review well in one pass gets split on the scope call, before the price is fixed, so you know the PR count up front.",
  },
  {
    question:
      "How do payment terms work, who invoices, and who pays for LLM and API usage?",
    answer:
      `Every price is fixed before work starts. ${VAT_LINE} Invoiced in EUR by my Romanian-registered business (PFA); USD on request. The strategy call is paid up front. Sprints are 50% to book the slot and 50% on handoff, the Reviewed PR is paid after delivery, and retainers bill monthly. LLM/API usage is included in the fixed price for sprints and reviewed PRs. Agent Fleet Setup runs on your team's own Claude Code licences.`,
  },
  {
    question:
      "Why not a contractor by the day, an agency, more engineers, or an AI review bot?",
    answer:
      "Day-to-day capacity is the retainer, from €4,000/month. An agency sells a team's hours with a markup, and new hires take months to ramp. An AI review bot is cheap and worth running, but it can't be held accountable for a merge. A sprint sells reviewed PRs at a price fixed up front, and the first one lands within days. To test the working relationship first, start with one Reviewed PR.",
  },
];

export const servicesFaqCopy = { heading: "Questions", items };
export type ServicesFaqCopy = typeof servicesFaqCopy;

// FAQPage JSON-LD built from the same items the page shows, so the schema
// can't drift from the visible FAQ.
export const faqJsonLd = (list: FaqItem[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: list.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
});

// Objection handling before the final CTA. Native <details> keeps it
// server-rendered and keyboard-accessible with no client JS.
export const ServicesFaq = ({
  copy = servicesFaqCopy,
}: {
  copy?: ServicesFaqCopy;
}) => {
  return (
    <section
      id="faq"
      className="section border-t border-ink/15"
    >
      <div className="container-wide grid gap-8 lg:grid-cols-[4fr_7fr] lg:gap-16">
        <SectionHeading>{copy.heading}</SectionHeading>
        <div className="border-b border-ink/15">
          {copy.items.map((item) => (
            <details
              key={item.question}
              className="group border-t border-ink/15 py-5 first:border-ink"
            >
              <summary className="flex min-h-11 cursor-pointer list-none items-start justify-between gap-4 text-lg text-ink [&::-webkit-details-marker]:hidden">
                {item.question}
                <span
                  aria-hidden="true"
                  className="text-2xl leading-none text-accent transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="text-body leading-relaxed mt-3 max-w-3xl">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
