import find from './index';
import test from 'ava';

test('Get the area Code', t => {
  const results = find('areaCode', '555-444-1111');

  t.truthy(results, 'Results came back ok');
  t.is(results, '555', 'Returned only the area code');
});

test('Get the local Code', t => {
  const results = find('localCode', '555-444-1111');

  t.truthy(results, 'Results came back ok');
  t.is(results, '444', 'Returned only the local code');
});

test('Get the line number', t => {
  const results = find('lineNumber', '555-444-1111');

  t.truthy(results, 'Results came back ok');
  t.is(results, '1111', 'Returned only the line number');
});


test('Get the extension', t => {
  const results = find('extension', '555-444-1111 8989');

  t.truthy(results, 'Results came back ok');
  t.is(results, '8989', 'Returned only the extension number');
});
