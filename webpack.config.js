const path = require('path');
const globby = require('globby');
const webpack = require('webpack');

const findEntries = () => {
	const results = {};
	const paths = globby.sync(['src/*.js', 'src/**/index.js']);

	paths.forEach(p => {
		const { name, dir } = path.parse(p);
		let [, moduleName] = dir.split('/');

		if (name !== 'index') {
			moduleName = name;
		}

		if (moduleName === 'esm') {
			moduleName = 'main';
		}

		results[moduleName] = path.resolve(__dirname, p);
	});

	return results;
};

module.exports = {
	entry: findEntries(),
	output: {
		path: path.resolve(__dirname),
		filename: '[name]/index.js',
		library: 'phoneFns',
		libraryTarget: 'umd'
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			compress: {
				warnings: false
			}
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		})
	],
	module: {
		rules: [
			{
				test: /.js$/,
				loaders: 'buble-loader',
				exclude: /node_modules/
			}
		]
	}
};
