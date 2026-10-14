"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { hasTwin, localeOf, navPathname, switchLocalePath } from "@/lib/locale";

// Client-side so it links to the current page's twin (/services ↔ /ro/servicii),
// not just the home page.
export function LocaleSwitch({ className }: { className?: string }) {
  const pathname = navPathname(usePathname());
  const ro = localeOf(pathname) === "ro";
  const label = ro ? "English" : "Română";
  // #143 I-22: without a twin page it lands on the other homepage; say so, as the nav does.
  const title = hasTwin(pathname)
    ? undefined
    : ro
      ? "English homepage"
      : "Pagina principală în română";
  return (
    <Link
      href={switchLocalePath(pathname)}
      hrefLang={ro ? "en" : "ro"}
      lang={ro ? "en" : "ro"}
      title={title}
      aria-label={title && `${label}, ${title}`}
      className={className}
    >
      {label}
    </Link>
  );
}
