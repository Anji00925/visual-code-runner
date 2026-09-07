import { useState } from "react";
import BlocklyEditor from "./components/BlocklyEditor";
import JsonPreview from "./components/JsonPreview";
import "./App.css";

function App() {
  const [program, setProgram] = useState({ program: [] });

  return (
    <main className="app">
      <header className="app-header">
        <div>
          <h1>Cybosocks Block Coder</h1>
          <p>Build programs with blocks and run them with Java.</p>
        </div>
      </header>

      <div className="workspace-layout">
        <section className="editor-panel">
          <div className="panel-title">
            <h2>Block Editor</h2>
            <span>Drag blocks to build your program</span>
          </div>

          <BlocklyEditor onProgramChange={setProgram} />
        </section>

        <JsonPreview program={program} />
      </div>
    </main>
  );
}

export default App;