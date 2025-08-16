import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // New luxury color palette
        charcoal: {
          DEFAULT: '#2C3539',
          light: '#3F4A4F',
          dark: '#1A1F22',
        },
        beige: {
          DEFAULT: '#E6D5B8',
          light: '#F0E7D6',
          dark: '#D4C4A8',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#E8C766',
          dark: '#B38F2E',
        },
        // Semantic colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: '#2C3539', // Charcoal
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#E6D5B8', // Beige
          foreground: '#2C3539',
        },
        accent: {
          DEFAULT: '#D4AF37', // Gold
          foreground: '#2C3539',
        },
        destructive: {
          DEFAULT: '#EF4444',
          foreground: '#FFFFFF',
        },
        muted: {
          DEFAULT: '#F8F5F0', // Off-white
          foreground: '#8E8E8E', // Medium gray
        },
        popover: {
          DEFAULT: '#FFFFFF',
          foreground: '#333333', // Dark gray for text
        },
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#333333',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
