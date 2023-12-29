import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#0036ff",

          "secondary": "#5461ff",

          "accent": "#0000ff",

          "neutral": "#0f1514",

          "base-100": "#fffbff",

          "info": "#00adff",

          "success": "#00f388",

          "warning": "#ffc100",

          "error": "#ff7c8a",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
export default config
