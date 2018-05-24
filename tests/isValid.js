import isValid from '../src/isValid'
import test from 'tape'

test('Test simple type', t => {
  const results = isValid('555-444-3333')

  t.ok(results, 'Results returned back ok')
  t.end()
})

test('Test complex type', t => {
  const results = isValid('(555) 444 3333')

  t.ok(results, 'Results returned back ok')
  t.end()
})

test('Test invalid type', t => {
  const results = isValid('89965')

  t.notOk(results, 'Results returned back false')
  t.end()
})
