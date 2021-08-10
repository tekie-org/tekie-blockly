import React from "react";
import PropTypes from "prop-types";
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
  shouldUpdateXML: PropTypes.bool
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
  shouldUpdateXML: false
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
}) {
  const editorDiv = React.useRef(null);
  const [ xml ] = useBlockly({
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

  return <div className={className} ref={editorDiv} style={{ width: '100%', height: '100%' }} />;
}

BlocklyWorkspace.propTypes = propTypes;
BlocklyWorkspace.defaultProps = defaultProps;

export default BlocklyWorkspace;