import find from '../src/find'
import test from 'tape'

test('Get the area Code', t => {
  const results = find('areaCode', '555-444-1111')

  t.ok(results, 'Results came back ok')
  t.is(results, '555', 'Returned only the area code')
  t.end()
})

test('Get the local Code', t => {
  const results = find('localCode', '555-444-1111')

  t.ok(results, 'Results came back ok')
  t.is(results, '444', 'Returned only the local code')
  t.end()
})

test('Get the line number', t => {
  const results = find('lineNumber', '555-444-1111')

  t.ok(results, 'Results came back ok')
  t.is(results, '1111', 'Returned only the line number')
  t.end()
})

test('Get the extension', t => {
  const results = find('extension', '555-444-1111 8989')

  t.ok(results, 'Results came back ok')
  t.is(results, '8989', 'Returned only the extension number')
  t.end()
})
