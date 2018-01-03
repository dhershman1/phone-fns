const fs = require('fs');

const dirList = fs.readdirSync('src', 'utf8');
const blackList = ['_internals', 'esm'];
const resObj = {};

dirList.forEach(dir => {
  if (blackList.indexOf(dir) === -1) {
    resObj[dir] = `require(./${dir})`;
  }
});

fs.writeFileSync('./index.js', `module.exports = ${JSON.stringify(resObj)}`, 'utf8');
