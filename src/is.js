(function (name, context, definition) {
  'use strict';
  /* istanbul ignore next */
  if (typeof define === 'function' && define.amd) {
    define(definition);
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = definition();
  } else {
    context[name] = definition(name, context);
  }
}('is', this, function (name, context) {
  'use strict';

  var is;
  var oldPublicAPI = (context || {})[name];
  var interfaces = ['not', 'all', 'any'];
  var publicMethods = ['extend', 'noConflict'];
  var arraySlice = Array.prototype.slice;
  var hasOwnProperty = Object.prototype.hasOwnProperty;

  function not(func) {
    return function () {
      return !func.apply(null, arraySlice.call(arguments));
    };
  }

  function all(func) {
    return function () {
      var args = arraySlice.call(arguments);
      var length = args.length;
      var index;

      for (index = 0; index < length; index += 1) {
        if (!func.call(null, args[index])) {
          return false;
        }
      }

      return true;
    };
  }

  function any(func) {
    return function () {
      var args = arraySlice.call(arguments);
      var length = args.length;
      var index;

      for (index = 0; index < length; index += 1) {
        if (func.call(null, args[index])) {
          return true;
        }
      }

      return false;
    };
  }

  function makeInterface(method) {
    var i = 0;
    var len = interfaces.length;

    for (i; i < len; i += 1) {
      switch (interfaces[i]) {
        case 'not': is.not[method] = is.not(is[method]); break;
        case 'all': is.all[method] = is.all(is[method]); break;
        case 'any': is.any[method] = is.any(is[method]); break;
      }
    }
  }

  function applyInterfaces() {
    var prop;

    for (prop in is) {
      if (hasOwnProperty.call(is, prop)) {
        if (interfaces.indexOf(prop) === -1 && publicMethods.indexOf(prop) === -1) {
          makeInterface(prop);
        }
      }
    }
  }

  function extend(options) {
    var prop;

    for (prop in options) {
      if (hasOwnProperty.call(options, prop)) {
        if (typeof options[prop] !== 'function') {
          throw new TypeError('A function is expected to extend the API with.');
        }

        if (interfaces.indexOf(prop) === -1 && publicMethods.indexOf(prop) === -1) {
          is[prop] = options[prop];
        } else {
          throw new Error(prop + ' is a reserved property from the library and cannot be overwritten. Reserved words are: not, any, all, extend and noConflict.');
        }
      }
    }

    applyInterfaces();
  }

  /* istanbul ignore next */
  function noConflict() {
    if (context) {
      context[name] = oldPublicAPI;
    }
    return is;
  }

  return is = {
    not: not,
    all: all,
    any: any,
    extend: extend,
    noConflict: noConflict
  };
}));
