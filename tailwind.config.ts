import type { Config } from "tailwindcss";
import { withUt } from "uploadthing/tw";
const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			primary: "#C72F44"
  		},
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default withUt(config);