import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { FloatingNav } from "@/components/ui/FloatingNav";
import MagicButton from "@/components/ui/MagicButton";
import TeardownForm from "@/components/TeardownForm";
import { CALENDLY_URL } from "@/data";
import { FaLocationArrow } from "react-icons/fa6";

const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => (
    <footer
      className="h-32 animate-pulse bg-slate-100 dark:bg-slate-800"
      aria-label="Footer loading"
    />
  ),
});

const TITLE =
  "Free AI Code Teardown — a 15-min Loom of what your AI-generated code is hiding";
const DESCRIPTION =
  "Send a repo or a recent PR. I'll send back a free 15-minute Loom teardown of the security bugs your AI coding tools wrote that pass tests and merge anyway. No call, no pitch.";

export const metadata: Metadata = {
  title: "Free AI Code Teardown — 15-min Loom, no call",
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
  },
  alternates: {
    canonical: "/teardown",
  },
};

const teardownNavItems = [
  { name: "Home", link: "/" },
  { name: "Services", link: "/services" },
  { name: "Work", link: "/#work" },
  { name: "Blog", link: "/blog" },
];

const steps = [
  "Paste a repo or PR link below — something real you've shipped with Copilot, Cursor, or Claude Code.",
  "I run the same adversarial security review every sprint PR gets — injection, auth, secrets, access control — assuming the agent got it wrong until it's proven right.",
  "You get a ~15-minute Loom walking through exactly what I found, usually within 2–3 business days. Free.",
];

export default function TeardownPage() {
  return (
    <main className="relative dark:bg-black-100 bg-white overflow-hidden">
      <FloatingNav navItems={teardownNavItems} />

      <section className="px-5 sm:px-10 pt-28 sm:pt-32 pb-16">
        <div className="max-w-5xl mx-auto text-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-blue-100">
            Free · async · no call
          </span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-balance max-w-3xl mx-auto mt-4">
            Send me a repo. I&apos;ll show you what your AI-generated code is
            hiding.
          </h1>
          <p className="text-white-200 mt-5 leading-relaxed max-w-2xl mx-auto">
            A free, 15-minute Loom teardown of a repo or a recent PR — the
            security bugs that pass your tests and merge anyway. I&apos;ve
            caught shell-injection vulnerabilities that every automated check
            waved through. No call, no pitch, no signup beyond your email.
          </p>
        </div>
      </section>

      <section
        className="px-5 sm:px-10 pb-16"
        aria-label="How the teardown works"
      >
        <div className="max-w-3xl mx-auto">
          <ul className="flex flex-col gap-4">
            {steps.map((item, index) => (
              <li
                key={item}
                className="flex gap-4 text-sm md:text-base text-white-200 leading-relaxed"
              >
                <span
                  className="flex-none font-mono text-purple"
                  aria-hidden="true"
                >
                  {index + 1}.
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-5 sm:px-10 pb-16" aria-label="Request a teardown">
        <div className="max-w-2xl mx-auto">
          <TeardownForm />
        </div>
      </section>

      <section className="px-5 sm:px-10 pb-20" aria-label="Why free">
        <div className="max-w-3xl mx-auto rounded-2xl border border-white/10 bg-black-200/40 p-6 md:p-8">
          <h2 className="text-lg font-semibold tracking-tight">
            Why is this free?
          </h2>
          <p className="text-sm text-white-200 mt-3 leading-relaxed">
            Because showing you beats telling you. Most AI-code pitches claim
            they catch bugs; this one hands you the bugs, in your own code, for
            nothing. If it&apos;s useful, we can talk about shipping your
            backlog this way — agent-speed delivery with every PR reviewed
            before it reaches you. If not, you keep the teardown and we both
            move on.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-8">
            <MagicButton
              title="Prefer to talk? Book a scoping call"
              icon={<FaLocationArrow />}
              position="right"
              href={CALENDLY_URL}
            />
            <a
              href="/services"
              className="text-sm font-medium text-blue-100 hover:text-purple transition-colors"
            >
              Or see the full delivery offer →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
