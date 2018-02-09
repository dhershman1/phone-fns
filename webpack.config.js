const path = require('path');
const globby = require('globby');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const findEntries = () => {
  const results = {};
  const paths = globby.sync(['src/**/index.js']);

  paths.forEach(p => {
    const { name, dir } = path.parse(p);
    let [, moduleName] = dir.split('/');

    if (name !== 'index') {
      moduleName = name;
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
    new UglifyJSPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ],
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env']
          }
        }
      }
    ]
  }
};
