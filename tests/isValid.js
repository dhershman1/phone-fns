import isValid from '../src/isValid'
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

test('Test invalid type', t => {
  t.notOk(isValid('555444666'), 'Handles invalid length')
  t.notOk(isValid('89965'), 'Results returned back false')
  t.notOk(isValid(''), 'Handles empty string')
  t.end()
})
