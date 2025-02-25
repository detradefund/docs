import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		port: 3000,
		strictPort: true // Empêche Vite d'utiliser un autre port si 3000 est occupé
	}
}); 