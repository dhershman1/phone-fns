import getCode from './index';
import test from 'ava';

test('Test Case Insenitive', t => {
	t.is(getCode('USA')[0], '1', 'The code for USA was 1');
	t.is(getCode('usa')[0], '1', 'The code for usa was 1');
	t.is(getCode('US')[0], '1', 'The code for US was 1');
	t.is(getCode('us')[0], '1', 'The code for us was 1');
});

test('Test Large names', t => {
	t.is(getCode('oriental republic of uruguay')[0], '598', 'oriental republic of uruguay code was 598');
});

test('Test foreign spellings with unique characters', t => {
	t.is(getCode('ўзбекистон республикаси')[0], '998', 'ўзбекистон республикаси code was 998');
});
