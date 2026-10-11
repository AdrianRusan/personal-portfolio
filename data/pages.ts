import {
  CALENDLY_URL,
  CAPACITY,
  CONTACT_EMAIL,
  LEDGER_PROOF,
  STRATEGY_CALL_CTA,
  STRATEGY_CALL_URL,
  callSteps,
  earlierTestimonial,
  workExperience,
  type Testimonial,
} from "@/data";
import { formatPrice, ladder, offerById } from "@/data/ladder";
import {
  RO_CAPACITY,
  RO_STRATEGY_CALL_CTA,
  RO_STRATEGY_CALL_URL,
  formatPriceRo,
  roLadder,
} from "@/data/ro";
import {
  RO_LEDGER_PROOF,
  roCallFaq,
  roWorkExperience,
} from "@/data/ro-home";

// Text-only pages (/privacy, /about, /contact and the RO twins). Bodies are
// Markdown: components/ProsePage renders them, and lib/markdown serves the same
// strings to agents (#64 R1), so the two can't drift.
export interface ProsePage {
  path: string;
  title: string;
  description: string;
  lead: string;
  updated?: string;
  // Parallel choices rendered as option blocks under the lead (/contact).
  options?: { heading: string; body: string; cta: string; href: string }[];
  sections: { heading: string; body: string }[];
  // A labelled client quote under the lead (/about, #76).
  earlier?: { label: string; testimonial: Testimonial };
}

const firstSentence = (s: string) => s.slice(0, s.indexOf(".") + 1);
const mailto = `[${CONTACT_EMAIL}](mailto:${CONTACT_EMAIL})`;
const LEGAL_ENTITY = "Rusan Adrian-Ionuț PFA · CIF 49119790";
const SOCIAL = `[LinkedIn](https://www.linkedin.com/in/adrian-rusan/) · [GitHub](https://github.com/AdrianRusan) · [X](https://x.com/adrian_rusan)`;

export const privacyPage: ProsePage = {
  path: "/privacy",
  title: "Privacy",
  description:
    "What adrian-rusan.com collects (form fields, analytics, error logs), who processes it (Resend, Vercel, Sentry), how long it is kept, and how to have it deleted.",
  lead: "The short version: I collect only what the forms ask for, plus anonymous analytics and error logs. I don't sell or share it, and you can have it deleted with one email.",
  updated: "11 October 2026",
  // Plain-language notice (D7). Every claim here has to stay true of the code:
  // the forms (components/EmailCapture.tsx, components/TeardownForm.tsx), the
  // API routes in app/api/, and the analytics/Sentry setup.
  sections: [
    {
      heading: "Who is responsible",
      body: `Adrian Rusan, an independent software engineer based in Romania, runs this site and decides what happens to the data below. Questions and requests go to ${mailto}.`,
    },
    {
      heading: "What I collect, and why",
      body: `- **The checklist form** (on most pages): your email address. I use it to send the checklist and an occasional email about shipping AI-written code safely.
- **The free teardown form** ([/teardown](/teardown)): your email address, the repo or PR link, and your note if you write one. I use them to do the teardown and send it to you. You only get further emails if you tick the opt-in box. If the repo is private, I ask for read-only access by email, and you can remove it once the teardown is sent.
- **Analytics**: anonymous page views and page-speed measurements. No cookies, no advertising trackers and no profile of you.
- **Error logs**: when the site breaks, an error report with what failed, the page address, and your browser and operating system version. Form contents are not part of it.`,
    },
    {
      heading: "Who processes it for me",
      body: `- **Resend** sends the emails and holds the email list.
- **Vercel** hosts the site and provides the analytics and page-speed measurements.
- **Sentry** stores the error logs.`,
    },
    {
      // R3-F26, A8: Art. 13 legal basis and transfers.
      heading: "Legal basis and transfers",
      body: `- **Checklist and teardown emails**: your consent, which you can withdraw at any time.
- **Error logs and analytics**: my legitimate interest in keeping the site working.

Resend, Vercel and Sentry are US companies. Transfers outside the EEA rely on Standard Contractual Clauses and, where the provider is certified, the EU–US Data Privacy Framework.`,
    },
    {
      heading: "How long I keep it",
      body: `- Email list: until you unsubscribe (every email has a link) or ask me to delete you.
- Teardown requests: up to 12 months after I send the teardown, unless we start working together.
- Error logs: deleted automatically by Sentry after 90 days.
- Analytics: aggregate numbers only, with nothing tied to you.`,
    },
    {
      heading: "Booking a call",
      body: "The “Book a call” buttons open Calendly. What you enter there is handled by Calendly under its own privacy policy, and I get the booking details.",
    },
    {
      heading: "Your rights",
      body: `You can ask for a copy of your data, a correction, or its deletion, and you can object to any use of it. Email ${mailto} and I will reply within 30 days. If you think I have handled your data badly, you can also complain to the Romanian data protection authority (ANSPDCP).`,
    },
  ],
};

const job = (j: {
  title: string;
  company: string;
  period: string;
  desc: string;
  client?: string;
}) =>
  `- **${j.title}, ${j.company}** (${j.period}). ${j.desc}${j.client ? `\n  - ${j.client}` : ""}`;

// P2 (R1-F11): one human paragraph, the history as a plain list, the method
// linked instead of repeated, and the ledger said once.
export const aboutPage: ProsePage = {
  path: "/about",
  // The layout template appends "| Adrian Rusan" (R1-F31).
  title: "About",
  description:
    "Adrian Rusan: senior software engineer in Bucharest with 10+ years in production. Claude Code agents ship the backlog; he reviews every pull request.",
  lead: "I'm Adrian Rusan, a senior software engineer in Bucharest, Romania. Claude Code agents ship backlog work, and I review every pull request myself, security first.",
  earlier: { label: "Earlier client work", testimonial: earlierTestimonial },
  sections: [
    {
      heading: "How I work",
      body: `Day to day, I work in writing. You get the pull requests, my review notes and a short update, so nobody waits on a meeting. I learned to review on systems where mistakes show: live overlays for PGL Major streams watched by 2M+ people at once, and 300+ survey projects for enterprise research clients. I review agent code the same way. I assume it's wrong, then check.

The method, agents ship and I review, is [on the home page](/#ship-verify). The full process, from scope call to handoff, is on [the services page](/services#process).`,
    },
    {
      heading: "Work history",
      body: workExperience.map(job).join("\n"),
    },
    {
      heading: "How the numbers are counted",
      body: `- Agents give you 2–3x the throughput, not 100x, and they get specific things wrong. [Here's what they get wrong](/blog/what-agents-get-wrong).
- Workflow numbers: ${LEDGER_PROOF}
- Case studies are my own projects and say so.`,
    },
    {
      heading: "Capacity",
      body: `${CAPACITY} If the slot is taken when you reach out, I give you the next start date I can keep.`,
    },
    {
      heading: "Proof and history",
      body: `- [Case studies](/work): documented runs, what broke, what I built and the number it moved.
- [Blog](/blog): field notes on shipping with Claude Code agents and senior review.
- Elsewhere: ${SOCIAL}.`,
    },
  ],
};

const strategyCall = offerById(ladder, "strategy-call");

// P2 (R1-F7, F30): three option blocks with one button each, the call first.
export const contactPage: ProsePage = {
  path: "/contact",
  title: "Contact",
  description:
    "Book a 30-minute scoping call, email contact@adrian-rusan.com or send a repo for a free teardown. Adrian Rusan works remotely from Bucharest, Romania.",
  lead: "The quickest way to start is a 30-minute scoping call. If you'd rather write, email works just as well.",
  options: [
    {
      heading: "Book a scoping call",
      body: "30 minutes on what you want built or shipped. You leave knowing which offer fits, what it covers and what it costs.",
      cta: "Book a scoping call",
      href: CALENDLY_URL,
    },
    {
      heading: "Email",
      body: `${CONTACT_EMAIL}, for a question, an offer you already picked, or an NDA to sign before we talk.`,
      cta: "Email me",
      href: `mailto:${CONTACT_EMAIL}`,
    },
    {
      heading: "Free AI code teardown",
      body: "Send a repo or PR and get a ~15-minute Loom of the security bugs your AI tools wrote that pass tests.",
      cta: "Send a repo",
      href: "/teardown",
    },
  ],
  sections: [
    {
      heading: `${strategyCall.name} (${formatPrice(strategyCall)})`,
      body: `${strategyCall.summary} [${STRATEGY_CALL_CTA}](${STRATEGY_CALL_URL}).`,
    },
    {
      heading: "Response times",
      body: `- **Email.** Within one working day.
- **After a scoping call.** ${firstSentence(callSteps[2]!.body)}
- **Free teardown.** Usually within 2–3 business days.
- **Privacy and data requests.** Within 30 days.`,
    },
    {
      heading: "Location",
      body: "Bucharest, Romania · remote. Romania time (EET/EEST, UTC+2/+3) overlaps fully with European working hours and the morning of US East Coast teams.",
    },
    {
      heading: "Legal entity",
      body: `${LEGAL_ENTITY}. Invoiced in EUR; USD on request.`,
    },
  ],
};

export const roAboutPage: ProsePage = {
  path: "/ro/despre",
  title: "Despre",
  description:
    "Adrian Rusan: inginer software senior din București, cu peste 10 ani în producție. Agenții Claude Code livrează backlog-ul; el verifică fiecare PR.",
  lead: "Sunt Adrian Rusan, inginer software senior în București. Agenții Claude Code livrează backlog-ul, iar eu verific personal fiecare pull request, întâi pentru securitate.",
  earlier: {
    label: "Proiect anterior pentru un client",
    testimonial: earlierTestimonial,
  },
  sections: [
    {
      heading: "Cum lucrez",
      body: `Zi de zi, lucrez în scris. Primești pull request-urile, notele mele de review și un update scurt, așa că nimeni nu așteaptă după o ședință. Am învățat să fac review pe sisteme unde greșelile se văd: grafica live din transmisiunile PGL Major, urmărite de peste 2 milioane de oameni simultan, și peste 300 de proiecte de sondaje pentru clienți enterprise din cercetarea de piață. La fel verific și codul scris de agenți. Pornesc de la ideea că e greșit, apoi verific.

Metoda, agenții livrează și eu verific, e [pe pagina principală](/ro#ship-verify). Tot procesul, de la discuția de scope la predare, e pe [pagina de servicii](/ro/servicii#process).`,
    },
    {
      heading: "Experiență",
      body: roWorkExperience.map(job).join("\n"),
    },
    {
      heading: "Cum sunt numărate cifrele",
      body: `- Agenții îți dau de 2–3 ori mai mult volum, nu de 100 de ori, și greșesc lucruri anume. [Iată ce greșesc](/blog/what-agents-get-wrong).
- Cifrele fluxului de lucru: ${RO_LEDGER_PROOF}
- Studiile de caz sunt proiectele mele și spun asta.`,
    },
    {
      heading: "Capacitate",
      body: `${RO_CAPACITY} Dacă locul e ocupat când mă contactezi, îți dau următoarea dată de start pe care o pot respecta.`,
    },
    {
      heading: "Dovezi și istoric",
      body: `Studiile de caz și articolele sunt în engleză.

- [Studii de caz](/work): rulări documentate, ce s-a stricat, ce am construit și ce cifră s-a mișcat.
- [Blog](/blog): note despre livrarea cu agenți Claude Code și review senior.
- În altă parte: ${SOCIAL}.`,
    },
  ],
};

const roStrategyCall = offerById(roLadder, "strategy-call");

export const roContactPage: ProsePage = {
  path: "/ro/contact",
  title: "Contact",
  description:
    "Programează o discuție de 30 de minute, scrie la contact@adrian-rusan.com sau trimite un repo pentru un teardown gratuit. Remote, din București.",
  lead: "Cel mai rapid începem cu o discuție de 30 de minute. Dacă preferi să scrii, un email merge la fel de bine.",
  options: [
    {
      heading: "Programează o discuție",
      body: "30 de minute despre ce vrei să construiești sau să livrezi. Pleci știind ce ofertă ți se potrivește, ce acoperă și cât costă.",
      cta: "Programează o discuție",
      href: CALENDLY_URL,
    },
    {
      heading: "Email",
      body: `${CONTACT_EMAIL}, pentru o întrebare, o ofertă pe care ai ales-o deja sau un NDA de semnat înainte să vorbim.`,
      cta: "Scrie-mi",
      href: `mailto:${CONTACT_EMAIL}`,
    },
    {
      heading: "Teardown gratuit",
      body: "Trimite un repo sau un PR și primești un Loom de ~15 minute, în engleză, cu bugurile de securitate scrise de uneltele AI care trec de teste.",
      cta: "Trimite un repo",
      href: "/teardown",
    },
  ],
  sections: [
    {
      heading: `${roStrategyCall.name} (${formatPriceRo(roStrategyCall)})`,
      body: `${roStrategyCall.summary} [${RO_STRATEGY_CALL_CTA}](${RO_STRATEGY_CALL_URL}).`,
    },
    {
      heading: "Timp de răspuns",
      body: `- **Email.** În cel mult o zi lucrătoare.
- **După discuție.** ${firstSentence(roCallFaq.steps[2]!.body)}
- **Teardown gratuit.** De obicei în 2–3 zile lucrătoare.
- **Cereri privind datele personale.** În cel mult 30 de zile.`,
    },
    {
      heading: "Locație",
      body: "București, România · remote. Ora României (EET/EEST, UTC+2/+3) se suprapune complet cu programul european și cu dimineața echipelor de pe Coasta de Est a SUA.",
    },
    {
      heading: "Entitate juridică",
      body: `${LEGAL_ENTITY}. Facturez în EUR; în USD la cerere.`,
    },
  ],
};
