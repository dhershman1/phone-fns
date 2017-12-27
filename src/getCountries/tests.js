import getCountries from './index';
import test from 'ava';

test('Overall functionality', t => {
	t.deepEqual(getCountries('1'), [
		'canada',
		'ca',
		'united states',
		'us',
		'usa',
		'united states of america'
	], 'Found all of the countries with 1');
});

test('Test with Foreign characters', t => {
	t.deepEqual(getCountries('998'), [
		'uzbekistan',
		'uz',
		'republic of uzbekistan',
		'o‘zbekiston respublikasi',
		'ўзбекистон республикаси'
	], 'Found all of the countries with 1');
});

