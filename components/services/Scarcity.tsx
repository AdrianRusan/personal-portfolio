export const Scarcity = () => {
  return (
    <section className="px-5 sm:px-10 py-20">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-balance">
          Why I can only run a few of these at once
        </h2>
        <p className="text-white-200 mt-5 leading-relaxed max-w-3xl">
          The verify layer is one senior human — me — and it does not
          parallelize. Agents scale the shipping; the review does not.
          That&apos;s not a marketing constraint, it&apos;s the actual
          bottleneck of the model, and it&apos;s the reason the whole thing is
          safe to merge.
        </p>
        <p className="text-white-200 mt-4 leading-relaxed max-w-3xl">
          So here&apos;s how the capacity actually works:
        </p>
        <ul className="flex flex-col gap-3 mt-4">
          <li className="flex gap-3 text-sm text-white-200 leading-relaxed">
            <span className="text-purple flex-none">+</span>
            <span>
              <span className="text-white font-medium">
                Currently 2 Delivery Sprints run at a time.
              </span>{" "}
              When both slots are taken, new engagements join a dated waitlist.
            </span>
          </li>
          <li className="flex gap-3 text-sm text-white-200 leading-relaxed">
            <span className="text-purple flex-none">+</span>
            <span>
              <span className="text-white font-medium">
                Retainers hold a permanent verify slot,
              </span>{" "}
              so only a couple run alongside the sprints at any time.
            </span>
          </li>
        </ul>
        <p className="text-white-200/80 mt-6 max-w-3xl leading-relaxed">
          No countdown timers, no &quot;3 spots left today.&quot; The scarcity
          is just the truth about how this works — and it&apos;s also the pitch.
        </p>
      </div>
    </section>
  );
};
