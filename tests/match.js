import match from '../src/match'
import test from 'tape'

test('Test simple type', t => {
  const results = match('5554443333', '5554443333')

  t.true(results, 'Results returned back ok')
  t.end()
})

test('Test medium complex type', t => {
  const results = match('555-444-3333', '555-444-3333')

  t.true(results, 'Results returned back ok')
  t.end()
})

test('Test complex type', t => {
  const results = match('(555) 444-3333', '(555) 444-3333')

  t.true(results, 'Results returned back ok')
  t.end()
})

test('Handles when one is formatted and the other is not', t => {
  t.true(match('555-444-3333', '5554443333'))
  t.end()
})

test('Is curried', t => {
  const matcher = match('5554443333')

  t.true(matcher('555-444-3333'))
  t.end()
})

test('Catches invalid numbers', t => {
  t.false(match('555444', '5554443333'))
  t.end()
})
