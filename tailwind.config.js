/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'quran-gold': '#D4AF37',
        'quran-blue': '#1E40AF',
        'quran-green': '#059669',
        'pattern-1-even': '#3B82F6',
        'pattern-1-odd': '#10B981',
        'pattern-3-highlight': '#F59E0B',
        'pattern-4-combo1': '#EF4444',
        'pattern-4-combo2': '#8B5CF6',
        'pattern-4-combo3': '#06B6D4',
        'pattern-4-combo4': '#F97316',
        'pattern-9-prime': '#7C3AED',
        'pattern-9-nth': '#A855F7',
        'pattern-10-repetitive': '#DC2626',
        'pattern-10-nonrep': '#2563EB'
      }
    },
  },
  plugins: [],
}
