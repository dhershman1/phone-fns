import _curry2 from './_internals/_curry2.js'
import isValid from './isValid.js'
import uglify from './uglify.js'
import _uglifyFormats from './_internals/_uglifyFormats.js'
import _hasPlaceholder from './_internals/_hasPlaceholder.js'

/**
 * @private
 * @function
 * @param {String} layout The desired layout format
 * @param {String} phone The phone number to validate against
 */
function validFormat (layout, phone) {
  return phone.length === _uglifyFormats(layout).length
}

/**
 * @name format
 * @since v0.1.0
 * @function
 * @category Function
 * @sig String -> String -> String
 * @description Allows you to format phone numbers however you desire using N as number placeholders and C as country code placeholders these placeholders are case insensitive
 * @param {String} layout The desired layout of the phone number
 * @param {String} phone The phone number to breakdown
 * @return {String} Returns a string which is the formatted phone number
 *
 * @example
 * format('(NNN) NNN.NNNN', '444-555-6666') // => '(444) 555.6666'
 * format('C + (NNN) NNN.NNNN', '1444-555-6666') // => '1 + (444) 555.6666'
 * format('CC + NNN.NNN.NNNN', '163334445555') // => '16 + 333.444.5555'
 * format('(NNN) NNN.NNNN x NNNN', '44455566668989') // => '(444) 555.6666 x 8989'
 *
 * // Format is case insensitive
 * format('(NNN) nnn-NNnn', '4445556666') // => (444) 555-6666
 *
 * // Format is also curried
 * const fn = format('NNN.NNN.NNNN')
 *
 * fn('4445556666') // => '444.555.6666'
 * fn('(333) 444-5555') // => '333.444.5555'
 */
function format (layout, phone) {
  let cCount = 0
  const uglyPhone = uglify(phone)

  if (layout.includes('C')) {
    cCount = (layout.match(/C/g) || []).length
  }

  if (!validFormat(layout, uglyPhone)) {
    return phone
  }

  if (!_hasPlaceholder(uglyPhone)) {
    // We are skipping validation if there are placeholders
    if (!isValid(phone)) {
      return phone
    }
  }

  return uglify(uglyPhone).split('').reduce((acc, d, i) => {
    if (cCount > i) {
      acc = acc.replace(/C/i, d)
    } else {
      acc = acc.replace(/N/i, d)
    }

    return acc
  }, layout)
}

export default _curry2(format)
