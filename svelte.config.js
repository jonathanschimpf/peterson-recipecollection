import adapter from '@sveltejs/adapter-netlify';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),

	kit: {
		adapter: adapter({
			split: false // 🛠️ PREVENTS CONFLICTS WRITING _headers/_redirects
		}),

		alias: {
			$lib: './src/lib'
		}
	}
};

export default config;
