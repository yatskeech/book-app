import postcss from 'rollup-plugin-postcss';
import path from 'path';
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
		}),
		nodeResolve(),
	],
};