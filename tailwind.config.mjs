/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ['class'],
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				sans: [
					'Acumin',
					'sans-serif'
				],
				serif: [
					'Moret',
					'serif'
				],
				mono: [
					'"Roboto mono"',
					'mono'
				]
			},
			colors: {
				primary: 'rgb(164, 189, 255)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			borderWidth: {
				1: '1px',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
}
