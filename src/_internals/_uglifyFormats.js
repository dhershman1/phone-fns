/**
 * @private
 * @function
 * @param {String} str The string to strip special characters
 * @returns {String} The newly created string with special characters stripped
 */
export default function _uglifyFormats (str) {
  return str.replace(/[^a-wyz]/gi, '')
}
