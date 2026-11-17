/**
 * @private
 * @function
 * @param {String} str The format layout
 * @returns {String} Only the placeholder characters (C and N, case insensitive) from the layout
 */
export default function _uglifyFormats (str) {
  return str.replace(/[^cn]/gi, '')
}
