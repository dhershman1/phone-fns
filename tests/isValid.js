import isValid from '../src/isValid'
import test from 'tape'

test('Test simple type', t => {
  const results = isValid('555-444-3333')

  t.ok(results, 'Results returned back ok')
  t.ok(isValid('4445556666'))
  t.ok(isValid(4445556666))
  t.end()
})

test('Test complex type', t => {
  const results = isValid('(555) 444 3333')

  t.ok(results, 'Results returned back ok')
  t.end()
})

test('Test invalid type', t => {
  const results = isValid('89965')

  t.notOk(isValid('555444666'))
  t.notOk(results, 'Results returned back false')
  t.end()
})
