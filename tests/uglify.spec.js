import test from 'tape'
import uglify from '../src/uglify.js'

test('Test simple type', t => {
  const results = uglify('555-444-3333')

  t.ok(results, 'Results returned back ok')
  t.is(results, '5554443333', 'results came back valid')
  t.end()
})

test('Handles when numbers are thrown at it', t => {
  t.same(uglify(5556667777), '5556667777')
  t.end()
})

test('Handles when out of ordinary phone numbers are thrown at it', t => {
  t.same(uglify('046 123 456 789'), '046123456789')
  t.same(uglify('046 123 45 67 89'), '046123456789')
  t.end()
})

test('Does not drop digits that follow letters', t => {
  t.same(uglify('5554443333x123'), '5554443333123')
  t.same(uglify('555-444-3333 ext 89'), '555444333389')
  t.same(uglify('555-444-3333 ext. 123'), '5554443333123')
  t.same(uglify('abc1234'), '1234')
  t.end()
})

test('Keeps placeholder characters', t => {
  t.same(uglify('555-___-____'), '555_______')
  t.end()
})

test('Handles null and undefined', t => {
  t.same(uglify(null), '')
  t.same(uglify(undefined), '')
  t.end()
})
