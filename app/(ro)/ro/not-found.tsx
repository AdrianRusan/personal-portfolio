import Link from "next/link";
import PrimaryCta from "@/components/ui/PrimaryCta";
import { PageShell } from "@/components/PageShell";
import { roPrimaryNav } from "@/data/nav";

// #143 I-23: the RO twin of app/(en)/not-found.tsx. Its title is set by
// ./[...missing]/page.tsx (#147).

export default function RoNotFound() {
  return (
    <PageShell ro hideEmailCapture>
      <section className="container-wide box-content flex flex-col items-start page-head pb-12">
        <p className="eyebrow">
          <span className="num">404</span> · Pagina nu există
        </p>
        <h1 className="type-title mt-5 mb-6 text-balance">
          Pagina asta nu există.
        </h1>
        <p className="text-body text-lg mb-8 max-w-md text-pretty">
          Linkul e vechi sau greșit. Pe pagina principală găsești restul, iar
          „Programează” din meniu merge de pe orice pagină.
        </p>
        <PrimaryCta title="Înapoi la pagina principală" href="/ro" />
        <nav
          aria-label="Pagini principale"
          className="flex flex-wrap gap-x-6 gap-y-3 mt-8 text-sm font-medium"
        >
          {roPrimaryNav.slice(1).map((item) => (
            <Link
              key={item.link}
              href={item.link}
              className="text-accent-ink underline underline-offset-4 hover:text-accent transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </section>
    </PageShell>
  );
}
