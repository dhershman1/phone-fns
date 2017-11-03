import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify';

export default {
	input: 'src/esm/index.js',
	name: 'phoneFns',
	output: {
		format: 'umd',
		file: 'phone-fns.min.js'
	},
	plugins: [
		buble({
			exclude: ['callingCodes.js']
		}),
		uglify()
	]
};
