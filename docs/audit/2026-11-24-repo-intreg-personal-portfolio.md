---
audit: SuperBoris
data: 2026-11-24
subiect: repo-intreg-personal-portfolio
scope: repo întreg la 6d3556c (main)
commit: 6d3556c226d94b859f04405cde5dee8edcf6ca87
brief: validat
registru: fără registru
verdict: CHANGES REQUESTED
fisier: docs/audit/2026-11-24-repo-intreg-personal-portfolio.md
---

## Audit SuperBoris

**Verdict pe scurt:** CHANGES REQUESTED, din cauza a 3 MAJOR și 0 CRITICAL. Cele 3 MAJOR: formularele publice nu au limită de cereri, publicarea în producție nu depinde de teste, iar scripturile de verificare raportează „trecut” fără să fie.

**Intenție auditată:** site de lead-gen care duce vizitatorii spre programări Cal.com, cu fiecare cifră trasabilă la o sursă reală. Ca asumpție, deciziile din `.claude/CONTEXT.md` țin loc de PRD, pentru că `docs/prd-archive.md` e o arhivă.
**Surse încărcate:** `.claude/CLAUDE.md` (din pachet, de pe disc) și `.claude/CONTEXT.md` (r.7, r.25, r.67). SuperNicu NU e instalat, așa că lipsesc standardul de securitate (punctele C nu sunt citate), lecțiile și fișierul liniei. CLAUDE.md nu are rândul `pentru:`, deci UI-ul l-am judecat după `DESIGN.md` și `__tests__/design-system.test.ts`. Zonele (operare, autentificare, date-personale, date, api, interfata, config-deploy, restul-1, restul-2) au fost auditate de agenți de zonă; modelul lor nu e scris în liste.
**Verificare vizuală (bgn-33):** nu se aplică, pentru că proiectul nu poartă `bgn-33.css`.

**Criteriile din brief:**
1. Niciun secret sau dată personală nepublicată în repo: **îndeplinit**. Scanul SuperBoris a dat 4 FAIL și toate sunt alarme false (vezi mai jos); greps-urile pe chei și tokenuri nu au găsit nimic; în git e urmărit doar `.env*.example`; fișierele `.agents/`, `.claude/agent-memory/`, `.claude/skills/` și `skills-lock.json` sunt necomise. Date publice cu intenție: adresa sediului PFA și Gmail-ul (vezi „De văzut de un om”).
2. Rutele `/api/subscribe` și `/api/teardown`:
   - validează inputul: **parțial**, pentru că nu există limită de lungime;
   - eșuează închis fără chei: **îndeplinit** (subscribe:57-73, teardown:90-106);
   - au limită de cereri: **NEÎNDEPLINIT** (MAJOR 1).
3. `isBookingUrl` se potrivește cu cal.com: **îndeplinit** (lib/booking.ts:7-13, data/index.ts:4, booking-url.test.ts).
4. Testele de onestitate acoperă EN, RO, Markdown și llms.txt: **parțial**. Acoperă textul sursă EN și RO și ieșirea llms.txt, dar nu și Markdown-ul randat (MINOR 1). Azi ieșirea e curată (verificat, vezi MINOR 1).
5. Middleware-ul Markdown nu expune postări nepublicate: **îndeplinit** (lib/blog.ts:107, :119; lib/markdown/index.ts:124-151). Agentul zonei autentificare l-a verificat cu un test temporar pe postările programate pentru 2026-11-28 și 2026-12-05.

### CRITICAL (blochează merge)
Niciunul.

### MAJOR
- [decizie] app/api/subscribe/route.ts:27, app/api/teardown/route.ts:45 — **Rutele publice nu au nicio limită de cereri și nici limită de lungime a câmpurilor** (subscribe:44 și teardown:68, :75 nu verifică lungimea emailului sau a lui repoUrl).
  - **Ce se poate întâmpla:** un script trimite POST în buclă cu adresele altor oameni. La fiecare cerere:
    - subscribe trimite checklistul (r.109) și adaugă adresa în audiența Resend fără confirmare (r.88-97);
    - teardown trimite confirmarea către adresa străină (r.181) și o notificare către Adrian (r.148).
  - **Urmări:** reputația domeniului de trimitere scade la Resend, cota se consumă, inboxul lui Adrian se umple, iar în lista de nurture ajung oameni care n-au cerut nimic.
  - **Dovada:** `git grep -nEi "rate.?limit|upstash|firewall|ratelimit"` nu găsește nimic în cod; apar doar `.cursorrules` și `.taskmaster/`, adică planuri. Setările Vercel Firewall nu se văd din repo (neverificat).
  - **Recomandare:**
    - o regulă de rate limit în Vercel Firewall pe `/api/subscribe` și `/api/teardown`, după IP; e doar configurare, fără cod;
    - plafoane de lungime: 254 de caractere la email, 2048 la URL, cu 400 peste;
    - un test care așteaptă 429;
    - opțional, confirmare dublă înainte de adăugarea în audiență la subscribe. Asta e o alegere de produs, a ta.
- [decizie] package.json:9 (`build` = `next build`, fără teste) — **Publicarea în producție nu depinde de teste.**
  - **Dovada:**
    - repo-ul nu are `.github/` (`ls .github`: lipsă);
    - `gh api repos/AdrianRusan/personal-portfolio/branches/main/protection` răspunde 404 „Branch not protected”;
    - rulesets: `[]`;
    - repo-ul e PUBLIC.
  - **Ce se poate întâmpla:** un push pe main care strică testele de onestitate (de exemplu „30 PRs … tests passed”) sau o cifră din `data/` ajunge direct live prin Vercel.
  - În același finding intră și restul punctelor de operare: dependențele sunt pe `^` fără Dependabot sau Renovate (package.json:20-39), iar Node 24 e fixat doar în setările Vercel (lipsesc `engines` și `.nvmrc`).
  - **Recomandare:** un workflow GitHub Actions `tsc → lint → build → test` (plus e2e), marcat ca check obligatoriu pe main, și Dependabot. Cam o oră de lucru.
- [tehnic] scripts/security-check.js:471 (plus :205, :346) și scripts/verify-tests.js:95, :117, :122 — **Verificările din `verify:all` trec mereu, chiar când pică.**
  - **security-check.js:**
    - `environmentVariables` și `externalLinksValidation` se marchează trecute oricum (:205, :346);
    - pragul de trecere e 0.4, iar 2 din 5 verificări trecute dau exact 0.4, adică „needs_improvement”;
    - ieșirea e 1 doar la „critical” (:471), deci practic e mereu 0.
    - Agentul zonei operare a probat pe o copie: 2/5, NEEDS_IMPROVEMENT, EXIT=0.
    - În plus, la :78-86, când `npm audit` nu are rețea, eșecul e raportat greșit ca „found vulnerabilities”.
  - **verify-tests.js** marchează e2e ca trecut când serverul nu rulează (:95), când lipsește configurarea (:117) și la excepție (:122). Am verificat citind liniile 90-125.
  - **Ce se poate întâmpla:** dependențe high sau critical plus antete lipsă, iar scriptul tipărește „✅ Security assessment completed successfully”. Dacă scriptul intră în workflow-ul din MAJOR 2, workflow-ul ar fi verde degeaba.
  - **Fix:**
    - security-check.js iese cu 1 dacă pică `dependencyAudit`, `securityHeaders` sau `codeSecurityPatterns`, iar un `npm audit` care n-a putut rula înseamnă eșec;
    - în verify-tests.js, e2e nerulat înseamnă „nerulat”, nu „trecut”.

### MINOR / NITS
- [tehnic] __tests__/thirty-pr-claims.test.ts:26 — **Testul de onestitate scanează o cale moartă și nu scanează Markdown-ul randat.**
  - Calea `public/llms.txt` nu mai există (`ls public/llms.txt`: lipsă); `files()` (r.31) o sare în tăcere.
  - Testul citește doar fișierele sursă, cu fereastra de 300 de caractere în interiorul unui singur fișier. Prin urmare, o frază compusă din două constante din fișiere diferite poate apărea în Markdown-ul randat fără ca testul să pice.
  - llms.txt randat e verificat separat (page-schema.test.ts:55), dar cu o expresie mai slabă, doar în engleză.
  - **Dovada că azi e curat:** am rulat un test temporar în scratchpad, cu aceleași expresii, pe `markdownFor` pentru toate cele 28 de rute din sitemap (4 sunt /ro) și pe `GET /llms.txt`: 1 passed.
  - **Fix:** testul scanează ieșirile `markdownFor(...)` și `llmsTxt()`, iar calea moartă se scoate.
- [tehnic] app/api/teardown/route.ts:181 — `res.ok` nu e verificat la emailul de confirmare. Un 4xx sau 5xx de la Resend nu lasă nicio urmă (doar `fetch` care aruncă ajunge la r.197), iar vizitatorul nu primește confirmarea fără ca cineva să afle.
- [tehnic] sentry.server.config.ts:13, sentry.edge.config.ts:13 — `tracesSampleRate: 1` în producție. Orice val de trafic (inclusiv cel din MAJOR 1) consumă cota Sentry. Fix: 0.1.
- [decizie] next.config.mjs:70-100 — **Paginile nu au CSP.** CSP-ul strict din r.32 se aplică doar imaginilor optimizate. `X-XSS-Protection` e învechit.
  - Partea despre HSTS din finding-ul zonei config-deploy e **infirmată**: `curl -sI https://www.adrian-rusan.com/` întoarce `strict-transport-security: max-age=63072000`, pus de Vercel.
  - Recomandare: CSP în `Content-Security-Policy-Report-Only` întâi.
- [tehnic] components/blog/AuthorBox.tsx:40, app/llms.txt/route.ts:51, :104, components/Bio.tsx:50, data/index.ts:17, :245, :424, data/pages.ts:122-123, app/opengraph-image.tsx:10, app/twitter-image.tsx:10, app/(en)/about/opengraph-image.tsx:10, components/services/TrustStrip.tsx:8 — **„10+ years” e scris de mână în 13 locuri**, fără constantă și fără test (`grep -rnE "10\+|years" __tests__`: 0 rezultate). Asta contrazice regula din CLAUDE.md, „one constant per fact”, și scopul ca fiecare cifră să fie trasabilă. AuthorBox.tsx:45, :54 mai repetă linkurile GitHub și LinkedIn, iar LinkedIn apare în două forme. Fix: o constantă în `data/index.ts` și un test care o leagă de `workExperience`.
- Încă 13 MINOR, neraportate și neverificate a doua oară. Sunt în listele zonelor:
  - feed.xml: `]]>` în CDATA și BASE_URL scris de mână;
  - emailul duplicat în config/environment.ts:17;
  - comentariul copiat în sentry.server;
  - `.taskmaster/config.json` (îl rezolvă #158);
  - importul intern Next în lib/page-schema.tsx:1;
  - markdown.test.ts:84 fără un caz cu postare nepublicată;
  - poarta TODO(adi) doar în getPosts, nu în getPost;
  - gateLinks fără /work/;
  - `any` în instrumentation.ts:14;
  - scripturile taskmaster moarte (compare-performance, analyze-lighthouse);
  - services/page.tsx:58, :68, care nu escapează `<` cum face `JsonLd` (date statice, comentariul spune greșit „escaped”);
  - ipoteza cu linkul absolut din MDX;
  - AuthorBox inclus parțial mai sus.

### Alarme false
- [alarma-falsa] security-scan.sh (secret hardcodat) — .cursor/mcp.json:7-9: valorile sunt substituenți `*_HERE`, iar fișierul îl șterge #158. Unealta ar trebui să ignore valorile care se termină în `_HERE` sau `YOUR_*`.
- [alarma-falsa] security-scan.sh (dangerouslySetInnerHTML) — app/(en)/services/page.tsx:58, :68 și lib/page-schema.tsx:95: e JSON-LD din date statice, în `<script type="application/ld+json">`. Unealta ar trebui să accepte tiparul `application/ld+json` cu `JSON.stringify`.
- [alarma-falsa] security-scan.sh (dangerouslySetInnerHTML) — scripts/security-check.js:242, :245, :248: cuvântul apare într-un șir de caractere al unui scanner. Unealta ar trebui să ignore literalele din `scripts/`.
- [alarma-falsa] security-scan.sh (WARN hex) — components/blog/ShareButtons.tsx:41 e culoarea de brand LinkedIn, iar lib/og.tsx:8-10 sunt culori pentru imaginea OG, care nu poate folosi tokenuri CSS. Scanul trimite la `bono-ds.css`, dar proiectul nu e Bono. Unealta ar trebui să ia design system-ul din rândul `pentru:` și să sară peste `og.tsx`.
- [alarma-falsa] security-scan.sh (G35, cod neterminat) — lib/blog.ts:86, :88 e chiar poarta de onestitate care caută TODO(adi), nu cod neterminat. Unealta ar trebui să ignore `TODO` din interiorul unui regex.
- [alarma-falsa] pachet-audit.py:52 (regex „autentificare”) — a prins `AuthorBox` și `middleware.ts`, deși site-ul nu are login. Eticheta „cod critic: autentificare” e falsă aici. Unealta ar trebui să ceară limită de cuvânt (`\bauth(entication|orize)?\b`).

### POSITIVE OBSERVATIONS
- Ambele rute eșuează închis în producție fără chei, iar alerta Sentry pleacă o singură dată pe instanță (subscribe:22-73, teardown:31-106). Testele api-subscribe și api-teardown acoperă cazul.
- Teardown escapează tot ce pune în HTML (r.23-29, :146, :158-159); intrarea în audiență e doar cu `optIn === true` explicit (r.66).
- Postările nepublicate sunt ascunse peste tot: slug strict (lib/blog.ts:107), iar `published` și `isLive` sunt verificate atât în getPosts cât și în getPost.
- Sentry în browser merge fără Replay și fără PII (instrumentation-client.ts:8-13).
- `npx jest`: 29 de suite, 287 de teste trecute, 0 sărite (verificat).

### De văzut de un om
- data/index.ts:26-33 — date personale — adresa sediului PFA, cu numărul apartamentului (`B-dul Bucureștii Noi 136, parter, ap. 5`), CUI și Reg. Com. apar în footerul fiecărei pagini și în JSON-LD (decizia #149, CONTEXT.md:7). Adi confirmă că vrea adresa cu apartamentul pe fiecare pagină. Testele (legal-entity.test.ts) arată doar că adresa apare, nu dacă trebuie să apară.
- .claude/CONTEXT.md:67 și data/index.ts (CONTACT_EMAIL) — date personale — Gmail-ul personal e public „până la forwarding” (#145). Decizia e temporară, fără dată de schimbare.
- app/api/subscribe/route.ts:88-130, app/api/teardown/route.ts:122-195 — date personale și contract public — emailurile vizitatorilor pleacă spre Resend și intră în audiență. Politica (data/pages.ts) trebuie să spună asta; testele verifică doar răspunsurile.
- lib/analytics.ts:57-83 — date personale — rescrie href-urile de booking la click cu utm_* și calea. Trebuie citit ce iese spre cal.com.

Acoperit de teste:
- API (subscribe, teardown): api-subscribe.test.ts, api-teardown.test.ts.
- Booking: booking-url.test.ts, booking-attribution.test.ts.
- Markdown și postări nepublicate: markdown.test.ts, post-schedule.test.ts, blog.test.ts.
- Cifre și citate: thirty-pr-claims, workflow-numbers, experience, testimonials, ro, legal-entity.
- llms.txt: page-schema.test.ts.
- Toate rulate cu `npx jest`: 29 suite, 287 trecute, 0 sărite.
- e2e (smoke, interactions): citite de zone, nerulate.

Neacoperit de teste:
- limita de cereri: lipsește; trebuie să iasă 429 după N cereri pe IP într-o fereastră;
- eșecul emailului de confirmare (teardown:181): trebuie să lase un rând în Sentry;
- onestitatea pe Markdown-ul randat: 28 de rute, 0 potriviri (MINOR 1);
- „10+ years”: trebuie legat de `workExperience`.

### De acceptat de Bogdan
(Pe proiectul personal decide Adi, proprietarul.)
- **Păstrarea IP-urilor pe serverul Sentry** depinde de o setare de proiect („Prevent storing of IP addresses”), iar politica site-ului promite că IP-ul nu e păstrat. Neverificat, fără acces la cont. Recomandare: bifezi setarea în Sentry; durează 2 minute.
- **Rate limit-ul din MAJOR 1, dacă îl alegi prin Vercel Firewall,** e o protecție care trăiește doar în configurare. Nu se vede din repo și nu o prinde niciun test. Recomandare: testul 429 rulat pe un deploy de probă și regula notată în CONTEXT.md. Cost: jumătate de oră.
- **Dependențele pe `^`** (inclusiv `next` ^15.5.20, împreună cu importul intern din lib/page-schema.tsx:1) nu au actualizator automat. Recomandare: Dependabot (MAJOR 2).

### Lecțiile lui SuperNicu
Neîncărcate: pluginul SuperNicu nu e instalat.

### Compounding (max 3)
- CLAUDE.md, Conventions: „Testele de onestitate scanează ieșirea randată (`markdownFor` pe fiecare rută din sitemap și `llmsTxt()`), nu doar sursele. O cale care nu mai există în lista unui test e o eroare, nu se sare.”
- CLAUDE.md, Gotchas: „Un script de verificare (`security-check`, `verify-*`) iese cu non-zero când o verificare pică sau nu a putut rula. «Nerulat» nu înseamnă «trecut».”
- CLAUDE.md, Conventions: „Orice rută publică care trimite email are limită de cereri pe IP și plafoane de lungime pe câmpuri, cu un test pentru 429 și unul pentru 400.”

### Neverificat
- Zona interfata a citit doar 8 din 83 de fișiere. Necitite: `app/(ro)/**`, opengraph-image și twitter-image, root-shell, Footer, Hero, Offers, ContactOptions, ClosingCta, ProofBand, Testimonials, PostBody, PostCta, FloatingNav, PrimaryCta și restul listei din `zone/zona-interfata.txt`.
- Zona api n-a citit: `components/services/*`, `data/ro-services.ts`, `app/(en)/services/*`.
- `withTierPrefill` (DeliverySprint.tsx:22, ro-services.ts:145).
- Setările Vercel (Firewall, env, notificările la deploy eșuat) și setările proiectului Sentry: fără acces.
- e2e: nerulat.

### VERDICT: CHANGES REQUESTED
Trei MAJOR: lipsa limitei de cereri pe `/api/subscribe` și `/api/teardown`, publicarea fără teste pe un main neprotejat și verificările care trec mereu. Niciun CRITICAL. Fișierele temporare ale auditorului sunt în scratchpad-ul sesiunii (rendered-honesty.test.ts). În proiect nu am scris nimic.
