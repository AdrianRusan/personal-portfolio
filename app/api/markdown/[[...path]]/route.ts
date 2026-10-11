import { markdownFor } from "@/lib/markdown";
import { MARKDOWN_HEADERS, notFoundMarkdown } from "@/lib/markdown/format";

// middleware.ts rewrites "Accept: text/markdown" requests here (#64 R1):
// /about → /api/markdown/about, / → /api/markdown.
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ path?: string[] }> },
) {
  const { path: segments = [] } = await params;
  const path = `/${segments.join("/")}`;
  const md = await markdownFor(path);
  return new Response(md ?? notFoundMarkdown(path), {
    status: md ? 200 : 404,
    headers: {
      ...MARKDOWN_HEADERS,
      "Cache-Control": md
        ? "public, max-age=3600, s-maxage=3600"
        : "public, max-age=60, s-maxage=60",
    },
  });
}
