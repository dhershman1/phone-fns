import { test } from 'node:test'
import assert from 'node:assert/strict'
import breakdownWithFormat from '../src/breakdownWithFormat.js'

test('breakdownWithFormat - valid input', () => {
  const format = '+C (AAA) LLL-NNNN xXXX'
  const phone = '+1 (555) 444-3333 x123'
  const expected = {
    countryCode: '1',
    areaCode: '555',
    localCode: '444',
    lineNumber: '3333',
    extension: '123'
  }

  const result = breakdownWithFormat(format, phone)
  assert.deepEqual(result, expected, 'Should correctly breakdown the phone number with the given format')
})

test('breakdownWithFormat - missing format', () => {
  const phone = '+1 (555) 444-3333 x123'

  assert.throws(() => breakdownWithFormat(null, phone), /You must provide a format to breakdown/, 'Should throw an error if format is missing')
})

test('breakdownWithFormat - invalid phone number', () => {
  const format = '+C (AAA) LLL-NNNN xXXX'
  const phone = 'invalid phone number'

  assert.throws(() => breakdownWithFormat(format, phone), /The phone number provided does not match the format provided or is an invalid phone number/, 'Should throw an error if phone number does not match the format')
})

test('breakdownWithFormat - different format', () => {
  const format = '+C-AAA-LLL-NNNN xXXX'
  const phone = '+1-555-444-3333 x123'
  const expected = {
    countryCode: '1',
    areaCode: '555',
    localCode: '444',
    lineNumber: '3333',
    extension: '123'
  }

  const result = breakdownWithFormat(format, phone)
  assert.deepEqual(result, expected, 'Should correctly breakdown the phone number with a different format')
})

test('breakdownWithFormat - no extension', () => {
  const format = '+C (AAA) LLL-NNNN'
  const phone = '+1 (555) 444-3333'
  const expected = {
    countryCode: '1',
    areaCode: '555',
    localCode: '444',
    lineNumber: '3333',
    extension: ''
  }

  const result = breakdownWithFormat(format, phone)
  assert.deepEqual(result, expected, 'Should correctly breakdown the phone number without an extension')
})

test('breakdownWithFormat - rejects mismatched literals', () => {
  const err = /does not match the format provided/

  assert.throws(() => breakdownWithFormat('+1 AAA-LLL-NNNN', '+2 555-444-3333'), err, 'Literal country code must match')
  assert.throws(() => breakdownWithFormat('AAA-LLL-NNNN', '555.444.3333'), err, 'Separators must match')
})

test('breakdownWithFormat - every placeholder must be a digit', () => {
  const err = /does not match the format provided/

  assert.throws(() => breakdownWithFormat('AAA-LLL-NNNN', 'abc-444-3333'), err, 'Letters in A slots')
  assert.throws(() => breakdownWithFormat('AAA-LLL-NNNN', '555-4 4-3333'), err, 'Space in an L slot')
  assert.throws(() => breakdownWithFormat('+C AAA-LLL-NNNN xXXX', '+1 555-444-3333 x12a'), err, 'Letter in an X slot')
  assert.throws(() => breakdownWithFormat('+C AAA-LLL-NNNN', '+a 555-444-3333'), err, 'Letter in a C slot')
})

test('breakdownWithFormat - is curried', () => {
  const fn = breakdownWithFormat('+C (AAA) LLL-NNNN xXXX')

  assert.deepEqual(fn('+1 (555) 444-3333 x123'), {
    countryCode: '1',
    areaCode: '555',
    localCode: '444',
    lineNumber: '3333',
    extension: '123'
  })
})
