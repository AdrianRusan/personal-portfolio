import { faqs } from "@/data";

// Objection handling before the final CTA. Native <details> keeps it
// server-rendered and keyboard-accessible with no client JS.
export const ServicesFaq = () => {
  return (
    <section id="faq" className="px-5 sm:px-10 py-20 scroll-mt-24">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-balance">
          Straight answers to the questions I actually get
        </h2>
        <div className="flex flex-col gap-4 mt-10">
          {faqs.map((item) => (
            <details
              key={item.question}
              className="group rounded-xl border border-white/10 bg-black-200/30 p-6"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-base font-semibold text-white [&::-webkit-details-marker]:hidden">
                {item.question}
                <span
                  aria-hidden="true"
                  className="text-purple transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="text-sm text-white-200 leading-relaxed mt-3">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
