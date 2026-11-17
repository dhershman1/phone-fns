import test from 'tape'
import isValidWithFormat from '../src/isValidWithFormat.js'

test('isValidWithFormat', (t) => {
  t.same(isValidWithFormat('NNNNNNNNNN', '1234567890'), true, 'Valid phone number with correct format')
  t.same(isValidWithFormat('NNN-NNN-NNNN', '123-456-7890'), true, 'Valid phone number with dashes in correct format')
  t.same(isValidWithFormat('NNN-NNN-NNNN', '1234567890'), false, 'Invalid phone number without dashes for dashed format')
  t.same(isValidWithFormat('NNNNNNNNNN', '123-456-7890'), false, 'Invalid phone number with dashes for non-dashed format')
  t.same(isValidWithFormat('NNNNNNNNNN', '123456789'), false, 'Invalid phone number with incorrect length')
  t.same(isValidWithFormat('NNN-NNNN-NNNN', '010-1234--5678'), false, 'Invalid phone number with extra dashes')
  t.same(isValidWithFormat('NNNNNNNNNN', 'abcdefghij'), false, 'Invalid phone number with letters')
  t.same(isValidWithFormat('NNN-NNN-NNNN', '010-XYZ-1234'), false, 'Invalid phone number with letters')
  t.end()
})

test('isValidWithFormat with country code and extension', (t) => {
  t.same(isValidWithFormat('+1 NNN-NNN-NNNN', '+1 234-567-1890'), true, 'Valid phone number with country code')
  t.same(isValidWithFormat('+1 NNN-NNN-NNNN x NNN', '+1 234-567-1890 x 123'), true, 'Valid phone number with country code and extension')
  t.end()
})

test('isValidWithFormat curried', (t) => {
  const fn = isValidWithFormat('NNN-NNN-NNNN')
  t.same(fn('123-456-7890'), true, 'Valid phone number with curried function')
  t.same(fn('1234567890'), false, 'Invalid phone number with curried function')
  t.end()
})

test('isValidWithFormat - missing format', (t) => {
  t.throws(() => isValidWithFormat(null, '123-456-7890'), /You must provide a format to validate/, 'Should throw an error if format is missing')
  t.end()
})

test('isValidWithFormat - literal characters must match exactly', (t) => {
  t.same(isValidWithFormat('NNN-NNN-NNNN', '123.456.7890'), false, 'Dots do not match dashes')
  t.same(isValidWithFormat('(NNN) NNN-NNNN', '(123)-456-7890'), false, 'Separators in the wrong place')
  t.same(isValidWithFormat('+1 NNN-NNN-NNNN', '+2 234-567-1890'), false, 'Literal country code does not match')
  t.end()
})

test('isValidWithFormat - every placeholder must be a digit', (t) => {
  t.same(isValidWithFormat('NNN-NNN-NNNN', '555-444-333 '), false, 'Space in an N slot')
  t.same(isValidWithFormat('+C NNN-NNN-NNNN', '+a 555-444-3333'), false, 'Letter in a C slot')
  t.same(isValidWithFormat('+C NNN-NNN-NNNN x NNN', '+1 555-444-3333 x 123'), true, 'C and N slots filled with digits')
  t.end()
})

test('isValidWithFormat - only N and C are placeholders', (t) => {
  t.same(isValidWithFormat('AAA-NNN-NNNN', '555-444-3333'), false, 'A is a literal, not a placeholder')
  t.same(isValidWithFormat('NNN-NNN-NNNN xXXX', '555-444-3333 x123'), false, 'X is a literal, not a placeholder')
  t.same(isValidWithFormat('nnn-NNN-NNNN', '555-444-3333'), false, 'Lowercase n is a literal')
  t.end()
})

test('isValidWithFormat - handles non string phones', (t) => {
  t.same(isValidWithFormat('NNNNNNNNNN', 5554443333), true, 'Numbers are coerced')
  t.same(isValidWithFormat('NNNNNNNNNN', null), false, 'null is invalid')
  t.same(isValidWithFormat('NNNNNNNNNN', undefined), false, 'undefined is invalid')
  t.end()
})
