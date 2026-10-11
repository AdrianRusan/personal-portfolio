import { cn } from "@/lib/utils";

// Server-rendered heading: the words after the fourth are accented.
// (The old framer "nudge" animated transform on inline spans, which never rendered.)
export const TextGenerateEffect = ({
  words,
  className,
  id,
}: {
  words: string;
  className?: string;
  id?: string;
}) => {
  const wordsArray = words.split(" ");
  return (
    <div className={cn("font-bold", className)}>
      <div className="my-4">
        <div className="dark:text-white text-black-100 leading-snug tracking-wide">
          <h1 id={id}>
            {wordsArray.map((word, idx) => (
              <span
                key={word + idx}
                className={idx > 3 ? "text-purple" : "dark:text-white text-black"}
              >
                {word}{" "}
              </span>
            ))}
          </h1>
        </div>
      </div>
    </div>
  );
};
