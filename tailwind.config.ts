import type { Config } from "tailwindcss";

const config: Config = {
  // Ensuring consistency with your standalone component architecture
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // Dark mode configuration (requires next-themes)
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        // Brand Palette
        "brand-navy": {
          DEFAULT: "#2B5A96", // Primary brand color (structure, trust, hierarchy)
          light: "#3B6CA8", // Lighter shade for hover/gradients
          dark: "#1A3A61", // Deep shade for dark mode backgrounds
          black: "#09121E", // Deepest navy for backgrounds
          50: "#E6F0FA",
          100: "#CCE0F5",
          200: "#99C2EB",
          300: "#66A3E0",
          400: "#3384D6",
          500: "#2B5A96", // Base
          600: "#224878",
          700: "#1A365A",
          800: "#11243C",
          900: "#09121E",
        },
        "brand-orange": {
          DEFAULT: "#F47920", // Actions, highlights, interactions
          light: "#F79A55",
          dark: "#C35D16",
          50: "#FEF2E8",
          100: "#FDE4D1",
          200: "#FBC9A3",
          300: "#F9AD75",
          400: "#F79247",
          500: "#F47920", // Base
          600: "#C3611A",
          700: "#924913",
          800: "#62300D",
          900: "#311806",
        },
        "brand-sky": {
          DEFAULT: "#7CB9E8", // Soft accents, depth, backgrounds
          light: "#A4D0F1",
          dark: "#4A9ED7",
          50: "#F2F8FC",
          100: "#E5F1FA",
          200: "#CBE2F5",
          300: "#B1D3F0",
          400: "#97C5EB",
          500: "#7CB9E8", // Base
          600: "#4D9AD9",
          700: "#2E7CB8",
          800: "#1F537A",
          900: "#0F293D",
        },
        "brand-gold": {
          DEFAULT: "#EAB308", // Premium CTA (Sign Up, Upgrade)
          light: "#F0C845",
          dark: "#A37D06",
          50: "#FDFBE6",
          100: "#FCF7CD",
          200: "#F8F09B",
          300: "#F5E868",
          400: "#F1E136",
          500: "#EAB308", // Base
          600: "#BB8F06",
          700: "#8C6B05",
          800: "#5D4703",
          900: "#2F2402",
        },
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      borderRadius: {
        "3xl": "24px",
        "4xl": "32px",
        "5xl": "40px",
      },
      boxShadow: {
        "soft-sm": "0 2px 8px -2px rgba(43, 90, 150, 0.08)",
        soft: "0 8px 24px -6px rgba(43, 90, 150, 0.12)",
        "soft-md": "0 12px 32px -8px rgba(43, 90, 150, 0.15)",
        "soft-lg": "0 16px 48px -12px rgba(43, 90, 150, 0.18)",
        "soft-hover": "0 12px 32px -8px rgba(244, 121, 32, 0.2)",
        "soft-primary": "0 8px 24px -6px rgba(43, 90, 150, 0.15)",
        "inner-soft": "inset 0 2px 4px 0 rgba(43, 90, 150, 0.06)",
        "3d": "0 6px 0 0 #2B5A96",
        "3d-pressed": "0 2px 0 0 #2B5A96",
        focus: "0 0 0 3px rgba(244, 121, 32, 0.2)",
      },
      fontFamily: {
        sans: ["var(--font-cairo)", "sans-serif"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.05em" }],
        sm: ["0.875rem", { lineHeight: "1.5", letterSpacing: "0.025em" }],
        base: ["1rem", { lineHeight: "1.6", letterSpacing: "0" }],
        lg: ["1.125rem", { lineHeight: "1.6", letterSpacing: "-0.01em" }],
        xl: ["1.25rem", { lineHeight: "1.5", letterSpacing: "-0.02em" }],
        "2xl": ["1.5rem", { lineHeight: "1.4", letterSpacing: "-0.02em" }],
        "3xl": ["1.875rem", { lineHeight: "1.3", letterSpacing: "-0.03em" }],
        "4xl": ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.03em" }],
        "5xl": ["3rem", { lineHeight: "1.1", letterSpacing: "-0.04em" }],
        "6xl": ["3.75rem", { lineHeight: "1.1", letterSpacing: "-0.04em" }],
        "7xl": ["4.5rem", { lineHeight: "1", letterSpacing: "-0.05em" }],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "fade-in-up": "fadeInUp 0.6s ease-out",
        "slide-in": "slideIn 0.4s ease-out",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
        "bounce-in": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },
    },
  },
  plugins: [],
};

export default config;
