import breakdown from '../breakdown/index';
import curry from '../_internals/curry';

/**
 * @name find
 * @description Find a piece of the phone number and return it
 *
 * @param {String} phone The phone number to breakdown
 * @param {String} type The piece of the phone to look for
 * @return {String} Returns a string from the desired part of the phone number
 *
 * @example
 * const results = find('555-444-1111', 'areaCode'); // => '555'
 * const results = find('555-444-1111', 'localCode'); // => '444'
 * const results = find('555-444-1111', 'lineNumber'); // => '1111'
 * const results = find('1555-444-1111', 'countryCode'); // => '1'
 * const results = find('555-444-1111 8989', 'extension'); // => '8989'
 *
 * // find is also curried
 *
 * const finder = find('555-444-1111');
 *
 * finder('areaCode'); // => '555'
 * finder('localCode'); // => '444'
 * finder('lineNumber'); // => '1111'
 */
export default curry((phone, type) => breakdown(type === 'countryCode', '', phone)[type]);
