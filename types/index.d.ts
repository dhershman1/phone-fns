// Type definitions for Phone-Fns
// Project: Phone-Fns
// Definitions by: Dustin Hershman <dustinh17@gmail.com>

declare let phoneFns: phoneFns.Static;

declare namespace phoneFns {
  interface Breakdown {
    areaCode: string;
    localCode: string;
    lineNumber: string;
    extension: string;
  }

  interface Static {
    /**
     * Allows you to format phone numbers however you desire using N as number placeholders and C as country code placeholders these placeholders are case insensitive
     */
    format(layout: string, phone: string): string;
    format(layout: string): (phone: string) => string;

    /**
     * Takes a provided phone string and breaks it down into an object of codes
     */
    breakdown(phone: string): Breakdown;

    /**
     * Validates the base number, does not take the country code or extension into consideration for this validation
     */
    isValid(phone: string): boolean;

    /**
     * Validates a phone number based on a custom format provided
     */
    isValidWithFormat(format: string, phone: string): boolean;
    isValidWithFormat(format: string): (phone: string) => boolean;

    /**
     * Strips all of the special characters from the given string but leaves extension and country code characters in place
     */
    normalize(phone: string): string;

    /**
     * Strips all of the special characters from the given string
     */
    uglify(phone: string | number): string;

    /**
     * Validates the base number, strips out special characters and spaces upon validation, can handle country code and extension in the phone number
     */
    validate(phone: string): boolean;
  }
}

export = phoneFns;
export as namespace phoneFns;
