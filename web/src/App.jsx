// import { useState } from "react";
// import BlocklyEditor from "./components/BlocklyEditor";
// import JsonPreview from "./components/JsonPreview";
// import "./App.css";

// function App() {
//   const [program, setProgram] = useState({ program: [] });

//   return (
//     <main className="app">
//       <header className="app-header">
//         <div>
//           <h1>Cybosocks Block Coder</h1>
//           <p>Build programs with blocks and run them with Java.</p>
//         </div>
//       </header>

//       <div className="workspace-layout">
//         <section className="editor-panel">
//           <div className="panel-title">
//             <h2>Block Editor</h2>
//             <span>Drag blocks to build your program</span>
//           </div>

//           <BlocklyEditor onProgramChange={setProgram} />
//         </section>

//         <JsonPreview program={program} />
//       </div>
//     </main>
//   );
// }

// export default App;
import { useState } from "react";
import BlocklyEditor from "./components/BlocklyEditor";
import JsonPreview from "./components/JsonPreview";
import "./App.css";

function App() {
  const [program, setProgram] = useState({ program: [] });

  const [stats, setStats] = useState({
    blocks: 0,
    topLevel: 0,
  });

  return (
    <main className="app">
      <header className="app-header">
        <div className="brand">
          <div className="brand-icon">🧩</div>

          <div>
            <h1>Cybosocks Block Coder</h1>
            <p>Build programs with blocks and run them with Java.</p>
          </div>
        </div>

        <div className="status">
          <span
  className={`status-dot ${
    stats.blocks === 0 ? "status-empty" : "status-ready"
  }`}
></span>

{stats.blocks === 0 ? "Empty" : "Ready"}
        </div>
      </header>

      <div className="workspace-layout">
        <section className="editor-panel">
          <div className="panel-title">
            <div>
              <h2>Block Editor</h2>
              <span>Drag, connect and build your program</span>
            </div>

            <div className="editor-hint">
              Blockly
            </div>
          </div>

          <BlocklyEditor
            onProgramChange={setProgram}
            onStatsChange={setStats}
          />
        </section>

        <JsonPreview
          program={program}
          stats={stats}
        />
      </div>

      <footer className="app-footer">
        <span>Visual programming made simple.</span>
        <span>React + Blockly + Java</span>
      </footer>
    </main>
  );
}

export default App;