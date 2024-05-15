import type { Config } from "tailwindcss";
import { withUt } from "uploadthing/tw";

const config: Config = withUt({
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    colors: {
      "primary-dark": "#001BCC",
      "primary-medium": "#007FFF",
      "off-white": "#F2F1EB",
      "custom-white": "#fffdf7",
      "dark-gray": "#4F4F4D",
      "success-green": "#5cb85c",
      "completed-blue": "#0077B5",
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
        xs: "475px",
        mobile: "250px",
      },
    },
    extend: {
      fontFamily: {
        ttnorms: ["TTNormsPro", "sans-serif"],
      },
      // Accordion keyframes and animation are used in ShadCN components
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}) satisfies Config;

export default config;
