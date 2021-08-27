import Blockly from"blockly";/**
 * @param {*} xml 
 * @param {*} workspace 
 * @param {*} onImportXmlError 
 * @returns Boolean
 */export var importFromXml=function importFromXml(a,b,c){try{return Blockly&&Blockly.mainWorkspace&&(console.log("From Blockly ==> Workspace Cleared"),Blockly.mainWorkspace.clear()),console.log("From Blockly ==> XML Rendererd"),Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(a),b),!0}catch(a){return c&&c(a),!1}};/**
 * Initialize Custom Blockly tools and generator's
 * @param {Array} tools 
 * @param {*} language @default Blockly.JavaScript
 */export var initCustomTools=function initCustomTools(a,b){void 0===b&&(b=Blockly.JavaScript),a.forEach(function(a){Blockly.Blocks[a.name]=a.block,b[a.name]=a.generator})};/**
 * Build Toolbox JSON from customTools
 * @param {Array} tools 
 * @returns ToolboxJSON
 */export var buildToolboxJSON=function buildToolboxJSON(a){var b={},c={kind:"categoryToolbox",contents:[]},d={kind:"flyoutToolbox",contents:[]};return a.forEach(function(a){a.category?(b[a.category]=b[a.category]||[],b[a.category].push({kind:"block",type:a.name})):d.contents.push({kind:"block",type:a.name})}),Object.keys(b).length?(Object.keys(b).map(function(a){c.contents.push({kind:"category",name:a,contents:b[a]})}),c):d};