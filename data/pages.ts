import {
  CALENDLY_URL,
  CONTACT_EMAIL,
  HARNESS_PROOF,
  LEDGER_PROOF,
  NOW_BOARD,
  callSteps,
  earlierTestimonial,
  workExperience,
  type Testimonial,
} from "@/data";
import {
  RO_HARNESS_PROOF,
  RO_LEDGER_PROOF,
  roCallFaq,
  roWorkExperience,
} from "@/data/ro-home";
import { RO_TEARDOWN_EMAIL } from "@/data/ro";

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
  // `quote`: a labelled client quote after the section body (/about, #76).
  sections: {
    heading: string;
    body: string;
    quote?: { label: string; testimonial: Testimonial };
  }[];
}

const firstSentence = (s: string) => s.slice(0, s.indexOf(".") + 1);
const mailto = `[${CONTACT_EMAIL}](mailto:${CONTACT_EMAIL})`;
const LEGAL_ENTITY = "Rusan Adrian-Ionuț PFA · CIF 49119790";
const SOCIAL = `[LinkedIn](https://www.linkedin.com/in/adrian-rusan/) · [GitHub](https://github.com/AdrianRusan) · [X](https://x.com/adrian_rusan)`;
// D12 (Adi, 2026-10-12): the city on every page, EN and RO.
const CITY = "Timișoara";

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
// linked instead of repeated, and the ledger said once. A1 F12 / A4 F8: the
// recent work leads; the 2022 quote follows the history it belongs to.
export const aboutPage: ProsePage = {
  path: "/about",
  // The layout template appends "| Adrian Rusan" (R1-F31). #125: the title
  // (also the H1) takes "hire full stack developer" (keyword-research.md).
  title: "Hire a Senior Full-Stack Developer",
  description:
    `Adrian Rusan: senior full-stack engineer in ${CITY} with 10+ years in production. AI agents ship the backlog; he reviews every pull request.`,
  lead: `I'm Adrian Rusan, a senior full-stack engineer in ${CITY} with 10+ years in production. I ship backlogs with AI agents and read every pull request myself before it reaches you, security first. Generation was never the slow part. Review is.`,
  sections: [
    {
      heading: "How I work",
      body: `Day to day, I work in writing. You get the pull requests, my review notes and a short update, so nobody waits on a meeting. I learned to review on systems where mistakes show: live overlays for PGL Major streams watched by 2M+ people at once, and 300+ survey projects for global brands. I review agent code the same way. I assume it's wrong, then check. The agents run on my own harness: ${HARNESS_PROOF}. My own status board, for scale: ${NOW_BOARD.commits} commits on ${NOW_BOARD.activeDays} active days, ${NOW_BOARD.testFiles} test files, ${NOW_BOARD.prs} PRs, all merged.

The method, agents ship and I review, is [on the home page](/#ship-verify). The full process, from scope call to handoff, is on [the services page](/services#process).`,
    },
    {
      heading: "Work history",
      body: `${workExperience.map(job).join("\n")}

[Case studies](/work) · [Blog](/blog) · ${SOCIAL}`,
      quote: { label: "Earlier client work", testimonial: earlierTestimonial },
    },
    {
      heading: "How the numbers are counted",
      body: `- Agents give you 2–3x the throughput, not 100x, and they get specific things wrong. [Here's what they get wrong](/blog/what-agents-get-wrong).
- Workflow numbers: ${LEDGER_PROOF}
- Each case study says whether it's my own project or client work under NDA.
- This site checks its own claims: the build fails if a page says tests passed for a run that had none, or still has a placeholder.`,
    },
  ],
};

// P2 (R1-F7, F30): three option blocks with one button each, the call first.
export const contactPage: ProsePage = {
  path: "/contact",
  // #125: unique title (it was "Contact" on both /contact and /ro/contact).
  title: "Contact: Book a Scoping Call",
  description:
    "Book a 30-minute scoping call, email contact@adrian-rusan.com or send a repo for a free teardown. Adrian Rusan works remotely from Timișoara, Romania.",
  lead: "The quickest way to start is a 30-minute scoping call. If you'd rather write, email works just as well.",
  options: [
    {
      heading: "Book a scoping call",
      body: "30 minutes on what you want built or shipped. You get the scope and a fixed price in writing within one working day.",
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
  // A1 F4 / F18: the paid strategy call is listed on /services only.
  sections: [
    {
      heading: "Response times",
      body: `- **Email.** Within one working day.
- **After a scoping call.** ${firstSentence(callSteps[2]!.body)}
- **Free teardown.** Usually within 2–3 business days.
- **Privacy and data requests.** Within 30 days.`,
    },
    {
      heading: "Location",
      body: `${CITY}, Romania · remote. Romania time (EET/EEST, UTC+2/+3) overlaps fully with European working hours and the morning of US East Coast teams.`,
    },
    {
      heading: "Legal entity",
      body: `${LEGAL_ENTITY}. Invoiced in EUR; USD on request.`,
    },
  ],
};

export const roAboutPage: ProsePage = {
  path: "/ro/despre",
  title: "Despre mine: inginer full-stack senior",
  description:
    `Adrian Rusan: inginer full-stack senior din ${CITY}, cu peste 10 ani în producție. Agenții AI livrează backlog-ul; el verifică fiecare PR.`,
  lead: `Sunt Adrian Rusan, inginer full-stack senior în ${CITY}, cu peste 10 ani în producție. Livrez backlog-uri cu agenți AI și citesc personal fiecare pull request înainte să ajungă la tine, întâi pentru securitate. Partea lentă n-a fost niciodată generarea codului, ci review-ul.`,
  sections: [
    {
      heading: "Cum lucrez",
      body: `Zi de zi, lucrez în scris. Primești pull request-urile, notele mele de review și un update scurt, așa că nimeni nu așteaptă după o ședință. Am învățat să fac review pe sisteme unde greșelile se văd: grafica live din transmisiunile PGL Major, urmărite de peste 2 milioane de oameni simultan, și peste 300 de proiecte de sondaje pentru branduri globale. La fel verific și codul scris de agenți. Pornesc de la ideea că e greșit, apoi verific. Agenții rulează pe harness-ul meu: ${RO_HARNESS_PROOF}. Panoul meu de status, ca ordin de mărime: ${NOW_BOARD.commits} de commit-uri în ${NOW_BOARD.activeDays} zile active, ${NOW_BOARD.testFiles} de fișiere de teste, ${NOW_BOARD.prs} de PR-uri, toate merge-uite.

Metoda, agenții livrează și eu verific, e [pe pagina principală](/ro#ship-verify). Tot procesul, de la discuția de scope la predare, e pe [pagina de servicii](/ro/servicii#process).`,
    },
    {
      heading: "Experiență",
      body: `${roWorkExperience.map(job).join("\n")}

Studiile de caz și articolele sunt în engleză: [Studii de caz](/work) · [Blog](/blog) · ${SOCIAL}`,
      quote: {
        label: "Proiect anterior pentru un client",
        testimonial: earlierTestimonial,
      },
    },
    {
      heading: "Cum sunt numărate cifrele",
      body: `- Agenții îți dau de 2–3 ori mai mult volum, nu de 100 de ori, și greșesc lucruri anume. [Iată ce greșesc](/blog/what-agents-get-wrong).
- Cifrele fluxului de lucru: ${RO_LEDGER_PROOF}
- Fiecare studiu de caz spune dacă e proiectul meu sau un proiect pentru un client, sub NDA.
- Site-ul își verifică singur afirmațiile: build-ul pică dacă o pagină spune că testele au trecut pentru o rulare care nu avea teste sau dacă a rămas un placeholder.`,
    },
  ],
};

export const roContactPage: ProsePage = {
  path: "/ro/contact",
  title: "Contact: programează o discuție",
  description:
    "Programează o discuție de 30 de minute, scrie la contact@adrian-rusan.com sau trimite un repo pentru un teardown gratuit. Remote, din Timișoara.",
  lead: "Cel mai rapid începem cu o discuție de 30 de minute. Dacă preferi să scrii, un email merge la fel de bine.",
  options: [
    {
      heading: "Programează o discuție",
      body: "30 de minute despre ce vrei să construiești sau să livrezi. Scope-ul și prețul fix vin în scris, în cel mult o zi lucrătoare.",
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
      body: "Trimite-mi pe email un repo sau un PR și primești un Loom de ~15 minute, în engleză, cu bugurile de securitate scrise de uneltele AI care trec totuși de teste.",
      cta: "Trimite un repo pe email",
      href: RO_TEARDOWN_EMAIL,
    },
  ],
  sections: [
    {
      heading: "Timp de răspuns",
      body: `- **Email.** În cel mult o zi lucrătoare.
- **După discuție.** ${firstSentence(roCallFaq.steps[2]!.body)}
- **Teardown gratuit.** De obicei în 2–3 zile lucrătoare.
- **Cereri privind datele personale.** În cel mult 30 de zile.`,
    },
    {
      heading: "Locație",
      body: `${CITY}, România · remote. Ora României (EET/EEST, UTC+2/+3) se suprapune complet cu programul european și cu dimineața echipelor de pe Coasta de Est a SUA.`,
    },
    {
      heading: "Entitate juridică",
      body: `${LEGAL_ENTITY}. Facturez în EUR; în USD la cerere.`,
    },
  ],
};
