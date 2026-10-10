const en = {
  heading: "Why I can only run a few of these at once",
  intro:
    "The verify layer is one senior human — me — and it does not parallelize. Agents scale the shipping; the review does not. That's not a marketing constraint, it's the actual bottleneck of the model, and it's the reason the whole thing is safe to merge.",
  ceiling: "So here's the ceiling:",
  limitLead: "I run at most 2 Delivery Sprints at a time",
  limitRest:
    "— the review layer is one person and doesn't parallelize. If both slots are full when you reach out, I'll give you the next honest start date rather than overcommit.",
  outro:
    'No countdown timers, no "3 spots left today." The limit is just the truth about how this works — and it\'s also the pitch.',
};

export type ScarcityCopy = typeof en;

export const Scarcity = ({ copy = en }: { copy?: ScarcityCopy }) => {
  return (
    <section className="px-5 sm:px-10 py-20">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-balance">
          {copy.heading}
        </h2>
        <p className="text-white-200 mt-5 leading-relaxed max-w-3xl">
          {copy.intro}
        </p>
        <p className="text-white-200 mt-4 leading-relaxed max-w-3xl">
          {copy.ceiling}
        </p>
        <ul className="flex flex-col gap-3 mt-4">
          <li className="flex gap-3 text-sm text-white-200 leading-relaxed">
            <span className="text-purple flex-none">+</span>
            <span>
              <span className="text-white font-medium">{copy.limitLead}</span>{" "}
              {copy.limitRest}
            </span>
          </li>
        </ul>
        <p className="text-white-200/80 mt-6 max-w-3xl leading-relaxed">
          {copy.outro}
        </p>
      </div>
    </section>
  );
};
