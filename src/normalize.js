/**
 * @name normalize
 * @since v4.1.0
 * @function
 * @category Function
 * @sig String -> String
 * @description Strips all of the special characters from the given string but leaves extension and country code characters in place
 * @param {String} phone The phone number to trim and strip down
 * @return {String} Returns the newly created phone number string
 *
 * @example
 * import { normalize } from 'phone-fns'
 *
 * normalize('555-444-3333') // => '5554443333'
 * normalize('5554443333') // => '5554443333'
 * normalize('555.444.3333 x 123') // => '5554443333x123'
 */
export default function normalize (phone) {
  if (!phone) {
    return ''
  }

  return phone.replace(/[\s.\-()]/g, '').trim()
}
