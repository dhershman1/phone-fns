import _curry2 from './_internals/_curry2.js'
import validate from './validate.js'

// Same placeholders as format: N for numbers and C for country code
const PLACEHOLDERS = new Set(['C', 'N'])
const DIGIT = /^\d$/

/**
 * @private
 * @param {String} format The format to validate against
 * @param {String|Number} phone The phone number to validate
 * @return {Boolean} Whether or not the phone number matches the format
 */
function isValidWithFormat (format, phone) {
  if (!format) {
    throw new Error('You must provide a format to validate')
  }

  const str = phone == null ? '' : String(phone)

  if (str.length !== format.length) {
    return false
  }

  for (let i = 0; i < format.length; i++) {
    const matches = PLACEHOLDERS.has(format[i])
      ? DIGIT.test(str[i])
      : format[i] === str[i]

    if (!matches) {
      return false
    }
  }

  return validate(str)
}

/**
 * @name isValidWithFormat
 * @since v4.1.0
 * @function
 * @category Function
 * @sig String -> String -> Boolean
 * @description
 * Validates a phone number based on a custom format provided
 * - The placeholders `N` and `C` (uppercase only) must each be a digit
 * - Every other character in the format must match the phone number exactly
 * - The phone number is then run through `validate` as an extra check
 * @param {String} format The format to validate against
 * @param {String|Number} phone The phone number to validate
 * @return {Boolean} Returns a boolean if the number provided is valid or not
 * @example
 * import { isValidWithFormat } from 'phone-fns'
 *
 * isValidWithFormat('NNN-NNN-NNNN', '123-456-7890') // => true
 * isValidWithFormat('NNN-NNN-NNNN', '010-XYZ-1234') // => false
 * isValidWithFormat('NNN-NNN-NNNN', '1234567890') // => false
 * isValidWithFormat('NNN-NNN-NNNN', '123.456.7890') // => false
 * isValidWithFormat('+C NNN-NNN-NNNN', '+1 555-444-3333') // => true
 *
 * // It's also curried
 * const fn = isValidWithFormat('NNN-NNN-NNNN')
 *
 * fn('123-456-7890') // => true
 * fn('010-XYZ-1234') // => false
 * fn('1234567890') // => false
 */
export default _curry2(isValidWithFormat)
