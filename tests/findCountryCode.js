import test from 'tape'
import findCountryCode from '../src/findCountryCode.js'

test('findCountryCode - valid country codes', (t) => {
  t.same(findCountryCode('+1 234 567 890'), '1', 'Should detect country code 1')
  t.same(findCountryCode('+44 123 456 7890'), '44', 'Should detect country code 44')
  t.same(findCountryCode('+91 987 654 3210'), '91', 'Should detect country code 91')
  t.same(findCountryCode('+86-123-456-7890'), '86', 'Should detect country code 86')
  t.end()
})

test('findCountryCode - invalid or no country code', (t) => {
  t.same(findCountryCode('1234567890'), null, 'Should return null for no country code')
  t.same(findCountryCode('001234567890'), null, 'Should return null for invalid country code format')
  t.same(findCountryCode('+'), null, 'Should return null for incomplete country code')
  t.same(findCountryCode(''), null, 'Should return null for empty string')
  t.end()
})
