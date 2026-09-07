// import { useState } from "react";

// function JsonPreview({ program }) {
//   const [copied, setCopied] = useState(false);
  

//   const json = JSON.stringify(program, null, 2);

//   const handleCopy = async () => {
//     await navigator.clipboard.writeText(json);
//     setCopied(true);

//     setTimeout(() => {
//       setCopied(false);
//     }, 1500);
//   };
//   const handleDownload = () => {
//   const blob = new Blob([json], {
//     type: "application/json",
//   });

//   const url = URL.createObjectURL(blob);

//   const link = document.createElement("a");
//   link.href = url;
//   link.download = "program.json";
//   link.click();

//   URL.revokeObjectURL(url);
// };
  

//   return (
//     <section className="json-panel">
//       <div className="json-header">
//         <div>
//           <h2>JSON Output</h2>
//           <span>Generated program</span>
//         </div>
//         <button onClick={handleDownload}>Download</button>

//         <button onClick={handleCopy}>
//           {copied ? "Copied ✓" : "Copy"}
//         </button>
//       </div>

//       <pre className="json-code">{json}</pre>
//     </section>
//   );
// }

// export default JsonPreview;
import { useState } from "react";

function countBlocks(blocks) {
  let count = 0;

  for (const block of blocks) {
    count++;

    if (block.type === "repeat") {
      count += countBlocks(block.body || []);
    }
  }

  return count;
}

function JsonPreview({ program, stats }) {
  const [copied, setCopied] = useState(false);

  const json = JSON.stringify(program, null, 2);
  const blockCount = countBlocks(program.program || []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(json);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {
      setCopied(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([json], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "program.json";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <section className="json-panel">
      <div className="json-header">
        <div>
          <h2>JSON Output</h2>
          <span>Generated program</span>
        </div>

        <div className="json-actions">
          <button
            className="secondary-button"
            onClick={handleDownload}
          >
            Download
          </button>

          <button
            className="primary-button"
            onClick={handleCopy}
          >
            {copied ? "Copied ✓" : "Copy"}
          </button>
        </div>
      </div>

      <div className="program-info">
  <div>
    <strong>{stats.blocks}</strong>
    <span>Blocks</span>
  </div>

  <div>
    <strong>{stats.topLevel}</strong>
    <span>Top-level</span>
  </div>
</div>

      {blockCount === 0 ? (
        <div className="json-empty">
          <div className="empty-icon">⌨</div>
          <h3>Your JSON will appear here</h3>
          <p>
            Add blocks to the editor and your program will
            be generated automatically.
          </p>
        </div>
      ) : (
        <pre className="json-code">{json}</pre>
      )}
    </section>
  );
}

export default JsonPreview;