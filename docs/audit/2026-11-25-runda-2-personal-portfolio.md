---
audit: SuperBoris
data: 2026-11-25
subiect: runda-2-personal-portfolio
scope: runda 2, 6d3556c..401719a (main)
commit: 401719a
brief: validat
registru: fără registru
verdict: CHANGES REQUESTED
fisier: docs/audit/2026-11-25-runda-2-personal-portfolio.md
---

## Audit SuperBoris, runda 2

**Verdict pe scurt:** CHANGES REQUESTED, 1 MAJOR rămas (limitele de lungime pe email și URL, în subscribe și teardown, nu sunt făcute). Celelalte două MAJOR sunt închise. Nu am găsit CRITICAL. Nu am găsit regresii grave din Next 16, Sentry 11, proxy.ts, outputFileTracingIncludes sau CI. Am găsit un efect secundar al CSP report-only: `verify:security` pică de acum încolo (MINOR 1). Documentația spune în mare adevărul, cu 4 locuri învechite (secțiunea de mai jos).

**Intenție auditată:** site de lead-gen spre Cal.com, cu fiecare cifră trasabilă. Asumpție: `.claude/CONTEXT.md` ține loc de PRD.
**Surse:** `.claude/CLAUDE.md` (versiunea aprobată 6d3556c și diferența din cerere), `.claude/CONTEXT.md`, raportul anterior, diff-ul complet, fișierele citite pe disc la 401719a. SuperNicu NU e instalat: fără standard de securitate (nu citez puncte C-xx), fără lecții, fără fișierul liniei. Nu am rulat build, teste sau e2e (nu s-au cerut). Teste, din brief: `gh pr checks 186` verde, workflow `ci` verde pe main, protecția main citită azi.
**Verificare vizuală (bgn-33):** nu se aplică, proiectul nu poartă `bgn-33.css`.

### Findings din runda anterioară

**MAJOR 1: rate limit și lungimi pe /api/subscribe și /api/teardown: PARȚIAL (rămâne MAJOR, doar pentru lungimi)**
- Scop: un script extern nu poate trimite emailuri în număr mare către adrese străine și nu poate trimite câmpuri uriașe.
- Rate limit: există în Vercel Firewall (5 cereri/60 s/IP, comun pe ambele rute, notat în CONTEXT.md:57 cu verificare live 1–5 → 400, 6–7 → 429). Din repo nu se vede și nu o dovedește niciun test. Nu l-am verificat; îl iau din CONTEXT.md, ca afirmație a autorului.
- Lungimi: **deschis**. Comanda `git grep -nE "maxLength|MAX_|2048|254" -- app/api` dă 1 rezultat: `MAX_NOTE` (app/api/teardown/route.ts:19, :85), doar pe `note`. `email` (subscribe:44-52, teardown:68-73) și `repoUrl` (teardown:75-80) rămân fără plafon. `git diff 6d3556c..HEAD -- app/api` atinge doar ruta markdown; PR #160 e deschis (CONTEXT.md:8). Scenariu: un POST de câțiva MB în `repoUrl` trece validarea, intră în HTML-ul emailului către Adrian și poate pica la Resend (502).
- Locuri înrudite: subscribe `email`, teardown `email`, teardown `repoUrl`. Toate trei deschise.
- Acceptare: criteriul 2 din brief rămâne parțial. Cere 400 la email peste 254 de caractere și la URL peste 2048, plus testele lor.

**MAJOR 2: publicarea nu depinde de teste: ÎNCHIS**
- `.github/workflows/ci.yml:1-30` rulează tsc → lint → build → test → e2e pe PR și pe push în main.
- `gh api .../branches/main/protection` (rulat azi) dă `contexts: ["ci"]`, `enforce_admins: true`, `strict: false`, fără review obligatoriu. Un push direct pe main fără `ci` verde e blocat, inclusiv pentru admin.
- Dependabot: `.github/dependabot.yml` (npm săptămânal, actions lunar). `package.json` are `engines: node 24.x`.
- Rest observat, nu finding: acțiunile sunt pe `@v4`, nu pe SHA. Dependabot actions le actualizează. `strict: false` înseamnă că un PR vechi poate intra fără rebase pe main-ul nou. Pentru un repo cu un singur autor e acceptabil.

**MAJOR 3: scripturile care trec mereu: ÎNCHIS**
- Scop: un script de verificare nu raportează „trecut" când nu a rulat sau a pierdut.
- `scripts/security-check.js:55-95` (diff 3172-3245): `npm audit` care nu rulează (fără JSON, `error`, fără contoare) e eșec. Ieșirea e 1 dacă pică `dependencyAudit`, `securityHeaders` sau `codeSecurityPatterns` (diff ~3279-3286).
- `scripts/verify-tests.js` rescris: 5 pași în ordine, `spawnSync`, `status !== 0` = eșec, `process.exit(1)` la orice eșec. Cele 3 căi „trecut fără să ruleze" au dispărut.
- Căutare locuri înrudite: `git grep -nE "passed = true|exit\(0\)" -- scripts` nu mai găsește căi de trecere fără rulare în aceste două scripturi. `scripts/` conține acum doar `security-check.js`, `verify-tests.js`, `verify-build.js`, iar cele 3 scripturi moarte (analyze-lighthouse, compare-performance, measure-performance) au fost șterse. `verify-build.js` n-a fost atins de diff și nu l-am citit (**neverificat**).
- Efect nou: vezi MINOR 1.

**MINOR-ele raportului anterior (cele 5 raportate)**
1. Testul de onestitate pe Markdown randat (`__tests__/thirty-pr-claims.test.ts:26`): **DESCHIS**. Fișierul nu e în diff. `ROOTS` are încă `"public/llms.txt"`, cale care nu există (`ls public` nu o arată), iar `files()` o sare în tăcere. Markdown-ul randat tot nu e scanat. Nu ține de PR #160-#162. Criteriul 4 rămâne parțial.
2. `teardown/route.ts:181`, `res.ok` pe confirmare: **DESCHIS**. Rândurile 179-195 fac `await fetch(...)` fără să citească `res`. Un 4xx/5xx de la Resend nu lasă urmă. Vezi PR #160.
3. `tracesSampleRate`: **ÎNCHIS**. `sentry.server.config.ts:12` și `sentry.edge.config.ts:13` au acum 0.1.
4. CSP pe pagini: **PARȚIAL, după plan**. `next.config.mjs:104-122` adaugă `Content-Security-Policy-Report-Only` pe toate paginile. Nimic nu e blocat încă; enforce vine „după o săptămână curată", fără dată sau persoană. `X-XSS-Protection` (învechit) a rămas.
5. „10+ years" scris de mână: **DESCHIS**. `git grep -nE "10\+" -- data components app lib | wc -l` dă 15 rezultate, fără constantă și fără test.

**Cele 13 MINOR neraportate, verificate pe cod acum**
- Închise: `]]>` în CDATA și BASE_URL în `feed.xml/route.ts` (`cdata()`, `SITE_URL`), emailul duplicat din `config/environment.ts`, comentariul copiat din sentry.server, `.taskmaster/`, importul din `lib/page-schema.tsx:1`, `any` din `instrumentation.ts`, scripturile moarte, `services/page.tsx` (acum `JsonLd`, care escapează `<`), `markdown.test.ts` redenumit la `proxy`.
- Nemodificate de diff și neverificate din nou: poarta TODO(adi) doar în `getPosts`, `gateLinks` fără `/work/`, ipoteza cu linkul MDX absolut, `withTierPrefill`.

### Criteriile din brief
1. Niciun secret sau dată personală nepublicată: **îndeplinit**. `git grep` după tipare de chei (sk_/re_/ghp_/xox) dă 0 rezultate. `.agents/`, `.claude/agent-memory`, `.claude/skills` și `skills-lock.json` nu sunt urmărite. Gmail-ul și datele PFA din cod și teste sunt publice cu intenție (CONTEXT.md:75, :77). Notiță: `.cursor/mcp.json` cu substituenții `*_HERE` a fost șters.
2. Subscribe și teardown: validare **parțială** (lungimi lipsă); fail-closed fără chei, nemodificat (subscribe:57-73, teardown:90-106); rate limit în Firewall, nevăzut din repo.
3. `isBookingUrl` (`lib/booking.ts:7-13`): **îndeplinit**; compară `hostname === "cal.com"`, nu `includes`.
4. Testele de onestitate EN, RO, Markdown, llms.txt: **parțial**, vezi MINOR 1 al raportului anterior.
5. proxy.ts nu expune postări nepublicate: **îndeplinit**. `proxy.ts` face doar rewrite spre `/api/markdown`, iar `lib/blog.ts` păstrează slug strict (`^[a-z0-9-]+$`, :113) și poarta `published`/`isLive`. `getPosts` e nemodificat ca logică. Matcherul exclude `api/`, `_next/`, imaginile OG și fișierele cu extensie, deci comportamentul e cel de dinainte de redenumire.

### CRITICAL
Niciunul.

### MAJOR
- [decizie] app/api/subscribe/route.ts:44-52, app/api/teardown/route.ts:68-80 — **Email și repoUrl fără plafon de lungime** (detaliile la „Findings din runda anterioară", MAJOR 1). Scenariu: un script trimite un câmp de mărimea corpului maxim al cererii; trece validarea (regex-ul pentru email nu limitează lungimea, `isHttpUrl` nu limitează) și ajunge în emailul de notificare. Recomandare: 400 peste 254 la email și peste 2048 la URL, cu un test pe fiecare rută (PR #160 e deschis tocmai pentru asta). Cost: sub o oră. Rămâne [decizie] pentru că așa a fost clasat; e o reparație tehnică simplă și o poate lua SuperNicu.

### MINOR / NITS
1. [tehnic] scripts/security-check.js:109-116 + next.config.mjs:109 — **`verify:security` (și deci `verify:all`) pică acum pe antete, de la CSP report-only.** `requiredHeaders` cere `'Content-Security-Policy'` între ghilimele; config-ul are doar `'Content-Security-Policy-Report-Only'`, deci `securityHeaders` pică și ieșirea e 1. Verificat prin citirea ambelor fișiere (grep `Content-Security-Policy` în `next.config.mjs` dă un singur rezultat, cel report-only), **ipoteză neexecutată** (n-am rulat scriptul, ca să nu scriu în `test-results/`). E intenționat în comentariu, dar nicio documentație nu o spune: CLAUDE.md:60 spune că `security-check` iese cu 1 la antete, dar nu că azi e roșu. CI nu rulează `security-check`, deci nu e blocat nimic. Fix: notă în CONTEXT.md până se activează CSP-ul, sau o cerință „Report-Only e acceptat deocamdată" cu dată.
2. [tehnic] raportul anterior, MINOR 1 (thirty-pr-claims.test.ts:26) — deschis, vezi mai sus.
3. [tehnic] teardown/route.ts:181 — deschis, vezi mai sus.
4. [tehnic] „10+ years" în 15 locuri — deschis, vezi mai sus.
5. [decizie] next.config.mjs:104 — CSP report-only fără dată de activare și fără loc unde ajung rapoartele (nu are `report-uri`/`report-to`, deci „o săptămână curată" se vede doar în consola fiecărui browser). Recomandare: `report-to` spre un endpoint, sau data de revizuire notată în CONTEXT.md.

### Regresii introduse în interval (Next 16, proxy.ts, Sentry 11, CSP, tracing, CI)
Nimic grav. Observații:
- proxy.ts: redenumire pură; funcție `proxy`, testele actualizate. Matcher neschimbat.
- `outputFileTracingIncludes: '/**': ['./content/**/*.mdx']` (next.config.mjs:43-45) + `/*turbopackIgnore*/` în `lib/blog.ts:59-65, :116, :120`: logic. Dacă un nou folder cu conținut citit la rulare (altul decât `content/**/*.mdx`) apare, nu va fi trasat. Azi `lib/blog.ts` e singurul loc cu `fs` la cerere.
- Sentry 11: `next.config.mjs:1` importă `@sentry/nextjs/config`; `instrumentation.ts` tipează `onRequestError` din `captureRequestError`. Nu am putut verifica fără build (build-ul în CI a trecut, conform brief-ului).
- `.github/workflows/ci.yml` nu primește `RESEND_*` sau `SENTRY_DSN`, ceea ce e bine: testele api rulează cu mock-uri.
- `tsconfig.json`: `jsx: react-jsx` (impus de Next 16), `.next/dev/types` adăugat. Fără efect asupra domeniului.
- `lib/blog.ts:21-26`: heading-urile ignoră acum blocurile de cod, cu test nou (`__tests__/blog.test.ts`). Corect.

### Documentație: spune adevărul despre starea codului?
În mare da. Locuri care nu mai spun adevărul:
- `.claude/CONTEXT.md:59` — „Deploys are not gated on tests until #161 lands: main is unprotected and there is no workflow". **Fals azi** (workflow + protecție există). Ștergi rândul.
- `.claude/CONTEXT.md:8` — „#161 (CI gate), #162 (verify scripts) are open". Ambele sunt unite. Rămâne deschis doar #160.
- `.claude/CONTEXT.md:4` — „main at 6d3556c; PRs #158, #159, #163". Main e la 401719a.
- `.claude/CLAUDE.md:25` („28 suites, 270 tests on 2026-10-14") și `:19` („verified 2026-10-14") sunt vechi; raportul anterior a rulat 29 suite, 287 teste.
- `.claude/CLAUDE.md:60` nu spune că `verify:security` e roșu până la CSP (MINOR 1).

Restul (proxy.ts, ESLint 9 flat config, Next 16, Speed Insights vs Analytics, #179 despre cardul OG) corespunde codului, verificat pe fișiere.

### Regulile schimbate în cerere
- `.claude/CLAUDE.md:60` (Gotchas, `verify:tests`/`security-check`): notă. Regula nouă strânge: cere ieșire 1 la orice pas eșuat sau nerulat. Fără slăbiri în CLAUDE.md (celelalte rânduri sunt documentație).

### Alarme false
Nicio unealtă n-a fost rulată în runda asta.

### POSITIVE OBSERVATIONS
- CI cu `enforce_admins: true` și check obligatoriu: închide calea de publicare fără teste, inclusiv pentru proprietar.
- `verify-tests.js` rescris simplu: un pas nerulat nu mai poate fi „trecut".
- Reparațiile mici au venit cu test (heading în bloc de cod).

### De văzut de un om
- app/api/subscribe/route.ts, app/api/teardown/route.ts — date personale: emailurile vizitatorilor către Resend; nemodificat în interval, politica de confidențialitate trebuie să o spună (neverificat în runda asta).
- .claude/CONTEXT.md:57 — protecție care trăiește doar în configurare: rate limit-ul din Vercel Firewall; nu apare în repo și nu are test.
Acoperit de teste: markdown/proxy (`__tests__/markdown.test.ts`, citit, nerulat), blog (`blog.test.ts`, citit, nerulat); CI verde pe PR 186 și pe main conform brief-ului (nu am rulat nimic).
Neacoperit de teste: lungimile (trebuie 400 la email > 254 și URL > 2048), 429 pe deploy de probă, scriptul `security-check` (trebuie să iasă 1 azi pe antete).

### De acceptat de Adi
- Rate limit în Vercel Firewall, nevăzut în repo: o schimbare în dashboard îl poate opri fără urmă în git. Recomandare: testul 429 repetat după fiecare schimbare de rută; cost mic, sub 30 de minute. Cifra „5 cereri pe 60 s" e verificată în CONTEXT.md (1–5 → 400, 6–7 → 429), deci atacul cu un pas sub cifră e deja descris.
- Sentry „Prevent storing of IP addresses" nebifat (CONTEXT.md:74): politica promite că IP-ul nu se păstrează. Neverificat; 2 minute de lucru.
- CSP report-only fără dată de enforce (MINOR 5).

### Lecțiile lui SuperNicu
Neîncărcate (plugin lipsă).

### Compounding (max 3)
- CLAUDE.md, Gotchas: „Un rând din CONTEXT.md care spune «până aterizează #N» se șterge în același PR cu #N."
- CLAUDE.md, Conventions: „O verificare nouă care face un script roșu (ex. CSP report-only vs `security-check`) notează în CONTEXT.md data la care redevine verde."
- CLAUDE.md, Conventions: „Orice câmp text dintr-o rută publică are plafon de lungime și un test 400."

### Neverificat
- `scripts/verify-build.js` (neatins de diff, necitit).
- Vercel Firewall, setările Sentry și faptul că Vercel așteaptă efectiv `ci` înainte de deploy (nu am cont).
- Build, teste și e2e nerulate (cerere explicită).

### VERDICT: CHANGES REQUESTED
Un MAJOR deschis: plafoanele de lungime pe email și URL în subscribe și teardown (PR #160). MAJOR 2 (CI + protecție) și MAJOR 3 (scripturi) sunt închise cu dovadă. Rate limit-ul din Firewall e luat din CONTEXT.md, nu verificat de mine. Din MINOR-ele raportului anterior: 1 închis (tracesSampleRate), 1 parțial (CSP), 3 deschise (test pe Markdown, `res.ok` pe confirmare, „10+ years"). În plus, CSP report-only a făcut `verify:security` roșu și documentația are 4 locuri învechite. Nu am scris nimic în proiect.
