// Booking URL helpers for Cal.com (C44, #151). Pure, so the jest suite covers them; the click
// listener that applies them lives in lib/analytics.ts.

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const;
export type Utm = Partial<Record<(typeof UTM_KEYS)[number], string>>;

export const isBookingUrl = (href: string) => {
  try {
    return new URL(href).hostname === "cal.com";
  } catch {
    return false;
  }
};

// Adds the params to the URL, skipping empty values. Cal.com fills a booking
// field from the query param named after its identifier (`topic`) and keeps
// utm_* on the booking.
export const bookingUrl = (
  base: string,
  params: Record<string, string | undefined>,
) => {
  const url = new URL(base);
  for (const [key, value] of Object.entries(params)) {
    if (value) url.searchParams.set(key, value);
  }
  return url.toString();
};

// The utm_* keys of a landing URL's query string; empty when it has none.
export const utmFrom = (search: string): Utm => {
  const params = new URLSearchParams(search);
  return Object.fromEntries(
    UTM_KEYS.flatMap((key) => {
      const value = params.get(key);
      return value ? [[key, value]] : [];
    }),
  );
};

// What a Cal.com link carries at click time: the landing UTMs plus the page
// the click came from. Any other link passes through untouched.
export const withAttribution = (href: string, utm: Utm, page: string) =>
  isBookingUrl(href) ? bookingUrl(href, { ...utm, utm_content: page }) : href;

// Each pricing tier's button pre-fills the Scoping Call's `topic` with the tier
// and its price; `prices` is the same list the table's Price row shows.
export const withTierPrefill = <T extends { name: string }>(
  base: string,
  columns: T[],
  prices: string[],
) =>
  columns.map((column, i) => ({
    ...column,
    ctaHref: bookingUrl(base, { topic: `${column.name} (${prices[i]})` }),
  }));
