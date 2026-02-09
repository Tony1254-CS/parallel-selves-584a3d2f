import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
      fontFamily: {
        sans: ["Space Grotesk", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
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
        quantum: {
          glow: "hsl(var(--quantum-glow))",
          violet: "hsl(var(--quantum-violet))",
          dark: "hsl(var(--quantum-dark))",
          glass: "hsl(var(--quantum-glass))",
        },
        analyst: "hsl(var(--analyst-hue))",
        rebel: "hsl(var(--rebel-hue))",
        guardian: "hsl(var(--guardian-hue))",
        visionary: "hsl(var(--visionary-hue))",
        realist: "hsl(var(--realist-hue))",
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "quantum-pulse": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.02)" },
        },
        "quantum-float": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-8px) rotate(1deg)" },
          "66%": { transform: "translateY(4px) rotate(-1deg)" },
        },
        "portal-spin": {
          "0%": { transform: "rotate(0deg) scale(0.8)", opacity: "0" },
          "50%": { transform: "rotate(180deg) scale(1.2)", opacity: "1" },
          "100%": { transform: "rotate(360deg) scale(1)", opacity: "0.8" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "glow-breathe": {
          "0%, 100%": { boxShadow: "0 0 15px hsl(var(--primary) / 0.2)" },
          "50%": { boxShadow: "0 0 30px hsl(var(--primary) / 0.4), 0 0 60px hsl(var(--primary) / 0.1)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "quantum-pulse": "quantum-pulse 3s ease-in-out infinite",
        "quantum-float": "quantum-float 6s ease-in-out infinite",
        "portal-spin": "portal-spin 2s ease-in-out",
        shimmer: "shimmer 3s linear infinite",
        "glow-breathe": "glow-breathe 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
