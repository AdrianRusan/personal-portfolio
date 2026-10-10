import type { ComponentProps, ReactNode } from "react";
import { FloatingNav } from "@/components/ui/FloatingNav";
import Footer from "@/components/Footer";

type NavItems = ComponentProps<typeof FloatingNav>["navItems"];

// overflow-x-clip (not hidden) so sticky children, like the blog TOC, still stick.
// The homepage shell (background, floating nav, footer) shared by every other page.
export function PageShell({
  navItems,
  children,
}: {
  navItems: NavItems;
  children: ReactNode;
}) {
  return (
    <main className="relative dark:bg-black-100 bg-white overflow-x-clip">
      <FloatingNav navItems={navItems} />
      {children}
      <Footer />
    </main>
  );
}
