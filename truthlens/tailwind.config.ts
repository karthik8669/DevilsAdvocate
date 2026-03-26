import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "border-red-500", "text-red-400", "text-red-500", "shadow-[0_0_15px_rgba(239,68,68,0.25)]",
    "border-orange-500", "text-orange-400", "shadow-[0_0_15px_rgba(249,115,22,0.25)]",
    "border-purple-500", "text-purple-400", "shadow-[0_0_15px_rgba(168,85,247,0.25)]",
    "border-yellow-500", "text-yellow-400", "shadow-[0_0_15px_rgba(234,179,8,0.25)]",
    "border-green-500", "text-green-400",
    "from-red-500/20", "from-orange-400/20", "from-yellow-400/20", "from-green-500/20",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;

