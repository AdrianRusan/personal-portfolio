import Link from "next/link";
import { Button } from "./button";

const magicClasses =
  "relative w-full inline-flex h-12 overflow-hidden rounded-lg p-[1px] focus:outline-none md:w-60 md:mt-10";

const MagicButton = ({
  title,
  icon,
  position,
  handleClick,
  otherClasses,
  href,
}: {
  title: string;
  icon: React.ReactNode;
  position: string;
  handleClick?: () => void;
  otherClasses?: string;
  href?: string;
}) => {
  const inner = (
    <>
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      <span
        className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2 ${otherClasses}`}
      >
        {position === "left" && icon}
        {title}
        {position === "right" && icon}
      </span>
    </>
  );

  // When an href is given, render a single anchor (via Radix Slot) so we never
  // nest a <button> inside an <a> — that is invalid HTML and trips hydration.
  if (href) {
    return (
      <Button asChild className={magicClasses}>
        <Link href={href}>{inner}</Link>
      </Button>
    );
  }

  return (
    <Button className={magicClasses} onClick={handleClick}>
      {inner}
    </Button>
  );
};

export default MagicButton;
