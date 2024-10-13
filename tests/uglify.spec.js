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
