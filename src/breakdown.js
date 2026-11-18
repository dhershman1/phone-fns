// An extension must be called out with a marker: x, ext, ext., extension, or #
const EXTENSION = /\s*(?:x|ext\.?|extension|#)\s*([\d_]+)\s*$/i
// Only digits, placeholders, common separators, and a single leading + are allowed in the base number
const ALLOWED = /^\+?[\d_\s().-]*$/

// The shapes breakdown understands, matched against the digits (and leading +) of the base number
const SHAPES = [
  // 444-3333
  /^(?<localCode>[\d_]{3})(?<lineNumber>[\d_]{4})$/,
  // 555-444-3333
  /^(?<areaCode>[\d_]{3})(?<localCode>[\d_]{3})(?<lineNumber>[\d_]{4})$/,
  // 1 555-444-3333
  /^(?<countryCode>1)(?<areaCode>[\d_]{3})(?<localCode>[\d_]{3})(?<lineNumber>[\d_]{4})$/,
  // +44 555-444-3333
  /^\+(?<countryCode>[\d_]{1,3})(?<areaCode>[\d_]{3})(?<localCode>[\d_]{3})(?<lineNumber>[\d_]{4})$/
]

/**
 * The parts of a phone number, any part that isn't present is an empty string
 * @private
 * @typedef {Object} Breakdown
 * @property {String} countryCode The country code
 * @property {String} areaCode The area code
 * @property {String} localCode The local code (exchange)
 * @property {String} lineNumber The line number
 * @property {String} extension The extension
 */

/**
 * @private
 * @type {Breakdown}
 */
const EMPTY = { countryCode: '', areaCode: '', localCode: '', lineNumber: '', extension: '' }

/**
 * @private
 * @function
 * @param {String} str The base phone number, without an extension
 * @returns {String} Only the digits, placeholders, and leading + of the number, or an empty string if it contains anything unexpected
 */
const toCompact = (str) => ALLOWED.test(str) ? str.replace(/[^\d_+]/g, '') : ''

/**
 * @name breakdown
 * @since v0.1.0
 * @function
 * @category Function
 * @sig String -> Object
 * @description
 * Takes a provided phone string and breaks it down into an object of codes. Focuses on NANP numbers which take the form of NXX NXX XXXX
 * - Extensions are only picked up when they are marked with `x`, `ext`, `ext.`, `extension`, or `#`
 * - A country code is picked up when the number starts with `+` (1-3 digits), or when it is 11 digits long and starts with `1`
 * - Supports `_` placeholders
 * @param {String|Number} phone The phone number to breakdown
 * @return {Breakdown} Returns an object of the broken down phone number
 * @throws {Error} If the phone number cannot be broken down
 *
 * @example
 * breakdown('111-222-3333');
 * // => { countryCode: '', areaCode: '111', localCode: '222', lineNumber: '3333', extension: '' }
 *
 * breakdown('5554441111');
 * // => { countryCode: '', areaCode: '555', localCode: '444', lineNumber: '1111', extension: '' }
 *
 * breakdown('555-444-3333 x 8989');
 * // => { countryCode: '', areaCode: '555', localCode: '444', lineNumber: '3333', extension: '8989' }
 *
 * breakdown('+1 555-444-3333');
 * // => { countryCode: '1', areaCode: '555', localCode: '444', lineNumber: '3333', extension: '' }
 *
 * breakdown('444-3333');
 * // => { countryCode: '', areaCode: '', localCode: '444', lineNumber: '3333', extension: '' }
 *
 * // Works with placeholder syntax
 * breakdown('555-___-____')
 * // => { countryCode: '', areaCode: '555', localCode: '___', lineNumber: '____', extension: '' }
 *
 * breakdown('123') // => Error: The phone number provided could not be broken down
 */
export default function breakdown (phone) {
  const str = String(phone ?? '').trim()
  const extension = str.match(EXTENSION)?.[1] ?? ''
  const compact = toCompact(str.replace(EXTENSION, ''))
  const match = SHAPES.map(shape => compact.match(shape)).find(Boolean)

  if (!match) {
    throw new Error('The phone number provided could not be broken down')
  }

  return { ...EMPTY, ...match.groups, extension }
}
