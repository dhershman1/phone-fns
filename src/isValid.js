import breakdown from './breakdown'
import uglify from './uglify'

/**
 * @name isValid
 * @since v0.1.0
 * @category Function
 * @description
 * Validates the base number, does not take the country code or extension into consideration for this validation
 * @param {String} phone The phone number to breakdown
 * @return {Boolean} Returns a boolean if the number provided is valid or not
 * @example
 * isValid('555-444-3333'); // => true
 */
export default phone => {
  const uglyPhone = uglify(phone)

  if (!phone || uglyPhone.length < 10) {
    return false
  }

  const { areaCode, localCode, lineNumber } = breakdown('', uglyPhone)

  return phone && (/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/)
    .test(areaCode + localCode + lineNumber)
}
