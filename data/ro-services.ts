import { RO_LEDGER_PROOF } from "@/data/ro-home";
import { offerById } from "@/data/ladder";
import { FINTECH_EMPLOYER } from "@/data";
import type { DeliverySprintCopy } from "@/components/services/DeliverySprint";
import type { EntryOfferCopy } from "@/components/services/EntryOffer";
import type { HarnessSetupCopy } from "@/components/services/HarnessSetup";
import type { LadderContent } from "@/components/services/Ladder";
import type { ProcessStepsCopy } from "@/components/services/ProcessSteps";
import type { RetainerCopy } from "@/components/services/Retainer";
import type { ScarcityCopy } from "@/components/services/Scarcity";
import type { ServicesFaqCopy } from "@/components/services/ServicesFaq";
import type { ServicesFinalCtaCopy } from "@/components/services/ServicesFinalCta";
import type { ServicesHeroCopy } from "@/components/services/ServicesHero";
import type { TrustStripCopy } from "@/components/services/TrustStrip";
import {
  formatPriceRo,
  RO_CREDIT_TERMS,
  RO_GUARANTEE,
  roLadder,
  roSprintDurations,
  roTierNames,
  roTiers,
} from "@/data/ro";

// /ro/servicii copy. Prices follow data/ro.ts (55% of the global ladder).

export const roServicesHero: ServicesHeroCopy = {
  heading:
    "Backlog-ul tău, livrat în ritmul agenților — fiecare PR verificat pentru securitate înainte să ajungă la tine",
  intro:
    "Livrare cu scope fix și preț fix, nu pontaj. Stabilim de la început setul de pull request-uri și prețul. O flotă de agenți scrie volumul; eu fac un review de securitate adversarial pe fiecare PR înainte să ajungă la tine. Nimic nu ajunge la tine fără să fi fost verificat personal de un inginer senior.",
  tagline: "De 2–3 ori, nu de 100 de ori, și iată ce greșesc agenții.",
  priced:
    "Fiecare ofertă are prețul stabilit de la început, de la o sesiune de 110 € până la un retainer lunar.",
  cta: "Programează o discuție",
  ctaSource: "ro_services_hero",
  tiersLink:
    "Nu ești gata de o discuție? Vezi cele patru niveluri, opt oferte și prețurile ↓",
  guarantee: RO_GUARANTEE,
  ledger: RO_LEDGER_PROOF,
  proofItems: [
    "30 de PR-uri revizuite · 9 loturi de agenți · 2,5 zile",
    "3 vulnerabilități de tip shell injection prinse, deși trecuseră de teste",
    "Peste 10 ani în producție",
  ],
  proofNote:
    "Dintr-un proiect pe care l-am dus cap-coadă pe propriul repo — PR-urile, notițele de review și problemele găsite sunt reale, și ți le arăt pe toate în discuție.",
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
  eyebrow: "Consultanță → Training → Implementare → Livrare",
  heading: "Patru moduri de a lucra împreună, toate cu prețul afișat",
  intro: `Începe cu o sesiune de 110 € sau mergi direct la un sprint. ${RO_CREDIT_TERMS} Toate prețurile sunt în EUR, fără TVA.`,
  limited: "Pe rând, unul câte unul",
  capacity:
    "Stratul de review e un singur om senior, așa că rulez un singur sprint sau retainer odată.",
  source: "ro_services_ladder",
};

export const roProcessSteps: ProcessStepsCopy = {
  heading: "Cum se desfășoară concret munca",
  intro:
    "Patru pași. Scope-ul și prețul se stabilesc din ziua 0, deci nu există facturi care o iau razna — și niciun PR nu ajunge la tine fără un review senior în spate.",
  steps: [
    {
      tag: "1 · SCOPE",
      heading: "Discuția de scope (ziua 0)",
      body: "Stabilim setul de PR-uri, ce înseamnă „gata” pentru fiecare, accesul la repo și convențiile tale. Aici se fixează scope-ul și prețul. Tot aceasta e și discuția comercială — dacă nu ne potrivim, afli din prima discuție.",
    },
    {
      tag: "2 · LIVRARE",
      heading: "Flota de agenți (zilele 1–N)",
      body: "Tichetele sunt distribuite către agenți Claude Code care lucrează în paralel, în git worktree-uri izolate, după convențiile din CLAUDE.md-ul tău. De aici vine volumul și de aici vine accelerarea de 2-3 ori.",
      caption: "~2-3x volum livrat",
    },
    {
      tag: "3 · VERIFICARE",
      heading: "Review senior adversarial (continuu)",
      body: "Fiecare PR scris de agenți trece prin review-ul meu înainte să ți-l propun. Întâi securitatea — injection, autentificare, secrete, controlul accesului — apoi corectitudinea și scope-ul. Pornesc de la premisa că agentul a greșit până se dovedește contrariul. Partea asta nu crește dacă adaugi agenți și e motivul pentru care există serviciul ăsta.",
      link: {
        label: "Citește în detaliu cum funcționează review-ul →",
        href: "/ro#ship-verify",
      },
      caption: "nu se paralelizează — un singur om senior",
      verify: true,
    },
    {
      tag: "4 · PREDARE",
      heading: "Predarea (ultima zi)",
      body: "Primești PR-urile revizuite pe branch-uri reale în repo-ul tău, un registru cu problemele de securitate găsite pe tot sprintul și un document de final: ce s-a livrat și ce au greșit agenții în mod repetat în codul tău. Tu triezi și faci merge.",
    },
  ],
  contract: "Nimic nu ajunge la tine nerevizuit. Asta e înțelegerea.",
};

const securityGuarantee = {
  title: "1. Garanția de securitate",
  body: "Fiecare PR livrat trece printr-un review de securitate adversarial, documentat, înainte să ajungă la tine. Dacă mai târziu apare, într-un PR marcat de mine ca revizuit, o vulnerabilitate care intra în aria acelui review, o repar gratuit și refac review-ul pe tot lotul din jurul ei, fără cost.",
};

export const roDeliverySprint: DeliverySprintCopy = {
  badge: "Majoritatea echipelor încep aici",
  eyebrow: "Oferta principală",
  heading: "Sprint de livrare accelerat de agenți",
  intro:
    "Un set fix de pull request-uri gata de producție, verificate pentru securitate — livrate de o flotă de agenți, verificate linie cu linie de un inginer senior — în câteva zile, la un preț stabilit înainte să începem.",
  deliveredHeading: "Ce primești, exact",
  deliverables: [
    {
      lead: "Un număr fix de PR-uri gata de merge,",
      rest: "pe branch-uri reale în repo-ul tău, revizuite și cu testele trecute — pregătite pentru merge-ul final al echipei tale.",
    },
    {
      lead: "O notă de review pentru fiecare PR:",
      rest: "ce a produs agentul, ce a prins și a schimbat review-ul și riscul rămas, dacă există.",
    },
    {
      lead: "Raportul de securitate al sprintului (rămâne la tine)",
      rest: "— fiecare clasă de vulnerabilități verificată, tot ce s-a găsit și s-a reparat, spus pe șleau. Ăsta e, de fapt, produsul pe care îl cumperi.",
    },
    {
      lead: "Harta greșelilor agenților (rămâne la tine) —",
      rest: "ce s-a livrat, ce a rămas și ce au greșit agenții în mod repetat în codul tău — o hartă utilă pentru echipă de acum înainte.",
    },
  ],
  pricingHeading: "Prețuri",
  // ponytail: EN ~€10–14k, Standard €14,500 and Scale €24,000 scaled by the
  // same 55% as data/ro.ts — confirm with Adi; data/ro.ts only fixes the Pilot (4.100 €).
  pricingLead:
    "Un contractor senior costă ~5.500–7.700 €/lună și are nevoie de săptămâni ca să se acomodeze.",
  pricingRest:
    "Standard îți livrează echivalentul unei luni de contractor, revizuit, în două săptămâni. 8.000 €, preț fix.",
  columns: [
    { name: "Sprint Pilot" },
    { name: "Sprint Standard", badge: "Recomandat", featured: true },
    { name: "Sprint Extins" },
  ],
  rows: [
    {
      label: "Potrivit pentru",
      values: [
        "O primă colaborare cu risc mic — ca să vedem cum lucrăm împreună",
        "Output-ul unei luni de contractor senior, revizuit, în două săptămâni",
        "O suprafață mai mare, mai multe PR-uri, review mai în profunzime",
      ],
    },
    {
      label: "Cam cât",
      values: [
        "O funcționalitate bine delimitată (~5–6 PR-uri)",
        "O lună de contractor, revizuită (~10–15 PR-uri)",
        "O zonă mare a produsului, în profunzime (~16–20+ PR-uri)",
      ],
    },
    {
      label: "Durată",
      values: roSprintDurations,
    },
    {
      label: "Preț",
      values: [
        "4.100 €",
        "8.000 €",
        "13.200 € — stabilit la discuția de scope",
      ],
    },
  ],
  cta: "Programează o discuție",
  pricingNote:
    "Fiecare sprint e plătit pentru rezultatul revizuit, nu pentru orele lucrate — prețul se blochează din ziua 0, fără facturi surpriză. Suma exactă se stabilește la discuția de scope, înainte să înceapă orice lucru.",
  notHeading: "Ce NU este",
  notIntro:
    "Dacă spunem clar de la început, ne scutim amândoi de o discuție fără rost.",
  notList: [
    "Nu e fără limită. Numărul de PR-uri și scope-ul se fixează în ziua 0. Scope nou înseamnă un sprint nou, nu o țintă care se tot mută.",
    "Nu e un om închiriat în echipă. Cumperi rezultate revizuite, nu pe cineva care să stea la standup-uri.",
    "Nu e arhitectură greenfield de la zero. Proiectarea unui sistem nou de la zero e o altă discuție.",
    "Nu face auto-merge în producție. Livrez PR-uri revizuite, cu testele trecute, gata de merge. Decizia finală de merge și deploy rămâne la echipa ta — intenționat, ca procesul tău de change control să rămână intact.",
    "Nu e mentenanță continuă. On-call-ul și întreținerea după predare țin de retainer.",
  ],
  guaranteesHeading: "Garanțiile",
  guaranteesIntro:
    "Două, ambele concrete și verificabile. Fără teatru de genul „îți dublăm veniturile sau îți dăm banii înapoi”.",
  guarantees: [
    securityGuarantee,
    {
      title: "2. Garanția primului PR",
      body: "Dacă primul PR revizuit nu e gata de merge la standardul tău, nu plătești pentru el. Riscul tău e cel mai mare înainte să fi livrat ceva, așa că garanția stă exact acolo.",
    },
  ],
  guaranteesNote:
    "Intenționat nu există o garanție generală de tip „banii înapoi dacă nu ești mulțumit”. Duce la dispute de scope și nu așa lucrează un profesionist senior. Cele două de mai sus mă fac să răspund exact acolo unde contează: calitate și securitate.",
  paymentHeading: "Plată",
  payment:
    "50% ca să rezervi slotul, 50% la predare. Un Sprint Pilot se poate plăti integral în avans, fiind o sumă mică. Vrei mai multe sprinturi la rând? Pentru asta e retainerul, mai jos.",
};

export const roEntryOffer: EntryOfferCopy = {
  guarantee: RO_GUARANTEE,
  eyebrow: "Nu ești gata pentru un sprint întreg?",
  heading: "PR-ul revizuit — 550 €",
  intro:
    "Cel mai puțin riscant mod de a vedea metoda la lucru pe propriul tău cod, înainte să te angajezi la un sprint.",
  steps: [
    "Îmi trimiți un tichet real din backlog — un bug, o funcționalitate mică, ce ai cu adevărat la rând.",
    "Un agent îl implementează. Eu fac review de securitate pe diff, linie cu linie — același review adversarial pe care îl primește fiecare PR din sprint.",
    "Primești PR-ul gata de merge, în repo-ul tău, plus un raport de review de o pagină care arată exact ce a prins review-ul.",
    `Livrat în ${offerById(roLadder, "reviewed-pr").duration}.`,
  ],
  cta: "Începe cu un PR",
  emailSubject: "PR revizuit (550 €)",
  emailBody: "Link către repo sau tichet:\n\nCe trebuie livrat:\n",
  emailLink: "Preferi e-mailul? Trimite tichetul și sari peste discuție →",
};

export const roTrustStrip: TrustStripCopy = {
  ariaLabel: "Experiență și testimonial",
  eyebrow: "Peste 10 ani de software livrat în producție",
  employers: [FINTECH_EMPLOYER, "GoSocial", "PGL Esports", "Ipsos"],
  // A real client quote: kept verbatim in English rather than put words in his mouth.
  quote:
    "I am very pleased with Adrian's efforts and progress on my project. I was informed on a daily basis about progress, and Adrian is very keen on delivering quality work. He made sure I was happy with the end result. I definitely recommend contacting Adrian if you are in need of any web related projects.",
  quoteLang: "en",
  author: "Tim Claes",
  role: "Inginer freelance mobile și web",
};

export const roRetainer: RetainerCopy = {
  eyebrow: "Capacitate continuă",
  heading: "Retainer de livrare AI-native",
  intro:
    "Livrare senior AI-native, în fiecare lună: un flux constant de PR-uri verificate pentru securitate, pentru echipele care nu se mai întreabă dacă agenții sunt rapizi și acum vor să-i folosească continuu și în siguranță.",
  deliveredHeading: "Ce primești, lunar",
  deliverables: [
    "O bandă lunară asumată de PR-uri, toate trecute prin review adversarial — același pipeline ship/verify ca la sprint, în ritm continuu.",
    "Un registru continuu cu problemele de securitate găsite și un raport lunar despre „ce au greșit agenții în codul tău”.",
    "Acces async permanent la mine pentru întrebări despre livrare și review.",
    "Prioritate față de sprinturile punctuale — clienții cu retainer au un slot de verificare rezervat permanent.",
  ],
  pricingHeading: "Preț",
  startsAt: "De la",
  price: "2.200 €",
  perMonth: "/lună",
  pricingBody:
    "Un slot de review senior rezervat permanent și o bandă lunară asumată de PR-uri revizuite, pe același pipeline ship/verify ca la sprint. Banda exactă și prețul per PR se stabilesc în discuție, în funcție de repo-ul și ritmul tău — cu un angajament inițial de 3 luni.",
  pricingRate:
    "Prețul per PR iese cu aproximativ 20–30% sub cel al unui sprint punctual — asta îți aduce angajamentul lunar. Nu există o listă de prețuri publică; detaliile se stabilesc în discuție.",
  cta: "Programează o discuție",
  bandNote:
    "Banda lunară se fixează din ziua 0, fără facturi surpriză — ce depășește se mută în luna următoare, nu apare pe factură.",
  guaranteesHeading: "Garanțiile",
  guarantees: [
    securityGuarantee,
    {
      title: "2. Garanția primei luni",
      body: "Stabilim de la început ritmul de PR-uri revizuite. Dacă luna 1 nu îl atinge, te poți opri acolo, fără să mai datorezi nimic. Vezi retainerul funcționând înainte de cele trei luni întregi.",
    },
  ],
  termsHeading: "Condiții",
  terms: [
    "Volumul e o bandă, nu e nelimitat. Ce depășește trece în luna următoare sau într-un sprint suplimentar. Banda exactă se stabilește în discuție.",
    "Nu include răspuns la incidente 24/7 — se poate adăuga ca serviciu separat, cu preț separat.",
    "Începem cu trei luni. Dacă luna 1 nu atinge ritmul stabilit, te poți opri acolo. După cele trei luni mergem lună de lună: îmi dai un preaviz de 30 de zile când vrei să te oprești.",
  ],
};

export const roHarnessSetup: HarnessSetupCopy = {
  eyebrow: "Învață-ți echipa să pescuiască",
  heading:
    "Agent Fleet Setup: harness-ul pe care îl folosesc eu, în repo-ul tău",
  intro:
    "Instalez și întăresc exact harness-ul ship/verify pe care îl folosesc eu — în repo-ul tău, adaptat stack-ului și convențiilor tale — ca echipa ta să poată livra în ritmul agenților, cu plasele de siguranță deja puse.",
  deliveredHeading: "Ce primești, exact",
  deliverables: [
    "Un agent harness Claude Code funcțional, configurat pe repo-ul tău: regulile de proiect din CLAUDE.md, fluxul cu worktree-uri și dispatch, plus integrarea în CI.",
    "Checklist-ul de review de securitate adversarial pe care îl folosesc — cel care a prins 3 vulnerabilități reale de tip shell injection ce trecuseră de testele automate — adaptat stack-ului tău și predat ca să rămână la tine.",
    "O sesiune practică de lucru (sau o serie scurtă): rulez un lot live pe backlog-ul tău cu echipa de față, apoi echipa ta rulează lotul următor, iar eu fac review.",
    "Un playbook scris: cum distribui tichetele, ce verifici întâi, ce greșeli să te aștepți să apară în codul tău și unde verificarea umană e obligatorie.",
    "2 săptămâni de suport async după predare, cât echipa ta preia fluxul.",
  ],
  pricingHeading: "Preț",
  pricingEyebrow: "Agent Fleet Setup",
  price: "De la 2.200 €",
  pricingBody:
    "Un repo: configurarea flotei de agenți, gate-uri de securitate în CI, criteriile de review, playbook-ul de predare și suportul de după. Scope-ul crește dacă extindem pe mai multe repo-uri, adăugăm workshop-uri sau lucrăm în pair cu echipa — totul stabilit și fixat în discuție, înainte să înceapă orice lucru.",
  cta: "Programează o discuție",
  lockedNote:
    "Fixat din ziua 0, fără facturi surpriză — prețul se stabilește la discuția de scope, înainte să înceapă orice lucru.",
  termsHeading: "Condiții",
  terms: [
    "E configurare și enablement, nu livrare continuă. Vrei și livrare? Pentru asta sunt sprintul sau retainerul.",
    "Echipa ta trebuie să fie prezentă și implicată — e gândit ca sprijin, nu ca „fac eu în locul tău”. O spun direct, ca să avem aceleași așteptări.",
    "Nu include licențe Claude Code sau locuri în alte unelte — vii cu conturile tale.",
    "Harness-ul e configurat și predat; nu păstrez acces decât dacă adaugi un retainer.",
  ],
  guaranteeHeading: "Garanție",
  guaranteeLead: "Garanția harness-ului funcțional.",
  guaranteeBody:
    "Până la finalul colaborării, echipa ta a livrat singură cel puțin un PR revizuit prin harness — live, cu mine de față. Dacă nu s-a întâmplat, sesiunile continuă fără cost suplimentar până se întâmplă. Rezultatul e „echipa ta a făcut-o”, nu „echipa ta s-a uitat cum se face”.",
};

export const roScarcity: ScarcityCopy = {
  heading: "De ce lucrez la un singur proiect odată",
  intro:
    "Stratul de verificare e un singur om senior — eu — și nu se paralelizează. Agenții scalează livrarea; review-ul nu. Nu e o limită de marketing, e blocajul real al modelului de lucru și e motivul pentru care totul poate intra în merge în siguranță.",
  ceiling: "Așa că limita e asta:",
  limitLead: "Rulez un singur sprint sau retainer odată",
  limitRest:
    "— review-ul e făcut de un singur om și nu se paralelizează. Dacă e ocupat când mă contactezi, îți spun sincer următoarea dată la care putem începe, în loc să promit mai mult decât pot duce.",
  outro:
    "Fără cronometre, fără „au mai rămas 3 locuri azi”. Limita e pur și simplu adevărul despre cum funcționează asta — și e, totodată, argumentul de vânzare.",
};

// Same questions, same order as `faqs` (data/index.ts); RO prices from R7.
export const roServicesFaq: ServicesFaqCopy = {
  heading: "Răspunsuri directe la întrebările pe care le primesc de fapt",
  items: [
    {
      question: "Cum poate fi calitatea bună dacă codul l-au scris agenți AI?",
      answer:
        "Pentru că ce scriu agenții e ciorna, nu livrabilul. Fiecare PR trece printr-un review senior, linie cu linie, care pornește de la ideea că agentul a greșit până se dovedește contrariul. Agenții îți dau de 2–3 ori mai mult volum, nu de 100 de ori, și greșesc lucruri anume. Review-ul e locul unde sunt prinse, iar fiecare sprint vine cu un registru cu ce s-a prins în codul tău.",
    },
    {
      question:
        "Ce se întâmplă dacă agenții greșesc sau nu se descurcă cu tichetul?",
      answer:
        "Atunci îl repar sau îl scriu eu. Agenții sunt felul în care se scrie ciorna; prețul acoperă rezultatul revizuit. O rulare eșuată mă costă pe mine timp, nu pe tine bani, și nimic nu ajunge la tine până nu trece de review.",
    },
    {
      question:
        "Agenții nesupravegheați livrează vulnerabilități. Cum tratezi securitatea?",
      answer:
        "Așa e, livrează. Tocmai de aceea nu e un serviciu mai ieftin de tipul „pornim agenții și gata”. Securitatea e prima trecere din fiecare review: injection, autentificare, secrete, controlul accesului. Review-ul a prins 3 vulnerabilități de shell injection scrise de agenți, care treceau testele automate. Garanția e în scris: o vulnerabilitate din aria review-ului, găsită într-un PR marcat de mine ca revizuit, se repară gratuit.",
    },
    {
      question: "Al cui e codul? Semnezi un NDA?",
      answer:
        "Totul e al tău de la primul commit: repo-ul, branch-urile, proprietatea intelectuală. Semnez NDA-ul sau DPA-ul tău înainte să primesc acces la repo, lucrez în repository-ul tău, sub controalele tale de acces, iar accesul se revocă la predare, dacă nu ai un retainer.",
    },
    {
      question: "Ce se întâmplă cu datele și codul nostru în uneltele de AI?",
      answer:
        "Ce unelte de AI ating codul tău stabilim în scris, înainte de acces. Dacă politica voastră exclude o unealtă sau un furnizor, nu rulează pe repo-ul vostru. Codul tău nu e refolosit niciodată în munca pentru alt client și nu e publicat nicăieri.",
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
      question: "Poți lucra ca un contractor obișnuit, la zi?",
      answer:
        "Capacitatea continuă e retainerul, de la 2.200 €/lună. Nu e varianta pe care o recomand pentru început: un sprint îți vinde un rezultat revizuit, la un preț stabilit dinainte, ceea ce e mai avantajos decât să cumperi timp. Începe cu un singur PR revizuit dacă vrei să testezi întâi colaborarea.",
    },
    {
      question: "De ce să nu angajez o agenție sau mai mulți ingineri?",
      answer:
        "O agenție îți vinde orele unei echipe, cu adaos, iar oamenii noi se angajează și se acomodează în luni de zile. Aici cumperi rezultate revizuite în câteva zile, de la un singur inginer senior care conduce o flotă de agenți: fără costuri de coordonare și fără muncă de junior facturată la tarif de senior. Agențiile care folosesc agenți pun rar un review senior adversarial deasupra. Aici, review-ul e produsul.",
    },
  ],
};

export const roServicesFinalCta: ServicesFinalCtaCopy = {
  heading: "Spune-mi ce ai în backlog. Îți spun cât costă.",
  body: "O discuție de 30 de minute în care conturăm scope-ul și stabilim prețul. Fără nicio obligație și fără „100x” — doar varianta sinceră a ce pot livra pentru tine o flotă de agenți plus un reviewer senior.",
  proof:
    "30 de PR-uri revizuite în 2,5 zile. 3 bug-uri de tip shell injection prinse, deși testele treceau. Asta e meseria.",
  cta: "Programează o discuție",
  ctaSource: "ro_services_final_cta",
  workLink: "Vezi sprintul de 30 de PR-uri în detaliu →",
  workHref: "/ro#work",
};
