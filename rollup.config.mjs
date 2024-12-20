import postcss from 'rollup-plugin-postcss';
import path from 'path';
import copy from 'rollup-plugin-copy';
import url from 'postcss-url';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
	input: 'src/app.js',
	output: {
		dir: 'dist',
		format: 'iife',
	},
	plugins: [
		postcss({
			extract: path.resolve('dist/style.css'),
			modules: false,
			minimize: true,
			plugins: [
				url({
					url: (asset) => {
						if (asset.url.startsWith('/static/icons/')) {
							return `icons/${asset.url.split('/').pop()}`;
						}
						return asset.url;
					},
				}),
			],
		}),
		copy({
			targets: [
				{ src: 'static/icons/*', dest: 'dist/icons' },
			],
		}),
		nodeResolve(),
	],
};