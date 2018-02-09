import curry from '../_internals/curry';
import lengths from '../_internals/lengths';
import uglify from '../uglify/index';

const formatCountryCode = (phone, { countryCode }) => {
  const len = countryCode ? countryCode : phone.length - 10;
  const codeReg = new RegExp(`([0-9]{${len}})`);
  const [uglyCountryCode] = phone.match(codeReg);


  return [uglyCountryCode, phone.replace(codeReg, '')];
};

/**
 * @name breakdown
 * @description Takes a provided phone string and breaks it down into an object of codes
 *
 * @param {String} phone The phone number to breakdown
 * @param {Boolean} isLD Boolean setting long distance to true of false
 * @param {String} layout The layout from format to find country and extension codes
 * @return {Object} Returns an object of the broken down phone number
 *
 * @example
 * const obj = breakdown(false, '', 111-222-3333'); // => { areaCode: '111', localCode: '222', lineNumber: '3333' }
 * const obj = breakdown(true, '', 17875554441111');
 * // => { areaCode: '555', localCode: '444', lineNumber: '1111', countryCode: 1787 }
 * const obj = breakdown(false, '', 555-444-3333 x 8989');
 * // => { areaCode: '555', localCode: '444', lineNumber: '3333', extension: 8989 }
 *
 * // Breakdown is curried
 * const breaker = breakdown(false, '');
 *
 * breaker('222-333-4444'); // => { areaCode: '222', localCode: '333', lineNumber: '4444' }
 */
export default curry((isLD, layout, phone) => {
  const uglyPhone = uglify(phone);
  let currPhone = uglyPhone;
  let countryCode = '';
  let lens = 0;

  if (layout) {
    lens = lengths(layout);
  }

  if (isLD) {
    [countryCode, currPhone] = formatCountryCode(uglyPhone, lens);
  }

  const [, areaCode, localCode, lineNumber, extension = ''] = currPhone
    .match(/([0-9]{3})?([0-9]{3})([0-9]{4})([0-9]{1,})?/);

  return {
    countryCode,
    areaCode,
    localCode,
    lineNumber,
    extension
  };
});
