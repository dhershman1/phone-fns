import uglify from '../uglify/index';

/**
 * @name isValid
 * @description Checks if the phone number is valid or not
 *
 * @param {String} phone The phone number to breakdown
 * @param {String} country The country name to validate with
 * @return {Boolean} Returns a boolean if the number provided is valid or not
 *
 * @example
 * const results = isValid('555-444-3333'); // => true
 */
export default phone => {
  let valid = false;

  if (phone && (/^[0-9]{7,}$/).test(uglify(phone))) {
    valid = true;
  } else {
    return false;
  }

  return valid;
};
