import format from '../src/format'
import test from 'ava'

test('Test custom format normal', t => {
  const result = format('', '(NNN) NNN.NNNN', '444-555-6666')

  t.truthy(result, 'Result returned okay')
  t.is(result, '(444) 555.6666', 'Result formatted correctly on return')
})

test('Test custom format longDistance', t => {
  const result = format('1', 'N + (NNN) NNN.NNNN', '444-555-6666')

  t.truthy(result, 'Result returned okay')
  t.is(result, '1 + (444) 555.6666', 'Result formatted correctly on return')
})

test('Test custom format extensions', t => {
  const result = format('', '(NNN) NNN.NNNN x NNNN', '444-555-66668989')

  t.truthy(result, 'Result returned okay')
  t.is(result, '(444) 555.6666 x 8989', 'Result formatted correctly on return')
})

test('Test custom format bad phone', t => {
  const result = format('', '(NNN).NNN.NNNN', '89965')

  t.truthy(result, 'Results returned okay')
  t.is(result, '89965', 'Returned back the bad number')
})

test('Test both longDistance and extensions', t => {
  const result = format('1', 'N + NNN.NNN.NNNN x NNNN', '55544433338989')

  t.truthy(result, 'Results returned okay')
  t.is(result, '1 + 555.444.3333 x 8989', 'Results are formatted as expected')
})

test('Is case insensitive', t => {
  const result = format('', '(nnn) nNn.NNnn', '4445556666')

  t.is(result, '(444) 555.6666')
})

test('Is Curried', t => {
  const f = format('')
  const result = f('NNN.NNN.NNNN', '4445556666')

  t.is(result, '444.555.6666')
})

test('Is able to double curry', t => {
  const f = format('')
  const d = f('NNN.NNN.NNNN')

  t.is(d('4445556666'), '444.555.6666')
})
