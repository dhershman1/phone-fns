import test from 'tape'
import breakdownWithFormat from '../src/breakdownWithFormat.js'

test('breakdownWithFormat - valid input', (t) => {
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
  t.deepEqual(result, expected, 'Should correctly breakdown the phone number with the given format')
  t.end()
})

test('breakdownWithFormat - missing format', (t) => {
  const phone = '+1 (555) 444-3333 x123'

  t.throws(() => breakdownWithFormat(null, phone), /You must provide a format to breakdown/, 'Should throw an error if format is missing')
  t.end()
})

test('breakdownWithFormat - invalid phone number', (t) => {
  const format = '+C (AAA) LLL-NNNN xXXX'
  const phone = 'invalid phone number'

  t.throws(() => breakdownWithFormat(format, phone), /The phone number provided does not match the format provided or is an invalid phone number/, 'Should throw an error if phone number does not match the format')
  t.end()
})

test('breakdownWithFormat - different format', (t) => {
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
  t.deepEqual(result, expected, 'Should correctly breakdown the phone number with a different format')
  t.end()
})

test('breakdownWithFormat - no extension', (t) => {
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
  t.deepEqual(result, expected, 'Should correctly breakdown the phone number without an extension')
  t.end()
})
