import { testimonials } from "@/data";

const en = {
  headingBefore: "What a client says about",
  headingAccent: "working with me",
  note: "From a full-stack web delivery engagement. Case studies from the reviewed-agent pipeline are in progress — for proof on your own code today,",
  noteLink: "get a free teardown",
};
export type TestimonialsCopy = typeof en;

const Testimonials = ({ copy = en }: { copy?: TestimonialsCopy }) => {
  const testimonial = testimonials[0];
  if (!testimonial) return null;

  return (
    <>
      <h2 id="testimonials-heading" className="heading">
        {copy.headingBefore}{" "}
        <span className="text-purple">{copy.headingAccent}</span>
      </h2>

      <div className="flex justify-center mt-10">
        <figure className="max-w-2xl rounded-2xl border border-white/10 bg-black-200/40 p-6 md:p-8">
          <blockquote className="text-white-200 leading-relaxed">
            &ldquo;{testimonial.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-5 text-sm">
            <span className="font-semibold text-white">{testimonial.name}</span>
            <span className="text-white-200/70"> — {testimonial.title}</span>
          </figcaption>
          <p className="text-xs text-white-200/60 mt-4 leading-relaxed">
            {copy.note}{" "}
            <a
              href="/teardown"
              className="text-blue-100 hover:text-purple transition-colors"
            >
              {copy.noteLink}
            </a>
            .
          </p>
        </figure>
      </div>
    </>
  );
};

export default Testimonials;
