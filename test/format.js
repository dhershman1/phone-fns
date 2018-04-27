import format from '../src/format'
import test from 'ava'

test('Test custom format normal', t => {
  const result = format('', '(AAA) LLL.NNNN', '444-555-6666')

  t.truthy(result, 'Result returned okay')
  t.is(result, '(444) 555.6666', 'Result formatted correctly on return')
})

test('Test custom format longDistance', t => {
  const result = format('1', 'C + (AAA) LLL.NNNN', '444-555-6666')

  t.truthy(result, 'Result returned okay')
  t.is(result, '1 + (444) 555.6666', 'Result formatted correctly on return')
})

test('Test custom format extensions', t => {
  const result = format('', '(AAA) LLL.NNNN x EEEE', '444-555-66668989')

  t.truthy(result, 'Result returned okay')
  t.is(result, '(444) 555.6666 x 8989', 'Result formatted correctly on return')
})

test('Test custom format bad phone', t => {
  const result = format('', '(AAA).LLL.NNNN', '89965')

  t.truthy(result, 'Results returned okay')
  t.is(result, '89965', 'Returned back the bad number')
})

test('Test both longDistance and extensions', t => {
  const result = format('1', 'C + AAA.LLL.NNNN x EEEE', '55544433338989')

  t.truthy(result, 'Results returned okay')
  t.is(result, '1 + 555.444.3333 x 8989', 'Results are formatted as expected')
})
