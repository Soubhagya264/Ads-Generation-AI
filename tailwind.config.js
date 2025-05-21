module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            animation: {
                border: "borderMove 3s linear infinite",
            },
            keyframes: {
                borderMove: {
                    "0%": { backgroundPosition: "0% 50%" },
                    "100%": { backgroundPosition: "100% 50%" },
                },
            },
            backgroundSize: {
                "200%": "200% 200%",
            },
        },
    },
    plugins: [],
    darkMode: 'class', // You can change this based on your preference
};
