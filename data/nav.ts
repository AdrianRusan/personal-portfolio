export type NavItem = { name: string; link: string };

// One nav for every page. In-page anchors live in the /services sub-nav only.
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

export const servicesSubNav: NavItem[] = [
  { name: "Pricing", link: "#ladder" },
  { name: "How it works", link: "#process" },
  { name: "Contact", link: "#contact" },
];

export const roServicesSubNav: NavItem[] = [
  { name: "Prețuri", link: "#ladder" },
  { name: "Metoda", link: "#process" },
  { name: "Contact", link: "#contact" },
];
