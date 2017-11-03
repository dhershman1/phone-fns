import callingCodes from '../callingCodes.js';

export default code => {
	const foundCountries = [];

	for (const prop in callingCodes) {
		if (callingCodes[prop].indexOf(String(code)) !== -1) {
			foundCountries.push(prop);
		}
	}

	return foundCountries;
};
