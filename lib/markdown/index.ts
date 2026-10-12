import { bioCopy } from "@/components/Bio";
import { caseStudyCardsCopy } from "@/components/CaseStudyCards";
import { closingCtaCopy } from "@/components/ClosingCta";
import { heroCopy } from "@/components/Hero";
import { offersCopy } from "@/components/Offers";
import { proofBandCopy } from "@/components/ProofBand";
import { shipVerifyCopy } from "@/components/ShipVerify";
import { testimonialsCopy } from "@/components/Testimonials";
import { whoForCopy } from "@/components/WhoFor";
import { ladderCopy } from "@/components/services/Ladder";
import { processStepsCopy } from "@/components/services/ProcessSteps";
import { servicesFaqCopy } from "@/components/services/ServicesFaq";
import { servicesHeroCopy } from "@/components/services/ServicesHero";
import { trustStripCopy } from "@/components/services/TrustStrip";
import {
  BLOG_DESCRIPTION,
  HOME_FAQ_HEADING,
  homeFaq,
  homeFaqs,
  testimonials,
} from "@/data";
import {
  aboutPage,
  contactPage,
  privacyPage,
  roAboutPage,
  roContactPage,
} from "@/data/pages";
import {
  roBio,
  roCallFaq,
  roCaseStudyCards,
  roClosingCta,
  roFaqHeading,
  roHero,
  roOffers,
  roProofBand,
  roShipVerify,
  roTestimonials,
  roTestimonialsSection,
  roWhoFor,
} from "@/data/ro-home";
import {
  roProcessSteps,
  roServicesFaq,
  roServicesPageFaq,
  roServicesHero,
  roServicesLadder,
  roTrustStrip,
} from "@/data/ro-services";
import { WORK_DESCRIPTION, byCaseStudyOrder } from "@/data/work";
import { workshops, type WorkshopSlug } from "@/data/workshops";
import { getPost, getPosts, WORK_DIR } from "@/lib/blog";
import { absoluteUrl } from "@/lib/page-schema";
import { finish } from "./format";
import { postMarkdown } from "./mdx";
import {
  homeMd,
  postListMd,
  proseMd,
  servicesMd,
  teardownMd,
  workshopMd,
} from "./pages";

const staticPages: Record<string, () => string> = {
  "/": () =>
    homeMd({
      hero: heroCopy,
      proof: proofBandCopy,
      shipVerify: shipVerifyCopy,
      offers: offersCopy,
      whoFor: whoForCopy,
      caseStudies: caseStudyCardsCopy,
      testimonials: testimonialsCopy,
      bio: bioCopy,
      faq: { heading: HOME_FAQ_HEADING, items: homeFaqs },
      closing: closingCtaCopy,
    }),
  "/ro": () =>
    homeMd({
      hero: roHero,
      proof: roProofBand,
      shipVerify: roShipVerify,
      offers: roOffers,
      whoFor: roWhoFor,
      caseStudies: roCaseStudyCards,
      testimonials: roTestimonialsSection,
      bio: roBio,
      faq: {
        heading: roFaqHeading,
        items: homeFaq(roServicesFaq.items, roCallFaq),
      },
      closing: roClosingCta,
    }),
  "/services": () =>
    servicesMd({
      hero: servicesHeroCopy,
      trust: trustStripCopy,
      ladder: ladderCopy,
      process: processStepsCopy,
      faq: servicesFaqCopy,
      quotes: [testimonials.doros, testimonials.iojiban],
    }),
  "/ro/servicii": () =>
    servicesMd({
      hero: roServicesHero,
      trust: roTrustStrip,
      ladder: roServicesLadder,
      process: roProcessSteps,
      faq: roServicesPageFaq,
      quotes: [roTestimonials.doros, roTestimonials.iojiban],
    }),
  "/teardown": teardownMd,
  "/privacy": () => proseMd(privacyPage),
  "/about": () => proseMd(aboutPage),
  "/ro/despre": () => proseMd(roAboutPage),
  "/contact": () => proseMd(contactPage),
  "/ro/contact": () => proseMd(roContactPage),
};

// Missing or unpublished posts behave as 404s, like the HTML pages.
const post = async (slug: string, dir?: string) => {
  try {
    return await getPost(slug, dir);
  } catch {
    return null;
  }
};

async function body(path: string): Promise<string | null> {
  const page = staticPages[path];
  if (page) return page();

  if (path === "/blog")
    return postListMd("Blog", BLOG_DESCRIPTION, "/blog", await getPosts());
  if (path === "/work") {
    const studies = byCaseStudyOrder(await getPosts(WORK_DIR));
    return studies.length
      ? postListMd("Case studies", WORK_DESCRIPTION, "/work", studies)
      : null;
  }

  const [, section, slug, ...rest] = path.split("/");
  if (!slug || rest.length) return null;
  if (section === "workshops" && Object.hasOwn(workshops, slug))
    return workshopMd(workshops[slug as WorkshopSlug]);
  if (section === "blog" || section === "work") {
    const found = await post(slug, section === "work" ? WORK_DIR : undefined);
    return found && postMarkdown(found, absoluteUrl(path));
  }
  return null;
}

// Markdown for a site path, or null when the path has no page (→ 404).
export async function markdownFor(path: string): Promise<string | null> {
  // "/about/" and "/about" are the same page, as in the HTML routes.
  const clean = path.length > 1 ? path.replace(/\/+$/, "") : path;
  const md = await body(clean);
  return md && finish(clean, md);
}
