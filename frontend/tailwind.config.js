/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // Light mode colors - GitHub + HackerRank inspired
                light: {
                    bg: '#ffffff',
                    'bg-secondary': '#f6f8fa',
                    text: '#24292f',
                    'text-secondary': '#57606a',
                    border: '#d0d7de',
                    accent: '#0969da',
                    success: '#1a7f37',
                },
                // Dark mode colors - Matrix/Terminal inspired
                dark: {
                    bg: '#0d1117',
                    'bg-secondary': '#161b22',
                    'bg-tertiary': '#1c2128',
                    text: '#c9d1d9',
                    'text-secondary': '#8b949e',
                    border: '#30363d',
                    accent: '#58a6ff',
                    matrix: '#00ff41',
                    'matrix-dim': '#00cc33',
                    terminal: '#39ff14',
                }
            },
            animation: {
                'fade-in': 'fadeIn 0.3s ease-in',
                'slide-in': 'slideIn 0.4s ease-out',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideIn: {
                    '0%': { transform: 'translateY(10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                glow: {
                    '0%': { boxShadow: '0 0 5px rgba(0, 255, 65, 0.5)' },
                    '100%': { boxShadow: '0 0 20px rgba(0, 255, 65, 0.8)' },
                },
            },
        },
    },
    plugins: [],
}
