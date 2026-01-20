/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                alpine: {
                    50: '#f0f9ff',  // Snow/Ice white
                    100: '#e0f2fe',
                    200: '#bae6fd',
                    300: '#7dd3fc', // Sky blue
                    400: '#38bdf8',
                    500: '#0ea5e9', // Vivid blue
                    600: '#0284c7',
                    700: '#0369a1',
                    800: '#075985',
                    900: '#0c4a6e', // Deep Navy
                    950: '#082f49',
                },
                stone: {
                    50: '#fafaf9',
                    100: '#f5f5f4',
                    200: '#e7e5e4',
                    300: '#d6d3d1',
                    400: '#a8a29e', // Granite
                    500: '#78716c',
                    600: '#57534e',
                    700: '#44403c',
                    800: '#292524', // Dark Rock
                    900: '#1c1917',
                    950: '#0c0a09',
                }
            },
            fontFamily: {
                sans: ['Lato', 'sans-serif'],
                display: ['Oswald', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            }
        },
    },
    plugins: [],
}
