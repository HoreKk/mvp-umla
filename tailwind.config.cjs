/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		fontFamily:{
			'sans': ['Integral'],
			'roswell': ['Roswell'],
			'rama-gothic': ['Rama Gothic'],
		},
		extend: {
			colors: {
				'umla-dark-blue': '#253c5d',
				'umla-blue': '#2a85b8',
				'umla-light-blue': '#2da2bb',
				'umla-green': '#2d635f',
				'umla-sand': '#c1b276',
				'umla-red': '#b9191c',
				'umla-yellow': '#f5f312',
			},
		},
	},
	plugins: [],
}
