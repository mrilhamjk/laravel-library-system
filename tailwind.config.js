/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/**/*.js",
        "./resources/**/**/**/*.js",
        "./resources/**/*.jsx",
        "./resources/**/**/*.jsx",
        "./resources/**/**/**/*.jsx",
        "./resources/**/*.vue",
    ],
    theme: {
        extend: {
            fontFamily: {
                roboto: ["Roboto", "sans-serif"],
            },
            boxShadow: {
                me: "0px 5px 10px #0f172a1a",
            },
            animation: {
                "spin-slow": "spin 3s linear infinite",
            },
        },
    },
    plugins: [],
};
