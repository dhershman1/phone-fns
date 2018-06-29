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

  var breakdown = function breakdown(countryCode, phone) {
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
  };
  var breakdown$1 = curry(breakdown);

  var find = function find(type, phone) {
    return breakdown$1('', phone)[type];
  };
  var find$1 = curry(find);

  var isValid = (function (phone) {
    var uglyPhone = uglify(phone);
    if (!phone || uglyPhone.length < 7) {
      return false;
    }
    var _breakdown = breakdown$1('', uglyPhone),
        areaCode = _breakdown.areaCode,
        localCode = _breakdown.localCode,
        lineNumber = _breakdown.lineNumber;
    if (uglyPhone.length === 7) {
      return /^([0-9]{3})[-. ]?([0-9]{4})$/.test(localCode + lineNumber);
    }
    return /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/.test(areaCode + localCode + lineNumber);
  });

  var validFormat = function validFormat(phone, layout) {
    var count = layout.split('').reduce(function (acc, v) {
      if (v.toLowerCase() === 'n') {
        acc++;
      }
      return acc;
    }, 0);
    return count === phone.length;
  };
  var format = function format(cc, layout, phone) {
    var fullPhone = "".concat(cc).concat(uglify(phone));
    if (!isValid(phone) || !validFormat(fullPhone, layout)) {
      return phone;
    }
    var results = fullPhone.split('').reduce(function (acc, d) {
      var temp = acc.replace(/N/i, d);
      return temp;
    }, layout);
    return results;
  };
  var format$1 = curry(format);

  var match = function match(x, y) {
    if (!isValid(x) || !isValid(y)) {
      return false;
    }
    return uglify(x) === uglify(y);
  };
  var match$1 = curry(match);

  var phoneFns = function phoneFns() {
    var countryCode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    if (typeof countryCode !== 'string' && typeof countryCode !== 'number') {
      throw new TypeError('Country Code needs to be a string or number');
    }
    var ccStr = String(countryCode);
    return {
      breakdown: breakdown$1(ccStr),
      format: format$1(ccStr),
      find: find$1(ccStr),
      isValid: isValid,
      match: match$1,
      uglify: uglify
    };
  };

  return phoneFns;

})));
