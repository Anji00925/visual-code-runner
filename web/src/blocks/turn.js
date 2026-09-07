import * as Blockly from "blockly";

Blockly.Blocks["cybosocks_turn"] = {
  init() {
    this.appendDummyInput()
      .appendField("turn")
      .appendField(
        new Blockly.FieldDropdown([
          ["left", "left"],
          ["right", "right"],
        ]),
        "DIRECTION"
      );

    this.setPreviousStatement(true);
    this.setNextStatement(true);

    this.setColour(210);

    this.setTooltip("Turn the turtle 90 degrees left or right.");
    this.setHelpUrl("");
  },
};