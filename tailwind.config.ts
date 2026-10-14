import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  // next-themes adds "dark" at runtime. Without a literal "dark" class in the
  // scanned files, Tailwind purges the `.dark { … }` token block in globals.css.
  safelist: ["dark"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // #114 M: Host Grotesk for everything, Geist Mono for small meta and code.
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      // "white" text and borders mean foreground in this dark-first codebase,
      // so they flip in light mode; bg-white stays literal white.
      textColor: { white: { DEFAULT: "rgb(var(--fg) / <alpha-value>)" } },
      borderColor: { white: { DEFAULT: "rgb(var(--fg) / <alpha-value>)" } },
      placeholderColor: { white: { DEFAULT: "rgb(var(--fg) / <alpha-value>)" } },
      colors: {
        // Brand tokens flip with the theme; values live in app/globals.css.
        black: {
          DEFAULT: "#000",
          100: "rgb(var(--black-100) / <alpha-value>)",
          200: "rgb(var(--black-200) / <alpha-value>)",
          300: "var(--black-300)",
        },
        white: {
          DEFAULT: "#FFF",
          100: "rgb(var(--white-100) / <alpha-value>)",
          200: "rgb(var(--white-200) / <alpha-value>)",
        },
        blue: {
          "100": "rgb(var(--blue-100) / <alpha-value>)",
        },
        purple: "rgb(var(--purple) / <alpha-value>)",
        chip: "rgb(var(--chip) / <alpha-value>)",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;

export default config;