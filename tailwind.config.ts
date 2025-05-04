import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2E7D32",
        "primary-light": "#60ad5e",
        "primary-dark": "#005005",
        secondary: "#546E7A",
        "secondary-light": "#819ca9",
        "secondary-dark": "#29434e",
        background: "#FFFFFF",
        surface: "#F5F5F5",
        error: "#B00020",
        text: {
          primary: "#333333",
          secondary: "#666666",
          disabled: "#9E9E9E",
        },
      },
      fontFamily: {
        sans: ["var(--font-tajawal)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config; 