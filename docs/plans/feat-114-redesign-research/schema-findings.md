# Schema findings for the #114 redesign

Checked 2026-10-13 against the repo at `a9ce617`, with JSON-LD parsed from live HTML on https://www.adrian-rusan.com.
**Verdict:** the schema is valid JSON, has a sound `@id` graph and is built from the same data as the visible copy. Nothing is broken. The work for the redesign is (a) keep the builders fed from the rewritten copy, and (b) fix five small consistency gaps. No new types are needed. Do not add Review or AggregateRating.

## 1. Inventory per route (live)

Every page renders `WebSite` + `Person` + `Organization` from `app/root-shell.tsx` (`lib/person-schema.ts`).

| Route | Page-level types | Built in |
|---|---|---|
| `/` | WebPage (+BreadcrumbList, mainEntity → #person), Service "Delivery Sprint" (`#service`), FAQPage | `app/(en)/page.tsx` |
| `/services` | FAQPage, 8× Service with Offer/UnitPriceSpecification, WebPage | `app/(en)/services/page.tsx`, `data/ladder.ts` `ladderServiceJsonLd`, `components/services/ServicesFaq.tsx` |
| `/about` | AboutPage | `pageJsonLd` |
| `/contact` | ContactPage | `pageJsonLd` |
| `/teardown` | WebPage | `pageJsonLd` |
| `/work` | CollectionPage + ItemList | `pageJsonLd`, `itemListJsonLd` |
| `/work/[slug]` | Article, WebPage | `app/(en)/work/[slug]/page.tsx` |
| `/blog` | CollectionPage + ItemList | same as `/work` |
| `/blog/[slug]` | BlogPosting, WebPage, FAQPage (if frontmatter `faq`) | `app/(en)/blog/[slug]/page.tsx` |
| `/workshops/[slug]` | Service (+Offer), WebPage | `data/workshops.ts` `workshopJsonLd` |
| `/privacy` | none (site-wide only) | - |
| `/ro` | WebPage (`ro-RO`, crumb "Acasă") | `app/(ro)/ro/page.tsx` |
| `/ro/servicii` | FAQPage, 8× Service (areaServed Romania), WebPage | `app/(ro)/ro/servicii/page.tsx` |
| `/ro/despre`, `/ro/contact` | AboutPage, ContactPage | `pageJsonLd` |

The graph: WebPage `isPartOf` #website, `about` #person; WebSite `publisher` #person; Organization (PFA) `founder` #person; Person `worksFor` [Bono Fintech, #organization]. Tests pin it: `__tests__/person-schema.test.ts` (stable @id, role and employer, knowsAbout, sameAs, sales contactPoint, city-only address) and `__tests__/page-schema.test.ts` (canonical URL form, breadcrumb shape, FAQ builder).

## 2. Must-keep

1. **Stable `@id`s**: `/#person`, `/#organization`, `/#website`, `<url>#webpage`, `/#service`, and the workshop service ids. Other pages and external graphs point at them.
2. **JSON-LD built from the same data as the visible copy.** FAQPage is built from `homeFaqs`, `servicesFaqCopy.items`, `roServicesPageFaq` and post frontmatter `faq`. Offers come from `ladder`/`roLadder`. Article and BlogPosting come from MDX frontmatter. The rewrite must change the data, never a second hand-written JSON copy.
3. **The page type per route** (AboutPage, ContactPage, CollectionPage+ItemList, Article for case studies, BlogPosting for posts), as the brief requires.
4. **Honest offers**: "from" prices carry only `minPrice`, VAT is excluded (`valueAddedTaxIncluded: false`), the retainer is per month (`unitCode: MON`). Keep this when prices or tiers change.
5. **City-level address only** (Timișoara, RO). No street, postcode or phone (#64 R3, test-enforced).
6. **The `JsonLd` helper's `<` escaping** (`lib/page-schema.tsx`), for anything built from frontmatter or copy.

## 3. Must match the visible copy after the rewrite

| Schema field | Where | Must equal |
|---|---|---|
| `Person.description`, `hasOccupation.description` | `lib/person-schema.ts` | the new hero/about positioning. It currently says "runs an AI agent fleet … fixed-scope delivery sprints for startup & scale-up founders and CTOs", which the visible copy does not use. |
| `Person.jobTitle` | `JOB_TITLE` | the title in the hero/about ("Senior full-stack engineer") |
| `WebSite.description`, `alternateName` (`SITE_TAGLINE`) | `app/root-shell.tsx` | the new tagline |
| Home `WebPage.description` | `app/(en)/page.tsx` (hard-coded) | the new home meta description. Move it to `data/` or reuse the metadata constant. |
| Home `Service` "Delivery Sprint" `description`, `audience` | `app/(en)/page.tsx` (hard-coded) | the sprint copy in `ladder.ts`, and the "Who this is for" list |
| FAQPage Q&A | the FAQ data | the visible FAQ text, word for word (already wired; keep it wired) |
| Service `name`/`description`/prices | `ladder.ts` `summary`, `prices` | the /services ladder rows |
| `knowsAbout` | person-schema | the topics the new copy actually sells and writes about |
| `Person.image` | utfs.io URL | the photo shown on the site (`public/adrian.jpg` since #74). Confirm it is the same photo; if not, point it at the site's own image. |

## 4. Validity and consistency issues (ranked)

1. **Two different emails on the Person entity.** `Person.email` is the personal Gmail address, while `contactPoint.email` and Organization use `contact@adrian-rusan.com`, which is the inbox the site shows. Entity consolidation sees two contact identities, and the personal address is published in the markup. Fix: drop `Person.email` or set it to `CONTACT_EMAIL`. This is a one-line change, so Adi should confirm it.
2. **/ro has a visible FAQ but no FAQPage, and no Service.** `/` has both. RO parity says /ro mirrors /. Add `faqJsonLd(homeFaq(roServicesFaq.items, roCallFaq))` (the same items the page renders) and the RO sprint Service.
3. **Hard-coded schema strings on /** (WebPage description, the "Delivery Sprint" Service) are the main drift risk in a copy rewrite. Derive them from `data/` (`ladder` sprint entry, site description constant). The home Service also duplicates the /services "Delivery Sprint" Service without sharing an `@id`. Give the ladder sprint Service `@id: /#service` and a `url`, or drop the copy on /.
4. **`WebSite.inLanguage: "en-US"` is rendered on RO pages too**, alongside WebPage `inLanguage: "ro-RO"`. Set WebSite `inLanguage: ["en", "ro"]`. Person and Organization descriptions stay EN; that is acceptable.
5. **Two FAQ builders and two raw `<script>` tags.** `components/services/ServicesFaq.tsx` has its own `faqJsonLd` (question/answer keys), while `lib/page-schema.tsx` has another (q/a keys). `/services` renders them with an unescaped `JSON.stringify`. The data is static today, but the rewrite will move copy around: route both through `JsonLd` and keep one builder. This is a cleanup, not a validity bug.
6. **Minor:** `/services` and `/work/[slug]` have no `dateModified` tied to a visible "Last updated" (see the AI SEO findings, item 4). `/privacy` has no WebPage, which is fine to leave. The BreadcrumbList is not mirrored by visible breadcrumbs on most pages. If the redesign adds visible breadcrumbs, use the same names as `crumbs`.

## 5. Don't add

- **Review / AggregateRating** from the testimonials. They would be self-serving reviews of the site's own Person or Organization, which Google does not support for rich results and which reads as invented proof.
- **FAQPage rich-result expectations.** Google shows FAQ rich results only for gov and health sites, so the value is AI and entity extraction. Keep FAQPage, but do not bloat FAQs for it.
- **HowTo, Course or Event for workshops** unless the page shows dated sessions. It currently does not.
- **Any `sameAs` YouTube link** until `YOUTUBE_CHANNEL_ID` is set. The conditional already handles this.
- **Client Organizations** beyond Bono Fintech in `worksFor` (NDA; see `.claude/CONTEXT.md`).

## 6. Verify after the redesign (≈15 min)

1. `npm test` (person-schema, page-schema, markdown and claim suites).
2. Rich Results Test on `/`, `/services`, `/blog/what-agents-get-wrong` and `/work/30-reviewed-prs-3-vulnerabilities`; validator.schema.org on `/ro` and `/about`.
3. Spot-check by script that every page still parses to the type list in §1:
   `curl -s $URL | python3 -I -c "import re,json,sys;h=sys.stdin.read();print([x.get('@type') for m in re.findall(r'<script type=\"application/ld\+json\"[^>]*>(.*?)</script>',h,re.S) for x in (lambda d:d if isinstance(d,list) else [d])(json.loads(m))])"`
4. Diff the §3 fields against the new visible copy by eye.

Not run: Google Rich Results Test, which was not reachable from the CLI. Validity here is JSON parse plus a manual check against schema.org and Google's required fields.
