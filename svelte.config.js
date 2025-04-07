import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	kit: {
		// Revenons à la configuration de base de l'adaptateur
		adapter: adapter()
	},
	preprocess: vitePreprocess()
};

export default config;
