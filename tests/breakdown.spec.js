import breakdown from '../src/breakdown.js'
import test from 'tape'

test('Test breakdown normal', t => {
  const results = breakdown('555-444-3333')

  t.ok(results, 'results came back')
  t.is(typeof results, 'object', 'results came back as an object')
  t.is(results.areaCode, '555', 'The area code in results was 555')
  t.is(results.localCode, '444', 'The local code in results was 444')
  t.is(results.lineNumber, '3333', 'The lineNumber in results was 3333')
  t.notOk(results.extension.length, 'There was no extension')
  t.end()
})

test('Test breakdown with placeholder syntax', t => {
  const results = breakdown('555-___-____')

  t.is(results.areaCode, '555', 'The area code in results was 555')
  t.is(results.localCode, '___', 'The local code in results was ___')
  t.is(results.lineNumber, '____', 'The lineNumber in results was ____')
  t.end()
})

test('Test breakdown extension', t => {
  const results = breakdown('555-444-3333 x 8989')

  t.ok(results, 'results came back')
  t.is(typeof results, 'object', 'results came back as an object')
  t.is(results.areaCode, '555', 'The area code in results was 555')
  t.is(results.localCode, '444', 'The local code in results was 444')
  t.is(results.lineNumber, '3333', 'The lineNumber in results was 3333')
  t.is(results.extension, '8989', 'The extension number was 8989')
  t.end()
})

test('Test breakdown another normal', t => {
  const results = breakdown('5554441111')

  t.ok(results, 'results came back')
  t.is(typeof results, 'object', 'results came back as an object')
  t.is(results.areaCode, '555', 'The area code in results was 555')
  t.is(results.localCode, '444', 'The local code in results was 444')
  t.is(results.lineNumber, '1111', 'The lineNumber in results was 3333')
  t.notOk(results.extension.length, 'The extension number was empty')
  t.end()
})
