import isValid from './index';
import test from 'ava';

test('Test simple type', t => {
	const results = isValid('555-444-3333');

	t.truthy(results, 'Results returned back ok');
});

test('Test complex type', t => {
	const results = isValid('(555) 444 3333');

	t.truthy(results, 'Results returned back ok');
});

test('Test invalid type', t => {
	const results = isValid('89965');

	t.falsy(results, 'Results returned back false');
});

test('Test Country Code Validation', t => {
	const results = isValid('1 + (555) 444 3333', 'usa');

	t.truthy(results, 'is a valid number & country code');
});

test('Test invalid country code', t => {
	const results = isValid('9885554443333', 'usa');

	t.falsy(results, '988 is not a valid country code for the US');
});
