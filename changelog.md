# Changelog

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