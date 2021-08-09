"use strict";

var _blockly = _interopRequireDefault(require("blockly"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultBlockStyles = {
  "colour_blocks": {
    "colourPrimary": "20"
  },
  "list_blocks": {
    "colourPrimary": "260"
  },
  "logic_blocks": {
    "colourPrimary": "210"
  },
  "loop_blocks": {
    "colourPrimary": "120"
  },
  "math_blocks": {
    "colourPrimary": "230"
  },
  "procedure_blocks": {
    "colourPrimary": "290"
  },
  "text_blocks": {
    "colourPrimary": "160"
  },
  "variable_blocks": {
    "colourPrimary": "330"
  },
  "variable_dynamic_blocks": {
    "colourPrimary": "310"
  },
  "hat_blocks": {
    "colourPrimary": "330",
    "hat": "cap"
  }
};
var categoryStyles = {
  "colour_category": {
    "colour": "20"
  },
  "list_category": {
    "colour": "160"
  },
  "logic_category": {
    "colour": "210"
  },
  "loop_category": {
    "colour": "120"
  },
  "math_category": {
    "colour": "230"
  },
  "procedure_category": {
    "colour": "290"
  },
  "text_category": {
    "colour": "160"
  },
  "variable_category": {
    "colour": "330"
  },
  "variable_dynamic_category": {
    "colour": "310"
  }
};
var componentStyles = {
  "workspaceBackgroundColour": "#00171f",
  "toolboxBackgroundColour": "#3eaec1",
  "toolboxForegroundColour": "#FFF",
  "flyoutBackgroundColour": "#015f7c",
  "flyoutForegroundColour": "#FFF",
  "flyoutOpacity": ".6",
  "scrollbarColour": "",
  "scrollbarOpacity": "",
  "insertionMarkerColour": "",
  "insertionMarkerOpacity": "",
  "markerColour": "",
  "cursorColour": "red"
};
var fontStyles = {
  "family": "Nunito, sans-serif",
  "weight": "normal",
  "size": 12
};

if (!_blockly.default.Theme.TekiePrimary) {
  _blockly.default.Theme.TekiePrimary = _blockly.default.Theme.defineTheme('TekiePrimary', {
    // 'base': ,
    'blockStyles': defaultBlockStyles,
    'categoryStyles': categoryStyles,
    'componentStyles': componentStyles,
    'fontStyle': fontStyles,
    'startHats': true
  });
}