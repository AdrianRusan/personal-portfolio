export type NavItem = { name: string; link: string };

// One nav for every page (A4 F7: no per-page sub-nav).
export const primaryNav: NavItem[] = [
  { name: "Home", link: "/" },
  { name: "Services", link: "/services" },
  { name: "Work", link: "/work" },
  { name: "Blog", link: "/blog" },
];

// /work and /blog are EN-only.
export const roPrimaryNav: NavItem[] = [
  { name: "Acasă", link: "/ro" },
  { name: "Servicii", link: "/ro/servicii" },
  { name: "Proiecte", link: "/work" },
  { name: "Blog", link: "/blog" },
];
