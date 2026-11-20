import { test } from 'node:test'
import assert from 'node:assert/strict'
import findSeparators from '../src/findSeparators.js'

test('findSeparators - single separator', () => {
  assert.deepEqual(findSeparators('123-456-7890'), ['-'], 'Should return ["-"] for "123-456-7890"')
  assert.deepEqual(findSeparators('123.456.7890'), ['.'], 'Should return ["."] for "123.456.7890"')
  assert.deepEqual(findSeparators('123 456 7890'), [' '], 'Should return [" "] for "123 456 7890"')
})

test('findSeparators - multiple separators', () => {
  assert.deepEqual(findSeparators('123-456 7890'), ['-', ' '], 'Should return ["-", " "] for "123-456 7890"')
  assert.deepEqual(findSeparators('123.456 7890'), ['.', ' '], 'Should return [".", " "] for "123.456 7890"')
  assert.deepEqual(findSeparators('123-456.7890'), ['-', '.'], 'Should return ["-", "."] for "123-456.7890"')
})

test('findSeparators - no separators', () => {
  assert.deepEqual(findSeparators('1234567890'), [], 'Should return [] for "1234567890"')
})

test('findSeparators - all separators', () => {
  assert.deepEqual(findSeparators('123-456.789 0'), ['-', '.', ' '], 'Should return ["-", ".", " "] for "123-456.789 0"')
})

test('findSeparators - empty string', () => {
  assert.deepEqual(findSeparators(''), [], 'Should return [] for an empty string')
})
