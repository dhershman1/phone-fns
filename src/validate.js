import normalize from './normalize.js'

/**
 * @name validate
 * @since v4.1.0
 * @function
 * @category Function
 * @sig String -> Boolean
 * @description
 * Validates the base number, strips out special characters and spaces upon validation, can handle country code and extension in the phone number
 * @param {String} phone The phone number we want to validate
 * @return {Boolean} Returns a boolean if the number provided is valid or not
 * @example
 * import { validate } from 'phone-fns'
 *
 * validate('555-444-3333') // => true
 * validate('5555') // => false
 * validate('5554443333') // => true
 * validate('5554443333 x 123') // => true
 */
export default function validate (phone) {
  const normPhone = normalize(String(phone))
  const phoneRegex = /^(\+?\d{1,4})?[\s\-.]?\(?\d{1,4}\)?[\s\-.]?\d{1,4}[\s\-.]?\d{1,4}[\s\-.]?\d{1,9}(?:[\s\-.]?(?:x|ext)?[\s]?\d{1,5})?$/i
  // (strips the + symbol and the ext/x symbols)
  const strippedPhone = normPhone.replace(/[\s\-.()xext+]/gi, '')

  // Validate the length of the number without the ext or country code symbols inlcuded
  // Length of the phone number should be between 8 and 15 excluding the ext/x and + symbols
  if (strippedPhone.length > 15 || strippedPhone.length < 8) {
    return false
  }

  return phoneRegex.test(phone)
}
