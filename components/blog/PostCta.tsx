import { CalendlyLink } from "@/components/CalendlyLink";
import { TrackedLink } from "@/components/TrackedLink";
import MagicButton from "@/components/ui/MagicButton";
import type { BlogCtaCopy } from "@/lib/blog-cta";
import { CALENDLY_URL } from "@/data";

const secondaryClass =
  "block text-sm text-purple hover:underline underline-offset-4 mt-3";

export default function PostCta({
  cta,
  source = "blog_post_end",
}: {
  cta: BlogCtaCopy;
  source?: string;
}) {
  return (
    <section
      aria-labelledby="post-cta-heading"
      className="rounded-2xl border border-purple/40 bg-black-200/60 p-6 md:p-8"
    >
      <p className="eyebrow">{cta.eyebrow}</p>
      <h2
        id="post-cta-heading"
        className="text-xl md:text-2xl font-bold tracking-tight mt-2 text-white"
      >
        {cta.heading}
      </h2>
      <p className="text-sm text-white-200 leading-relaxed mt-3">{cta.body}</p>
      {/* MagicButton's own top margin is desktop-only (R3-F17). */}
      <div className="mt-6">
        <MagicButton
          title={cta.label}
          href={cta.href}
          otherClasses="md:mt-0"
          trackEvent={{
            event: "cta_click",
            props: { cta: cta.cta, source },
          }}
        />
      </div>
      {cta.secondary &&
        // The scoping-call link counts as a booking click, like every other Calendly link.
        (cta.secondary.href === CALENDLY_URL ? (
          <CalendlyLink source={`${source}_${cta.cta}`} className={secondaryClass}>
            {cta.secondary.label} →
          </CalendlyLink>
        ) : (
          <TrackedLink
            href={cta.secondary.href}
            event="cta_click"
            props={{ cta: `${cta.cta}_secondary`, source }}
            className={secondaryClass}
          >
            {cta.secondary.label} →
          </TrackedLink>
        ))}
    </section>
  );
}
