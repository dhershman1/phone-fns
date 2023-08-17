import fs from 'fs/promises'
import path from 'path'
import { globby } from 'globby'

const globFiles = ['src/**/*.js', '!src/index.js', '!src/common.js', '!src/_internals']
const files = await globby(globFiles)

const buildRes = () =>
  files.sort().map(f => {
    const { base, name } = path.parse(f)

    return `export { default as ${name} } from './${base}'`
  }).join('\n')

// Build Exports
fs.writeFile('src/index.js', `${buildRes('standard')}\n`)
  .then(() => console.log('Finished Writing Exports... Wrapping up...'))
  .catch(console.error)
