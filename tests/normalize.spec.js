import test from 'tape'
import normalize from '../src/normalize.js'

test('normalize removes spaces, dots, dashes, and parentheses', (t) => {
  t.equal(normalize('123 456 7890'), '1234567890', 'should remove spaces')
  t.equal(normalize('123.456.7890'), '1234567890', 'should remove dots')
  t.equal(normalize('123-456-7890'), '1234567890', 'should remove dashes')
  t.equal(normalize('(123) 456-7890'), '1234567890', 'should remove parentheses')
  t.equal(normalize('(123) 456-7890 x123'), '1234567890x123', 'should handle extension')
  t.equal(normalize('(123) 456-7890 x 123'), '1234567890x123', 'should handle extension')
  t.end()
})

test('normalize trims the input', (t) => {
  t.equal(normalize(' 1234567890 '), '1234567890', 'should trim leading and trailing spaces')
  t.equal(normalize('\t1234567890\t'), '1234567890', 'should trim leading and trailing tabs')
  t.end()
})

test('normalize handles mixed characters', (t) => {
  t.equal(normalize(' (123) 456-7890. '), '1234567890', 'should remove mixed characters and trim')
  t.end()
})

test('normalize handles empty and null input', (t) => {
  t.equal(normalize(''), '', 'should handle empty string')
  t.equal(normalize(null), '', 'should handle null input')
  t.end()
})
