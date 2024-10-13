import test from 'tape'
import findSeparators from '../src/findSeparators.js' // Adjust the path as necessary

test('findSeparators - single separator', t => {
  t.same(findSeparators('123-456-7890'), ['-'], 'Should return ["-"] for "123-456-7890"')
  t.same(findSeparators('123.456.7890'), ['.'], 'Should return ["."] for "123.456.7890"')
  t.same(findSeparators('123 456 7890'), [' '], 'Should return [" "] for "123 456 7890"')
  t.end()
})

test('findSeparators - multiple separators', t => {
  t.same(findSeparators('123-456 7890'), ['-', ' '], 'Should return ["-", " "] for "123-456 7890"')
  t.same(findSeparators('123.456 7890'), ['.', ' '], 'Should return [".", " "] for "123.456 7890"')
  t.same(findSeparators('123-456.7890'), ['-', '.'], 'Should return ["-", "."] for "123-456.7890"')
  t.end()
})

test('findSeparators - no separators', t => {
  t.same(findSeparators('1234567890'), [], 'Should return [] for "1234567890"')
  t.end()
})

test('findSeparators - all separators', t => {
  t.same(findSeparators('123-456.789 0'), ['-', '.', ' '], 'Should return ["-", ".", " "] for "123-456.789 0"')
  t.end()
})

test('findSeparators - empty string', t => {
  t.same(findSeparators(''), [], 'Should return [] for an empty string')
  t.end()
})
