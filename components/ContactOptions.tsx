import Link from "next/link";
import { CalendlyLink } from "./CalendlyLink";
import { ctaPrimary, ctaSecondary } from "./ui/button";
import type { ProsePage } from "@/data/pages";
import { CALENDLY_URL } from "@/data";
import { cn } from "@/lib/utils";

const button = "w-full sm:w-auto sm:min-w-48 shrink-0";

// /contact's three ways in (R1-F7): one button each, the call the only filled one.
export function ContactOptions({
  options,
}: {
  options: NonNullable<ProsePage["options"]>;
}) {
  return (
    <ul className="mt-12 max-w-[60rem] border-t border-white">
      {options.map((o) => (
        <li
          key={o.heading}
          className="flex flex-col gap-4 border-b border-white/15 last:border-b-0 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8"
        >
          <div>
            <h2 className="text-2xl type-light">{o.heading}</h2>
            <p className="mt-1 max-w-[38em] text-white-200 leading-relaxed text-pretty">
              {o.body}
            </p>
          </div>
          {o.href === CALENDLY_URL ? (
            <CalendlyLink source="contact" className={cn(ctaPrimary, button)}>
              {o.cta}
            </CalendlyLink>
          ) : o.href.startsWith("mailto:") ? (
            <a href={o.href} className={cn(ctaSecondary, button)}>
              {o.cta}
            </a>
          ) : (
            <Link href={o.href} className={cn(ctaSecondary, button)}>
              {o.cta}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}
