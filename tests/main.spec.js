import { breakdown, format, uglify, validate } from '../src/index.js'
import test from 'tape'

test('Able to run breakdown without providing country code to instance', t => {
  const { areaCode, localCode, lineNumber } = breakdown('4445556666')

  t.is(areaCode, '444')
  t.is(localCode, '555')
  t.is(lineNumber, '6666')
  t.end()
})

test('Able to run format without providing country code to instance', t => {
  t.is(format('NNN-NNN-NNNN', '4445556666'), '444-555-6666')
  t.end()
})

test('Able to run validate from instance', t => {
  t.true(validate('4445556666'))
  t.false(validate('334445555'))
  t.end()
})

test('Able to run uglify from instance', t => {
  const results = uglify('(555) 444-3333')

  t.is(results, '5554443333')
  t.end()
})
