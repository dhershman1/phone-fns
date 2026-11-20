import { test } from 'node:test'
import assert from 'node:assert/strict'
import uglify from '../src/uglify.js'

test('Test simple type', () => {
  const results = uglify('555-444-3333')

  assert.ok(results, 'Results returned back ok')
  assert.equal(results, '5554443333', 'results came back valid')
})

test('Handles when numbers are thrown at it', () => {
  assert.deepEqual(uglify(5556667777), '5556667777')
})

test('Handles when out of ordinary phone numbers are thrown at it', () => {
  assert.deepEqual(uglify('046 123 456 789'), '046123456789')
  assert.deepEqual(uglify('046 123 45 67 89'), '046123456789')
})

test('Does not drop digits that follow letters', () => {
  assert.deepEqual(uglify('5554443333x123'), '5554443333123')
  assert.deepEqual(uglify('555-444-3333 ext 89'), '555444333389')
  assert.deepEqual(uglify('555-444-3333 ext. 123'), '5554443333123')
  assert.deepEqual(uglify('abc1234'), '1234')
})

test('Keeps placeholder characters', () => {
  assert.deepEqual(uglify('555-___-____'), '555_______')
})

test('Handles null and undefined', () => {
  assert.deepEqual(uglify(null), '')
  assert.deepEqual(uglify(undefined), '')
})
