import type { ComponentProps, ReactNode } from "react";
import { FloatingNav } from "@/components/ui/FloatingNav";
import Footer from "@/components/Footer";

type NavItems = ComponentProps<typeof FloatingNav>["navItems"];

// The homepage shell (background, floating nav, footer) shared by every other page.
export function PageShell({
  navItems,
  children,
}: {
  navItems: NavItems;
  children: ReactNode;
}) {
  return (
    <main className="relative dark:bg-black-100 bg-white overflow-hidden">
      <FloatingNav navItems={navItems} />
      {children}
      <Footer />
    </main>
  );
}
