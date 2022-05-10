import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import path from "path";

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://github.com/sveltejs/svelte-preprocess
    // for more information about preprocessors
    preprocess: preprocess({
        postcss: true,
        scss: true,
        preserve: ["ld+json"]
    }),

    kit: {
        adapter: adapter(),
        prerender: {
            crawl: true,
            enabled: true,
            onError: "fail",
            entries: ["*"],
        },
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
            build: {},
            plugins: [],
        },
        files: {
            assets: 'static',
            lib: 'src/lib',
            routes: 'src/routes',
            template: 'src/app.html',
            hooks: 'src/hooks'
        },
    }
};

export default config;