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
                // New Design Theme Colors
                "primary": "#264653", // Deep Teal/Ocean Slate
                "secondary": "#457B9D", // Muted Blue-Gray
                "background-light": "#F8F9FA", // Cool Off-White
                "background-dark": "#121212", // Dark Background
                "surface-light": "#FFFFFF",
                "surface-dark": "#1E1E1E",
                "card-dark": "#2A2A2A",
                "text-main": "#333333", // Charcoal
                "text-muted": "#6B7280", // Muted Cool Gray
                "accent-danger": "#B91C1C", // Muted Crimson
                "accent-info": "#475569", // Desaturated Blue-Gray

                // Legacy colors (keeping for backward compatibility)
                "accent": "#F47C3C", // Coral Orange
                "accent-light": "#A3E4D7", // Light Cyan
                "card-light": "#FFFFFF",
                "text-main-light": "#333333",
                "text-main-dark": "#E0FBFC",
                "accent-sand": "#E6DCCA",
                "accent-cyan": "#E0FBFC",
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
                // Safety mode color aliases
                "safety-primary": "#D94E3B",
                "safety-secondary": "#006D77",
                "safety-bg-light": "#F9F7F2",
                "safety-bg-dark": "#2C3539",
                "safety-card-light": "#FFFBF5",
                "safety-card-dark": "#374146",
                "safety-accent-sand": "#E6DCCA",
                "safety-accent-cyan": "#E0FBFC",
                "safety-text-light": "#2C3539",
                "safety-text-dark": "#E0FBFC",
                "sand": "#F0EBD8", // Warm Sand for safety mode
            },
            fontFamily: {
                "display": ["Inter", "sans-serif"],
                "body": ["Inter", "sans-serif"],
                "serif": ["Playfair Display", "serif"],
                "manrope": ["Manrope", "sans-serif"],
                "lato": ["Lato", "sans-serif"],
            },
            borderRadius: {
                "DEFAULT": "0.5rem",
                "lg": "1rem",
                "xl": "1.5rem",
                "2xl": "1.5rem",
                "full": "9999px"
            },
            boxShadow: {
                "soft": "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
                "card": "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)",
                "glow": "0 0 15px rgba(217, 78, 59, 0.3)",
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
