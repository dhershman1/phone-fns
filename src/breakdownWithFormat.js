import _curry2 from './_internals/_curry2.js'
import isValidWithFormat from './isValidWithFormat.js'

/**
 * @name breakdownWithFormat
 * @since v4.1.0
 * @function
 * @category Function
 * @sig String -> String -> Object
 * @description
 * Breaks down a phone number based on a custom format provided and returns an object with the parts of the phone number
 * C - Country Code A- Area Code L - Local Code N - Line Number X - Extension
 * Does NOT work with placeholders
 * @param {String} format The format to validate against
 * @param {String} phone The phone number to breakdown
 * @return {Object} Returns an object with the parts of the phone number
 * @example
 * import { breakdownWithFormat } from 'phone-fns'
 *
 * breakdownWithFormat('+C (AAA) LLL-NNNN xXXX', '+1 (555) 444-3333 x123') // => { countryCode: '1', areaCode: '555', localCode: '444', lineNumber: '3333', extension: '123' }
 * breakdownWithFormat('AAA-LLL-NNNN', '010-XYZ-1234') // => Error: The phone number provided does not match the format provided or is an invalid phone number
 *
 * // it's also curried
 * const fn = breakdownWithFormat('+C (AAA) LLL-NNNN xXXX')
 * fn('+1 (555) 444-3333 x123') // => { countryCode: '1', areaCode: '123', localCode: '456', lineNumber: '7890', extension: '123' }
 */
function breakdownWithFormat (format, phone) {
  if (!format) {
    throw new Error('You must provide a format to breakdown')
  }

  if (!isValidWithFormat(format, phone)) {
    throw new Error('The phone number provided does not match the format provided or is an invalid phone number')
  }

  const results = {
    countryCode: '',
    areaCode: '',
    localCode: '',
    lineNumber: '',
    extension: ''
  }

  for (let i = 0; i < format.length; i++) {
    switch (format[i]) {
      case 'C':
        results.countryCode += phone[i]
        break
      case 'A':
        results.areaCode += phone[i]
        break
      case 'N':
        results.lineNumber += phone[i]
        break
      case 'L':
        results.localCode += phone[i]
        break
      case 'X':
        results.extension += phone[i]
        break
    }
  }

  return results
}

export default _curry2(breakdownWithFormat)
