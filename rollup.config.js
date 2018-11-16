import babel from 'rollup-plugin-babel'
import cleanup from 'rollup-plugin-cleanup'
import filesize from 'rollup-plugin-filesize'
import { terser } from 'rollup-plugin-terser'

export default [{
  input: './src/index.js',
  plugins: [
    babel(),
    terser(),
    filesize()
  ],
  external: [
    'kyanite'
  ],
  output: {
    file: 'dist/phone-fns.min.js',
    format: 'umd',
    name: 'phoneFns',
    globals: {
      'kyanite': 'kyanite'
    },
    exports: 'named'
  }
}, {
  input: './src/index.js',
  plugins: [
    babel(),
    cleanup(),
    filesize()
  ],
  external: [
    'kyanite'
  ],
  output: {
    file: 'dist/phone-fns.js',
    format: 'umd',
    name: 'phoneFns',
    globals: {
      'kyanite': 'kyanite'
    },
    exports: 'named'
  }
}]
