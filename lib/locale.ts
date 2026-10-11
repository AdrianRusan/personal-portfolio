export type Locale = "en" | "ro";

// EN ↔ RO page pairs. Pages without a Romanian version switch to /ro.
const pairs: [en: string, ro: string][] = [
  ["/", "/ro"],
  ["/services", "/ro/servicii"],
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
