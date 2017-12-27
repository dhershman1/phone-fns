import isValid from '../isValid/index';
import uglify from '../uglify/index';

export default (x, y) => {
	if (!isValid(x) || !isValid(y)) {
		return 'Invalid Numbers';
	}

	return uglify(x) === uglify(y);
};
