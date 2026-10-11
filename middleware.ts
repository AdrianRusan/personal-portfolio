import { NextResponse, type NextRequest } from "next/server";

// Markdown content negotiation (#64 R1). "Accept: text/markdown" gets the page
// as Markdown from app/api/markdown; everything else is the normal HTML. Both
// answers carry "Vary: Accept" so a cache never serves one for the other.
export function middleware(req: NextRequest) {
  const accept = req.headers.get("accept") ?? "";
  // Browsers and Next's RSC/prefetch fetches never ask for text/markdown (the
  // router's fetch sends no Accept, so */*), so only agents land here.
  if (accept.includes("text/markdown")) {
    const url = req.nextUrl.clone();
    url.pathname = `/api/markdown${req.nextUrl.pathname === "/" ? "" : req.nextUrl.pathname}`;
    return NextResponse.rewrite(url);
  }
  const res = NextResponse.next();
  res.headers.set("Vary", "Accept");
  return res;
}

// Page routes only: no API, Next internals, OG/Twitter image routes or files
// with an extension (feed.xml, llms.txt, sitemap.xml, icons, assets).
export const config = {
  matcher: [
    "/((?!api/|_next/|.*opengraph-image|.*twitter-image|.*\\.[a-z0-9]+$).*)",
  ],
};
