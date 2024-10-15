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

test('Handles phone numbers from around the world', t => {
  const phoneNumbers = [
    // USA
    '+1-202-555-0173',
    '+1 800 123 4567 x123', // US toll-free number with extension
    '555-444-3333',
    '4445556666',
    '444-555-6666',
    // UK
    '+44 20 7946 0958',
    '020 7946 0958',
    '07911 123456', // UK mobile
    // India
    '+91-9876543210',
    '+91 12345 67890',
    '09876543210',
    // Australia
    '+61 2 1234 5678',
    '02 1234 5678',
    '0412 345 678', // Australian mobile
    // Japan
    '+81-3-1234-5678',
    '03-1234-5678',
    '090-1234-5678', // Japanese mobile
    // Germany
    '+49 30 12345678',
    '+49 40 98765432',
    '+49 89 1234567',
    '+49 69 87654321',
    '+49 171 1234567', // German mobile
    '030 12345678',
    '040 98765432',
    '089 1234567',
    '069 87654321',
    '0171 1234567', // German mobile
    // France
    '+33 1 23 45 67 89',
    '01 23 45 67 89',
    '06 12 34 56 78', // French mobile
    // Brazil
    '+55 11 91234-5678',
    '011 91234-5678',
    '021 91234-5678', // Rio de Janeiro
    // South Africa
    '+27 21 123 4567',
    '021 123 4567',
    '082 123 4567', // South African mobile
    // China
    '+86 10 1234 5678',
    '010 1234 5678',
    '138 0013 8000', // Chinese mobile
    // Italy
    '+39 02 1234 5678',
    '02 1234 5678',
    '333 123 4567', // Italian mobile
    // Canada
    '+1 416 123 4567',
    '416 123 4567',
    '604 123 4567', // Vancouver
    // Mexico
    '+52 55 1234 5678',
    '55 1234 5678',
    '044 55 1234 5678', // Mexican mobile
    // Russia
    '+7 495 123 4567',
    '495 123 4567',
    '8 912 345 67 89', // Russian mobile
    // South Korea
    '+82 2 3456 7890',
    '02 3456 7890',
    '010 1234 5678', // South Korean mobile
    // Spain
    '+34 91 123 4567',
    '91 123 4567',
    '612 345 678', // Spanish mobile
    // Netherlands
    '+31 20 123 4567',
    '020 123 4567',
    '06 12345678', // Dutch mobile
    // Sweden
    '+46 8 123 4567',
    '08 123 4567',
    '070 123 4567', // Swedish mobile
    // Switzerland
    '+41 44 123 4567',
    '044 123 4567',
    '079 123 4567', // Swiss mobile
    // New Zealand
    '+64 9 123 4567',
    '09 123 4567',
    '021 123 4567', // New Zealand mobile
    // Singapore
    '+65 6123 4567',
    '6123 4567',
    '8123 4567', // Singapore mobile
    // Malaysia
    '+60 3 1234 5678',
    '03 1234 5678',
    '012 345 6789', // Malaysian mobile
    // Indonesia
    '+62 21 123 4567',
    '021 123 4567',
    '0812 345 6789', // Indonesian mobile
    // Thailand
    '+66 2 123 4567',
    '02 123 4567',
    '081 234 5678', // Thai mobile
    // Philippines
    '+63 2 123 4567',
    '02 123 4567',
    '0917 123 4567', // Philippine mobile
    // Vietnam
    '+84 24 123 4567',
    '024 123 4567',
    '091 234 5678', // Vietnamese mobile
    // Saudi Arabia
    '+966 11 123 4567',
    '011 123 4567',
    '050 123 4567', // Saudi mobile
    // UAE
    '+971 4 123 4567',
    '04 123 4567',
    '050 123 4567', // UAE mobile
    // Egypt
    '+20 2 123 4567',
    '02 123 4567',
    '0100 123 4567', // Egyptian mobile
    // Nigeria
    '+234 1 123 4567',
    '01 123 4567',
    '0803 123 4567', // Nigerian mobile
    // Kenya
    '+254 20 123 4567',
    '020 123 4567',
    '0722 123 456', // Kenyan mobile
    // Ghana
    '+233 30 123 4567',
    '030 123 4567',
    '024 123 4567', // Ghanaian mobile
    // Argentina
    '+54 11 1234 5678',
    '011 1234 5678',
    '15 1234 5678', // Argentine mobile
    // Chile
    '+56 2 123 4567',
    '02 123 4567',
    '09 1234 5678', // Chilean mobile
    // Colombia
    '+57 1 123 4567',
    '01 123 4567',
    '300 123 4567', // Colombian mobile
    // Peru
    '+51 1 123 4567',
    '01 123 4567',
    '999 123 456', // Peruvian mobile
    // Venezuela
    '+58 212 123 4567',
    '0212 123 4567',
    '0412 123 4567' // Venezuelan mobile
  ]

  phoneNumbers.forEach(phone => {
    t.ok(validate(phone), `Valid phone number: ${phone}`)
  })
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
    '+91 12345 67890', // Indian number with country code
    '+1-202-555-0173', // USA
    '+44 20 7946 0958', // UK
    '+91-9876543210', // India
    '+61 2 1234 5678', // Australia
    '+81-3-1234-5678', // Japan
    '+49 30 123456', // Germany
    '+33 1 23 45 67 89', // France
    '+55 11 91234-5678', // Brazil
    '+27 21 123 4567', // South Africa
    '+86 10 1234 5678', // China
    '+1 234-567-1890 x 123' // US toll-free number with extension
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
    '+82 10', // Too short, incomplete mobile number
    '010-XYZ-1234', // Invalid characters (letters in the mobile number)
    '12345', // Too short
    'abcd-efgh-ijkl', // Completely invalid characters
    '+1-555-abc-1234', // Invalid characters
    '+12345678901234567890', // Too long
    '12345', // Too short
    '+61 2 1234', // Too short for Australia
    '+81-3-1234', // Too short for Japan
    '+49 30 123', // Too short for Germany
    '+33 1 23 45', // Too short for France
    '+27 21 123', // Too short for South Africa
    'abcdefghijk', // Non-numeric characters
    '555-555-5555 ext', // Missing extension number
    '+1-202-555-0173x', // Invalid extension format
    '+44 20 7946 0958 x', // Invalid extension format
    '555-555-5555 x', // Invalid extension format
    '+1-202-555-0173 ext.', // Invalid extension format
    '+44 20 7946 0958 ext.', // Invalid extension format
    '555-555-5555 ext.', // Invalid extension format
    '555-555-5555 x.', // Invalid extension format
    '+1-202-555-0173 x12345', // Too long extension
    '+44 20 7946 0958 x12345', // Too long extension
    '555-555-5555 x123456', // Too long extension
    '+1-202-555-0173 x123456', // Too long extension
    '+44 20 7946 0958 x123456', // Too long extension
    '555-555-5555 x123456', // Too long extension
    '+82 02-1234', // Incomplete landline number
    '02-3456-789' // Incomplete landline number (should be 7 digits)
  ]

  invalidPhoneNumbers.forEach(phone => {
    t.notOk(validate(phone), `Invalid phone number: ${phone}`)
  })
  t.end()
})
