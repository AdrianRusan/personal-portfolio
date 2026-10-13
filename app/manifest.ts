import type { MetadataRoute } from "next";

// Replaces public/site.webmanifest (empty names, icons that 404'd).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Adrian Rusan",
    short_name: "Adrian Rusan",
    description:
      "Agent-accelerated delivery, every PR security-reviewed by a senior engineer.",
    start_url: "/",
    display: "standalone",
    background_color: "#F4F3EE",
    theme_color: "#F4F3EE",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
