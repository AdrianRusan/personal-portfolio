import React from "react";
import { workExperience } from "@/data";
import { Button } from "./ui/MovingBorders";
import Image from "next/image";

const en = {
  headingBefore: "Where the ",
  headingAccent: "senior judgment",
  headingAfter: " comes from",
  intro:
    "The track record behind every review — the same judgment that catches what the agents miss.",
  at: "at",
  companyIcon: "company icon",
  company: "company",
  jobs: workExperience,
};
export type ExperienceCopy = typeof en;

// Optional so the clipart can be dropped from data/index.ts without touching this file.
const thumbnailOf = (card: object) =>
  (card as { thumbnail?: string }).thumbnail;

const Experience = ({ copy = en }: { copy?: ExperienceCopy }) => {
  return (
    <div className="py-20 w-full">
      <h2 id="experience-heading" className="heading">
        {copy.headingBefore}
        {copy.headingAccent}
        {copy.headingAfter}
      </h2>
      <p className="text-center text-white-200 mt-3 max-w-2xl mx-auto">
        {copy.intro}
      </p>

      <div className="w-full mt-12 grid lg:grid-cols-2 grid-cols-1 gap-10">
        {copy.jobs.map((card) => (
          <article key={card.id} aria-labelledby={`job-title-${card.id}`}>
            <Button
              // A card, not a control: keeps it out of the tab order.
              as="div"
              duration={Math.floor(Math.random() * 10000) + 10000}
              borderRadius="1.75rem"
              style={{ borderRadius: `calc(1.75rem* 0.96)` }}
              // Light: same surface as the other light cards. Dark: the original rgb(4,7,29).
              containerClassName="bg-black-200/40 dark:bg-[rgb(4,7,29)]"
              className="flex-1 text-slate-900 dark:text-neutral-50 border-white/10 dark:border-slate-800"
            >
              <div className="flex lg:flex-row flex-col lg:items-center p-3 py-6 md:p-5 lg:p-10 gap-2">
                {thumbnailOf(card) && (
                  <Image
                    src={thumbnailOf(card)!}
                    alt={`${card.company} ${copy.companyIcon}`}
                    className="lg:w-32 md:w-20 w-16"
                    width={100}
                    height={100}
                    title={`${card.company} ${copy.company}`}
                  />
                )}
                <div className="lg:ms-5 space-y-2">
                  <h3
                    id={`job-title-${card.id}`}
                    className="text-start text-xl md:text-2xl font-bold text-violet-700 dark:text-violet-300"
                  >
                    {card.title}
                    {` ${copy.at} `}
                    <br />
                    <span className="text-lg md:text-xl text-slate-700 dark:text-gray-300">
                      {card.company}
                    </span>
                  </h3>
                  <time className="text-start text-md md:text-lg text-slate-500 dark:text-gray-400 block">
                    {card.period}
                  </time>
                  <p className="text-start text-slate-600 dark:text-gray-200 mt-3 font-semibold">
                    {card.desc}
                  </p>
                </div>
              </div>
            </Button>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Experience;

// EN copy, also rendered as Markdown by lib/markdown (#64).
export { en as experienceCopy };
