import format from '../src/format'
import test from 'tape'

test('Test custom format normal', t => {
  const result = format('(NNN) NNN.NNNN', '444-555-6666')

  t.ok(result, 'Result returned okay')
  t.is(result, '(444) 555.6666', 'Result formatted correctly on return')
  t.end()
})

test('Test an already formatted number to a new number', t => {
  t.same(format('NNN.NNN.NNNN', '(444) 555-6666'), '444.555.6666')
  t.end()
})

test('Test custom format longDistance', t => {
  const result = format('C + (NNN) NNN.NNNN', '1444-555-6666')

  t.ok(result, 'Result returned okay')
  t.is(result, '1 + (444) 555.6666', 'Result formatted correctly on return')
  t.end()
})

test('Test randomly placed Country Code', t => {
  t.same(format('(NNN) NNN-NNNN + C', '14445556666'), '(444) 555-6666 + 1')
  t.end()
})

test('Test custom format extensions', t => {
  const result = format('(NNN) NNN.NNNN x NNNN', '444-555-66668989')

  t.ok(result, 'Result returned okay')
  t.is(result, '(444) 555.6666 x 8989', 'Result formatted correctly on return')
  t.end()
})

test('Test custom format bad phone', t => {
  const result = format('(NNN).NNN.NNNN', '89965')

  t.ok(result, 'Results returned okay')
  t.is(result, '89965', 'Returned back the bad number')
  t.end()
})

test('Test both longDistance and extensions', t => {
  const result = format('C + NNN.NNN.NNNN x NNNN', '155544433338989')

  t.ok(result, 'Results returned okay')
  t.is(result, '1 + 555.444.3333 x 8989', 'Results are formatted as expected')
  t.end()
})

test('Is case insensitive', t => {
  const result = format('(nnn) nNn.NNnn', '4445556666')

  t.is(result, '(444) 555.6666')
  t.end()
})

test('Is Curried', t => {
  const fn = format('NNN.NNN.NNNN')

  t.is(fn('4445556666'), '444.555.6666')
  t.end()
})

test('Handles numbers without area code', t => {
  const results = format('NNN.NNNN', '555-6666')

  t.same(results, '555.6666')
  t.end()
})

test('Catches letters when passed in', t => {
  t.same(format('NNN.NNNN', 'abc1234'), 'abc1234')
  t.same(format('NNN.NNNN', '1234abc'), '1234abc')
  t.end()
})
