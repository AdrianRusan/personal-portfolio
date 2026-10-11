import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { CONTACT_EMAIL } from "@/data";

const DESCRIPTION =
  "What adrian-rusan.com collects (form fields, analytics, error logs), who processes it (Resend, Vercel, Sentry), how long it is kept, and how to have it deleted.";

export const metadata: Metadata = {
  title: "Privacy",
  description: DESCRIPTION,
  alternates: {
    canonical: "/privacy",
  },
};

const privacyNavItems = [
  { name: "Home", link: "/" },
  { name: "Services", link: "/services" },
  { name: "Work", link: "/work" },
  { name: "Blog", link: "/blog" },
];

const UPDATED = "11 October 2026";

// Plain-language notice (D7). Every claim here has to stay true of the code:
// the forms (components/EmailCapture.tsx, components/TeardownForm.tsx), the
// API routes in app/api/, and the analytics/Sentry setup.
const sections: { heading: string; body: ReactNode }[] = [
  {
    heading: "Who is responsible",
    body: (
      <p>
        Adrian Rusan, an independent software engineer based in Romania, runs
        this site and decides what happens to the data below. Questions and
        requests go to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    ),
  },
  {
    heading: "What I collect, and why",
    body: (
      <ul>
        <li>
          <strong>The checklist form</strong> (on most pages): your email
          address. I use it to send the checklist and an occasional email about
          shipping AI-written code safely.
        </li>
        <li>
          <strong>The free teardown form</strong> (
          <Link href="/teardown">/teardown</Link>): your email address, the repo
          or PR link, and your note if you write one. I use them to do the
          teardown and send it to you. You only get further emails if you tick
          the opt-in box. If the repo is private, I ask for read-only access by
          email, and you can remove it once the teardown is sent.
        </li>
        <li>
          <strong>Analytics</strong>: anonymous page views and page-speed
          measurements. No cookies, no advertising trackers and no profile of
          you.
        </li>
        <li>
          <strong>Error logs</strong>: when the site breaks, an error report
          with what failed, the page address, and your browser and operating
          system version. Form contents are not part of it.
        </li>
      </ul>
    ),
  },
  {
    heading: "Who processes it for me",
    body: (
      <ul>
        <li>
          <strong>Resend</strong> sends the emails and holds the email list.
        </li>
        <li>
          <strong>Vercel</strong> hosts the site and provides the analytics and
          page-speed measurements.
        </li>
        <li>
          <strong>Sentry</strong> stores the error logs.
        </li>
      </ul>
    ),
  },
  {
    heading: "How long I keep it",
    body: (
      <ul>
        <li>
          Email list: until you unsubscribe (every email has a link) or ask me
          to delete you.
        </li>
        <li>
          Teardown requests: up to 12 months after I send the teardown, unless
          we start working together.
        </li>
        <li>Error logs: deleted automatically by Sentry after 90 days.</li>
        <li>Analytics: aggregate numbers only, with nothing tied to you.</li>
      </ul>
    ),
  },
  {
    heading: "Booking a call",
    body: (
      <p>
        The &ldquo;Book a call&rdquo; buttons open Calendly. What you enter
        there is handled by Calendly under its own privacy policy, and I get the
        booking details.
      </p>
    ),
  },
  {
    heading: "Your rights",
    body: (
      <p>
        You can ask for a copy of your data, a correction, or its deletion, and
        you can object to any use of it. Email{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and I will reply
        within 30 days. If you think I have handled your data badly, you can
        also complain to the Romanian data protection authority (ANSPDCP).
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <PageShell navItems={privacyNavItems}>
      <article className="px-5 sm:px-10 pt-28 sm:pt-32 pb-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            Privacy
          </h1>
          <p className="text-white-200 mt-5 leading-relaxed">
            The short version: I collect only what the forms ask for, plus
            anonymous analytics and error logs. I don&apos;t sell or share it,
            and you can have it deleted with one email.
          </p>
          <p className="font-mono text-xs text-white-200/75 mt-3">
            Last updated {UPDATED}
          </p>

          {sections.map((section) => (
            <section key={section.heading} className="mt-10">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
                {section.heading}
              </h2>
              <div className="mt-3 text-white-200 leading-relaxed [&_a]:text-purple [&_a]:underline [&_a]:underline-offset-2 [&_li]:mt-2 [&_strong]:text-white [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-6">
                {section.body}
              </div>
            </section>
          ))}
        </div>
      </article>
    </PageShell>
  );
}
