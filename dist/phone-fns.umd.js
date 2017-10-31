(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.phoneFns = {})));
}(this, (function (exports) { 'use strict';

var uglify = function (phone) { return phone.replace(/[a-z]\w?|\W/gi, ''); };

var getLengths = function (layout) {
	var countryCodes = layout.match(/C/g);
	var extensionCodes = layout.match(/E/g);

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
var formatCountryCode = function (phone, ref) {
	var countryCode = ref.countryCode;

	var countryCodeLen = countryCode ? countryCode : phone.length - 10;
	var codeReg = new RegExp(("([0-9]{" + countryCodeLen + "})"));
	var ref$1 = phone.match(codeReg);
	var uglyCountryCode = ref$1[0];
	var result = uglyCountryCode;

	if (countryCodeLen > 4) {
		result = (uglyCountryCode.substr(0, 2)) + "-" + (uglyCountryCode.substr(2, 4));
	}

	if (countryCodeLen === 4) {
		result = (uglyCountryCode.substr(0, 1)) + "-" + (uglyCountryCode.substr(1, 3));
	}

	return [result, phone.replace(codeReg, '')];
};

/**
 * Format every other piece of the phone number
 *
 * @param {String} phone The phone number to format
 * @returns Returns an array
 */
var formatCode = function (phone, n) {
	if (!phone) {
		return ['', false];
	}

	var codeReg = new RegExp(("([0-9]{" + n + "})"));
	var ref = phone.match(codeReg);
	var currCode = ref[0];

	return [currCode, phone.replace(codeReg, '')];
};

var breakdown = function (phone, isLD, layout) {
	var uglyPhone = uglify(phone);
	var currPhone = uglyPhone;
	var countryCode = '';
	var areaCode = '';
	var localCode = '';
	var lengths = 0;

	if (layout) {
		lengths = getLengths(layout);
	}

	if (isLD) {
		var assign;
		(assign = formatCountryCode(uglyPhone, lengths), countryCode = assign[0], currPhone = assign[1]);
	}

	if (uglyPhone.length >= 10) {
		var assign$1;
		(assign$1 = formatCode(currPhone, 3), areaCode = assign$1[0], currPhone = assign$1[1]);
	}

	var assign$2;
	(assign$2 = formatCode(currPhone, 3), localCode = assign$2[0], currPhone = assign$2[1]);

	var ref = formatCode(currPhone, 4);
	var lineNumber = ref[0];
	var extension = ref[1];

	return {
		countryCode: countryCode,
		areaCode: areaCode,
		localCode: localCode,
		lineNumber: lineNumber,
		extension: extension
	};
};

var isValid = function (phone) { return phone && (/^[0-9]{7,}$/).test(uglify(phone)); };

var index = function (x, y) {
	if (!isValid(x) || !isValid(y)) {
		return 'Invalid Dates';
	}

	return uglify(x) === uglify(y);
};

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

var format = function (layout, num, type) {
	var letters = {
		areaCode: 'A',
		localCode: 'L',
		lineNumber: 'N',
		extension: 'E',
		countryCode: 'C'
	};
	var results = layout;

	num.split('').forEach(function (n) {
		results = results.replace(letters[type], n);
	});

	return results;
};

var index$1 = function (phone, layout, isLD) {
	if (!isValid(phone)) {
		return phone;
	}

	var uglyPhone = uglify(phone);
	var phoneObj = breakdown(uglyPhone, isLD, layout);
	var results = layout;

	for (var prop in phoneObj) {
		if (phoneObj[prop]) {
			results = format(results, phoneObj[prop], prop);
		}
	}

	return results;
};

var index$2 = function (phone, type) {
	if (type === 'countryCode') {
		return breakdown(phone, 'longDistance')[type];
	}

	return breakdown(phone)[type];
};

exports.breakdown = breakdown;
exports.uglify = uglify;
exports.isValid = isValid;
exports.identical = index;
exports.format = index$1;
exports.find = index$2;

Object.defineProperty(exports, '__esModule', { value: true });

})));
