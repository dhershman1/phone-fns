import isValid from '../isValid/index';
import uglify from '../uglify/index';

/**
 * @name identical
 * @description Checks if the two provided numbers are identical or not
 *
 * @param {String} x The number to validate against
 * @param {String} y The number to validate
 * @return {Boolean} Returns a boolean if the numbers provided to match
 *
 * @example
 * const results = identical('5554443333', '5554443333'); // => true
 */
export default (x, y) => {
  if (!isValid(x) || !isValid(y)) {
    return 'Invalid Numbers';
  }

  return uglify(x) === uglify(y);
};
