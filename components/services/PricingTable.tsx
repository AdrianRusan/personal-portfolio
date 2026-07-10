"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";

export interface PricingColumn {
  name: string;
  badge?: string;
  featured?: boolean;
}

export interface PricingRow {
  label: string;
  values: string[];
}

export interface PricingTableProps {
  columns: PricingColumn[];
  rows: PricingRow[];
  ctaHref: string;
  ctaLabel: string;
  trackSource?: string;
}

export const PricingTable = ({
  columns,
  rows,
  ctaHref,
  ctaLabel,
  trackSource,
}: PricingTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[560px] border-collapse text-sm">
        <thead>
          <tr>
            <th className="text-left align-bottom pb-4 pr-4 w-1/4" />
            {columns.map((column) => (
              <th
                key={column.name}
                className={`text-left align-bottom pb-4 px-4 border-b ${
                  column.featured
                    ? "border-purple bg-black-200/60"
                    : "border-white/10"
                }`}
              >
                {column.badge && (
                  <span className="block font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-purple mb-1">
                    {column.badge}
                  </span>
                )}
                <span className="text-base font-semibold text-white">
                  {column.name}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-white/10">
              <th
                scope="row"
                className="text-left align-top py-4 pr-4 font-medium text-white-200 whitespace-nowrap"
              >
                {row.label}
              </th>
              {row.values.map((value, index) => {
                const column = columns[index];
                return (
                  <td
                    key={`${row.label}-${column?.name ?? index}`}
                    className={`align-top py-4 px-4 text-white-200 leading-relaxed ${
                      column?.featured ? "bg-black-200/60" : ""
                    }`}
                  >
                    {value}
                  </td>
                );
              })}
            </tr>
          ))}
          <tr>
            <td className="py-6 pr-4" />
            {columns.map((column) => (
              <td
                key={column.name}
                className={`py-6 px-4 ${column.featured ? "bg-black-200/60" : ""}`}
              >
                <Link
                  href={ctaHref}
                  aria-label={ctaLabel}
                  onClick={() =>
                    trackSource &&
                    track("calendly_click", {
                      source: trackSource,
                      tier: column.name,
                    })
                  }
                  {...(ctaHref.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <span className="inline-flex items-center rounded-lg border border-purple/40 px-4 py-2 text-xs font-medium text-purple hover:bg-purple/10 transition-colors">
                    {ctaLabel}
                  </span>
                </Link>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};
