import * as Blockly from "blockly";

Blockly.Blocks["cybosocks_say"] = {
  init() {
    this.appendDummyInput()
      .appendField("say")
      .appendField(
        new Blockly.FieldTextInput("Hello!"),
        "TEXT"
      );

    this.setPreviousStatement(true);
    this.setNextStatement(true);

    this.setColour(290);

    this.setTooltip("Make the turtle say something.");
    this.setHelpUrl("");
  },
};