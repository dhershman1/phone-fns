import { add, addIndex, both, branch, complement, compose, countBy, curry, eq, gt, identity, includes, length, pipe, reduce, replace, split, toUpper } from 'kyanite'

import isValid from './isValid'
import uglify from './uglify'

/**
 * @private
 * @function
 * @param {String} layout The desired layout format
 * @param {String} phone The phone number to validate against
 */
const validFormat = layout => phone => {
  const { N, C = 0 } = compose(countBy(toUpper), split(''), layout)

  return pipe([
    uglify,
    length,
    eq(add(N, C))
  ], phone)
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
const format = (layout, phone) => {
  const cCount = includes('C', layout) ? length(layout.match(/C/g)) : 0
  const _reduce = addIndex(reduce)

  return branch(
    both(
      complement(isValid),
      complement(validFormat(layout))
    ),
    identity,
    pipe([
      split(''),
      uglify,
      _reduce((d, acc, i) => gt(i, cCount) ? replace(/C/i, d, acc) : replace(/N/i, d, acc), layout)
    ]),
    phone
  )
}

export default curry(format)
