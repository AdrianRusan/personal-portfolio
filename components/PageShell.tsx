import type { ComponentProps, ReactNode } from "react";
import { FloatingNav } from "@/components/ui/FloatingNav";
import Footer from "@/components/Footer";
import { ClosingCta } from "@/components/ClosingCta";
import { roClosingCta, roFooter } from "@/data/ro-home";

type NavItems = ComponentProps<typeof FloatingNav>["navItems"];

// overflow-x-clip (not hidden) so sticky children, like the blog TOC, still stick.
// The shared shell: floating nav, the one closing ask, a plain footer. The
// background is the body's (globals.css), so every page matches.
// Nav and footer sit outside <main> so they are exposed as their own landmarks.
export function PageShell({
  navItems,
  children,
  hideEmailCapture = false,
  hideFooterCta = false,
  closingSource = "footer",
  ro = false,
}: {
  // Omit for the shared nav (data/nav.ts).
  navItems?: NavItems;
  children: ReactNode;
  // D6: the checklist capture belongs on the blog; every other page hides it.
  hideEmailCapture?: boolean;
  // For pages that end in their own closing block.
  hideFooterCta?: boolean;
  // calendly_click source for the closing ask (defaults to "footer").
  closingSource?: string;
  // Romanian closing ask and footer (/ro/despre, /ro/contact).
  ro?: boolean;
}) {
  return (
    <div className="relative overflow-x-clip">
      <FloatingNav navItems={navItems} />
      <main id="main">{children}</main>
      <ClosingCta
        hideCta={hideFooterCta}
        hideEmailCapture={hideEmailCapture}
        source={closingSource}
        {...(ro ? { copy: roClosingCta } : {})}
      />
      <Footer {...(ro ? { copy: roFooter } : {})} />
    </div>
  );
}
