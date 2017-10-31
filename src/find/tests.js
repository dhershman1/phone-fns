const find = require('./index');
const test = require('tape');

test('Get the area Code', t => {
	const results = find('555-444-1111', 'areaCode');

	t.ok(results, 'Results came back ok');
	t.equal(results, '555', 'Returned only the area code');

	t.end();
});

test('Get the local Code', t => {
	const results = find('555-444-1111', 'localCode');

	t.ok(results, 'Results came back ok');
	t.equal(results, '444', 'Returned only the local code');

	t.end();
});

test('Get the line number', t => {
	const results = find('555-444-1111', 'lineNumber');

	t.ok(results, 'Results came back ok');
	t.equal(results, '1111', 'Returned only the line number');

	t.end();
});

test('Get the country code', t => {
	const results = find('1555-444-1111', 'countryCode');

	t.ok(results, 'Results came back ok');
	t.equal(results, '1', 'Returned only the country code');

	t.end();
});

test('Get the country code', t => {
	const results = find('555-444-1111 8989', 'extension');

	t.ok(results, 'Results came back ok');
	t.equal(results, '8989', 'Returned only the extension number');

	t.end();
});