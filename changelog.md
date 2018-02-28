# Changelog

## v1.0.0

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