/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./app/components/**/*.{js,vue,ts}",
        "./app/layouts/**/*.vue",
        "./app/pages/**/*.vue",
        "./app/plugins/**/*.{js,ts}",
        "./app/app.vue",
        "./app/error.vue",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "var(--color-primary)", // Deep Teal default
                "secondary": "var(--color-secondary)", // Warm Sand default
                "accent": "var(--color-accent)", // Coral Orange default
                "background-light": "var(--color-bg-light)", // Off-white
                "background-dark": "var(--color-bg-dark)", // Dark Charcoal
                "surface-light": "var(--color-surface-light)",
                "surface-dark": "var(--color-surface-dark)",
                "text-main": "var(--color-text-main)",
                "text-muted": "var(--color-text-muted)",
                "charcoal": "#2D3436",
                "teal-deep": "#004d40",
                "teal-light": "#00695c",
                "warm-sand": "#f3e5dc",
                "coral-orange": "#ff7f50",
                "light-cyan": "#e0f2f1",
                "dining-primary": "#13daec",
                "dining-dark": "#102022",
                "culture-primary": "#f45c25",
                "culture-bg-light": "#f8f6f5",
                "culture-bg-dark": "#221510",
                "culture-text-main": "#181311",
                "culture-text-muted": "#8a6b60",
                "weather-primary": "#f45c25",
                "weather-bg-light": "#f8f6f5",
                "weather-bg-dark": "#221510",
                "weather-surface-light": "#ffffff",
                "weather-surface-dark": "#2a1d18",
                "weather-text-main": "#181311",
                "weather-text-muted": "#8a6b60",
            },
            fontFamily: {
                "display": ["Plus Jakarta Sans", "sans-serif"],
                "serif": ["Playfair Display", "serif"],
                "manrope": ["Manrope", "sans-serif"],
            },
            borderRadius: {
                "DEFAULT": "1rem",
                "lg": "2rem",
                "xl": "3rem",
                "full": "9999px"
            },
            boxShadow: {
                "soft": "0 4px 20px -2px rgba(0, 77, 64, 0.08)",
            },
            keyframes: {
                'pulse-orange': {
                    '0%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(244, 124, 60, 0.7)' },
                    '70%': { transform: 'scale(1)', boxShadow: '0 0 0 10px rgba(244, 124, 60, 0)' },
                    '100%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(244, 124, 60, 0)' },
                },
                'dash': {
                    'to': { strokeDashoffset: '-100' }
                }
            },
            animation: {
                'pulse-orange': 'pulse-orange 2s infinite',
                'dash': 'dash 20s linear infinite',
            },
        },
    },
}
