import { test } from 'node:test'
import assert from 'node:assert/strict'
import validate from '../src/validate.js'

test('Test simple type', () => {
  assert.ok(validate('555-444-3333'), 'Results returned back ok')
  assert.ok(validate('4445556666'))
  assert.ok(validate(4445556666))
})

test('Test complex type', () => {
  assert.ok(validate('(555) 444 3333'), 'Results returned back ok')
})

test('Test handles wide range of phone numbers', () => {
  const validPhoneNumbers = [
    '010.1234.5678', // Number with dots
    '10 9876 5432', // South Korea number without country code
    '+82 2 3456 7890', // South Korea number with country code
    '+82 10 9876 5432', // South Korea mobile number with country code
    '+1 (555) 444-3333', // US number with country code
    '+44 20 7946 0958', // UK landline with country code
    '07911 123456', // UK mobile (domestic)
    '+49 30 12345678', // German number with country code
    '+1 800 123 4567 x123', // US toll-free number with extension
    '+61 2 1234 5678', // Australian number with country code,
    '+39 02 1234 5678', // Italian number with country code
    '+91 12345 67890' // Indian number with country code
  ]

  validPhoneNumbers.forEach(phone => {
    assert.ok(validate(phone), `Valid phone number: ${phone}`)
  })
})

test('Handles Invalid range of phone numbers', () => {
  const invalidPhoneNumbers = [
    '123', // Too short
    '010-1234', // Missing last part of mobile number
    '02-3456', // Incomplete landline number
    '02-3456-789', // Incomplete landline number (should be 7 digits)
    '+82 10', // Too short, incomplete mobile number
    '+82 02-1234', // Incomplete landline number
    '010-XYZ-1234', // Invalid characters (letters in the mobile number)
    '12345', // Too short
    'abcd-efgh-ijkl', // Completely invalid characters
    '+44 (0)20 7946', // Incomplete UK number
    '+1-555-abc-1234', // Invalid characters
    '+12345678901234567890' // Too long
  ]

  invalidPhoneNumbers.forEach(phone => {
    assert.equal(validate(phone), false, `Invalid phone number: ${phone}`)
  })
})

test('Accepts every extension marker breakdown supports', () => {
  for (const phone of ['555-444-3333 x 12', '555-444-3333x12', '555-444-3333 ext 12', '555-444-3333 ext. 12', '555-444-3333 extension 12', '555-444-3333 #12']) {
    assert.equal(validate(phone), true, `Valid extension: ${phone}`)
  }
})

test('Extensions do not count towards the digit total', () => {
  assert.equal(validate('+1 555 444 3333 x 123456'), true, '11 digits plus a 6 digit extension')
  assert.equal(validate('555 444 3333 x 12345678'), false, 'Extensions are at most 7 digits')
  assert.equal(validate('5554443333 x'), false, 'Marker with no extension')
  assert.equal(validate('x 5554443333'), false, 'Marker before the number')
})

test('Country codes must follow a single + and cannot start with 0', () => {
  assert.equal(validate('+0 555 444 3333'), false, '+0')
  assert.equal(validate('++1 555 444 3333'), false, 'Doubled +')
  assert.equal(validate('555+444-3333'), false, '+ in the middle')
})

test('Parentheses must be balanced and used once', () => {
  assert.equal(validate('(555)444-3333'), true, 'Digits directly against parentheses')
  assert.equal(validate('(555 444 3333'), false, 'Missing )')
  assert.equal(validate('555) 444-3333'), false, 'Missing (')
  assert.equal(validate('(1)(2)3456789012'), false, 'More than one set')
  assert.equal(validate('(55555) 444-3333'), false, 'More than 4 digits inside')
})

test('Groups are split by a single separator', () => {
  assert.equal(validate('555--444--3333'), false, 'Doubled dashes')
  assert.equal(validate('555. 444. 3333'), false, 'Mixed doubled separators')
  assert.equal(validate('-555-444-3333'), false, 'Leading separator')
  assert.equal(validate('555-444-3333-'), false, 'Trailing separator')
  assert.equal(validate('5 5 5 4 4 4 3 3 3 3'), false, 'More than 6 groups')
  assert.equal(validate('+33 1 23 45 67 89'), true, '6 groups')
})

test('Rejects placeholders and empty input', () => {
  assert.equal(validate('555-___-____'), false, 'Placeholders')
  assert.equal(validate(''), false, 'Empty string')
  assert.equal(validate(null), false, 'null')
  assert.equal(validate(undefined), false, 'undefined')
})
