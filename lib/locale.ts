export type Locale = "en" | "ro";

// EN ↔ RO page pairs. Pages without a Romanian version switch to /ro.
const pairs: [en: string, ro: string][] = [
  ["/", "/ro"],
  ["/services", "/ro/servicii"],
  ["/about", "/ro/despre"],
  ["/contact", "/ro/contact"],
];

export const localeOf = (pathname: string): Locale =>
  pathname === "/ro" || pathname.startsWith("/ro/") ? "ro" : "en";

const twinOf = (pathname: string) => {
  const ro = localeOf(pathname) === "ro";
  return pairs.find(([en, roPath]) => (ro ? roPath : en) === pathname);
};

export const hasTwin = (pathname: string): boolean => !!twinOf(pathname);

export const switchLocalePath = (pathname: string): string => {
  const ro = localeOf(pathname) === "ro";
  const pair = twinOf(pathname);
  if (pair) return ro ? pair[0] : pair[1];
  return ro ? "/" : "/ro";
};

// A4 F15: Vercel prerenders the EN home as "/index" (the live RSC payload's
// canonical URL is ["", "index"]), so usePathname() returns "/index" there
// while `next start` returns "/". Fold it back so the nav matches the route.
export const navPathname = (pathname: string) =>
  pathname.replace(/\/index$/, "") || "/";
