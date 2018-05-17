import curry from './_internals/curry'
import isValid from './isValid'
import uglify from './uglify'

const validFormat = (phone, layout) => {
  const count = layout.split('').reduce((acc, v) => {
    if (v.toLowerCase() === 'n') {
      acc++
    }

    return acc
  }, 0)

  return count === phone.length
}

/**
 * @name format
 * @since v0.1.0
 * @category Function
 * @description Allows you to format phone numbers however you desire using N as number placeholders this placeholder is case insensitive
 * @param {String} cc The provided country code for the number or an empty string if none provided
 * @param {String} layout The desired layout of the phone number
 * @param {String} phone The phone number to breakdown
 * @return {String} Returns a string which is the formatted phone number
 *
 * @example
 * format('', '(NNN) NNN.NNNN', '444-555-6666'); // => '(444) 555.6666'
 * format('1', 'N + (NNN) NNN.NNNN', '444-555-6666'); // => '1 + (444) 555.6666'
 * format('', '(NNN) NNN.NNNN x NNNN', '444-555-66668989'); // => '(444) 555.6666 x 8989'
 *
 * // Format is case insensitive
 * format('', '(NNN) nnn-NNnn', '4445556666') // => (444) 555-6666
 *
 * // Format is also curried
 * const noCC = format('');
 * const withLayout = format('', 'NNN.NNN.NNNN');
 *
 * noCC('NNN-NNN-NNNN', '4445556666'); // => '444-555-6666'
 * withLayout('4445556666'); // => '444.555.6666'
 */
const format = (cc, layout, phone) => {
  const fullPhone = `${cc}${uglify(phone)}`

  if (!isValid(phone) || !validFormat(fullPhone, layout)) {
    return phone
  }
  const results = fullPhone.split('').reduce((acc, d) => {
    const temp = acc.replace(/N/i, d)

    return temp
  }, layout)

  return results
}

export default curry(format)
