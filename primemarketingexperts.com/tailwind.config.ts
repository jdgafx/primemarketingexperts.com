import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "rgb(249, 115, 22)", // Orange 500
                    dark: "rgb(234, 88, 12)",     // Orange 600
                },
                footer: "rgb(15, 23, 42)",      // Dark Blue
            },
        },
    },
    plugins: [],
};
export default config;
