"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = debounce;

function debounce(func, wait) {
  var timeout = null;
  var later = null;

  var debouncedFunction = function debouncedFunction() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    later = function later() {
      timeout = null;
      func.apply(void 0, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };

  var cancel = function cancel() {
    if (timeout !== null) {
      clearTimeout(timeout);
      later();
    }
  };

  return [debouncedFunction, cancel];
}