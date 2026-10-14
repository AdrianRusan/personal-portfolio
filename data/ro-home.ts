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
  reviewLog,
  shipVerify,
  THROUGHPUT as T,
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
  RO_TEARDOWN_EMAIL,
  roLadder,
  roTierNames,
  roTiers,
} from "@/data/ro";

// RO twin of HARNESS_PROOF (data/index.ts).
export const RO_HARNESS_PROOF =
  "peste 20 de skill-uri și peste 20 de hook-uri care caută secrete, blochează comenzile distructive și refuză un merge când o verificare nu poate rula";

// RO twin of LEDGER_PROOF (data/index.ts): same constant, same source.
const ro = (v: number) => v.toLocaleString("ro-RO");
export const RO_LEDGER_PROOF = `${W.sessions} de sesiuni · ${W.hours} de ore · ${ro(W.commits)} de commit-uri · ${W.prsOpened} de PR-uri deschise (limită superioară, nu toate merge-uite), în ${W.days} de zile, 6 aug.–10 oct. 2026, numărate din propriile mele jurnale de sesiuni.`;

// RO twin of THROUGHPUT_LINE (data/index.ts): same constant, same source.
export const RO_THROUGHPUT_LINE = `${T.mergedPrs} de PR-uri merge-uite în ${T.activeDays} de zile active (11 sep.–13 oct. 2026), proiecte pentru clienți și proprii la un loc, numărate din registrul meu de inginerie`;

// /ro title and description. #125: the description follows the EN homepage;
// the title keeps its RO term (no RO keyword data, keyword-research.md).
export const RO_HOME_TITLE = "Livrare cu agenți AI, revizuită de un senior";
export const RO_HOME_DESCRIPTION =
  "Cod scris de agenți AI, verificat linie cu linie de un inginer senior înainte să ajungă la tine. Preț fix, securitatea întâi, peste 10 ani în producție.";

// Romanian copy for the /ro homepage. Same sections and numbers as the English
// page; RO prices come from data/ro.ts (brief R7).

export { RO_GUARANTEE } from "@/data/ro";

export const roHero: HeroCopy = {
  eyebrow: "Adrian Rusan · Inginer full-stack senior, peste\u00a010\u00a0ani",
  // U+2011 keeps "backlog‑ul" whole when the H1 wraps.
  heading: "Îți livrez backlog‑ul cu agenți AI și verific personal fiecare PR.",
  body: "Întâi securitatea: injection, autentificare, secrete și controlul accesului, verificate linie cu linie înainte ca PR-ul să ajungă la tine. Te poți aștepta la un volum de 2–3 ori mai mare, nu de 100 de ori.",
  // #125: no RO teardown page yet, so the RO fallback is email (Adi, gate Q6).
  teardown: "Trimite-mi un repo pe email",
  teardownHref: RO_TEARDOWN_EMAIL,
  call: "Programează o discuție",
  guarantee: RO_GUARANTEE,
};

// RO labels for the review log, keyed by PR so a reordered EN row can't pick
// up the wrong text.
const roReviewLog: Record<string, string> = {
  "#112": "mar. 2026 · panoul meu · Un ID de job din URL ajungea într-o comandă shell. Reparat înainte de merge.",
  "#111": "mar. 2026 · panoul meu · O căutare din cerere ajungea într-o comandă shell. Reparat înainte de merge.",
  "#119": "mar. 2026 · panoul meu · O cale de fișier construită dintr-un parametru de rută, fără limitare. Reparat înainte de merge.",
  "#109": "mar. 2026 · panoul meu · Valori din baza de date într-un string de shell. L-am ratat; re-auditul din octombrie l-a găsit, plus încă 4.",
  "#39": "oct. 2026 · acest site · Verificarea de placeholder-e din studiile de caz rula doar în teste. Am mutat-o în build.",
};

export const roProofBand: ProofBandCopy = {
  ariaLabel: "Jurnal de review",
  stats: reviewLog.map((row) => ({ ...row, label: roReviewLog[row.figure] ?? row.label })),
  note: "Din proiectele mele, nu din munca pentru clienți. Studiul de caz cu 30 de PR-uri listează tot ce a prins review-ul și toate cele 5 ratări.",
};

// Keyed by tag so a reordered or added EN step can't pick up the wrong copy.
const roSteps: Record<string, { label: string; heading: string; body: string }> = {
  SHIP: {
    label: "Livrare",
    heading: "Agenții scriu volumul",
    body: `Mai mulți agenți Claude Code lucrează în paralel, în git worktree-uri separate, câte un tichet fiecare, după CLAUDE.md-ul tău. De aici vine câștigul de 2–3 ori. Ca ordin de mărime: ${RO_THROUGHPUT_LINE}.`,
  },
  VERIFY: {
    label: "Verificare",
    heading: "Verific eu fiecare PR",
    body: "Fiecare PR scris de un agent trece printr-un review adversarial, linie cu linie, înainte să ajungă la tine. Întâi securitatea: injection, autentificare, secrete și controlul accesului. Apoi corectitudinea și scope-ul. Pornesc de la ideea că agentul a greșit până când codul arată contrariul.",
  },
};

export const roShipVerify: ShipVerifyCopy = {
  heading: "Agenții scriu cod repede. Cineva trebuie să decidă ce intră în merge.",
  body: "Agenții pot scrie cea mai mare parte dintr-un backlog, inclusiv buguri de injection. În rularea mea cu 30 de PR-uri, fără teste și fără CI, review-ul a fost singura verificare.",
  punch: "Agenții fără review livrează buguri mai repede.",
  stepsHeading: "Cum funcționează: agenții livrează, eu verific",
  steps: shipVerify.map((step) => ({ ...step, ...roSteps[step.tag] })),
  multiplierLink: "Iată ce greșesc agenții →",
  sampleLink: "Vezi un exemplu de raport →",
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
    title: "30 de PR-uri scrise de agenți, revizuite: 3 căi de shell injection prinse, 5 buguri de securitate ratate",
    description:
      "Propriul meu dashboard, martie 2026: agenții au deschis 31 de PR-uri și am făcut merge la 30 după review, fără teste și fără CI. Review-ul a prins 3 căi de shell injection. Un re-audit din octombrie a găsit 5 buguri de securitate pe care review-ul le ratase.",
  },
  "honesty-gate": {
    title: "Honesty gate: cum îi împiedic pe agenți să publice fapte inventate",
    description:
      "Un landing page construit de agenți prezenta un număr de lansări drept „număr real”. Numărul real era 0. Soluția: fiecare text afișat trebuie să-și dovedească sursa.",
  },
  "nine-prs-one-afternoon": {
    title: "Nouă PR-uri revizuite într-o după-amiază: echipa de agenți care a refăcut acest site",
    description:
      "9 PR-uri merge-uite în 100 de minute, o scurtătură ratată. Nouă agenți Claude Code în worktree-uri git paralele, fiecare PR trecut întâi prin typecheck, lint, build și teste.",
  },
  "agent-cost-per-commit": {
    title: "Costul pe PR merge-uit: ce arată 3 luni din registrul meu Claude Code",
    description:
      "O reducere a contextului a scăzut costul Claude Code pe PR merge-uit de la 73 $ la 32 $ într-o lună. Apoi a crescut cu 42% până la începutul lui octombrie. Registrul, metoda și comparația pe care am greșit-o.",
  },
  "66-days-of-claude-code-by-the-numbers": {
    title: "463 de sesiuni Claude Code, numărate: promptul meu median avea 10 cuvinte",
    description:
      "463 de sesiuni Claude Code în 66 de zile, numărate de un script: un prompt median de 10 cuvinte, 2,7 sesiuni pentru fiecare oră la tastatură și 97,7% din 45 de miliarde de tokeni citiți din cache.",
  },
  "the-rules-file-my-agents-follow": {
    title: "Fișierul de reguli pe care îl urmează agenții mei: exemple de CLAUDE.md și hook-urile din spatele lor",
    description:
      "Exemple reale de CLAUDE.md dintr-un fișier de reguli cu 274 de commit-uri în spate: cinci reguli, de ce există fiecare și care sunt impuse de un hook, față de cele pe care modelul le poate ignora.",
  },
  "how-i-run-claude-code-agents-in-parallel": {
    title: "Agenți Claude Code în paralel: ce nu izolează git worktree și ce acoperă acum funcțiile native",
    description:
      "Agenți Claude Code în paralel în octombrie 2026: cele cinci lucruri pe care worktree-urile le partajează în continuare (porturi, servicii, .git, aprobări, limita de utilizare), ce rezolvă acum -w, --bg și claude agents și pentru ce folosesc încă Herdr.",
  },
  "auditing-my-claude-code-setup-with-an-agent": {
    title: "Cum auditezi un setup Claude Code: 5 verificări și ce au găsit în al meu",
    description:
      "Cinci verificări pentru un setup Claude Code: skill-uri care nu pornesc niciodată, cuvinte încărcate în fiecare sesiune, modelul pe care rulează subagenții, lucruri nefolosite și metrici care nu pot pica. Ce a găsit fiecare în al meu, cu date.",
  },
  "reviewer-agents-that-dont-trust-other-agents": {
    title: "Code review-ul cu mai mulți agenți are nevoie de urme: 85 de PR-uri, 39 de verdicte neverificabile",
    description:
      "Agenții mei de review au dat un verdict pe 85 de PR-uri între mai și iulie 2026. 39 dintre ele există doar ca rezumat de un rând scris de agentul care a scris codul, iar 3 BLOCK-uri au intrat în merge fără corecție. Designul panelului, cifrele și ce urmă ar trebui să lase un agent de review.",
  },
  "claude-code-fail-closed-hooks": {
    title: "Hook-urile Claude Code lasă acțiunea să treacă la eroare. Am testat onFailure: \"block\" pe propriile mele gate-uri",
    description:
      "Am trecut hook-urile mele Claude Code prin 20 de sesiuni headless. onFailure: \"block\" a oprit fiecare crash, timeout și cod de ieșire greșit. A ratat JSON-ul trunchiat și nu vede un hook care rulează corect, dar dă răspunsul greșit.",
  },
  "how-i-measure-claude-code-roi": {
    title: "Cum măsor ROI-ul Claude Code și cele 5 capcane care mi-au stricat cifrele",
    description:
      "Claude Code șterge transcrierile după 30 de zile, iar cifrele rămase se strică în cinci feluri. Metoda din registrul meu pentru costul pe PR merge-uit și capcanele în care a căzut.",
  },
  "what-agents-get-wrong": {
    title: "Cum faci review la codul scris de AI: pentru ce au fost 64 de corecții pe 30 de PR-uri ale agenților",
    description:
      "Am sortat toate cele 64 de corecții din review-ul a 30 de PR-uri scrise de agenți după ce era greșit: securitate, cod duplicat, tipuri, versiuni vechi de framework. Cifrele, câte un exemplu real și un checklist ordonat după frecvență.",
  },
  "catching-shell-injection-agents-wrote": {
    title: "Bugurile de shell injection scrise de agenții mei: 4 prinse, 3 ratate",
    description:
      "Agenții au scris 7 comenzi shell construite din string-uri în 30 de PR-uri. Review-ul a prins 4, dintre care 3 din input-ul cererii, și a ratat 3, una tot din input-ul cererii. Codul și verificările.",
  },
  "ai-reviewers-on-the-bugs-i-missed": {
    title: "Am dat bugurile ratate de mine unor agenți de review AI: toate cele 5 semnalate, unul lăsat să treacă",
    description:
      "Am rulat /code-review din Claude Code și un panel de trei agenți, fără indicii, pe 8 commit-uri scrise de agenți pe care le revizuisem manual. Au semnalat cele 5 buguri de securitate ratate de mine și au lăsat unul să treacă, din același motiv ca mine.",
  },

  "2-3x-not-100x": {
    title: "De 2–3 ori pe backlog-ul meu, 8% în 400 de companii: unde dispare câștigul din AI",
    description:
      "Cu cât e mai rapidă programarea cu AI? DX a măsurat sub 8% mai multe PR-uri în peste 400 de companii. PR-urile scrise de agenții mei au intrat în main în mediană la 44 de minute după deschidere, cu review cu tot. În datele LinearB, PR-urile scrise de AI așteaptă peste 16 ore doar până le preia cineva. Timpii, estimarea și de ce diferă.",
  },
};

export const roCaseStudyCards: CaseStudyCardsCopy = {
  t: {
    "Own project": "Proiect propriu",
    "Client work (NDA)": "Proiect pentru client (NDA)",
    "Own setup": "Setup propriu",
    // The caseStudyResults labels (data/work.ts).
    "shell-injection paths from request input caught in review. The study lists the 5 security bugs it missed.":
      "căi de shell injection din input-ul cererilor, prinse în review. Studiul listează cele 5 buguri de securitate pe care le-a ratat.",
    'the true count behind a landing-page line labelled "real number". The gate keeps lines like it off the page.':
      "e numărul adevărat din spatele unui rând de pe un landing page etichetat „număr real”. Gate-ul ține astfel de rânduri departe de pagină.",
    "reviewed PRs merged in 100 minutes, each through typecheck, lint, build and tests first":
      "PR-uri revizuite și merge-uite în 100 de minute, fiecare trecut întâi prin typecheck, lint, build și teste",
    "lower cost per merged PR in one month, then it rose 42% by early October":
      "cost mai mic pe PR merge-uit într-o lună, apoi a crescut cu 42% până la începutul lui octombrie",
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
    desc: "Am construit parsere de date pentru mai multe surse (-70% timp de procesare), un dashboard Next.js/Nest.js pentru Facebook Ads care a eliminat 10 ore pe săptămână de raportare manuală, plus teste E2E cu Playwright și CI în GitHub Actions.",
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
  body: "Spune-mi ce vrei să construiești sau să livrezi. Scope-ul și prețul fix vin în scris, în cel mult o zi lucrătoare.",
  button: "Programează o discuție",
  teardown: "Sau trimite-mi un repo pe email pentru un teardown gratuit →",
  teardownHref: RO_TEARDOWN_EMAIL,
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
