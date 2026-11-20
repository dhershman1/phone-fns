import { breakdown, format, uglify, validate } from '../src/index.js'
import { test } from 'node:test'
import assert from 'node:assert/strict'

test('Able to run breakdown without providing country code to instance', () => {
  const { areaCode, localCode, lineNumber } = breakdown('4445556666')

  assert.equal(areaCode, '444')
  assert.equal(localCode, '555')
  assert.equal(lineNumber, '6666')
})

test('Able to run format without providing country code to instance', () => {
  assert.equal(format('NNN-NNN-NNNN', '4445556666'), '444-555-6666')
})

test('Able to run validate from instance', () => {
  assert.equal(validate('4445556666'), true)
  assert.equal(validate('334445555'), false)
})

test('Able to run uglify from instance', () => {
  const results = uglify('(555) 444-3333')

  assert.equal(results, '5554443333')
})
