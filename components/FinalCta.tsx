import MagicButton from "./ui/MagicButton";
import { FaLocationArrow } from "react-icons/fa6";
import { CALENDLY_URL } from "@/data";

const en = {
  eyebrow: "2-3x, not 100x — and here's what the agents get wrong.",
  heading:
    "Bring me a backlog. I'll ship it at agent speed and review every PR for security before it reaches you.",
  body: "You triage and merge. I'm accountable for what lands.",
  button: "Book a scoping call",
  capacity:
    "The verify layer is one senior human and doesn't parallelize — so only a few sprints run at once. When the slots are full, new engagements join a dated waitlist.",
};
export type FinalCtaCopy = typeof en;

const FinalCta = ({ copy = en }: { copy?: FinalCtaCopy }) => {
  return (
    <section className="px-5 sm:px-10 py-20">
      <div className="max-w-5xl mx-auto rounded-2xl border border-white/10 bg-black-200/60 p-10 md:p-16 text-center">
        <p className="font-mono text-sm text-purple">{copy.eyebrow}</p>
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight mt-4 text-balance max-w-3xl mx-auto">
          {copy.heading}
        </h2>
        <p className="text-white-200 mt-4">{copy.body}</p>
        <div className="flex justify-center mt-8">
          <MagicButton
            title={copy.button}
            icon={<FaLocationArrow />}
            position="right"
            href={CALENDLY_URL}
            trackEvent={{
              event: "calendly_click",
              props: { source: "final_cta" },
            }}
          />
        </div>
        <p className="text-xs text-white-200/60 mt-6 max-w-xl mx-auto">
          {copy.capacity}
        </p>
      </div>
    </section>
  );
};

export default FinalCta;
