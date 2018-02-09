import uglify from '../uglify/index';

const getLengths = layout => {
  const countryCodes = layout.match(/C/g);
  const extensionCodes = layout.match(/E/g);

  return {
    countryCode: countryCodes ? countryCodes.length : 0,
    extension: extensionCodes ? extensionCodes.length : 0
  };
};

const formatCountryCode = (phone, { countryCode }) => {
  const countryCodeLen = countryCode ? countryCode : phone.length - 10;
  const codeReg = new RegExp(`([0-9]{${countryCodeLen}})`);
  const [uglyCountryCode] = phone.match(codeReg);


  return [uglyCountryCode, phone.replace(codeReg, '')];
};

const formatCode = (phone, n) => {
  if (!phone) {
    return ['', false];
  }

  const codeReg = new RegExp(`([0-9]{${n}})`);
  const [currCode] = phone.match(codeReg);

  return [currCode, phone.replace(codeReg, '')];
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
 * const obj = breakdown('111-222-3333'); // => { areaCode: '111', localCode: '222', lineNumber: '3333' }
 * const obj = breakdown('17875554441111', 'longDistance'); // => { areaCode: '555', localCode: '444', lineNumber: '1111', countryCode: 1787 }
 * const obj = breakdown('555-444-3333 x 8989'); // => { areaCode: '555', localCode: '444', lineNumber: '3333', extension: 8989 }
 */
const breakdown = (phone, isLD, layout) => {
  const uglyPhone = uglify(phone);
  let currPhone = uglyPhone;
  let countryCode = '';
  let areaCode = '';
  let localCode = '';
  let lengths = 0;

  if (layout) {
    lengths = getLengths(layout);
  }

  if (isLD) {
    [countryCode, currPhone] = formatCountryCode(uglyPhone, lengths);
  }

  if (uglyPhone.length >= 10) {
    [areaCode, currPhone] = formatCode(currPhone, 3);
  }

  [localCode, currPhone] = formatCode(currPhone, 3);

  const [lineNumber, extension] = formatCode(currPhone, 4);

  return {
    countryCode,
    areaCode,
    localCode,
    lineNumber,
    extension
  };
};

export default breakdown;
