import format from '../src/format.js'
import { test } from 'node:test'
import assert from 'node:assert/strict'

test('Test custom format normal', () => {
  const result = format('(NNN) NNN.NNNN', '444-555-6666')

  assert.ok(result, 'Result returned okay')
  assert.equal(result, '(444) 555.6666', 'Result formatted correctly on return')
})

test('Test custom format with a number type provided', () => {
  const result = format('(NNN) NNN.NNNN', 4445556666)

  assert.ok(result, 'Result returned okay')
  assert.equal(result, '(444) 555.6666', 'Result formatted correctly on return')
})

test('Test an already formatted number to a new number', () => {
  assert.deepEqual(format('NNN.NNN.NNNN', '(444) 555-6666'), '444.555.6666')
})

test('Test custom format longDistance', () => {
  const result = format('C + (NNN) NNN.NNNN', '1444-555-6666')

  assert.ok(result, 'Result returned okay')
  assert.equal(result, '1 + (444) 555.6666', 'Result formatted correctly on return')
})

test('Test randomly placed Country Code', () => {
  assert.deepEqual(format('(NNN) NNN-NNNN + C', '14445556666'), '(444) 555-6666 + 1')
})

test('Test custom format extensions', () => {
  const result = format('(NNN) NNN.NNNN x NNNN', '444-555-66668989')

  assert.ok(result, 'Result returned okay')
  assert.equal(result, '(444) 555.6666 x 8989', 'Result formatted correctly on return')
})

test('Test custom format bad phone', () => {
  const result = format('(NNN).NNN.NNNN', '89965')

  assert.ok(result, 'Results returned okay')
  assert.equal(result, '89965', 'Returned back the bad number')
})

test('Test both longDistance and extensions', () => {
  const result = format('C + NNN.NNN.NNNN x NNNN', '155544433338989')

  assert.ok(result, 'Results returned okay')
  assert.equal(result, '1 + 555.444.3333 x 8989', 'Results are formatted as expected')
})

test('Is case insensitive', () => {
  const result = format('(nnn) nNn.NNnn', '4445556666')

  assert.equal(result, '(444) 555.6666')
})

test('Is Curried', () => {
  const fn = format('NNN.NNN.NNNN')

  assert.equal(fn('4445556666'), '444.555.6666')
})

test('Handle Djibouti numbers', () => {
  const result = format('+CCC NN NN NNNN', '25311223333')

  assert.deepEqual(result, '+253 11 22 3333')
})

test('Handle Morocco numbers', () => {
  const result = format('+CC NN NN NN NN', '0711223333')

  assert.deepEqual(result, '+07 11 22 33 33')
})

test('Handles numbers without area code', () => {
  const results = format('NNN.NNNN', '555-6666')

  assert.deepEqual(results, '555.6666')
})

test('Catches letters when passed in', () => {
  assert.deepEqual(format('NNN.NNNN', 'abc1234'), 'abc1234')
  assert.deepEqual(format('NNN.NNNN', '1234abc'), '1234abc')
})

test('Handles more numbers than the format', () => {
  const results = format('NNN.NNNN', '123456789')

  assert.deepEqual(results, '123456789')
})

test('Handles less numbers than the format', () => {
  const results = format('NNN.NNNN', '1234')

  assert.deepEqual(results, '1234')
})

test('Handles non NANP formats', () => {
  const results = format('NNN NNN NN NN NN', '046123456789')

  assert.deepEqual(results, '046 123 45 67 89')
})

test('Supports Placeholder characters', () => {
  const fn = format('NNN-NNN-NNNN')

  assert.deepEqual(fn('__________'), '___-___-____')
  assert.deepEqual(fn('444_______'), '444-___-____')
  assert.deepEqual(fn('444555____'), '444-555-____')
  assert.deepEqual(fn('4445556666'), '444-555-6666')
  assert.deepEqual(format('NNN-NNN-NNNN x NNNN', '5554443333____'), '555-444-3333 x ____')
})

test('Lowercase c is treated as a country code placeholder', () => {
  assert.deepEqual(format('c (NNN) NNN-NNNN', '15554443333'), '1 (555) 444-3333')
  assert.deepEqual(format('+cc NNN NNN NNNN', '445554443333'), '+44 555 444 3333')
})

test('Only C and N count as placeholders in the layout', () => {
  assert.deepEqual(format('NNN-NNN-NNNN ext NNN', '5554443333123'), '555-444-3333 ext 123')
  assert.deepEqual(format('NNN-NNN-NNNN xNNN', '5554443333x123'), '555-444-3333 x123')
})

test('Formats any number that fits the layout', () => {
  assert.deepEqual(format('NNN-NNN-NNNN', '0000000000'), '000-000-0000')
  assert.deepEqual(format('NNNN', '1234'), '1234')
})
