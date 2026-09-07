import { useState } from "react";

function JsonPreview({ program }) {
  const [copied, setCopied] = useState(false);

  const json = JSON.stringify(program, null, 2);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(json);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <section className="json-panel">
      <div className="json-header">
        <div>
          <h2>JSON Output</h2>
          <span>Generated program</span>
        </div>

        <button onClick={handleCopy}>
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>

      <pre className="json-code">{json}</pre>
    </section>
  );
}

export default JsonPreview;