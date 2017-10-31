import buble from 'rollup-plugin-buble';
// import uglify from 'rollup-plugin-uglify';

export default {
	input: 'src/index.js',
	name: 'phoneFns',
	output: {
		format: 'umd',
		file: 'dist/phone-fns.umd.js'
	},
	plugins: [
		buble()
	]
};
