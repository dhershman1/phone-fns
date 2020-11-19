(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.phoneFns = {}));
}(this, (function (exports) { 'use strict';

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

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function getDefaultExportFromCjs (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, basedir, module) {
  	return module = {
  		path: basedir,
  		exports: {},
  		require: function (path, base) {
  			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
  		}
  	}, fn(module, module.exports), module.exports;
  }

  function commonjsRequire () {
  	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
  }

  var kyanite_min = createCommonjsModule(function (module, exports) {
    !function (n, r) {
       r(exports) ;
    }(commonjsGlobal, function (n) {
      function r(n) {
        return function r(t, e) {
          return arguments.length ? 1 === arguments.length ? function (r) {
            return n(t, r);
          } : n(t, e) : r;
        };
      }
      var t = function (n, r) {
        return n.push(r), n;
      },
          e = r(function (n, r) {
        return r % n;
      }),
          u = r(function (n, r) {
        return r.reduce(function (u, o, c) {
          return e(n, c) ? u : t(u, r.slice(c, c + n));
        }, []);
      }),
          o = r(function (n, r) {
        return r.concat(n);
      });
      function c(n) {
        return (c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (n) {
          return typeof n;
        } : function (n) {
          return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
        })(n);
      }
      function i() {
        return (i = Object.assign || function (n) {
          for (var r = 1; r < arguments.length; r++) {
            var t = arguments[r];
            for (var e in t) Object.prototype.hasOwnProperty.call(t, e) && (n[e] = t[e]);
          }
          return n;
        }).apply(this, arguments);
      }
      function a(n, r) {
        return l(n) || function (n, r) {
          if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(n))) return;
          var t = [],
              e = !0,
              u = !1,
              o = void 0;
          try {
            for (var c, i = n[Symbol.iterator](); !(e = (c = i.next()).done) && (t.push(c.value), !r || t.length !== r); e = !0);
          } catch (n) {
            u = !0, o = n;
          } finally {
            try {
              e || null == i.return || i.return();
            } finally {
              if (u) throw o;
            }
          }
          return t;
        }(n, r) || y(n, r) || h();
      }
      function f(n) {
        return l(n) || p(n) || y(n) || h();
      }
      function s(n) {
        return function (n) {
          if (Array.isArray(n)) return d(n);
        }(n) || p(n) || y(n) || function () {
          throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }();
      }
      function l(n) {
        if (Array.isArray(n)) return n;
      }
      function p(n) {
        if ("undefined" != typeof Symbol && Symbol.iterator in Object(n)) return Array.from(n);
      }
      function y(n, r) {
        if (n) {
          if ("string" == typeof n) return d(n, r);
          var t = Object.prototype.toString.call(n).slice(8, -1);
          return "Object" === t && n.constructor && (t = n.constructor.name), "Map" === t || "Set" === t ? Array.from(n) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? d(n, r) : void 0;
        }
      }
      function d(n, r) {
        (null == r || r > n.length) && (r = n.length);
        for (var t = 0, e = new Array(r); t < r; t++) e[t] = n[t];
        return e;
      }
      function h() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      function v(n) {
        return function t(e, u, o) {
          switch (arguments.length) {
            case 0:
              return t;
            case 1:
              return r(function (r, t) {
                return n(e, r, t);
              });
            case 2:
              return function (r) {
                return n(e, u, r);
              };
            default:
              return n(e, u, o);
          }
        };
      }
      var m = function (n) {
        return {
          "@@transducer/result": function (n) {
            return n;
          },
          "@@transducer/step": n
        };
      },
          b = v(function (n, r, t) {
        var e,
            u = m(n),
            o = function (n, r) {
          var t;
          if ("undefined" == typeof Symbol || null == n[Symbol.iterator]) {
            if (Array.isArray(n) || (t = y(n)) || r && n && "number" == typeof n.length) {
              t && (n = t);
              var e = 0,
                  u = function () {};
              return {
                s: u,
                n: function () {
                  return e >= n.length ? {
                    done: !0
                  } : {
                    done: !1,
                    value: n[e++]
                  };
                },
                e: function (n) {
                  throw n;
                },
                f: u
              };
            }
            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          }
          var o,
              c = !0,
              i = !1;
          return {
            s: function () {
              t = n[Symbol.iterator]();
            },
            n: function () {
              var n = t.next();
              return c = n.done, n;
            },
            e: function (n) {
              i = !0, o = n;
            },
            f: function () {
              try {
                c || null == t.return || t.return();
              } finally {
                if (i) throw o;
              }
            }
          };
        }(t);
        try {
          for (o.s(); !(e = o.n()).done;) {
            var c = e.value;
            if ((r = u["@@transducer/step"](c, r)) && r["@@transducer/reduced"]) {
              r = r["@@transducer/value"];
              break;
            }
          }
        } catch (n) {
          o.e(n);
        } finally {
          o.f();
        }
        return u["@@transducer/result"](r);
      }),
          g = r(function (n, r) {
        return b(function (r, t) {
          return o(n(r), t);
        }, [], r);
      }),
          w = v(function (n, r, t) {
        return n[r] = t, n;
      }),
          A = r(function (n, r) {
        return b(function (r, t) {
          var e = n(r),
              u = w(t, e);
          return Object.prototype.hasOwnProperty.call(t, e) ? u(t[e] + 1) : u(1);
        }, {}, r);
      }),
          O = r(function (n, r) {
        return b(function (r, e) {
          var u = n(r),
              o = w(e, u);
          return Object.prototype.hasOwnProperty.call(e, u) ? o(t(e[u], r)) : o([r]);
        }, {}, r);
      }),
          j = function (n) {
        return n;
      },
          S = function (n) {
        return b(function (r, e) {
          return t(e, n[r]);
        }, [], Object.keys(n));
      },
          k = r(function (n, r) {
        return S(r.reduce(function (r, t) {
          var e = n(t);
          return Object.prototype.hasOwnProperty.call(r, e) ? r : w(r, e, t);
        }, {}));
      }),
          N = k(j),
          x = r(function (n, r) {
        return b(function (r, e) {
          return n(r) ? t(e, r) : e;
        }, [], r);
      }),
          P = r(function (n, r) {
        return r.slice(n, 1 / 0);
      }),
          E = r(function (n, r) {
        for (var t = 0, e = r.length; t < e; t++) if (n(r[t])) return t;
        return -1;
      }),
          q = r(function (n, r) {
        var t = E(function (r) {
          return !n(r);
        }, r);
        return t < 0 ? [] : r.slice(t);
      }),
          I = function (n) {
        return null == n;
      },
          B = function (n) {
        return n && n["@@transducer/reduced"] ? n : {
          "@@transducer/value": n,
          "@@transducer/reduced": !0
        };
      },
          M = r(function (n, r) {
        return b(function (r, t) {
          return n(r) ? t : B(!1);
        }, !0, r);
      }),
          U = r(function (n, r) {
        return b(function (n, t) {
          return n(r) ? t : B(!1);
        }, !0, n);
      }),
          z = r(function (n, r) {
        return b(function (r, t) {
          return n(r) ? B(r) : t;
        }, void 0, r);
      }),
          C = v(function (n, r, t) {
        return n(t, r);
      }),
          T = r(function (n, r) {
        return r.reduce(C(n));
      }),
          W = v(function (n, r, t) {
        var e = n < t.length && n >= 0 ? n : t.length,
            u = t.slice(0);
        return u.splice(e, 0, r), u;
      }),
          D = function (n) {
        return Object.prototype.toString.call(n).slice(8, -1);
      },
          F = r(function (n, r) {
        var t = D(r);
        switch (t) {
          case "Array":
          case "String":
            return r.includes(n);
          case "Object":
          case "Arguments":
            return Object.prototype.hasOwnProperty.call(r, n);
          case "Map":
          case "Set":
            return r.has(n);
          default:
            throw new TypeError("Unsupported type: ".concat(t));
        }
      }),
          R = r(function (n, r) {
        var t = O(j, r);
        return N(x(function (n) {
          return F(n, t);
        }, n));
      }),
          L = r(function (n, r) {
        return r.join(n);
      }),
          _ = r(function (n, r) {
        for (var t = r.length, e = Array(t), u = 0; u < t; u++) w(e, u, n(r[u]));
        return e;
      }),
          Z = r(function (n, r) {
        return _(function (n) {
          return n.apply(void 0, s(r));
        }, n);
      }),
          $ = b(function (n, r) {
        return n >= r ? n : r;
      }, ""),
          G = r(function (n, r) {
        return r.reduce(function (r, t) {
          return n(r) >= n(t) ? r : t;
        });
      }),
          H = T(function (n, r) {
        return n <= r ? n : r;
      }),
          J = r(function (n, r) {
        return r.reduce(function (r, t) {
          return n(r) <= n(t) ? r : t;
        });
      }),
          K = r(function (n, r) {
        return b(function (r, e) {
          var u = a(e, 2),
              o = u[0],
              c = u[1];
          return n(r) ? [t(o, r), c] : [o, t(c, r)];
        }, [[], []], r);
      }),
          Q = r(function (n, r) {
        return r ? r[n] : void 0;
      }),
          V = r(function (n, r) {
        return _(Q(n), r);
      }),
          X = r(function (n, r) {
        return [].concat(n, r);
      }),
          Y = v(function (n, r, t) {
        for (var e = m(n), u = t.length - 1; u >= 0; u--) if ((r = e["@@transducer/step"](t[u], r)) && r["@@transducer/reduced"]) {
          r = r["@@transducer/value"];
          break;
        }
        return e["@@transducer/result"](r);
      }),
          nn = function (n) {
        return !n;
      },
          rn = r(function (n, r) {
        return nn(n(r));
      }),
          tn = r(function (n, r) {
        return x(rn(n), r);
      }),
          en = r(function (n, r) {
        return g(j, [r.slice(0, n), r.slice(n + 1)]);
      }),
          un = r(function (n, r) {
        return b(function (r, t) {
          return n(r) ? B(!0) : t;
        }, !1, r);
      }),
          on = r(function (n, r) {
        return b(function (n, t) {
          return n(r) ? B(!0) : t;
        }, !1, n);
      }),
          cn = r(function (n, r) {
        return r.slice().sort(n);
      }),
          an = function (n, r) {
        return n < r ? -1 : n > r ? 1 : 0;
      };
      function fn(n) {
        return function t(e, u, o, c) {
          switch (arguments.length) {
            case 0:
              return t;
            case 1:
              return v(function (r, t, u) {
                return n(e, r, t, u);
              });
            case 2:
              return r(function (r, t) {
                return n(e, u, r, t);
              });
            case 3:
              return function (r) {
                return n(e, u, o, r);
              };
            default:
              return n(e, u, o, c);
          }
        };
      }
      var sn = fn(function (n, r, t, e) {
        return n(r(t), r(e));
      }),
          ln = r(function (n, r) {
        return cn(sn(an, n), r);
      }),
          pn = r(function (n, r) {
        return s(r).sort(function (r, t) {
          return b(function (n, e) {
            return 0 === e ? n(r, t) : e;
          }, 0, n);
        });
      }),
          yn = r(function (n, r) {
        return r.slice(0, n);
      }),
          dn = r(function (n, r) {
        var t = E(function (r) {
          return !n(r);
        }, r);
        return t < 0 ? r : r.slice(0, t);
      }),
          hn = r(function (n, r) {
        return N(n.concat(r));
      }),
          vn = v(function (n, r, t) {
        return g(j, [t.slice(0, n), r, t.slice(n + 1)]);
      }),
          mn = r(function (n, r) {
        return (n.length < r.length ? n : r).reduce(function (t, e, u) {
          return w(t, n[u], r[u]);
        }, {});
      }),
          bn = r(function (n, r) {
        return n;
      }),
          gn = r(function (n, r) {
        return n && r;
      }),
          wn = v(function (n, r, t) {
        return n(t)(r(t));
      }),
          An = r(function (n, r) {
        return n(r);
      }),
          On = r(function (n, r) {
        return n.apply(void 0, s(r));
      }),
          jn = v(function (n, r, t) {
        return an(n(r), n(t));
      }),
          Sn = v(function (n, r, t) {
        return n(t) && r(t);
      }),
          kn = fn(function (n, r, t, e) {
        return n(e) ? r(e) : t(e);
      }),
          Nn = v(function (n, r, t) {
        return n(r(t));
      }),
          xn = v(function (n, r, t) {
        return r(t).then(n);
      }),
          Pn = r(function (n, r) {
        return b(function (n, t) {
          var e = a(n, 2),
              u = e[0],
              o = e[1];
          return u(r) ? B(o(r)) : t;
        }, null, n);
      }),
          En = v(function (n, r, t) {
        return n.apply(void 0, s(_(function (n) {
          return n(t);
        }, r)));
      }),
          qn = function (n) {
        return n.length;
      },
          In = Nn(qn, S),
          Bn = function (n) {
        var r = D(n);
        switch (r) {
          case "Array":
          case "String":
            return n.length;
          case "Object":
            return In(n);
          case "Map":
          case "Set":
            return n.size;
          default:
            throw new TypeError("Unsupported type: ".concat(r));
        }
      },
          Mn = r(function (n, r) {
        return n === r ? 0 !== n || 1 / n == 1 / r : n != n && r != r;
      }),
          Un = function (n) {
        var r = String(n).match(/^function (\w*)/);
        return null == r ? "" : r[1];
      },
          zn = function (n, r, t) {
        for (var e = 0, u = t.length; e < u; e++) if (n(r, t[e])) return !0;
        return !1;
      },
          Cn = function (n) {
        for (var r = [], t = null; !(t = n.next()).done;) r.push(t.value);
        return r;
      },
          Tn = function (n, r, t, e) {
        var u = Cn(n),
            o = Cn(r);
        function c(n, r) {
          return Wn(n, r, t.slice(), e.slice());
        }
        return !zn(function (n, r) {
          return !zn(c, r, n);
        }, o, u);
      },
          Wn = function n(r, t) {
        var e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [],
            u = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : [];
        if (Mn(r, t)) return !0;
        var o = D(r);
        if (o !== D(t) || null == r || null == t) return !1;
        if ("function" == typeof r.equals || "function" == typeof t.equals) return "function" == typeof r.equals && r.equals(t) && "function" == typeof t.equals && t.equals(r);
        switch (o) {
          case "Arguments":
          case "Array":
          case "Object":
            if ("function" == typeof r.constructor && "Promise" === Un(r.constructor)) return r === t;
            break;
          case "Boolean":
          case "Number":
          case "String":
            if (c(r) !== c(t) || !Mn(r.valueOf(), t.valueOf())) return !1;
            break;
          case "Date":
            if (!Mn(r.valueOf(), t.valueOf())) return !1;
            break;
          case "Error":
            return r.name === t.name && r.message === t.message;
          case "RegExp":
            if (r.source !== t.source || r.global !== t.global || r.ignoreCase !== t.ignoreCase || r.multiline !== t.multiline || r.sticky !== t.sticky || r.unicode !== t.unicode) return !1;
        }
        for (var i = e.length - 1; i >= 0; i--) if (e[i] === r) return u[i] === t;
        switch (o) {
          case "Map":
            return r.size === t.size && Tn(r.entries(), t.entries(), e.concat([r]), u.concat([t]));
          case "Set":
            return r.size === t.size && Tn(r.values(), t.values(), e.concat([r]), u.concat([t]));
          case "Arguments":
          case "Array":
          case "Object":
          case "Boolean":
          case "Number":
          case "String":
          case "Date":
          case "Error":
          case "RegExp":
          case "Int8Array":
          case "Uint8Array":
          case "Uint8ClampedArray":
          case "Int16Array":
          case "Uint16Array":
          case "Int32Array":
          case "Uint32Array":
          case "Float32Array":
          case "Float64Array":
          case "ArrayBuffer":
            break;
          default:
            return !1;
        }
        var a = Object.keys(r);
        if (a.length !== S(t).length) return !1;
        for (var f = e.concat([r]), s = u.concat([t]), l = a.length - 1; l >= 0; l--) {
          var p = a[l];
          if (!Object.prototype.hasOwnProperty.call(t, p) || !n(t[p], r[p], f, s)) return !1;
        }
        return !0;
      },
          Dn = r(Wn),
          Fn = r(function (n, r) {
        return I(r) || Mn(NaN, r) ? n : r;
      }),
          Rn = function (n, r) {
        return n > r ? -1 : n < r ? 1 : 0;
      },
          Ln = v(function (n, r, t) {
        return Rn(n(r), n(t));
      }),
          _n = v(function (n, r, t) {
        return n(t) || r(t);
      }),
          Zn = r(function (n, r) {
        try {
          return n(r);
        } catch (n) {
          return;
        }
      }),
          $n = v(function (n, r, t) {
        return Mn(n(r), n(t));
      }),
          Gn = r(function (n, r) {
        return r > n;
      }),
          Hn = r(function (n, r) {
        return r >= n;
      }),
          Jn = r(function (n, r) {
        return r < n;
      }),
          Kn = r(function (n, r) {
        return r <= n;
      }),
          Qn = r(function (n, r) {
        return rn(Mn(n), r);
      }),
          Vn = r(function (n, r) {
        return n || r;
      }),
          Xn = r(function (n, r) {
        return b(function (n, r) {
          return n(r);
        }, r, n);
      }),
          Yn = r(function (n, r) {
        return b(function (n, r) {
          return r.then(n);
        }, Promise.resolve(r), n);
      }),
          nr = v(function (n, r, t) {
        return n(t) ? t : r(t);
      }),
          rr = v(function (n, r, t) {
        return n(t) ? r(t) : t;
      }),
          tr = r(function (n, r) {
        return Boolean(!n ^ !r);
      }),
          er = v(function (n, r, t) {
        return t.slice(n, r);
      }),
          ur = r(function (n, r) {
        return Nn(Dn(n), er(-n.length, 1 / 0), r);
      }),
          or = r(function (n, r) {
        return -1 !== r.indexOf(n);
      }),
          cr = r(function (n, r) {
        return r[n < 0 ? r.length + n : n];
      }),
          ir = r(function (n, r) {
        return Nn(Dn(n), er(0, n.length), r);
      }),
          ar = r(function (n, r) {
        return n + r;
      }),
          fr = v(function (n, r, t) {
        return n <= t && r >= t;
      }),
          sr = v(function (n, r, t) {
        if (n > r) throw new Error("Min cannot be greater than max in clamp");
        return t > n && t < r ? t : t <= n ? n : r;
      }),
          lr = r(function (n, r) {
        return r / n;
      }),
          pr = r(function n(r, t) {
        return t ? n(t, r % t) : r;
      }),
          yr = Mn(0),
          dr = r(function (n, r) {
        return Math.abs(Math.floor(n / pr(n, r) * r));
      }),
          hr = function (n) {
        return lr(qn(n), b(ar, 0, n));
      },
          vr = r(function (n, r) {
        return un(j, [!Number.isInteger(n), !Number.isInteger(r), r < 1]) ? NaN : (n % r + r) % r;
      }),
          mr = r(function (n, r) {
        for (var e = [], u = 0; u < n; u++) {
          var o = u * r;
          if (o > n) return e;
          t(e, o);
        }
        return e;
      }),
          br = r(function (n, r) {
        return n * r;
      }),
          gr = r(function (n, r) {
        return Math.pow(r, n);
      }),
          wr = b(br, 1),
          Ar = r(function (n, r) {
        for (var t = [], e = Number(n), u = Number(r); e < u; e++) t.push(e);
        return t;
      }),
          Or = r(function (n, r) {
        return Number("".concat(Math.round("".concat(r, "e").concat(n)), "e-").concat(n));
      }),
          jr = r(function (n, r) {
        return r - n;
      }),
          Sr = b(ar, 0),
          kr = v(function (n, r, t) {
        return n < t && r > t;
      }),
          Nr = r(function (n, r) {
        return i({}, n, r);
      }),
          xr = r(function (n, r) {
        return Object.keys(n).some(function (t) {
          return n[t](r[t]);
        });
      }),
          Pr = r(function (n, r) {
        return b(function (t, e) {
          return w(e, t, n(r[t]));
        }, {}, Object.keys(r));
      }),
          Er = r(function (n, r) {
        return b(function (t, e) {
          return nn(or(t, n)) ? w(e, t, r[t]) : e;
        }, {}, Object.keys(r));
      }),
          qr = v(function (n, r, t) {
        return i({}, t, function (n, r, t) {
          return r in n ? Object.defineProperty(n, r, {
            value: t,
            enumerable: !0,
            configurable: !0,
            writable: !0
          }) : n[r] = t, n;
        }({}, n, r(t[n])));
      }),
          Ir = r(function n(r, t) {
        var e = f(r),
            u = e[0],
            o = e.slice(1);
        if (!I(t) && !I(t[u])) return o.length ? n(o, t[u]) : t[u];
      }),
          Br = v(function (n, r, t) {
        var e = Ir(r, t);
        return I(e) ? n : e;
      }),
          Mr = r(function (n, r) {
        return i({}, r, b(function (t, e) {
          return Object.prototype.hasOwnProperty.call(r, t) ? w(e, t, n[t](r[t])) : e;
        }, {}, Object.keys(n)));
      }),
          Ur = v(function (n, r, t) {
        return Nn(Mn(r), Q(n), t);
      }),
          zr = v(function (n, r, t) {
        var e = Q(r, t);
        return I(e) ? n : e;
      }),
          Cr = r(function (n, r) {
        return _(function (n) {
          return r[n];
        }, n);
      }),
          Tr = r(function (n, r) {
        return b(function (t, e) {
          return n(r[t]) ? w(e, t, r[t]) : e;
        }, {}, Object.keys(r));
      }),
          Wr = r(function (n, r) {
        return Object.keys(n).every(function (t) {
          return n[t](r[t]);
        });
      }),
          Dr = r(function (n, r) {
        return b(function (t, e) {
          return w(e, t, Fn(n[t], r[t]));
        }, {}, Object.keys(n));
      }),
          Fr = r(function (n, r) {
        var t = r.length,
            e = n.length,
            u = 0;
        if (e > t) return !1;
        if (e === t) return n === r;
        n: for (var o = 0; o < e; o++) {
          for (var c = n.charCodeAt(o); u < t; u++) if (r.charCodeAt(u) === c) continue n;
          return !1;
        }
        return !0;
      }),
          Rr = r(function (n, r) {
        return r.match(n);
      }),
          Lr = v(function (n, r, t) {
        return t.replace(n, r);
      }),
          _r = r(function (n, r) {
        return r.split(n);
      }),
          Zr = r(function (n, r) {
        return n.test(r);
      });
      n.F = function () {
        return !1;
      }, n.T = function () {
        return !0;
      }, n.add = ar, n.addIndex = function (n) {
        return function () {
          for (var r = 0, t = arguments.length, e = new Array(t), u = 0; u < t; u++) e[u] = arguments[u];
          var o = e[0],
              c = e[e.length - 1],
              i = e.slice();
          return i[0] = function () {
            for (var n = arguments.length, t = new Array(n), e = 0; e < n; e++) t[e] = arguments[e];
            var u = o.apply(void 0, s(g(j, [t, [r, c]])));
            return r += 1, u;
          }, n.apply(void 0, s(i));
        };
      }, n.always = bn, n.amend = Nr, n.and = gn, n.any = xr, n.ap = wn, n.apply = An, n.applyN = On, n.ascend = an, n.ascendBy = jn, n.between = fr, n.both = Sn, n.branch = kn, n.capitalize = function (n) {
        return n.charAt(0).toUpperCase() + n.slice(1);
      }, n.chunk = u, n.clamp = sr, n.complement = rn, n.compose = Nn, n.composeP = xn, n.concat = o, n.concatMap = g, n.cond = Pn, n.converge = En, n.count = Bn, n.countBy = A, n.curry = function n(r) {
        for (var t = arguments.length, e = new Array(t > 1 ? t - 1 : 0), u = 1; u < t; u++) e[u - 1] = arguments[u];
        return r.length <= e.length ? r.apply(void 0, e) : function () {
          for (var t = arguments.length, u = new Array(t), o = 0; o < t; o++) u[o] = arguments[o];
          return n.apply(void 0, [r].concat(e, u));
        };
      }, n.curryN = function n(r, t) {
        for (var e = arguments.length, u = new Array(e > 2 ? e - 2 : 0), o = 2; o < e; o++) u[o - 2] = arguments[o];
        return r <= 0 ? t.apply(void 0, u) : function () {
          for (var e = arguments.length, o = new Array(e), c = 0; c < e; c++) o[c] = arguments[c];
          return n.apply(void 0, [r - o.length, t].concat(u, o));
        };
      }, n.dec = function (n) {
        return n - 1;
      }, n.deepEq = Dn, n.defaultTo = Fn, n.descend = Rn, n.descendBy = Ln, n.difference = function (n) {
        var r = g(N, n),
            t = O(j, r);
        return x(function (n) {
          return 1 === t[n].length;
        }, r);
      }, n.divide = lr, n.draft = Pr, n.drop = P, n.dropWhile = q, n.either = _n, n.encase = Zn, n.endsWith = ur, n.ensureArray = function (n) {
        return Array.isArray(n) ? n : I(n) ? [] : [n];
      }, n.eq = Mn, n.eqBy = $n, n.every = M, n.everyPass = U, n.factors = function () {
        for (var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, r = [], e = 0, u = 1; u <= n; u++) (e = n / u) === Math.floor(e) && t(r, u);
        return r;
      }, n.filter = x, n.find = z, n.findIndex = E, n.first = function (n) {
        return n[0];
      }, n.flip = C, n.fold = T, n.fuzzySearch = Fr, n.gcd = pr, n.groupBy = O, n.gt = Gn, n.gte = Hn, n.has = F, n.height = In, n.identity = j, n.inc = function (n) {
        return n + 1;
      }, n.includes = or, n.insert = W, n.intersection = R, n.isEmpty = function (n) {
        return I(n) || !Bn(n);
      }, n.isEven = function (n) {
        return gn(!Mn(n, NaN), Mn(n % 2, 0));
      }, n.isNil = I, n.isOdd = function (n) {
        if (!Mn(n, NaN)) {
          var r = Mn(n % 2);
          return !r(NaN) && !r(0);
        }
        return !1;
      }, n.isPrime = function (n) {
        for (var r = 2, t = Math.sqrt(n); r <= t; r++) if (!e(r, n)) return !1;
        return n > 1;
      }, n.isZero = yr, n.join = L, n.juxt = Z, n.last = function (n) {
        return n[n.length - 1];
      }, n.lcm = dr, n.length = qn, n.lt = Jn, n.lte = Kn, n.map = _, n.match = Rr, n.max = $, n.maxBy = G, n.mean = hr, n.median = function (n) {
        var r = n.length;
        if (0 === r) return NaN;
        var t = 2 - r % 2,
            e = (r - t) / 2;
        return Xn([cn(an), er(e, e + t), hr], n);
      }, n.min = H, n.minBy = J, n.mod = vr, n.multiples = mr, n.multiply = br, n.negate = function (n) {
        return -n;
      }, n.not = nn, n.notEq = Qn, n.nth = cr, n.omit = Er, n.on = sn, n.or = Vn, n.over = qr, n.partition = K, n.path = Ir, n.pathOr = Br, n.pipe = Xn, n.pipeP = Yn, n.plan = Mr, n.pluck = V, n.pow = gr, n.prepend = X, n.product = wr, n.prop = Q, n.propEq = Ur, n.propOr = zr, n.props = Cr, n.range = Ar, n.reduce = b, n.reduceRight = Y, n.reduced = B, n.reject = tn, n.rem = e, n.remove = en, n.replace = Lr, n.reverse = function (n) {
        return Array.isArray(n) ? n.slice().reverse() : n.split("").reverse().join("");
      }, n.round = Or, n.sift = Tr, n.slice = er, n.some = un, n.somePass = on, n.sort = cn, n.sortBy = ln, n.sortWith = pn, n.split = _r, n.startsWith = ir, n.subtract = jr, n.sum = Sr, n.tail = function (n) {
        return f(n).slice(1);
      }, n.take = yn, n.takeWhile = dn, n.test = Zr, n.toLower = function (n) {
        return n.toLowerCase();
      }, n.toUpper = function (n) {
        return n.toUpperCase();
      }, n.trim = function (n) {
        return n.trim();
      }, n.type = D, n.union = hn, n.uniq = N, n.uniqBy = k, n.unless = nr, n.update = vn, n.values = S, n.when = rr, n.whole = Wr, n.withDefaults = Dr, n.within = kr, n.xor = tr, n.zip = mn, Object.defineProperty(n, "__esModule", {
        value: !0
      });
    });
  });
  getDefaultExportFromCjs(kyanite_min);

  var uglify = kyanite_min.compose(kyanite_min.replace(/[a-z]\w?|\W/gi, ''), String);

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
      return kyanite_min.test(/^([0-9]{3})[-. ]?([0-9]{4})$/, localCode + lineNumber);
    };
  }
  function longNumberTest(phone) {
    return function () {
      var _breakdown2 = breakdown(phone),
          areaCode = _breakdown2.areaCode,
          localCode = _breakdown2.localCode,
          lineNumber = _breakdown2.lineNumber;
      return kyanite_min.test(/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/, areaCode + localCode + lineNumber);
    };
  }
  var isValid = function isValid(phone) {
    var uglyPhone = uglify(phone);
    var done = kyanite_min.compose(kyanite_min.reduced);
    return kyanite_min.pipe([kyanite_min.when(kyanite_min.isEmpty, done(kyanite_min.F)), kyanite_min.length, kyanite_min.when(kyanite_min.lt(7), done(kyanite_min.F)), kyanite_min.when(kyanite_min.eq(7), shortNumberTest(uglyPhone)), longNumberTest(uglyPhone)], uglyPhone);
  };

  var validFormat = function validFormat(layout) {
    return function (phone) {
      var _compose = kyanite_min.compose(kyanite_min.countBy(kyanite_min.toUpper), kyanite_min.split(''), layout),
          N = _compose.N,
          _compose$C = _compose.C,
          C = _compose$C === void 0 ? 0 : _compose$C;
      return kyanite_min.pipe([uglify, kyanite_min.length, kyanite_min.eq(kyanite_min.add(N, C))], phone);
    };
  };
  var format = function format(layout, phone) {
    var cCount = kyanite_min.includes('C', layout) ? kyanite_min.length(layout.match(/C/g)) : 0;
    var _reduce = kyanite_min.addIndex(kyanite_min.reduce);
    return kyanite_min.branch(kyanite_min.both(kyanite_min.complement(isValid), kyanite_min.complement(validFormat(layout))), kyanite_min.identity, kyanite_min.pipe([kyanite_min.split(''), uglify, _reduce(function (d, acc, i) {
      return kyanite_min.gt(i, cCount) ? kyanite_min.replace(/C/i, d, acc) : kyanite_min.replace(/N/i, d, acc);
    }, layout)]), phone);
  };
  var format$1 = _curry2(format);

  exports.breakdown = breakdown;
  exports.format = format$1;
  exports.isValid = isValid;
  exports.uglify = uglify;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
