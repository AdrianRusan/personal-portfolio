// #133: GET-only crawl, no browser (no JS, no analytics beacons, no POSTs). node get-crawl.mjs <base>
const base = process.argv[2].replace(/\/$/, "");
const get = (p) => fetch(base + p, { redirect: "manual", headers: { "user-agent": "interaction-audit-133" } });
const xml = await (await get("/sitemap.xml")).text();
const sitemap = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
const pages = [...new Set([...sitemap, "/ro/despre", "/ro/contact"])];
const html = {};
const load = async (p) => (html[p] ??= await (await get(p)).text());
const resolved = {};
const resolve = async (p) => {
  if (resolved[p]) return resolved[p];
  const r = await get(p);
  if (r.status >= 300 && r.status < 400) {
    const loc = new URL(r.headers.get("location"), base + p);
    const r2 = await get(loc.pathname + loc.search);
    return (resolved[p] = { status: r2.status, hops: 1, first: r.status, final: loc.pathname, hash: loc.hash });
  }
  return (resolved[p] = { status: r.status, hops: 0, final: p });
};
const bad = [];
let hrefCount = 0;
for (const page of pages) {
  const r = await resolve(page);
  if (r.status !== 200 || r.hops) bad.push(`sitemap ${page} ${JSON.stringify(r)}`);
  const doc = await load(page);
  for (const m of doc.matchAll(/<a\b[^>]*?\bhref="([^"]*)"/g)) {
    const href = m[1].replace(/&amp;/g, "&");
    if (!/^[/#]/.test(href) || href.startsWith("//")) continue;
    hrefCount++;
    const [pp, hash] = href.split("#");
    const path = (pp || page).split("?")[0];
    if (/\.(pdf|xml|txt|png|jpe?g|svg|webp|ico)$/.test(path)) continue;
    const t = await resolve(path);
    if (t.status !== 200 || t.hops > 1) bad.push(`${page} -> ${href} ${JSON.stringify(t)}`);
    else if (hash && !new RegExp(`\\bid="${hash}"`).test(await load(t.final))) bad.push(`${page} -> ${href} missing id`);
  }
}
for (const [from, to] of [["/workshops", "/services"], ["/blog/30-prs-in-2-5-days", "/work/30-reviewed-prs-3-vulnerabilities"],
  ["/blog/claude-code-changed-how-i-ship-software", "/blog/2-3x-not-100x"], ["/blog/review-bottleneck-measured-on-my-prs", "/blog/2-3x-not-100x"]]) {
  const r = await resolve(from);
  if (r.first !== 301 && r.first !== 308 || r.final !== to || r.status !== 200) bad.push(`redirect ${from} ${JSON.stringify(r)}`);
  else console.log(`redirect ${from} -> ${r.final}${r.hash ?? ""} ${r.first} one hop`);
}
const llms = await (await get("/llms.txt")).text();
for (const u of new Set([...llms.matchAll(/https:\/\/www\.adrian-rusan\.com(\/[^\s)\]>]*)?/g)].map((m) => m[1] || "/"))) {
  const r = await resolve(u);
  if (r.status !== 200) bad.push(`llms ${u} ${JSON.stringify(r)}`);
}
for (const f of ["/robots.txt", "/feed.xml", "/llms.txt", "/sitemap.xml"]) { const s = (await get(f)).status; if (s !== 200) bad.push(`${f} ${s}`); }
const nf = (await get("/does-not-exist")).status;
console.log(`pages ${pages.length}, internal hrefs ${hrefCount}, unique paths ${Object.keys(resolved).length}, 404 page ${nf}`);
console.log(bad.length ? "UNEXPECTED:\n" + bad.join("\n") : "0 unexpected");
