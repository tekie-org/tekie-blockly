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
  shouldUpdateXML: PropTypes.bool,
  blocklyKey: PropTypes.string,
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
  shouldUpdateXML: false,
  blocklyKey: null
};
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
  shouldUpdateXML = false,
  blocklyKey = null
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
    shouldUpdateXML
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