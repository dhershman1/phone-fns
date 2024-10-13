import isValid from '../src/isValid.js'
import test from 'tape'

test('Test simple type', t => {
  t.ok(isValid('555-444-3333'), 'Results returned back ok')
  t.ok(isValid('4445556666'))
  t.ok(isValid(4445556666))
  t.end()
})

test('Test complex type', t => {
  t.ok(isValid('(555) 444 3333'), 'Results returned back ok')
  t.end()
})

test('Test Country Code', t => {
  t.ok(isValid('1 (555) 444 3333'), 'Handles country code')
  t.ok(isValid('+1 (555) 444 3333'), 'Handles country code with extra symbols')
  t.end()
})

test('Test extension', t => {
  t.ok(isValid('555-444-3333 ext 123'), 'Handles extension')
  t.ok(isValid('555-444-3333 x 123'), 'Handles extension with x')
  t.end()
})

test('Test unordinary phone numbers', t => {
  t.ok(isValid('046 123 456 789'), 'Handles spaces')
  t.ok(isValid('046 123 45 67 89'), 'Handles spaces with less numbers')
  t.end()
})

test('Test invalid type', t => {
  t.notOk(isValid('555444666'), 'Handles invalid length')
  t.notOk(isValid('(555)-444-666'), 'Handles invalid length')
  t.notOk(isValid('89965'), 'Results returned back false')
  t.notOk(isValid(''), 'Handles empty string')
  t.end()
})
