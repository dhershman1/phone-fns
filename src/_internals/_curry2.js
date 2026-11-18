/**
 * A 2 parameter function that can also be called with only its first parameter, keeping the original parameter names
 * @private
 * @template {(a: any, b: any) => any} F
 * @typedef {Parameters<F> extends [...infer First, unknown]
 *   ? Parameters<F> extends [unknown, ...infer Rest]
 *     ? { (...args: Parameters<F>): ReturnType<F>, (...args: First): (...args: Rest) => ReturnType<F> }
 *     : never
 *   : never} Curried2
 */

/**
 * This is an optimized internal curry function for 2 param functions
 * @private
 * @category Function
 * @template {(a: any, b: any) => any} F
 * @param {F} fn The function to curry
 * @return {Curried2<F>} The curried function
 */
function _curry2 (fn) {
  /**
   * @param {Parameters<F>[0]} [a]
   * @param {Parameters<F>[1]} [b]
   * @returns {any}
   */
  function f2 (a, b) {
    if (!arguments.length) {
      return f2
    }

    if (arguments.length === 1) {
      return function (/** @type {Parameters<F>[1]} */ _b) {
        return fn(a, _b)
      }
    }

    return fn(a, b)
  }

  return /** @type {Curried2<F>} */ (f2)
}

export default _curry2
