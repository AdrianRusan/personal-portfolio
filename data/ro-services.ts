import { offerById } from "@/data/ladder";
import { CALENDLY_URL, FINTECH_EMPLOYER } from "@/data";
import { withTierPrefill } from "@/lib/calendly";
import type { DeliverySprintCopy } from "@/components/services/DeliverySprint";
import type { EntryOfferCopy } from "@/components/services/EntryOffer";
import type { HarnessSetupCopy } from "@/components/services/HarnessSetup";
import type { LadderContent } from "@/components/services/Ladder";
import type { ProcessStepsCopy } from "@/components/services/ProcessSteps";
import type { RetainerCopy } from "@/components/services/Retainer";
import type { ServicesFaqCopy } from "@/components/services/ServicesFaq";
import type { ServicesFinalCtaCopy } from "@/components/services/ServicesFinalCta";
import type { ServicesHeroCopy } from "@/components/services/ServicesHero";
import type { TrustStripCopy } from "@/components/services/TrustStrip";
import {
  euro,
  formatPriceRo,
  RO_CREDIT_TERMS,
  RO_GUARANTEE,
  roLadder,
  roSprintDurations,
  roSprintSizes,
  roTierNames,
  roTiers,
} from "@/data/ro";

// /ro/servicii copy. Prices follow data/ro.ts (55% of the global ladder).

const eur = euro;
const prs = (i: number) => roSprintSizes[i]!.prs.join("–");
const standard = roSprintSizes[1]!;

export const roServicesHero: ServicesHeroCopy = {
  heading: "Backlog-ul tău, livrat de agenți. Fiecare PR, verificat de mine.",
  intro:
    "Tu alegi tichetele, eu fixez prețul înainte să începem. Agenții AI scriu codul. Eu verific fiecare PR linie cu linie, întâi securitatea, apoi ți-l trimit.",
  cta: "Programează o discuție",
  ctaSource: "ro_services_hero",
  tiersLink: `Primul sprint de la ${eur(roSprintSizes[0]!.price)}. Vezi toate prețurile ↓`,
  guarantee: RO_GUARANTEE,
  proof:
    "30 de PR-uri revizuite în sub 3 zile · 3 căi de shell injection prinse înainte de merge",
  proofLink: {
    label: "Vezi ce au greșit agenții (EN) →",
    href: "/work/30-reviewed-prs-3-vulnerabilities",
  },
};

// The global ladder links its Build/Ship offers to in-page sections; /ro/servicii
// has the same sections, so the RO ladder uses the same anchors.
const roLadderAnchors: Record<string, string> = {
  harness: "#harness",
  "reviewed-pr": "#entry-offer",
  sprint: "#sprint",
  retainer: "#retainer",
};

export const roServicesLadder: LadderContent = {
  offers: roLadder.map((offer) => {
    const anchor = roLadderAnchors[offer.id];
    return anchor
      ? { ...offer, ctas: [{ label: "Ce include", href: anchor }] }
      : offer;
  }),
  tiers: roTiers,
  tierName: (tier) => roTierNames[tier],
  format: formatPriceRo,
  heading: "Prețuri",
  intro: `Începe cu o sesiune de 110 € sau mergi direct la un sprint. ${RO_CREDIT_TERMS} Toate prețurile sunt în EUR, fără TVA.`,
  // A7: RO prices are for Romanian-registered firms.
  note: "Prețuri pentru firme cu sediul în România.",
  limited: "Unul pe rând",
  capacity:
    "Verific fiecare PR personal, așa că lucrez la un singur sprint sau retainer în același timp. Dacă sunt ocupat, îți spun data următoare la care putem începe.",
  source: "ro_services_ladder",
};

export const roProcessSteps: ProcessStepsCopy = {
  heading: "Cum se desfășoară un sprint",
  intro:
    "Patru pași. Scope-ul și prețul se fixează în ziua 0, deci nu există facturi care o iau razna.",
  steps: [
    {
      tag: "1 · Scope",
      heading: "Discuția de scope (ziua 0)",
      body: "Stabilim PR-urile, ce înseamnă „gata” pentru fiecare, accesul la repo și convențiile tale. Aici se fixează scope-ul și prețul. Dacă nu ne potrivim, afli din prima discuție.",
    },
    {
      tag: "2 · Livrare",
      heading: "Agenții scriu codul (zilele 1–N)",
      body: "Fiecare tichet merge la un agent Claude Code în propriul git worktree, după CLAUDE.md-ul tău. Mai mulți rulează în paralel, și de aici vine accelerarea de 2–3 ori.",
    },
    {
      tag: "3 · Review",
      heading: "Verific fiecare PR (continuu)",
      body: "Întâi securitatea (injection, autentificare, secrete, controlul accesului), apoi corectitudinea și scope-ul. Pornesc de la premisa că agentul a greșit până când codul arată contrariul. Pasul ăsta nu se grăbește cu mai mulți agenți, de aceea lucrez cu un singur client odată.",
      link: {
        label: "Cum funcționează review-ul →",
        href: "/ro#ship-verify",
      },
      verify: true,
    },
    {
      tag: "4 · Predare",
      heading: "Predarea (ultima zi)",
      body: "Primești PR-urile revizuite pe branch-uri reale în repo-ul tău, problemele de securitate găsite pe tot sprintul și o notă despre ce au greșit agenții în mod repetat. Tu faci merge.",
    },
  ],
};

const roPrices = [
  eur(roSprintSizes[0]!.price),
  eur(standard.price),
  `de la ${eur(roSprintSizes[2]!.price)}`,
];

export const roDeliverySprint: DeliverySprintCopy = {
  eyebrow: "Oferta principală",
  heading: "Sprint de livrare",
  intro:
    "Un set fix de pull request-uri gata de producție. Agenții AI le scriu, iar eu le verific pe fiecare linie cu linie, întâi securitatea. Stabilim prețul înainte să începem.",
  deliveredHeading: "Ce primești",
  deliverables: [
    {
      lead: "Un număr fix de PR-uri gata de merge",
      rest: "pe branch-uri reale în repo-ul tău, revizuite și pregătite pentru merge-ul echipei tale.",
    },
    {
      lead: "O notă de review pentru fiecare PR:",
      rest: "ce a scris agentul, ce a prins și a schimbat review-ul și riscul rămas, dacă există.",
    },
    {
      lead: "Raportul de securitate, care rămâne la tine:",
      rest: "fiecare clasă de vulnerabilități verificată și tot ce s-a găsit și s-a reparat.",
    },
    {
      lead: "O listă cu ce au greșit agenții",
      rest: "în codul tău, ca echipa să știe unde să se uite de acum înainte.",
    },
  ],
  sampleLink: "Vezi un raport de securitate exemplu (EN) →",
  pricingHeading: "Prețurile sprinturilor",
  rowHeader: "Criteriu",
  // ponytail: EN €10–14k scaled by the same 55% as data/ro.ts; confirm with Adi.
  pricingLead:
    "O lună de contractor senior costă ~5.500–7.700 €, și nimeni nu verifică acel cod pentru securitate.",
  pricingRest: `Un Sprint Standard costă ${eur(standard.price)} pentru ${prs(1)} PR-uri, fiecare verificat pentru securitate, plus raportul de securitate.`,
  columns: withTierPrefill(
    CALENDLY_URL,
    [
      { name: "Sprint Pilot", badge: "Primul sprint", featured: true },
      { name: "Sprint Standard", badge: "Cel mai bun preț per PR" },
      { name: "Sprint Extins" },
    ],
    roPrices,
  ),
  rows: [
    {
      label: "Potrivit pentru",
      values: [
        "O primă colaborare, ca să vedem cum lucrăm împreună",
        "Un backlog constant, rezolvat în una sau două săptămâni",
        "O suprafață mai mare, cu mai multe PR-uri și review mai profund",
      ],
    },
    {
      label: "Cam cât",
      values: [
        `O funcționalitate bine delimitată (~${prs(0)} PR-uri)`,
        `O lună de contractor, revizuită (~${prs(1)} PR-uri)`,
        `O zonă mare a produsului, în profunzime (~${prs(2)}+ PR-uri)`,
      ],
    },
    {
      label: "Durată",
      values: roSprintDurations,
    },
    {
      label: "Preț",
      values: roPrices,
    },
  ],
  cta: "Programează o discuție",
  pricingNote:
    "Suma exactă se stabilește la discuția de scope, înainte să înceapă orice lucru.",
  notHeading: "Ce nu este",
  notList: [
    "Muncă fără limită. Numărul de PR-uri și scope-ul se fixează în ziua 0, iar scope nou înseamnă un sprint nou.",
    "Un om închiriat în echipă. Cumperi PR-uri revizuite, și nimeni nu intră la standup-urile voastre.",
    "Arhitectură greenfield. Proiectarea unui sistem nou de la zero e o altă discuție.",
    "Auto-merge în producție. Decizia finală de merge și deploy rămâne la echipa ta, ca procesul tău de change control să rămână intact.",
    "Mentenanță continuă. On-call-ul și întreținerea după predare țin de retainer.",
  ],
  guaranteesHeading: "Garanții",
  guarantees: [
    {
      title: "Securitate",
      body: "Fiecare PR trece printr-un review de securitate documentat înainte să-l vezi. Dacă mai târziu apare o vulnerabilitate din aria review-ului într-un PR marcat de mine ca revizuit, o repar gratuit și refac review-ul pe lotul din jurul ei.",
    },
    {
      title: "Primul PR",
      body: "Dacă primul PR nu e unul pe care l-ai face merge, nu îl plătești. Riscul tău e cel mai mare înainte să fi livrat ceva.",
    },
  ],
  paymentHeading: "Plată",
  payment:
    "50% ca să rezervi slotul, 50% la predare. Un Sprint Pilot se poate plăti integral în avans. Vrei sprinturi unul după altul? Vezi retainerul, mai jos.",
};

export const roEntryOffer: EntryOfferCopy = {
  eyebrow: "Nu ești gata pentru un sprint?",
  heading: "Un PR revizuit: 550 €",
  intro:
    "Un tichet din backlog-ul tău, livrat și revizuit, înainte să te angajezi la un sprint.",
  steps: [
    "Îmi trimiți un tichet real: un bug sau o funcționalitate mică, deja la rând.",
    "Un agent îl scrie. Eu verific diff-ul linie cu linie, întâi securitatea, la fel ca pentru fiecare PR din sprint.",
    "Primești PR-ul gata de merge în repo-ul tău, plus un raport de o pagină cu ce a prins review-ul.",
    `Livrat în ${offerById(roLadder, "reviewed-pr").duration}.`,
  ],
  cta: "Începe cu un PR",
  emailSubject: "PR revizuit (550 €)",
  emailBody: "Link către repo sau tichet:\n\nCe trebuie livrat:\n",
  emailLink: "Preferi e-mailul? Trimite tichetul →",
};

export const roTrustStrip: TrustStripCopy = {
  ariaLabel: "Experiență",
  label: "Peste 10 ani de software livrat în producție, cu",
  employers: [FINTECH_EMPLOYER, "GoSocial", "PGL Esports", "Ipsos"],
  study: {
    tag: "Proiect propriu",
    title: "30 de PR-uri revizuite, 3 căi de shell injection prinse",
    body: "Propriul meu panou de administrare: agenții au deschis 31 de PR-uri în sub trei zile, iar 30 au ajuns la review. Fără teste și fără CI, review-ul a fost singura verificare. A prins 3 căi de injection înainte de merge și a scăpat una, despre care scriu în studiu.",
    href: "/work/30-reviewed-prs-3-vulnerabilities",
    cta: "Citește studiul de caz (EN) →",
  },
  sampleLink: "Vezi un raport de securitate exemplu (EN) →",
};

export const roRetainer: RetainerCopy = {
  heading: "Retainer lunar",
  intro:
    "PR-uri revizuite în fiecare lună, într-un ritm stabilit de la început. Locul tău de review rămâne rezervat.",
  deliveredHeading: "Ce primești în fiecare lună",
  deliverables: [
    "Un număr stabilit de PR-uri, fiecare verificat la fel ca într-un sprint.",
    "Un registru continuu cu problemele de securitate și o notă lunară despre ce au greșit agenții în codul tău.",
    "Acces async la mine pentru întrebări despre livrare și review.",
    "Prioritate la timpul meu de review: clienții cu retainer își păstrează locul înaintea sprinturilor punctuale.",
  ],
  startsAt: "De la",
  price: "2.200 €",
  perMonth: "/lună",
  minimum: "Minimum 3 luni, de la 6.600 €",
  pricingBody:
    "Numărul lunar de PR-uri și prețul per PR se stabilesc în discuție, după repo-ul și ritmul tău. Prețul per PR iese cu aproximativ 20–30% sub cel al unui sprint punctual.",
  cta: "Programează o discuție",
  guaranteesHeading: "Garanții",
  guarantees: [
    {
      title: "Garanția primei luni",
      body: "Stabilim ritmul de la început. Dacă luna 1 nu îl atinge, te poți opri acolo fără să mai datorezi nimic.",
    },
  ],
  securityNote:
    "Fiecare PR din retainer are și garanția de securitate de la sprint.",
  termsHeading: "Condiții",
  terms: [
    "Volumul lunar are o limită. Ce depășește se mută în luna următoare sau într-un sprint suplimentar.",
    "On-call 24/7 nu e inclus. Se poate adăuga separat, cu preț separat.",
    "Trei luni la început, apoi lună de lună, cu preaviz de 30 de zile.",
  ],
};

export const roHarnessSetup: HarnessSetupCopy = {
  heading: "Agent Fleet Setup: setup-ul meu de agenți, în repo-ul tău",
  intro:
    "Instalez harness-ul pe care îl folosesc eu în repo-ul tău, adaptat stack-ului și convențiilor tale, ca echipa ta să poată rula agenți cu review gates deja puse.",
  deliveredHeading: "Ce primești",
  deliverables: [
    "Un setup Claude Code funcțional pe repo-ul tău: regulile de proiect în CLAUDE.md, un worktree pentru fiecare agent și integrarea în CI.",
    "Checklist-ul meu de review de securitate, cel care a prins 3 căi de shell injection pe propria mea rulare de 30 de PR-uri, adaptat stack-ului tău.",
    "O sesiune practică: rulez un lot live pe backlog-ul tău cu echipa de față, apoi echipa rulează lotul următor, iar eu fac review.",
    "Un playbook scris: cum împarți tichetele, ce verifici întâi și unde verificarea umană e obligatorie.",
    "2 săptămâni de suport async după predare.",
  ],
  rulesLink: "Vezi fișierul de reguli al agenților mei (EN) →",
  startsAt: "De la",
  price: "2.200 €",
  pricingBody:
    "Un repo: setup-ul agenților, gate-uri de securitate în CI, checklist-ul de review, playbook-ul și suportul. Mai multe repo-uri, workshop-uri sau pair programming cresc scope-ul, iar prețul îl fixăm în discuție, înainte de orice lucru.",
  cta: "Programează o discuție",
  termsHeading: "Condiții",
  terms: [
    "Doar configurare și predare. Pentru livrare continuă, vezi sprintul sau retainerul.",
    "Echipa ta participă la sesiuni, pentru că scopul e să poată rula totul fără mine.",
    "Licențele Claude Code și alte unelte le aduci tu.",
    "Nu păstrez acces după predare, decât dacă adaugi un retainer.",
  ],
  guaranteeHeading: "Garanție",
  guaranteeLead: "Setup funcțional.",
  guaranteeBody:
    "Până la final, echipa ta a livrat singură cel puțin un PR revizuit prin setup, cu mine de față. Dacă nu, sesiunile continuă gratuit până se întâmplă.",
};

// /ro/servicii FAQ: the same 8 questions, same order, as servicesFaqCopy.
export const roServicesPageFaq: ServicesFaqCopy = {
  heading: "Întrebări",
  items: [
    {
      question:
        "Cât de bun e codul dacă l-au scris agenți AI, și ce se întâmplă dacă agenții greșesc?",
      answer:
        "Codul scris de agenți e doar punctul de plecare. Fiecare PR trece printr-un review linie cu linie care pornește de la ideea că agentul a greșit până când codul arată contrariul. Când un agent nu se descurcă cu un tichet, îl repar sau îl scriu eu: o rulare eșuată mă costă pe mine timp, iar prețul acoperă rezultatul revizuit. Agenții îți dau de 2–3 ori mai mult volum și greșesc lucruri anume, așa că fiecare sprint vine cu un registru cu ce a prins review-ul în codul tău.",
    },
    {
      question:
        "Agenții nesupravegheați livrează vulnerabilități. Cum tratezi securitatea?",
      answer:
        "Așa e, de aceea securitatea e prima trecere din fiecare review: injection, autentificare, secrete, controlul accesului. Pe propria mea rulare de 30 de PR-uri, un repo fără teste, review-ul a prins 3 căi de shell injection din input-ul cererii înainte de merge. Ce scap din aria review-ului e acoperit de garanția de securitate din condițiile sprintului.",
    },
    {
      question:
        "Al cui e codul, ce se întâmplă cu datele noastre și semnezi un NDA?",
      answer:
        "Totul e al tău de la primul commit. Semnez NDA-ul sau DPA-ul tău înainte să primesc acces la repo și lucrez în repository-ul tău, sub controalele tale de acces. Ce unelte de AI ating codul tău stabilim în scris, înainte; dacă politica firmei exclude una, nu rulează pe repo-ul tău. Codul tău nu e refolosit pentru alt client și nu e publicat, iar accesul meu se încheie la predare, dacă nu ai un retainer.",
    },
    {
      question: "Ce stack-uri și limbaje verifici?",
      answer:
        "TypeScript și JavaScript cap-coadă: Node, Nest.js, React, Next.js, Tailwind, SQL și MongoDB. Acolo s-au dus cei peste 10 ani de lucru în producție. Trecerea de securitate (injection, autentificare, secrete, controlul accesului) se aplică în orice limbaj, dar dacă stack-ul tău e în afara listei, îți spun asta în discuție.",
    },
    {
      question: "În ce fus orar lucrezi?",
      answer:
        "România (EET/EEST, UTC+2/+3), cu suprapunere completă cu orele de lucru din Europa și cu dimineața echipelor de pe Coasta de Est a SUA. Zi de zi lucrăm async, în scris: primești PR-urile, notele de review și un update scurt, așa că nimeni nu așteaptă după o ședință.",
    },
    {
      question: "Ce înseamnă un PR?",
      answer:
        "Un tichet din backlog-ul tău, livrat ca un singur pull request care se poate revizui: un bug reparat, o funcționalitate mică sau o bucată dintr-una mai mare. Un tichet prea mare ca să fie revizuit bine dintr-o trecere se împarte la discuția de scope, înainte să fixăm prețul, așa că știi de la început câte PR-uri primești.",
    },
    {
      question:
        "Cum funcționează plata, cine facturează și cine plătește consumul de LLM și API?",
      answer:
        "Fiecare preț e fix înainte să înceapă munca, în EUR, fără TVA. Facturez în EUR prin firma mea din România; în USD la cerere. Sesiunea de strategie se plătește în avans. Sprinturile: 50% ca să rezervi slotul și 50% la predare; PR-ul revizuit se plătește după livrare, iar retainerele se facturează lunar. Consumul de LLM/API e inclus în prețul fix pentru sprinturi și PR-urile revizuite. Agent Fleet Setup rulează pe licențele Claude Code ale echipei tale.",
    },
    {
      question:
        "De ce nu un contractor plătit pe zi, o agenție sau mai mulți ingineri?",
      answer:
        "Capacitatea continuă e retainerul, de la 2.200 €/lună. O agenție îți vinde orele unei echipe, cu adaos, iar oamenii noi se acomodează în luni de zile. Un sprint îți vinde PR-uri revizuite la un preț fixat dinainte, iar primul ajunge în câteva zile. Dacă vrei să testezi întâi colaborarea, începe cu un singur PR revizuit.",
    },
  ],
};

// The full 14-question list, kept for the /ro homepage picks (homeFaq).
// Same questions, same order as `faqs` (data/index.ts); RO prices from R7.
export const roServicesFaq: ServicesFaqCopy = {
  heading: "Întrebări",
  items: [
    {
      question: "Cum poate fi calitatea bună dacă codul l-au scris agenți AI?",
      answer:
        "Pentru că codul scris de agenți e doar punctul de plecare. Fiecare PR trece printr-un review senior, linie cu linie, care pornește de la ideea că agentul a greșit până se dovedește contrariul. Agenții îți dau de 2–3 ori mai mult volum, nu de 100 de ori, și greșesc lucruri anume. Review-ul e locul unde sunt prinse, iar fiecare sprint vine cu un registru cu ce s-a prins în codul tău.",
    },
    {
      question:
        "Ce se întâmplă dacă agenții greșesc sau nu se descurcă cu tichetul?",
      answer:
        "Atunci îl repar sau îl scriu eu. Agenții scriu prima variantă, iar prețul acoperă rezultatul revizuit. O rulare eșuată mă costă pe mine timp, pe tine nimic, și nimic nu ajunge la tine până nu trece de review.",
    },
    {
      question:
        "Agenții nesupravegheați livrează vulnerabilități. Cum tratezi securitatea?",
      answer:
        "Așa e, livrează. Tocmai de aceea nu e un serviciu mai ieftin de tipul „pornim agenții și gata”. Securitatea e prima trecere din fiecare review: injection, autentificare, secrete, controlul accesului. Pe propria mea rulare de 30 de PR-uri, un repo fără teste, review-ul a prins 3 căi de shell injection din input-ul cererii înainte de merge. Garanția e în scris: o vulnerabilitate din aria review-ului, găsită într-un PR marcat de mine ca revizuit, se repară gratuit.",
    },
    {
      question: "Al cui e codul? Semnezi un NDA?",
      answer:
        "Totul e al tău de la primul commit: repo-ul, branch-urile, proprietatea intelectuală. Semnez NDA-ul sau DPA-ul tău înainte să primesc acces la repo, lucrez în repository-ul tău, sub controalele tale de acces, iar accesul se revocă la predare, dacă nu ai un retainer.",
    },
    {
      question: "Ce se întâmplă cu datele și codul nostru în uneltele de AI?",
      answer:
        "Ce unelte de AI ating codul tău stabilim în scris, înainte de acces. Dacă politica firmei tale exclude o unealtă sau un furnizor, nu rulează pe repo-ul tău. Codul tău nu e refolosit niciodată în munca pentru alt client și nu e publicat nicăieri.",
    },
    {
      question: "În ce fus orar lucrezi?",
      answer:
        "România (EET/EEST, UTC+2/+3). Asta înseamnă suprapunere completă cu orele de lucru din Europa și cu dimineața echipelor de pe Coasta de Est a SUA. Zi de zi lucrăm async, în scris: primești PR-urile, notele de review și un update scurt, așa că nimeni nu așteaptă după o ședință.",
    },
    {
      question: "Cum funcționează plata?",
      answer: `Fiecare preț e fix înainte să înceapă munca, în EUR, fără TVA. Sesiunea de strategie se plătește în avans. Sprinturile: 50% ca să rezervi slotul, 50% la predare. PR-ul revizuit se plătește doar dacă e gata de merge după standardul tău. Retainerele se facturează lunar. ${RO_CREDIT_TERMS}`,
    },
    {
      question: "Ce se întâmplă dacă nu merge?",
      answer:
        "Dacă primul PR revizuit nu e gata de merge după standardul tău, nu îl plătești. Riscul tău e cel mai mare înainte să fi livrat ceva, așa că garanția stă exact acolo. Scope-ul se fixează în ziua 0, deci nu există facturi care o iau razna. La retainer, dacă luna 1 nu atinge ritmul stabilit, te poți opri acolo.",
    },
    {
      question: "Poți lucra ca un contractor obișnuit, plătit pe zi?",
      answer:
        "Capacitatea continuă e retainerul, de la 2.200 €/lună. Nu e varianta pe care o recomand pentru început: un sprint îți vinde un rezultat revizuit, la un preț stabilit dinainte, ceea ce e mai avantajos decât să cumperi timp. Începe cu un singur PR revizuit dacă vrei să testezi întâi colaborarea.",
    },
    {
      question: "De ce să nu angajez o agenție sau mai mulți ingineri?",
      answer:
        "O agenție îți vinde orele unei echipe, cu adaos, iar oamenii noi se angajează și se acomodează în luni de zile. Aici primești primul PR revizuit în câteva zile, de la un singur inginer senior care lucrează cu mai mulți agenți Claude Code în paralel: fără costuri de coordonare și fără muncă de junior facturată la tarif de senior. Agențiile care folosesc agenți pun rar un review senior deasupra.",
    },
    {
      question: "Ce stack-uri și limbaje verifici?",
      answer:
        "TypeScript și JavaScript cap-coadă: Node, Nest.js, React, Next.js, Tailwind, SQL și MongoDB. Acolo s-au dus cei peste 10 ani de lucru în producție. Trecerea de securitate (injection, autentificare, secrete, controlul accesului) se aplică în orice limbaj, dar dacă stack-ul tău e în afara listei, îți spun asta în discuție, în loc să învăț pe banii tăi.",
    },
    {
      question: "Cine plătește consumul de LLM și API?",
      answer:
        "Eu. Consumul de LLM/API e inclus în prețul fix pentru sprinturi și PR-urile revizuite, deci nu vine o factură de tokeni pe deasupra. Excepția e Agent Fleet Setup: rulează pe licențele Claude Code ale echipei tale, pentru că harness-ul rămâne la voi.",
    },
    {
      question: "Ce înseamnă un PR?",
      answer:
        "Un tichet din backlog-ul tău, livrat ca un singur pull request care se poate revizui: un bug reparat, o funcționalitate mică sau o bucată dintr-una mai mare. Un tichet prea mare ca să fie revizuit bine dintr-o trecere se împarte la discuția de scope, înainte să fixăm prețul, așa că știi de la început câte PR-uri primești.",
    },
    {
      question: "Cine facturează și în ce monedă?",
      answer:
        "Facturez în EUR prin firma mea din România; în USD la cerere. Pe factură e prețul fix stabilit înainte să înceapă munca.",
    },
  ],
};

export const roServicesFinalCta: ServicesFinalCtaCopy = {
  heading: "Spune-mi ce ai în backlog. Îți spun cât costă.",
  body: "O discuție de 30 de minute. Pleci cu un scope și un preț fix.",
  cta: "Programează o discuție",
  ctaSource: "ro_services_final_cta",
  emailBefore: "sau scrie la",
};
