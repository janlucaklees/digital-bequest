import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [svelte()],
	base: '/digital-bequest/',
	css: {
		preprocessorOptions: {
			scss: {
				silenceDeprecations: ['import', 'global-builtin']
			}
		}
	},
	build: {
		outDir: './docs'
	}
});
