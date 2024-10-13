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
