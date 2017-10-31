[![Build Status](https://travis-ci.org/dhershman1/phone-fns.svg?branch=master)](https://travis-ci.org/dhershman1/phone-fns)

# phone-fns

A small modern, and functional phone number library which gather inspiration from the fun [date-fns](https://github.com/date-fns/date-fns) library

## How-To

Standard module system

```js
import {isValid, find} from 'phone-fns';
// Now you can use each as a function
isValid(phone);
find(phone, code);
```

Common JS

```js
pPretty = require('phone-prettify');
pPretty.dashed(phone);
```

Through the browser

```js
<script src="path/to/location/dist/phone-prettify.umd.js"></script>
phonePrettify.dashed(phone);
```

## Methods

### uglify(phone)

`uglifies` the phone number down to just the number string

#### Arguments

- `phone` - `String`: the desired phone number to run against

#### Usage

```js
import {uglify} from 'phone-fns';

console.log(uglify('555-444-1111'));
// Output: 5554441111
```

### format(phone, format, type)

Customized formatting function allowing you to create your own custom formats

#### Arguments

- `phone` - `String`: The desired phone number to run against
- `format` - `String`: The desired format to set the number into, see above
- `type` - `String`: Mainly used for `longDistance` to tell `phone-fns` to run the number through that check as well

#### Formatting

- `A` - Area Code Number
- `L` - Local Code Number (Usually the first three digits)
- `N` - Line Number (Usually the last four digits)
- `E` - Extension Number (Usually an additional set of digits at the end)
- `C` - Country Code Number (Usually the set of digits that go ahead of a number)

#### Usage

```js
import { format } from 'phone-fns';

// Normal
format('4443332222', '(AAA) LLL-NNNN');
// Output: (444) 333-2222

// Long Distance
format('1124443332222', 'CCC + (AAA)-LLL.NNNN', 'longDistance'); // <-- Notice we have to make sure to tell the module we want a long distance rule ran
// Output: 112 + (444)-333.2222

// Extensions
format('44433322228989', '(AAA).LLL.NNNN x EEEE');
// Output: (444).333.2222 x 8989
```

### find(phone, code)

Find a piece of the phone number and return it

#### Arguments

- `phone` - `String`: the desired phone number to run against
- `code` - `String`: the piece of the phone number to return can be `areaCode`, `localCode`, `lineNumber`, `countryCode`, or `extension`

#### Usage

```js
import { find } from 'phone-prettify';

console.log(find('555-444-3333', 'areaCode'));
// Output: 555
```
