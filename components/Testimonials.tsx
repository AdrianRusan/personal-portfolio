import { testimonials, type Testimonial } from "@/data";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./ui/SectionHeading";

// #76: text, name, role and company only. No photos, initials or logos.
export const Quote = ({
  testimonial: { quote, name, role, company, lang },
  className,
}: {
  testimonial: Testimonial;
  className?: string;
}) => (
  <figure
    lang={lang}
    className={cn(
      "flex h-full flex-col rounded-xl border border-white/10 bg-black-200/40 p-6",
      className,
    )}
  >
    <blockquote className="flex-1 text-white-200 leading-relaxed text-pretty">
      &ldquo;{quote}&rdquo;
    </blockquote>
    <figcaption className="mt-4 text-sm">
      <span className="font-semibold text-white">{name}</span>
      <span className="text-white-200/80">
        , {role}
        {company && `, ${company}`}
      </span>
    </figcaption>
  </figure>
);

// One quote inside a /services section, under the offer it speaks to.
export const QuoteBand = ({ testimonial }: { testimonial: Testimonial }) => (
  <div className="px-5 sm:px-10 pb-4">
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
    className="px-5 sm:px-10 py-12 md:py-20"
  >
    <div className="container-section">
      <SectionHeading id="testimonials-heading">{copy.heading}</SectionHeading>
      <ul className="grid gap-5 mt-8 md:grid-cols-2 md:items-start">
        {copy.items.map((t) => (
          <li key={t.name}>
            <Quote testimonial={t} />
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Testimonials;

// EN copy, also rendered as Markdown by lib/markdown (#76).
export { en as testimonialsCopy };
