(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('kyanite')) :
  typeof define === 'function' && define.amd ? define(['exports', 'kyanite'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.phoneFns = {}, global.kyanite));
}(this, (function (exports, kyanite) { 'use strict';

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var uglify = kyanite.compose(kyanite.replace(/[a-z]\w?|\W/gi, ''), String);

  var breakdown = function breakdown(phone) {
    var _uglify$match = uglify(phone).match(/([_0-9]{3})?([_0-9]{3})([_0-9]{4})([_0-9]{1,})?/),
        _uglify$match2 = _slicedToArray(_uglify$match, 5),
        areaCode = _uglify$match2[1],
        localCode = _uglify$match2[2],
        lineNumber = _uglify$match2[3],
        _uglify$match2$ = _uglify$match2[4],
        extension = _uglify$match2$ === void 0 ? '' : _uglify$match2$;
    return {
      areaCode: areaCode,
      localCode: localCode,
      lineNumber: lineNumber,
      extension: extension
    };
  };

  function _curry2(fn) {
    return function f2(a, b) {
      if (!arguments.length) {
        return f2;
      }
      if (arguments.length === 1) {
        return function (_b) {
          return fn(a, _b);
        };
      }
      return fn(a, b);
    };
  }

  function shortNumberTest(phone) {
    return function () {
      var _breakdown = breakdown(phone),
          localCode = _breakdown.localCode,
          lineNumber = _breakdown.lineNumber;
      return kyanite.test(/^([0-9]{3})[-. ]?([0-9]{4})$/, localCode + lineNumber);
    };
  }
  function longNumberTest(phone) {
    return function () {
      var _breakdown2 = breakdown(phone),
          areaCode = _breakdown2.areaCode,
          localCode = _breakdown2.localCode,
          lineNumber = _breakdown2.lineNumber;
      return kyanite.test(/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/, areaCode + localCode + lineNumber);
    };
  }
  var isValid = function isValid(phone) {
    var uglyPhone = uglify(phone);
    var done = kyanite.compose(kyanite.reduced);
    return kyanite.pipe([kyanite.when(kyanite.isEmpty, done(kyanite.F)), kyanite.length, kyanite.when(kyanite.lt(7), done(kyanite.F)), kyanite.when(kyanite.eq(7), shortNumberTest(uglyPhone)), longNumberTest(uglyPhone)], uglyPhone);
  };

  var validFormat = function validFormat(layout) {
    return function (phone) {
      var _compose = kyanite.compose(kyanite.countBy(kyanite.toUpper), kyanite.split(''), layout),
          N = _compose.N,
          _compose$C = _compose.C,
          C = _compose$C === void 0 ? 0 : _compose$C;
      return kyanite.pipe([uglify, kyanite.length, kyanite.eq(kyanite.add(N, C))], phone);
    };
  };
  var format = function format(layout, phone) {
    var cCount = kyanite.includes('C', layout) ? kyanite.length(layout.match(/C/g)) : 0;
    var _reduce = kyanite.addIndex(kyanite.reduce);
    return kyanite.branch(kyanite.both(kyanite.complement(isValid), kyanite.complement(validFormat(layout))), kyanite.identity, kyanite.pipe([uglify, kyanite.split(''), _reduce(function (d, acc, i) {
      return kyanite.gt(i, cCount) ? kyanite.replace(/C/i, d, acc) : kyanite.replace(/N/i, d, acc);
    }, layout)]), phone);
  };
  var format$1 = _curry2(format);

  exports.breakdown = breakdown;
  exports.format = format$1;
  exports.isValid = isValid;
  exports.uglify = uglify;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
