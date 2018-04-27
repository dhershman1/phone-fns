import curry from './_internals/curry'
import isValid from './isValid'
import uglify from './uglify'

/**
 * @name match
 * @since v1.0.0
 * @category Function
 * @description Checks if the two provided numbers are matching or not
 * @param {String} x The number to validate against
 * @param {String} y The number to validate
 * @return {Boolean} Returns a boolean if the numbers provided to match
 *
 * @example
 * match('5554443333', '5554443333'); // => true
 * match('5554443333', '555-444-3333'); // => true
 * match('555-444-3333', '555-444-3333'); // => true
 * match('555.444.3333', '555-444-3333'); // => true
 *
 * // Or use it as a curried function
 *
 * const matcher = match('5554443333');
 *
 * matcher('555-444-3333'); // => true
 * matcher('555.444.3333'); // => true
 * matcher('555.444.2222'); // => false
 */
export default curry((x, y) => {
  if (!isValid(x) || !isValid(y)) {
    return false
  }

  return uglify(x) === uglify(y)
})
