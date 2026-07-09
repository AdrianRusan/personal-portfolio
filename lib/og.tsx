import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

interface OgCardProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  footerRight: string;
}

/**
 * Shared positioning-led social card, reused by the home + services
 * opengraph-image / twitter-image route files. Kept visually consistent with
 * the blog OG card (dark navy gradient, purple accent).
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
        background:
          "linear-gradient(135deg, #000319 0%, #0d0d2b 50%, #000319 100%)",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "linear-gradient(90deg, #CBACF9, #818cf8, #CBACF9)",
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
            color: "#CBACF9",
            fontSize: "22px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {eyebrow}
        </span>
        <div
          style={{
            fontSize: title.length > 42 ? "60px" : "72px",
            fontWeight: 800,
            color: "#FFFFFF",
            lineHeight: 1.1,
            maxWidth: "980px",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: "28px",
            color: "#BEC1DD",
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
          borderTop: "1px solid rgba(255,255,255,0.08)",
          paddingTop: "28px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "rgba(203, 172, 249, 0.2)",
              border: "2px solid rgba(203, 172, 249, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#CBACF9",
              fontWeight: 700,
              fontSize: "18px",
            }}
          >
            AR
          </div>
          <span style={{ color: "#FFFFFF", fontSize: "20px", fontWeight: 600 }}>
            Adrian Rusan
          </span>
        </div>
        <span style={{ color: "#BEC1DD", fontSize: "18px", opacity: 0.7 }}>
          {footerRight}
        </span>
      </div>
    </div>,
    OG_SIZE,
  );
}
