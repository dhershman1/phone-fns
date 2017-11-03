import callingCodes from '../callingCodes.js';

export default country => callingCodes[country.toLowerCase()];
