import PrimaryCta from "@/components/ui/PrimaryCta";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CALENDLY_URL, CONTACT_EMAIL } from "@/data";
import { ladder, offerById } from "@/data/ladder";

const en = {
  eyebrow: "Not ready for a sprint?",
  heading: "One Reviewed PR: €1,000",
  intro:
    "One ticket from your backlog, shipped and reviewed, before you commit to a sprint.",
  steps: [
    "You send one real ticket: a bug or a small feature that's already queued.",
    "An agent writes it. I review the diff line by line, security first, the same pass every sprint PR gets.",
    "You get the merge-ready PR in your repo, plus a one-page report of what the review caught.",
    `Delivered in ${offerById(ladder, "reviewed-pr").duration}.`,
  ],
  cta: "Start with one PR",
  emailSubject: "Reviewed PR (€1,000)",
  emailBody: "Repo or ticket link:\n\nWhat needs shipping:\n",
  emailLink: "Prefer email? Send the ticket →",
};

export type EntryOfferCopy = typeof en;

export const EntryOffer = ({ copy = en }: { copy?: EntryOfferCopy }) => {
  return (
    <section
      id="entry-offer"
      className="section-compact"
    >
      <div className="container-wide">
        <SectionHeading eyebrow={copy.eyebrow} lead={copy.intro}>
          {copy.heading}
        </SectionHeading>

        <ol className="flex flex-col gap-3 mt-8 max-w-3xl list-decimal pl-5 marker:text-purple">
          {copy.steps.map((item) => (
            <li key={item} className="text-sm text-white-200 leading-relaxed">
              {item}
            </li>
          ))}
        </ol>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-8">
          <PrimaryCta
            title={copy.cta}
            href={CALENDLY_URL}
            trackEvent={{
              event: "calendly_click",
              props: { source: "entry_offer" },
            }}
          />
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
              copy.emailSubject,
            )}&body=${encodeURIComponent(copy.emailBody)}`}
            className="text-sm font-medium text-white-200 underline underline-offset-4 hover:text-purple transition-colors"
          >
            {copy.emailLink}
          </a>
        </div>
      </div>
    </section>
  );
};
