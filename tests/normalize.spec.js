import test from 'tape'
import normalize from '../src/normalize.js'

test('normalize removes spaces, dots, dashes, and parentheses', (t) => {
  t.same(normalize('123 456 7890'), '1234567890', 'should remove spaces')
  t.same(normalize('123.456.7890'), '1234567890', 'should remove dots')
  t.same(normalize('123-456-7890'), '1234567890', 'should remove dashes')
  t.same(normalize('(123) 456-7890'), '1234567890', 'should remove parentheses')
  t.same(normalize('(123) 456-7890 x123'), '1234567890x123', 'should handle extension')
  t.same(normalize('(123) 456-7890 x 123'), '1234567890x123', 'should handle extension')
  t.end()
})

test('normalize trims the input', (t) => {
  t.same(normalize(' 1234567890 '), '1234567890', 'should trim leading and trailing spaces')
  t.same(normalize('\t1234567890\t'), '1234567890', 'should trim leading and trailing tabs')
  t.end()
})

test('normalize handles mixed characters', (t) => {
  t.same(normalize(' (123) 456-7890. '), '1234567890', 'should remove mixed characters and trim')
  t.end()
})

test('normalize handles empty and null input', (t) => {
  t.same(normalize(''), '', 'should handle empty string')
  t.same(normalize(null), '', 'should handle null input')
  t.end()
})
