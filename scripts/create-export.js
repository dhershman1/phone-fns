const fs = require('fs')
const path = require('path')
const globby = require('globby')

const propertyRequireLines = globby.sync(['src/*.js', '!src/index.js'])
  .map(file => {
    const { base, name } = path.parse(file)

    return `export { default as ${name} } from './${base}'`
  })
const indexLines = []
  .concat(propertyRequireLines.join('\n'))
  .join('\n')

fs.writeFileSync('src/index.js', `${indexLines}\n`)
