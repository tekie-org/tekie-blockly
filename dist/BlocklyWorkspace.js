"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _useBlockly = _interopRequireDefault(require("./useBlockly"));

var _defaultConfig = _interopRequireDefault(require("./defaultConfig"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const propTypes = {
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
  customTheme: _propTypes.default.any
};
const defaultProps = {
  initialXml: null,
  toolboxConfiguration: null,
  workspaceConfiguration: null,
  onWorkspaceChange: () => {},
  onImportXmlError: () => {},
  onXmlChange: () => {},
  onInject: () => {},
  onDispose: () => {},
  customTheme: null
};

function BlocklyWorkspace(_ref) {
  let {
    initialXml,
    toolboxConfiguration,
    workspaceConfiguration,
    onWorkspaceChange,
    onXmlChange,
    onImportXmlError,
    onInject,
    onDispose,
    customTheme,
    customTools,
    className
  } = _ref;

  const editorDiv = _react.default.useRef(null);

  const [xml] = (0, _useBlockly.default)({
    ref: editorDiv,
    initialXml,
    toolboxConfiguration: toolboxConfiguration || _defaultConfig.default.INITIAL_TOOLBOX_JSON,
    customTools: customTools,
    workspaceConfiguration,
    onWorkspaceChange,
    onXmlChange,
    onImportXmlError,
    onInject,
    onDispose,
    customTheme: customTheme
  });

  const onXmlChangeRef = _react.default.useRef(onXmlChange);

  _react.default.useEffect(() => {
    onXmlChangeRef.current = onXmlChange;
  }, [onXmlChange]);

  _react.default.useEffect(() => {
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