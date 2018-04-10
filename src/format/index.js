import breakdown from '../breakdown/index';
import curry from '../_internals/curry';
import isValid from '../isValid/index';
import uglify from '../uglify/index';

const replaceLayout = (layout, num, type) => {
  const letters = {
    areaCode: 'A',
    localCode: 'L',
    lineNumber: 'N',
    extension: 'E',
    countryCode: 'C'
  };
  let results = layout.concat();

  num.split('').forEach(n => {
    results = results.replace(letters[type], n);
  });

  return results;
};

/**
 * @name format
 * @since v0.1.0
 * @category Function
 * @description
 * Allows you to format phone numbers however you desire
 * L = Local Code
 * A = Area Code
 * N = Line Number
 * E = Extension
 * C = Country Code
 * @param {String} countryCode The provided country code for the number
 * @param {String} layout The desired layout of the phone number
 * @param {String} phone The phone number to breakdown
 * @return {String} Returns a string which is the formatted phone number
 *
 * @example
 * format('444-555-6666', '(AAA) LLL.NNNN'); // => '(444) 555.6666'
 * format('1444-555-6666', 'C + (AAA) LLL.NNNN', true); // => '1 + (444) 555.6666'
 * format('444-555-66668989', '(AAA) LLL.NNNN x EEEE'); // => '(444) 555.6666 x 8989'
 *
 * // Format is also curried
 * const noCC = format('');
 * const withLayout = format('', 'AAA.LLL.NNNN');
 *
 * noCC('AAA-LLL-NNNN', '4445556666'); // => '444-555-6666'
 * withLayout('4445556666'); // => '444.555.6666'
 */
export default curry((countryCode, layout, phone) => {
  if (!isValid(phone)) {
    return phone;
  }

  const uglyPhone = uglify(phone);
  const phoneObj = breakdown(countryCode, uglyPhone);
  let results = layout;

  for (const prop in phoneObj) {
    if (phoneObj[prop]) {
      results = replaceLayout(results, phoneObj[prop], prop);
    }
  }

  return results;
});
