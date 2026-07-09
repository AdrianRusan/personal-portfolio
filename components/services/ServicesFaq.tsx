interface FaqItem {
  question: string;
  answer: string;
}

const faqItems: FaqItem[] = [
  {
    question: "How is the quality any good if AI agents wrote it?",
    answer:
      "Because agent output is the draft, not the deliverable. Every PR goes through a line-by-line senior review that assumes the agent got it wrong until it's proven right — the same review a strong senior gives a junior's PR, at agent speed. Agents give you 2-3x throughput, not 100x, and they get specific things wrong. The review layer is where those get caught, and every sprint ships you a log of exactly what got caught in your codebase.",
  },
  {
    question:
      "I'm specifically worried about security. Unsupervised agents ship vulnerabilities.",
    answer:
      'Correct — they do. That\'s the reason this service exists instead of a cheaper "just run the agents" option. Real example: the adversarial review has caught 3 shell-injection vulnerabilities the agents wrote that passed the automated tests. Security is the first pass of every review, and you get a written findings log for the whole sprint. The security guarantee is in writing: an in-scope vulnerability found in a PR I marked reviewed gets fixed free.',
  },
  {
    question: "Why not just hire an agency, or more engineers?",
    answer:
      "An agency sells you a team's hours and marks them up; more headcount takes months to hire and ramp. This sells you reviewed outcomes in days, from one senior operator running an agent fleet — no coordination overhead, no ramp, no junior work billed at senior rates. And the real gap: an agency using agents rarely has a senior adversarial verify layer sitting on top. That layer is the whole point here, not an add-on.",
  },
  {
    question: "Who owns the code, and how is confidentiality handled?",
    answer:
      "You own everything — your repo, your branches, your IP, from the first commit. Work happens in your repository under your access controls. I sign your NDA or DPA before repo access; access is revoked at handoff unless you're on a retainer. No client code is used to train anything or reused anywhere else. For fintech clients, the security review covers secrets handling and access control as standard.",
  },
  {
    question: "What if it doesn't work out, or you're too slow?",
    answer:
      "If the first reviewed PR isn't merge-ready to your standard, you don't pay for it — your risk is highest before I've shipped anything, so the guarantee sits right there. Beyond that, scope is fixed on day 0, so there's no runaway bill.",
  },
  {
    question: "Can you just work as a normal contractor by the day?",
    answer:
      "That's available as a retainer, starting at €9,000/mo, but it's not the recommended way in. The sprint sells you a reviewed outcome for a price you agree up front, which is a better deal for you than buying time and hoping. The retainer carries the same security guarantee, plus a proof-month: month 1 is a trial, and you can cancel at the end of it if we haven't hit the agreed reviewed-PR cadence. Start with a Pilot Sprint if you want to test the working relationship at low risk first.",
  },
];

export const ServicesFaq = () => {
  return (
    <section className="px-5 sm:px-10 py-20">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-balance">
          Straight answers to the questions I actually get
        </h2>
        <div className="flex flex-col gap-4 mt-10">
          {faqItems.map((item) => (
            <div
              key={item.question}
              className="rounded-xl border border-white/10 bg-black-200/30 p-6"
            >
              <h3 className="text-base font-semibold text-white mb-2">
                {item.question}
              </h3>
              <p className="text-sm text-white-200 leading-relaxed">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
