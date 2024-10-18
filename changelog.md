# Changelog

## v5.0.0

### Breaking Changes

- Removed `isValid`

### New

- Added `detectCountryCode` which does its best to grab the country code from a phone number
  - This function only looks for **up to** four digit country codes
  - Note: It's important that you provide a formatted number to this function.
  - Example: `detectCountryCode('+1 444 555 6666') // => '1'` vs `detectCountryCode('+14445556666') // => '144'`
- Added `hasCountryCode` which returns a boolean on if a country code is present or not in the phone number
  - Example: `hasCountryCode('+1 555 555 5555') // => true`

### Changed

- Re wrote validate
  - It's a bit more lenient now on validation I still recommend validating with a format using `isValidWithFormat`

## v4.1.2

### Fixed

- Documentation examples for `breakdownWithFormat` function

### Changed

- Updated `pinet` to v1.2.1

## v4.1.1

### New

- Deprecated `isValid` function in favor of `isValidWithFormat`

### Changed

- Reset codecov coverage report using `c8` package
- Updated unit tests for some more coverage
- Cleaned up some round about logic in the codebase

## v4.1.0

### New

- Added `normalize` function
  - This function strips out special characters and trims the phone number, much like uglify but skips non-digit characters
  - Example: `normalize('555.444.3333 x 123') // => '5554443333x123'` vs `uglify('555.444.3333 x 123') // => 5554443333123`
- Added `validate` function
  - This is a validation function, but works better for world wide phone numbers as well. Expects the full number
  - Example: `333-444-5555` comes back valid but `444-5555` is invalid to this function
- Added `isValidWithFormat` function
  - This takes a string phone number and a format string and validates the phone using the format
  - It's also passed through the `validate` function for an extra step of validation
- Added `findSeparators` function
  - A simple function that finds the separators in a phone number and returns them as an array
- Added `breakdownWithFormat` function
  - Works a lot like `breakdown` but follows a strict format provided by the user to breakdown the number into an object
  - This allows for a wider range of phone number support for breakdown


### Changed

- `Phone-fns` is no longer dependant on `Kyanite` and is dependency free!
- `isValid` description to explain that it mostly focused on NANP numbers
- `breakdown` description to better explain that it's main focus is NANP numbers and its gachas
- We more than doubled our unit tests! Woo!

### Chore

- Renamed test files to `*.spec.js` instead of just `*.js`

## v4.0.2

### Fixed

- Typo for extension in types #14 [@JonBee](https://github.com/JonBee)

### Chore

- Dependency Updates

## v4.0.1

### New

- Added more unit tests for `isValid` and `breakdown`

### Fixed

- Added warning into README that currently phone-fns is focused on US based phone number styles
- Updated github action to LTS of node

### Chore

- Updated dependencies

## v4.0.0

### Breaking Changes

- Converted Phone-Fns to a standard ESM module
  - This means if you are using import statements in an ESM module for phone-fns this changes:
    - `import phoneFns from 'phone-fns'` --> `import * as phoneFns from 'phone-fns'`
    - You can also just destructure from here still like so: `import { isValid } from 'phone-fns'`
  - Phone fns should still support common js syntax out of the box as well
- Upgraded to `Kyanite v2.0.1`

### New

- CDN support sould be working for phone-fns again
  - Updated README to reflect these changes

### Improved

- Made typings less confusing

## v3.2.5

### :confetti_ball: Enhanced

- Added: New github flows and files

## v3.2.4

### Improved

- Audited packaged
- Replaced `tap-spec` with `tap-on`
- Optimized ignore files
- Removed dist from repo

## v3.2.3

### New

- Switched over to [pinet](https://github.com/dhershman1/pinet) jsdoc templating
- Changed documentation hosting

### Improved

- All dependencies have been updated
- Removed docs folder
- Removed david-dm badge since it doesn't seem to be coming back
- Documentation workflow now handled by circleci
- `format` can now take in `Number` type phone numbers

## v3.2.2

- Dev dependency fixes

## v3.2.1

### Improved

- Dependency updates
- Unit tests
- Optimization of some code pieces
- Some documentation

## v3.2.0

### New

- Added new Placeholder support

## v3.1.0

### Improved

- Switched to internal currying
- Improved `format`s performance and broke it down to a more intelligent function

### Fixed

- Typo in `format`s example
- Remove unused code

## v3.0.0

### Breaking Changes

- Removed `find` function since it was rather pointless
- Removed `match` function since it was rather pointless
- The main import is no longer a function but an object of functions
- Re wrote how format works so it's easier to use and more light weight
  - Specify country code in the layout with C. Example: `C + (NNN) NNN-NNNN`
  - Usage example: `format('C + (NNN) NNN-NNNN', 14445556666) // => '1 + (444) 555-6666'`
- `breakdown` no longer handles or accepts country codes
  - Technically the only function that cares about Country Codes is the `format` function this is to make functions easier to use
- Scrapped modular functions
  - There is no need for this anymore, since Rollup & webpack v2+ treeshaking support curried functions, destructing works much better now

### New

- Documentation was moved onto a more sustainable location for quicker and more up to date docs, should be hosted via github pages now too

### Improved

- Using Kyanite to improve how format functions and better currying from the library
- Replaced `uglify-js` with `terser` for performance gains
- `isValid` optimizations using Kyanite
- Overall documentation system should be built directly into its own page now
- Added Typing declarations for TS and vscode IDE support

## v2.0.1

### Improved

- A new script system in place for generating library documentation to make it easier for the main site to pull in the latest documentation

## v2.0.0

### BREAKING CHANGES

- The API usage for `format` is now different, you only need to use the letter `N` in your layout now in the order you want the numbers to fill in
  - The letter `N` is case insensitive
  - Example: an old layout may have looked like: `(AAA) LLL-NNNN` now it is: `(NNN) NNN-NNNN` or  `(nnn) nnn-nnNN` if you wanted to get creative

### New

- `find` has been deprecated and may be removed in later versions, please transition to `breakdown`
- Added a 2nd validation level to `format` it will now validate the phone number has enough digits to fill out the layout properly
- You can now pass country code as a number or string

### Fixed

- JSdocs for format were backwards
- Able to properly handle numbers without an area code now

## v1.0.1

### New

- Rebuilt the architecture of the main source (has no effect on usage)
- Added in CDN info to documentation
- Building using Rollup now instead of webpack decreasing the overall file size of our main file to 1.86kb (vs 3.83kb with webpack) and 970B gzipped
  - This also benefits each individual functions build so they're also much smaller
- Converting testing to latest babel versions
- Convert linter from `eslint` to `standardjs`
- Created an uncompressed build along with the compressed one which you can use in dev for easier debugging

### Fixed

- For some reason I didn't realize the package.json main was looking at a index.js file
- Re built automated documentation script so it performs faster

## v1.0.0

v1.0.0 is almost a total re write of how the library functions from v0.3.3 it is advised you migrate with caution

### BREAKING CHANGES

- Removed `findLocal` function
- Removed `getCode` function
- Removed `getCountries` function
- Removed `getCountryCode` function
- Removed `callingCodes`
- Changed `identical` to `match`
- Re org of entire library
    - You can now create instances of the library with different country codes or none
    - This applies the country code to each method that needs it meaning you don't need to send it as a param
- Changed the parameter of most of the functions
- If using the individual functions you will have to provide a country code to those that need it
- `find` parameters have been rotated

### New

- Added the ability to call `phoneFns` as a function and provide a country code to create an instance around that country code, or not for only base phone number functionality
- The `format` function is now curried
- The `find` function is curried as well

### Improved

- The `breakdown` function to be a little more lightweight
- The `format` function to be a bit more lightweight and functional
- The `isValid` function to do decently better phone number validation


## v0.3.3

- Fix for automating docs file
- Build files should appear again

## v0.3.2

- Better(working) fix for webpack builds issue
- Better Main JS generator

## v0.3.1

- Fix for Webpack build issues when importing base module
- README typo fixes

## v0.3.0

> - Consistancy Tweaks in some files
> - Changed `getCode` to `getCountryCode`
>   - Notice that this now means `getCode` is depricated
>   - This is not yet a breaking change but may be in the future (1.0.0 release probably)
> - Changed `findLocal` to `getCountries`
>   - Notice that this now means `findLocal` is depricated
>   - This is not yet a breaking change but may be in the future (1.0.0 release probably)
> - Introduced webpack as the builder to help build out the public module
>   - This shouldn't have any large effects, if you do see an issue please let me know asap!
> - Updated all dependencies
> - Text Tweaks in some error messages

## v0.2.0

> - Tweaks to build process
> - Added ability to call functional methods individually you can do so using the following:
>   - `phone-fns/format`
>   - `phone-fns/find`
>   - `phone-fns/breakdown`
>   - `phone-fns/identical`
>   - `phone-fns/isValid`
>   - `phone-fns/uglify`
>   - `phone-fns/getCode`
>   - `phone-fns/findLocal`
>   - `phone-fns/callingCodes` - Gives back the full list of country calling codes
>   - You can still use just `phone-fns` to get back all of the methods in an `object`
> - Added a minified version `phone-fns.min.js` **the module points to this version by default**
> - Renamed the file `phone-fns.umd.js` to just `phone-fns.js`
> - Added Country Calling Codes from the [Countries Repo](https://github.com/mledoze/countries)
> - Added `findLocal` function which returns the country names associated with the passed in code
> - Added `getCode` function which returns the country calling code from the `json`
> - Removed country code dashing, since it's not really a thing

## v0.1.0

> - Initial Public Release
