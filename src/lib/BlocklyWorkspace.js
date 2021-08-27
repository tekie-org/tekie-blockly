import React from "react";
import PropTypes from "prop-types";
import Blockly from "blockly";
import useBlockly from "./useBlockly";

const propTypes = {
  initialXml: PropTypes.string,
  toolboxConfiguration: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  workspaceConfiguration: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  customTools: PropTypes.arrayOf(PropTypes.object), // eslint-disable-line react/forbid-prop-types
  onWorkspaceChange: PropTypes.func,
  onImportXmlError: PropTypes.func,
  onXmlChange: PropTypes.func,
  onInject: PropTypes.func,
  onDispose: PropTypes.func,
  customTheme: PropTypes.any,
  useDefaultToolbox: PropTypes.bool,
  blocklyKey: PropTypes.string,
  toolboxMode: PropTypes.oneOf(['default'])
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
  customTheme: null,
  useDefaultToolbox: false,
  blocklyKey: null,
  toolboxMode: null
};

/**
 * ~ Blockly React Component
 * @param initialXml Initial Blocks to show in workpace (This have to be in XML format)
 * @param toolboxConfiguration toolbox configuration from blockly's official documentation 
 * @param workspaceConfiguration self explanatory refer: https://developers.google.com/blockly/guides/configure/web/configuration_struct
 * @param onWorkspaceChange self explanatory 
 * @param onXmlChange
 * @param onImportXmlError
 * @param onDispose
 * @param onInject
 * @param customTheme self explanatory 
 * @param customTools custom toolbox configration, format -> { name, category, block, generator }
 * @param className
 * @param useDefaultToolbox
 * @param blocklyKey
 * @param toolboxMode - default |
 * @returns React El ~ Blockly Workspace
 */
function BlocklyWorkspace({
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
  className,
  useDefaultToolbox = false,
  blocklyKey = null,
  toolboxMode = null
}) {
  const editorDiv = React.useRef(null);
  const [ workspace, xml ] = useBlockly({
    ref: editorDiv,
    initialXml,
    toolboxConfiguration,
    customTools,
    workspaceConfiguration,
    onWorkspaceChange,
    onXmlChange,
    onImportXmlError,
    onInject,
    onDispose,
    customTheme,
    useDefaultToolbox,
    toolboxMode
  });

  const onXmlChangeRef = React.useRef(onXmlChange);
  React.useEffect(() => {
    onXmlChangeRef.current = onXmlChange;
  }, [onXmlChange]);
  React.useEffect(() => {
    if (onXmlChangeRef.current && xml) {
      onXmlChangeRef.current(xml);
    }
  }, [xml]);

  React.useEffect(() => {
    if (workspace && blocklyKey) {
      window[`${blocklyKey}Workspace`] = workspace
      window[`${blocklyKey}Blockly`] = Blockly
    }
  }, [workspace]);

  return <div className={className} ref={editorDiv} style={{ width: '100%', height: '100%' }} />;
}

BlocklyWorkspace.propTypes = propTypes;
BlocklyWorkspace.defaultProps = defaultProps;

export default BlocklyWorkspace;