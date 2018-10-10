# Changelog

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

### Improved

- Using Kyanite to improve how format functions and better currying from the library
- Replaced `uglify-js` with `terser` for performance gains

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
