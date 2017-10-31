import isValid from '../isValid/index';
import uglify from '../uglify/index';

export default (x, y) => {
	if (!isValid(x) || !isValid(y)) {
		return 'Invalid Dates';
	}

	return uglify(x) === uglify(y);
};
