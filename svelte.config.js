import adapter from '@sveltejs/adapter-netlify';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),

	kit: {
		adapter: adapter({
			split: false
		}),
		alias: {
			$lib: './src/lib'
		},
		prerender: {
			entries: ['*', '/'] // ← MAKE SURE '/' is included here
		}
	}
};

export default config;
