function _extends(){return _extends=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a},_extends.apply(this,arguments)}function asyncGeneratorStep(a,b,c,d,e,f,g){try{var h=a[f](g),i=h.value}catch(a){return void c(a)}h.done?b(i):Promise.resolve(i).then(d,e)}function _asyncToGenerator(a){return function(){var b=this,c=arguments;return new Promise(function(d,e){function _next(a){asyncGeneratorStep(f,d,e,_next,_throw,"next",a)}function _throw(a){asyncGeneratorStep(f,d,e,_next,_throw,"throw",a)}var f=a.apply(b,c);_next(void 0)})}}import React from"react";import Blockly from"blockly";import debounce from"./utils/debounce";import config from"./utils/defaultConfig";import TOOLBOX_JSON from"./CustomToolboxJSON";import{importFromXml,initCustomTools,buildToolboxJSON}from"./utils";/**
 * Custom Category & Theme For Blockly
 */ // import './customMethods/customCategory'
import"./customMethods/customTheme";/**
 * Overide Blockly's Toolbox & Workspace Styles
 */import"./customStyle.scss";/**
 * ~ Blockly React Hook
 * @param ref Workspace Div Reference
 * @param initialXml Initial Blocks to show in workpace (This have to be in XML format)
 * @param toolboxConfiguration toolbox configuration from blockly's official documentation 
 * @param workspaceConfiguration self explanatory refer: https://developers.google.com/blockly/guides/configure/web/configuration_struct
 * @param customTools custom toolbox configration, format -> { name, category, block, generator }
 * @param customTheme self explanatory 
 * @param onWorkspaceChange self explanatory 
 * @param onImportXmlError
 * @param onInject
 * @param onDispose
 * @param useDefaultToolbox
 * @param toolboxMode - default |
 * @returns [ xml, workspace ]
 */var useBlockly=function useBlockly(a){var b=a.ref,c=a.initialXml,d=a.toolboxConfiguration,e=a.workspaceConfiguration,f=void 0===e?{readOnly:!1}:e,g=a.onWorkspaceChange,h=void 0===g?function(){}:g,i=a.onImportXmlError,j=void 0===i?function(){}:i,k=a.onInject,l=void 0===k?function(){}:k,m=a.onDispose,n=void 0===m?function(){}:m,o=a.customTheme,p=a.customTools,q=void 0===p?[]:p,r=a.useDefaultToolbox,s=a.toolboxMode,t=void 0===s?null:s,u=React.useState(null),v=u[0],w=u[1],x=React.useState(c),y=x[0],z=x[1],A=React.useState(!1),B=A[0],C=A[1],D=React.useState(!1),E=D[0],F=D[1];f=f||config.DEFAULT_WORKSPACE_JSON,d=void 0!==r&&r?TOOLBOX_JSON["default"]:d,d=t&&TOOLBOX_JSON[t]?TOOLBOX_JSON[t]:d;var G=React.useRef(l),H=React.useRef(n),I=React.useRef(f),J=React.useRef(d);React.useEffect(function(){G.current=l},[l]),React.useEffect(function(){H.current=n},[n]),React.useEffect(function(){I.current=f},[f]),React.useEffect(function(){try{d&&v&&(J.current=d,v.updateToolbox(d))}catch(a){console.error("From useBlockly | [toolboxConfiguration] ==> ",a)}},[d,v]),React.useEffect(function(){/** Toolbox will not be initialized is workspace is readOnly */try{_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee(){var a;return regeneratorRuntime.wrap(function _callee$(b){for(;;)switch(b.prev=b.next){case 0:if(!(q&&q.length)){b.next=7;break}return b.next=3,initCustomTools(q);case 3:return b.next=5,buildToolboxJSON(q);case 5:a=b.sent,a&&v&&(J.current&&J.current.kind!==a.kind?console.error("Cannot Change Toolbox Mode"):(v.updateToolbox(a),J.current=a));case 7:case"end":return b.stop();}},_callee)}))()}catch(a){console.error("From useBlockly | [customTools] ==> ",a)}},[q,v]);/** Trigger when workspace changes helpful in executing code of given blocks */var K=React.useCallback(function(a){h&&h(a)},[h]);/** Initial Workspace Creation */return React.useEffect(function(){var a=Blockly.inject(b.current,_extends({},I.current,{toolbox:J.current}));/** 
     * Dispose of the workspace when our div ref goes away (Equivalent to didComponentUnmount) 
     */return w(a),C(!1),F(!1),G.current&&a&&G.current(a),function(){try{a.dispose(),H.current&&console.info("From useBlockly ==> Disposed Workspace",a)}catch(a){console.error("From useBlockly | [dispose] ==> ",a)}}},[J]),React.useEffect(function(){v&&!E&&K(v)},[K,E,v]),React.useEffect(function(){if(null!=v){var a=function listener(){K(v)};return v.addChangeListener(a),function(){v.removeChangeListener(a)}}},[v,K]),React.useEffect(function(){if(null!=v){var a=debounce(function(){var a=Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(v));a===y||z(a)},200),b=a[0],c=a[1];return v.addChangeListener(b),function(){v.removeChangeListener(b),c()}}},[v,y]),React.useEffect(function(){try{var a=o||Blockly.Theme.TekiePrimary;v&&a&&v.setTheme(a)}catch(a){console.error("From useBlockly | [blocklyTheme] ==> ",a)}},[o,v]),React.useEffect(function(){if(y&&v&&!B){var a=importFromXml(y,v,j);a||z(null),C(!0)}},[y,v,B,j]),[v,y]};export default useBlockly;