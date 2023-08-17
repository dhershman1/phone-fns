// Type definitions for Phone-Fns
// Project: Phone-Fns
// Definitions by: Dustin Hershman <dustinh17@gmail.com>

declare let phoneFns: phoneFns.Static;

declare namespace phoneFns {
  interface Breakdown {
    areaCode: string;
    localCode: string;
    lineNumber: string;
    extention: string;
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
     * Strips all of the special characters from the given string
     */
    uglify(phone: string | number): string;
  }
}

export = phoneFns;
export as namespace phoneFns;
