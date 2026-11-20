import uglify from './uglify.js'

// Same extension markers as breakdown: x, ext, ext., extension, or #
const EXTENSION = /\s*(?:x|ext\.?|extension|#)\s*\d{1,7}$/i
// A run of digits, or up to 4 digits wrapped in parentheses, e.g. the (0) in +44 (0)20
const GROUP = String.raw`(?:\(\d{1,4}\)|\d+)`
// An optional + (country codes never start with 0), then groups split by a single space, dot, or dash.
// Digits may also sit directly against parentheses, e.g. (555)444-3333
const STRUCTURE = new RegExp(String.raw`^(?:\+(?=[1-9]))?${GROUP}(?:[\s.-]${GROUP}|\(\d{1,4}\)|(?<=\))\d+)*$`)

/**
 * @private
 * @param {RegExp} pattern A global pattern to count
 * @param {String} str The string to search
 * @returns {Number} How many times the pattern matched
 */
const count = (pattern, str) => (str.match(pattern) ?? []).length

/**
 * @private
 * @callback Rule
 * @param {String} base The phone number without its extension
 * @returns {Boolean} Whether the number passes the rule
 */

/**
 * The rules every phone number must pass
 * @private
 * @type {Array<Rule>}
 */
const RULES = [
  base => STRUCTURE.test(base),
  // At most one set of parentheses
  base => count(/\(/g, base) <= 1,
  // E.164 numbers are at most 15 digits, country code included
  base => uglify(base).length >= 10 && uglify(base).length <= 15,
  // Numbers are written in at most 6 groups, e.g. +33 1 23 45 67 89
  base => count(/\d+/g, base) <= 6
]

/**
 * @name validate
 * @since v4.1.0
 * @function
 * @category Function
 * @sig String -> Boolean
 * @description
 * Validates the structure of a phone number from any country. It doesn't apply any country specific numbering rules
 * - May start with a `+` and a country code, which can't start with `0`
 * - Digits can be grouped with a single space, dot, or dash, and one group can be wrapped in parentheses
 * - Must have 10 to 15 digits, country code included
 * - Extensions are allowed when they are marked with `x`, `ext`, `ext.`, `extension`, or `#`, and don't count towards the digit total
 * @param {String|Number} phone The phone number we want to validate
 * @return {Boolean} Returns a boolean if the number provided is valid or not
 * @example
 * import { validate } from 'phone-fns'
 *
 * validate('555-444-3333') // => true
 * validate('5555') // => false
 * validate('5554443333') // => true
 * validate('5554443333 x 123') // => true
 * validate('+44 (0)20 7946 0958') // => true
 * validate('(555 444-3333') // => false
 * validate('555--444-3333') // => false
 */
export default function validate (phone) {
  const base = String(phone ?? '').trim().replace(EXTENSION, '')

  return RULES.every(rule => rule(base))
}
