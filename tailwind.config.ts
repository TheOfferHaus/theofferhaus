import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "primary-dark": "#001BCC",
      "primary-medium": "#007FFF",
      "off-white": "#F2F1EB",
      "custom-white": "#fffdf7",
    },
    extend: {
    },
  },
  plugins: [],
};
export default config;
