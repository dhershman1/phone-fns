import breakdown from '../breakdown/index';

/**
 * @name find
 * @description Find a piece of the phone number and return it
 *
 * @param {String} phone The phone number to breakdown
 * @param {String} type The piece of the phone to look for
 * @return {String} Returns a string from the desired part of the phone number
 *
 * @example
 * const results = find('555-444-1111', 'areaCode'); // => '555'
 * const results = find('555-444-1111', 'localCode'); // => '444'
 * const results = find('555-444-1111', 'lineNumber'); // => '1111'
 * const results = find('1555-444-1111', 'countryCode'); // => '1'
 * const results = find('555-444-1111 8989', 'extension'); // => '8989'
 */
const find = (phone, type) => {
  if (type === 'countryCode') {
    return breakdown(phone, 'longDistance')[type];
  }

  return breakdown(phone)[type];
};

export default find;
