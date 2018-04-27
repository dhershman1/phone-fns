import breakdown from '../src/breakdown'
import test from 'ava'

const breaker = breakdown('')

test('Test breakdown normal', t => {
  const results = breaker('555-444-3333')

  t.truthy(results, 'results came back')
  t.is(typeof results, 'object', 'results came back as an object')
  t.is(results.areaCode, '555', 'The area code in results was 555')
  t.is(results.localCode, '444', 'The local code in results was 444')
  t.is(results.lineNumber, '3333', 'The lineNumber in results was 3333')
  t.falsy(results.countryCode.length, 'There was no country code')
  t.falsy(results.extension.length, 'There was no extension')
})

test('Test breakdown extension', t => {
  const results = breaker('555-444-3333 x 8989')

  t.truthy(results, 'results came back')
  t.is(typeof results, 'object', 'results came back as an object')
  t.is(results.areaCode, '555', 'The area code in results was 555')
  t.is(results.localCode, '444', 'The local code in results was 444')
  t.is(results.lineNumber, '3333', 'The lineNumber in results was 3333')
  t.is(results.extension, '8989', 'The extension number was 8989')
  t.falsy(results.countryCode.length, 'There was no country code')
})

test('Test breakdown long distance', t => {
  const results = breakdown('1787', '5554441111')

  t.truthy(results, 'results came back')
  t.is(typeof results, 'object', 'results came back as an object')
  t.is(results.areaCode, '555', 'The area code in results was 555')
  t.is(results.localCode, '444', 'The local code in results was 444')
  t.is(results.lineNumber, '1111', 'The lineNumber in results was 3333')
  t.is(results.countryCode, '1787', 'The country code was 1-787')
  t.falsy(results.extension.length, 'The extension number was empty')
})
