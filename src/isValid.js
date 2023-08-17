import { compose, when, F, reduced, eq, isEmpty, length, lt, pipe, test } from 'kyanite'

import breakdown from './breakdown.js'
import uglify from './uglify.js'

/**
 * @private
 * @function
 * @param {String} phone The ugly formatted phone number to test
 * @return {Boolean} Whether or not the phone passed validation
 */
function shortNumberTest (phone) {
  return () => {
    const { localCode, lineNumber } = breakdown(phone)

    return test(/^([0-9]{3})[-. ]?([0-9]{4})$/, localCode + lineNumber)
  }
}

/**
 * @private
 * @function
 * @param {String} phone The ugly formatted phone number to test
 * @return {Boolean} Whether or not the phone passed validation
 */
function longNumberTest (phone) {
  return () => {
    const { areaCode, localCode, lineNumber } = breakdown(phone)

    return test(/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/, areaCode + localCode + lineNumber)
  }
}

/**
 * @name isValid
 * @since v0.1.0
 * @function
 * @category Function
 * @sig String -> Boolean
 * @description
 * Validates the base number, does not take the country code or extension into consideration for this validation
 * @param {String} phone The phone number to breakdown
 * @return {Boolean} Returns a boolean if the number provided is valid or not
 * @example
 * isValid('555-444-3333') // => true
 * isValid('5555') // => false
 */
export default function isValid (phone) {
  const uglyPhone = uglify(phone)
  const done = compose(reduced)

  return pipe([
    when(isEmpty, done(F)),
    length,
    when(lt(7), done(F)),
    when(eq(7), shortNumberTest(uglyPhone)),
    longNumberTest(uglyPhone)
  ], uglyPhone)
}
