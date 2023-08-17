import babel from '@rollup/plugin-babel'
import filesize from 'rollup-plugin-filesize'
import terser from '@rollup/plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default [{
  input: './src/index.js',
  plugins: [
    babel({ babelHelpers: 'bundled', presets: [['@babel/preset-env', { targets: { ie: '11' } }]] }),
    terser(),
    filesize({
      showMinifiedSize: false
    })
  ],
  external: [
    'kyanite'
  ],
  output: {
    file: 'dist/phone-fns.min.js',
    format: 'es',
    name: 'phoneFns'
  }
}, {
  input: './src/index.js',
  plugins: [
    babel({ babelHelpers: 'bundled', presets: [['@babel/preset-env', { targets: { ie: '11' } }]] }),
    terser(),
    filesize({
      showMinifiedSize: false
    })
  ],
  external: [
    'kyanite'
  ],
  output: {
    file: 'dist/phone-fns.min.cjs',
    format: 'cjs',
    name: 'phoneFns'
  }
}, {
  input: './src/index.js',
  plugins: [
    babel({ babelHelpers: 'bundled', presets: [['@babel/preset-env', { targets: { ie: '11' } }]] }),
    terser(),
    nodeResolve({ browser: true }),
    filesize({
      showMinifiedSize: false
    })
  ],
  output: {
    file: 'dist/phone-fns.iife.min.js',
    format: 'iife',
    name: 'phoneFns'
  }
}]
