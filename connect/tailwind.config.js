/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                blue: {
                    1: "#1c5279",
                    2: "#6788a0",
                },
                gray: {
                    1: "#b6b6be",
                },
                black: {
                    1: "#23272b",
                },
                white: {
                    1: "#fcfdfd",
                },
            },
        },
    },
    plugins: [],
};
