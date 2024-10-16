import test from 'tape'
import hasCountryCode from '../src/hasCountryCode.js'

test('hasCountryCode', (t) => {
  t.same(hasCountryCode('+1 555 555 5555'), true, 'should return true for +1 555 555 5555')
  t.same(hasCountryCode('+44 123 456 7890'), true, 'should return true for +44 123 456 7890')
  t.same(hasCountryCode('+91 987 654 3210'), true, 'should return true for +91 987 654 3210')
  t.same(hasCountryCode('+14445556666'), true, 'should return true for +14445556666')
  t.same(hasCountryCode('555 555 5555'), false, 'should return false for 555 555 5555')
  t.same(hasCountryCode('1234567890'), false, 'should return false for 1234567890')
  t.end()
})
