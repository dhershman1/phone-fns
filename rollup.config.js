import babel from 'rollup-plugin-babel'
import cleanup from 'rollup-plugin-cleanup'
import filesize from 'rollup-plugin-filesize'
import uglify from 'rollup-plugin-uglify'

export default [{
  input: './src/index.js',
  plugins: [
    babel({
      babelrc: false,
      presets: [
        [
          '@babel/preset-env',
          {
            'targets': {
              'browsers': [
                'last 2 versions',
                'ie >= 9'
              ]
            },
            'modules': false
          }
        ],
        ['@babel/preset-stage-2', {
          'decoratorsLegacy': true
        }]
      ],
      exclude: 'node_modules/**',
      runtimeHelpers: true
    }),
    uglify(),
    filesize()
  ],
  output: {
    file: 'dist/phone-fns.min.js',
    format: 'umd',
    name: 'phoneFns'
  }
}, {
  input: './src/index.js',
  plugins: [
    babel({
      babelrc: false,
      presets: [
        [
          '@babel/preset-env',
          {
            'targets': {
              'browsers': [
                'last 2 versions',
                'ie >= 9'
              ]
            },
            'modules': false
          }
        ],
        ['@babel/preset-stage-2', {
          'decoratorsLegacy': true
        }]
      ],
      exclude: 'node_modules/**',
      runtimeHelpers: true
    }),
    cleanup(),
    filesize()
  ],
  output: {
    file: 'dist/phone-fns.js',
    format: 'umd',
    name: 'phoneFns'
  }
}]
