import match from '../src/match'
import test from 'ava'

test('Test simple type', t => {
  const results = match('5554443333', '5554443333')

  t.true(results, 'Results returned back ok')
})

test('Test medium complex type', t => {
  const results = match('555-444-3333', '555-444-3333')

  t.true(results, 'Results returned back ok')
})

test('Test complex type', t => {
  const results = match('(555) 444-3333', '(555) 444-3333')

  t.true(results, 'Results returned back ok')
})

test('Handles when one is formatted and the other is not', t => {
  t.true(match('555-444-3333', '5554443333'))
})

test('Is curried', t => {
  const matcher = match('5554443333')

  t.true(matcher('555-444-3333'))
})

test('Catches invalid numbers', t => {
  t.false(match('555444', '5554443333'))
})
