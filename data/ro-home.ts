import type { BioCopy } from "@/components/Bio";
import type { CaseStudyCardsCopy } from "@/components/CaseStudyCards";
import type { EmailCaptureCopy } from "@/components/EmailCapture";
import type { ExperienceCopy } from "@/components/Experience";
import type { FinalCtaCopy } from "@/components/FinalCta";
import type { FooterCopy } from "@/components/Footer";
import type { HeroCopy } from "@/components/Hero";
import type { LatestCopy } from "@/components/Latest";
import type { OffersCopy } from "@/components/Offers";
import type { ProofBandCopy } from "@/components/ProofBand";
import type { ShipVerifyCopy } from "@/components/ShipVerify";
import type { TestimonialsCopy } from "@/components/Testimonials";
import type { WhoForCopy } from "@/components/WhoFor";
import {
  CREDIT_DAYS,
  shipVerify,
  workExperience,
  WORKFLOW_NUMBERS as W,
} from "@/data";
import { tiers } from "@/data/ladder";
import {
  formatPriceRo,
  RO_CREDIT_TERMS,
  RO_GUARANTEE,
  RO_STRATEGY_CALL_URL,
  roLadder,
  roTierNames,
  roTiers,
} from "@/data/ro";

// RO twin of LEDGER_PROOF (data/index.ts): same constant, same source.
const ro = (v: number) => v.toLocaleString("ro-RO");
export const RO_LEDGER_PROOF = `${W.sessions} de sesiuni · ${W.hours} de ore · ${ro(W.commits)} de commit-uri · ${W.prsOpened} de PR-uri deschise (limită superioară, nu toate cu merge) — ${W.days} de zile, 6 aug.–10 oct. 2026, numărate din propriile mele jurnale de sesiuni.`;

// Romanian copy for the /ro homepage. Same sections and numbers as the English
// page; RO prices come from data/ro.ts (brief R7).

export { RO_GUARANTEE } from "@/data/ro";

export const roHero: HeroCopy = {
  eyebrow:
    "Adrian Rusan · Inginer senior, peste 10 ani · Agenți AI, review uman",
  heading: "Livrează roadmap-ul pentru care nu poți angaja.",
  body: "Îți golesc backlog-ul cu agenți Claude Code, apoi verific eu fiecare pull request, întâi pentru securitate, înainte să ajungă la tine.",
  promise:
    "Roadmap-ul tău se livrează, fără un incident de securitate pe numele tău.",
  honestBefore: "De 2–3 ori, nu de 100 de ori, și",
  honestLink: "iată ce greșesc agenții",
  teardown: "Cere un teardown gratuit",
  call: "Sau programează o discuție →",
  guarantee: RO_GUARANTEE,
  adviceBefore: "Ai nevoie doar de sfaturi?",
  adviceLink: "Rezervă o sesiune 1:1 de strategie AI, 110 €.",
  adviceHref: RO_STRATEGY_CALL_URL,
};

export const roProofBand: ProofBandCopy = {
  ariaLabel: "Dovezi în cifre",
  stats: [
    { figure: "30", label: "PR-uri revizuite · 9 loturi de agenți · 2,5 zile" },
    {
      figure: "3",
      label: "vulnerabilități de shell injection prinse, deși testele treceau",
    },
    {
      figure: "10+ ani",
      label: "în producție: Ipsos → PGL Esports → GoSocial → Bono Fintech",
    },
    {
      figure: `${W.sessions}`,
      label: `sesiuni · ${W.hours} h · ${W.days} de zile`,
    },
  ],
  shortNote: "Dintr-un benchmark documentat, rulat pe propriul meu repo. ",
  longNote:
    "Cifrele vin dintr-un benchmark rulat cap-coadă pe propriul meu repo. PR-urile, notele de review și vulnerabilitățile prinse sunt reale și documentate, dar nu e un proiect plătit de un client (studiile de caz cu clienți sunt în lucru). ",
  teardownBefore: "Vrei același review pe codul tău?",
  teardownLink: "Trimite-mi un repo pentru un teardown gratuit →",
  ledger: RO_LEDGER_PROOF,
  honesty:
    "Fără statistici inventate și fără urgență falsă. Cifrele de aici vin din rulări documentate.",
};

export const roEmailCapture: EmailCaptureCopy = {
  heading: "Nu ești gata să programezi o discuție?",
  body: "Primești checklist-ul de review pentru PR-uri scrise de agenți (în engleză): verificările care prind bugurile trecute de teste. Plus, din când în când, un email despre cum livrezi în siguranță cod scris de AI. Te dezabonezi oricând.",
  success: "Verifică-ți inboxul.",
  label: "Adresa de email",
  placeholder: "tu@firma.ro",
  sending: "Se trimite…",
  submit: "Vreau checklist-ul",
  error: "Ceva n-a mers. Încearcă din nou peste câteva momente.",
};

// Keyed by tag so a reordered or added EN step can't pick up the wrong copy.
const roSteps: Record<string, { heading: string; body: string }> = {
  SHIP: {
    heading: "Agenții scriu volumul",
    body: "Flote de agenți Claude Code lucrează în paralel, în git worktrees separate. Fiecare primește un tichet și urmează convențiile din CLAUDE.md-ul tău. De aici vine câștigul de 2–3 ori: throughput-ul unei echipe mici, de la un singur operator și un harness.",
  },
  VERIFY: {
    heading: "Un senior verifică fiecare PR",
    body: "Fiecare PR scris de un agent trece printr-un review adversarial, linie cu linie, înainte să ajungă la tine. Întâi securitatea (injection, autentificare, secrete, control al accesului), apoi corectitudinea și scope-ul. Pornesc de la ideea că agentul a greșit până se dovedește contrariul. Asta e partea rară, și partea pentru care cineva răspunde.",
  },
};

export const roShipVerify: ShipVerifyCopy = {
  heading:
    "Ai backlog-ul. Nu ai oamenii. Și ai văzut ce livrează agenții lăsați nesupravegheați.",
  body: "Ești cu luni în urmă pe un roadmap pe care nu-l poți recupera angajând destul de repede. Promisiunea agenților AI e tentantă: toată lumea vinde 10x, 100x, o echipă la cutie. Dar ai citit codul pe care îl scriu agenții. Știi că trece testele și tot duce o vulnerabilitate, cu toată încrederea, direct în fluxul de plăți. Iar dacă se întâmplă, numele tău e pe raportul de incident.",
  punch:
    "Viteza fără review nu e productivitate. E un risc cu fitilul mai scurt.",
  stepsHeading:
    "Totul are doi pași. Majoritatea furnizorilor îți vând doar primul.",
  steps: shipVerify.map((step) => ({ ...step, ...roSteps[step.tag] })),
  footnote:
    "Viteza o găsești oriunde acum. Stratul de verificare e partea rară, și partea pentru care cineva răspunde.",
};

export const roBio: BioCopy = {
  heading: "Cine îți verifică, de fapt, codul",
  body: "Sunt Adrian Rusan, inginer software cu peste 10 ani de cod livrat în producție. Cel mai recent, Founding Engineer la Bono Fintech (din 2024), iar înainte la GoSocial, PGL Esports și Ipsos. În fiecare colaborare de aici, eu sunt omul senior care verifică fiecare PR livrat de agenți înainte să ajungă la tine.",
  onGithub: "Adrian Rusan pe GitHub",
  onLinkedin: "Adrian Rusan pe LinkedIn",
  onX: "Adrian Rusan pe X",
  onYoutube: "Adrian Rusan pe YouTube",
};

const roTagline = Object.fromEntries(roTiers.map((t) => [t.tier, t.tagline]));

export const roOffers: OffersCopy = {
  heading: "De la o sesiune de 110 € la un retainer lunar",
  intro:
    "Patru niveluri: Consultanță, Training, Implementare, Livrare. Fiecare ofertă are prețul afișat înainte să vorbim. ",
  credit: RO_CREDIT_TERMS,
  tiers: tiers.map(({ tier }) => ({
    tier,
    name: roTierNames[tier],
    tagline: roTagline[tier] ?? "",
  })),
  ladder: roLadder,
  formatPrice: formatPriceRo,
  href: "/ro/servicii#ladder",
  more: "Vezi ce include →",
  capacity:
    "Stratul de verificare e un singur om senior și nu se poate paraleliza, așa că rulează doar câteva proiecte în același timp.",
};

export const roCaseStudyCards: CaseStudyCardsCopy = {
  study: "Studiu de caz",
  benchmark: "Benchmark · propriul meu repo",
  eyebrow: "Studii de caz (în engleză)",
  heading: "Dovezi din rulări documentate",
  read: "Citește →",
  all: "Toate studiile de caz →",
};

export const roWhoFor: WhoForCopy = {
  ariaLabel: "Pentru cine e",
  heading: "Gândit pentru un anumit tip de client. Nepotrivit pentru alții.",
  forHeading: "E pentru tine dacă",
  notForHeading: "Nu e pentru tine dacă",
  forList: [
    "Conduci echipa de engineering, ai fondat compania sau răspunzi de livrare într-un startup sau scaleup finanțat, mai ales acolo unde review-ul de securitate e obligatoriu: fintech, sănătate, plăți, orice atinge bani sau date personale.",
    "Te îneci în backlog și nu poți angaja destul de repede.",
    "Vrei throughput-ul agenților, dar ai nevoie de un om senior care răspunde pentru ce intră în merge.",
    "Preferi să auzi multiplicatorul real, nu pe cel care sună bine.",
    "Ai o echipă mică și vrei automatizare cu AI fără să angajezi.",
  ],
  notForList: [
    "Alegi doar după tariful pe oră. Review-ul e exact valoarea pe care ai scoate-o din calcul.",
    "Vrei să auzi „100x” și nu te interesează cine verifică codul.",
    "Cauți un om detașat în echipă, cu badge și standup-uri. Aici plătești rezultate livrate, nu ore.",
    "Ești înainte de idee și nu ai un scope față de care să stabilim un preț.",
  ],
};

// Job titles and company names stay as they are; descriptions and dates in RO.
const roJobs: Record<number, { period: string; desc: string }> = {
  5: {
    period: "2024 – prezent",
    desc: "Founding engineer într-o companie fintech, construiesc produsul pe tot stack-ul.",
  },
  1: {
    period: "dec. 2022 – prezent",
    desc: "Proiecte AI cap-coadă: un pipeline de clasificare a bonurilor fiscale, o platformă de prezentări cu LLM și o platformă SaaS construită de agenți, condusă de o organizație de agenți cu mai multe sesiuni.",
  },
  2: {
    period: "sep. 2023 – sep. 2024",
    desc: "Am dezvoltat soluții automate de web scraping cu Puppeteer și un dashboard integrat cu Facebook Marketing API, care au îmbunătățit procesarea datelor și administrarea reclamelor.",
  },
  3: {
    period: "oct. 2020 – oct. 2022",
    desc: "Am construit grafica de broadcast în timp real, clasamentele interactive și overlay-urile cu statistici ale jucătorilor pentru evenimente esports live.",
  },
  4: {
    period: "iun. 2016 – sep. 2020",
    desc: "Am construit și livrat peste 300 de microsite-uri interactive pentru sondaje și colectare de date, cu termene strânse, pentru clienți enterprise din cercetare de piață.",
  },
};

export const roExperience: ExperienceCopy = {
  headingBefore: "De unde vine ",
  headingAccent: "judecata de senior",
  headingAfter: "",
  intro:
    "Experiența din spatele fiecărui review, aceeași judecată care prinde ce le scapă agenților.",
  at: "la",
  companyIcon: "– sigla companiei",
  company: "– companie",
  jobs: workExperience.map((job) => ({ ...job, ...roJobs[job.id] })),
};

export const roTestimonials: TestimonialsCopy = {
  label: "Ce spune un client",
  note: "Dintr-un proiect de dezvoltare web full-stack, dinainte de pipeline-ul cu agenți (citat original, în engleză). Dovezile pipeline-ului sunt în studiile de caz de mai sus. Pentru o dovadă pe codul tău chiar azi,",
  noteLink: "cere un teardown gratuit",
};

export const roLatest: LatestCopy = {
  headingBefore: "Ultimele de pe",
  youtube: "YouTube",
  blog: "blog",
  and: " și ",
  intro:
    "Cum lucrez cu agenții Claude Code și cum verific ce livrează. Articolele sunt în engleză.",
  watch: "Vezi pe YouTube",
  all: "Toate articolele →",
};

export const roFinalCta: FinalCtaCopy = {
  eyebrow: "De 2–3 ori, nu de 100 de ori, și iată ce greșesc agenții.",
  heading:
    "Adu-mi un backlog. Îl livrez în ritmul agenților și verific fiecare PR pentru securitate înainte să ajungă la tine.",
  body: "Tu prioritizezi și dai merge. Eu răspund pentru ce ajunge în cod.",
  button: "Programează o discuție",
  betweenBefore: "Undeva la mijloc?",
  betweenLink: `Începe cu un singur PR revizuit: 550 €, ~48 h. Rezervă un sprint în ${CREDIT_DAYS} de zile și se scade din preț →`,
  betweenHref: "/ro/servicii#entry-offer",
  capacity:
    "Stratul de review e un singur om senior, așa că rulez un singur sprint sau retainer odată.",
};

// The call steps, folded into the homepage FAQ as one answer (#54 R3).
export const roCallFaq = {
  question: "Ce se întâmplă după ce programezi o discuție?",
  steps: [
    {
      body: "Rezervi pe Calendly și scrii un rând despre ce vrei să construiești sau să livrezi. Fără prezentări, fără pregătire.",
    },
    {
      body: "Ne uităm la backlog-ul tău, la repo-ul tău sau la întrebarea ta despre AI. Îți spun ce nivel se potrivește și cât costă, sau că nu e potrivit.",
    },
    {
      body: "În cel mult o zi lucrătoare primești pe email scope-ul, prețul fix și data de start. Tu decizi. Nu te sună nimeni să insiste.",
    },
  ],
};

export const roFooter: FooterCopy = {
  headingBefore: "Nu știi ce ",
  headingAccent: "nivel",
  headingAfter: " ți se potrivește? Programează o discuție de 30 de minute.",
  body: "Spune-mi ce vrei să construiești sau să livrezi. Pleci știind ce ofertă ți se potrivește, ce acoperă și cât costă. Fără nicio obligație.",
  button: "Programează o discuție",
  emailAria: "Trimite un email lui Adrian Rusan",
  email: "sau scrie-mi un email",
  socialAria: "Rețele sociale",
  emailCapture: roEmailCapture,
};
