import breakdown from './breakdown'
import curry from './_internals/curry'

/**
 * @name find
 * @since v0.1.0
 * @category Function
 * @deprecated The use case for this method is too low to keep it, use breakdown instead
 * @description Find a piece of the phone number and return it
 * @param {String} type The piece of the phone to look for
 * @param {String} phone The phone number to breakdown
 * @return {String} Returns a string from the desired part of the phone number
 *
 * @example
 * find('areaCode', '555-444-1111'); // => '555'
 * find('localCode', '555-444-1111'); // => '444'
 * find('lineNumber', '555-444-1111'); // => '1111'
 * find('extension', '555-444-1111 8989'); // => '8989'
 *
 * // find is also curried
 *
 * const finder = find('areaCode');
 *
 * finder('555-444-1111'); // => '555'
 */
const find = (type, phone) => breakdown('', phone)[type]

export default curry(find)
