import Blockly from "blockly"

export default class CustomCategory extends Blockly.ToolboxCategory {
  /**
   * Constructor for a custom category.
   * @override
   */
  constructor(categoryDef, toolbox, opt_parent) {
    super(categoryDef, toolbox, opt_parent);
  }
  /** @override */
  addColourBorder_(colour){
      this.rowDiv_.style.backgroundColor = colour;
  }
  /** @override */
  setSelected(isSelected){
    // We do not store the label span on the category, so use getElementsByClassName.
    var labelDom = this.rowDiv_.getElementsByClassName('blocklyTreeLabel')[0];
    if (isSelected) {
        // Change the background color of the div to white.
        this.rowDiv_.style.backgroundColor = '#005673';
        this.rowDiv_.style.boxShadow = '2px 4px 10px rgba(0,0,0,0.3)';
        // Set the colour of the text to the colour of the category.
        labelDom.style.color = this.colour_;
    } else {
        // Set the background back to the original colour.
        this.rowDiv_.style.backgroundColor = this.colour_;
        this.rowDiv_.style.boxShadow = 'none';
        // Set the text back to white.
        labelDom.style.color = '#005673';
    }
    // This is used for accessibility purposes.
    Blockly.utils.aria.setState(/** @type {!Element} */ (this.htmlDiv_),
        Blockly.utils.aria.State.SELECTED, isSelected);
  }
}

/**
 * Custom methods must be registered for applying changes in Blockly  
 */
Blockly.registry.register(
    Blockly.registry.Type.TOOLBOX_ITEM,
    Blockly.ToolboxCategory.registrationName,
    CustomCategory, true);