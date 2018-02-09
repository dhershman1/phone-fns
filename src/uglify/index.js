/**
 * @name uglify
 * @description Strips all of the special characters from the given string
 *
 * @param {String} phone The phone number to trim and strip down
 * @return {String} Returns the newly created phone number string
 *
 * @example
 * const results = uglify('555-444-3333'); // => '5554443333'
 */
export default phone => phone.replace(/[a-z]\w?|\W/gi, '');
