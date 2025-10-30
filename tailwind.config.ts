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
        // Primary colors matching pp.app
        primary: "#1F41BB", // Blue from pp.app
        "primary-dark": "#1a35a0",
        "primary-light": "#f1f4ff",
        
        // Secondary colors
        secondary: "#2E7D32", // Green (keeping for compatibility)
        "secondary-light": "#60ad5e",
        "secondary-dark": "#005005",
        
        // Text colors
        "text-primary": "#000000",
        "text-secondary": "#626262",
        "text-white": "#FFFFFF",
        
        // Background colors
        background: "#FFFFFF",
        surface: "#F5F5F5",
        
        // Border and gray colors
        gray: "#ECECEC",
        "gray-light": "#E0E0E0",
        "gray-dark": "#626262",
        
        // Error colors
        error: "#FF5733",
        
        // Additional colors from pp.app
        dark: "#626262",
        blue: "#1F41BB",
        lightBlue: "#f1f4ff",
      },
      fontFamily: {
        sans: ["var(--font-tajawal)", "Tajawal", "sans-serif"],
      },
      spacing: {
        // Spacing system matching pp.app (Spacing = 10)
        'spacing': '10px',
        'spacing-2': '20px',
        'spacing-3': '30px',
        'spacing-4': '40px',
      },
      fontSize: {
        // Font sizes matching pp.app
        'small': '14px',
        'medium': '16px',
        'large': '20px',
        'xlarge': '30px',
        'xxlarge': '35px',
      },
      borderRadius: {
        'xl': '15px',
        '2xl': '30px',
      },
      boxShadow: {
        'card': '0 2px 4px rgba(0, 0, 0, 0.1)',
        'button': '0 4px 10px rgba(31, 65, 187, 0.3)',
      },
    },
  },
  plugins: [],
};

export default config; 