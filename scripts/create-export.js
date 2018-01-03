const fs = require('fs');
const path = require('path');

const ignoredFiles = ['_internals', 'esm', 'callingCodes.js', 'tests.js'];

const listFns = () => {
	const files = fs.readdirSync(path.join(process.cwd(), 'src'));

	return files.filter(f => (/^[^._]/).test(f) && !ignoredFiles.includes(f))
		.map(f => ({
			name: f,
			path: `./${f}`,
			fullPath: `./src/${f}/index.js`
		}));
};

const generateIndex = files => {
	const propertyRequireLines = files
		.map(fn => `  ${fn.name}: require('${fn.path.replace(/\.js$/, '')}/index.js').default`);

	const indexLines = [''].concat('module.exports = {')
		.concat(propertyRequireLines.join(',\n'))
		.concat('}')
		.join('\n');

	return `${indexLines}\n`;
};

fs.writeFileSync('./index.js', generateIndex(listFns()), 'utf8');
