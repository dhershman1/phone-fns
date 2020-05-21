[![npm](https://img.shields.io/npm/v/phone-fns.svg?style=flat-square)](https://www.npmjs.com/package/phone-fns)
[![David](https://img.shields.io/david/dhershman1/phone-fns.svg?style=flat-square)](https://david-dm.org/dhershman1/phone-fns)
[![CircleCI](https://circleci.com/gh/dhershman1/phone-fns.svg?style=svg)](https://circleci.com/gh/dhershman1/phone-fns)
[![codecov](https://codecov.io/gh/dhershman1/phone-fns/branch/master/graph/badge.svg)](https://codecov.io/gh/dhershman1/phone-fns)

# Phone Fns

A small modern, and functional phone number library which gathers inspiration from the fun [date-fns](https://github.com/date-fns/date-fns) library

- [Documentation](https://phone-fns.dusty.codes/)

## How-To

```cli
npm i phone-fns
```

Standard module system

```js
import phoneFns from 'phone-fns'
```

Common JS

```js
const phoneFns = require('phone-fns')
```

Through the browser

```html
<script src="path/to/location/dist/phone-fns.min.js"></script>
```

## Usage

```javascript
import phoneFns from 'phone-fns'

phoneFns.breakdown('4443332222')
// => { areaCode: '444', localCode: '333', lineNumber: '2222', extension: '' }

phoneFns.format('(NNN) NNN-NNNN', '4443332222')
// => '(444) 333-2222'
```

You can also destructure to only use the functions you want

```javascript
import { breakdown, format } from 'phone-fns'

breakdown('4443332222')
// => { areaCode: '444', localCode: '333', lineNumber: '2222', extension: '' }

format('(NNN) NNN-NNNN', '4443332222')
// => '(444) 333-2222'
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

This will only work with underscores or other characters not picked up by the Regex `\W` type.

Just call format as the phone number updates in order to get back the newly updated string. Useful for using it with a input mask setup
