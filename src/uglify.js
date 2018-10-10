/**
 * @name uglify
 * @since v0.1.0
 * @category Function
 * @description Strips all of the special characters from the given string
 * @param {String} phone The phone number to trim and strip down
 * @return {String} Returns the newly created phone number string
 *
 * @example
 * const results = uglify('555-444-3333'); // => '5554443333'
 */
const uglify = phone => String(phone).replace(/[a-z]\w?|\W/gi, '')

export default uglify
