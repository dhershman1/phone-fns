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
