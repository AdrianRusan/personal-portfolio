import { testimonials } from "@/data";

const Testimonials = () => {
  const testimonial = testimonials[0];
  if (!testimonial) return null;

  return (
    <>
      <h2 id="testimonials-heading" className="heading">
        What a client says about{" "}
        <span className="text-purple">working with me</span>
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
            From a full-stack web delivery engagement. Case studies from the
            reviewed-agent pipeline are in progress — for proof on your own code
            today,{" "}
            <a
              href="/teardown"
              className="text-blue-100 hover:text-purple transition-colors"
            >
              get a free teardown
            </a>
            .
          </p>
        </figure>
      </div>
    </>
  );
};

export default Testimonials;
