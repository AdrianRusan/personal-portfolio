import { track as vercelTrack } from "@vercel/analytics";
import { localeOf } from "@/lib/locale";
import { utmFrom, withAttribution, type Utm } from "@/lib/booking";

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
  // /ro reuses the EN components and their sources; the locale keeps the funnels apart.
  vercelTrack(event, { ...props, locale: localeOf(window.location.pathname) });
};

// C44: Cal.com shows the source of each booking only if the link carries it.
// The landing UTMs go to sessionStorage, and every Cal.com link gets them
// plus utm_content=<page> at click time. One document listener covers every
// CTA component, since each of them imports this module.
const UTM_STORE = "landing_utm";

const storedUtm = (): Utm => {
  try {
    return JSON.parse(sessionStorage.getItem(UTM_STORE) ?? "{}") as Utm;
  } catch {
    return {};
  }
};

const installUtmPassthrough = () => {
  const landing = utmFrom(window.location.search);
  if (Object.keys(landing).length) {
    try {
      sessionStorage.setItem(UTM_STORE, JSON.stringify(landing));
    } catch {
      // Storage blocked: this page's links still get utm_content.
    }
  }
  const decorate = (e: MouseEvent) => {
    const link = (e.target as Element | null)?.closest?.("a[href]");
    if (!(link instanceof HTMLAnchorElement)) return;
    link.href = withAttribution(
      link.href,
      { ...storedUtm(), ...landing },
      window.location.pathname,
    );
  };
  // Capture phase, so the href is final before the browser follows it.
  document.addEventListener("click", decorate, true);
  document.addEventListener("auxclick", decorate, true);
};

if (typeof window !== "undefined") installUtmPassthrough();
