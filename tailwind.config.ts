import type { Config } from 'tailwindcss';

export default {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
				menuPrimary: '#374151',
				menuSecondary: '#4ade80',
				menuTertiary: '#329d5b',
				inputBackground: '#4b5563',
			},
		},
	},
	plugins: [],
} satisfies Config;
