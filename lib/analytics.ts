import { track as vercelTrack } from "@vercel/analytics";

// Local, side-effect-free production check. Deliberately NOT imported from
// config/environment (whose module runs validateEnvironment() at load) so this
// util can be pulled into statically-prerendered client components safely.
const isProduction = process.env.NODE_ENV === "production";

// The only events we fire. Kept small and tied to money actions so the funnel
// stays legible at low volume — vanity metrics (scroll depth, generic views)
// are deliberately excluded until traffic makes them meaningful.
export type AnalyticsEvent =
  | "calendly_click"
  | "cta_click"
  | "email_submit"
  | "teardown_request"
  | "audit_request";

type PropValue = string | number | boolean;
export type EventProps = Record<string, PropValue>;

// Vercel Analytics is cookieless and we keep it PII-free. If a prop key looks
// like PII, throw loudly in dev so it's caught before it can ship to prod.
const PII_KEY = /email|name|phone|token|secret/i;

const assertNoPii = (props: EventProps) => {
  for (const key of Object.keys(props)) {
    if (PII_KEY.test(key)) {
      throw new Error(
        `[analytics] refusing to send PII-shaped prop "${key}" — event props must never carry personal data`,
      );
    }
  }
};

// Fire a named conversion event. No-op outside production so dev/preview don't
// pollute the funnel data; in dev we still run the PII guard first so mistakes
// surface at author time rather than in prod.
export const track = (event: AnalyticsEvent, props?: EventProps): void => {
  if (!isProduction) {
    if (props) assertNoPii(props);
    return;
  }
  vercelTrack(event, props);
};
