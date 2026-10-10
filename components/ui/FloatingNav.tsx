"use client";

import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { CALENDLY_URL } from "@/data";
import { track } from "@/lib/analytics";
import { localeOf, switchLocalePath } from "@/lib/locale";

export const FloatingNav = ({
  navItems,
  className,
  ctaLabel = "Book a call",
  ctaSource = "floating_nav",
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
  ctaLabel?: string;
  ctaSource?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const pathname = usePathname();
  const isRo = localeOf(pathname) === "ro";

  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="sync">
      <motion.nav
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex w-fit max-w-[calc(100vw-1.5rem)] sm:max-w-fit md:min-w-[70vw] lg:min-w-fit fixed z-[5000] top-10 inset-x-0 mx-auto px-3 sm:px-10 py-3 sm:py-5 rounded-lg border border-black/10 dark:border-white/10 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] items-center justify-center space-x-2 sm:space-x-4",
          className,
          "floating-nav",
        )}
      >
        {/* Links scroll sideways on narrow screens so the CTA always fits. */}
        <div className="flex min-w-0 items-center space-x-2 sm:space-x-4 overflow-x-auto">
          {navItems.map((navItem: any) => (
            <Link
              key={navItem.link}
              href={navItem.link}
              className={cn(
                "relative dark:text-neutral-50 items-center  flex space-x-1 whitespace-nowrap text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500",
              )}
            >
              <span className="block sm:hidden">{navItem.icon}</span>
              <span className="text-xs sm:text-sm !cursor-pointer">{navItem.name}</span>
            </Link>
          ))}
        </div>
        <Link
          href={switchLocalePath(pathname)}
          hrefLang={isRo ? "en" : "ro"}
          lang={isRo ? "en" : "ro"}
          aria-label={isRo ? "EN, read in English" : "RO, citește în română"}
          className="relative flex-none text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-50 hover:text-purple dark:hover:text-purple !cursor-pointer"
        >
          {isRo ? "EN" : "RO"}
        </Link>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("calendly_click", { source: ctaSource })}
          className="relative shrink-0 whitespace-nowrap rounded-lg bg-purple px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-black-100 transition-colors hover:bg-purple/80 !cursor-pointer"
        >
          {ctaLabel}
        </a>
      </motion.nav>
    </AnimatePresence>
  );
};
