import * as Blockly from "blockly";

Blockly.Blocks["cybosocks_repeat"] = {
  init() {
    this.appendDummyInput()
      .appendField("repeat")
      .appendField(
        new Blockly.FieldNumber(2, 0),
        "TIMES"
      )
      .appendField("times");

    this.appendStatementInput("BODY")
      .appendField("do");

    this.setPreviousStatement(true);
    this.setNextStatement(true);

    this.setColour(30);

    this.setTooltip(
      "Repeat the blocks inside this container."
    );
    this.setHelpUrl("");
  },
};