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
                "primary": "#0A3D62", // Deep Teal
                "secondary": "#E6D5B8", // Warm Sand
                "accent": "#F47C3C", // Coral Orange
                "accent-light": "#A3E4D7", // Light Cyan
                "background-light": "#F8F5F0", // Off-white
                "background-dark": "#111a21", // Dark Charcoal
                "charcoal": "#2D3436",
            },
            fontFamily: {
                "display": ["Plus Jakarta Sans", "sans-serif"],
                "serif": ["Playfair Display", "serif"],
            },
            borderRadius: {
                "DEFAULT": "1rem",
                "lg": "2rem",
                "xl": "3rem",
                "full": "9999px"
            },
            keyframes: {
                'pulse-orange': {
                    '0%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(244, 124, 60, 0.7)' },
                    '70%': { transform: 'scale(1)', boxShadow: '0 0 0 10px rgba(244, 124, 60, 0)' },
                    '100%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(244, 124, 60, 0)' },
                }
            },
            animation: {
                'pulse-orange': 'pulse-orange 2s infinite',
            },
        },
    },
}
