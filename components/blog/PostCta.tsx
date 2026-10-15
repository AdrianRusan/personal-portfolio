import { BookingLink } from "@/components/BookingLink";
import { TrackedLink } from "@/components/TrackedLink";
import PrimaryCta from "@/components/ui/PrimaryCta";
import type { BlogCtaCopy } from "@/lib/blog-cta";
import { BOOKING_URL } from "@/data";

const secondaryClass =
  "block text-sm text-accent hover:underline underline-offset-4 mt-3";

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
      className="border-t-2 border-accent pt-6"
    >
      <p className="eyebrow">{cta.eyebrow}</p>
      <h2
        id="post-cta-heading"
        className="type-subsection mt-2 text-ink"
      >
        {cta.heading}
      </h2>
      <p className="text-sm text-body leading-relaxed mt-3">{cta.body}</p>
      {/* PrimaryCta's own top margin is desktop-only (R3-F17). */}
      <div className="mt-6">
        <PrimaryCta
          title={cta.label}
          href={cta.href}
          trackEvent={{
            event: "cta_click",
            props: { cta: cta.cta, source },
          }}
        />
      </div>
      {cta.secondary &&
        // The scoping-call link counts as a booking click, like every other booking link.
        (cta.secondary.href === BOOKING_URL ? (
          <BookingLink source={`${source}_${cta.cta}`} className={secondaryClass}>
            {cta.secondary.label} →
          </BookingLink>
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
