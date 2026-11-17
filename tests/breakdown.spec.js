import breakdown from '../src/breakdown.js'
import test from 'tape'

test('Test breakdown normal', t => {
  const results = breakdown('555-444-3333')

  t.ok(results, 'results came back')
  t.is(typeof results, 'object', 'results came back as an object')
  t.is(results.areaCode, '555', 'The area code in results was 555')
  t.is(results.localCode, '444', 'The local code in results was 444')
  t.is(results.lineNumber, '3333', 'The lineNumber in results was 3333')
  t.notOk(results.extension.length, 'There was no extension')
  t.end()
})

test('Test breakdown with placeholder syntax', t => {
  const results = breakdown('555-___-____')

  t.is(results.areaCode, '555', 'The area code in results was 555')
  t.is(results.localCode, '___', 'The local code in results was ___')
  t.is(results.lineNumber, '____', 'The lineNumber in results was ____')
  t.end()
})

test('Test breakdown extension', t => {
  const results = breakdown('555-444-3333 x 8989')

  t.ok(results, 'results came back')
  t.is(typeof results, 'object', 'results came back as an object')
  t.is(results.areaCode, '555', 'The area code in results was 555')
  t.is(results.localCode, '444', 'The local code in results was 444')
  t.is(results.lineNumber, '3333', 'The lineNumber in results was 3333')
  t.is(results.extension, '8989', 'The extension number was 8989')
  t.end()
})

test('Test breakdown another normal', t => {
  const results = breakdown('5554441111')

  t.ok(results, 'results came back')
  t.is(typeof results, 'object', 'results came back as an object')
  t.is(results.areaCode, '555', 'The area code in results was 555')
  t.is(results.localCode, '444', 'The local code in results was 444')
  t.is(results.lineNumber, '1111', 'The lineNumber in results was 3333')
  t.notOk(results.extension.length, 'The extension number was empty')
  t.end()
})

const empty = { countryCode: '', areaCode: '', localCode: '', lineNumber: '', extension: '' }

test('Always returns a countryCode key', t => {
  t.same(breakdown('555-444-3333'), { ...empty, areaCode: '555', localCode: '444', lineNumber: '3333' })
  t.end()
})

test('Breaks down 7 digit local numbers', t => {
  t.same(breakdown('444-3333'), { ...empty, localCode: '444', lineNumber: '3333' })
  t.end()
})

test('Picks up a country code from a leading +', t => {
  const expected = { ...empty, areaCode: '555', localCode: '444', lineNumber: '3333' }

  t.same(breakdown('+1 555-444-3333'), { ...expected, countryCode: '1' })
  t.same(breakdown('+44 555 444 3333'), { ...expected, countryCode: '44' })
  t.same(breakdown('+353 (555) 444-3333'), { ...expected, countryCode: '353' })
  t.end()
})

test('Picks up a 1 country code on 11 digit numbers', t => {
  t.same(breakdown('15554443333'), { ...empty, countryCode: '1', areaCode: '555', localCode: '444', lineNumber: '3333' })
  t.same(breakdown('1 (555) 444-3333'), { ...empty, countryCode: '1', areaCode: '555', localCode: '444', lineNumber: '3333' })
  t.end()
})

test('Picks up extensions from any supported marker', t => {
  const expected = { ...empty, areaCode: '555', localCode: '444', lineNumber: '3333', extension: '123' }

  t.same(breakdown('5554443333x123'), expected)
  t.same(breakdown('555-444-3333 X 123'), expected)
  t.same(breakdown('555-444-3333 ext 123'), expected)
  t.same(breakdown('555-444-3333 ext. 123'), expected)
  t.same(breakdown('555-444-3333 extension 123'), expected)
  t.same(breakdown('555-444-3333 #123'), expected)
  t.end()
})

test('Handles country code and extension together', t => {
  t.same(breakdown('+1 555-444-3333 x 8989'), { countryCode: '1', areaCode: '555', localCode: '444', lineNumber: '3333', extension: '8989' })
  t.end()
})

test('Handles placeholder extensions', t => {
  t.same(breakdown('555-444-3333 x ____').extension, '____')
  t.end()
})

test('Coerces numbers', t => {
  t.same(breakdown(5554443333), { ...empty, areaCode: '555', localCode: '444', lineNumber: '3333' })
  t.end()
})

test('Throws a clear error for numbers it cannot break down', t => {
  const err = /The phone number provided could not be broken down/

  t.throws(() => breakdown(''), err, 'empty string')
  t.throws(() => breakdown(null), err, 'null')
  t.throws(() => breakdown(undefined), err, 'undefined')
  t.throws(() => breakdown('123'), err, 'too short')
  t.throws(() => breakdown('55544433338989'), err, 'extension without a marker')
  t.throws(() => breakdown('25554443333'), err, '11 digits not starting with 1')
  t.throws(() => breakdown('+5554443333'), err, '+ with no room for a country code')
  t.throws(() => breakdown('+444-3333'), err, '+ on a local number')
  t.throws(() => breakdown('+1234 555-444-3333'), err, 'country code longer than 3 digits')
  t.throws(() => breakdown('555-abc-3333'), err, 'letters in the number')
  t.throws(() => breakdown('555+444-3333'), err, '+ in the middle of the number')
  t.end()
})
