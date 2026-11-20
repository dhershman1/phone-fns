<p align=center>
  <a href="./LICENSE">
    <img
      alt="license:mit"
      src="https://img.shields.io/badge/license-mit-green.svg?style=flat-square&color=%23bef9c6"
    />
  </a>
  <a href="https://phone-fns.dusty.codes/">
    <img alt="Netlify Status" src="https://api.netlify.com/api/v1/badges/9a96c817-73dc-40c9-b052-c855397cf2c1/deploy-status">
  </a>
  <a href="https://www.npmjs.com/package/phone-fns">
    <img alt="Npm Version" src="https://img.shields.io/npm/v/phone-fns.svg?style=flat-square&color=%23bef9c6">
  </a>
  <a href="https://github.com/dhershman1/phone-fns/actions/workflows/phone-fns.yml">
    <img alt="Build Status" src="https://img.shields.io/github/actions/workflow/status/dhershman1/phone-fns/phone-fns.yml?style=flat-square&logo=github">
  </a>
  <a href="https://codecov.io/gh/dhershman1/phone-fns" >
    <img src="https://codecov.io/gh/dhershman1/phone-fns/graph/badge.svg?token=69ajvCO9U2"/>
  </a>
</p>

# Phone Fns

A small, modern, and functional phone number library which gathers inspiration from the fun [date-fns](https://github.com/date-fns/date-fns) library


- [Documentation](https://phone-fns.dusty.codes/)

## How-To

```sh
npm i phone-fns
```

Standard module system

```js
import * as phoneFns from 'phone-fns'

phoneFns.uglify('555-444-3333') // => '5554443333'
```

Common JS

```js
const phoneFns = require('phone-fns')

phoneFns.uglify('555-444-3333') // => '5554443333'
```

Using Unpkg or jsdelivr CDN (As of v4.0.0+)

```html
<script src="https://cdn.jsdelivr.net/npm/phone-fns@5.0.0/dist/phone-fns.iife.min.js"></script>
<script>
  phoneFns.uglify('555-444-3333') // => '5554443333'
</script>
```


Through the browser

```html
<script src="path/to/location/dist/phone-fns.iife.min.js"></script>
<script>
  phoneFns.uglify('555-444-3333') // => '5554443333'
</script>
```

## TypeScript

Type definitions ship with the package. They work with both `import` and `require`, and the `Breakdown` type can be imported for your own code:

```ts
import { breakdown, type Breakdown } from 'phone-fns'

const parts: Breakdown = breakdown('555-444-3333')
```

## Usage

```javascript
import * as phoneFns from 'phone-fns'

phoneFns.breakdown('4443332222')
// => { countryCode: '', areaCode: '444', localCode: '333', lineNumber: '2222', extension: '' }

phoneFns.format('(NNN) NNN-NNNN', '4443332222')
// => '(444) 333-2222'
```

You can also destructure to only use the functions you want

```javascript
import { breakdown, format } from 'phone-fns'

breakdown('4443332222')
// => { countryCode: '', areaCode: '444', localCode: '333', lineNumber: '2222', extension: '' }

format('(NNN) NNN-NNNN', '4443332222')
// => '(444) 333-2222'
```

## Validation

`validate` checks that a phone number is written sensibly, without applying any country specific numbering rules. This lets it work with phone numbers from anywhere:

- It may start with a `+` and a country code
- Digits are grouped with a single space, dot, or dash, and one group can be wrapped in parentheses
- It has 10 to 15 digits, country code included
- Extensions are marked with `x`, `ext`, `ext.`, `extension`, or `#`

```js
import { validate } from 'phone-fns'

validate('555-444-3333') // => true
validate('+44 (0)20 7946 0958') // => true
validate('555--444-3333') // => false
```

Because it doesn't know each country's rules, a number can pass `validate` without being a real, dialable number. If you need that level of accuracy (or want to know whether a number is a mobile or landline), use [libphonenumber-js](https://gitlab.com/catamphetamine/libphonenumber-js), which ships the full metadata for every country. Phone-Fns stays small by leaving that metadata out.

If you know the exact layout you expect, `isValidWithFormat` checks a number against it:

```js
import { isValidWithFormat } from 'phone-fns'

isValidWithFormat('NNN-NNN-NNNN', '555-444-3333') // => true
isValidWithFormat('NNN-NNN-NNNN', '555.444.3333') // => false
```

## Placeholder Support

Phone-Fns as of v3.2.0 now supports placeholder syntax using Underscores `_`

```js
const fn = format('NNN-NNN-NNNN')

fn('__________') // => '___-___-____'
fn('444_______') // => '444-___-____'
fn('444555____') // => '444-555-____'
fn('4445556666') // => '444-555-6666'
format('NNN-NNN-NNNN x NNNN', '5554443333____') // => '555-444-3333 x ____'
```

Underscores are the only supported placeholder character.

Just call format as the phone number updates in order to get back the newly updated string. Useful for using it with a input mask setup
