/**
 * @name detectCountryCode
 * @since v4.2.0
 * @function
 * @category Function
 * @sig String -> String | Null
 * @description Attempts to find the country code in a phone number, expects the number to be formatted in some way does not work properly on normalized or uglified phone numbers.
 * @param {String} phone The phone number to detect the country code from
 * @return {String|Null} The country code if found, otherwise null
 *
 * @example
 * import { detectCountryCode } from 'phone-fns'
 *
 * detectCountryCode('+1 555 555 5555') // => '1'
 * detectCountryCode('+44 123 456 7890') // => '44'
 * detectCountryCode('+91 987 654 3210') // => '91'
 *
 * // Gachas
 * detectCountryCode('+14445556666') // => '14445'
 */
export default function detectCountryCode (phone) {
  const countryCodeRegex = /^\+(\d{1,4})/ // Match + followed by country code
  const match = phone.match(countryCodeRegex)

  if (match) {
    const [, countryCode] = match

    return countryCode
  }

  return null // If no country code, assume local format
}
