import test from 'ava';
import uglify from './index';

test('Test simple type', t => {
  const results = uglify('555-444-3333');

  t.truthy(results, 'Results returned back ok');
  t.is(results, '5554443333', 'results came back valid');
});
