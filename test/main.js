import phoneFns from '../src/index'
import test from 'ava'

test('Returns an object when no country code is defined', t => {
  const results = phoneFns()

  t.truthy(results)
  t.is(typeof results, 'object')
})

test('Able to run breakdown without providing country code to instance', t => {
  const { breakdown } = phoneFns()
  const { areaCode, localCode, lineNumber } = breakdown('4445556666')

  t.is(areaCode, '444')
  t.is(localCode, '555')
  t.is(lineNumber, '6666')
})

test('Able to run format without providing country code to instance', t => {
  const { format } = phoneFns()

  t.is(format('AAA-LLL-NNNN', '4445556666'), '444-555-6666')
})

test('Able to run isValid from instance', t => {
  const { isValid } = phoneFns()

  t.true(isValid('4445556666'))
  t.false(isValid('334445555'))
})

test('Able to run match from instance', t => {
  const { match } = phoneFns()
  const results = match('(555) 444-3333', '(555) 444-3333')

  t.true(results, 'Results returned back ok')
})

test('Able to run uglify from instance', t => {
  const { uglify } = phoneFns()
  const results = uglify('(555) 444-3333')

  t.is(results, '5554443333')
})
