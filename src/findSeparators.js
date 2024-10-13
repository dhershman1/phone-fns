/**
 * @name findSeparators
 * @since v4.1.0
 * @function
 * @category Function
 * @sig String -> Array
 * @description
 * Finds a list of separators in a phone number string
 * @param {String} phone The phone number to breakdown
 * @return {Array} Returns an array of separators found in the phone number
 * @example
 * import { findSeparators } from 'phone-fns'
 *
 * findSeparators('123-456-7890') // => ['-']
 * findSeparators('123.456.7890') // => ['.']
 * findSeparators('123 456 7890') // => [' ']
 * findSeparators('1234567890') // => []
 */
function findSeparators (phone) {
  const separators = ['-', '.', ' ']
  const foundSeparators = []
  for (const separator of separators) {
    if (phone.includes(separator)) {
      foundSeparators.push(separator)
    }
  }
  return foundSeparators
}

export default findSeparators
