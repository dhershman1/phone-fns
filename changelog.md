# Changelog

## v2.0.0

> - New `format` functionality
>   - This allows for custom formatting on the users end
> - Better searching for extensions and country codes
> - Added more functionality to the library, you can use functions outside of just formatting
>   - Adds `find` functionality

## v1.5.1

> - More unit tests for breakdown added in
> - Fix for when an extension number is passed in make sure it sanatizes correctly

## v1.5.0

> - Update all dependencies to their latest
> - Some simple code clean up/optimizations
> - Instead of throwing an error the app will now return the sent in phone number
>   - This is why we jumped a main version as this could break someone who is setup to listen for the error

## v1.4.0

> - `longDistance` now supports country codes of all shapes and sizes
>   - This includes: `X`, `XX`, `XXX`, `X-XXX`, `XX-XXXX`
> - Code optimizations
> - Some re organization of the strcuture
> - Added two new formats
>   - These new formats are **NOT** supported for use with `longDistance` or `extension`
>   - `groupTwo` which gives out a format of `XX XX XX XX` supports both 8 and 10 character numbers
>   - `groupFour` Which gives out a format of `XXXX XXXX` supports both 8 and 10 character numbers
>     - 10 character numbers output `XX XXXX XXXX`

## v1.3.0
> - Code optimizations
> - Better UMD support
> - Code cleanup
> - Updated the README with more info
> - Module is now transpiled and minified on install
> - IE9+ Support

## v1.2.2 & v1.2.3
> - Added and tweaked UMD support for the module

## v1.2.1
> - Added Travis CI stuff

## v1.2.0
> - Added ability to set methods directly for quicker use of the same method
> - Added tests for these situations
> - You can now use phone-prettify as a function call or as a setter to grab methods
> - Swapped the module public over to github
