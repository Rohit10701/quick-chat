import type { Config } from "tailwindcss";

const config: Config = {
  darkMode : "class", 
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        "charcoal": "#333333",
        "graphite": "#424242",
        "ebony": "#555555",
        "jet-black": "#666666",
        "cinder": "#777777",
        "slate": "#888888",
        "iron": "#999999",
        "smoke": "#AAAAAA",
        "whisper-white": "#DDDDDD",
        "white" : "#fff",
        "msgblue" : "#006aff"
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
