export type Locale = "en" | "ro";

// EN ↔ RO page pairs. Pages without a Romanian version switch to /ro.
const pairs: [en: string, ro: string][] = [
  ["/", "/ro"],
  ["/services", "/ro/servicii"],
];

export const localeOf = (pathname: string): Locale =>
  pathname === "/ro" || pathname.startsWith("/ro/") ? "ro" : "en";

export const switchLocalePath = (pathname: string): string => {
  const ro = localeOf(pathname) === "ro";
  const pair = pairs.find(([en, roPath]) => (ro ? roPath : en) === pathname);
  if (pair) return ro ? pair[0] : pair[1];
  return ro ? "/" : "/ro";
};
