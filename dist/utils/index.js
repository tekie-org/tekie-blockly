"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildToolboxJSON = exports.initCustomTools = exports.importFromXml = void 0;

var _blockly = _interopRequireDefault(require("blockly"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {*} xml 
 * @param {*} workspace 
 * @param {*} onImportXmlError 
 * @returns Boolean
 */
var importFromXml = function importFromXml(xml, workspace, onImportXmlError) {
  try {
    _blockly.default.Xml.domToWorkspace(_blockly.default.Xml.textToDom(xml), workspace);

    return true;
  } catch (e) {
    if (onImportXmlError) {
      onImportXmlError(e);
    }

    return false;
  }
};
/**
 * Initialize Custom Blockly tools and generator's
 * @param {Array} tools 
 * @param {*} language @default Blockly.JavaScript
 */


exports.importFromXml = importFromXml;

var initCustomTools = function initCustomTools(tools) {
  var language = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _blockly.default.JavaScript;
  tools.forEach(function (tool) {
    _blockly.default.Blocks[tool.name] = tool.block;
    language[tool.name] = tool.generator;
  });
};
/**
 * Build Toolbox JSON from customTools
 * @param {Array} tools 
 * @returns ToolboxJSON
 */


exports.initCustomTools = initCustomTools;

var buildToolboxJSON = function buildToolboxJSON(tools) {
  var groupedByCategory = {};
  var CATEGORY_TOOLBOX_JSON = {
    kind: "categoryToolbox",
    contents: []
  };
  var FLYOUT_TOOLBOX_JSON = {
    kind: "flyoutToolbox",
    contents: []
  };
  tools.forEach(function (item) {
    if (item.category) {
      groupedByCategory[item.category] = groupedByCategory[item.category] || [];
      groupedByCategory[item.category].push({
        kind: 'block',
        type: item.name
      });
    } else {
      FLYOUT_TOOLBOX_JSON.contents.push({
        kind: 'block',
        type: item.name
      });
    }
  });

  if (Object.keys(groupedByCategory).length) {
    Object.keys(groupedByCategory).map(function (key) {
      CATEGORY_TOOLBOX_JSON.contents.push({
        kind: 'category',
        name: key,
        contents: groupedByCategory[key]
      });
    });
    return CATEGORY_TOOLBOX_JSON;
  }

  return FLYOUT_TOOLBOX_JSON;
};

exports.buildToolboxJSON = buildToolboxJSON;