"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _blockly = _interopRequireDefault(require("blockly"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CustomCategory extends _blockly.default.ToolboxCategory {
  /**
   * Constructor for a custom category.
   * @override
   */
  constructor(categoryDef, toolbox, opt_parent) {
    super(categoryDef, toolbox, opt_parent);
  }
  /** @override */


  addColourBorder_(colour) {
    this.rowDiv_.style.backgroundColor = colour;
  }
  /** @override */


  setSelected(isSelected) {
    // We do not store the label span on the category, so use getElementsByClassName.
    var labelDom = this.rowDiv_.getElementsByClassName('blocklyTreeLabel')[0];

    if (isSelected) {
      // Change the background color of the div to white.
      this.rowDiv_.style.backgroundColor = '#005673';
      this.rowDiv_.style.boxShadow = '2px 4px 10px rgba(0,0,0,0.3)'; // Set the colour of the text to the colour of the category.

      labelDom.style.color = this.colour_;
    } else {
      // Set the background back to the original colour.
      this.rowDiv_.style.backgroundColor = this.colour_;
      this.rowDiv_.style.boxShadow = 'none'; // Set the text back to white.

      labelDom.style.color = '#005673';
    } // This is used for accessibility purposes.


    _blockly.default.utils.aria.setState(this.htmlDiv_, _blockly.default.utils.aria.State.SELECTED, isSelected);
  }

}

exports.default = CustomCategory;

_blockly.default.registry.register(_blockly.default.registry.Type.TOOLBOX_ITEM, _blockly.default.ToolboxCategory.registrationName, CustomCategory, true);