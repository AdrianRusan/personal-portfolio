// The site's two CTA styles (P1, #114 M): a filled accent pill and a quiet
// chip pill. Plain strings in a server-safe module, so forms (TeardownForm)
// and links reuse them.
const ctaBase =
  "inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-center text-base font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2 focus-visible:ring-offset-black-100 disabled:pointer-events-none disabled:opacity-50"
export const ctaPrimary = `${ctaBase} bg-purple text-black-100 hover:bg-purple/90`
export const ctaSecondary = `${ctaBase} bg-chip text-white hover:bg-chip/70`
