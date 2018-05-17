import curry from './_internals/curry'
import uglify from './uglify'

/**
 * @name breakdown
 * @since v0.1.0
 * @category Function
 * @description Takes a provided phone string and breaks it down into an object of codes
 * @param {String} countryCode The provided country code for the number
 * @param {String} phone The phone number to breakdown
 * @return {Object} Returns an object of the broken down phone number
 *
 * @example
 * breakdown('', '111-222-3333');
 * // => { countryCode: '', areaCode: '111', localCode: '222', lineNumber: '3333', extension: '' }
 *
 * breakdown('1787', '5554441111');
 * // => { countryCode: 1787, areaCode: '555', localCode: '444', lineNumber: '1111', extension: '' }
 *
 * breakdown('', '555-444-3333 x 8989');
 * // => { countryCode: '', areaCode: '555', localCode: '444', lineNumber: '3333', extension: 8989 }
 *
 * // Breakdown is curried
 * const breaker = breakdown('');
 *
 * breaker('222-333-4444'); // => { areaCode: '222', localCode: '333', lineNumber: '4444' }
 */
const breakdown = (countryCode, phone) => {
  const [, areaCode, localCode, lineNumber, extension = ''] = uglify(phone)
    .match(/([0-9]{3})?([0-9]{3})([0-9]{4})([0-9]{1,})?/)

  return {
    countryCode,
    areaCode,
    localCode,
    lineNumber,
    extension
  }
}

export default curry(breakdown)
