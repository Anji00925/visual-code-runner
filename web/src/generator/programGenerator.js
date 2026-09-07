function blockToJson(block) {
  switch (block.type) {
    case "cybosocks_move":
      return {
        type: "move",
        steps: Number(block.getFieldValue("STEPS")),
      };

    case "cybosocks_turn":
      return {
        type: "turn",
        direction: block.getFieldValue("DIRECTION"),
      };

    case "cybosocks_say":
      return {
        type: "say",
        text: block.getFieldValue("TEXT"),
      };

    case "cybosocks_repeat": {
      const body = [];
      let child = block.getInputTargetBlock("BODY");

      while (child) {
        body.push(blockToJson(child));
        child = child.getNextBlock();
      }

      return {
        type: "repeat",
        times: Number(block.getFieldValue("TIMES")),
        body,
      };
    }

    default:
      throw new Error(`Unknown block type: ${block.type}`);
  }
}

export function generateProgram(workspace) {
  const program = [];

  const topBlocks = workspace.getTopBlocks(true);

  for (const block of topBlocks) {
    program.push(blockToJson(block));
  }

  return {
    program,
  };
}