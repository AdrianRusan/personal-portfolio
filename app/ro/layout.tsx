import Link from "next/link";
import { CONTACT_EMAIL } from "@/data";

// The root <html lang="en"> is shared by every route; lang="ro" here marks the
// /ro subtree as Romanian. ponytail: a full <html lang="ro"> needs route-group
// root layouts (moving every app/ route), worth it only if /ro grows.
export default function RoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="ro" className="dark:bg-black-100 bg-white">
      {children}
      <footer className="px-5 sm:px-10 py-10 border-t border-white/10">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row gap-3 justify-between text-sm text-white-200/80">
          <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-purple">
            {CONTACT_EMAIL}
          </a>
          <Link href="/" hrefLang="en" lang="en" className="hover:text-purple">
            English version →
          </Link>
        </div>
      </footer>
    </div>
  );
}
