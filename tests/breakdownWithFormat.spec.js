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
  t.same(result, expected, 'Should correctly breakdown the phone number with the given format')
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
  t.same(result, expected, 'Should correctly breakdown the phone number with a different format')
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
  t.same(result, expected, 'Should correctly breakdown the phone number without an extension')
  t.end()
})

test('breakdownWithFormat - rejects mismatched literals', (t) => {
  const err = /does not match the format provided/

  t.throws(() => breakdownWithFormat('+1 AAA-LLL-NNNN', '+2 555-444-3333'), err, 'Literal country code must match')
  t.throws(() => breakdownWithFormat('AAA-LLL-NNNN', '555.444.3333'), err, 'Separators must match')
  t.end()
})

test('breakdownWithFormat - every placeholder must be a digit', (t) => {
  const err = /does not match the format provided/

  t.throws(() => breakdownWithFormat('AAA-LLL-NNNN', 'abc-444-3333'), err, 'Letters in A slots')
  t.throws(() => breakdownWithFormat('AAA-LLL-NNNN', '555-4 4-3333'), err, 'Space in an L slot')
  t.throws(() => breakdownWithFormat('+C AAA-LLL-NNNN xXXX', '+1 555-444-3333 x12a'), err, 'Letter in an X slot')
  t.throws(() => breakdownWithFormat('+C AAA-LLL-NNNN', '+a 555-444-3333'), err, 'Letter in a C slot')
  t.end()
})

test('breakdownWithFormat - is curried', (t) => {
  const fn = breakdownWithFormat('+C (AAA) LLL-NNNN xXXX')

  t.same(fn('+1 (555) 444-3333 x123'), {
    countryCode: '1',
    areaCode: '555',
    localCode: '444',
    lineNumber: '3333',
    extension: '123'
  })
  t.end()
})
