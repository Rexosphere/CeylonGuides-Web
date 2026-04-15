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
                // Unified design-system semantic palette (additive only; legacy keys remain below)
                brand: {
                    primary: {
                        50: "#EAF3F8",
                        100: "#D5E7F1",
                        200: "#AACEE4",
                        300: "#7FB4D6",
                        400: "#4F8FBD",
                        500: "#1B6A8F",
                        600: "#14506F",
                        700: "#0E3A52",
                        800: "#0A2A3B",
                        900: "#071F2C",
                    },
                    secondary: {
                        100: "#F3E8DC",
                        300: "#D8BB99",
                        500: "#B88A5B",
                        600: "#96724B",
                        700: "#7A5A3A",
                    },
                    accent: {
                        100: "#FDE7DD",
                        300: "#F8B295",
                        400: "#F28A5C",
                        500: "#EE6A35",
                        600: "#D85C2E",
                    },
                },
                semantic: {
                    success: "#1D7A46",
                    warning: "#C98212",
                    danger: "#C43D2F",
                    info: "#2B6CB0",
                },
                surface: {
                    canvas: "#F7F5F1",
                    subtle: "#F1EEE8",
                    base: "#FFFFFF",
                    elevated: "#FFFCF8",
                    inverse: "#0F1720",
                },
                text: {
                    strong: "#16212B",
                    default: "#273546",
                    muted: "#5E6C79",
                    soft: "#7F8B96",
                    inverse: "#F5F8FB",
                },

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
                // Unified design-system type tokens (additive, keeps legacy family keys intact)
                "heading": ["Fraunces", "serif"],
                "display": ["Inter", "sans-serif"],
                "body": ["Manrope", "sans-serif"],
                "cultural": ["Noto Serif Sinhala", "serif"],
                "serif": ["Playfair Display", "serif"],
                "manrope": ["Manrope", "sans-serif"],
                "lato": ["Lato", "sans-serif"],
            },
            borderRadius: {
                // Added semantic radius scale while preserving existing DEFAULT/lg/xl values
                "xs": "0.375rem",
                "sm": "0.625rem",
                "md": "0.875rem",
                "DEFAULT": "0.5rem",
                "lg": "1rem",
                "xl": "1.5rem",
                "2xl": "1.5rem",
                "full": "9999px"
            },
            boxShadow: {
                // Design-system shadow tokens (added without removing existing custom shadows)
                "sm": "0 2px 8px rgba(14, 58, 82, 0.08)",
                "md": "0 8px 22px rgba(14, 58, 82, 0.12)",
                "lg": "0 14px 36px rgba(14, 58, 82, 0.18)",
                "focus": "0 0 0 3px rgba(242, 138, 92, 0.35)",
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
