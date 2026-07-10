# PRD Archive — Early "Business Ecosystem" Vision (Superseded)

**Status:** Archived / historical. **Archived:** 2026-07-10.

This document consolidates three overlapping product-requirement docs that
previously sat at the repository root:

- `PRD-Portfolio-Enhancement.md` — the master superset (14 features, 16 phases)
- `PRD-Portfolio-NextJS-Vercel.md` — the Vercel-buildable subset carved out of it
- `PRD-Portfolio-Enterprise-Systems.md` — the external-systems subset (subdomains, ERPNext)

They were generated early, described the same program at three scopes, and
predate the site's current direction. **They are kept only for provenance.**
The full original text of each remains in git history (removed in the same
commit that added this file) if a specific spec is ever needed.

## Why this is archived, not active

The three PRDs pitched the portfolio as a multi-subdomain **enterprise business
ecosystem** — a headless CMS, an ERP, a client portal, a support desk, a
learning-management system, a status dashboard, and workflow automation, each
on its own subdomain.

That is not what this site is. The site's actual, current job is a single one:
**convert visitors into scoping calls** (a lean Next.js/Vercel marketing +
lead-gen funnel routing to Calendly). Most of the ecosystem vision was never
built and is not planned. Preserving 2,700 lines of aspirational spec at the
repo root implied an active roadmap that does not exist, so it is collapsed
here.

## What actually shipped (from the vision)

A handful of the Vercel-subset ideas did land, in leaner form than specced:

| Vision item | Shipped as | Notes |
|---|---|---|
| Calendly consultation booking | ✅ Live | Every scoping-call CTA wires to Calendly (30-min scoping call). |
| Blog / thought leadership | ✅ Live | MDX pipeline at `/blog` (`next-mdx-remote` + `gray-matter`), not PayloadCMS. |
| Project case studies | ◑ Partial | `CaseStudy` section on homepage; content static in `data/index.ts`. |
| Advanced contact / lead capture | ◑ Partial | `/api/subscribe` (Resend ESP, checklist lead magnet), not a full lead-mgmt CRM. |

Note the CMS was **not** adopted: site content stays hardcoded in
`data/index.ts` and blog posts are MDX files in `content/blog/` — deliberately,
to keep the funnel simple and dependency-light.

## Deferred / abandoned (deduped across all three PRDs)

Every feature below appeared in one or more of the source PRDs and is **not
planned**. Listed once each; revisit only if the business model changes from
"solo consultant funnel" to "productized SaaS/agency ops."

- **PayloadCMS** headless CMS (MongoDB-backed) to replace `data/index.ts`
- **ERPNext** business-management system — `erp.` subdomain
- **Project-management system** — `projects.` subdomain
- **Client portal** — `portal.` subdomain
- **Customer-support / help-desk** (OSTicket-style) — `support.` subdomain
- **Documentation / knowledge base** — `docs.` subdomain
- **Service status dashboard** — `status.` subdomain
- **Learning-management platform** (paid courses, video hosting) — `learn.` subdomain
- **n8n workflow automation** — `automation.` subdomain
- **Enhanced GitHub integration** (live repo stats / contribution surfacing)
- Cross-subdomain shared auth, shared Redis cache, and the associated
  infrastructure/cost commitments (dedicated hosting, per-subdomain DBs, SSL)

## If you want the original detail

```
git log --oneline -- PRD-Portfolio-Enhancement.md \
                      PRD-Portfolio-NextJS-Vercel.md \
                      PRD-Portfolio-Enterprise-Systems.md
git show <commit>:PRD-Portfolio-Enhancement.md
```

The pre-removal blob holds the full feature descriptions, data models, phase
breakdowns, env-var lists, and success metrics for each PRD.
