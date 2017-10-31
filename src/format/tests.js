import format from './index';
import test from 'ava';

test('Test custom format normal', t => {
	const result = format('444-555-6666', '(AAA) LLL.NNNN');

	t.truthy(result, 'Result returned okay');
	t.is(result, '(444) 555.6666', 'Result formatted correctly on return');
});

test('Test custom format longDistance', t => {
	const result = format('1444-555-6666', 'C + (AAA) LLL.NNNN', 'longDistance');

	t.truthy(result, 'Result returned okay');
	t.is(result, '1 + (444) 555.6666', 'Result formatted correctly on return');
});

test('Test custom format extensions', t => {
	const result = format('444-555-66668989', '(AAA) LLL.NNNN x EEEE');

	t.truthy(result, 'Result returned okay');
	t.is(result, '(444) 555.6666 x 8989', 'Result formatted correctly on return');
});

test('Test custom format bad phone', t => {
	const result = format('89965', '(AAA).LLL.NNNN');

	t.truthy(result, 'Results returned okay');
	t.is(result, '89965', 'Returned back the bad number');
});

test('Test both longDistance and extensions', t => {
	const result = format('155544433338989', 'C + AAA.LLL.NNNN x EEEE', 'longDistance');

	t.truthy(result, 'Results returned okay');
	t.is(result, '1 + 555.444.3333 x 8989', 'Results are formatted as expected');
});
