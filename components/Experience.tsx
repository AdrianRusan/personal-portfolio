

import React from "react";
import { workExperience } from "@/data";
import Image from "next/image";

const Experience = () => {
  return (
    <div className="py-20 w-full">
      <h2 id="experience-heading" className="heading">
        Work <span className="text-purple">Experience</span>
      </h2>

      <div className="w-full mt-12 grid lg:grid-cols-2 grid-cols-1 gap-10">
        {workExperience.map((card) => (
          <article 
            key={card.id} 
            aria-labelledby={`job-title-${card.id}`}
            className="relative rounded-[1.75rem] p-[1px] overflow-hidden bg-gradient-to-r from-purple-500/20 to-cyan-500/20"
          >
            <div className="relative bg-slate-900/90 border border-slate-800 backdrop-blur-xl text-white flex items-center justify-center w-full h-full rounded-[calc(1.75rem*0.96)] p-3 py-6 md:p-5 lg:p-10">
              <div className="flex lg:flex-row flex-col lg:items-center gap-2 w-full">
                <Image
                  src={card.thumbnail}
                  alt={`${card.company} company icon`}
                  className="lg:w-32 md:w-20 w-16"
                  width={100}
                  height={100}
                  title={`${card.company} company`}
                />
                <div className="lg:ms-5 space-y-2 flex-1">
                  <h3 id={`job-title-${card.id}`} className="text-start text-xl md:text-2xl font-bold text-purple-600">
                    {card.title}
                  </h3>
                  <div className="text-start text-lg md:text-xl text-gray-700 dark:text-gray-300">
                    {card.company}
                  </div>
                  <time className="text-start text-md md:text-lg text-gray-600 dark:text-gray-400 block">
                    {card.period}
                  </time>
                  <p className="text-start text-gray-800 dark:text-gray-200 mt-3 font-semibold">
                    {card.desc}
                  </p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Experience;