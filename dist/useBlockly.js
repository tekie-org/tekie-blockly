"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.promise.js");

var _react = _interopRequireDefault(require("react"));

var _blockly = _interopRequireDefault(require("blockly"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _debounce = _interopRequireDefault(require("./utils/debounce"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

const useBlockly = _ref => {
  let {
    ref,
    initialXml,
    toolboxConfiguration,
    workspaceConfiguration,
    onWorkspaceChange,
    onImportXmlError,
    onInject,
    onDispose,
    customTheme,
    customTools
  } = _ref;

  const [workspace, setWorkspace] = _react.default.useState(null);

  const [xml, setXml] = _react.default.useState(initialXml);

  const [didInitialImport, setDidInitialImport] = _react.default.useState(false);

  const [didHandleNewWorkspace, setDidHandleNewWorkspace] = _react.default.useState(false);
  /** Inject & Dispose ref init */


  const onInjectRef = _react.default.useRef(onInject);

  const onDisposeRef = _react.default.useRef(onDispose);

  _react.default.useEffect(() => {
    onInjectRef.current = onInject;
  }, [onInject]);

  _react.default.useEffect(() => {
    onDisposeRef.current = onDispose;
  }, [onDispose]);
  /** Update Workspace configuration */


  const workspaceConfigurationRef = _react.default.useRef(workspaceConfiguration);

  _react.default.useEffect(() => {
    workspaceConfigurationRef.current = workspaceConfiguration;
  }, [workspaceConfiguration]);
  /** 
   * Toolbox configuration can be either a JSON from Blockly's official documentation 
   * i.e @params toolboxConfiguration
   * or it can be array of @params customTools.
  */


  const toolboxConfigurationRef = _react.default.useRef(toolboxConfiguration);

  _react.default.useEffect(() => {
    try {
      /** Toolbox will not be initialized is workspace is readOnly */
      if (!workspaceConfiguration.readOnly) {
        if (toolboxConfiguration && workspace) {
          toolboxConfigurationRef.current = toolboxConfiguration;
          workspace.updateToolbox(toolboxConfiguration);
        }
      }
    } catch (e) {
      console.log('useBlockly (ERROR) ==> ', e);
    }
  }, [toolboxConfiguration, workspace]);

  _react.default.useEffect(() => {
    /** Toolbox will not be initialized is workspace is readOnly */
    if (!workspaceConfiguration.readOnly) {
      try {
        (async () => {
          if (customTools) {
            await (0, _utils.initCustomTools)(customTools);
            const CustomToolboxJSON = await (0, _utils.buildToolboxJSON)(customTools);

            if (CustomToolboxJSON && workspace) {
              if (toolboxConfigurationRef.current && toolboxConfigurationRef.current.kind !== CustomToolboxJSON.kind) {
                /** Blockly doesn't support dynamic change of toolbox mode i.e it can be either of kind flyout or category */
                throw new Error('Cannot Change Toolbox Mode');
              } else {
                workspace.updateToolbox(CustomToolboxJSON);
                toolboxConfigurationRef.current = CustomToolboxJSON;
              }
            }
          }
        })();
      } catch (e) {
        console.log('useBlockly (ERROR) ==> ', e);
      }
    }
  }, [customTools, workspace]);
  /** Trigger when workspace changes helpful in executing code of given blocks */


  const handleWorkspaceChanged = _react.default.useCallback(newWorkspace => {
    if (onWorkspaceChange) {
      onWorkspaceChange(newWorkspace);
    }
  }, [onWorkspaceChange]);
  /** Initial Workspace Creation */


  _react.default.useEffect(() => {
    const newWorkspace = _blockly.default.inject(ref.current, _objectSpread(_objectSpread({}, workspaceConfigurationRef.current), {}, {
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


    return () => {
      try {
        newWorkspace.dispose();

        if (onDisposeRef.current) {
          onDisposeFunction(newWorkspace);
        }
      } catch (e) {
        console.log('useBlockly [ERROR]-->', e);
      }
    };
  }, [toolboxConfigurationRef]);
  /** 
   * Send a workspace change event when the workspace is created 
   */


  _react.default.useEffect(() => {
    if (workspace && !didHandleNewWorkspace) {
      handleWorkspaceChanged(workspace);
    }
  }, [handleWorkspaceChanged, didHandleNewWorkspace, workspace]);
  /**
   * Workspace change listener
   */


  _react.default.useEffect(() => {
    if (workspace == null) {
      return undefined;
    }

    const listener = () => {
      handleWorkspaceChanged(workspace);
    };

    workspace.addChangeListener(listener);
    return () => {
      workspace.removeChangeListener(listener);
    };
  }, [workspace, handleWorkspaceChanged]);
  /** 
   * xmlDidChange callback
   */


  _react.default.useEffect(() => {
    if (workspace == null) {
      return undefined;
    }

    const [callback, cancel] = (0, _debounce.default)(() => {
      const newXml = _blockly.default.Xml.domToText(_blockly.default.Xml.workspaceToDom(workspace));

      if (newXml === xml) {
        return;
      }

      setXml(newXml);
    }, 200);
    workspace.addChangeListener(callback);
    return () => {
      workspace.removeChangeListener(callback);
      cancel();
    };
  }, [workspace, xml]);
  /**
   * Custom Blockly Theme
   */


  _react.default.useEffect(() => {
    try {
      if (workspace && customTheme) {
        workspace.setTheme(customTheme);
      }
    } catch (e) {
      console.log('useBlockly [ERROR]-->', e);
    }
  }, [customTheme, workspace]);
  /**
   * Initial Xml Changes
   */


  _react.default.useEffect(() => {
    if (xml && workspace && !didInitialImport) {
      const success = (0, _utils.importFromXml)(xml, workspace, onImportXmlError);

      if (!success) {
        setXml(null);
      }

      setDidInitialImport(true);
    }
  }, [xml, workspace, didInitialImport, onImportXmlError]);

  return [workspace, xml];
};

useBlockly.propTypes = propTypes;
useBlockly.defaultProps = defaultProps;
var _default = useBlockly;
exports.default = _default;