"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { ctaPrimary, ctaSecondary } from "@/components/ui/button";

export interface PricingColumn {
  name: string;
  badge?: string;
  featured?: boolean;
  // Per-tier booking link (W4, C44); falls back to the table's ctaHref.
  ctaHref?: string;
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
  rowHeader?: string;
}

export const PricingTable = ({
  columns,
  rows,
  ctaHref,
  ctaLabel,
  trackSource,
  rowHeader = "Feature",
}: PricingTableProps) => {
  const link = (column: PricingColumn) => {
    const href = column.ctaHref ?? ctaHref;
    return (
      <Link
        href={href}
        aria-label={ctaLabel}
        onClick={() =>
          trackSource &&
          track("calendly_click", {
            source: trackSource,
            tier: column.name,
          })
        }
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {/* The featured tier gets the one filled booking button. */}
        <span
          className={cn(
            column.featured ? ctaPrimary : ctaSecondary,
            "min-h-11 px-5 py-2 text-sm",
          )}
        >
          {ctaLabel}
        </span>
      </Link>
    );
  };

  return (
    <>
      <ul className="md:hidden flex flex-col gap-4">
        {/* Phones get stacked cards in table order (R2-F2); the table needs ≥md. */}
        {columns.map((column, index) => (
          <li
            key={column.name}
            className={`rounded-xl border p-5 ${
              column.featured ? "border-purple bg-black-200" : "border-white/15"
            }`}
          >
            {column.badge && (
              <span className="block text-xs font-medium text-purple mb-1">
                {column.badge}
              </span>
            )}
            <h4 className="text-base font-semibold text-white">
              {column.name}
            </h4>
            <dl className="mt-3 flex flex-col gap-3 text-sm">
              {rows.map((row) => (
                <div key={row.label}>
                  <dt className="font-medium text-white-200/75">{row.label}</dt>
                  <dd className="text-white-200 leading-relaxed">
                    {row.values[index]}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-5">{link(column)}</div>
          </li>
        ))}
      </ul>
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr>
              <th className="text-left align-bottom pb-4 pr-4 w-1/4">
                <span className="sr-only">{rowHeader}</span>
              </th>
              {columns.map((column) => (
                <th
                  key={column.name}
                  className={`text-left align-bottom pb-4 px-4 border-b ${
                    column.featured
                      ? "border-purple bg-black-200"
                      : "border-white/15"
                  }`}
                >
                  {column.badge && (
                    <span className="block text-xs font-medium text-purple mb-1">
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
              <tr key={row.label} className="border-b border-white/15">
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
                        column?.featured ? "bg-black-200" : ""
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
                  className={`py-6 px-4 ${column.featured ? "bg-black-200" : ""}`}
                >
                  {link(column)}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
