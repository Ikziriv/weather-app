import adapter from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';
import path from "path";

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://github.com/sveltejs/svelte-preprocess
    // for more information about preprocessors
    preprocess: preprocess({
        postcss: true,
        scss: true
    }),

    kit: {
        adapter: adapter(),
        vite: {
            resolve: {
                alias: {
                    '$interactions': path.resolve('./src/lib/interactions'),
                    '$globals': path.resolve('./src/lib/components/globals'),
                    '$sections': path.resolve('./src/lib/components/sections'),
                    '$components': path.resolve('./src/lib/components'),
                    '$contents': path.resolve('./src/lib/contents'),
                    '$stores': path.resolve('./src/lib/stores'),
                    '$styles': path.resolve('./src/styles'),
                    '$utils': path.resolve('./src/lib/utils'),
                    '$assets': path.resolve('./src/assets'),
                    '$lib': path.resolve('./src/lib')
                }
            },
        },
    }
};

export default config;