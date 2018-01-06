import callingCodes from '../callingCodes.js';

/**
 * @name getCountries
 * @description Grabs all of the countries (and their alternate names) for the provided country calling code
 *
 * @param {String} code The country code to use for searching
 * @return {Array} Returns an array of country names and their aliases
 *
 * @example
 * const results = getCountries('1');
 * // => [
		'canada',
		'ca',
		'united states',
		'us',
		'usa',
		'united states of america'
		]
 */
const getCountries = code => {
	const foundCountries = [];

	for (const prop in callingCodes) {
		if (callingCodes[prop].indexOf(String(code)) !== -1) {
			foundCountries.push(prop);
		}
	}

	return foundCountries;
};

export default getCountries;
