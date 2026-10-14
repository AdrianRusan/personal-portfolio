import { testimonials, type Testimonial } from "@/data";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./ui/SectionHeading";

// #76: text, name, role and company only. No photos, initials or logos.
// #114 M: a ruled quote, no card. `size="lg"` is the lead quote of a list.
export const Quote = ({
  testimonial: { quote, name, role, company, lang },
  className,
  size = "md",
}: {
  testimonial: Testimonial;
  className?: string;
  size?: "md" | "lg";
}) => (
  <figure
    lang={lang}
    className={cn("flex h-full flex-col border-t border-white/15 pt-6", className)}
  >
    <blockquote
      className={cn(
        "flex-1 text-white leading-snug text-pretty",
        size === "lg"
          ? "text-2xl md:text-3xl tracking-[-0.01em]"
          : "text-lg md:text-xl",
      )}
    >
      &ldquo;{quote}&rdquo;
    </blockquote>
    <figcaption className="mt-4 font-mono text-xs text-white-100">
      {name}, {role}
      {company && `, ${company}`}
    </figcaption>
  </figure>
);

// One quote inside a /services section, under the offer it speaks to.
export const QuoteBand = ({ testimonial }: { testimonial: Testimonial }) => (
  <div className="gutter pb-4">
    <div className="container-section">
      <Quote testimonial={testimonial} className="max-w-3xl" />
    </div>
  </div>
);

const en = {
  heading: "What people I've worked with say",
  items: [testimonials.tufeanu, testimonials.stroe] as Testimonial[],
};
export type TestimonialsCopy = typeof en;

const Testimonials = ({ copy = en }: { copy?: TestimonialsCopy }) => (
  <section
    aria-labelledby="testimonials-heading"
    className="section border-t border-white/15"
  >
    <div className="container-wide grid gap-10 lg:grid-cols-[4fr_7fr] lg:gap-16">
      <SectionHeading id="testimonials-heading">{copy.heading}</SectionHeading>
      <ul className="flex flex-col gap-8">
        {copy.items.map((t, i) => (
          <li key={t.name}>
            <Quote testimonial={t} size={i === 0 ? "lg" : "md"} />
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Testimonials;

// EN copy, also rendered as Markdown by lib/markdown (#76).
export { en as testimonialsCopy };
