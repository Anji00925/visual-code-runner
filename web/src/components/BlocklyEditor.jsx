import { useEffect, useRef } from "react";
import * as Blockly from "blockly";
import "../blocks/move";
import "../blocks/turn";
import "../blocks/say";
import "../blocks/repeat";
import { generateProgram } from "../generator/programGenerator";

function BlocklyEditor() {
  const workspaceRef = useRef(null);

  useEffect(() => {
    if (!workspaceRef.current) return;


    const workspace = Blockly.inject(workspaceRef.current, {
      toolbox: {
        kind: "flyoutToolbox",
        contents: [
            {
               kind: "block",
               type: "cybosocks_move",
            },
            {
    kind: "block",
    type: "cybosocks_turn",
  },
  {
    kind: "block",
    type: "cybosocks_say",
  },
  {
  kind: "block",
  type: "cybosocks_repeat",
},
],
      },
      grid: {
        spacing: 24,
        length: 3,
        colour: "#ddd",
        snap: true,
      },
      trashcan: true,
    });
    const updateJson = () => {
  const program = generateProgram(workspace);

  console.log(
    JSON.stringify(program, null, 2)
  );
};

workspace.addChangeListener(updateJson);

    return () => {
      workspace.dispose();
    };
  }, []);

  return (
    <div
      ref={workspaceRef}
      style={{
        width: "100%",
        height: "600px",
      }}
    />
  );
}

export default BlocklyEditor;