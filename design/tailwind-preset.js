/** Tayang — Tailwind v3 compatibility preset. v4 users prefer design/theme.css. */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
        display: ["Plus Jakarta Sans", "Poppins", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#fff8e6",
          100: "#ffefc2",
          200: "#ffe095",
          300: "#ffcd55",
          400: "#fbb828",
          500: "#f59e0b",
          600: "#e2820a",
          700: "#b9650a",
        },
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        muted: "var(--color-muted)",
        "muted-foreground": "var(--color-muted-foreground)",
        border: "var(--color-border)",
        card: "var(--color-card)",
        primary: "var(--color-primary)",
        "primary-foreground": "var(--color-primary-foreground)",
        soft: "var(--color-soft)",
        accent: "var(--color-accent)",
        success: "var(--color-success)",
        danger: "var(--color-danger)",
      },
      borderRadius: { DEFAULT: "1rem", lg: "1.375rem", xl: "1.875rem" },
      boxShadow: { card: "0 18px 40px -22px rgba(29,34,49,0.18)" },
    },
  },
};
