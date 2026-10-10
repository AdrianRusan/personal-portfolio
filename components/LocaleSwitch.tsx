"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeOf, switchLocalePath } from "@/lib/locale";

// Client-side so it links to the current page's twin (/services ↔ /ro/servicii),
// not just the home page.
export function LocaleSwitch({ className }: { className?: string }) {
  const pathname = usePathname();
  const ro = localeOf(pathname) === "ro";
  return (
    <Link
      href={switchLocalePath(pathname)}
      hrefLang={ro ? "en" : "ro"}
      lang={ro ? "en" : "ro"}
      className={className}
    >
      {ro ? "English" : "Română"}
    </Link>
  );
}
