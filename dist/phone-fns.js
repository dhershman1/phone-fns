(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.phoneFns = factory());
}(this, (function () { 'use strict';

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
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

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  var curry = function curry(f) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    return f.length <= args.length ? f.apply(void 0, args) : function () {
      for (var _len2 = arguments.length, more = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        more[_key2] = arguments[_key2];
      }
      return curry.apply(void 0, [f].concat(args, more));
    };
  };

  var uglify = (function (phone) {
    return phone.replace(/[a-z]\w?|\W/gi, '');
  });

  var breakdown = curry(function (countryCode, phone) {
    var _uglify$match = uglify(phone).match(/([0-9]{3})?([0-9]{3})([0-9]{4})([0-9]{1,})?/),
        _uglify$match2 = _slicedToArray(_uglify$match, 5),
        areaCode = _uglify$match2[1],
        localCode = _uglify$match2[2],
        lineNumber = _uglify$match2[3],
        _uglify$match2$ = _uglify$match2[4],
        extension = _uglify$match2$ === void 0 ? '' : _uglify$match2$;
    return {
      countryCode: countryCode,
      areaCode: areaCode,
      localCode: localCode,
      lineNumber: lineNumber,
      extension: extension
    };
  });

  var find = curry(function (type, phone) {
    return breakdown('', phone)[type];
  });

  var isValid = (function (phone) {
    var uglyPhone = uglify(phone);
    if (!phone || uglyPhone.length < 10) {
      return false;
    }
    var _breakdown = breakdown('', uglyPhone),
        areaCode = _breakdown.areaCode,
        localCode = _breakdown.localCode,
        lineNumber = _breakdown.lineNumber;
    return phone && /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/.test(areaCode + localCode + lineNumber);
  });

  var replaceLayout = function replaceLayout(layout, num, type) {
    var letters = {
      areaCode: 'A',
      localCode: 'L',
      lineNumber: 'N',
      extension: 'E',
      countryCode: 'C'
    };
    var results = layout.concat();
    num.split('').forEach(function (n) {
      results = results.replace(letters[type], n);
    });
    return results;
  };
  var format = curry(function (countryCode, layout, phone) {
    if (!isValid(phone)) {
      return phone;
    }
    var uglyPhone = uglify(phone);
    var phoneObj = breakdown(countryCode, uglyPhone);
    var results = layout;
    for (var prop in phoneObj) {
      if (phoneObj[prop]) {
        results = replaceLayout(results, phoneObj[prop], prop);
      }
    }
    return results;
  });

  var match = curry(function (x, y) {
    if (!isValid(x) || !isValid(y)) {
      return false;
    }
    return uglify(x) === uglify(y);
  });

  var phoneFns = function phoneFns() {
    var countryCode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    if (typeof countryCode !== 'string') {
      throw new TypeError('Country Code needs to be a string');
    }
    return {
      breakdown: breakdown(countryCode),
      format: format(countryCode),
      find: find(countryCode),
      isValid: isValid,
      match: match,
      uglify: uglify
    };
  };

  return phoneFns;

})));
