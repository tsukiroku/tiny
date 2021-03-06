/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{html,js,svelte,ts}',
    ],
    theme: {
        extend: {
            colors: {
                'background': '#1e1e1e',
                'sidebar': '#252525',
                'header': '#151515',
                'footer': '#007acc',
                'background-light': '#ffffff',
                'sidebar-light': '#f3f3f3',
                'header-light': '#dddddd',
                'black': '#000000',
            }
        },
    },
    plugins: [],
}