const fs = require('fs')
const globby = require('globby')
const jsDocParser = require('jsdoc-to-markdown')
const { name, version, description } = require('../package.json')

const listFns = () => {
  const files = globby.sync(['src/*.js', '!src/index.js', '!src/_internals'])

  return files
    .map(file => `./${file}`)
}

const generateUsage = fnName => ({
  'commonjs': {
    title: 'CommonJs',
    code: `const ${fnName} = require('phone-fns/${fnName}');`
  },
  'standard': {
    title: 'Standard',
    code: `import ${fnName} from 'phone-fns/${fnName}';`
  },
  'cdn': {
    title: 'CDN',
    code: `<script src="https://cdn.jsdelivr.net/npm/phone-fns@${version}/${fnName}.js"></script>`
  },
  'browser': {
    title: 'Browser',
    code: `<script src="path/to/node_modules/phone-fns/${fnName}.js"></script>`
  }
})

const generateSyntax = (fnName, args) => {
  if (!args) {
    return ''
  }

  const argsStr = args.map(a => a.optional ? `[${a.fnName}]` : a.fnName).join(', '); // eslint-disable-line

  return `${fnName}(${argsStr})`
}

jsDocParser.getTemplateData({
  'files': listFns(),
  'no-cache': true
}).then((data) => {
  const results = data.map(d => ({
    since: d.since ? d.since : 'Unknown',
    deprecated: d.deprecated || false,
    category: d.category || 'Unknown',
    title: d.name,
    desc: d.description,
    examples: d.examples,
    returns: d.returns,
    params: d.params,
    syntax: generateSyntax(d.name, d.params),
    usage: generateUsage(d.name)
  }))

  fs.writeFileSync('info.json', JSON.stringify({
    name,
    version,
    description,
    docs: results
  }))
})
