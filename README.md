[![npm](https://img.shields.io/npm/v/phone-fns.svg?style=for-the-badge)](https://www.npmjs.com/package/phone-fns) [![David](https://img.shields.io/david/dhershman1/phone-fns.svg?style=for-the-badge)](https://david-dm.org/dhershman1/phone-fns) [![David](https://img.shields.io/david/dev/dhershman1/phone-fns.svg?style=for-the-badge)](https://david-dm.org/dhershman1/phone-fns?type=dev) [![Travis](https://img.shields.io/travis/dhershman1/phone-fns.svg?style=for-the-badge)](https://travis-ci.org/dhershman1/phone-fns)

# phone-fns

A small modern, and functional phone number library which gathers inspiration from the fun [date-fns](https://github.com/date-fns/date-fns) library

- [Documentation](https://dusty-demos.herokuapp.com/phone-fns)

## How-To

Standard module system

```js
import phoneFns from 'phone-fns';
```

Common JS

```js
const phoneFns = require('phone-fns');
```

Through the browser

```js
<script src="path/to/location/dist/phone-fns.min.js"></script>
```

## Usage

In v2.0.0 of Phone-Fns the main import is used to create separate instances in order to make usage easier as well as the library smaller.

Basic usage can be done like so, this is without setting a country code for the instance we create.

```javascript
import phoneFns from 'phone-fns';

const phoneLib = phoneFns();

phoneLib.breakdown('4443332222');
// => { countryCode: '', areaCode: '444', localCode: '333', lineNumber: '2222', extension: '' }

phoneLib.format('(AAA) LLL-NNNN', '4443332222');
// => '(444) 333-2222'
```

If you want to set a country code you can create an instance of the library around the country code like so.

```javascript
import phoneFns from 'phone-fns';

const phoneLib = phoneFns('1');

phoneLib.breakdown('4443332222');
// => { countryCode: '1', areaCode: '444', localCode: '333', lineNumber: '2222', extension: '' }

phoneLib.format('C + (AAA) LLL-NNNN', '4443332222');
// => '1 + (444) 333-2222'
```

## Methods

You can also bring in the functions individually if you want to.

### uglify(phone)

`uglifies` the phone number down to just the number string

#### Arguments

- `phone` - `String`: the desired phone number to run against

#### Usage

```js
import uglify from 'phone-fns/uglify';

console.log(uglify('555-444-1111'));
// Output: 5554441111
```

### format(countryCode, layout, phone)

Customized formatting function allowing you to create your own custom formats

If you are not using an instance of the setup you will have to provide a country code to the format function if you call it by itself.

#### Arguments

- `countryCode` - `String`: The country code to use (Only required if you call `format` individually)
- `phone` - `String`: The desired phone number to run against
- `format` - `String`: The desired format to set the number into, see above

#### Formatting

**NOTE you have to use capitalized letters when creating your layout string**

- `A` - Area Code Number
- `L` - Local Code Number (Usually the first three digits)
- `N` - Line Number (Usually the last four digits)
- `E` - Extension Number (Usually an additional set of digits at the end)
- `C` - Country Code Number (Usually the set of digits that go ahead of a number)

#### Usage

```js
import format from 'phone-fns/format';

// Without a country code
format('', '(AAA) LLL-NNNN', '4443332222');
// Output: (444) 333-2222

// With a country code
format('112', 'CCC + (AAA)-LLL.NNNN', '4443332222');
// Output: 112 + (444)-333.2222

// Extensions
format('', '(AAA).LLL.NNNN x EEEE', '44433322228989');
// Output: (444).333.2222 x 8989
```

`format` is also a curried function

```javascript
import format from 'phone-fns/format';

// Setting it to have no country code
const formatter = format('');
// Or setting it to have no country code and a default layout
const formatWithLayout = format('', '(AAA) LLL.NNNN');

formatter('AAA.LLL.NNNN', '4443332222'); // => 444.333.2222
formatWithLayout('4443332222'); // => (444) 333.2222

```

### find(phone, code)

Find a piece of the phone number and return it

#### Arguments

- `phone` - `String`: the desired phone number to run against
- `code` - `String`: the piece of the phone number to return can be `areaCode`, `localCode`, `lineNumber`, `countryCode`, or `extension`

#### Usage

```js
import find from 'phone-fns/find';

console.log(find('555-444-3333', 'areaCode'));
// Output: 555
```

### breakdown(phone, isLD)

Takes the provided phone string and breaks it down into an object like so:

```js
{
  countryCode: '',
  areaCode: '',
  localCode: '',
  lineNumber: '',
  extension: ''
}
```

#### Arguments

- `phone` - `String`: the desired phone number to run against
- `isLD` - `Boolean`: tell the function if the phone is using a long distance style or not

#### Usage

```js
import breakdown from 'phone-fns/breakdown';

console.log(breakdown('555-444-3333'));
// Output:
/*
{
  countryCode: '',
  areaCode: '555',
  localCode: '444',
  lineNumber: '3333',
  extension: ''
}
*/

console.log(breakdown('112555-444-3333', true));
// Output:
/*
{
  countryCode: '112',
  areaCode: '555',
  localCode: '444',
  lineNumber: '3333',
  extension: ''
}
*/

console.log(breakdown('555-444-33338989'));
// Output:
/*
{
  countryCode: '',
  areaCode: '555',
  localCode: '444',
  lineNumber: '3333',
  extension: '8989'
}
*/
```

### isValid(phone)

Validates if the phone number is valid or not

#### Arguments

- `phone` - `String`: the desired phone number to run against

#### Usage

```js
import isValid from 'phone-fns/isValid';

console.log(isValid('555-444-3333'));
// Output: true
console.log(isValid('8896'));
// Output: false
```

### identical(x, y)

Checks if the two provided numbers are identical or not

#### Arguments

- `x` - `String`: the desired phone number to run against `y`
- `y` - `String`: the desired phone number to run against `x`

#### Usage

```js
import identical from 'phone-fns/identical';

console.log(identical('555-444-3333', '555-444-3333'));
// Output: true
console.log(identical('555-444-3333', '555-333-4444'));
// Output: false
```
