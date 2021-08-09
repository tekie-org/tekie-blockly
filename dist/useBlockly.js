"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _blockly = _interopRequireDefault(require("blockly"));

var _debounce3 = _interopRequireDefault(require("./utils/debounce"));

var _defaultConfig = _interopRequireDefault(require("./defaultConfig"));

var _utils = require("./utils");

require("./customCategory");

require("./customTheme");

require("./customStyle.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * ~ Blockly React Hook
 * @param ref Workspace Div Reference
 * @param initialXml Initial Blocks to show in workpace (This have to be in XML format)
 * @param toolboxConfiguration toolbox configuration from blockly's official documentation 
 * @param customTools custom toolbox configration, format -> { name, category, block, generator }
 * @param workspaceConfiguration self explanatory refer: https://developers.google.com/blockly/guides/configure/web/configuration_struct
 * @param onWorkspaceChange self explanatory 
 * @param customTheme self explanatory 
 * @param onImportXmlError
 * @param onInject
 * @param onDispose
 * @returns [ xml, workspace ]
 */
var useBlockly = function useBlockly(_ref) {
  var ref = _ref.ref,
      initialXml = _ref.initialXml,
      toolboxConfiguration = _ref.toolboxConfiguration,
      _ref$workspaceConfigu = _ref.workspaceConfiguration,
      workspaceConfiguration = _ref$workspaceConfigu === void 0 ? {
    readOnly: false
  } : _ref$workspaceConfigu,
      onWorkspaceChange = _ref.onWorkspaceChange,
      onImportXmlError = _ref.onImportXmlError,
      onInject = _ref.onInject,
      onDispose = _ref.onDispose,
      customTheme = _ref.customTheme,
      customTools = _ref.customTools,
      _ref$useDefaultToolbo = _ref.useDefaultToolbox,
      useDefaultToolbox = _ref$useDefaultToolbo === void 0 ? false : _ref$useDefaultToolbo;

  var _React$useState = _react.default.useState(null),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      workspace = _React$useState2[0],
      setWorkspace = _React$useState2[1];

  var _React$useState3 = _react.default.useState(initialXml),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      xml = _React$useState4[0],
      setXml = _React$useState4[1];

  var _React$useState5 = _react.default.useState(false),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      didInitialImport = _React$useState6[0],
      setDidInitialImport = _React$useState6[1];

  var _React$useState7 = _react.default.useState(false),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      didHandleNewWorkspace = _React$useState8[0],
      setDidHandleNewWorkspace = _React$useState8[1];

  workspaceConfiguration = workspaceConfiguration || _defaultConfig.default.DEFAULT_WORKSPACE_JSON;
  toolboxConfiguration = useDefaultToolbox ? _defaultConfig.default.INITIAL_TOOLBOX_JSON : toolboxConfiguration;

  var onInjectRef = _react.default.useRef(onInject);

  var onDisposeRef = _react.default.useRef(onDispose);

  var workspaceConfigurationRef = _react.default.useRef(workspaceConfiguration);

  var toolboxConfigurationRef = _react.default.useRef(toolboxConfiguration);
  /** Inject & Dispose ref init */


  _react.default.useEffect(function () {
    onInjectRef.current = onInject;
  }, [onInject]);

  _react.default.useEffect(function () {
    onDisposeRef.current = onDispose;
  }, [onDispose]);
  /** Update Workspace configuration */


  _react.default.useEffect(function () {
    workspaceConfigurationRef.current = workspaceConfiguration;
  }, [workspaceConfiguration]);
  /** 
   * Toolbox configuration can be either a JSON from Blockly's official documentation 
   * i.e @params toolboxConfiguration
   * or it can be array of @params customTools.
  */


  _react.default.useEffect(function () {
    try {
      /** Toolbox will not be initialized is workspace is readOnly */
      if (workspaceConfiguration.readOnly !== true) {
        if (toolboxConfiguration && workspace) {
          toolboxConfigurationRef.current = toolboxConfiguration;
          workspace.updateToolbox(toolboxConfiguration);
        }
      }
    } catch (e) {
      console.error('From useBlockly ==> ', e);
    }
  }, [toolboxConfiguration, workspace]);

  _react.default.useEffect(function () {
    /** Toolbox will not be initialized is workspace is readOnly */
    if (workspaceConfiguration.readOnly !== true) {
      console.log('CHECKING', customTools);

      try {
        _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var CustomToolboxJSON;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!customTools) {
                    _context.next = 13;
                    break;
                  }

                  _context.next = 3;
                  return (0, _utils.initCustomTools)(customTools);

                case 3:
                  _context.next = 5;
                  return (0, _utils.buildToolboxJSON)(customTools);

                case 5:
                  CustomToolboxJSON = _context.sent;

                  if (!(CustomToolboxJSON && workspace)) {
                    _context.next = 13;
                    break;
                  }

                  if (!(toolboxConfigurationRef.current && toolboxConfigurationRef.current.kind !== CustomToolboxJSON.kind)) {
                    _context.next = 11;
                    break;
                  }

                  throw new Error('Cannot Change Toolbox Mode');

                case 11:
                  workspace.updateToolbox(CustomToolboxJSON);
                  toolboxConfigurationRef.current = CustomToolboxJSON;

                case 13:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }))();
      } catch (e) {
        console.error('From useBlockly ==> ', e);
      }
    }
  }, [customTools, workspace]);
  /** Trigger when workspace changes helpful in executing code of given blocks */


  var handleWorkspaceChanged = _react.default.useCallback(function (newWorkspace) {
    if (onWorkspaceChange) {
      onWorkspaceChange(newWorkspace);
    }
  }, [onWorkspaceChange]);
  /** Initial Workspace Creation */


  _react.default.useEffect(function () {
    var newWorkspace = _blockly.default.inject(ref.current, _objectSpread(_objectSpread({}, workspaceConfigurationRef.current), {}, {
      toolbox: toolboxConfigurationRef.current
    }));

    setWorkspace(newWorkspace);
    setDidInitialImport(false); // force a re-import if we recreate the workspace

    setDidHandleNewWorkspace(false); // Singal that a workspace change event needs to be sent.

    if (onInjectRef.current && newWorkspace) {
      onInjectRef.current(newWorkspace);
    }
    /** 
     * Dispose of the workspace when our div ref goes away (Equivalent to didComponentUnmount) 
     */


    return function () {
      try {
        newWorkspace.dispose();

        if (onDisposeRef.current) {
          onDisposeFunction(newWorkspace);
        }
      } catch (e) {
        console.error('From useBlockly ==> ', e);
      }
    };
  }, [toolboxConfigurationRef]);
  /** 
   * Send a workspace change event when the workspace is created 
   */


  _react.default.useEffect(function () {
    if (workspace && !didHandleNewWorkspace) {
      handleWorkspaceChanged(workspace);
    }
  }, [handleWorkspaceChanged, didHandleNewWorkspace, workspace]);
  /**
   * Workspace change listener
   */


  _react.default.useEffect(function () {
    if (workspace == null) {
      return undefined;
    }

    var listener = function listener() {
      handleWorkspaceChanged(workspace);
    };

    workspace.addChangeListener(listener);
    return function () {
      workspace.removeChangeListener(listener);
    };
  }, [workspace, handleWorkspaceChanged]);
  /** 
   * xmlDidChange callback
   */


  _react.default.useEffect(function () {
    if (workspace == null) {
      return undefined;
    }

    var _debounce = (0, _debounce3.default)(function () {
      var newXml = _blockly.default.Xml.domToText(_blockly.default.Xml.workspaceToDom(workspace));

      if (newXml === xml) {
        return;
      }

      setXml(newXml);
    }, 200),
        _debounce2 = _slicedToArray(_debounce, 2),
        callback = _debounce2[0],
        cancel = _debounce2[1];

    workspace.addChangeListener(callback);
    return function () {
      workspace.removeChangeListener(callback);
      cancel();
    };
  }, [workspace, xml]);
  /**
   * Custom Blockly Theme
   */


  _react.default.useEffect(function () {
    try {
      var blocklyTheme = customTheme || _blockly.default.Theme.TekiePrimary;

      if (workspace && blocklyTheme) {
        workspace.setTheme(blocklyTheme);
      }
    } catch (e) {
      console.error('From useBlockly ==> ', e);
    }
  }, [customTheme, workspace]);
  /**
   * Initial Xml Changes
   */


  _react.default.useEffect(function () {
    if (xml && workspace && !didInitialImport) {
      var success = (0, _utils.importFromXml)(xml, workspace, onImportXmlError);

      if (!success) {
        setXml(null);
      }

      setDidInitialImport(true);
    }
  }, [xml, workspace, didInitialImport, onImportXmlError]);

  return [workspace, xml];
};

var _default = useBlockly;
exports.default = _default;