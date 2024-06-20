import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  important: '#root',
  theme: {
    colors: {
      purple: '#5432CF',
      orange: '#EB702E',
      pink: '#FCCFCA',
      cream: '#F9F7ED',
      white: '#FFFFFF',
      blue: '#0047AB',
      mint: '#A0FFC9',
      bone: '#E9E7E6',
      gray: '#cfcfcf',
      gray300: '#707070',
      gray250: '#E8E8E8',
      gray200: '#E0E0E0',
      gray100: '#F7F7F7',
      gray50: '#F5F5F5',
      transparent: 'transparent',
      txt: '#232323',
      red: 'red',
      'light-four': '#F4F4F4',
      lightSecond: '#888888',
      green: '#0DC599',
      'green-two': '#6AA894B9',
      black: '#232323',
      blackIcon: '#7C7B7B',
      purple300: '#5432CF',
    },
    fontSize: {
      xs: '0.65rem',
      sm: '0.8rem',
      base: '1rem',
      lg: '1.15rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    },
    fontFamily: {
      sans: ['Circular Std Medium', 'sans-serif'],

      founders: ['Founders Grotesk', 'sans-serif'],
      helvetica: ['Helvetica', 'sans-serif'],

      display: ['Circular Std Medium', 'sans-serif'],
      body: ['Circular Std Medium', 'sans-serif'],
    },
    extend: {
      height: {
        '80-screen': '80vh',
        '90-screen': '90vh',
        750: '750px',
        800: '800px',
      },
      opacity: {
        55: '0.55',
        65: '0.65',
      },
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('@tailwindcss/forms')({
      strategy: 'class', // only generate classes
    }),
  ],
}};
