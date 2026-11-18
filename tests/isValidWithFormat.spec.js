import { test } from 'node:test'
import assert from 'node:assert/strict'
import isValidWithFormat from '../src/isValidWithFormat.js'

test('isValidWithFormat', () => {
  assert.deepEqual(isValidWithFormat('NNNNNNNNNN', '1234567890'), true, 'Valid phone number with correct format')
  assert.deepEqual(isValidWithFormat('NNN-NNN-NNNN', '123-456-7890'), true, 'Valid phone number with dashes in correct format')
  assert.deepEqual(isValidWithFormat('NNN-NNN-NNNN', '1234567890'), false, 'Invalid phone number without dashes for dashed format')
  assert.deepEqual(isValidWithFormat('NNNNNNNNNN', '123-456-7890'), false, 'Invalid phone number with dashes for non-dashed format')
  assert.deepEqual(isValidWithFormat('NNNNNNNNNN', '123456789'), false, 'Invalid phone number with incorrect length')
  assert.deepEqual(isValidWithFormat('NNN-NNNN-NNNN', '010-1234--5678'), false, 'Invalid phone number with extra dashes')
  assert.deepEqual(isValidWithFormat('NNNNNNNNNN', 'abcdefghij'), false, 'Invalid phone number with letters')
  assert.deepEqual(isValidWithFormat('NNN-NNN-NNNN', '010-XYZ-1234'), false, 'Invalid phone number with letters')
})

test('isValidWithFormat with country code and extension', () => {
  assert.deepEqual(isValidWithFormat('+1 NNN-NNN-NNNN', '+1 234-567-1890'), true, 'Valid phone number with country code')
  assert.deepEqual(isValidWithFormat('+1 NNN-NNN-NNNN x NNN', '+1 234-567-1890 x 123'), true, 'Valid phone number with country code and extension')
})

test('isValidWithFormat curried', () => {
  const fn = isValidWithFormat('NNN-NNN-NNNN')
  assert.deepEqual(fn('123-456-7890'), true, 'Valid phone number with curried function')
  assert.deepEqual(fn('1234567890'), false, 'Invalid phone number with curried function')
})

test('isValidWithFormat - missing format', () => {
  assert.throws(() => isValidWithFormat(null, '123-456-7890'), /You must provide a format to validate/, 'Should throw an error if format is missing')
})

test('isValidWithFormat - literal characters must match exactly', () => {
  assert.deepEqual(isValidWithFormat('NNN-NNN-NNNN', '123.456.7890'), false, 'Dots do not match dashes')
  assert.deepEqual(isValidWithFormat('(NNN) NNN-NNNN', '(123)-456-7890'), false, 'Separators in the wrong place')
  assert.deepEqual(isValidWithFormat('+1 NNN-NNN-NNNN', '+2 234-567-1890'), false, 'Literal country code does not match')
})

test('isValidWithFormat - every placeholder must be a digit', () => {
  assert.deepEqual(isValidWithFormat('NNN-NNN-NNNN', '555-444-333 '), false, 'Space in an N slot')
  assert.deepEqual(isValidWithFormat('+C NNN-NNN-NNNN', '+a 555-444-3333'), false, 'Letter in a C slot')
  assert.deepEqual(isValidWithFormat('+C NNN-NNN-NNNN x NNN', '+1 555-444-3333 x 123'), true, 'C and N slots filled with digits')
})

test('isValidWithFormat - only N and C are placeholders', () => {
  assert.deepEqual(isValidWithFormat('AAA-NNN-NNNN', '555-444-3333'), false, 'A is a literal, not a placeholder')
  assert.deepEqual(isValidWithFormat('NNN-NNN-NNNN xXXX', '555-444-3333 x123'), false, 'X is a literal, not a placeholder')
  assert.deepEqual(isValidWithFormat('nnn-NNN-NNNN', '555-444-3333'), false, 'Lowercase n is a literal')
})

test('isValidWithFormat - handles non string phones', () => {
  assert.deepEqual(isValidWithFormat('NNNNNNNNNN', 5554443333), true, 'Numbers are coerced')
  assert.deepEqual(isValidWithFormat('NNNNNNNNNN', null), false, 'null is invalid')
  assert.deepEqual(isValidWithFormat('NNNNNNNNNN', undefined), false, 'undefined is invalid')
})
