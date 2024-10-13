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
 * @param {String} phone The phone number to breakdown
 * @param {String} format The format to validate against
 * @return {Boolean} Returns a boolean if the number provided is valid or not
 * @example
 * import { isValidWithFormat } from 'phone-fns'
 *
 * isValidWithFormat('NNN-NNN-NNNN', '123-456-7890') // => true
 * isValidWithFormat('NNN-NNN-NNNN', '010-XYZ-1234') // => false
 *
 * // its also curried
 * const fn = isValidWithFormat('NNN-NNN-NNNN')
 * fn('123-456-7890') // => true
 * fn('010-XYZ-1234') // => false
 */
function isValidWithFormat (format, phone) {
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
