import callingCodes from '../callingCodes.js';

/**
 * @name getCountryCode
 * @description Grabs the calling code for the provided country from the callingCodes.json
 *
 * @param {String} country The country name to search with
 * @return {Array} Returns an array of country codes
 *
 * @example
 * const results = getCountryCode('USA'); // => ['1']
 */
const getCountryCode = country => callingCodes[country.toLowerCase()];

export default getCountryCode;
