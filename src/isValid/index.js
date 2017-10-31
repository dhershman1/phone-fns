import uglify from '../uglify/index';

export default phone => phone && (/^[0-9]{7,}$/).test(uglify(phone));
