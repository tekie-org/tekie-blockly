import Blockly from 'blockly';

/**
 * @param {*} xml 
 * @param {*} workspace 
 * @param {*} onImportXmlError 
 * @returns Boolean
 */
export const importFromXml = (xml, workspace, onImportXmlError) => {
  try {
    if (Blockly && Blockly.mainWorkspace) {
      console.log('From Blockly ==> Workspace Cleared')
      Blockly.mainWorkspace.clear()
    }
    console.log('From Blockly ==> XML Rendererd')
    Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(xml), workspace);
    return true;
  } catch (e) {
    if (onImportXmlError) {
      onImportXmlError(e);
    }
    return false;
  }
}

/**
 * Initialize Custom Blockly tools and generator's
 * @param {Array} tools 
 * @param {*} language @default Blockly.JavaScript
 */
export const initCustomTools = (tools, language=Blockly.JavaScript) => {
  tools.forEach((tool) => {
    Blockly.Blocks[tool.name] = tool.block;
    language[tool.name] = tool.generator;
  });
};

/**
 * Build Toolbox JSON from customTools
 * @param {Array} tools 
 * @returns ToolboxJSON
 */
export const buildToolboxJSON = (tools) => {
  const groupedByCategory = {}
  const CATEGORY_TOOLBOX_JSON = {
    kind: "categoryToolbox",
    contents: []
  }
  const FLYOUT_TOOLBOX_JSON = {
    kind: "flyoutToolbox",
    contents: []
  }
  tools.forEach((item) => {
    if (item.category) {
      groupedByCategory[item.category] = groupedByCategory[item.category] || [];
      groupedByCategory[item.category].push({ kind: 'block', type: item.name });
    } else {
      FLYOUT_TOOLBOX_JSON.contents.push({ kind: 'block', type: item.name });
    }
  });
  if (Object.keys(groupedByCategory).length) {
    Object.keys(groupedByCategory).map((key) => {
      CATEGORY_TOOLBOX_JSON.contents.push({
        kind: 'category',
        name: key,
        contents: groupedByCategory[key]
      })
    });
    return CATEGORY_TOOLBOX_JSON
  }
  return FLYOUT_TOOLBOX_JSON
};