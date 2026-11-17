/**
 * @name uglify
 * @since v0.1.0
 * @function
 * @category Function
 * @sig String -> String
 * @description Strips everything except digits and `_` placeholders from the given string
 * @param {String} phone The phone number to trim and strip down
 * @return {String} Returns the newly created phone number string
 *
 * @example
 * uglify('555-444-3333') // => '5554443333'
 * uglify('5554443333') // => '5554443333'
 * uglify('555-444-3333 x123') // => '5554443333123'
 */
function uglify (phone) {
  if (phone == null) {
    return ''
  }

  return String(phone).replace(/[^\d_]/g, '')
}

export default uglify
