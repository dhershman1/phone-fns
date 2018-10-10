import babel from 'rollup-plugin-babel'
import cleanup from 'rollup-plugin-cleanup'
import filesize from 'rollup-plugin-filesize'
import { uglify } from 'rollup-plugin-uglify'

export default [{
  input: './src/index.js',
  plugins: [
    babel(),
    uglify(),
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
    }
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
    }
  }
}]
