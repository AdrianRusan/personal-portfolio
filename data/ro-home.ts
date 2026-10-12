import type { BioCopy } from "@/components/Bio";
import type { CaseStudyCardsCopy } from "@/components/CaseStudyCards";
import type { FooterCopy } from "@/components/Footer";
import type { ClosingCtaCopy } from "@/components/ClosingCta";
import type { HeroCopy } from "@/components/Hero";
import type { OffersCopy } from "@/components/Offers";
import type { ProofBandCopy } from "@/components/ProofBand";
import type { ShipVerifyCopy } from "@/components/ShipVerify";
import type { TestimonialsCopy } from "@/components/Testimonials";
import type { WhoForCopy } from "@/components/WhoFor";
import type { PostTitles } from "@/lib/blog-types";
import {
  FINTECH_EMPLOYER,
  shipVerify,
  testimonials,
  workExperience,
  WORKFLOW_NUMBERS as W,
  type Testimonial,
} from "@/data";
import { tiers } from "@/data/ladder";
import {
  formatPriceRo,
  RO_CAPACITY,
  RO_CREDIT_TERMS,
  RO_GUARANTEE,
  roLadder,
  roTierNames,
  roTiers,
} from "@/data/ro";

// RO twin of HARNESS_PROOF (data/index.ts).
export const RO_HARNESS_PROOF =
  "peste 20 de skills și peste 20 de hooks care caută secrete, blochează comenzile distructive și refuză un merge când o verificare nu poate rula";

// RO twin of LEDGER_PROOF (data/index.ts): same constant, same source.
const ro = (v: number) => v.toLocaleString("ro-RO");
export const RO_LEDGER_PROOF = `${W.sessions} de sesiuni · ${W.hours} de ore · ${ro(W.commits)} de commit-uri · ${W.prsOpened} de PR-uri deschise (limită superioară, nu toate cu merge) — ${W.days} de zile, 6 aug.–10 oct. 2026, numărate din propriile mele jurnale de sesiuni.`;

// Romanian copy for the /ro homepage. Same sections and numbers as the English
// page; RO prices come from data/ro.ts (brief R7).

export { RO_GUARANTEE } from "@/data/ro";

export const roHero: HeroCopy = {
  eyebrow: "Adrian Rusan · Inginer full-stack senior, peste\u00a010\u00a0ani",
  // U+2011 keeps "backlog‑ul" whole when the H1 wraps.
  heading: "Îți livrez backlog‑ul cu agenți AI și verific personal fiecare PR.",
  body: "Întâi securitatea: injection, autentificare, secrete și controlul accesului, verificate linie cu linie înainte ca PR-ul să ajungă la tine. Te poți aștepta la un volum de 2–3 ori mai mare, nu de 100 de ori.",
  teardown: "Teardown gratuit (EN)",
  call: "Programează o discuție",
  guarantee: RO_GUARANTEE,
};

export const roProofBand: ProofBandCopy = {
  ariaLabel: "Dovezi în cifre",
  stats: [
    { figure: "30", label: "PR-uri revizuite în mai puțin de 3 zile" },
    {
      figure: "3",
      label: "căi de shell injection din input-ul cererilor, prinse în review înainte de merge",
    },
    { figure: "1", label: "ratată, iar studiul de caz arată care anume" },
  ],
  note: "Toate cele trei cifre vin dintr-o singură rulare documentată, pe propriul meu panou de administrare, în martie 2026.",
};

// Keyed by tag so a reordered or added EN step can't pick up the wrong copy.
const roSteps: Record<string, { label: string; heading: string; body: string }> = {
  SHIP: {
    label: "Livrare",
    heading: "Agenții scriu volumul",
    body: "Mai mulți agenți Claude Code lucrează în paralel, în git worktrees separate. Fiecare primește un tichet și urmează convențiile din CLAUDE.md-ul tău. De aici vine câștigul de 2–3 ori: throughput-ul unei echipe mici, de la un singur operator și un harness.",
  },
  VERIFY: {
    label: "Verificare",
    heading: "Verific eu fiecare PR",
    body: "Fiecare PR scris de un agent trece printr-un review adversarial, linie cu linie, înainte să ajungă la tine. Întâi securitatea: injection, autentificare, secrete și controlul accesului. Apoi corectitudinea și scope-ul. Pornesc de la ideea că agentul a greșit până când codul arată contrariul.",
  },
};

export const roShipVerify: ShipVerifyCopy = {
  heading: "Backlog-ul crește, iar codul scris de agenți are nevoie de review",
  body: "Agenții pot scrie cea mai mare parte dintr-un backlog. Scriu și buguri de injection. În rularea mea cu 30 de PR-uri, fără teste și fără CI, review-ul a fost singura verificare.",
  punch: "Agenții fără review livrează buguri mai repede.",
  stepsHeading: "Cum funcționează: agenții livrează, eu verific",
  steps: shipVerify.map((step) => ({ ...step, ...roSteps[step.tag] })),
  multiplierLink: "Iată ce greșesc agenții →",
  sampleLink: "Vezi un raport exemplu →",
};

export const roBio: BioCopy = {
  heading: "Cine îți verifică codul",
  body: `Sunt Adrian Rusan, inginer full-stack senior cu peste 10 ani în producție. Lucrez prin propria firmă, cel mai recent ca founding engineer pentru ${FINTECH_EMPLOYER}. Înainte de asta, am făcut grafica live pentru transmisiunile PGL Major, urmărite simultan de peste 2 milioane de spectatori, peste 300 de proiecte de sondaje la Ipsos pentru branduri globale și dashboard-uri de reclame la GoSocial. Agenții rulează pe harness-ul meu: ${RO_HARNESS_PROOF}. Fiecare PR îl citesc tot eu.`,
  onGithub: "Adrian Rusan pe GitHub",
  onLinkedin: "Adrian Rusan pe LinkedIn",
  onX: "Adrian Rusan pe X",
  onYoutube: "Adrian Rusan pe YouTube",
};

const roTagline = Object.fromEntries(roTiers.map((t) => [t.tier, t.tagline]));

export const roOffers: OffersCopy = {
  heading: "Oferte și prețuri",
  intro: "Fiecare ofertă are un preț de pornire afișat, iar prețul final îl stabilim înainte să încep lucrul. ",
  credit: RO_CREDIT_TERMS,
  // A7: yes.
  priceNote: "Prețuri pentru firme cu sediul în România.",
  tiers: tiers.map(({ tier }) => ({
    tier,
    name: roTierNames[tier],
    tagline: roTagline[tier] ?? "",
  })),
  ladder: roLadder,
  formatPrice: formatPriceRo,
  href: "/ro/servicii#ladder",
  more: "Vezi toate ofertele și ce includ →",
  capacity: RO_CAPACITY,
};

// RO titles and descriptions for the cards on /ro (case studies, benchmark,
// Latest). The posts themselves stay in English; the cards say so once.
export const roPostTitles: PostTitles = {
  "30-reviewed-prs-3-vulnerabilities": {
    title: "30 de PR-uri revizuite, 3 căi de shell injection prinse",
    description:
      "Propriul meu dashboard de administrare, martie 2026: agenții au deschis 31 de PR-uri în mai puțin de trei zile și am făcut merge la 30 după review, fără teste și fără CI. Review-ul a prins 3 căi de shell injection și a ratat una.",
  },
  "honesty-gate": {
    title: "Honesty gate: cum opresc faptele inventate în site‑urile construite de agenți",
    description:
      "Un landing page prezenta ca real un număr de lansări. Numărul real era 0. Iată gate-ul care acum leagă fiecare text afișat de o sursă.",
  },
  "nine-prs-one-afternoon": {
    title: "Nouă PR-uri revizuite într-o după-amiază: echipa de agenți care a refăcut acest site",
    description:
      "Un orchestrator, nouă agenți Claude Code în worktree-uri paralele, nouă PR-uri cu merge în 100 de minute. Fiecare a trecut întâi printr-un gate de review.",
  },
  "agent-cost-per-commit": {
    title: "De ce măsor acum costul agenților în fiecare săptămână",
    description:
      "O reducere a contextului a scăzut costul pe commit al agenților cu 68% într-o lună. Un registru săptămânal a prins revenirea din septembrie, odată cu mult mai multe rulări automate.",
  },
  "66-days-of-claude-code-by-the-numbers": {
    title: "66 de zile de Claude Code, în cifre",
    description:
      "463 de sesiuni, 335 de ore, 3.599 de subagenți și 45 de miliarde de tokeni. Ce spun propriile mele jurnale Claude Code despre bunele practici, numărate de un script, nu din memorie.",
  },
  "the-rules-file-my-agents-follow": {
    title: "Fișierul de reguli pe care îl urmează agenții mei: exemple de CLAUDE.md din 270 de commit-uri",
    description:
      "Exemple reale de CLAUDE.md dintr-un fișier de reguli ajustat de-a lungul a 270 de commit-uri: gate-uri care refuză când nu pot verifica, ritmul commit-urilor, repari doar bugul raportat și regulile pe care le-am șters.",
  },
  "how-i-run-claude-code-agents-in-parallel": {
    title: "Cum rulez agenți Claude Code în paralel (worktrees, Herdr, un singur brief)",
    description:
      "Agenți Claude Code în paralel, în practică: un git worktree pentru fiecare agent, un terminal multiplexer care îi rulează, un brief care le răspunde la întrebări și review-ul ca singurul pas făcut pe rând.",
  },
  "auditing-my-claude-code-setup-with-an-agent": {
    title: "43 din 65 de skill-uri nu porniseră în 70 de zile: auditul setup-ului meu Claude Code",
    description:
      "Zece audituri ale propriului meu setup Claude Code, rulate de agenți. Majoritatea skill-urilor nu porneau niciodată, regulile explicau cum să gândești, iar metricile erau greșite. Iată ce s-a schimbat.",
  },
  "reviewer-agents-that-dont-trust-other-agents": {
    title: "Agenți de review care nu au încredere în alți agenți",
    description:
      "Agenți de review construiți pe neîncredere: un panel cu trei roluri în care câștigă verdictul cel mai strict, o buclă care triază comentariile boților și agenți care încearcă să infirme fiecare constatare dintr-un audit.",
  },
  "claude-code-fail-closed-hooks": {
    title: "Claude Code are acum hook-uri care refuză la eroare. De ce le-am construit pe ale mele înainte",
    description:
      "Claude Code 2.1.295 a adăugat onFailure: \"block\" pentru hook-uri. Ce acoperă, ce nu vede în interiorul scriptului și cum refuză hook-urile mele când nu pot verifica.",
  },
  "what-agents-get-wrong": {
    title: "Cum faci review la codul scris de AI: 6 greșeli ale agenților care trec de teste",
    description:
      "Șase categorii de greșeli recurente pe care le prind în review-ul codului generat de AI: gate-uri de securitate care lasă totul să treacă la eroare, scope creep, erori înghițite în tăcere și altele. Iată ce să cauți.",
  },
  "catching-shell-injection-agents-wrote": {
    title: "Bugurile de shell injection scrise de agenții mei și cel pe care l-am ratat",
    description:
      "Trei căi de shell injection din input-ul cererilor, scrise de agenți și prinse în review înainte de merge, într-un repo fără teste și fără CI. Plus una pe care am ratat-o și ce am învățat.",
  },
  "2-3x-not-100x": {
    title: "De 2–3 ori, nu de 100 de ori: cifra sinceră despre viteza programării cu AI",
    description:
      "Cu cât e mai rapidă, de fapt, programarea cu AI? Răspunsul măsurat e de 2–3 ori, nu de 10–100 de ori. Iată metodologia, 30 de PR-uri revizuite în mai puțin de 3 zile, și ce lasă deoparte multiplicatorul.",
  },
};

export const roCaseStudyCards: CaseStudyCardsCopy = {
  t: {
    "Own project": "Proiect propriu",
    "Client work (NDA)": "Proiect pentru client (NDA)",
    "Own setup": "Setup propriu",
    // The caseStudyResults labels (data/work.ts).
    "shell-injection paths from request input, caught in review before merge":
      "căi de shell injection din input-ul cererilor, prinse în review înainte de merge",
    'the true count behind a landing-page line labelled "real number". The gate keeps lines like it off the page.':
      "e numărul adevărat din spatele unui rând de pe un landing page etichetat „număr real”. Gate-ul ține astfel de rânduri departe de pagină.",
    "reviewed PRs merged in 100 minutes, each through a review gate first":
      "PR-uri revizuite, cu merge în 100 de minute, fiecare trecut întâi printr-un gate de review",
    "lower cost per commit in one month, then it crept back":
      "cost pe commit mai mic într-o lună, apoi a crescut din nou",
  },
  heading: "Studii de caz",
  // The one note for the whole page (R1-F21): studies and posts are in English.
  lead: "Studiile de caz și articolele sunt în engleză.",
  read: "Citește →",
  all: "Toate studiile de caz →",
  titles: roPostTitles,
};

export const roWhoFor: WhoForCopy = {
  heading: "Pentru cine e",
  forHeading: "Potrivit dacă",
  notForHeading: "Nepotrivit dacă",
  forList: [
    "Conduci echipa de engineering, ai fondat compania sau răspunzi de livrare într-un startup sau scaleup finanțat, mai ales acolo unde review-ul de securitate e obligatoriu: fintech, sănătate, plăți, orice atinge bani sau date personale.",
    "Te îneci în backlog și nu poți angaja destul de repede.",
    "Vrei throughput-ul agenților, dar ai nevoie de un om senior care răspunde pentru ce intră în merge.",
  ],
  notForList: [
    "Alegi doar după tariful pe oră. Review-ul e exact valoarea pe care ai scoate-o din calcul.",
    "Vrei să auzi „100x” și nu te interesează cine verifică codul.",
    "Cauți un om detașat în echipă, cu badge și standup-uri. Vând PR-uri revizuite, la preț fix.",
  ],
};

// Job titles and company names stay as they are; descriptions and dates in RO.
const roJobs: Record<number, { period: string; desc: string; client?: string }> = {
  1: {
    period: "dec. 2022 – prezent",
    client: `Client: ${FINTECH_EMPLOYER}, founding engineer (contract), din sep. 2024. Am construit platforma de bază și unelte interne cu AI; am condus o echipă de doi ingineri.`,
    desc: "Proiecte AI cap-coadă: o platformă de prezentări cu LLM și un SaaS construit de agenți, coordonați pe mai multe sesiuni.",
  },
  2: {
    period: "sep. 2023 – sep. 2024",
    desc: "Am construit parsere de date pentru mai multe surse (-70% timp de procesare), un dashboard Next.js/Nest.js pentru Facebook Ads care a eliminat 10 ore pe săptămână de raportare manuală și teste E2E cu Playwright, cu CI în GitHub Actions.",
  },
  3: {
    period: "oct. 2020 – oct. 2022",
    desc: "Am construit grafica și vizualizările live din transmisiunile PGL Major CS:GO, urmărite de peste 2 milioane de spectatori simultan.",
  },
  4: {
    period: "iun. 2016 – sep. 2020",
    desc: "Am livrat la termen peste 300 de proiecte de sondaje pentru branduri globale și am fost mentor pentru trei developeri juniori.",
  },
};

export const roWorkExperience = workExperience.map((job) => ({
  ...job,
  ...roJobs[job.id],
}));

export const roFaqHeading = "Întrebările pe care le pun CTO-ii";

// The call steps, folded into the homepage FAQ as one answer (#54 R3).
export const roCallFaq = {
  question: "Ce se întâmplă după ce programezi o discuție?",
  steps: [
    {
      body: "Rezervi pe Calendly și scrii un rând despre ce vrei să construiești sau să livrezi. Rândul ăsta e toată pregătirea.",
    },
    {
      body: "Ne uităm la backlog-ul tău, la repo-ul tău sau la întrebarea ta despre AI. Îți spun ce nivel se potrivește și cât costă, sau că nu e potrivit.",
    },
    {
      body: "În cel mult o zi lucrătoare primești pe email scope-ul, prețul fix și data de start. Decizia e a ta și nu revin decât dacă îmi ceri.",
    },
  ],
};

export const roClosingCta: ClosingCtaCopy = {
  heading: "Ai un backlog? Programează o discuție de 30 de minute.",
  body: "Spune-mi ce vrei să construiești sau să livrezi. Pleci știind ce ofertă ți se potrivește și cât costă.",
  button: "Programează o discuție",
  teardown: "Sau trimite un repo pentru un teardown gratuit, în engleză →",
};

export const roFooter: FooterCopy = {
  about: "Despre",
  aboutHref: "/ro/despre",
  contact: "Contact",
  contactHref: "/ro/contact",
  privacy: "Confidențialitate",
  rss: "RSS",
  socialAria: "Rețele sociale",
  socialLabels: {
    1: "Adrian Rusan pe GitHub",
    2: "Adrian Rusan pe X",
    3: "Adrian Rusan pe LinkedIn",
  },
};

// #76: the same quotes in Romanian, approved word for word.
export const roTestimonials = {
  tufeanu: {
    ...testimonials.tufeanu,
    quote: "Meticulos, smart și proactiv. Un mare meseriaș. Treabă beton.",
  },
  stroe: {
    ...testimonials.stroe,
    quote:
      "Adrian a fost de încredere la fiecare pas. A dus două proiecte de produs în paralel, ne-a ținut la curent de fiecare dată și ne-a spus din timp când o estimare era prea optimistă. Preia problemele și le duce mai departe fără să fie nevoie să-l împingă cineva.",
  },
  doros: {
    ...testimonials.doros,
    quote:
      "O analiză atentă. A prins contradicțiile din handoff înainte să se scrie cod, iar corecțiile lui au fost chiar utile.",
    company: "agenție parteneră",
  },
  iojiban: {
    ...testimonials.iojiban,
    quote:
      "Orice semnalam, rezolva imediat. Task-urile dispăreau la fel de repede cum le adăugam.",
  },
} satisfies Record<keyof typeof testimonials, Testimonial>;

export const roTestimonialsSection: TestimonialsCopy = {
  heading: "Ce spun oamenii cu care am lucrat",
  items: [roTestimonials.tufeanu, roTestimonials.stroe],
};
