/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Acumin', 'sans-serif'],
				serif: ['Moret', 'serif'],
			},
			colors: {
				primary: '#97a89b'
			}
		},
	},
	plugins: [],
}
