"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { CALENDLY_URL } from "@/data";
import {
  type NavItem,
  primaryNav,
  roPrimaryNav,
  roServicesSubNav,
  servicesSubNav,
} from "@/data/nav";
import { track } from "@/lib/analytics";
import { hasTwin, localeOf, switchLocalePath } from "@/lib/locale";

const subNavs: Record<string, NavItem[]> = {
  "/services": servicesSubNav,
  "/ro/servicii": roServicesSubNav,
};

const isCurrent = (link: string, pathname: string) =>
  link === pathname ||
  (link !== "/" && link !== "/ro" && pathname.startsWith(link + "/"));

const linkClass =
  "relative flex items-center whitespace-nowrap py-2 sm:py-0 text-xs sm:text-sm text-neutral-600 dark:text-neutral-50 hover:text-neutral-500 dark:hover:text-neutral-300 aria-[current=page]:font-semibold aria-[current=page]:text-purple dark:aria-[current=page]:text-purple";

// Always visible: it carries the only persistent "Book a call". It shrinks
// after the first scroll instead of hiding, so focus can never land in a hidden nav.
export const FloatingNav = ({
  navItems,
  className,
  ctaLabel = "Book a call",
  ctaSource = "floating_nav",
}: {
  // Omit to use the shared nav (data/nav.ts) and the page's sub-nav.
  navItems?: NavItem[] | undefined;
  className?: string;
  ctaLabel?: string;
  ctaSource?: string;
}) => {
  const pathname = usePathname();
  const isRo = localeOf(pathname) === "ro";
  const twin = hasTwin(pathname);
  const items = navItems ?? (isRo ? roPrimaryNav : primaryNav);
  const subNav = navItems ? undefined : subNavs[pathname];

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const switchTitle = isRo ? "English homepage" : "Pagina principală în română";

  return (
    <nav
      aria-label={isRo ? "Principal" : "Main"}
      className={cn(
        "flex flex-wrap w-fit max-w-[calc(100vw-1.5rem)] sm:max-w-fit md:min-w-[70vw] lg:min-w-fit fixed z-[5000] inset-x-0 mx-auto px-3 sm:px-10 rounded-lg border border-black/10 dark:border-white/10 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] items-center justify-center gap-x-2 sm:gap-x-4 transition-[top,padding] duration-200",
        scrolled ? "top-3 py-1.5 sm:py-3" : "top-10 py-3 sm:py-5",
        className,
        "floating-nav",
      )}
    >
      {/* Links scroll sideways on narrow screens so the CTA always fits. */}
      <div className="flex min-w-0 flex-1 sm:flex-none items-center gap-x-2 sm:gap-x-4 overflow-x-auto">
        {items.map((navItem) => (
          <Link
            key={navItem.link}
            href={navItem.link}
            aria-current={
              isCurrent(navItem.link, pathname) ? "page" : undefined
            }
            className={linkClass}
          >
            {navItem.name}
          </Link>
        ))}
      </div>
      {subNav && (
        <div className="order-last basis-full sm:order-none sm:basis-auto flex items-center justify-center gap-x-3 sm:gap-x-4 border-t sm:border-t-0 sm:border-l border-black/10 dark:border-white/10 sm:pl-4">
          {subNav.map((item) => (
            <Link key={item.link} href={item.link} className={linkClass}>
              {item.name}
            </Link>
          ))}
        </div>
      )}
      <Link
        href={switchLocalePath(pathname)}
        hrefLang={isRo ? "en" : "ro"}
        lang={isRo ? "en" : "ro"}
        // Without a twin page the switch lands on the other homepage: say so.
        title={twin ? undefined : switchTitle}
        aria-label={
          twin
            ? isRo
              ? "EN, read in English"
              : "RO, citește în română"
            : `${isRo ? "EN" : "RO"}, ${switchTitle}`
        }
        className="relative flex-none py-2 sm:py-0 text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-50 hover:text-purple dark:hover:text-purple"
      >
        {isRo ? "EN" : "RO"}
        {!twin && " ⌂"}
      </Link>
      <a
        href={CALENDLY_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("calendly_click", { source: ctaSource })}
        className="relative shrink-0 whitespace-nowrap rounded-lg bg-purple px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-black-100 transition-colors hover:bg-purple/80"
      >
        {ctaLabel}
      </a>
    </nav>
  );
};
