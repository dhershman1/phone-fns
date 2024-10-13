/**
 * @private
 * @function
 * @param {String} str The string to check for placeholders
 * @returns {Boolean} Whether or not the string has a placeholder
 */
export default function _hasPlaceholder (str) {
  return str.includes('_')
}
