import identical from './index';
import test from 'ava';

test('Test simple type', t => {
	const results = identical('5554443333', '5554443333');

	t.truthy(results, 'Results returned back ok');
});

test('Test medium complex type', t => {
	const results = identical('555-444-3333', '555-444-3333');

	t.truthy(results, 'Results returned back ok');
});

test('Test complex type', t => {
	const results = identical('(555) 444-3333', '(555) 444-3333');

	t.truthy(results, 'Results returned back ok');
});

