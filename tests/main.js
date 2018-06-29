import phoneFns from '../src/index'
import test from 'tape'

test('Returns an object when no country code is defined', t => {
  const results = phoneFns()

  t.ok(results)
  t.is(typeof results, 'object')
  t.end()
})

test('Able to run breakdown without providing country code to instance', t => {
  const { breakdown } = phoneFns()
  const { areaCode, localCode, lineNumber } = breakdown('4445556666')

  t.is(areaCode, '444')
  t.is(localCode, '555')
  t.is(lineNumber, '6666')
  t.end()
})

test('Able to run format without providing country code to instance', t => {
  const { format } = phoneFns()

  t.is(format('NNN-NNN-NNNN', '4445556666'), '444-555-6666')
  t.end()
})

test('Able to run isValid from instance', t => {
  const { isValid } = phoneFns()

  t.true(isValid('4445556666'))
  t.false(isValid('334445555'))
  t.end()
})

test('Able to run match from instance', t => {
  const { match } = phoneFns()
  const results = match('(555) 444-3333', '(555) 444-3333')

  t.true(results, 'Results returned back ok')
  t.end()
})

test('Able to run uglify from instance', t => {
  const { uglify } = phoneFns()
  const results = uglify('(555) 444-3333')

  t.is(results, '5554443333')
  t.end()
})

test('It throws an error if a country code is incorrect', t => {
  try {
    phoneFns(null)
  } catch (err) {
    t.is(err.message, 'Country Code needs to be a string or number')
    t.end()
  }
})
