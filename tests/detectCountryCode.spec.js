import test from 'tape'
import detectCountryCode from '../src/detectCountryCode.js'

test('detectCountryCode - valid country codes', (t) => {
  t.same(detectCountryCode('+1 234 567 890'), '1', 'Should detect country code 1')
  t.same(detectCountryCode('+44 123 456 7890'), '44', 'Should detect country code 44')
  t.same(detectCountryCode('+91 987 654 3210'), '91', 'Should detect country code 91')
  t.same(detectCountryCode('+86-123-456-7890'), '86', 'Should detect country code 86')
  t.end()
})

test('detectCountryCode - invalid or no country code', (t) => {
  t.same(detectCountryCode('1234567890'), null, 'Should return null for no country code')
  t.same(detectCountryCode('001234567890'), null, 'Should return null for invalid country code format')
  t.same(detectCountryCode('+'), null, 'Should return null for incomplete country code')
  t.same(detectCountryCode(''), null, 'Should return null for empty string')
  t.end()
})
