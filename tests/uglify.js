import test from 'tape'
import uglify from '../src/uglify'

test('Test simple type', t => {
  const results = uglify('555-444-3333')

  t.ok(results, 'Results returned back ok')
  t.is(results, '5554443333', 'results came back valid')
  t.end()
})