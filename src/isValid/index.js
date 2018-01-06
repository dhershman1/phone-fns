import breakdown from '../breakdown/index';
import callingCodes from '../callingCodes.js';
import uglify from '../uglify/index';

const validateCountryCode = (phone, country) => {
	const { countryCode } = breakdown(phone, true);

	return callingCodes[country.toLowerCase()].indexOf(countryCode) !== -1;
};

/**
 * @name isValid
 * @description Checks if the phone number is valid or not
 *
 * @param {String} phone The phone number to breakdown
 * @param {String} country The country name to validate with
 * @return {Boolean} Returns a boolean if the number provided is valid or not
 *
 * @example
 * const results = isValid('555-444-3333'); // => true
 * const results = isValid('1 + (555) 444 3333', 'usa'); // => true
 * const results = isValid('9885554443333', 'usa'); // => false
 */
const isValid = (phone, country) => {
	let valid = false;

	if (phone && (/^[0-9]{7,}$/).test(uglify(phone))) {
		valid = true;
	} else {
		return false;
	}

	if (country && !validateCountryCode(phone, country)) {
		valid = false;
	}

	return valid;
};

export default isValid;
