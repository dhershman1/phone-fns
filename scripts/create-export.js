const fs = require('fs')
const path = require('path')
const globby = require('globby')

const files = globby.sync(['src/**/*.js', '!src/index.js', '!src/common.js', '!src/_internals'])

fs.writeFileSync('./src/index.js', `${files.map(f => {
  const { base, name } = path.parse(f)

  return `export { default as ${name} } from './${base}'`
}).join('\n')}\n`)

console.log('Finished Writing Exports...')
