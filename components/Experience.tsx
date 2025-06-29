

import React from "react";
import { workExperience } from "@/data";
import { Button } from "./ui/MovingBorders";
import Image from "next/image";

const Experience = () => {
  return (
    <div className="py-20 w-full">
      <h2 className="heading">
        Work <span className="text-purple">Experience</span>
      </h2>

      <div className="w-full mt-12 grid lg:grid-cols-4 grid-cols-1 gap-10">
        {workExperience.map((card) => (
          <Button
            key={card.id}
            duration={Math.floor(Math.random() * 10000) + 10000}
            borderRadius="1.75rem"
            style={{
              background: "rgb(4,7,29)",
              backgroundColor:
                "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
              borderRadius: `calc(1.75rem* 0.96)`,
            }}
            className="flex-1 text-black dark:text-white border-neutral-200 dark:border-slate-800"
          >
            <div className="flex lg:flex-row flex-col lg:items-center p-3 py-6 md:p-5 lg:p-10 gap-2">
              <Image
                src={card.thumbnail}
                alt={'Stock image'}
                className="lg:w-32 md:w-20 w-16"
                width={100}
                height={100}
                title={'Stock image'}
              />
              <div className="lg:ms-5 space-y-2">
                <h3 className="text-start text-xl md:text-2xl font-bold text-purple-600">
                  {card.title} at <br/><span className="text-lg md:text-xl text-gray-700 dark:text-gray-300">{card.company}</span>
                </h3>
                <p className="text-start text-md md:text-lg text-gray-600 dark:text-gray-400">
                  {card.period}
                </p>
                <p className="text-start text-gray-800 dark:text-gray-200 mt-3 font-semibold">
                  {card.desc}
                </p>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Experience;