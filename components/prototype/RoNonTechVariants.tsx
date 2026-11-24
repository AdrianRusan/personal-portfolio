// PROTOTYPE, throwaway (branch prototype/ro-non-tech, 2026-11-24).
// Question: what should /ro look like for a non-tech company in Timișoara
// that wants to use AI? Three structurally different variants on /ro?variant=A|B|C.
// Copy is a working hypothesis (Bruce NEED-DATA); the headline should come from
// the words people use in the first conversations. Proof slots with no real
// case stay visibly empty: the honesty rule forbids filling them.
import Link from "next/link";
import { BOOKING_URL } from "@/data";
import { formatPriceRo, roLadder } from "@/data/ro";
import { offerById } from "@/data/ladder";
import { ctaPrimary, ctaSecondary } from "@/components/ui/button";

const price = (id: string) => formatPriceRo(offerById(roLadder, id));

const doors = [
  {
    key: "automatizez",
    verb: "Automatizez ce faceți de mână",
    forWho:
      "Pentru firma în care cineva copiază date dintr-un loc în altul, scrie aceleași e-mailuri sau face rapoarte de mână în fiecare săptămână.",
    get: "Un flux care rulează singur (n8n sau un pipeline cu un model AI), cu verificări înainte de predare și un cost lunar spus de la început.",
    price: price("automation"),
    proof: {
      label: "Filtrul de fapte construit de mine (EN)",
      href: "/work/honesty-gate",
    },
  },
  {
    key: "invat",
    verb: "Vă învăț oamenii să lucreze cu AI",
    forWho:
      "Pentru echipa în care fiecare folosește ChatGPT cum știe, fără reguli despre date și fără să știe ce merge și ce nu.",
    get: "Un workshop pe munca voastră reală, nu pe exemple generice: ce dați unui model, ce nu, cum verificați rezultatul.",
    price: price("workshop"),
    proof: null,
  },
  {
    key: "livrez",
    verb: "Livrez cu echipa voastră",
    forWho:
      "Pentru firma care are deja un produs software și vrea să livreze mai repede fără să crească riscul.",
    get: "PR-uri gata de merge, revizuite linie cu linie, la preț fix, sau un audit al codului scris cu AI.",
    price: price("sprint"),
    proof: { label: "Studii de caz (EN)", href: "/work" },
  },
];

const EmptyProof = () => (
  <p className="rounded-md border border-dashed border-accent px-3 py-2 text-sm text-accent-ink">
    Încă niciun caz public aici. Slotul rămâne gol până la primul client (regula
    de onestitate).
  </p>
);

const Proof = ({ proof }: { proof: (typeof doors)[number]["proof"] }) =>
  proof ? (
    <Link href={proof.href} className="text-sm text-accent underline">
      {proof.label}
    </Link>
  ) : (
    <EmptyProof />
  );

const faq = [
  [
    "Unde stau datele noastre?",
    "La voi. Lucrez în conturile voastre, iar ce nu trebuie să ajungă la un model AI nu ajunge. Spunem asta în scris înainte să încep.",
  ],
  [
    "Cine deține ce construim?",
    "Voi: codul, fluxurile și documentația vă rămân după predare.",
  ],
  [
    "Cât costă?",
    "Preț fix, spus înainte să încep. Prima discuție, de 30 de minute, e gratuită.",
  ],
];

// A: three doors side by side, ruled columns.
export function VariantA() {
  return (
    <div className="container-wide gutter">
      <header className="page-head">
        <p className="eyebrow mb-3">
          Timișoara · firme care vor să folosească AI
        </p>
        <h1 className="type-title measure-title">
          AI în firma voastră, fără riscuri și fără vorbe
        </h1>
        <p className="type-lead measure mt-6 text-body">
          Automatizez ce faceți de mână, vă învăț oamenii să lucreze cu AI și
          livrez cu echipa voastră. Alegeți ușa care vă doare cel mai tare.
        </p>
        <a href={BOOKING_URL} className={`${ctaPrimary} mt-8`}>
          Discuție gratuită de 30 de minute
        </a>
      </header>
      <section className="section grid gap-10 border-t border-ink/15 md:grid-cols-3 md:gap-0 md:divide-x md:divide-ink/15">
        {doors.map((d) => (
          <div
            key={d.key}
            className="space-y-4 md:px-8 first:md:pl-0 last:md:pr-0"
          >
            <h2 className="type-subsection">{d.verb}</h2>
            <p className="text-body">{d.forWho}</p>
            <p className="text-ink">{d.get}</p>
            <p className="type-label">{d.price}</p>
            <Proof proof={d.proof} />
          </div>
        ))}
      </section>
      <section className="section border-t border-ink/15">
        <h2 className="type-section mb-8">Întrebări</h2>
        {faq.map(([q, a]) => (
          <div
            key={q}
            className="grid gap-2 border-t border-ink/15 py-5 md:grid-cols-[1fr_2fr]"
          >
            <h3 className="type-label">{q}</h3>
            <p className="text-body">{a}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

// B: problem-led. Starts from the visitor's week, maps each pain to a door.
const pains = [
  [
    "Cineva copiază comenzi sau facturi dintr-un sistem în altul.",
    "automatizez",
  ],
  [
    "Răspundeți la aceleași 20 de întrebări pe e-mail în fiecare săptămână.",
    "automatizez",
  ],
  ["Raportul de luni durează o dimineață întreagă.", "automatizez"],
  [
    "Jumătate din echipă folosește ChatGPT, cealaltă jumătate îl evită.",
    "invat",
  ],
  ["Nu știți ce date aveți voie să dați unui model AI.", "invat"],
  [
    "Echipa de dev scrie cod cu AI și nimeni nu mai apucă să-l verifice.",
    "livrez",
  ],
];

export function VariantB() {
  return (
    <div className="container-wide gutter">
      <header className="page-head">
        <h1 className="type-hero measure-title">
          Ce vă mănâncă timpul săptămâna asta?
        </h1>
        <p className="type-lead measure mt-6 text-body">
          Bifați ce recunoașteți. Fiecare rând are un răspuns concret și un preț
          fix.
        </p>
      </header>
      <section className="section border-t border-ink/15">
        {pains.map(([pain, key]) => {
          const d = doors.find((x) => x.key === key)!;
          return (
            <div
              key={pain}
              className="grid gap-3 border-b border-ink/15 py-6 md:grid-cols-[2fr_2fr_1fr] md:items-baseline"
            >
              <p className="type-item">{pain}</p>
              <p className="text-body">
                <span className="text-ink">{d.verb}.</span> {d.get}
              </p>
              <p className="type-label md:text-right">{d.price}</p>
            </div>
          );
        })}
      </section>
      <section className="section">
        <div className="hero-panel rounded-xl bg-raised p-8 md:p-12">
          <h2 className="type-section measure-title">
            Nu e pe listă? Spuneți-mi în 30 de minute.
          </h2>
          <p className="mt-4 measure text-body">
            Gratuit, fără prezentare de vânzare. Plecați cu o idee clară dacă
            merită automatizat sau nu.
          </p>
          <a href={BOOKING_URL} className={`${ctaPrimary} mt-8`}>
            Alegeți o oră
          </a>
        </div>
      </section>
    </div>
  );
}

// C: process-led. One path, the doors appear only as the third step.
const steps = [
  [
    "Vorbim 30 de minute",
    "Gratuit. Îmi arătați o săptămână obișnuită din firmă. Eu întreb, nu vând.",
  ],
  [
    "Primiți o propunere scrisă",
    "Ce merită automatizat, ce trebuie învățat, ce nu merită atins. Cu preț fix.",
  ],
  ["Alegem una din trei", null],
  [
    "Predau și plec",
    "Voi dețineți tot. Oamenii voștri știu să-l folosească fără mine.",
  ],
];

export function VariantC() {
  return (
    <div className="container-wide gutter">
      <header className="page-head grid gap-10 md:grid-cols-[3fr_2fr]">
        <div>
          <h1 className="type-title measure-title">
            Patru pași de la „am auzit de AI” la ceva care merge
          </h1>
          <a href={BOOKING_URL} className={`${ctaPrimary} mt-8`}>
            Pasul 1: discuția gratuită
          </a>
        </div>
        <aside className="space-y-4 border-l border-ink/15 pl-6 text-body">
          <p className="eyebrow">Ce nu fac</p>
          <p>Nu vând licențe și nu vă leg de un abonament la mine.</p>
          <p>
            Nu automatizez ce nu merită: uneori răspunsul e „rămâne de mână”.
          </p>
          <p>Nu promit cifre pe care nu le pot arăta.</p>
        </aside>
      </header>
      <ol className="section border-t border-ink/15">
        {steps.map(([title, body], i) => (
          <li
            key={title}
            className="grid gap-4 border-b border-ink/15 py-8 md:grid-cols-[6rem_1fr]"
          >
            <span className="type-stat text-accent">{i + 1}</span>
            <div>
              <h2 className="type-subsection">{title}</h2>
              {body ? (
                <p className="mt-3 measure text-body">{body}</p>
              ) : (
                <div className="mt-6 grid gap-6 md:grid-cols-3">
                  {doors.map((d) => (
                    <div key={d.key} className="space-y-2">
                      <h3 className="type-label">{d.verb}</h3>
                      <p className="text-sm text-body">{d.price}</p>
                      <Proof proof={d.proof} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
      <p className="section-compact">
        <a href={BOOKING_URL} className={ctaSecondary}>
          Începem cu pasul 1
        </a>
      </p>
    </div>
  );
}
