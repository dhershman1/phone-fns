/**
 * @name hasCountryCode
 * @since v5.0.0
 * @function
 * @category Function
 * @sig String -> Boolean
 * @description Attempts to check if a country code is present in the phone number provided it searches for a + followed by a number
 * @param {String} phone The phone number to detect the country code from
 * @return {Boolean} Whether or not the phone number has a country code
 *
 * @example
 * import { hasCountryCode } from 'phone-fns'
 *
 * hasCountryCode('+1 555 555 5555') // => true
 * hasCountryCode('+44 123 456 7890') // => true
 * hasCountryCode('+91 987 654 3210') // => true
 * hasCountryCode('+14445556666') // => true
 * hasCountryCode('555 555 5555') // => false
 * hasCountryCode('1234567890') // => false
 */
export default function hasCountryCode (phoneNumber) {
  return /^\+\d+/.test(phoneNumber)
}
