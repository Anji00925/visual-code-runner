import * as Blockly from "blockly";

Blockly.Blocks["cybosocks_move"] = {
  init() {
    this.appendDummyInput()
      .appendField("move")
      .appendField(
        new Blockly.FieldNumber(1, 0),
        "STEPS"
      )
      .appendField("steps");

    this.setPreviousStatement(true);
    this.setNextStatement(true);

    this.setColour(120);

    this.setTooltip("Move the turtle forward by a number of steps.");
    this.setHelpUrl("");
  },
};