import breakdown from '../breakdown/index';
import callingCodes from '../callingCodes.js';
import uglify from '../uglify/index';

const validateCountryCode = (phone, country) => {
	const { countryCode } = breakdown(phone, true);

	return callingCodes[country.toLowerCase()].indexOf(countryCode) !== -1;
};

export default (phone, country) => {
	let isValid = false;

	if (phone && (/^[0-9]{7,}$/).test(uglify(phone))) {
		isValid = true;
	} else {
		return false;
	}

	if (country && !validateCountryCode(phone, country)) {
		isValid = false;
	}

	return isValid;
};
