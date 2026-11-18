import fs from 'node:fs/promises'
import path from 'node:path'

const files = (await fs.readdir('src', { withFileTypes: true }))
  .filter(f => f.isFile() && f.name.endsWith('.js') && f.name !== 'index.js')
  .map(f => f.name)
  .sort()

const exportsList = files
  .map(base => `export { default as ${path.parse(base).name} } from './${base}'`)
  .join('\n')

// Shared types that should be importable from the package, e.g. `import type { Breakdown } from 'phone-fns'`
const typeExports = [
  "/** @typedef {import('./breakdown.js').Breakdown} Breakdown */"
].join('\n')

await fs.writeFile('src/index.js', `${typeExports}\n\n${exportsList}\n`)
console.log('Finished Writing Exports... Wrapping up...')
