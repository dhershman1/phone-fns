import _curry2 from './_internals/_curry2.js'
import validate from './validate.js'

/**
 * @name isValidWithFormat
 * @since v4.1.0
 * @function
 * @category Function
 * @sig String -> String -> Boolean
 * @description
 * Validates a phone number based on a custom format provided
 * @param {String} format The format to validate against
 * @param {String} phone The phone number to validate
 * @return {Boolean} Returns a boolean if the number provided is valid or not
 * @example
 * import { isValidWithFormat } from 'phone-fns'
 *
 * isValidWithFormat('NNN-NNN-NNNN', '123-456-7890') // => true
 * isValidWithFormat('NNN-NNN-NNNN', '010-XYZ-1234') // => false
 * isValidWithFormat('NNN-NNN-NNNN', '1234567890') // => false
 *
 * // It's also curried
 * const fn = isValidWithFormat('NNN-NNN-NNNN')
 *
 * fn('123-456-7890') // => true
 * fn('010-XYZ-1234') // => false
 * fn('1234567890') // => false
 */
function isValidWithFormat (format, phone) {
  if (!format) {
    throw new Error('You must provide a format to validate')
  }

  if (phone.length !== format.length) {
    return false
  }

  for (let i = 0; i < format.length; i++) {
    if (format[i] === 'N' && isNaN(phone[i])) {
      return false
    }
  }

  return validate(phone)
}

export default _curry2(isValidWithFormat)
