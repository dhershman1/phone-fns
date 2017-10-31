'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var test = _interopDefault(require('tape'));

var _uglify = phone => phone.replace(/[a-z]\w?|\W/gi, '');

const getLengths = layout => {
	const countryCodes = layout.match(/C/g);
	const extensionCodes = layout.match(/E/g);

	return {
		countryCode: countryCodes ? countryCodes.length : 0,
		extension: extensionCodes ? extensionCodes.length : 0
	};
};

/**
 * Format a country code for long distance style numbers
 *
 * @param {String} phone The phone number to format
 * @returns Returns an array
 */
const formatCountryCode = (phone, { countryCode }) => {
	const countryCodeLen = countryCode ? countryCode : phone.length - 10;
	const codeReg = new RegExp(`([0-9]{${countryCodeLen}})`);
	const [uglyCountryCode] = phone.match(codeReg);
	let result = uglyCountryCode;

	if (countryCodeLen > 4) {
		result = `${uglyCountryCode.substr(0, 2)}-${uglyCountryCode.substr(2, 4)}`;
	}

	if (countryCodeLen === 4) {
		result = `${uglyCountryCode.substr(0, 1)}-${uglyCountryCode.substr(1, 3)}`;
	}

	return [result, phone.replace(codeReg, '')];
};

/**
 * Format every other piece of the phone number
 *
 * @param {String} phone The phone number to format
 * @returns Returns an array
 */
const formatCode = (phone, n) => {
	if (!phone) {
		return ['', false];
	}

	const codeReg = new RegExp(`([0-9]{${n}})`);
	const [currCode] = phone.match(codeReg);

	return [currCode, phone.replace(codeReg, '')];
};

var breakdown = (phone, type, layout) => {
	const uglyPhone = _uglify(phone);
	let currPhone = uglyPhone;
	let countryCode = '';
	let areaCode = '';
	let localCode = '';
	let lengths = 0;

	if (layout) {
		lengths = getLengths(layout);
	}

	if (type === 'longDistance') {
		[countryCode, currPhone] = formatCountryCode(uglyPhone, lengths);
	}

	if (uglyPhone.length >= 10) {
		[areaCode, currPhone] = formatCode(currPhone, 3);
	}

	[localCode, currPhone] = formatCode(currPhone, 3);

	const [lineNumber, extension] = formatCode(currPhone, 4);

	return {
		countryCode,
		areaCode,
		localCode,
		lineNumber,
		extension
	};
};

var isValid = phone => phone && (/^[0-9]{7,}$/).test(_uglify(phone));

/**
 * L = Local Code
 * A = Area Code
 * N = Line Number
 * E = Extension
 * C = Country Code
 * Example:
 *
 * format(phone, '(AAA)-LLL-nnnn');
 */

const format$1 = (layout, num, type) => {
	const letters = {
		areaCode: 'A',
		localCode: 'L',
		lineNumber: 'N',
		extension: 'E',
		countryCode: 'C'
	};
	let results = layout;

	num.split('').forEach(n => {
		results = results.replace(letters[type], n);
	});

	return results;
};

var _format = (phone, layout, type) => {
	if (!isValid(phone)) {
		return phone;
	}

	const uglyPhone = _uglify(phone);
	const phoneObj = breakdown(uglyPhone, type, layout);
	let results = layout;

	for (const prop in phoneObj) {
		if (phoneObj[prop]) {
			results = format$1(results, phoneObj[prop], prop);
		}
	}

	return results;
};

const groupTwo = phone => {
	if (!isValid(phone)) {
		return phone;
	}
	if (phone.length === 8) {
		return _uglify(phone).replace(/^([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})$/, '$1 $2 $3 $4');
	}

	return _uglify(phone).replace(/^([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})$/, '$1 $2 $3 $4 $5');
};

const groupFour = phone => {
	if (!isValid(phone)) {
		return phone;
	}
	if (phone.length === 8) {
		return _uglify(phone).replace(/^([0-9]{4})([0-9]{4})$/, '$1 $2');
	}

	return _uglify(phone).replace(/^([0-9]{2})([0-9]{4})([0-9]{4})$/, '$1 $2 $3');
};

/**
 * Formats the string to a dashed style
 * @function dashed
 * @param  {string} phone Uglified phone string
 * @return {string}       Returns the formatted phone string
 */
const dashed = phone => {
	if (!isValid(phone)) {
		return phone;
	}
	const { areaCode, localCode, lineNumber } = breakdown(phone);

	if (areaCode) {
		return `${areaCode}-${localCode}-${lineNumber}`;
	}

	return `${localCode}-${lineNumber}`;
};

/**
 * Formats the string to a normal style
 * @function normalize
 * @param  {string} phone Uglified phone string
 * @return {string}       Returns the formatted phone string
 */
const normalize = phone => {
	if (!isValid(phone)) {
		return phone;
	}
	const { areaCode, localCode, lineNumber } = breakdown(phone);

	if (areaCode) {
		return `(${areaCode}) ${localCode}-${lineNumber}`;
	}

	return `${localCode}-${lineNumber}`;
};

/**
	* Formats the string to a dotted style
	* @function dotted
	* @param  {string} phone Uglified phone string
	* @return {string}       Returns the formatted phone string
	*/
const dotted = phone => {
	if (!isValid(phone)) {
		return phone;
	}
	const { areaCode, localCode, lineNumber } = breakdown(phone);

	if (areaCode) {
		return `${areaCode}.${localCode}.${lineNumber}`;
	}

	return `${localCode}.${lineNumber}`;
};

const methods = {
	uglify: _uglify,
	dashed,
	dotted,
	normalize
};

/**
* Formats the string to a long distance with a custom format style
* @function longDistance
* @param  {string} phone Uglified phone string
* @param {string} format The desired format for the phone number
* @return {string}       Returns the formatted phone string
*/
const longDistance = (phone, oFormat) => {
	if (!isValid(phone)) {
		return phone;
	}
	const { countryCode, areaCode, localCode, lineNumber } = breakdown(phone, 'longDistance');
	const mainNumber = `${areaCode}${localCode}${lineNumber}`;
	let formattedPhone = dashed(mainNumber);

	if (oFormat && oFormat !== 'longDistance' && oFormat !== 'extension') {
		formattedPhone = methods[oFormat](mainNumber);
	}

	return `${countryCode}+${formattedPhone}`;
};

/**
* Formats the string to an extension with a custom format style
* @function extension
* @param  {string} phone Uglified phone string
* @param {string} format The desired format for the phone number
* @return {string}       Returns the formatted phone string
*/
const extensionNumber = (phone, oFormat) => {
	if (!isValid(phone)) {
		return phone;
	}
	const { extension, areaCode, localCode, lineNumber } = breakdown(phone, 'extension');
	const mainNumber = `${areaCode}${localCode}${lineNumber}`;
	let formattedPhone = dashed(mainNumber);

	if (oFormat && oFormat !== 'extension' && oFormat !== 'longDistance') {
		formattedPhone = methods[oFormat](mainNumber);
	}

	return `${formattedPhone} x ${extension}`;
};

const uglify = _uglify;

const format = _format;

const find = (phone, type) => {
	if (type === 'countryCode') {
		return breakdown(phone, 'longDistance')[type];
	}

	return breakdown(phone)[type];
};

test('Test breakdown normal', t => {
	const results = breakdown('555-444-3333');

	t.ok(results, 'results came back');
	t.equal(typeof results, 'object', 'results came back as an object');
	t.equal(results.areaCode, '555', 'The area code in results was 555');
	t.equal(results.localCode, '444', 'The local code in results was 444');
	t.equal(results.lineNumber, '3333', 'The lineNumber in results was 3333');
	t.notOk(results.countryCode.length, 'There was no country code');
	t.notOk(results.extension.length, 'There was no extension');
	t.end();
});

test('Test breakdown extension', t => {
	const results = breakdown('555-444-3333 x 8989');

	t.ok(results, 'results came back');
	t.equal(typeof results, 'object', 'results came back as an object');
	t.equal(results.areaCode, '555', 'The area code in results was 555');
	t.equal(results.localCode, '444', 'The local code in results was 444');
	t.equal(results.lineNumber, '3333', 'The lineNumber in results was 3333');
	t.equal(results.extension, '8989', 'The extension number was 8989');
	t.notOk(results.countryCode.length, 'There was no country code');
	t.end();
});

test('Test breakdown long distance', t => {
	const results = breakdown('17875554441111', 'longDistance');

	t.ok(results, 'results came back');
	t.equal(typeof results, 'object', 'results came back as an object');
	t.equal(results.areaCode, '555', 'The area code in results was 555');
	t.equal(results.localCode, '444', 'The local code in results was 444');
	t.equal(results.lineNumber, '1111', 'The lineNumber in results was 3333');
	t.equal(results.countryCode, '1-787', 'The country code was 1-787');
	t.notOk(results.extension.length, 'The extension number was empty');
	t.end();
});

test('Get the area Code', t => {
	const results = find('555-444-1111', 'areaCode');

	t.ok(results, 'Results came back ok');
	t.equal(results, '555', 'Returned only the area code');

	t.end();
});

test('Get the local Code', t => {
	const results = find('555-444-1111', 'localCode');

	t.ok(results, 'Results came back ok');
	t.equal(results, '444', 'Returned only the local code');

	t.end();
});

test('Get the line number', t => {
	const results = find('555-444-1111', 'lineNumber');

	t.ok(results, 'Results came back ok');
	t.equal(results, '1111', 'Returned only the line number');

	t.end();
});

test('Get the country code', t => {
	const results = find('1555-444-1111', 'countryCode');

	t.ok(results, 'Results came back ok');
	t.equal(results, '1', 'Returned only the country code');

	t.end();
});

test('Get the country code', t => {
	const results = find('555-444-1111 8989', 'extension');

	t.ok(results, 'Results came back ok');
	t.equal(results, '8989', 'Returned only the extension number');

	t.end();
});

test('Return a uglified phone number', t => {
	let result = uglify('555-444-1111');

	t.equal(result, '5554441111', `Returned uglify format: ${result}`);

	result = uglify('555444-1111');
	t.equal(result, '5554441111', `Returned uglify format: ${result}`);
	t.end();
});

test('Return a groupedTwo format phone number', t => {
	let result = groupTwo('44332211');

	t.equal(result, '44 33 22 11', `grouped numbers into 4 groups of two: ${result}`);
	result = groupTwo('5544332211');

	t.equal(result, '55 44 33 22 11', `grouped 10 digit number to groups of two: ${result}`);
	t.end();
});

test('Return a groupedFour format phone number', t => {
	let result = groupFour('44332211');

	t.equal(result, '4433 2211', `grouped numbers into 2 groups of four: ${result}`);
	result = groupFour('5544332211');

	t.equal(result, '55 4433 2211', `grouped 10 digit number to group of 2 4 4: ${result}`);
	t.end();
});

test('Return a dashed format phone number', t => {
	let result = dashed('5554441111');

	t.equal(result, '555-444-1111', `Returned dashed format: ${result}`);
	result = dashed('555.444.1111');

	t.equal(result, '555-444-1111', 'Converted dotted formatting to dashed');
	result = dashed('4441111');

	t.equal(result, '444-1111', `Returned short dashed format: ${result}`);
	result = dashed('444.1111');

	t.equal(result, '444-1111', `Returned short dashed format: ${result}`);
	t.end();
});

test('Return a dotted format phone number', t => {
	let result = dotted('5554441111');

	t.equal(result, '555.444.1111', `Returned dotted format: ${result}`);
	result = dotted('555-444-1111');

	t.equal(result, '555.444.1111', 'Converted dashed to dotted format');
	result = dotted('4441111');

	t.equal(result, '444.1111', `Returned dotted format: ${result}`);
	result = dotted('444-1111');

	t.equal(result, '444.1111', `Returned dotted format: ${result}`);
	t.end();
});

test('Return a normal format phone number', t => {
	const result = normalize('5554441111');

	t.equal(result, '(555) 444-1111', `Returned normalize format: ${result}`);
	t.end();
});

test('Return a long distance format', t => {
	let result = longDistance('15554441111', 'dotted');

	t.equal(result, '1+555.444.1111', `Returned longdistance with dotted format: ${result}`);
	result = longDistance('205554441111', 'dotted');

	t.equal(result, '20+555.444.1111', `Returned longdistance with dotted format: ${result}`);
	result = longDistance('2695554441111', 'dotted');

	t.equal(result, '269+555.444.1111', `Returned longdistance with dotted format: ${result}`);
	result = longDistance('17875554441111', 'dotted');

	t.equal(result, '1-787+555.444.1111', `Long Distance formatted with long country code: ${result}`);
	result = longDistance('4414815554441111', 'dotted');

	t.equal(result, '44-1481+555.444.1111', `Long Distance formatted with extra long country code: ${result}`);
	t.end();
});

test('Return an extension format', t => {
	let result = extensionNumber('55544411118989', 'dashed');

	t.equal(result, '555-444-1111 x 8989', `Returned extension with dashed format: ${result}`);
	result = extensionNumber('5554441111899', 'dashed');
	t.equal(result, '555-444-1111 x 899', `Returned extension with dashed format: ${result}`);
	t.end();
});

test('Test bad phone number', t => {
	const result = normalize('85551');

	t.ok(result, 'Results returned okay');
	t.equal(result, '85551', 'Simply returned the bad number back to the user');
	t.end();
});

test('Test custom format normal', t => {
	const result = format('444-555-6666', '(AAA) LLL.NNNN');

	t.ok(result, 'Result returned okay');
	t.equal(result, '(444) 555.6666', 'Result formatted correctly on return');

	t.end();
});

test('Test custom format longDistance', t => {
	const result = format('1444-555-6666', 'C + (AAA) LLL.NNNN', 'longDistance');

	t.ok(result, 'Result returned okay');
	t.equal(result, '1 + (444) 555.6666', 'Result formatted correctly on return');

	t.end();
});

test('Test custom format extensions', t => {
	const result = format('444-555-66668989', '(AAA) LLL.NNNN x EEEE');

	t.ok(result, 'Result returned okay');
	t.equal(result, '(444) 555.6666 x 8989', 'Result formatted correctly on return');

	t.end();
});

test('Test custom format bad phone', t => {
	const result = format('89965', '(AAA).LLL.NNNN');

	t.ok(result, 'Results returned okay');
	t.equal(result, '89965', 'Returned back the bad number');

	t.end();
});

test('Test both longDistance and extensions', t => {
	const result = format('155544433338989', 'C + AAA.LLL.NNNN x EEEE', 'longDistance');

	t.ok(result, 'Results returned okay');
	t.equal(result, '1 + 555.444.3333 x 8989', 'Results are formatted as expected');

	t.end();
});
