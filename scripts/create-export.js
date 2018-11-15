const fs = require('fs')
const path = require('path')
const globby = require('globby')

const files = globby.sync(['src/**/*.js', '!src/index.js', '!src/common.js', '!src/_internals'])

// const propertyRequireLines = globby.sync(['src/*.js', '!src/index.js'])
//   .map(file => {
//     const { base, name } = path.parse(file)

//     return `export { default as ${name} } from './${base}'`
//   })
// const indexLines = []
//   .concat(propertyRequireLines.join('\n'))
//   .join('\n')

// fs.writeFileSync('src/index.js', `${indexLines}\n`)

fs.writeFileSync('./index.js', `${files.map(f => {
  const { dir, base, name } = path.parse(f)

  return `export { default as ${name} } from './${dir.replace('src/', '')}/${base}'`
}).join('\n')}\n`)

console.log('Finished Writing Exports...')

// Build CJS
fs.writeFileSync('./common.js', `module.exports = {}
${files.map(f => {
    const { dir, base, name } = path.parse(f)

    return `module.exports.${name} = require('./${dir.replace('src/', '')}/${base}')`
  }).join('\n')}\n`)

console.log('Finished Writing CJS...')
