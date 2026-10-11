// Calendly URL helpers (C44). Pure, so the jest suite covers them; the click
// listener that applies them lives in lib/analytics.ts.

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const;
export type Utm = Partial<Record<(typeof UTM_KEYS)[number], string>>;

export const isCalendly = (href: string) => {
  try {
    return new URL(href).hostname === "calendly.com";
  } catch {
    return false;
  }
};

// Adds the params to the URL, skipping empty values. Calendly reads utm_* onto
// the booking and a1 into the first question's answer.
export const calendlyUrl = (
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

// What a Calendly link carries at click time: the landing UTMs plus the page
// the click came from. Any other link passes through untouched.
export const withAttribution = (href: string, utm: Utm, page: string) =>
  isCalendly(href) ? calendlyUrl(href, { ...utm, utm_content: page }) : href;
