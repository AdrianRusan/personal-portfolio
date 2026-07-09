import MagicButton from "./ui/MagicButton";
import { FaLocationArrow } from "react-icons/fa6";

const FinalCta = () => {
  return (
    <section className="px-5 sm:px-10 py-20">
      <div className="max-w-5xl mx-auto rounded-2xl border border-white/10 bg-black-200/60 p-10 md:p-16 text-center">
        <p className="font-mono text-sm text-purple">
          2-3x, not 100x — and here&apos;s what the agents get wrong.
        </p>
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight mt-4 text-balance max-w-3xl mx-auto">
          Bring me a backlog. I&apos;ll ship it at agent speed and review every
          PR for security before it reaches you.
        </h2>
        <p className="text-white-200 mt-4">
          You triage and merge. I&apos;m accountable for what lands.
        </p>
        <div className="flex justify-center mt-8">
          <a href="#contact" aria-label="Book a scoping call">
            <MagicButton
              title="Book a scoping call"
              icon={<FaLocationArrow />}
              position="right"
            />
          </a>
        </div>
        <p className="text-xs text-white-200/60 mt-6 max-w-xl mx-auto">
          The verify layer is one senior human and doesn&apos;t parallelize — so
          only a few sprints run at once. When the slots are full, new
          engagements join a dated waitlist.
        </p>
      </div>
    </section>
  );
};

export default FinalCta;
