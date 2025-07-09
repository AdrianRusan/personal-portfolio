import Image from "next/image";

import { cn } from "@/lib/utils";

import { GradientBackground } from "./GradientBackground";
import { techStackLeft, techStackRight } from "@/data";

import CopyEmail from "./CopyEmail";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-4 lg:gap-8 mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  id,
  title,
  description,
  className,
  imgClassName,
  titleClassName,
  img,
  spareImg,
}: {
  id: number;
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  className?: string;
  imgClassName?: string,
  titleClassName?: string,
  img?: string,
  spareImg?: string,
}) => {

  const getImageAlt = (id: number, isSpare: boolean = false) => {
    const altTexts: Record<number, { main: string; spare: string }> = {
      1: { main: "Client collaboration and communication illustration", spare: "" },
      2: { main: "Time zone flexibility world map", spare: "" },
      3: { main: "Technology stack visualization", spare: "" },
      4: { main: "Development enthusiasm and passion graphic", spare: "Grid pattern background for tech section" },
      5: { main: "JavaScript animation library development project", spare: "Grid pattern overlay for projects" },
      6: { main: "Contact and project collaboration invitation", spare: "" }
    };
    
    return isSpare ? altTexts[id]?.spare || "Decorative background element" : altTexts[id]?.main || "Portfolio section illustration";
  };

  return (
    <div
      className={
        cn(
          "row-span-1 relative overflow-hidden rounded-3xl border border-white/[0.1] group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none justify-between flex flex-col space-y-4",
          className
        )
      }
      style={{
        background: "rgb(4,7,29)",
        backgroundColor:
          "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
      }
      }
    >
      <div className={`${id === 6 && "flex justify-center"} h-full`}>
        <div className="w-full h-full absolute">
          {img && (
            <Image
              src={img}
              alt={getImageAlt(id)}
              className={cn(imgClassName, "object-cover object-center ")}
              width={0}
              height={0}
              title={getImageAlt(id)}
            />
          )}
        </div>
        <div
          className={`absolute right-0 -bottom-5 ${id === 5 && "w-full opacity-80"
            } `}
        >
          {spareImg && (
            <Image
              src={spareImg}
              alt={getImageAlt(id, true)}
              width={220}
              height={220}
              className="object-cover object-center w-full h-full"
              title={getImageAlt(id, true)}
            />
          )}
        </div>
        {id === 6 && (
          <GradientBackground />
        )}

        <div
          className={cn(
            titleClassName,
            "group-hover/bento:translate-x-2 transition duration-200 relative md:h-full min-h-40 flex flex-col px-5 p-5 lg:p-10"
          )}
        >
          <div className="font-sans font-extralight md:max-w-32 md:text-xs lg:text-base text-sm text-[#C1C2D3] z-10">
            {description}
          </div>
          <h3 className="font-sans text-lg lg:text-3xl max-w-96 font-bold z-20"
          >
            {title}
          </h3>

          {id === 3 && (
            <div className="flex gap-2 w-fit absolute -right-3 lg:-right-2" aria-label="Technology stack">
              <div className="flex flex-col gap-3 mt-10">
                {techStackLeft.map((item) => (
                  <span
                    key={item}
                    className="py-2 px-3 text-xs lg:text-base opacity-50 
                    lg:opacity-100 rounded-lg text-center bg-[#10132E]"
                    role="listitem"
                  >
                    {item}
                  </span>
                ))}
                <span className="py-4 px-3 rounded-lg text-center bg-[#10132E]" />
              </div>
              <div className="flex flex-col gap-3">
                <span className="py-4 px-3 rounded-lg text-center bg-[#10132E]" />
                {techStackRight.map((item) => (
                  <span
                    key={item}
                    className="py-2 px-3 text-xs lg:text-base opacity-50 
                    lg:opacity-100 rounded-lg text-center bg-[#10132E]"
                    role="listitem"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {id === 6 && (
            <CopyEmail />
          )}
        </div>
      </div>
    </div>
  );
};
