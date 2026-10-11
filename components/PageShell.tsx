import type { ComponentProps, ReactNode } from "react";
import { FloatingNav } from "@/components/ui/FloatingNav";
import Footer from "@/components/Footer";

type NavItems = ComponentProps<typeof FloatingNav>["navItems"];

// overflow-x-clip (not hidden) so sticky children, like the blog TOC, still stick.
// The homepage shell (background, floating nav, footer) shared by every other page.
// Nav and footer sit outside <main> so they are exposed as their own landmarks.
export function PageShell({
  navItems,
  children,
  hideEmailCapture = false,
  hideFooterCta = false,
}: {
  // Omit for the shared nav (data/nav.ts).
  navItems?: NavItems;
  children: ReactNode;
  hideEmailCapture?: boolean;
  hideFooterCta?: boolean;
}) {
  return (
    <div className="relative dark:bg-black-100 bg-white overflow-x-clip">
      <FloatingNav navItems={navItems} />
      <main id="main">{children}</main>
      <Footer hideCta={hideFooterCta} hideEmailCapture={hideEmailCapture} />
    </div>
  );
}
