import breakdown from '../breakdown/index';

export default (phone, type) => {
	if (type === 'countryCode') {
		return breakdown(phone, 'longDistance')[type];
	}

	return breakdown(phone)[type];
};
