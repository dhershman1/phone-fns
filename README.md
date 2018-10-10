[![npm](https://img.shields.io/npm/v/phone-fns.svg?style=flat-square)](https://www.npmjs.com/package/phone-fns)
[![David](https://img.shields.io/david/dhershman1/phone-fns.svg?style=flat-square)](https://david-dm.org/dhershman1/phone-fns)
[![Travis](https://img.shields.io/travis/dhershman1/phone-fns.svg?style=flat-square)](https://travis-ci.org/dhershman1/phone-fns)
[![Coverage Status](https://img.shields.io/coveralls/github/dhershman1/phone-fns.svg?style=flat-square)](https://coveralls.io/github/dhershman1/phone-fns?branch=master)

# Phone Fns

A small modern, and functional phone number library which gathers inspiration from the fun [date-fns](https://github.com/date-fns/date-fns) library

**NOTICE: This README currently reflects the v3.0.0 release which is coming soon! please use the documentation site for v2.0.1 until it's released!**

- [Documentation](https://www.dusty.codes/phone-fns)

## How-To

`npm i phone-fns`

Standard module system

```js
import phoneFns from 'phone-fns'
```

Common JS

```js
const phoneFns = require('phone-fns')
```

CDN

```html
<!-- It is recommended to replace the @latest with a strict version number for production -->
<script src="https://cdn.jsdelivr.net/npm/phone-fns@latest/dist/phone-fns.min.js"></script>
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

## Modular

Phone Fns is a modular library meaning you can bring in individual functions to use if you need to

For example:

```js
import format from 'phone-fns/format'

format('(NNN) NNN-NNNN', '4443332222') // => '(444) 333-2222'
```
