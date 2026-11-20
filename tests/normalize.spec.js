import { test } from 'node:test'
import assert from 'node:assert/strict'
import normalize from '../src/normalize.js'

test('normalize removes spaces, dots, dashes, and parentheses', () => {
  assert.deepEqual(normalize('123 456 7890'), '1234567890', 'should remove spaces')
  assert.deepEqual(normalize('123.456.7890'), '1234567890', 'should remove dots')
  assert.deepEqual(normalize('123-456-7890'), '1234567890', 'should remove dashes')
  assert.deepEqual(normalize('(123) 456-7890'), '1234567890', 'should remove parentheses')
  assert.deepEqual(normalize('(123) 456-7890 x123'), '1234567890x123', 'should handle extension')
  assert.deepEqual(normalize('(123) 456-7890 x 123'), '1234567890x123', 'should handle extension')
})

test('normalize trims the input', () => {
  assert.deepEqual(normalize(' 1234567890 '), '1234567890', 'should trim leading and trailing spaces')
  assert.deepEqual(normalize('\t1234567890\t'), '1234567890', 'should trim leading and trailing tabs')
})

test('normalize handles mixed characters', () => {
  assert.deepEqual(normalize(' (123) 456-7890. '), '1234567890', 'should remove mixed characters and trim')
})

test('normalize handles empty and null input', () => {
  assert.deepEqual(normalize(''), '', 'should handle empty string')
  assert.deepEqual(normalize(null), '', 'should handle null input')
})

test('normalize handles non string input', () => {
  assert.deepEqual(normalize(5554443333), '5554443333', 'should coerce numbers')
  assert.deepEqual(normalize(undefined), '', 'should handle undefined input')
})
