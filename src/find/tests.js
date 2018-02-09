import find from './index';
import test from 'ava';

test('Get the area Code', t => {
  const results = find('555-444-1111', 'areaCode');

  t.truthy(results, 'Results came back ok');
  t.is(results, '555', 'Returned only the area code');
});

test('Get the local Code', t => {
  const results = find('555-444-1111', 'localCode');

  t.truthy(results, 'Results came back ok');
  t.is(results, '444', 'Returned only the local code');
});

test('Get the line number', t => {
  const results = find('555-444-1111', 'lineNumber');

  t.truthy(results, 'Results came back ok');
  t.is(results, '1111', 'Returned only the line number');
});

test('Get the country code', t => {
  const results = find('1555-444-1111', 'countryCode');

  t.truthy(results, 'Results came back ok');
  t.is(results, '1', 'Returned only the country code');
});

test('Get the country code', t => {
  const results = find('555-444-1111 8989', 'extension');

  t.truthy(results, 'Results came back ok');
  t.is(results, '8989', 'Returned only the extension number');
});
