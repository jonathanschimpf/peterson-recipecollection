import adapter from '@sveltejs/adapter-netlify';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),
	kit: {
		adapter: adapter({
			split: false // 🛠️ AVOIDS TRYING TO WRITE '_headers/_redirects' INTO BUILD
		}),
		alias: {
			$lib: './src/lib'
		}
	}
};

export default config;
