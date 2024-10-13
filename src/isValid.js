import breakdown from './breakdown.js'
import uglify from './uglify.js'

/**
 * @private
 * @function
 * @param {String} x The value to check if it is empty
 * @returns {Boolean} Whether or not the value is empty
 */
function isEmpty (x) {
  return x === ''
}

/**
 * @private
 * @function
 * @param {String} phone The ugly formatted phone number to test
 * @return {Boolean} Whether or not the phone passed validation
 */
function shortNumberTest (phone) {
  const { localCode, lineNumber } = breakdown(phone)
  const str = localCode + lineNumber

  return /^([0-9]{3})[-. ]?([0-9]{4})$/.test(str)
}

/**
 * @private
 * @function
 * @param {String} phone The ugly formatted phone number to test
 * @return {Boolean} Whether or not the phone passed validation
 */
function longNumberTest (phone) {
  const { areaCode, localCode, lineNumber } = breakdown(phone)
  const str = areaCode + localCode + lineNumber

  return /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/.test(str)
}

/**
 * @name isValid
 * @since v0.1.0
 * @function
 * @category Function
 * @sig String -> Boolean
 * @description
 * Validates the base number, does not take the country code or extension into consideration for this validation.
 * Focuses more on NANP numbers and their format
 * @param {String} phone The phone number to breakdown
 * @return {Boolean} Returns a boolean if the number provided is valid or not
 * @example
 * isValid('555-444-3333') // => true
 * isValid('5555') // => false
 */
export default function isValid (phone) {
  const uglyPhone = uglify(phone)
  const len = uglyPhone.length

  if (isEmpty(uglyPhone) || len < 7) {
    return false
  }

  if (len === 7) {
    return shortNumberTest(uglyPhone)
  }

  return longNumberTest(uglyPhone)
}
