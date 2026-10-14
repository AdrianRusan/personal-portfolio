import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

// #114 M palette for every OG card (this file and the blog post card).
export const OG_PALETTE = {
  paper: "#F4F3EE",
  ink: "#1F1E1A",
  body: "#33312B",
  muted: "#5C5A50",
  accent: "#C4340E",
  accentText: "#B23210",
  rule: "rgba(31,30,26,0.14)",
} as const;

interface OgCardProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  footerRight: string;
}

/**
 * Shared positioning-led social card, reused by the home + services
 * opengraph-image / twitter-image route files. Kept visually consistent with
 * the blog OG card (#114 M: warm paper, ink, one orange-red accent).
 */
export function renderOgCard({
  eyebrow,
  title,
  subtitle,
  footerRight,
}: OgCardProps) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px",
        background: OG_PALETTE.paper,
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "8px",
          background: OG_PALETTE.accent,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          flex: 1,
          justifyContent: "center",
        }}
      >
        <span
          style={{
            color: OG_PALETTE.muted,
            fontSize: "24px",
            fontWeight: 400,
          }}
        >
          {eyebrow}
        </span>
        <div
          style={{
            fontSize: title.length > 42 ? "60px" : "72px",
            fontWeight: 500,
            color: OG_PALETTE.ink,
            lineHeight: 1.02,
            letterSpacing: "-0.04em",
            maxWidth: "980px",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: "28px",
            color: OG_PALETTE.body,
            lineHeight: 1.45,
            maxWidth: "920px",
          }}
        >
          {subtitle}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: `1px solid ${OG_PALETTE.rule}`,
          paddingTop: "28px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: OG_PALETTE.accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: OG_PALETTE.paper,
              fontWeight: 600,
              fontSize: "18px",
            }}
          >
            AR
          </div>
          <span style={{ color: OG_PALETTE.ink, fontSize: "20px", fontWeight: 600 }}>
            Adrian Rusan
          </span>
        </div>
        <span style={{ color: OG_PALETTE.muted, fontSize: "18px" }}>
          {footerRight}
        </span>
      </div>
    </div>,
    OG_SIZE,
  );
}
