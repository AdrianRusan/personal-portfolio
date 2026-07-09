const employers = ["Ipsos", "PGL Esports", "GoSocial", "Bono Fintech"];

export const TrustStrip = () => {
  return (
    <section
      aria-label="Track record and testimonial"
      className="px-5 sm:px-10 py-16"
    >
      <div className="max-w-5xl mx-auto">
        <p className="text-center font-mono text-[11px] uppercase tracking-[0.12em] text-white-200/60">
          10+ years shipping production software
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 mt-5">
          {employers.map((name, index) => (
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
          <blockquote className="text-base md:text-lg leading-relaxed text-white-200">
            &ldquo;I am very pleased with Adrian&apos;s efforts and progress on
            my project. I was informed on a daily basis about progress, and
            Adrian is very keen on delivering quality work. He made sure I was
            happy with the end result. I definitely recommend contacting Adrian
            if you are in need of any web related projects.&rdquo;
          </blockquote>
          <figcaption className="mt-6 flex items-center gap-3">
            <span className="text-sm font-semibold text-white">Tim Claes</span>
            <span className="text-white-200/40" aria-hidden="true">
              ·
            </span>
            <span className="text-sm text-white-200/70">
              Freelance mobile &amp; web engineer
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
};
