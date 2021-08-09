import React from "react";
import PropTypes from "prop-types";
import useBlockly from "./useBlockly";
import ConfigFiles from './defaultConfig'

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
  className
}) {
  const editorDiv = React.useRef(null);
  const [ xml ] = useBlockly({
    ref: editorDiv,
    initialXml,
    toolboxConfiguration: toolboxConfiguration || ConfigFiles.INITIAL_TOOLBOX_JSON,
    customTools: customTools,
    workspaceConfiguration,
    onWorkspaceChange,
    onXmlChange,
    onImportXmlError,
    onInject,
    onDispose,
    customTheme: customTheme,
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

  return <div className={className} ref={editorDiv} style={{ width: '100%', height: '100%' }} />;
}

BlocklyWorkspace.propTypes = propTypes;
BlocklyWorkspace.defaultProps = defaultProps;

export default BlocklyWorkspace;