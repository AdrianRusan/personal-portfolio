"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  id,
}: {
  words: string;
  className?: string;
  id?: string;
}) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    // Progressive enhancement only: the words are already visible (opacity: 1)
    // in the server-rendered markup for LCP and no-JS support, so this is a
    // subtle position nudge rather than a fade-in from hidden.
    animate(
      "span",
      {
        y: [8, 0],
      },
      {
        duration: 0.5,
        delay: stagger(0.08),
      },
    );
  }, [animate]);

  const renderWords = () => {
    return (
      <motion.h1 id={id} ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className={idx > 3 ? "text-purple" : "dark:text-white text-black"}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.h1>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className="my-4">
        <div className="dark:text-white text-black-100 leading-snug tracking-wide">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
