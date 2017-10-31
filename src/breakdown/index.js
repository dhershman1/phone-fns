import uglify from '../uglify/index';

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

export default (phone, type, layout) => {
	const uglyPhone = uglify(phone);
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
