import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        menuPrimary: "var(--menuPrimary)",
        menuSecondary: "var(--menuSecondary)",
        menuTertiary: "var(--menuTertiary)",
        inputBackground: "var(--inputBackground)",
        text: "var(--text)",
      },
    },
  },
  plugins: [],
} satisfies Config;
