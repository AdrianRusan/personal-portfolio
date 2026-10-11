import { FINTECH_EMPLOYER } from "@/data";

const en = {
  ariaLabel: "Track record and testimonial",
  eyebrow: "10+ years shipping production software",
  // Newest first.
  employers: [FINTECH_EMPLOYER, "GoSocial", "PGL Esports", "Ipsos"],
  quote:
    "I am very pleased with Adrian's efforts and progress on my project. I was informed on a daily basis about progress, and Adrian is very keen on delivering quality work. He made sure I was happy with the end result. I definitely recommend contacting Adrian if you are in need of any web related projects.",
  // Set when the quote's language differs from the page's (verbatim quotes stay untranslated).
  quoteLang: undefined as string | undefined,
  author: "Tim Claes",
  role: "Freelance mobile & web engineer",
};

export type TrustStripCopy = typeof en;

export const TrustStrip = ({ copy = en }: { copy?: TrustStripCopy }) => {
  return (
    <section aria-label={copy.ariaLabel} className="px-5 sm:px-10 py-16">
      <div className="max-w-5xl mx-auto">
        <p className="text-center font-mono text-[11px] uppercase tracking-[0.12em] text-white-200/75">
          {copy.eyebrow}
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 mt-5">
          {copy.employers.map((name, index) => (
            <span key={name} className="flex items-center gap-6">
              {index !== 0 && (
                <span className="text-white-200/30" aria-hidden="true">
                  ·
                </span>
              )}
              <span className="text-sm font-semibold text-white-200/80">
                {name}
              </span>
            </span>
          ))}
        </div>

        <figure className="mt-12 max-w-3xl mx-auto rounded-2xl border border-white/10 bg-black-200/40 p-8 md:p-10">
          <blockquote
            lang={copy.quoteLang}
            className="text-base md:text-lg leading-relaxed text-white-200"
          >
            &ldquo;{copy.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-6 flex items-center gap-3">
            <span className="text-sm font-semibold text-white">
              {copy.author}
            </span>
            <span className="text-white-200/40" aria-hidden="true">
              ·
            </span>
            <span className="text-sm text-white-200/70">{copy.role}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
};
