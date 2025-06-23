/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",      // ★ 追加
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#004B9B",   // 旭光電機ブルー
          light:  "#3F77C6",
          dark:   "#003370",
        },
        accent: "#1ABC9C",
      },
      fontFamily: {
        sans: ["'Noto Sans JP'", ...require("tailwindcss/defaultTheme").fontFamily.sans],
      },
    },
  },
  plugins: [],
};
