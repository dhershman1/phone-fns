import uglify from './uglify.js'

/**
 * @name breakdown
 * @since v0.1.0
 * @function
 * @category Function
 * @sig String -> String -> Object
 * @description Takes a provided phone string and breaks it down into an object of codes only works loosely for NANP numbers. The gatcha here is that NANP numbers take the form of NXX NXX XXXX where N is a digit from 2-9 and X is a digit from 0-9, but in order to support placeholders we use a [_0-9]{3} check
 * @param {String} phone The phone number to breakdown
 * @return {Object} Returns an object of the broken down phone number
 *
 * @example
 * breakdown('111-222-3333');
 * // => { areaCode: '111', localCode: '222', lineNumber: '3333', extension: '' }
 *
 * breakdown('5554441111');
 * // => { areaCode: '555', localCode: '444', lineNumber: '1111', extension: '' }
 *
 * breakdown('555-444-3333 x 8989');
 * // => { areaCode: '555', localCode: '444', lineNumber: '3333', extension: '8989' }
 *
 * // Works with placeholder syntax
 * breakdown('555-___-____')
 * // => { areaCode: '555', localCode: '___', lineNumber: '____', extension: '' }
 */
export default function breakdown (phone) {
  const [, areaCode, localCode, lineNumber, extension = ''] = uglify(phone)
    .match(/([_0-9]{3})?([_0-9]{3})([_0-9]{4})([_0-9]{1,})?/)

  return {
    areaCode,
    localCode,
    lineNumber,
    extension
  }
}
