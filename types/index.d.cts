// Type definitions for Phone-Fns
// Project: Phone-Fns
// Definitions by: Dustin Hershman <dustinh17@gmail.com>

declare let phoneFns: phoneFns.Static

declare namespace phoneFns {
  interface Breakdown {
    countryCode?: string
    areaCode: string
    localCode: string
    lineNumber: string
    extension: string
  }

  interface Static {
    /**
     * Takes a provided phone string and breaks it down into an object of codes
     */
    breakdown(phone: string): Breakdown

    /**
     * Attempts to find the country code in a phone number, expects the number to be formatted in some way does not work properly on normalized or uglified phone numbers.
     */
    findCountryCode(phone: string): string

    /**
     * Breaks down a phone number based on a custom format provided and returns an object with the parts of the phone number
     * C - Country Code A- Area Code L - Local Code N - Line Number X - Extension
     */
    breakdownWithFormat(format: string, phone: string): Breakdown
    breakdownWithFormat(format: string): (phone: string) => Breakdown

    /**
     * Finds a list of separators in a phone number string
     */
    findSeparators(phone: string): string[]

    /**
     * Allows you to format phone numbers however you desire using N as number placeholders and C as country code placeholders these placeholders are case insensitive
     */
    format(layout: string, phone: string): string
    format(layout: string): (phone: string) => string

    /**
     * Attempts to check if a country code is present in the phone number provided it searches for a + followed by a number
     */
    hasCountryCode(phone: string): boolean

    /**
     * Validates a phone number based on a custom format provided
     */
    isValidWithFormat(format: string, phone: string): boolean
    isValidWithFormat(format: string): (phone: string) => boolean

    /**
     * Strips all of the special characters from the given string but leaves extension and country code characters in place
     */
    normalize(phone: string): string

    /**
     * Strips all of the special characters from the given string
     */
    uglify(phone: string | number): string

    /**
     * Validates the base number, strips out special characters and spaces upon validation, can handle country code and extension in the phone number
     */
    validate(phone: string): boolean
  }
}

export = phoneFns
export as namespace phoneFns
