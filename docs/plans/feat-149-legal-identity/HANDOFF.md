# HANDOFF: PFA identity, offer renames, Cal.com, Terms (#149–#152)

**Verdict:** A, B and C are green and ready. Merge them in order. D is green and stays a draft until your lawyer has read /terms.

Review time: about 30 minutes for the click list, plus 1 hour with the lawyer for D.

## 1. Merge order

1. **#153** (A, legal identity), into `main`.
2. **#154** (B, offer renames). GitHub retargets it to `main` once #153 merges. Check the base before you merge.
3. **#155** (C, Cal.com migration). Same base check.
4. **#156** (D, guarantees and Terms), only after the lawyer's edits are in. It stays a draft until then.

Merge them one at a time and wait for each Vercel deploy. Merges that land seconds apart have failed before (CONTEXT.md, Known Issues).

## 2. Click list (/uat, about 20 minutes, on the C preview or on production after C)

Stop before paying. Don't complete a paid booking.

1. `/` footer: the last line reads `RUSAN ADRIAN-IONUȚ PERSOANĂ FIZICĂ AUTORIZATĂ · CUI 49119790 · Reg. Com. F40/8516/2023 · B-dul Bucureștii Noi 136, parter, ap. 5, Sector 1, București · rusan.adrian.ionut@gmail.com`. Check the same on a phone.
2. `/ro` footer: the same line, plus the Termeni link (after D).
3. `/services` ladder: the columns read Plan / Set up / Build / Ship. `/ro/servicii` reads Planificare / Configurare / Implementare / Livrare.
4. `/services` → "Book the €200 session" opens `cal.com/adrian-rusan/architecture-session` with €200 and 60 min. Pick a slot only if you want to see the form, then **stop before paying**. Picking a slot reserves it for a few minutes.
5. `/ro/servicii` → "Rezervă sesiunea de 110 €" opens `sesiune-arhitectura` with 110 EUR. Stop before paying.
6. `/services` → "Scope an audit" opens the Scoping Call. After you pick a slot, the "What's the backlog…" field is prefilled with "AI Code Audit (from €1,500)". This is the one thing the GET check couldn't prove: the value reaches the page, but the form only renders after a slot is picked.
7. `/` hero → "Book a call" opens `cal.com/adrian-rusan/scoping-call`. Book and cancel one real free call (post-merge step 2).
8. `/contact`: the "Legal entity" section shows the same identity line. `/ro/contact` too.
9. `/privacy`: "Who is responsible" names the PFA and CUI. Cal.com and Stripe are in the processor list.
10. (D) `/terms` and `/ro/termeni` render. The sprint's security guarantee on `/services` says "within 90 days of handoff" and links to the terms.

## 3. After merging

1. Vercel: production is on the last merge commit. Promote it if not (5 min).
2. Book one real free Scoping Call through the site and cancel it (5 min).
3. Deactivate the Calendly Scoping Call (`new-meeting`), but only after step 2 works (5 min).
4. LinkedIn: rename the offers to Plan / Set up / Build / Ship, Architecture Session and AI Code Audit (15 min).

## 4. Open questions for you

1. **Written consents** (decision 4): Bono and the 4 named testimonials stay on the site unchanged. Where are the written consents filed? If one is missing, the fallback is "a fintech scale-up" and the quote without the name.
2. **Lawyer's edits to /terms** (D). Every term restates what /services already says, plus three new ones:
   - the liability cap, with the art. 1355 exceptions (intent, gross negligence, harm to health);
   - the 50% advance on all fixed-price work. D also changes the pricing FAQ from "Sprints are 50%" to "Fixed-price work is 50%", so the two agree;
   - "a written proposal wins over these terms".

   Also ask about:
   - the "merge-ready" definition;
   - how the credit appears on the invoice (a deduction on a separate line);
   - the privacy line saying Stripe can pass payment data to its US parent. I inferred that from Stripe's EU and US entities and haven't checked it against Stripe's DPA.
3. **Organization JSON-LD address**: now București (seat city), while the Person stays in Timișoara. Both are city level only (#64 R3). Confirm that's what you want.

## 5. Follow-ups (not in these PRs)

1. VAT-inclusive RO pricing after the VAT code arrives (~mid-Nov 2026). `VAT_LINE` / `RO_VAT_LINE` are the one place to change the wording.
2. Check the CTA of the 17 Oct rules post (`the-rules-file-my-agents-follow`) against the new offer names.
3. The "ex-VAT" short labels left on purpose: the workshop meta descriptions (155-character cap) and the workshop JSON-LD. Both say the same as "Prices exclude VAT".
4. R9 (the Markdown twin stripping not-yet-live blog links) had already shipped in #133. B adds a converter-level test only.
5. The EntryOffer "email me" link on /services fires no analytics event. This was already the case before these PRs; review of #155 surfaced it.

## Evidence

Screenshots (1440 and 390, EN and RO, taken on the D build, so they include every PR): `screenshots/`.

Next action: open #153, check that the base is `main`, and start the click list at item 1.
