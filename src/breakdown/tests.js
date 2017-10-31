import breakdown from './index';
import test from 'tape';

test('Test breakdown normal', t => {
	const results = breakdown('555-444-3333');

	t.ok(results, 'results came back');
	t.equal(typeof results, 'object', 'results came back as an object');
	t.equal(results.areaCode, '555', 'The area code in results was 555');
	t.equal(results.localCode, '444', 'The local code in results was 444');
	t.equal(results.lineNumber, '3333', 'The lineNumber in results was 3333');
	t.notOk(results.countryCode.length, 'There was no country code');
	t.notOk(results.extension.length, 'There was no extension');
	t.end();
});

test('Test breakdown extension', t => {
	const results = breakdown('555-444-3333 x 8989');

	t.ok(results, 'results came back');
	t.equal(typeof results, 'object', 'results came back as an object');
	t.equal(results.areaCode, '555', 'The area code in results was 555');
	t.equal(results.localCode, '444', 'The local code in results was 444');
	t.equal(results.lineNumber, '3333', 'The lineNumber in results was 3333');
	t.equal(results.extension, '8989', 'The extension number was 8989');
	t.notOk(results.countryCode.length, 'There was no country code');
	t.end();
});

test('Test breakdown long distance', t => {
	const results = breakdown('17875554441111', 'longDistance');

	t.ok(results, 'results came back');
	t.equal(typeof results, 'object', 'results came back as an object');
	t.equal(results.areaCode, '555', 'The area code in results was 555');
	t.equal(results.localCode, '444', 'The local code in results was 444');
	t.equal(results.lineNumber, '1111', 'The lineNumber in results was 3333');
	t.equal(results.countryCode, '1-787', 'The country code was 1-787');
	t.notOk(results.extension.length, 'The extension number was empty');
	t.end();
});
