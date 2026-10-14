import fs from "node:fs";
import path from "node:path";

// #123: the design system lives in app/globals.css and tailwind.config.ts
// (DESIGN.md has the rules). These checks keep pages on it: no raw colours,
// no stock Tailwind palette, no pre-#123 token names, no off-scale font sizes.

const files = ["app", "components", "lib", "content", "data"].flatMap((dir) =>
  (fs.readdirSync(dir, { recursive: true }) as string[])
    .filter((f) => /\.(tsx?|mdx)$/.test(f))
    .map((f) => path.join(dir, f))
    .filter((f) => fs.statSync(f).isFile()),
);

// Each exception names its file and why it can't use a token.
const allow: Record<string, RegExp[]> = {
  // LinkedIn's own brand blue on the share button hover.
  "components/blog/ShareButtons.tsx": [/\[#0077b5\]/g],
  // The code block is always dark (Catppuccin), in both site themes.
  "components/blog/CodeBlock.tsx": [
    /bg-\[#1e1e2e\]/g,
    /text-green-400/g,
    /text-neutral-50(\/\d+)?/g,
  ],
  // The nav needs 13px on phones to keep every link in one row (e2e).
  "components/ui/FloatingNav.tsx": [/text-\[13px\]/g],
};

const arbitrary = /-\[(#|rgb|hsl)[^\]]*\]/;
const palette =
  /\b(text|bg|border|ring|fill|stroke|decoration|divide|outline|from|via|to)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}\b/;
const legacy =
  /\b(text|bg|border|ring|ring-offset|divide|decoration|placeholder)-(white-[12]00|black-[123]00|blue-100|purple)\b|\b(text|border|divide)-white\b/;
const size = /\btext-\[\d+(\.\d+)?(px|rem|em)\]/;

const rules: [string, RegExp][] = [
  ["arbitrary colour (use a token)", arbitrary],
  ["stock Tailwind palette colour (use a token)", palette],
  ["pre-#123 token name (see DESIGN.md)", legacy],
  ["off-scale font size (use a type-* role)", size],
];

describe("design system guard", () => {
  it.each(rules)("has no %s outside the allowlist", (_name, rule) => {
    const offenders: string[] = [];
    for (const file of files) {
      let text = fs.readFileSync(file, "utf8");
      for (const ok of allow[file.split(path.sep).join("/")] ?? [])
        text = text.replace(ok, "");
      text.split("\n").forEach((line, i) => {
        if (rule.test(line)) offenders.push(`${file}:${i + 1}`);
      });
    }
    expect(offenders).toEqual([]);
  });

  it("catches what it is meant to catch", () => {
    expect(arbitrary.test('className="bg-[#123456]"')).toBe(true);
    expect(palette.test('className="text-red-400"')).toBe(true);
    expect(legacy.test('className="text-white-200"')).toBe(true);
    expect(legacy.test('className="text-white"')).toBe(true);
    expect(legacy.test('className="bg-white/5"')).toBe(false);
    expect(size.test('className="text-[17px]"')).toBe(true);
    expect(size.test('className="type-lead text-body"')).toBe(false);
  });
});
