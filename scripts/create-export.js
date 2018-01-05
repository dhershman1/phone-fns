const fs = require('fs');
const path = require('path');
const ignoredFiles = ['_internals', 'esm', 'callingCodes.js'];

const listFns = () => {
	const files = fs.readdirSync(path.join(process.cwd(), 'src'));

	return files
		.filter(file => (/^[^._]/).test(file) && !ignoredFiles.includes(file))
		.map(file => ({
			name: file,
			path: `./${file}`,
			fullPath: `./src/${file}/index.js`
		}));
};

const generateIndex = files => {
	const propertyRequireLines = files
		.map(fn => `  ${fn.name}: require('${fn.path.replace(/\.js$/, '')}/index.js').default`);

	const indexLines = ['']
		.concat('')
		.concat('module.exports = {')
		.concat(propertyRequireLines.join(',\n'))
		.concat('};')
		.join('\n');

	return `${indexLines}\n`;
};

fs.writeFileSync('index.js', generateIndex(listFns()));
