import { testimonials } from "@/data";

const en = {
  label: "What a client says",
  note: "From a full-stack web delivery engagement, before the agent pipeline. The pipeline's own proof is in the case studies above — for proof on your own code today,",
  noteLink: "get a free teardown",
};
export type TestimonialsCopy = typeof en;

// One compact quote inside the Bio section (#54 R3), not a section of its own.
const Testimonials = ({ copy = en }: { copy?: TestimonialsCopy }) => {
  const testimonial = testimonials[0];
  if (!testimonial) return null;

  return (
    <figure className="mt-6 rounded-xl border border-white/10 bg-black-200/40 p-6 md:p-8">
      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-blue-100">
        {copy.label}
      </span>
      <blockquote className="text-white-200 leading-relaxed mt-3">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-4 text-sm">
        <span className="font-semibold text-white">{testimonial.name}</span>
        <span className="text-white-200/70"> — {testimonial.title}</span>
      </figcaption>
      <p className="text-xs text-white-200/75 mt-4 leading-relaxed">
        {copy.note}{" "}
        <a
          href="/teardown"
          className="text-blue-100 underline underline-offset-4 hover:text-purple transition-colors"
        >
          {copy.noteLink}
        </a>
        .
      </p>
    </figure>
  );
};

export default Testimonials;
