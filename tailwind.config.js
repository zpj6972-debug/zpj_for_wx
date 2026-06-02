/** @type {import('tailwindcss').Config} */
const { defaultPreset } = require('tailwindcss-miniprogram-preset')

module.exports = {
  content: [
    "./pages/**/*.{js,wxml}",
    "./components/**/*.{js,wxml}",
  ],
  // 使用小程序预设
  presets: [defaultPreset],
  safelist: [
    'flex', 'flex-row', 'flex-column', 'items-center', 'justify-center', 'justify-between', 'flex-y-center',
    'p-4', 'px-4', 'py-4', 'text-lg', 'font-bold', 'text-blue-500',
    'w-16', 'h-16', 'bg-red-400', 'bg-green-400', 'bg-blue-400', 'rounded',
    'text-white', 'bg-primary',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
