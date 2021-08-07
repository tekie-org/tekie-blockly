"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = debounce;

require("core-js/modules/web.dom-collections.iterator.js");

function debounce(func, wait) {
  let timeout = null;
  let later = null;

  const debouncedFunction = function debouncedFunction() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    later = () => {
      timeout = null;
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };

  const cancel = () => {
    if (timeout !== null) {
      clearTimeout(timeout);
      later();
    }
  };

  return [debouncedFunction, cancel];
}