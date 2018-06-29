import breakdown from './breakdown'
import find from './find'
import format from './format'
import isValid from './isValid'
import match from './match'
import uglify from './uglify'

const phoneFns = (countryCode = '') => {
  if (typeof countryCode !== 'string' && typeof countryCode !== 'number') {
    throw new TypeError('Country Code needs to be a string or number')
  }

  const ccStr = String(countryCode)

  return {
    breakdown: breakdown(ccStr),
    format: format(ccStr),
    find: find(ccStr),
    isValid,
    match,
    uglify
  }
}

export default phoneFns
