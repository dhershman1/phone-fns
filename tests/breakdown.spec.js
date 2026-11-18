import breakdown from '../src/breakdown.js'
import { test } from 'node:test'
import assert from 'node:assert/strict'

test('Test breakdown normal', () => {
  const results = breakdown('555-444-3333')

  assert.ok(results, 'results came back')
  assert.equal(typeof results, 'object', 'results came back as an object')
  assert.equal(results.areaCode, '555', 'The area code in results was 555')
  assert.equal(results.localCode, '444', 'The local code in results was 444')
  assert.equal(results.lineNumber, '3333', 'The lineNumber in results was 3333')
  assert.equal(results.extension, '', 'There was no extension')
})

test('Test breakdown with placeholder syntax', () => {
  const results = breakdown('555-___-____')

  assert.equal(results.areaCode, '555', 'The area code in results was 555')
  assert.equal(results.localCode, '___', 'The local code in results was ___')
  assert.equal(results.lineNumber, '____', 'The lineNumber in results was ____')
})

test('Test breakdown extension', () => {
  const results = breakdown('555-444-3333 x 8989')

  assert.ok(results, 'results came back')
  assert.equal(typeof results, 'object', 'results came back as an object')
  assert.equal(results.areaCode, '555', 'The area code in results was 555')
  assert.equal(results.localCode, '444', 'The local code in results was 444')
  assert.equal(results.lineNumber, '3333', 'The lineNumber in results was 3333')
  assert.equal(results.extension, '8989', 'The extension number was 8989')
})

test('Test breakdown another normal', () => {
  const results = breakdown('5554441111')

  assert.ok(results, 'results came back')
  assert.equal(typeof results, 'object', 'results came back as an object')
  assert.equal(results.areaCode, '555', 'The area code in results was 555')
  assert.equal(results.localCode, '444', 'The local code in results was 444')
  assert.equal(results.lineNumber, '1111', 'The lineNumber in results was 3333')
  assert.equal(results.extension, '', 'The extension number was empty')
})

const empty = { countryCode: '', areaCode: '', localCode: '', lineNumber: '', extension: '' }

test('Always returns a countryCode key', () => {
  assert.deepEqual(breakdown('555-444-3333'), { ...empty, areaCode: '555', localCode: '444', lineNumber: '3333' })
})

test('Breaks down 7 digit local numbers', () => {
  assert.deepEqual(breakdown('444-3333'), { ...empty, localCode: '444', lineNumber: '3333' })
})

test('Picks up a country code from a leading +', () => {
  const expected = { ...empty, areaCode: '555', localCode: '444', lineNumber: '3333' }

  assert.deepEqual(breakdown('+1 555-444-3333'), { ...expected, countryCode: '1' })
  assert.deepEqual(breakdown('+44 555 444 3333'), { ...expected, countryCode: '44' })
  assert.deepEqual(breakdown('+353 (555) 444-3333'), { ...expected, countryCode: '353' })
})

test('Picks up a 1 country code on 11 digit numbers', () => {
  assert.deepEqual(breakdown('15554443333'), { ...empty, countryCode: '1', areaCode: '555', localCode: '444', lineNumber: '3333' })
  assert.deepEqual(breakdown('1 (555) 444-3333'), { ...empty, countryCode: '1', areaCode: '555', localCode: '444', lineNumber: '3333' })
})

test('Picks up extensions from any supported marker', () => {
  const expected = { ...empty, areaCode: '555', localCode: '444', lineNumber: '3333', extension: '123' }

  assert.deepEqual(breakdown('5554443333x123'), expected)
  assert.deepEqual(breakdown('555-444-3333 X 123'), expected)
  assert.deepEqual(breakdown('555-444-3333 ext 123'), expected)
  assert.deepEqual(breakdown('555-444-3333 ext. 123'), expected)
  assert.deepEqual(breakdown('555-444-3333 extension 123'), expected)
  assert.deepEqual(breakdown('555-444-3333 #123'), expected)
})

test('Handles country code and extension together', () => {
  assert.deepEqual(breakdown('+1 555-444-3333 x 8989'), { countryCode: '1', areaCode: '555', localCode: '444', lineNumber: '3333', extension: '8989' })
})

test('Handles placeholder extensions', () => {
  assert.deepEqual(breakdown('555-444-3333 x ____').extension, '____')
})

test('Coerces numbers', () => {
  assert.deepEqual(breakdown(5554443333), { ...empty, areaCode: '555', localCode: '444', lineNumber: '3333' })
})

test('Throws a clear error for numbers it cannot break down', () => {
  const err = /The phone number provided could not be broken down/

  assert.throws(() => breakdown(''), err, 'empty string')
  assert.throws(() => breakdown(null), err, 'null')
  assert.throws(() => breakdown(undefined), err, 'undefined')
  assert.throws(() => breakdown('123'), err, 'too short')
  assert.throws(() => breakdown('55544433338989'), err, 'extension without a marker')
  assert.throws(() => breakdown('25554443333'), err, '11 digits not starting with 1')
  assert.throws(() => breakdown('+5554443333'), err, '+ with no room for a country code')
  assert.throws(() => breakdown('+444-3333'), err, '+ on a local number')
  assert.throws(() => breakdown('+1234 555-444-3333'), err, 'country code longer than 3 digits')
  assert.throws(() => breakdown('555-abc-3333'), err, 'letters in the number')
  assert.throws(() => breakdown('555+444-3333'), err, '+ in the middle of the number')
})
