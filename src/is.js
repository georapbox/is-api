(function (name, context, definition) {
  'use strict';
  /* istanbul ignore next */
  if (typeof define === 'function' && define.amd) {
    define(definition);
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = definition();
  } else {
    context[name] = definition();
  }
}('is', this, function () {
  'use strict';

  var coreIS;
  var interfaces = ['not', 'all', 'any'];
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

  function makeInterface(interfacesArr, method) {
    var i = 0;
    var len = interfacesArr.length;

    for (i; i < len; i += 1) {
      switch (interfacesArr[i]) {
        case 'not': coreIS.not[method] = coreIS.not(coreIS[method]); break;
        case 'all': coreIS.all[method] = coreIS.all(coreIS[method]); break;
        case 'any': coreIS.any[method] = coreIS.any(coreIS[method]); break;
        default: break;
      }
    }
  }

  function applyInterfaces(interfacesArr) {
    var prop;

    for (prop in coreIS) {
      if (hasOwnProperty.call(coreIS, prop)) {
        if (typeof coreIS[prop] === 'function') {
          if (interfaces.indexOf(prop) === -1 && prop !== 'extend') {
            makeInterface(interfacesArr, prop);
          }
        }
      }
    }
  }

  function extendApiMethods(options) {
    var prop;

    for (prop in options) {
      if (hasOwnProperty.call(options, prop)) {
        if (typeof options[prop] === 'function' && interfaces.indexOf(prop) === -1 && prop !== 'extend') {
          coreIS[prop] = options[prop];
        }
      }
    }

    applyInterfaces(interfaces);
  }

  return coreIS = {
    not: not,
    all: all,
    any: any,
    extend: extendApiMethods
  };
}));
