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
import { formatPriceRo, roLadder, roTierNames, roTiers } from "@/data/ro";

// /ro/servicii copy. Prices follow data/ro.ts (55% of the global ladder).

export const roServicesHero: ServicesHeroCopy = {
  heading:
    "Backlog-ul tău, livrat în ritmul agenților — fiecare PR verificat pentru securitate înainte să ajungă la tine",
  intro:
    "Livrare cu scope fix și preț fix, nu pontaj. Stabilim de la început setul de pull request-uri și prețul. O flotă de agenți scrie volumul; eu fac un review de securitate adversarial pe fiecare PR înainte să ajungă la tine. Nimic nu ajunge la tine fără să fi fost verificat personal de un inginer senior.",
  tagline:
    "De 2-3 ori mai rapid, nu de 100 de ori — și uite ce greșesc agenții.",
  priced:
    "Fiecare ofertă are prețul stabilit de la început, de la o sesiune de 110 € până la un retainer lunar.",
  cta: "Programează o discuție",
  ctaSource: "ro_services_hero",
  tiersLink:
    "Nu ești gata de o discuție? Vezi cele patru niveluri și prețurile ↓",
  guarantee:
    "Dacă primul PR revizuit nu e gata de merge la standardul tău, nu plătești pentru el.",
  proofItems: [
    "30 de PR-uri revizuite · 9 loturi de agenți · 2,5 zile",
    "3 vulnerabilități de tip shell injection prinse, deși trecuseră de teste",
    "Peste 10 ani în producție",
  ],
  proofNote:
    "Dintr-un proiect pe care l-am dus cap-coadă pe propriul repo — PR-urile, notițele de review și problemele găsite sunt reale, și ți le arăt pe toate în discuție.",
};

// The global ladder links its Build/Ship offers to the sections below; the RO
// data points them at Calendly because /ro/servicii had no such sections.
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
  intro:
    "Începe cu o sesiune de 110 € sau mergi direct la un sprint. Ce plătești la un nivel se scade din prețul următorului. Toate prețurile sunt în EUR, fără TVA.",
  limited: "Disponibilitate limitată",
  capacity:
    "Stratul de verificare e un singur om senior și nu se poate paraleliza.",
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
      values: ["~3–5 zile", "~1–2 săptămâni", "~2–3 săptămâni"],
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
  eyebrow: "Nu ești gata pentru un sprint întreg?",
  heading: "PR-ul revizuit — 550 €",
  intro:
    "Cel mai puțin riscant mod de a vedea metoda la lucru pe propriul tău cod, înainte să te angajezi la un sprint.",
  steps: [
    "Îmi trimiți un tichet real din backlog — un bug, o funcționalitate mică, ce ai cu adevărat la rând.",
    "Un agent îl implementează. Eu fac review de securitate pe diff, linie cu linie — același review adversarial pe care îl primește fiecare PR din sprint.",
    "Primești PR-ul gata de merge, în repo-ul tău, plus un raport de review de o pagină care arată exact ce a prins review-ul.",
    "Livrat în ~48 de ore.",
  ],
  cta: "Începe cu un PR",
  emailSubject: "PR revizuit (550 €)",
  emailBody: "Link către repo sau tichet:\n\nCe trebuie livrat:\n",
  emailLink: "Preferi e-mailul? Trimite tichetul și sari peste discuție →",
};

export const roTrustStrip: TrustStripCopy = {
  ariaLabel: "Experiență și testimonial",
  eyebrow: "Peste 10 ani de software livrat în producție",
  employers: ["Bono Fintech", "GoSocial", "PGL Esports", "Ipsos"],
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
      body: "Prima lună e perioada de probă: stabilim de la început ritmul de PR-uri revizuite, iar dacă nu e atins, poți renunța la finalul primei luni, fără alte obligații. Te convingi că retainerul funcționează înainte să te angajezi pentru toate cele 3 luni.",
    },
  ],
  termsHeading: "Condiții",
  terms: [
    "Volumul e o bandă, nu e nelimitat. Ce depășește trece în luna următoare sau într-un sprint suplimentar. Banda exactă se stabilește în discuție.",
    "Nu include răspuns la incidente 24/7 — se poate adăuga ca serviciu separat, cu preț separat.",
    "Lună de lună după un angajament inițial de 3 luni. După aceea poți renunța oricând, cu 30 de zile preaviz. Destul de lung cât să dovedească că funcționează, destul de scurt cât să fie corect. Niciun angajament peste perioada de probă.",
  ],
};

export const roHarnessSetup: HarnessSetupCopy = {
  eyebrow: "Învață-ți echipa să pescuiască",
  heading: "Configurează-ți agent harness-ul",
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
  pricingEyebrow: "Configurare harness",
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
  heading: "De ce pot lua doar câteva proiecte în paralel",
  intro:
    "Stratul de verificare e un singur om senior — eu — și nu se paralelizează. Agenții scalează livrarea; review-ul nu. Nu e o limită de marketing, e blocajul real al modelului de lucru și e motivul pentru care totul poate intra în merge în siguranță.",
  ceiling: "Așa că limita e asta:",
  limitLead: "Rulez cel mult 2 sprinturi de livrare în același timp",
  limitRest:
    "— review-ul e făcut de un singur om și nu se paralelizează. Dacă ambele locuri sunt ocupate când mă contactezi, îți spun sincer următoarea dată la care putem începe, în loc să promit mai mult decât pot duce.",
  outro:
    "Fără cronometre, fără „au mai rămas 3 locuri azi”. Limita e pur și simplu adevărul despre cum funcționează asta — și e, totodată, argumentul de vânzare.",
};

export const roServicesFaq: ServicesFaqCopy = {
  heading: "Răspunsuri directe la întrebările pe care le primesc de fapt",
  items: [
    {
      question: "Cum poate fi calitatea bună dacă codul l-au scris agenți AI?",
      answer:
        "Pentru că ce scriu agenții e ciorna, nu livrabilul. Fiecare PR trece printr-un review senior linie cu linie, care pornește de la premisa că agentul a greșit până se dovedește contrariul — același review pe care un senior bun îl face pe PR-ul unui junior, dar în ritmul agenților. Agenții îți dau de 2-3 ori mai mult volum, nu de 100 de ori, și greșesc lucruri anume. Review-ul e locul unde sunt prinse, iar fiecare sprint vine cu un registru cu exact ce s-a prins în codul tău.",
    },
    {
      question:
        "Mă îngrijorează în special securitatea. Agenții nesupravegheați livrează vulnerabilități.",
      answer:
        "Corect — chiar livrează. Tocmai de aceea există serviciul ăsta, și nu o variantă mai ieftină de tip „pornim agenții și gata”. Exemplu real: review-ul adversarial a prins 3 vulnerabilități de tip shell injection scrise de agenți, care trecuseră de testele automate. Securitatea e prima verificare din fiecare review, iar tu primești un registru scris cu problemele găsite pe tot sprintul. Garanția de securitate e în scris: o vulnerabilitate din aria review-ului, găsită într-un PR marcat de mine ca revizuit, se repară gratuit.",
    },
    {
      question:
        "De ce să nu angajez pur și simplu o agenție sau mai mulți ingineri?",
      answer:
        "O agenție îți vinde orele unei echipe, cu adaos; angajările durează luni până găsești oamenii și îi pui pe picioare. Aici cumperi rezultate revizuite în câteva zile, de la un singur profesionist senior care coordonează o flotă de agenți — fără overhead de coordonare, fără perioadă de acomodare, fără muncă de junior facturată la tarif de senior. Și diferența reală: o agenție care folosește agenți are rareori un strat senior de verificare adversarială deasupra. Stratul ăsta e tot rostul serviciului, nu un extra.",
    },
    {
      question: "Al cui e codul și cum se asigură confidențialitatea?",
      answer:
        "Totul e al tău — repo-ul, branch-urile, proprietatea intelectuală, de la primul commit. Lucrez în repository-ul tău, cu controalele tale de acces. Semnez NDA-ul sau DPA-ul tău înainte să primesc acces la repo; accesul se revocă la predare, dacă nu ai un retainer. Codul clienților nu e folosit la antrenarea vreunui model și nu e refolosit nicăieri. Pentru clienții din fintech, review-ul de securitate acoperă standard gestionarea secretelor și controlul accesului.",
    },
    {
      question: "Ce se întâmplă dacă nu merge sau dacă lucrezi prea încet?",
      answer:
        "Dacă primul PR revizuit nu e gata de merge la standardul tău, nu plătești pentru el — riscul tău e cel mai mare înainte să fi livrat ceva, așa că garanția stă exact acolo. În rest, scope-ul se fixează în ziua 0, deci nu există facturi care o iau razna.",
    },
    {
      question: "Poți lucra pur și simplu ca un contractor obișnuit, la zi?",
      answer:
        "Se poate, sub formă de retainer, de la 2.200 €/lună, dar nu e varianta pe care o recomand pentru început. Sprintul îți vinde un rezultat revizuit, la un preț stabilit de la început — o afacere mai bună pentru tine decât să cumperi timp și să speri. Retainerul are aceeași garanție de securitate, plus o lună de probă: prima lună e test și poți renunța la finalul ei dacă nu am atins ritmul de PR-uri revizuite stabilit. Dacă vrei să vezi cum lucrăm împreună cu risc mic, începe cu un Sprint Pilot.",
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
