"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _useBlockly3 = _interopRequireDefault(require("./useBlockly"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var propTypes = {
  initialXml: _propTypes.default.string,
  toolboxConfiguration: _propTypes.default.object,
  // eslint-disable-line react/forbid-prop-types
  workspaceConfiguration: _propTypes.default.object,
  // eslint-disable-line react/forbid-prop-types
  customTools: _propTypes.default.arrayOf(_propTypes.default.object),
  // eslint-disable-line react/forbid-prop-types
  onWorkspaceChange: _propTypes.default.func,
  onImportXmlError: _propTypes.default.func,
  onXmlChange: _propTypes.default.func,
  onInject: _propTypes.default.func,
  onDispose: _propTypes.default.func,
  customTheme: _propTypes.default.any,
  useDefaultToolbox: _propTypes.default.bool
};
var defaultProps = {
  initialXml: null,
  toolboxConfiguration: null,
  workspaceConfiguration: null,
  onWorkspaceChange: function onWorkspaceChange() {},
  onImportXmlError: function onImportXmlError() {},
  onXmlChange: function onXmlChange() {},
  onInject: function onInject() {},
  onDispose: function onDispose() {},
  customTheme: null,
  useDefaultToolbox: false
};

function BlocklyWorkspace(_ref) {
  var initialXml = _ref.initialXml,
      toolboxConfiguration = _ref.toolboxConfiguration,
      workspaceConfiguration = _ref.workspaceConfiguration,
      onWorkspaceChange = _ref.onWorkspaceChange,
      onXmlChange = _ref.onXmlChange,
      onImportXmlError = _ref.onImportXmlError,
      onInject = _ref.onInject,
      onDispose = _ref.onDispose,
      customTheme = _ref.customTheme,
      customTools = _ref.customTools,
      className = _ref.className,
      _ref$useDefaultToolbo = _ref.useDefaultToolbox,
      useDefaultToolbox = _ref$useDefaultToolbo === void 0 ? false : _ref$useDefaultToolbo;

  var editorDiv = _react.default.useRef(null);

  var _useBlockly = (0, _useBlockly3.default)({
    ref: editorDiv,
    initialXml: initialXml,
    toolboxConfiguration: toolboxConfiguration,
    customTools: customTools,
    workspaceConfiguration: workspaceConfiguration,
    onWorkspaceChange: onWorkspaceChange,
    onXmlChange: onXmlChange,
    onImportXmlError: onImportXmlError,
    onInject: onInject,
    onDispose: onDispose,
    customTheme: customTheme,
    useDefaultToolbox: useDefaultToolbox
  }),
      _useBlockly2 = _slicedToArray(_useBlockly, 1),
      xml = _useBlockly2[0];

  var onXmlChangeRef = _react.default.useRef(onXmlChange);

  _react.default.useEffect(function () {
    onXmlChangeRef.current = onXmlChange;
  }, [onXmlChange]);

  _react.default.useEffect(function () {
    if (onXmlChangeRef.current && xml) {
      onXmlChangeRef.current(xml);
    }
  }, [xml]);

  return /*#__PURE__*/_react.default.createElement("div", {
    className: className,
    ref: editorDiv,
    style: {
      width: '100%',
      height: '100%'
    }
  });
}

BlocklyWorkspace.propTypes = propTypes;
BlocklyWorkspace.defaultProps = defaultProps;
var _default = BlocklyWorkspace;
exports.default = _default;