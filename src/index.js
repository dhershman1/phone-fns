const uglify = require('./uglify/index');
const format = require('./format/index');
const isValid = require('./isValid/index');
const identical = require('./identical/index');
const find = require('./find/index');
const breakdown = require('./breakdown/index');
const findLocal = require('./findLocal/index');
const getCode = require('./getCode/index');

/* eslint-disable object-shorthand*/
module.exports = {
	uglify: uglify,
	format: format,
	isValid: isValid,
	identical: identical,
	find: find,
	breakdown: breakdown,
	findLocal: findLocal,
	getCode: getCode
};
