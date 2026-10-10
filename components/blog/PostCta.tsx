import { FaLocationArrow } from "react-icons/fa6";
import { TrackedLink } from "@/components/TrackedLink";
import MagicButton from "@/components/ui/MagicButton";
import type { BlogCtaCopy } from "@/lib/blog-cta";

export default function PostCta({ cta }: { cta: BlogCtaCopy }) {
  return (
    <section
      aria-labelledby="post-cta-heading"
      className="rounded-2xl border border-purple/40 bg-black-200/60 p-6 md:p-8"
    >
      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-blue-100">
        {cta.eyebrow}
      </span>
      <h2
        id="post-cta-heading"
        className="text-xl md:text-2xl font-bold tracking-tight mt-2 text-white"
      >
        {cta.heading}
      </h2>
      <p className="text-sm text-white-200 leading-relaxed mt-3">{cta.body}</p>
      <MagicButton
        title={cta.label}
        icon={<FaLocationArrow />}
        position="right"
        href={cta.href}
        trackEvent={{
          event: "cta_click",
          props: { cta: cta.cta, source: "blog_post_end" },
        }}
      />
      {cta.secondary && (
        <TrackedLink
          href={cta.secondary.href}
          event="cta_click"
          props={{ cta: `${cta.cta}_secondary`, source: "blog_post_end" }}
          className="block text-sm text-purple hover:underline underline-offset-4 mt-3"
        >
          {cta.secondary.label} →
        </TrackedLink>
      )}
    </section>
  );
}
