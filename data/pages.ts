import {
  BOOKING_URL,
  CONTACT_EMAIL,
  CREDIT_TERMS,
  GUARANTEE,
  HARNESS_GUARANTEE_DAYS,
  HARNESS_PROOF,
  LEGAL_ENTITY,
  LEDGER_PROOF,
  NOW_BOARD,
  SECURITY_GUARANTEE_DAYS,
  VAT_LINE,
  callSteps,
  legalEntityLine,
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
import {
  RO_CREDIT_TERMS,
  RO_GUARANTEE,
  RO_TEARDOWN_EMAIL,
  RO_VAT_LINE,
} from "@/data/ro";

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
const SOCIAL = `[LinkedIn](https://www.linkedin.com/in/adrian-rusan/) · [GitHub](https://github.com/AdrianRusan) · [X](https://x.com/adrian_rusan)`;
// D12 (Adi, 2026-10-12): the city on every page, EN and RO.
const CITY = "Timișoara";

export const privacyPage: ProsePage = {
  path: "/privacy",
  title: "Privacy",
  description:
    "What adrian-rusan.com collects (form fields, analytics, error logs), who processes it (Resend, Vercel, Sentry, Cal.com, Stripe), how long it is kept, and how to have it deleted.",
  lead: "The short version: I collect only what the forms ask for, plus anonymous analytics and error logs. I don't sell or share it, and you can have it deleted with one email.",
  updated: "15 October 2026",
  // Plain-language notice (D7). Every claim here has to stay true of the code:
  // the forms (components/EmailCapture.tsx, components/TeardownForm.tsx), the
  // API routes in app/api/, and the analytics/Sentry setup.
  sections: [
    {
      heading: "Who is responsible",
      body: `${LEGAL_ENTITY.name} (CUI ${LEGAL_ENTITY.cui}), the Romanian-registered business (PFA) of Adrian Rusan, runs this site and is the data controller for everything below. Registered seat: ${LEGAL_ENTITY.seat}. Questions and requests go to ${mailto}.`,
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
- **Sentry** stores the error logs.
- **Stripe** takes the card payment when you pay for a session.`,
    },
    {
      // R3-F26, A8: Art. 13 legal basis and transfers.
      heading: "Legal basis and transfers",
      body: `- **Checklist and teardown emails**: your consent, which you can withdraw at any time.
- **Error logs and analytics**: my legitimate interest in keeping the site working.
- **Paid sessions**: the contract you make when you book and pay.

Resend, Vercel and Sentry are US companies, and Stripe can pass payment data to its US parent company. Transfers outside the EEA rely on Standard Contractual Clauses and, where the provider is certified, the EU–US Data Privacy Framework.`,
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
      body: "The booking buttons open Cal.com. What you enter there is handled by Cal.com under its own privacy policy, and I get the booking details. For a paid session, Stripe takes the payment on the same page.",
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
- This site checks its own claims: a test fails if a page says tests passed for a run that had none, and the build fails if a case study still has a placeholder.`,
    },
  ],
};

// P2 (R1-F7, F30): three option blocks with one button each, the call first.
export const contactPage: ProsePage = {
  path: "/contact",
  // #125: unique title (it was "Contact" on both /contact and /ro/contact).
  title: "Contact: Book a Scoping Call",
  description:
    `Book a 30-minute scoping call, email ${CONTACT_EMAIL} or send a repo for a free teardown. Adrian Rusan works remotely from Timișoara, Romania.`,
  lead: "The quickest way to start is a 30-minute scoping call. If you'd rather write, email works just as well.",
  options: [
    {
      heading: "Book a scoping call",
      body: "30 minutes on what you want built or shipped. You get the scope and a fixed price in writing within one working day.",
      cta: "Book a scoping call",
      href: BOOKING_URL,
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
      body: `${legalEntityLine}

A Romanian-registered business (PFA). Invoiced in EUR; USD on request.`,
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
- Site-ul își verifică singur afirmațiile: un test pică dacă o pagină spune că testele au trecut pentru o rulare care nu avea teste, iar build-ul pică dacă într-un studiu de caz a rămas un placeholder.`,
    },
  ],
};

export const roContactPage: ProsePage = {
  path: "/ro/contact",
  title: "Contact: programează o discuție",
  description:
    `Programează o discuție de 30 de minute, scrie la ${CONTACT_EMAIL} sau trimite un repo pentru un teardown gratuit. Remote, din Timișoara.`,
  lead: "Cel mai rapid începem cu o discuție de 30 de minute. Dacă preferi să scrii, un email merge la fel de bine.",
  options: [
    {
      heading: "Programează o discuție",
      body: "30 de minute despre ce vrei să construiești sau să livrezi. Scope-ul și prețul fix vin în scris, în cel mult o zi lucrătoare.",
      cta: "Programează o discuție",
      href: BOOKING_URL,
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
      body: `${legalEntityLine}

PFA înregistrat în România. Facturez în EUR; în USD la cerere.`,
    },
  ],
};

// #152 R6: the terms every engagement runs on. Draft: a lawyer reviews it
// before merge. Each term restates what /services already promises, plus the
// liability cap and the 50% advance on fixed-price work.
export const termsPage: ProsePage = {
  path: "/terms",
  title: "Terms",
  description:
    "The terms every engagement with Adrian Rusan runs on: what merge-ready means, payment and the 50% advance, VAT, the 30-day credit, the guarantees, retainer exit and liability.",
  lead: "The terms every engagement runs on. A written proposal for your project can change them, and where it does, the proposal wins.",
  updated: "15 October 2026",
  sections: [
    {
      heading: "Who provides the services",
      body: `${legalEntityLine}

A Romanian-registered business (PFA). Invoiced in EUR; USD on request.`,
    },
    {
      heading: "What merge-ready means",
      body: "A PR is merge-ready when it does what its ticket says, passes the checks your repo already runs (typecheck, lint, tests or CI, where they exist), and comes with my written review notes, security pass included. The standard is yours: if you wouldn't merge it as it stands, it isn't merge-ready. The merge and the deploy stay with your team.",
    },
    {
      heading: "Prices and payment",
      body: `Every price is fixed in writing before work starts. ${VAT_LINE}

- **Fixed-price work** (sprints, audits, automations, Agent Fleet Setup): 50% in advance to book the slot, 50% on handoff.
- **Architecture Session**: paid in full when you book.
- **Reviewed PR**: paid after delivery, and only if it's merge-ready.
- **Retainer**: billed monthly.`,
    },
    {
      heading: "Credit toward the next tier",
      body: `${CREDIT_TERMS} The invoice for the new tier shows its full price, with what you already paid deducted on a separate line.`,
    },
    {
      heading: "Guarantees",
      body: `- **Security**: if an in-scope vulnerability turns up in a PR I marked reviewed within ${SECURITY_GUARANTEE_DAYS} days of handoff, I fix it free and re-review the batch around it.
- **First PR**: ${GUARANTEE}
- **Agent Fleet Setup**: if your team hasn't shipped a reviewed PR through the setup by the end, the sessions continue free until they have, within ${HARNESS_GUARANTEE_DAYS} days of handoff.
- **Retainer, month 1**: if month 1 misses the pace we agreed, you can stop there and owe nothing more.`,
    },
    {
      heading: "Ending a retainer",
      body: "Three months to start, then month to month with 30 days' notice.",
    },
    {
      heading: "Liability",
      body: "My total liability for an engagement is capped at the fees you paid for that engagement. The cap doesn't cover damage caused with intent or through gross negligence, which Romanian law doesn't allow to be limited (Civil Code art. 1355).",
    },
  ],
};

export const roTermsPage: ProsePage = {
  path: "/ro/termeni",
  title: "Termeni și condiții",
  description:
    "Termenii pe care rulează orice colaborare cu Adrian Rusan: ce înseamnă gata de merge, plata și avansul de 50%, TVA, creditul de 30 de zile, garanțiile, ieșirea din retainer și răspunderea.",
  lead: "Termenii pe care rulează orice colaborare. O ofertă scrisă pentru proiectul tău îi poate schimba, iar acolo unde o face, oferta are prioritate.",
  updated: "15 octombrie 2026",
  sections: [
    {
      heading: "Cine prestează serviciile",
      body: `${legalEntityLine}

PFA înregistrat în România. Facturez în EUR; în USD la cerere.`,
    },
    {
      heading: "Ce înseamnă gata de merge",
      body: "Un PR e gata de merge când face ce cere tichetul, trece de verificările pe care repo-ul tău le rulează deja (typecheck, lint, teste sau CI, acolo unde există) și vine cu notele mele de review în scris, inclusiv trecerea de securitate. Standardul e al tău: dacă nu l-ai face merge așa cum e, nu e gata de merge. Merge-ul și deploy-ul rămân la echipa ta.",
    },
    {
      heading: "Prețuri și plată",
      body: `Fiecare preț e fix, în scris, înainte să înceapă munca. ${RO_VAT_LINE}

- **Proiectele cu preț fix** (sprinturi, audituri, automatizări, Agent Fleet Setup): 50% în avans ca să rezervi slotul, 50% la predare.
- **Sesiunea de arhitectură**: se plătește integral la rezervare.
- **PR-ul revizuit**: se plătește după livrare și doar dacă e gata de merge.
- **Retainerul**: se facturează lunar.`,
    },
    {
      heading: "Creditul pentru nivelul următor",
      body: `${RO_CREDIT_TERMS} Pe factura pentru noul nivel apare prețul întreg, iar ce ai plătit deja se scade pe un rând separat.`,
    },
    {
      heading: "Garanții",
      body: `- **Securitate**: dacă într-un PR marcat de mine ca revizuit apare o vulnerabilitate din aria review-ului în cel mult ${SECURITY_GUARANTEE_DAYS} de zile de la predare, o repar gratuit și refac review-ul pe lotul din jurul ei.
- **Primul PR**: ${RO_GUARANTEE}
- **Agent Fleet Setup**: dacă până la final echipa ta n-a livrat un PR revizuit prin setup, sesiunile continuă gratuit până se întâmplă, în cel mult ${HARNESS_GUARANTEE_DAYS} de zile de la predare.
- **Retainer, luna 1**: dacă luna 1 nu atinge ritmul stabilit, te poți opri acolo fără să mai datorezi nimic.`,
    },
    {
      heading: "Ieșirea din retainer",
      body: "Trei luni la început, apoi lună de lună, cu preaviz de 30 de zile.",
    },
    {
      heading: "Răspundere",
      body: "Răspunderea mea totală pentru o colaborare e limitată la sumele pe care mi le-ai plătit pentru ea. Limita nu se aplică prejudiciilor cauzate cu intenție sau din culpă gravă, pe care legea română nu permite să le limitez (art. 1355 Cod civil).",
    },
  ],
};
