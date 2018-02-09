import breakdown from '../breakdown/index';
import isValid from '../isValid/index';
import uglify from '../uglify/index';

/**
 * L = Local Code
 * A = Area Code
 * N = Line Number
 * E = Extension
 * C = Country Code
 * Example:
 *
 * format(phone, '(AAA)-LLL-NNNN');
 */

const replaceLayout = (layout, num, type) => {
  const letters = {
    areaCode: 'A',
    localCode: 'L',
    lineNumber: 'N',
    extension: 'E',
    countryCode: 'C'
  };
  let results = layout;

  num.split('').forEach(n => {
    results = results.replace(letters[type], n);
  });

  return results;
};

/**
 * @name format
 * @description Allows you to format phone numbers however you desire
 *
 * @param {String} phone The phone number to breakdown
 * @param {String} layout The desired layout of the phone number
 * @param {Boolean} isLD Boolean setting long distance to true of false
 * @return {String} Returns a string which is the formatted phone number
 *
 * @example
 * const results = format('444-555-6666', '(AAA) LLL.NNNN'); // => '(444) 555.6666'
 * const results = format('1444-555-6666', 'C + (AAA) LLL.NNNN', true); // => '1 + (444) 555.6666'
 * const results = format('444-555-66668989', '(AAA) LLL.NNNN x EEEE'); // => '(444) 555.6666 x 8989'
 */
export default (phone, layout, isLD) => {
  if (!isValid(phone)) {
    return phone;
  }

  const uglyPhone = uglify(phone);
  const phoneObj = breakdown(isLD, layout, uglyPhone);
  let results = layout;

  for (const prop in phoneObj) {
    if (phoneObj[prop]) {
      results = replaceLayout(results, phoneObj[prop], prop);
    }
  }

  return results;
};
