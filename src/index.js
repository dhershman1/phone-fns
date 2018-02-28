import breakdown from './breakdown';
import find from './find';
import format from './format';
import isValid from './isValid';
import match from './match';
import uglify from './uglify';

const phoneFns = (countryCode = '') => {
  if (typeof countryCode !== 'string') {
    throw new TypeError('Country Code needs to be a string');
  }

  return {
    breakdown: breakdown(countryCode),
    format: format(countryCode),
    find: find(countryCode),
    isValid,
    match,
    uglify
  };
};

export default phoneFns;
