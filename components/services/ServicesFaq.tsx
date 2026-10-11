import { faqs } from "@/data";

export const servicesFaqCopy = {
  heading: "Straight answers to the questions I actually get",
  items: faqs,
};
export type ServicesFaqCopy = typeof servicesFaqCopy;

// Objection handling before the final CTA. Native <details> keeps it
// server-rendered and keyboard-accessible with no client JS.
export const ServicesFaq = ({ copy = servicesFaqCopy }: { copy?: ServicesFaqCopy }) => {
  return (
    <section id="faq" className="px-5 sm:px-10 py-12 md:py-20 scroll-mt-24">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-balance">
          {copy.heading}
        </h2>
        <div className="flex flex-col gap-3 md:gap-4 mt-8 md:mt-10">
          {copy.items.map((item) => (
            <details
              key={item.question}
              className="group rounded-xl border border-white/10 bg-black-200/30 p-4 md:p-6"
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
