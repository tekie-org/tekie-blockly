import Blockly from 'blockly'

/**
 * Tekie Theme
 */
const TekieDefaultBlockStyles = {
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

const categoryStyles = {
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

const componentStyles = {
  "workspaceBackgroundColour": "#E6F7FD",
  "toolboxBackgroundColour": "#DDDDDD",
  "toolboxForegroundColour": "#222",
  "flyoutBackgroundColour": "#d2effa",
  "flyoutForegroundColour": "#FFF",
  "flyoutOpacity": "1",
  "scrollbarColour": "#00ADE6",
  "scrollbarOpacity": "1",
  "insertionMarkerColour": "",
  "insertionMarkerOpacity": "",
  "markerColour": "",
  "cursorColour": "",
};

const fontStyles = {
  "family": "Nunito, sans-serif",
  "weight": "normal",
  "size": 12
};

const BlocklyThemes = {
  TekiePrimary: {
    'blockStyles': TekieDefaultBlockStyles,
    // 'categoryStyles': categoryStyles,
    'componentStyles': componentStyles,
    'fontStyle': fontStyles,
  }
}

if (BlocklyThemes && Object.keys(BlocklyThemes).length) {
  Object.keys(BlocklyThemes).forEach(theme => {
    if (!Blockly.Theme[theme]) {
      Blockly.Theme[theme] = Blockly.Theme.defineTheme(theme, BlocklyThemes[theme]);
    }
  })
}