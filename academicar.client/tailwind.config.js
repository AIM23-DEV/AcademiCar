/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
export default {
    content: [
        "./src/**/*.{js,jsx,ts,tsx,scss}",
        "./public/index.html",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Noto Sans Variable', ...defaultTheme.fontFamily.sans],
                title: ['Outfit Variable', ...defaultTheme.fontFamily.sans]
            },
            colors: {
                // Primary
                "primary-50": "rgb(var(--primary-50) / <alpha-value>)",
                "primary-100": "rgb(var(--primary-100) / <alpha-value>)",
                "primary-200": "rgb(var(--primary-200) / <alpha-value>)",
                "primary-300": "rgb(var(--primary-300) / <alpha-value>)",
                "primary-400": "rgb(var(--primary-400) / <alpha-value>)",
                "primary-500": "rgb(var(--primary-500) / <alpha-value>)",
                "primary-600": "rgb(var(--primary-600) / <alpha-value>)",
                "primary-700": "rgb(var(--primary-700) / <alpha-value>)",
                "primary-800": "rgb(var(--primary-800) / <alpha-value>)",
                "primary-900": "rgb(var(--primary-900) / <alpha-value>)",
                "primary-950": "rgb(var(--primary-950) / <alpha-value>)",
                // Secondary
                "secondary-50": "rgb(var(--secondary-50) / <alpha-value>)",
                "secondary-100": "rgb(var(--secondary-100) / <alpha-value>)",
                "secondary-200": "rgb(var(--secondary-200) / <alpha-value>)",
                "secondary-300": "rgb(var(--secondary-300) / <alpha-value>)",
                "secondary-400": "rgb(var(--secondary-400) / <alpha-value>)",
                "secondary-500": "rgb(var(--secondary-500) / <alpha-value>)",
                "secondary-600": "rgb(var(--secondary-600) / <alpha-value>)",
                "secondary-700": "rgb(var(--secondary-700) / <alpha-value>)",
                "secondary-800": "rgb(var(--secondary-800) / <alpha-value>)",
                "secondary-900": "rgb(var(--secondary-900) / <alpha-value>)",
                "secondary-950": "rgb(var(--secondary-950) / <alpha-value>)",
                // Accent
                "accent-50": "rgb(var(--accent-50) / <alpha-value>)",
                "accent-100": "rgb(var(--accent-100) / <alpha-value>)",
                "accent-200": "rgb(var(--accent-200) / <alpha-value>)",
                "accent-300": "rgb(var(--accent-300) / <alpha-value>)",
                "accent-400": "rgb(var(--accent-400) / <alpha-value>)",
                "accent-500": "rgb(var(--accent-500) / <alpha-value>)",
                "accent-600": "rgb(var(--accent-600) / <alpha-value>)",
                "accent-700": "rgb(var(--accent-700) / <alpha-value>)",
                "accent-800": "rgb(var(--accent-800) / <alpha-value>)",
                "accent-900": "rgb(var(--accent-900) / <alpha-value>)",
                "accent-950": "rgb(var(--accent-950) / <alpha-value>)"
            }
        },
    },
    safelist: [
        'text-right',
        'text-center',
        'text-left',
    ],
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/aspect-ratio'),
    ],
}