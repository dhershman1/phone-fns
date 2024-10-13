import test from 'tape'
import validate from '../src/validate.js'

test('Test simple type', t => {
  t.ok(validate('555-444-3333'), 'Results returned back ok')
  t.ok(validate('4445556666'))
  t.ok(validate(4445556666))
  t.end()
})

test('Test complex type', t => {
  t.ok(validate('(555) 444 3333'), 'Results returned back ok')
  t.end()
})

test('Test handles wide range of phone numbers', t => {
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
    t.ok(validate(phone), `Valid phone number: ${phone}`)
  })
  t.end()
})

test('Handles Invalid range of phone numbers', t => {
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
    t.notOk(validate(phone), `Invalid phone number: ${phone}`)
  })
  t.end()
})
