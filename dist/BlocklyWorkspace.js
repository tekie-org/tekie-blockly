import React from"react";import PropTypes from"prop-types";import Blockly from"blockly";import useBlockly from"./useBlockly";var propTypes={initialXml:PropTypes.string,toolboxConfiguration:PropTypes.object,// eslint-disable-line react/forbid-prop-types
workspaceConfiguration:PropTypes.object,// eslint-disable-line react/forbid-prop-types
customTools:PropTypes.arrayOf(PropTypes.object),// eslint-disable-line react/forbid-prop-types
onWorkspaceChange:PropTypes.func,onImportXmlError:PropTypes.func,onXmlChange:PropTypes.func,onInject:PropTypes.func,onDispose:PropTypes.func,customTheme:PropTypes.any,useDefaultToolbox:PropTypes.bool,blocklyKey:PropTypes.string,toolboxMode:PropTypes.oneOf(["default"])},defaultProps={initialXml:null,toolboxConfiguration:null,workspaceConfiguration:null,onWorkspaceChange:function onWorkspaceChange(){},onImportXmlError:function onImportXmlError(){},onXmlChange:function onXmlChange(){},onInject:function onInject(){},onDispose:function onDispose(){},customTheme:null,useDefaultToolbox:!1,blocklyKey:null,toolboxMode:null};/**
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
 */function BlocklyWorkspace(a){var b=a.initialXml,c=a.toolboxConfiguration,d=a.workspaceConfiguration,e=a.onWorkspaceChange,f=a.onXmlChange,g=a.onImportXmlError,h=a.onInject,i=a.onDispose,j=a.customTheme,k=a.customTools,l=a.className,m=a.useDefaultToolbox,n=a.blocklyKey,o=void 0===n?null:n,p=a.toolboxMode,q=void 0===p?null:p,r=React.useRef(null),s=useBlockly({ref:r,initialXml:b,toolboxConfiguration:c,customTools:k,workspaceConfiguration:d,onWorkspaceChange:e,onXmlChange:f,onImportXmlError:g,onInject:h,onDispose:i,customTheme:j,useDefaultToolbox:void 0!==m&&m,toolboxMode:q}),t=s[0],u=s[1],v=React.useRef(f);return React.useEffect(function(){v.current=f},[f]),React.useEffect(function(){v.current&&u&&v.current(u)},[u]),React.useEffect(function(){t&&o&&(window[o+"Workspace"]=t,window[o+"Blockly"]=Blockly)},[t]),/*#__PURE__*/React.createElement("div",{className:l,ref:r,style:{width:"100%",height:"100%"}})}BlocklyWorkspace.propTypes=propTypes,BlocklyWorkspace.defaultProps=defaultProps;export default BlocklyWorkspace;