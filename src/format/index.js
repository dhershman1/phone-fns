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
 * format(phone, '(AAA)-LLL-nnnn');
 */

const format = (layout, num, type) => {
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

export default (phone, layout, type) => {
	if (!isValid(phone)) {
		return phone;
	}

	const uglyPhone = uglify(phone);
	const phoneObj = breakdown(uglyPhone, type, layout);
	let results = layout;

	for (const prop in phoneObj) {
		if (phoneObj[prop]) {
			results = format(results, phoneObj[prop], prop);
		}
	}

	return results;
};
