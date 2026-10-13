"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { CALENDLY_URL } from "@/data";
import { type NavItem, primaryNav, roPrimaryNav } from "@/data/nav";
import { track } from "@/lib/analytics";
import { hasTwin, localeOf, navPathname, switchLocalePath } from "@/lib/locale";

const isCurrent = (link: string, pathname: string) =>
  link === pathname ||
  (link !== "/" && link !== "/ro" && pathname.startsWith(link + "/"));

// A4 F14: min-h-11 gives every nav link a 44px tap target at the same size.
const linkClass =
  "relative flex min-h-11 items-center whitespace-nowrap px-0.5 text-[13px] sm:text-sm text-white-200 hover:text-purple aria-[current=page]:text-white aria-[current=page]:underline aria-[current=page]:decoration-purple aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-[6px]";

// Timișoara local time, shown once mounted so server and client HTML match.
function LocalTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString("en-GB", {
        timeZone: "Europe/Bucharest",
        hour: "2-digit",
        minute: "2-digit",
      });
    setTime(fmt());
    // Tick on the minute boundary, so the clock is never a minute behind.
    let id: ReturnType<typeof setTimeout>;
    const tick = () => {
      setTime(fmt());
      id = setTimeout(tick, 60_000 - (Date.now() % 60_000));
    };
    tick();
    return () => clearTimeout(id);
  }, []);
  if (!time) return null;
  return (
    <span className="hidden lg:inline font-mono text-xs tabular-nums text-white-100">
      Timișoara <time aria-label={`local time in Timișoara: ${time}`}>{time}</time>
    </span>
  );
}

// #114 M: a full-width bar fixed to the top. It carries the only persistent
// "Book a call", so it never hides.
export const FloatingNav = ({
  navItems,
  className,
}: {
  // Omit to use the shared nav (data/nav.ts).
  navItems?: NavItem[] | undefined;
  className?: string;
}) => {
  // A4 F15: on Vercel the EN home reports "/index"; see navPathname.
  const pathname = navPathname(usePathname());
  const isRo = localeOf(pathname) === "ro";
  const twin = hasTwin(pathname);
  const items = navItems ?? (isRo ? roPrimaryNav : primaryNav);

  const switchTitle = isRo ? "English homepage" : "Pagina principală în română";

  return (
    <nav
      aria-label={isRo ? "Principal" : "Main"}
      className={cn(
        "fixed inset-x-0 top-0 z-[5000]",
        className,
        "floating-nav",
      )}
    >
      <div className="mx-auto flex lg:grid max-w-[1360px] lg:grid-cols-[1fr_auto_1fr] items-center gap-x-3 sm:gap-x-4 px-3 sm:px-5 md:px-12 py-1 lg:py-2">
        <Link
          href={isRo ? "/ro" : "/"}
          className="hidden lg:flex min-h-11 items-center font-semibold text-white"
        >
          Adrian Rusan
        </Link>
        {/* One row at every width (e2e): below lg the wordmark hides (Home is a
            link) and the links scroll sideways so the CTA always fits. */}
        <div className="flex min-w-0 flex-1 lg:flex-none items-center gap-x-3 sm:gap-x-6 overflow-x-auto">
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
        <div className="flex items-center justify-end gap-x-3 sm:gap-x-4">
          <LocalTime />
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
            className="flex min-h-11 items-center px-1 text-sm font-medium text-white-100 hover:text-purple"
          >
            {isRo ? "EN" : "RO"}
          </Link>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              track("calendly_click", {
                source: isRo ? "ro_floating_nav" : "floating_nav",
              })
            }
            className="inline-flex min-h-11 shrink-0 items-center whitespace-nowrap rounded-full bg-purple px-4 text-sm font-medium text-black-100 transition-colors hover:bg-purple/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2 focus-visible:ring-offset-black-100"
          >
            {isRo ? "Programează" : "Book a call"}
          </a>
        </div>
      </div>
    </nav>
  );
};
