[![npm](https://img.shields.io/npm/v/phone-fns.svg?style=flat-square&color=%23bef9c6)](https://www.npmjs.com/package/phone-fns)
![License (MIT)](https://img.shields.io/badge/license-mit-green.svg?style=flat-square&color=%23bef9c6)
![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/dhershman1/phone-fns/phone-fns.yml?style=flat-square&logo=github)
[![Netlify Status](https://api.netlify.com/api/v1/badges/9a96c817-73dc-40c9-b052-c855397cf2c1/deploy-status)](https://app.netlify.com/sites/phone-fns/deploys)

# Phone Fns

A small modern, and functional phone number library which gathers inspiration from the fun [date-fns](https://github.com/date-fns/date-fns) library

- [Documentation](https://phone-fns.dusty.codes/)

## How-To

```cli
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
<script src="https://cdn.jsdelivr.net/npm/phone-fns@4.0.0/dist/phone-fns.iife.min.js"></script>
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

## Usage

```javascript
import * as phoneFns from 'phone-fns'

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
